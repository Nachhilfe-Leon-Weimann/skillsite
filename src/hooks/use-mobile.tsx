"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768; // px

type DeviceContextProps = { isMobile: boolean | undefined };

export const DeviceContext = React.createContext<DeviceContextProps>({
  isMobile: undefined,
});

export const DeviceContextProvider = ({
  children,
  ...props
}: DeviceContextProps & { children: React.ReactNode }) => {
  return (
    <DeviceContext.Provider value={props}>{children}</DeviceContext.Provider>
  );
};

export function useIsMobile() {
  const context = React.useContext(DeviceContext);

  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    context.isMobile,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
