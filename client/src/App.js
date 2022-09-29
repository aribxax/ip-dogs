import "./App.css";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Details from "./components/Details";
import Form from "./components/Form";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";

function App() {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="App">
      {showNav && (
        <nav>
          <Navbar />
        </nav>
      )}
      <Routes>
        <Route exact path="/" element={<Landing funcNav={setShowNav} />} />
        <Route path="/home" element={<Main funcNav={setShowNav} />} />
        <Route path="/details/:id" element={<Details funcNav={setShowNav} />} />
        <Route path="/newdog" element={<Form funcNav={setShowNav} />} />
        <Route path="/favorites" element={<Favorites funcNav={setShowNav}/>} />
        <Route path="/404" element={<NotFound funcNav={setShowNav} />} />
        <Route path="*" element={<Navigate to="/404" replace />} />

      </Routes>
    </div>
  );
}

export default App;
