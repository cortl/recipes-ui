import type {
  ArrayFilter,
  BooleanFilter,
  Filter,
  NumberFilter,
} from "../../types/resolvers";

const doesValueExist = (
  value: unknown | null | undefined,
  filter: Filter,
): boolean => (filter.exists ? value !== null : value === null);

const filterBoolean = (
  value: boolean | null | undefined,
  filter: BooleanFilter,
): boolean => {
  let keep = true;

  if (filter.hasOwnProperty("exists")) {
    keep = doesValueExist(value, filter);
  }

  if (filter.hasOwnProperty("is")) {
    keep = keep && Boolean(value) === filter.is;
  }

  return keep;
};

const filterArray = (value: unknown[], filter: ArrayFilter): boolean => {
  let keep = true;

  if (filter.hasOwnProperty("exists")) {
    keep = doesValueExist(value, filter);
  }

  if (filter.hasOwnProperty("in")) {
    const result = filter.in.every((filterValue) =>
      value.includes(filterValue),
    );

    keep = keep && result;
  }

  return keep;
};

const filterNumber = (value: number, filter: NumberFilter): boolean => {
  let keep = true;

  if (filter.hasOwnProperty("exists")) {
    keep = doesValueExist(value, filter);
  }

  if (filter.hasOwnProperty("gt")) {
    keep = keep && value > filter.gt;
  }

  if (filter.hasOwnProperty("lt")) {
    keep = keep && value < filter.lt;
  }

  if (filter.hasOwnProperty("eq")) {
    keep = keep && filter.eq === value;
  }

  return keep;
};

export { filterBoolean, filterArray, filterNumber };
