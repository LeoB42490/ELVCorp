import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    getInstanceUpgrades,
    upgradeInstance
} from "../api";

type Offer = {
    id: number;
    name: string;
    cpu: number;
    ram_mb: number;
    storage_gb: number;
    price: string;
};

type AvailableOffer = {
    application_offer_id: number;
    offer: Offer;
};

type InstanceUpgradeData = {
    instance: {
        id: number;
        name: string;
        status: string;
        application: string;
        current_application_offer_id: number;
        current_offer: Offer;
    };

    available_offers: AvailableOffer[];
};

function UpgradeInstance() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] =
        useState<InstanceUpgradeData | null>(null);

    const [loading, setLoading] = useState(true);
    const [upgrading, setUpgrading] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function loadOffers() {
            if (!id) {
                return;
            }

            try {
                setLoading(true);
                setError("");

                const result = await getInstanceUpgrades(
                    Number(id)
                );

                setData(result);

            } catch (error) {

                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(
                        "Une erreur est survenue."
                    );
                }

            } finally {
                setLoading(false);
            }
        }

        loadOffers();

    }, [id]);

    async function handleUpgrade(
        applicationOfferId: number
    ) {
        if (!id) {
            return;
        }

        const confirmUpgrade = window.confirm(
            "Voulez-vous vraiment passer cette instance au plan supérieur ?"
        );

        if (!confirmUpgrade) {
            return;
        }

        try {
            setUpgrading(true);
            setError("");
            setMessage("");

            const result = await upgradeInstance(
                Number(id),
                applicationOfferId
            );

            setMessage(
                result.message ??
                "La modification de votre instance a été lancée."
            );

            setTimeout(() => {
                navigate("/instances");
            }, 2000);

        } catch (error) {

            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(
                    "Une erreur est survenue pendant la modification."
                );
            }

        } finally {
            setUpgrading(false);
        }
    }

    if (loading) {
        return (
            <>
                <Navbar />

                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <p className="text-gray-600">
                        Chargement des offres...
                    </p>
                </div>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 py-12">

                <div className="max-w-6xl mx-auto px-6">

                    <button
                        onClick={() => navigate("/instances")}
                        className="mb-6 text-blue-600 hover:underline"
                    >
                        ← Retour à mes instances
                    </button>

                    <div className="mb-8">

                        <h1 className="text-3xl font-bold text-gray-800">
                            Passer au plan supérieur
                        </h1>

                        {data && (
                            <p className="text-gray-600 mt-2">
                                Instance : {data.instance.name}
                            </p>
                        )}

                    </div>

                    {error && (
                        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                            {message}
                        </div>
                    )}

                    {data && (
                        <>
                            {/* Offre actuelle */}

                            <div className="bg-white rounded-xl shadow-md p-6 mb-8">

                                <h2 className="text-xl font-bold text-gray-800 mb-4">
                                    Plan actuel
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Plan
                                        </p>

                                        <p className="font-semibold">
                                            {data.instance.current_offer.name}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            CPU
                                        </p>

                                        <p className="font-semibold">
                                            {data.instance.current_offer.cpu} vCPU
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            RAM
                                        </p>

                                        <p className="font-semibold">
                                            {data.instance.current_offer.ram_mb / 1024} Go
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Stockage
                                        </p>

                                        <p className="font-semibold">
                                            {data.instance.current_offer.storage_gb} Go
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Prix
                                        </p>

                                        <p className="font-semibold">
                                            {data.instance.current_offer.price} €
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Plans disponibles
                            </h2>

                            {data.available_offers.length === 0 ? (

                                <div className="bg-white shadow rounded-xl p-8 text-center">

                                    <p className="text-gray-600">
                                        Vous disposez déjà du plan le plus élevé.
                                    </p>

                                </div>

                            ) : (

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                    {data.available_offers.map(
                                        (item) => (

                                            <div
                                                key={item.application_offer_id}
                                                className="bg-white rounded-xl shadow-md p-6"
                                            >

                                                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                                    {item.offer.name}
                                                </h3>

                                                <div className="space-y-3 mb-6">

                                                    <p>
                                                        <span className="font-semibold">
                                                            CPU :
                                                        </span>{" "}
                                                        {item.offer.cpu} vCPU
                                                    </p>

                                                    <p>
                                                        <span className="font-semibold">
                                                            RAM :
                                                        </span>{" "}
                                                        {item.offer.ram_mb / 1024} Go
                                                    </p>

                                                    <p>
                                                        <span className="font-semibold">
                                                            Stockage :
                                                        </span>{" "}
                                                        {item.offer.storage_gb} Go
                                                    </p>

                                                    <p>
                                                        <span className="font-semibold">
                                                            Prix :
                                                        </span>{" "}
                                                        {item.offer.price} €
                                                    </p>

                                                </div>

                                                <button
                                                    onClick={() =>
                                                        handleUpgrade(
                                                            item.application_offer_id
                                                        )
                                                    }
                                                    disabled={upgrading}
                                                    className="
                                                        w-full
                                                        bg-blue-600
                                                        text-white
                                                        py-3
                                                        rounded-lg
                                                        font-semibold
                                                        hover:bg-blue-700
                                                        disabled:bg-gray-400
                                                    "
                                                >
                                                    {upgrading
                                                        ? "Modification..."
                                                        : `Choisir ${item.offer.name}`
                                                    }
                                                </button>

                                            </div>

                                        )
                                    )}

                                </div>

                            )}
                        </>
                    )}

                </div>

            </div>

            <Footer />
        </>
    );
}

export default UpgradeInstance;