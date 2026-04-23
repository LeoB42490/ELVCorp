import { useNavigate, Link } from "react-router-dom";

function Inscription() {
    const navigate = useNavigate();
    return (
        <>
        {/* <!-- Navigation --> */}
    <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                {/* <!-- Logo --> */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-lg">⚡</span>
                    </div>
                    <button className="text-xl font-bold text-blue-600" onClick={() => navigate("/")}>HostBuster</button>
                </div>

                {/* <!-- Menu Desktop --> */}
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

                {/* <!-- Boutons --> */}
                <div className="hidden md:flex gap-3">
                    <button className="text-gray-700 px-4 py-2 hover:text-blue-600 transition" onClick={() => navigate("/login")}>
                        Connexion
                    </button>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition" onClick={() => navigate("/register")}>
                        Créer son compte
                    </button>
                </div>

                {/* <!-- Menu Mobile --> */}
                <button className="md:hidden text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    </nav>

    {/* <!-- Main Content --> */}
    <section className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            {/* <!-- Header --> */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Créer un compte</h1>
                <p className="text-gray-600">Rejoignez HostBuster en quelques minutes</p>
            </div>

            {/* <!-- Register Form --> */}
            <form className="space-y-5">
                {/* <!-- Prénom --> */}
                <div>
                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-900 mb-2">
                        Prénom
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        placeholder="Jean"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        required
                    />
                </div>

                {/* <!-- Nom --> */}
                <div>
                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-900 mb-2">
                        Nom
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        placeholder="Dupont"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        required
                    />
                </div>

                {/* <!-- Email --> */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                        Adresse e-mail
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="vous@example.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        required
                    />
                </div>

                {/* <!-- Password --> */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">Au minimum 8 caractères</p>
                </div>

                {/* <!-- Confirm Password --> */}
                <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-900 mb-2">
                        Confirmer le mot de passe
                    </label>
                    <input
                        type="password"
                        id="confirm-password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        required
                    />
                </div>

                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition mt-6 block text-center" onClick={() => navigate("/")}>
                    Créer mon compte
                </button>
            </form>

            {/* <!-- Login Link --> */}
            <div className="text-center mt-8 pt-8 border-t border-gray-200">
                <p className="text-gray-600 mb-2">Vous avez déjà un compte?</p>
                <button className="text-blue-600 hover:text-blue-700 font-semibold transition" onClick={() => navigate("/login")}>
                    Se connecter
                </button>
            </div>
        </div>
    </section>

    {/* <!-- Footer --> */}
    <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-600">© 2026 HostBuster. Tous droits réservés.</p>
                <div className="flex gap-6 text-sm text-gray-600">
                    {/* @TODO Modifier les lien href */}
                    <a href="#" className="hover:text-blue-600 transition">Contact</a>
                </div>
            </div>
        </div>
    </footer>
        </>
    )
}

export default Inscription