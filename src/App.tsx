import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import MotDePasseOublie from "./pages/MotDePasseOublie";
import ResetPassword from "./pages/ResetPassword";
import Offers from "./pages/Offers";
import Profil from "./pages/Profil";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Connexion />} />
                <Route path="/register" element={<Inscription />} />
                <Route path="/mot-de-passe-oublie" element={<MotDePasseOublie />} />
                <Route path="/reset-password" element={<ResetPassword/>} />
                <Route path="/offers/:id" element={<Offers />} />
                <Route path="/profil" element={<Profil />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App