import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const userInfoJSON = localStorage.getItem("userInfor");
  const user = userInfoJSON && JSON.parse(userInfoJSON);
  const [auth, setAuth] = useState(user);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
