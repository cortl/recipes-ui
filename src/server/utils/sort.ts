import { SortDirection } from "../../types/graphql";

const byNumber = (a: number, b: number, direction: SortDirection): number =>
  direction === SortDirection.ASC ? a - b : b - a;

const byString = (a: string, b: string, direction: SortDirection): number => {
  const upperA = a.toUpperCase();
  const upperB = b.toUpperCase();

  if (upperA < upperB) {
    return direction === SortDirection.ASC ? -1 : 1;
  }

  if (upperA > upperB) {
    return direction === SortDirection.ASC ? 1 : -1;
  }

  return 0;
};

const sortByField =
  (field: string, direction: SortDirection) =>
  (a: Record<string, unknown>, b: Record<string, unknown>): number => {
    const aField = a[field];
    const bField = b[field];

    return typeof aField === "number"
      ? byNumber(aField, bField as number, direction)
      : byString(aField as string, bField as string, direction);
  };

export { sortByField };
