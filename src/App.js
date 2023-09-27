import React from "react";
import { Routes, Route, } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const Login = React.lazy(() => import('./views/startscreens/Login'));
const Register = React.lazy(() => import('./views/startscreens/Register'));
const Home = React.lazy(() => import('./views/home/Home'));

const loading = (
  <div>
    Loading...
  </div>
)

function App() {
  return (
    <React.Suspense fallback={loading}>
      <Routes>
        <Route path="/" name="Home" element={<Home />} />
        <Route path="/login" name="Login" element={<Login />} />
        <Route path="/register" name="Register" element={<Register />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
