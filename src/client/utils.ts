const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const getSitenameFromUrl = (source: string): string => {
  const host = new URL(source).hostname;
  const site = host.replace("www.", "");

  return capitalizeFirstLetter(site.slice(0, Math.max(0, site.indexOf("."))));
};

export { getSitenameFromUrl };
