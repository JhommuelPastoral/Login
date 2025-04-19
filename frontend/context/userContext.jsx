import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

useEffect(() => {
  axios.get("https://login-20a8.onrender.com/profile")
    .then(({ data }) => {
      if (data) {
        setUser(data);
        // Only navigate if we're not already on /Home
        if (window.location.pathname === "/") {
          navigate("/Home");
        }
      } else {
        navigate("/");
      }
    })
    .catch((err) => {
      console.error("Token expired or request failed:", err);
      setUser(null);
      navigate("/");
    });
}, []);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
