const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const capitalizeFirstLetter = (string: string): string => {
  const spl = string.split(" ");

  return spl.map(capitalize).join(" ");
};

export { capitalizeFirstLetter };
