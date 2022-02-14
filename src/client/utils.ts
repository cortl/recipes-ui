const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const capitalizeFirstLetter = (string: string): string => {
  const spl = string.split(" ");
  return spl.map(capitalize).join(" ");
};

const getSitenameFromUrl = (source: string): string => {
  const host = new URL(source).hostname;
  const site = host.replace("www.", "");

  return capitalizeFirstLetter(site.slice(0, Math.max(0, site.indexOf("."))));
};

export { getSitenameFromUrl, capitalizeFirstLetter };
