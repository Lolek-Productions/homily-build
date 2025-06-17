import * as React from "react";
import Link from "next/link";

/**
 * Pagination component for SSR pagination
 * @param {Object} props
 * @param {number} props.page - Current page
 * @param {number} props.totalPages - Total number of pages
 * @param {function} [props.getPageLink] - Function to get link for a page (pageNum) => url
 */
export function Pagination({ page, totalPages, getPageLink }) {
  if (totalPages <= 1) return null;
  return (
    <nav className="flex items-center gap-2 mt-4" aria-label="Pagination">
      <Link
        href={getPageLink(Math.max(1, page - 1))}
        className="px-2 py-1 rounded bg-muted text-muted-foreground disabled:opacity-50"
        aria-disabled={page === 1}
        tabIndex={page === 1 ? -1 : undefined}
      >
        Previous
      </Link>
      {Array.from({ length: totalPages }, (_, i) => (
        <Link
          key={i}
          href={getPageLink(i + 1)}
          className={`px-3 py-1 rounded ${page === i + 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
          aria-current={page === i + 1 ? "page" : undefined}
        >
          {i + 1}
        </Link>
      ))}
      <Link
        href={getPageLink(Math.min(totalPages, page + 1))}
        className="px-2 py-1 rounded bg-muted text-muted-foreground disabled:opacity-50"
        aria-disabled={page === totalPages}
        tabIndex={page === totalPages ? -1 : undefined}
      >
        Next
      </Link>
    </nav>
  );
}
