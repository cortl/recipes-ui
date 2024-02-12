"use client";

import React from "react";

const useIsMobile = (): boolean => {
  const [width, setWidth] = React.useState<number>(window.innerWidth);
  const handleWindowSizeChange = (): void => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return (): void => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return width <= 768;
};

export { useIsMobile };
