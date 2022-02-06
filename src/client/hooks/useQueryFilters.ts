import { useRouter } from "next/router";

const useQueryFilters = () => {
  const router = useRouter();

  const queryFilters = router.query.filters;
  const filters = queryFilters
    ? Array.isArray(queryFilters)
      ? queryFilters
      : [queryFilters]
    : [];

  return filters;
};

export { useQueryFilters };
