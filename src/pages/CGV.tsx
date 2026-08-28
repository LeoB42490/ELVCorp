import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CGV() {
    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-gray-50 py-12 px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-8 md:p-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">
                        Conditions Générales de Vente
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
                                Les présentes Conditions Générales de Vente régissent
                                les ventes de services proposées sur la plateforme
                                HostBuster. L'identité du vendeur figure dans les{" "}
                                <a
                                    href="/mentions-legales"
                                    className="text-blue-600 hover:underline"
                                >
                                    mentions légales
                                </a>
                                .
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                2. Services proposés
                            </h2>

                            <p>
                                HostBuster propose des solutions d'hébergement
                                permettant le déploiement d'applications telles que
                                WordPress, GLPI, Odoo et Minecraft.
                            </p>

                            <p className="mt-3">
                                Les caractéristiques de chaque offre, notamment les
                                ressources CPU, mémoire vive et espace de stockage,
                                sont indiquées avant la commande.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                3. Prix
                            </h2>

                            <p>
                                Les prix applicables sont ceux affichés sur la plateforme
                                au moment de la commande.
                            </p>

                            <p className="mt-3">
                                Le montant et la périodicité de chaque offre sont
                                présentés à l'utilisateur avant la validation du paiement.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                4. Commande
                            </h2>

                            <p>
                                Pour commander un service, l'utilisateur sélectionne
                                l'application et l'offre souhaitées, indique le nom de
                                son instance puis procède au paiement.
                            </p>

                            <p className="mt-3">
                                La commande devient définitive après validation du
                                paiement.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                5. Paiement
                            </h2>

                            <p>
                                Les paiements effectués sur HostBuster sont réalisés au
                                moyen du service PayPal.
                            </p>

                            <p className="mt-3">
                                Le déploiement de l'instance débute après confirmation
                                du paiement.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                6. Mise à disposition du service
                            </h2>

                            <p>
                                Après validation de la commande, HostBuster lance
                                automatiquement la création de l'instance correspondant
                                au service acheté.
                            </p>

                            <p className="mt-3">
                                L'utilisateur peut suivre l'état de création de son
                                instance depuis son espace personnel.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                7. Droit de rétractation
                            </h2>

                            <p>
                                Conformément à l'article L221-28 13° du Code de la
                                consommation, le droit de rétractation ne s'applique pas
                                aux contrats de fourniture d'un contenu numérique non
                                fourni sur un support matériel dont l'exécution a commencé
                                après accord préalable exprès du consommateur et
                                renoncement exprès à son droit de rétractation.
                            </p>

                            <p className="mt-3">
                                En validant sa commande, l'utilisateur demande
                                expressément le déploiement immédiat de son instance dès
                                confirmation du paiement et reconnaît, en conséquence,
                                renoncer à son droit de rétractation dès que ce
                                déploiement a débuté.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                7 bis. Garantie légale de conformité
                            </h2>

                            <p>
                                L'utilisateur bénéficie des garanties légales
                                applicables aux services fournis (notamment garantie de
                                conformité et garantie des vices cachés). Toute
                                réclamation à ce titre peut être adressée via la page
                                Support.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                8. Disponibilité
                            </h2>

                            <p>
                                HostBuster met en œuvre les moyens techniques nécessaires
                                afin d'assurer le fonctionnement des services proposés.
                                Des interruptions temporaires peuvent néanmoins intervenir
                                pour maintenance ou en cas d'incident.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                9. Résiliation et suppression
                            </h2>

                            <p>
                                L'utilisateur peut demander la suppression de ses
                                instances depuis son espace personnel, conformément aux
                                fonctionnalités mises à sa disposition.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                10. Données personnelles
                            </h2>

                            <p>
                                Les données personnelles nécessaires à la création et à
                                la gestion des comptes utilisateurs sont traitées
                                conformément au Règlement Général sur la Protection des
                                Données (RGPD) et à la loi Informatique et Libertés.
                                Elles sont conservées le temps nécessaire à la gestion
                                du compte et des instances, et l'utilisateur dispose de
                                droits d'accès, de rectification et de suppression qu'il
                                peut exercer via la page Support.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                11. Médiation et litiges
                            </h2>

                            <p>
                                En cas de litige, l'utilisateur est invité à contacter
                                en priorité HostBuster via la page Support afin de
                                rechercher une solution amiable. Les présentes CGV sont
                                soumises au droit français.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                12. Contact
                            </h2>

                            <p>
                                Pour toute question ou demande relative à une commande,
                                l'utilisateur peut utiliser la page Support de HostBuster.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default CGV;