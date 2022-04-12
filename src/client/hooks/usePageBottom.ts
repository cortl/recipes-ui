import React from "react";

const usePageBottom = () => {
  const [bottom, setBottom] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50;

      setBottom(isBottom);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return bottom;
};

export { usePageBottom };
