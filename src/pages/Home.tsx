import minecraftImage from '../assets/minecraft.png'
import glpiImage from '../assets/glpi.png'
import odooImage from '../assets/odoo.png'
import wordpressImage from '../assets/wordpress.png'
import reseauImage from '../assets/reseau.png'
import Navbar from "../components/Navbar";
import { Link, useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();
  return (
    <>
    <div className="Principal">

    <Navbar />

    {/* <!-- Hero Section --> */}
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* <!-- Contenu --> */}
                <div>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        Lancez votre application <br className="hidden md:block" />dès maintenant
                    </h1>
                    <p className="text-gray-600 text-lg mb-8">
                        Déployez WordPress, Odoo, GLPi ou Minecraft en moins de 3 minutes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/#offres" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition block text-center">
                            Voir les instances
                        </Link>
                        <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition text-center" onClick={() => navigate("/login")}>
                          Connexion
                        </button>
                    </div>
                </div>

                {/* <!-- Illustration --> */}
                <div className="hidden md:block">
                    <img src={reseauImage} alt="Infrastructure Cloud" className="w-full h-auto rounded-2xl" width="170" height="179"/>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Instances Section --> */}
    <section id="offres" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choisissez votre instance
            </h2>
            <p className="text-gray-600 mb-12 max-w-2xl">
                Sélectionnez la solution qui correspond le mieux à vos besoins professionnels
            </p>

             {/* <!-- Offerings Section --> */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">📋 Nos offres</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 border-2 border-gray-200 rounded-lg text-center hover:border-indigo-500 hover:bg-indigo-50 transition">
                    <div className="text-4xl mb-3">🔧</div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Compte</h4>
                    <p className="text-gray-600 text-sm">Gère ton profil et tes paramètres</p>
                </div>
                <div className="p-6 border-2 border-gray-200 rounded-lg text-center hover:border-indigo-500 hover:bg-indigo-50 transition">
                    <div className="text-4xl mb-3">📦</div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Nos offres</h4>
                    <p className="text-gray-600 text-sm">Découvre tous nos services</p>
                </div>
                <div className="p-6 border-2 border-gray-200 rounded-lg text-center hover:border-indigo-500 hover:bg-indigo-50 transition">
                    <div className="text-4xl mb-3">🆘</div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Support</h4>
                    <p className="text-gray-600 text-sm">Contacte notre équipe d'assistance</p>
                </div>
                <div className="p-6 border-2 border-gray-200 rounded-lg text-center hover:border-indigo-500 hover:bg-indigo-50 transition">
                    <div className="text-4xl mb-3">❓</div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">FAQ</h4>
                    <p className="text-gray-600 text-sm">Trouve des réponses à tes questions</p>
                </div>
            </div>
        </div>

            {/* <!-- Grille de cartes --> */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* <!-- WordPress --> */}
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 h-40 flex items-center justify-center">
                        <div className="text-center">
                            <img src={wordpressImage} alt="WordPress" className="h-20 mb-2"/>
                            <p className="font-bold text-gray-700">WordPress</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">Déploiement en un clic</h3>
                        <ul className="text-sm text-gray-600 space-y-2 mb-6">
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> Hébergement optimisé
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> Sécurité renforcée
                            </li>
                        </ul>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition" onClick={() => navigate("/offers/4")}>
                            À partir 4,99€/mois
                        </button>
                    </div>
                </div>

                {/* <!-- Odoo --> */}
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
                    <div className="bg-gradient-to-br from-orange-100 to-orange-200 h-40 flex items-center justify-center">
                        <div className="text-center">
                            <img src={odooImage} alt="Odoo" className="h-20 mb-2"/>
                            <p className="font-bold text-gray-700">Odoo</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">ERP complet et modulable</h3>
                        <ul className="text-sm text-gray-600 space-y-2 mb-6">
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> Hébergement performant
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> Suivi en temps réel
                            </li>
                        </ul>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition" onClick={() => navigate("/offers/2")}>
                            À partir 4,99€/mois
                        </button>
                    </div>
                </div>

                {/* <!-- GLPi --> */}
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
                    <div className="bg-gradient-to-br from-green-100 to-green-200 h-40 flex items-center justify-center">
                        <div className="text-center">
                            <img src={glpiImage} alt="GLPI" className="h-20 mb-2"/>
                            <p className="font-bold text-gray-700">GLPI</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">Gestion de parc IT</h3>
                        <ul className="text-sm text-gray-600 space-y-2 mb-6">
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> Interface intuitive
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> Support helpdesk
                            </li>
                        </ul>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition" onClick={() => navigate("/offers/3")}>
                            À partir 4,99€/mois
                        </button>
                    </div>
                </div>

                {/* <!-- Minecraft --> */}
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
                    <div className="bg-gradient-to-br from-red-100 to-red-200 h-40 flex items-center justify-center">
                        <div className="text-center">
                            <img src={minecraftImage} alt="Minecraft" className="h-28 mb-2"/>
                            <p className="font-bold text-gray-700">Minecraft</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">Créer serveur de jeu</h3>
                        <ul className="text-sm text-gray-600 space-y-2 mb-6">
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> Paramètres personnalisés
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> Supervision continue
                            </li>
                        </ul>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition" onClick={() => navigate("/offers/1")}>
                            À partir 9,99€/mois
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Footer Features --> */}
    <section className="bg-blue-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
                {/* <!-- Sécurité --> */}
                <div className="flex gap-4 items-start">
                    <div className="text-2xl">🔒</div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Sécurisé</h3>
                        <p className="text-sm text-gray-600">Protection complète de vos données et infrastructure</p>
                    </div>
                </div>

                {/* <!-- Supervision --> */}
                <div className="flex gap-4 items-start">
                    <div className="text-2xl">👁️</div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Supervision 24/7</h3>
                        <p className="text-sm text-gray-600">Monitrage continu de vos applications et services</p>
                    </div>
                </div>

                {/* <!-- Déploiement --> */}
                <div className="flex gap-4 items-start">
                    <div className="text-2xl">⚡</div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Déploiement rapide</h3>
                        <p className="text-sm text-gray-600">Installation en moins de 3 minutes garantie</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* /* <!-- Footer Navigation --> */}
    <footer className="bg-white border-t border-gray-200">
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
    </div>
    </>
    )
}

export default Home
