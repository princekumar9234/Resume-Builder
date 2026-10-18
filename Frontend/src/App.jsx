import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { AuthProvider } from "./features/auth/Auth.context.jsx";
import { InterviewProvider } from "./features/Interview/Interview.content.jsx";

const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  );
};

export default App;
