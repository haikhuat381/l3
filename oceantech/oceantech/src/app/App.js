import React, { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import { useRoutes } from "react-router-dom";
import routes from "./Routes";
import { async } from "regenerator-runtime";
import axios from "axios";
const App = () => {
  const content = useRoutes(routes);

  //  token
  const getdata = async () => {
    return await axios.post(
      "http://em-dev.oceantech.com.vn/em/oauth/token",
      {
        clinet_id: "core_client",
        grant_type: "password",
        client_secret: "secret",
        username: "admin",
        password: "admin",
      },
      {
        headers: {
          Authorization: "Basic Y29yZV9jbGllbnQ6c2VjcmV0",
        },
      }
    );
  };

  const setDataStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  useEffect(() => {
    getdata().then((res) => {
      // console.log("sjdhgajsdha", res?.data.access_token);
      localStorage.setItem("access_token", res?.data.access_token);
      // setDataStorage("access_token", JSON.stringify(res?.data.access_token))
    });
  }, []);

  return (
    <>
      <>{content}</>
    </>
  );
};

export default App;
