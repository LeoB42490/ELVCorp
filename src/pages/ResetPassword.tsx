import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../api";

function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const email = searchParams.get("email") || "";
    const token = searchParams.get("token") || "";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!email || !token) {
            setError("Lien de réinitialisation invalide.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        const data = await resetPassword({
            email,
            token,
            password,
        });

        if (data.message === "Mot de passe réinitialisé avec succès.") {
            setMessage(data.message);
            setTimeout(() => navigate("/login"), 1500);
        } else {
            setError(data.message || "Erreur lors de la réinitialisation.");
        }
    }

    return (
        <>
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                <span className="text-white font-bold text-lg">⚡</span>
                            </div>
                            <button
                                className="text-xl font-bold text-blue-600"
                                onClick={() => navigate("/")}
                            >
                                HostBuster
                            </button>
                        </div>

                        <div className="hidden md:flex gap-8 items-center">
                            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
                                Accueil
                            </Link>
                            <Link to="/#offres" className="text-gray-700 hover:text-blue-600 transition">
                                Offres
                            </Link>
                            <Link to="/support" className="text-gray-700 hover:text-blue-600 transition">
                                Support
                            </Link>
                        </div>

                        <div className="hidden md:flex gap-3">
                            <button
                                className="text-gray-700 px-4 py-2 hover:text-blue-600 transition"
                                onClick={() => navigate("/login")}
                            >
                                Connexion
                            </button>
                            <button
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                                onClick={() => navigate("/register")}
                            >
                                Créer un compte
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <div className="mb-4 flex justify-center">
                            <div className="text-4xl">🔑</div>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Nouveau mot de passe
                        </h1>
                        <p className="text-gray-600">
                            Choisissez un nouveau mot de passe pour sécuriser votre compte.
                        </p>
                    </div>

                    {!email || !token ? (
                        <div className="text-center">
                            <p className="text-red-600 text-sm mb-6">
                                Lien de réinitialisation invalide ou incomplet.
                            </p>
                            <button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                                onClick={() => navigate("/mot-de-passe-oublie")}
                            >
                                Demander un nouveau lien
                            </button>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                                    Nouveau mot de passe
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Au minimum 6 caractères
                                </p>
                            </div>

                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-900 mb-2">
                                    Confirmer le mot de passe
                                </label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                                    required
                                />
                            </div>

                            {message && (
                                <p className="text-green-600 text-sm text-center">
                                    {message} Redirection vers la connexion...
                                </p>
                            )}

                            {error && (
                                <p className="text-red-600 text-sm text-center">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                            >
                                Réinitialiser le mot de passe
                            </button>
                        </form>
                    )}

                    <div className="text-center mt-8 pt-8 border-t border-gray-200">
                        <p className="text-gray-600 mb-2">
                            Vous vous souvenez de votre mot de passe ?
                        </p>
                        <button
                            className="text-blue-600 hover:text-blue-700 font-semibold transition"
                            onClick={() => navigate("/login")}
                        >
                            Retour à la connexion
                        </button>
                    </div>
                </div>
            </section>

            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-600">
                            © 2026 HostBuster. Tous droits réservés.
                        </p>
                        <div className="flex gap-6 text-sm text-gray-600">
                            <a href="#" className="hover:text-blue-600 transition">
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default ResetPassword;