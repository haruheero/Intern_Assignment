import React from "react";
import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";

import Login from "./LoginScreen/Login";
import Signup from "./LoginScreen/Signup";
import Crud from "./Components/Crud";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="27454782409-8b1a98095dld4bihdvq779shulv7b20e.apps.googleusercontent.com">
    <ChakraProvider>
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/crud" element={<Crud />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </>
    </ChakraProvider>
    </GoogleOAuthProvider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
