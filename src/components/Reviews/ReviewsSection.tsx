import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import type { PaginatedReviews, ReviewItem } from "@/lib/reviews";

type ReviewsSectionProps = {
  data: PaginatedReviews;
  basePath: string;
  /** e.g. "Travel package" or "Vehicle rental" */
  emptyMessage?: string;
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) =>
        i <= value ? (
          <StarIcon key={i} className="w-4 h-4 text-amber-400" />
        ) : (
          <StarOutlineIcon key={i} className="w-4 h-4 text-slate-300" />
        )
      )}
    </div>
  );
}

function ReviewerAvatar({ review }: { review: ReviewItem }) {
  const initials = review.travelerName
    .trim()
    .split(/\s+/)
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?";

  if (review.avatarUrl) {
    return (
      <div className="w-10 h-10 shrink-0 overflow-hidden rounded-full bg-slate-200">
        <Image
          src={review.avatarUrl}
          alt=""
          width={40}
          height={40}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="w-10 h-10 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center text-sm font-semibold shrink-0"
      aria-hidden
    >
      {initials}
    </div>
  );
}

export default function ReviewsSection({
  data,
  basePath,
  emptyMessage = "No reviews yet.",
}: ReviewsSectionProps) {
  const { reviews, total, page, totalPages } = data;

  return (
    <section className="bg-white border border-slate-200 rounded-[var(--radius)] p-5 sm:p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900 mb-1">Guest feedback</h2>
      <p className="text-sm text-slate-500 mb-4">
        {total === 0
          ? emptyMessage
          : `${total} review${total === 1 ? "" : "s"} from travelers`}
      </p>

      {reviews.length === 0 ? (
        <p className="text-slate-600 text-sm py-4">{emptyMessage}</p>
      ) : (
        <>
          <ul className="space-y-4">
            {reviews.map((r) => (
              <li
                key={r.id}
                className="border-b border-slate-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex gap-3">
                  <ReviewerAvatar review={r} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-medium text-slate-900">
                        {r.travelerName}
                      </span>
                      <StarRating value={r.rating} />
                    </div>
                    <p className="text-xs text-slate-500 mb-2">
                      {formatDate(r.createdAt)}
                    </p>
                    {r.comment ? (
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {r.comment}
                      </p>
                    ) : (
                      <p className="text-sm text-slate-400 italic">No comment</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <nav
              className="mt-6 flex items-center justify-between gap-4 border-t border-slate-200 pt-4"
              aria-label="Reviews pagination"
            >
              <p className="text-sm text-slate-600">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                {page > 1 ? (
                  <Link
                    href={
                      page === 2
                        ? basePath
                        : `${basePath}?reviewPage=${page - 1}`
                    }
                    className="px-3 py-1.5 text-sm font-medium text-[#2563EB] hover:bg-slate-50 rounded-[var(--radius)]"
                  >
                    ← Previous
                  </Link>
                ) : null}
                {page < totalPages ? (
                  <Link
                    href={`${basePath}?reviewPage=${page + 1}`}
                    className="px-3 py-1.5 text-sm font-medium text-[#2563EB] hover:bg-slate-50 rounded-[var(--radius)]"
                  >
                    Next →
                  </Link>
                ) : null}
              </div>
            </nav>
          )}
        </>
      )}
    </section>
  );
}
