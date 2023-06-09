import Loadable from "app/components/Loadable";
import { lazy } from "react";

const NewEmployee = Loadable(lazy(() => import("./NewEmployee")));

const NewEmployeeRoutes = [
  { path: "/addnew_employee", element: <NewEmployee /> },
];

export default NewEmployeeRoutes;
