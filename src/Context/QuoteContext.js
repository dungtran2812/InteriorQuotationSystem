import React, { createContext, useState } from 'react';

// Create a new context
const QuoteContext = createContext();

// Create a provider component
const QuoteProvider = ({ children }) => {
  const [quoteId, setQuoteId] = useState(null);
  const [projectId, setProjectId] = useState(null);
  return (
    <QuoteContext.Provider value={{ quoteId, setQuoteId, projectId, setProjectId }}>
      {children}
    </QuoteContext.Provider>
  );
};

export { QuoteContext, QuoteProvider };
