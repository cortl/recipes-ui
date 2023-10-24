const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const capitalizeFirstLetter = (string: string): string => {
  const spl = string.split(" ");

  return spl.map(capitalize).join(" ");
};

const byRating = (recipeA: Recipe, recipeB: Recipe): number =>
  recipeB.rating > recipeA.rating
    ? 1
    : recipeA.rating > recipeB.rating
    ? -1
    : 0;

const calculateAverageFromField = <T extends Object>(
  objects: T[],
  field: string,
): number =>
  Math.round(
    (objects.reduce((total, obj) => {
      const value = obj[field as keyof T];

      if (typeof value === "number") return total + value;

      return total;
    }, 0) /
      objects.length) *
      100,
  ) / 100;

export { capitalizeFirstLetter, byRating, calculateAverageFromField };
