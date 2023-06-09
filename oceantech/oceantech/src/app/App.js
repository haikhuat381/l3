import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./Routes";
import { AuthProvider } from "./../app/contexts/JWTAuthContext";

const App = () => {
  const content = useRoutes(routes);

  return <AuthProvider>{content}</AuthProvider>;
};

export default App;
