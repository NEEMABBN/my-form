import React from "react";
import { Route, Routes } from "react-router-dom";
import router from "./router";
import { ContactProvider } from "./Components/ContactContext";
function App() {
  return (
    <div className="w-full sm:pt-16 pt-10 pb-20 sm:pb-32 bg-gray-200">
      <div className="container mx-auto flex items-center justify-center">
        <ContactProvider>
          <Routes>
            {router.map((item, index) => (
              <Route key={index} path={item.path} element={item.element} />
            ))}
          </Routes>
        </ContactProvider>
      </div>
    </div>
  );
}

export default App;
