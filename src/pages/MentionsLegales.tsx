import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MentionsLegales() {
    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-gray-50 py-12 px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-8 md:p-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">
                        Mentions légales
                    </h1>

                    <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-amber-900">
                        <p className="font-medium">Projet pédagogique</p>
                        <p className="mt-1 text-sm">
                            HostBuster est un projet fictif réalisé dans le
                            cadre du Projet Tuteuré Bac+3 CPI (année
                            2025-2026). Il ne s'agit pas d'une société
                            immatriculée : aucun numéro SIRET/RCS réel ne
                            peut donc être communiqué. Aucune activité
                            commerciale réelle n'est exercée sous ce nom.
                        </p>
                    </div>

                    <div className="space-y-8 text-gray-700 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                1. Éditeur du site
                            </h2>

                            <p>
                                Le site HostBuster est édité par l'équipe
                                projet en charge du Projet Tuteuré Bac+3 CPI
                                (BORIE / GALLAY / D'ANGELO), dans le cadre
                                d'un exercice pédagogique encadré par
                                l'établissement de formation.
                            </p>

                            <p className="mt-3">
                                Responsable de la publication : l'équipe
                                projet mentionnée ci-dessus.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                2. Hébergement
                            </h2>

                            <p>
                                L'infrastructure technique du projet est
                                fournie dans le cadre du programme
                                pédagogique via la plateforme
                                market.filiere.info. Il ne s'agit pas d'une
                                relation d'hébergement commerciale classique.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                3. Contact
                            </h2>

                            <p>
                                Pour toute question relative au site ou à son
                                contenu, il est possible de contacter
                                l'équipe projet via la page Support.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                4. Propriété intellectuelle
                            </h2>

                            <p>
                                Les contenus présents sur ce site (textes,
                                visuels, structure) sont produits dans le
                                cadre du projet pédagogique et ne peuvent
                                être réutilisés en dehors de ce contexte sans
                                accord de leurs auteurs.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                5. Données personnelles
                            </h2>

                            <p>
                                Le traitement des données personnelles
                                collectées sur le site est décrit dans les{" "}
                                <a
                                    href="/cgu"
                                    className="text-blue-600 hover:underline"
                                >
                                    Conditions Générales d'Utilisation
                                </a>
                                .
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default MentionsLegales;
