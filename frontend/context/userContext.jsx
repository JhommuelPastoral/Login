import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    if (token) {
      // If there's a token, send it with the request to the profile endpoint
      axios.get("https://login-20a8.onrender.com/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (data) {
          setUser(data);
          navigate("/Home");
        } else {
          setUser(null);
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Token expired or request failed:", err);
        setUser(null);
        navigate("/");
      });
    } else {
      // If no token, treat user as logged out
      setUser(null);
      navigate("/");
    }
  }, [navigate]);



  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
