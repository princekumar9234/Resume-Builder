import { createBrowserRouter } from "react-router";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import EmailVerify from "./features/auth/pages/EmailVerify";
import HomePage from "./features/auth/pages/HomePage";
import Protected from "./features/auth/components/Protected";
import UpdatePassword from "./features/auth/pages/UpdatePassword";
import ForgetPassPage from "./features/auth/pages/ForgetPassPage.jsx";



export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/verifyEmail",
    element: <EmailVerify />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <HomePage />
       
      </Protected>
    ),
  },
  {
    path: "/updatePassword",
    element: <UpdatePassword />,
  },
  {
    path: "/forgetPassPage",
    element: <ForgetPassPage />,
  },
]);
