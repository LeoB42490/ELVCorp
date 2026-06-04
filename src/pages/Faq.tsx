import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Faq() {
    const navigate = useNavigate();

    const questions = [
        {
            question: "Quelles applications puis-je déployer ?",
            answer: "Tu peux déployer des applications comme WordPress, Odoo, GLPI ou encore un serveur Minecraft selon les offres disponibles."
        },
        {
            question: "Combien de temps prend la création d'une instance ?",
            answer: "Le déploiement est prévu pour être rapide. L'objectif du projet est de permettre la création d'une instance en quelques minutes."
        },
        {
            question: "Puis-je modifier les ressources d'une instance ?",
            answer: "Oui, selon l'offre choisie, il est possible de modifier certaines ressources comme la RAM, le CPU ou le stockage."
        },
        {
            question: "Que se passe-t-il si une instance échoue au déploiement ?",
            answer: "En cas d'erreur, une notification peut être envoyée à l'utilisateur et aux administrateurs afin de traiter le problème rapidement."
        },
        {
            question: "Puis-je supprimer une instance ?",
            answer: "Oui, tu peux supprimer une instance depuis ton espace utilisateur. Une confirmation peut être envoyée par e-mail après la suppression."
        },
        {
            question: "Est-ce que mes données sont sécurisées ?",
            answer: "La plateforme est pensée pour être sécurisée, avec une gestion des comptes, des instances et des accès utilisateurs."
        }
    ];

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-white rounded-xl shadow-lg p-10">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">
                            Foire aux questions
                        </h1>

                        <p className="text-gray-600 mb-10">
                            Retrouve ici les réponses aux questions les plus fréquentes sur le fonctionnement de notre plateforme PaaS.
                        </p>

                        <div className="space-y-6">
                            {questions.map((item, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                                >
                                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                        {item.question}
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                Tu as une autre question ?
                            </h2>

                            <p className="text-gray-600 mb-6">
                                Si tu ne trouves pas la réponse à ta question, tu peux contacter le support.
                            </p>

                            <button
                                onClick={() => navigate("/support")}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                                Contacter le support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Faq;