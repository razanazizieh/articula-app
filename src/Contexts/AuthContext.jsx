import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isInitialized, setIsInitialized] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const savedData = localStorage.getItem("theUserData");
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          if (parsedData && parsedData.ps) {
            setUserInfo(parsedData);
          } else {
            localStorage.removeItem("theUserData");
          }
        } catch (e) {
          console.error("Error reading user data from localStorage", e);
          localStorage.removeItem("theUserData");
        }
      }
      setIsInitialized(false);
    };

    checkAuth();
  }, []);

  const updateUserInfo = (newData) => {
    setUserInfo((prev) => {
      const updated = { ...prev, ...newData };
      localStorage.setItem("theUserData", JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    localStorage.removeItem("theUserData");
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{ userInfo, setUserInfo, updateUserInfo, isInitialized, logout }}
    >
      {!isInitialized ? (
        children
      ) : (
        <div className="vh-100 d-flex align-items-center justify-content-center"></div>
      )}
    </AuthContext.Provider>
  );
};
