<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Échec de la mise à niveau</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:40px 0;">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.08);">

<tr>
<td style="background:#dc2626;color:white;padding:25px;text-align:center;">
<h1 style="margin:0;">HostBuster</h1>
<p style="margin-top:10px;font-size:18px;">
❌ Échec de la mise à niveau de votre instance
</p>
</td>
</tr>

<tr>
<td style="padding:35px;color:#333;line-height:1.7;">

<p>
Bonjour
<strong>{{ $instance->user->prenom ?? $instance->user->nom ?? '' }}</strong>,
</p>

<p>
Nous sommes désolés, mais une erreur est survenue lors de la mise à niveau de votre instance.
Les nouvelles ressources n'ont donc pas pu être appliquées correctement.
</p>

<table width="100%" cellpadding="10" cellspacing="0" style="margin:30px 0;border-collapse:collapse;border:1px solid #e5e7eb;">

<tr style="background:#f9fafb;">
<td><strong>Nom de l'instance</strong></td>
<td>{{ $instance->name }}</td>
</tr>

<tr>
<td><strong>Statut</strong></td>
<td style="color:#dc2626;font-weight:bold;">
Erreur de mise à niveau
</td>
</tr>

<tr style="background:#f9fafb;">
<td><strong>Date de la demande</strong></td>
<td>{{ now()->format('d/m/Y à H:i') }}</td>
</tr>

</table>

<div style="background:#fef2f2;border-left:5px solid #dc2626;padding:18px;margin:25px 0;">
<strong>Que faire maintenant ?</strong>

<ul style="margin-top:10px;">
<li>Ne relancez pas immédiatement un nouveau paiement.</li>
<li>Notre équipe technique a été informée du problème.</li>
<li>Si nécessaire, contactez notre support en précisant le nom de votre instance.</li>
</ul>
</div>

<p>
Votre paiement a bien été pris en compte, mais la mise à niveau technique n'a pas pu être finalisée.
Notre équipe pourra vérifier l'état de votre instance et intervenir si nécessaire.
</p>

<p>
Merci de votre confiance,<br>
<strong>L'équipe HostBuster</strong>
</p>

</td>
</tr>

<tr>
<td style="background:#f3f4f6;padding:20px;text-align:center;font-size:13px;color:#666;">
© {{ date('Y') }} HostBuster<br>
Cet e-mail a été envoyé automatiquement, merci de ne pas y répondre.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>