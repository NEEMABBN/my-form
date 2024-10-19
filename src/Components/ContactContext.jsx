import React, { createContext, useContext, useState } from "react";

const ContactContext = createContext();

export const useContact = () => {
  return useContext(ContactContext);
};

export const ContactProvider = ({ children }) => {
  const [phone, setPhone] = useState("");

  return (
    <ContactContext.Provider value={{ phone, setPhone }}>
      {children}
    </ContactContext.Provider>
  );
};
