import {
    PayPalButtons,
    PayPalScriptProvider
} from "@paypal/react-paypal-js";

import { useRef } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";

type UpgradePayPalButtonProps = {
    instanceId: number;
    applicationOfferId: number;
};

function UpgradePayPalButton({
    instanceId,
    applicationOfferId
}: UpgradePayPalButtonProps) {

    const token = localStorage.getItem("token");

    const localOrderId = useRef<number | null>(null);

    const navigate = useNavigate();

    return (
        <PayPalScriptProvider
            options={{
                clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
                currency: "EUR",
            }}
        >
            <PayPalButtons

                createOrder={async () => {

                    const response = await fetch(
                        `${API_URL}/api/upgrade-orders`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": `Bearer ${token}`,
                            },

                            body: JSON.stringify({
                                instance_id: instanceId,
                                application_offer_id: applicationOfferId,
                            }),
                        }
                    );

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(
                            data.message
                            || "Erreur lors de la création du paiement."
                        );
                    }

                    localOrderId.current = data.order_id;

                    return data.paypal_order_id;
                }}

                onApprove={async () => {

                    if (!localOrderId.current) {
                        alert("Commande introuvable.");
                        return;
                    }

                    const response = await fetch(
                        `${API_URL}/api/upgrade-orders/${localOrderId.current}/capture`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": `Bearer ${token}`,
                            },
                        }
                    );

                    const result = await response.json();

                    if (!response.ok) {
                        alert(
                            result.message
                            || "Erreur pendant la validation du paiement."
                        );

                        return;
                    }

                    navigate("/instances");
                }}

                onError={(error) => {
                    console.error(
                        "Erreur PayPal upgrade :",
                        error
                    );
                }}
            />

        </PayPalScriptProvider>
    );
}

export default UpgradePayPalButton;