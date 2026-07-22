<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Nouvelle demande de support</title>
</head>

<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0"
       style="background:#f5f7fb;padding:40px 0;">
    <tr>
        <td align="center">

            <table width="650" cellpadding="0" cellspacing="0"
                   style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.08);">

                <tr>
                    <td style="background:#2563eb;color:#ffffff;padding:25px;text-align:center;">
                        <h1 style="margin:0;">HostBuster</h1>

                        <p style="margin:10px 0 0;font-size:18px;">
                            Nouvelle demande de support
                        </p>
                    </td>
                </tr>

                <tr>
                    <td style="padding:35px;color:#333333;line-height:1.7;">

                        <p>
                            Une nouvelle demande de support a été envoyée depuis
                            l’espace client HostBuster.
                        </p>

                        <table width="100%" cellpadding="10" cellspacing="0"
                               style="margin:30px 0;border-collapse:collapse;border:1px solid #e5e7eb;">

                            <tr style="background:#f9fafb;">
                                <td>
                                    <strong>Utilisateur</strong>
                                </td>

                                <td>
                                    {{ $user->prenom }} {{ $user->nom }}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <strong>Adresse e-mail</strong>
                                </td>

                                <td>
                                    <a href="mailto:{{ $user->email }}"
                                       style="color:#2563eb;">
                                        {{ $user->email }}
                                    </a>
                                </td>
                            </tr>

                            <tr style="background:#f9fafb;">
                                <td>
                                    <strong>Identifiant utilisateur</strong>
                                </td>

                                <td>
                                    {{ $user->id }}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <strong>Sujet</strong>
                                </td>

                                <td>
                                    {{ $supportSubject }}
                                </td>
                            </tr>

                            <tr style="background:#f9fafb;">
                                <td>
                                    <strong>Date</strong>
                                </td>

                                <td>
                                    {{ now()->format('d/m/Y à H:i') }}
                                </td>
                            </tr>

                        </table>

                        <div style="background:#eff6ff;border-left:5px solid #2563eb;padding:18px;margin:25px 0;">
                            <strong>Message de l’utilisateur</strong>

                            <p style="margin:15px 0 0;white-space:pre-line;">
                                {{ $supportMessage }}
                            </p>
                        </div>

                        <p>
                            Vous pouvez répondre directement à cet e-mail pour
                            contacter l’utilisateur.
                        </p>

                    </td>
                </tr>

                <tr>
                    <td style="background:#f3f4f6;padding:20px;text-align:center;font-size:13px;color:#666666;">
                        © {{ date('Y') }} HostBuster<br>
                        Demande envoyée depuis le centre de support.
                    </td>
                </tr>

            </table>

        </td>
    </tr>
</table>

</body>
</html>