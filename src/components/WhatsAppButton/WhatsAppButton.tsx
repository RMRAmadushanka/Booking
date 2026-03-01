"use client";

import dynamic from "next/dynamic";

const FloatingWhatsApp = dynamic(
  () => import("react-floating-whatsapp").then((mod) => mod.FloatingWhatsApp),
  { ssr: false }
);

const WHATSAPP_NUMBER = "94766694545";
const ACCOUNT_NAME = "Drimooria Travels";

export default function WhatsAppButton() {
  return (
    <FloatingWhatsApp
      phoneNumber={WHATSAPP_NUMBER}
      accountName={ACCOUNT_NAME}
      statusMessage="Typically replies within an hour"
      chatMessage="Hello! 👋 How can we help you with your trip?"
      placeholder="Type a message..."
      allowClickAway={false}
      allowEsc
      notification
      notificationDelay={30}
    />
  );
}
