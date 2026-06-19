import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import MotDePasseOublie from "./pages/MotDePasseOublie";
import ResetPassword from "./pages/ResetPassword";
import Offers from "./pages/Offers";
import Profil from "./pages/Profil";
import Support from "./pages/Support";
import Faq from "./pages/Faq";
import Instances from "./pages/Instances";

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
                <Route path="/support" element={<Support />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/instances" element={<Instances />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App