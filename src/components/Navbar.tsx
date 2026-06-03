import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
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
                        {/* <Link to="/#offres" className="text-gray-700 hover:text-blue-600 transition">
                            Offres
                        </Link> */}
                        <button onClick={() => navigate("/#applications")} className="text-gray-700 hover:text-blue-600 transition">
                            Offres
                        </button>
                        <Link to="/support" className="text-gray-700 hover:text-blue-600 transition">
                            Support
                        </Link>
                    </div>

                    <div className="hidden md:flex gap-3 items-center">
                        {token ? (
                            <div className="relative group">
                                <button className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-xl hover:bg-gray-100 transition">
                                    👤
                                </button>

                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block">
                                    <button
                                        onClick={() => navigate("/profil")}
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Mon profil
                                    </button>

                                    <button
                                        onClick={() => navigate("/instances")}
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Mes instances
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                    >
                                        Déconnexion
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
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
                                    Créer son compte
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;