import React, { createContext, useState } from "react";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [managerPhone, setManagerPhone] = useState("");

  return (
    <ContactContext.Provider value={{ managerPhone, setManagerPhone }}>
      {children}
    </ContactContext.Provider>
  );
};
