import { createBrowserRouter } from "react-router";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import EmailVerify from "./features/auth/pages/EmailVerify";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",  
    element: <RegisterPage />,
  },{
    path :"/verify-email",
    element : <EmailVerify/>
  }
]);
