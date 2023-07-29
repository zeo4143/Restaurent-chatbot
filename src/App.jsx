import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./LoginSignUp/SignUp";
import Login from "./LoginSignUp/Login";
import { UserAuthCOntextProvider } from "./Context/UserAuthCOntextProvider";
import ProtectedRoute from "./LoginSignUp/ProtectedRoute";
import Chatbot from "./Components/Chatbot/Chatbot";
import ProtectedRouteForLogin from "./LoginSignUp/ProtectedRouteForLogin";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <ProtectedRouteForLogin>
          <Login />,
        </ProtectedRouteForLogin>
      ),
    },
    {
      path: "/SignUp",
      element: (
        <ProtectedRouteForLogin>
          <SignUp />,
        </ProtectedRouteForLogin>
      ),
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Chatbot />
        </ProtectedRoute>
      ),
    },
  ]);
  return (
    <div>
      <UserAuthCOntextProvider>
        <RouterProvider router={router} />
      </UserAuthCOntextProvider>
    </div>
  );
}
