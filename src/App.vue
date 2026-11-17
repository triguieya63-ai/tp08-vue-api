<script setup>
</script>

<template>
  <header class="barre">
    <RouterLink to="/" class="titre">Gestion des utilisateurs</RouterLink>
  </header>

  <main class="contenu">
    <RouterView />
  </main>
</template>

<style>
body { margin: 0; font-family: Arial, sans-serif; background: #f3f4f6; color: #111; }
.barre { background: white; padding: 12px 24px; border-bottom: 1px solid #e5e7eb; }
.titre { font-weight: bold; color: #111; text-decoration: none; }
.contenu { max-width: 900px; margin: 24px auto; padding: 0 16px; }
</style>