import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
function ProtectedRoute({ element, ...rest }) {
  // Replace this with your own logic to check the authentication status
  const isAuthenticated = secureLocalStorage.getItem("isAuthenticated");
  const verified = secureLocalStorage.getItem("verified");
  // Use the useNavigate hook to get a function to navigate to other routes
  const navigate = useNavigate();

  // If the user is authenticated, return the element prop
  // Otherwise, return a redirect to the login page
  //
  useEffect(() => {
    isAuthenticated
      ? verified == 1
        ? element
        : navigate("/Verification")
      : navigate("/");
  }, []);

  return element;
}

export default ProtectedRoute;
