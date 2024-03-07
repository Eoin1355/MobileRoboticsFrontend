import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import DocsPage from "./pages/DocsPage";
import { useEffect, useState } from "react";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const validateToken = async () => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        try {
          const response = await fetch(
            "http://3.254.68.200:8000/api/validate_token/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.ok) {
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
          }
        } catch (error) {
          // console.error("Error validating token:", error);
        }
      }
    };

    validateToken();
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={authenticated} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/admin"
          element={<AdminPage authenticated={authenticated} />}
        />
        <Route path="/documentation" element={<DocsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
