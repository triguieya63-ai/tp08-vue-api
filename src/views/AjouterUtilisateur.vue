<script setup>
import { useRouter } from "vue-router";
import FormulaireUtilisateur from "../components/FormulaireUtilisateur.vue";

const API = "http://localhost:3000/utilisateurs";
const router = useRouter();

async function ajouter(donnees) {
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...donnees, actif: true })
  });
  router.push("/");
}
</script>

<template>
  <FormulaireUtilisateur titre="Ajouter un utilisateur" @enregistrer="ajouter" />
</template>