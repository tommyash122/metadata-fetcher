import React, { createContext, useContext, useState } from 'react';

const MetadataContext = createContext();

export const useMetadata = () => useContext(MetadataContext);

export function MetadataProvider({ children }) {
  const [metadata, setMetadata] = useState(JSON.parse(localStorage.getItem('metadata')) || []);

  return (
    <MetadataContext.Provider value={{ metadata, setMetadata }}>
      {children}
    </MetadataContext.Provider>
  );
}
