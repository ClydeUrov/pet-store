import { createContext, useContext, useState } from "react";

const userContext = createContext(undefined);

export const useUserContext = function () {
  return useContext(userContext);
};

export function UserLoginedProvider({ children }) {
  const [userLogined, setUserLogined] = useState(false);
  if (!userContext) throw new Error("Context was called out of the provider");

  return (
    <userContext.Provider value={{ userLogined, setUserLogined }}>
      {children}
    </userContext.Provider>
  );
}
