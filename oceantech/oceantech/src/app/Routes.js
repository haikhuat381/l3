import Layout from "./components/Layout/Layout";
import AuthGuard from "app/auth/AuthGuard";
import NotFound from "./components/NotFound";
import NewEmployeeRoutes from "./views/NewEmployee/NewEmployeeRoutes";
import ManageEmployeeRoutes from "./views/ManageEmployee/ManageEmployeeRoutes";
import ReleaseRoutes from "./views/Release/ReleaseRoutes";
import ApprovedRoutes from "./views/Approved/ApprovedRoutes";
import ApprovalRoutes from "./views/Approval/ApprovalRoutes";
import sessionRoutes from "app/views/sessions/SessionRoutes";
const routes = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      ...ManageEmployeeRoutes,
      ...NewEmployeeRoutes,
      ...ReleaseRoutes,
      ...ApprovalRoutes,
      ...ApprovedRoutes,
    ],
  },
  ...sessionRoutes,
  { path: "*", element: <NotFound /> },
];

export default routes;
