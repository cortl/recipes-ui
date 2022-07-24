import process from "process";

const pageView = (url: string): void => {
  const targetId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? "";

  window.gtag("config", targetId, {
    // eslint-disable-next-line no-useless-computed-key
    ["page_path"]: url,
  });
};

export { pageView };
