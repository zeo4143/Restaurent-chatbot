import React from "react";
import SignUp from "./Components/SignUp";
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import Login from "./Components/Login";
import { UserAuthCOntextProvider } from "./Context/UserAuthCOntextProvider";
import ProtectedRoute from "./Components/ProtectedRoute";
import Chatbot from "./Components/Chatbot/Chatbot";
import ProtectedRouteForLogin from "./Components/ProtectedRouteForLogin";

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
      element: <SignUp />,
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
