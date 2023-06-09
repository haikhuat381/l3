import Loadable from "app/components/Loadable";
import { lazy } from "react";

const NotFound = Loadable(lazy(() => import("./../../components/NotFound")));

const JwtLogin = Loadable(lazy(() => import("./JwtLogin")));

const sessionRoutes = [
  { path: "/session/signup", element: <NotFound /> },
  { path: "/session/signin", element: <JwtLogin /> },
  { path: "/session/forgot-password", element: <NotFound /> },
  { path: "/session/404", element: <NotFound /> },
];

export default sessionRoutes;
