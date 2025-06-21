import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/auth";
import Profile from "./pages/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/auth" Component={Auth} />
        <Route path="/profile" Component={Profile} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
