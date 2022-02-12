const pageView = (url: string) => {
  const targetId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? "";

  window.gtag("config", targetId, {
    page_path: url,
  });
};

export { pageView };
