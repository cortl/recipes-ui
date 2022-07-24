/* eslint-disable no-console */
import { useEffect } from "react";

const useServiceWorker = (): void => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope:",
              registration.scope
            );
          },
          function (error) {
            console.log("Service Worker registration failed:", error);
          }
        );
      });
    }
  }, []);
};

export { useServiceWorker };
/* eslint-enable no-console */