import { createContext } from "react";

const UniverseQualityContext = createContext(null);

export function UniverseQuality({ quality, children }) {
  return (
    <UniverseQualityContext.Provider value={quality}>
      {children}
    </UniverseQualityContext.Provider>
  );
}
