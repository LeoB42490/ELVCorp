<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Votre instance a été mise à niveau</title>
</head>

<body style="
    margin: 0;
    padding: 0;
    background-color: #f1f5f9;
    font-family: Arial, Helvetica, sans-serif;
    color: #1e293b;
">

<table
    role="presentation"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    border="0"
    style="background-color: #f1f5f9;"
>
    <tr>
        <td align="center" style="padding: 40px 16px;">

            <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                    max-width: 620px;
                    background-color: #ffffff;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
                "
            >
                {{-- En-tête --}}
                <tr>
                    <td
                        align="center"
                        style="
                            padding: 34px 30px;
                            background-color: #2563eb;
                        "
                    >
                        <div style="
                            display: inline-block;
                            width: 54px;
                            height: 54px;
                            line-height: 54px;
                            margin-bottom: 14px;
                            background-color: #ffffff;
                            border-radius: 14px;
                            color: #2563eb;
                            font-size: 28px;
                            font-weight: bold;
                            text-align: center;
                        ">
                            ⚡
                        </div>

                        <h1 style="
                            margin: 0;
                            color: #ffffff;
                            font-size: 28px;
                            line-height: 36px;
                        ">
                            HostBuster
                        </h1>

                        <p style="
                            margin: 8px 0 0;
                            color: #dbeafe;
                            font-size: 15px;
                        ">
                            Votre application, disponible en quelques minutes
                        </p>
                    </td>
                </tr>

                {{-- Contenu --}}
                <tr>
                    <td style="padding: 38px 34px 20px;">

                        <div style="
                            margin-bottom: 24px;
                            padding: 14px 18px;
                            border-radius: 10px;
                            background-color: #dcfce7;
                            color: #166534;
                            font-size: 15px;
                            font-weight: bold;
                            text-align: center;
                        ">
                            ✓ Mise à niveau terminée avec succès
                        </div>

                        <h2 style="
                            margin: 0 0 18px;
                            color: #0f172a;
                            font-size: 24px;
                            line-height: 32px;
                        ">
                            Votre instance a été améliorée 🎉
                        </h2>

                        <p style="
                            margin: 0 0 16px;
                            color: #475569;
                            font-size: 16px;
                            line-height: 25px;
                        ">
                            Bonjour
                            @if($instance->user)
                                {{ $instance->user->prenom ?? $instance->user->nom ?? '' }},
                            @else
                                ,
                            @endif
                        </p>

                        <p style="
                            margin: 0 0 26px;
                            color: #475569;
                            font-size: 16px;
                            line-height: 25px;
                        ">
                            La mise à niveau de votre instance
                            <strong>{{ $instance->name }}</strong>
                            a été effectuée avec succès. Les nouvelles ressources
                            sont maintenant appliquées.
                        </p>

                        {{-- Tableau récapitulatif --}}
                        <table
                            role="presentation"
                            width="100%"
                            cellspacing="0"
                            cellpadding="0"
                            border="0"
                            style="
                                margin-bottom: 28px;
                                border: 1px solid #e2e8f0;
                                border-radius: 12px;
                                overflow: hidden;
                                border-collapse: separate;
                                border-spacing: 0;
                            "
                        >
                            <tr>
                                <td
                                    colspan="2"
                                    style="
                                        padding: 16px 18px;
                                        background-color: #f8fafc;
                                        border-bottom: 1px solid #e2e8f0;
                                        color: #0f172a;
                                        font-size: 16px;
                                        font-weight: bold;
                                    "
                                >
                                    Nouveau plan
                                </td>
                            </tr>

                            <tr>
                                <td style="
                                    width: 35%;
                                    padding: 14px 18px;
                                    border-bottom: 1px solid #e2e8f0;
                                    color: #64748b;
                                    font-size: 14px;
                                    font-weight: bold;
                                ">
                                    Offre
                                </td>

                                <td style="
                                    padding: 14px 18px;
                                    border-bottom: 1px solid #e2e8f0;
                                    color: #0f172a;
                                    font-size: 14px;
                                ">
                                    {{ $instance->applicationOffer->offer->name }}
                                </td>
                            </tr>

                            <tr>
                                <td style="
                                    padding: 14px 18px;
                                    border-bottom: 1px solid #e2e8f0;
                                    color: #64748b;
                                    font-size: 14px;
                                    font-weight: bold;
                                ">
                                    CPU
                                </td>

                                <td style="
                                    padding: 14px 18px;
                                    border-bottom: 1px solid #e2e8f0;
                                    color: #0f172a;
                                    font-size: 14px;
                                ">
                                    {{ $instance->applicationOffer->offer->cpu }} vCPU
                                </td>
                            </tr>

                            <tr>
                                <td style="
                                    padding: 14px 18px;
                                    border-bottom: 1px solid #e2e8f0;
                                    color: #64748b;
                                    font-size: 14px;
                                    font-weight: bold;
                                ">
                                    RAM
                                </td>

                                <td style="
                                    padding: 14px 18px;
                                    border-bottom: 1px solid #e2e8f0;
                                    color: #0f172a;
                                    font-size: 14px;
                                ">
                                    {{ $instance->applicationOffer->offer->ram_mb / 1024 }} Go
                                </td>
                            </tr>

                            <tr>
                                <td style="
                                    padding: 14px 18px;
                                    border-bottom: 1px solid #e2e8f0;
                                    color: #64748b;
                                    font-size: 14px;
                                    font-weight: bold;
                                ">
                                    Stockage
                                </td>

                                <td style="
                                    padding: 14px 18px;
                                    border-bottom: 1px solid #e2e8f0;
                                    color: #0f172a;
                                    font-size: 14px;
                                ">
                                    {{ $instance->applicationOffer->offer->storage_gb }} Go
                                </td>
                            </tr>

                            <tr>
                                <td style="
                                    padding: 14px 18px;
                                    color: #64748b;
                                    font-size: 14px;
                                    font-weight: bold;
                                ">
                                    Statut
                                </td>

                                <td style="
                                    padding: 14px 18px;
                                    color: #15803d;
                                    font-size: 14px;
                                    font-weight: bold;
                                ">
                                    En fonctionnement
                                </td>
                            </tr>
                        </table>

                        <p style="
                            margin: 0 0 14px;
                            color: #475569;
                            font-size: 15px;
                            line-height: 23px;
                        ">
                            Votre instance est de nouveau disponible avec les
                            ressources correspondant à votre nouveau plan.
                        </p>

                        <p style="
                            margin: 0;
                            color: #475569;
                            font-size: 15px;
                            line-height: 23px;
                        ">
                            En cas de difficulté, vous pouvez contacter le support
                            depuis votre espace HostBuster.
                        </p>
                    </td>
                </tr>

                {{-- Pied de page --}}
                <tr>
                    <td style="padding: 22px 34px 32px;">
                        <div style="
                            border-top: 1px solid #e2e8f0;
                            padding-top: 24px;
                            text-align: center;
                        ">
                            <p style="
                                margin: 0 0 8px;
                                color: #64748b;
                                font-size: 13px;
                                line-height: 20px;
                            ">
                                Cet e-mail a été envoyé automatiquement par HostBuster.
                            </p>

                            <p style="
                                margin: 0;
                                color: #94a3b8;
                                font-size: 12px;
                            ">
                                © {{ date('Y') }} HostBuster — Plateforme d’hébergement applicatif
                            </p>
                        </div>
                    </td>
                </tr>
            </table>

        </td>
    </tr>
</table>

</body>
</html>