import { useEffect } from "react";
import { useQueryClient } from "react-query";

export default function usePrefetchPageQueries({
  baseKey,
  pageNumber,
  fetcher,
  minPage = 1,
  maxPage = 500,
  enabled = true,
  extraKeyParts = [],
}) {
  const queryClient = useQueryClient();
  const serializedExtraKeyParts = JSON.stringify(extraKeyParts);

  useEffect(() => {
    if (!enabled) return;
    const stableExtraKeyParts = JSON.parse(serializedExtraKeyParts);

    const nextPage = Number(pageNumber) + 1;
    const prevPage = Number(pageNumber) - 1;

    if (prevPage >= minPage) {
      queryClient.prefetchQuery(
        [baseKey, ...stableExtraKeyParts, { pageNumber: prevPage }],
        fetcher
      );
    }

    if (nextPage <= maxPage) {
      queryClient.prefetchQuery(
        [baseKey, ...stableExtraKeyParts, { pageNumber: nextPage }],
        fetcher
      );
    }
  }, [baseKey, enabled, fetcher, maxPage, minPage, pageNumber, queryClient, serializedExtraKeyParts]);
}
