import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CGU() {
    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-gray-50 py-12 px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-8 md:p-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">
                        Conditions Générales d'Utilisation
                    </h1>

                    <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-amber-900">
                        <p className="font-medium">Projet pédagogique</p>
                        <p className="mt-1 text-sm">
                            HostBuster est un projet fictif réalisé dans le
                            cadre du Projet Tuteuré Bac+3 CPI. Voir les{" "}
                            <a
                                href="/mentions-legales"
                                className="underline hover:text-amber-950"
                            >
                                mentions légales
                            </a>{" "}
                            pour l'identification de l'éditeur du site.
                        </p>
                    </div>

                    <div className="space-y-8 text-gray-700 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                1. Objet
                            </h2>

                            <p>
                                Les présentes Conditions Générales d'Utilisation ont
                                pour objet de définir les modalités d'accès et
                                d'utilisation de la plateforme HostBuster.
                            </p>

                            <p className="mt-3">
                                HostBuster permet notamment aux utilisateurs de créer,
                                gérer, modifier et supprimer des instances applicatives
                                telles que WordPress, GLPI, Odoo ou Minecraft.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                2. Accès au service
                            </h2>

                            <p>
                                L'utilisation de certaines fonctionnalités nécessite la
                                création d'un compte utilisateur.
                            </p>

                            <p className="mt-3">
                                L'utilisateur s'engage à fournir des informations
                                exactes lors de son inscription et à maintenir ses
                                informations à jour.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                3. Compte utilisateur
                            </h2>

                            <p>
                                L'utilisateur est responsable de la confidentialité de
                                ses identifiants de connexion et de toutes les actions
                                réalisées depuis son compte.
                            </p>

                            <p className="mt-3">
                                En cas de suspicion d'utilisation frauduleuse de son
                                compte, l'utilisateur doit contacter le support
                                HostBuster dans les meilleurs délais.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                4. Utilisation des services
                            </h2>

                            <p>
                                L'utilisateur s'engage à utiliser les services
                                HostBuster conformément aux lois et réglementations en
                                vigueur.
                            </p>

                            <p className="mt-3">
                                Toute utilisation visant notamment à compromettre la
                                sécurité de la plateforme, perturber son fonctionnement
                                ou héberger des contenus illicites est interdite.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                5. Disponibilité du service
                            </h2>

                            <p>
                                HostBuster met en œuvre les moyens nécessaires pour
                                assurer la disponibilité et le bon fonctionnement de la
                                plateforme.
                            </p>

                            <p className="mt-3">
                                Le service peut toutefois être temporairement
                                interrompu, notamment pour des opérations de
                                maintenance, des mises à jour ou en cas d'incident
                                technique.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                6. Suppression du compte
                            </h2>

                            <p>
                                L'utilisateur peut demander la suppression de son compte
                                depuis son espace personnel.
                            </p>

                            <p className="mt-3">
                                Les instances encore associées au compte doivent être
                                supprimées avant la suppression définitive de celui-ci.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                7. Responsabilité
                            </h2>

                            <p>
                                L'utilisateur demeure responsable des contenus, données
                                et applications qu'il utilise ou héberge au sein de ses
                                instances.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                8. Modification des présentes conditions
                            </h2>

                            <p>
                                HostBuster se réserve la possibilité de modifier les
                                présentes Conditions Générales d'Utilisation afin de les
                                adapter aux évolutions du service ou de la réglementation.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                9. Contact
                            </h2>

                            <p>
                                Pour toute question concernant l'utilisation de la
                                plateforme, l'utilisateur peut contacter HostBuster par
                                l'intermédiaire de la page Support.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default CGU;