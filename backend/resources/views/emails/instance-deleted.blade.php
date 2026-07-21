<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Instance supprimée</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:40px 0;">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.08);">

<tr>
<td style="background:#2563eb;color:white;padding:25px;text-align:center;">
<h1 style="margin:0;">HostBuster</h1>
<p style="margin-top:10px;font-size:18px;">
🗑️ Votre instance a été supprimée
</p>
</td>
</tr>

<tr>
<td style="padding:35px;color:#333;line-height:1.7;">

<p>Bonjour <strong>{{ $instance->user->prenom ?? $instance->user->nom ?? '' }}</strong>,</p>

<p>
Nous vous confirmons que votre instance a été supprimée avec succès.
Toutes les ressources associées ont été libérées.
</p>

<table width="100%" cellpadding="10" cellspacing="0" style="margin:30px 0;border-collapse:collapse;border:1px solid #e5e7eb;">

<tr style="background:#f9fafb;">
<td><strong>Nom de l'instance</strong></td>
<td>{{ $instance->name }}</td>
</tr>

<tr>
<td><strong>Statut</strong></td>
<td style="color:#2563eb;font-weight:bold;">
Supprimée
</td>
</tr>

<tr style="background:#f9fafb;">
<td><strong>Date de suppression</strong></td>
<td>{{ now()->format('d/m/Y à H:i') }}</td>
</tr>

</table>

<div style="background:#eff6ff;border-left:5px solid #2563eb;padding:18px;margin:25px 0;">
<strong>Information</strong>

<p style="margin-top:10px;">
Les données et les ressources associées à cette instance ne sont plus disponibles.
Si vous souhaitez utiliser de nouveau ce service, vous pouvez créer une nouvelle instance depuis votre espace HostBuster.
</p>
</div>

<p>
Merci d'avoir utilisé HostBuster.
</p>

<p>
À bientôt,<br>
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