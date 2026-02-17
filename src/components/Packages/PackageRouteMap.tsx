"use client";

import React, { useEffect, useMemo, useRef } from "react";
import type { Destination } from "@/types/packages";
import { destinationCoordinates } from "@/data/destinationCoordinates";
import type { Map as LeafletMap } from "leaflet";

type PackageRouteMapProps = {
  destinations: Destination[];
  className?: string;
};

type OsrmRouteResponse = {
  code: string;
  routes?: Array<{
    geometry: {
      coordinates: Array<[number, number]>; // [lng, lat]
      type: "LineString";
    };
    distance: number; // meters
    duration: number; // seconds
  }>;
};

function toOsrmCoordinates(coords: Array<{ lat: number; lng: number }>) {
  // OSRM expects `lng,lat;lng,lat;...`
  return coords.map((c) => `${c.lng},${c.lat}`).join(";");
}

export default function PackageRouteMap({
  destinations,
  className,
}: PackageRouteMapProps) {
  const mapElRef = useRef<HTMLDivElement | null>(null);

  const coords = useMemo(
    () => destinations.map((d) => ({ destination: d, ...destinationCoordinates[d] })),
    [destinations]
  );

  useEffect(() => {
    let map: LeafletMap | null = null;
    let cancelled = false;
    const abortController = new AbortController();

    async function init() {
      if (!mapElRef.current) return;
      if (coords.length === 0) return;

      // Avoid SSR issues: import leaflet only on client.
      const L = (await import("leaflet")) as typeof import("leaflet");
      if (cancelled) return;

      // Initialize map
      const mapInstance = L.map(mapElRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
      });
      map = mapInstance;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapInstance);

      // Real road route (OSRM). Falls back to straight lines if OSRM fails.
      const defaultLatLngs = coords.map((c) => [c.lat, c.lng] as [number, number]);
      const osrmBaseUrl =
        process.env.NEXT_PUBLIC_OSRM_BASE_URL ?? "https://router.project-osrm.org";

      let routeLatLngs: Array<[number, number]> = defaultLatLngs;

      if (coords.length >= 2) {
        try {
          const coordinateParam = toOsrmCoordinates(coords);
          const url = `${osrmBaseUrl}/route/v1/driving/${coordinateParam}?overview=full&geometries=geojson&steps=false`;

          const res = await fetch(url, { signal: abortController.signal });
          if (res.ok) {
            const data = (await res.json()) as OsrmRouteResponse;
            const route = data.routes?.[0];
            const line = route?.geometry?.coordinates;
            if (Array.isArray(line) && line.length > 1) {
              routeLatLngs = line.map(([lng, lat]) => [lat, lng]);
            }
          }
        } catch {
          // ignore and fall back
        }
      }

      const routeLine = L.polyline(routeLatLngs, {
        color: "#2563EB",
        weight: 4,
        opacity: 0.9,
      }).addTo(mapInstance);

      // Markers
      coords.forEach((c, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === coords.length - 1;
        const color = isFirst ? "#16A34A" : isLast ? "#DC2626" : "#2563EB";

        L.circleMarker([c.lat, c.lng], {
          radius: 7,
          color,
          fillColor: color,
          fillOpacity: 0.95,
          weight: 2,
        })
          .addTo(mapInstance)
          .bindPopup(
            `<div style="font-weight:600;margin-bottom:2px;">${idx + 1}. ${c.destination}</div>` +
              `<div style="color:#64748B;font-size:12px;">Route stop</div>`
          );
      });

      mapInstance.fitBounds(routeLine.getBounds(), { padding: [24, 24] });
    }

    init();

    return () => {
      cancelled = true;
      abortController.abort();
      try {
        if (map) map.remove();
      } catch {
        // ignore
      }
    };
  }, [coords]);

  return (
    <div
      className={
        className ??
        "w-full h-[360px] rounded-[var(--radius-md)] overflow-hidden border border-slate-200 bg-slate-50"
      }
    >
      <div ref={mapElRef} className="w-full h-full" />
    </div>
  );
}

