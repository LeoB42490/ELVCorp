import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRef } from "react";

type PayPalButtonProps = {
    applicationId: number;
    offerId: number;
    onSuccess?: () => void;
};

function PayPalButton({ applicationOfferId, onSuccess }: PayPalButtonProps) {
    const token = localStorage.getItem("token");
    const localOrderId = useRef<number | null>(null);

    return (
        <PayPalScriptProvider
            options={{
                clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
                currency: "EUR",
            }}
        >
            <PayPalButtons
                createOrder={async () => {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            application_offer_id: applicationOfferId,
                        }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.message || "Erreur création commande");
                    }

                    localOrderId.current = data.order_id;

                    return data.paypal_order_id;
                }}
                onApprove={async () => {
                    if (!localOrderId.current) {
                        alert("Commande introuvable");
                        return;
                    }

                    const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/${localOrderId.current}/capture`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    const result = await response.json();

                    if (!response.ok) {
                        alert(result.message || "Erreur paiement");
                        return;
                    }

                    alert("Paiement validé !");
                    onSuccess?.();
                }}
            />
        </PayPalScriptProvider>
    );
}

export default PayPalButton;