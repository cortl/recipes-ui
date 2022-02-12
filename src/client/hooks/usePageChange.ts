import { useRouter } from "next/router";
import { useEffect } from "react";

import * as Analytics from "../analytics";

const usePageChange = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      Analytics.pageView(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};

export { usePageChange };
