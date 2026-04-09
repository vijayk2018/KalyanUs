import * as React from 'react';
import {Pagination, flattenConnection} from '@shopify/hydrogen';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {Link, useLocation, useNavigation} from 'react-router';

function paginationClearedSearch(search: string): string {
  const params = new URLSearchParams(search);
  for (const key of [...params.keys()]) {
    if (key === 'cursor' || key.endsWith('_cursor')) params.delete(key);
    if (key === 'direction' || key.endsWith('_direction')) params.delete(key);
  }
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

/**
 * Numbered row + bordered next control (cursor-based pagination: only sequential
 * next/prev and “first page” are real links; other numbers are visual context).
 *
 * Uses plain `Link` without `state` so Hydrogen does not merge prior pages into
 * the list (each page shows only the current loader `connection`).
 */
function ProductGridPaginationBar({
  isLoading,
  hasNextPage,
  hasPreviousPage,
  nextPageUrl,
  previousPageUrl,
}: {
  isLoading: boolean;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPageUrl: string;
  previousPageUrl: string;
}) {
  const location = useLocation();
  const navigation = useNavigation();
  const busy = isLoading || navigation.state !== 'idle';
  const storageKey = `product-grid-page:${location.pathname}`;
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const cursor = new URLSearchParams(location.search).get('cursor');
    if (!cursor) {
      setPage(1);
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(storageKey);
      }
      return;
    }
    if (typeof window === 'undefined') return;
    const stored = sessionStorage.getItem(storageKey);
    if (stored) {
      const n = Number(stored);
      if (!Number.isNaN(n) && n >= 1) setPage(n);
    } else {
      setPage(2);
    }
  }, [location.search, location.pathname, storageKey]);

  const bumpPage = React.useCallback(
    (delta: number) => {
      setPage((p) => {
        const n = Math.max(1, p + delta);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(storageKey, String(n));
        }
        return n;
      });
    },
    [storageKey],
  );

  const firstPageHref =
    location.pathname + paginationClearedSearch(location.search);
  /** Hydrogen returns search-only (`?…`); RR7 needs a path + search, not `to="?…"`. */
  const previousHref = `${location.pathname}${previousPageUrl}`;
  const nextHref = `${location.pathname}${nextPageUrl}`;

  const windowStart = Math.max(1, page - 2);
  const pageNumbers = [0, 1, 2, 3, 4].map((i) => windowStart + i);

  const activeClass = 'text-[15px] font-medium text-[#1a1d29]';
  const idleClass =
    'text-[15px] text-[#7a8fb8] transition hover:text-[#1a1d29]';
  const mutedClass = 'text-[15px] text-[#7a8fb8]/55';

  return (
    <nav
      className="py-10 flex items-center justify-end gap-1 font-sans"
      aria-label="Pagination"
    >
      {hasPreviousPage ? (
        <Link
          to={previousHref}
          preventScrollReset
          className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center border border-[#d4d4d4] text-[#1a1d29] transition hover:bg-black/3"
          onClick={() => bumpPage(-1)}
        >
          {busy ? (
            <span className="text-xs">…</span>
          ) : (
            <ChevronLeft size={16} strokeWidth={1.5} aria-hidden />
          )}
        </Link>
      ) : null}

      <div className="flex items-center gap-4 px-1">
        {pageNumbers.map((n) => {
          if (n === page) {
            return (
              <span
                key={n}
                className={activeClass}
                aria-current="page"
                aria-label={`Page ${n}`}
              >
                {busy ? '…' : n}
              </span>
            );
          }
          if (n === 1 && page > 1) {
            return (
              <Link
                key={n}
                to={firstPageHref}
                preventScrollReset
                className={idleClass}
                onClick={() => {
                  setPage(1);
                  if (typeof window !== 'undefined') {
                    sessionStorage.removeItem(storageKey);
                  }
                }}
              >
                {n}
              </Link>
            );
          }
          if (n === page - 1 && hasPreviousPage) {
            return (
              <Link
                key={n}
                to={previousHref}
                preventScrollReset
                className={idleClass}
                onClick={() => bumpPage(-1)}
              >
                {n}
              </Link>
            );
          }
          if (n === page + 1 && hasNextPage) {
            return (
              <Link
                key={n}
                to={nextHref}
                preventScrollReset
                className={idleClass}
                onClick={() => bumpPage(1)}
              >
                {n}
              </Link>
            );
          }
          return (
            <span key={n} className={mutedClass}>
              {n}
            </span>
          );
        })}
      </div>

      {hasNextPage ? (
        <Link
          to={nextHref}
          preventScrollReset
          className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center border border-[#d4d4d4] text-[#1a1d29] transition hover:bg-black/3"
          aria-label="Next page"
          onClick={() => bumpPage(1)}
        >
          {busy ? (
            <span className="text-xs">…</span>
          ) : (
            <ChevronRight size={16} strokeWidth={1.5} aria-hidden />
          )}
        </Link>
      ) : null}
    </nav>
  );
}

/**
 * <PaginatedResourceSection> encapsulates the previous and next pagination behaviors throughout your application.
 */
export function PaginatedResourceSection<NodesType>({
  connection,
  children,
  ariaLabel,
  resourcesClassName,
}: {
  connection: React.ComponentProps<typeof Pagination<NodesType>>['connection'];
  children: React.FunctionComponent<{node: NodesType; index: number}>;
  ariaLabel?: string;
  resourcesClassName?: string;
}) {
  return (
    <Pagination connection={connection}>
      {({
        isLoading,
        hasNextPage,
        hasPreviousPage,
        nextPageUrl,
        previousPageUrl,
      }) => {
        const pageNodes = flattenConnection(connection);
        const resourcesMarkup = pageNodes.map((node, index) =>
          children({node, index}),
        );

        return (
          <div>
            {resourcesClassName ? (
              <div
                aria-label={ariaLabel}
                className={resourcesClassName}
                role={ariaLabel ? 'region' : undefined}
              >
                {resourcesMarkup}
              </div>
            ) : (
              resourcesMarkup
            )}
            <ProductGridPaginationBar
              isLoading={isLoading}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              nextPageUrl={nextPageUrl}
              previousPageUrl={previousPageUrl}
            />
          </div>
        );
      }}
    </Pagination>
  );
}
