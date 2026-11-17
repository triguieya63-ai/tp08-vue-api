<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({ id: String });
const API = "http://localhost:3000/utilisateurs";
const router = useRouter();

const utilisateur = ref(null);
const erreur = ref("");

onMounted(async () => {
  const reponse = await fetch(API + "/" + props.id);
  if (!reponse.ok) {
    erreur.value = "Utilisateur introuvable.";
    return;
  }
  utilisateur.value = await reponse.json();
});

async function supprimer() {
  await fetch(API + "/" + props.id, { method: "DELETE" });
  router.push("/");
}
</script>

<template>
  <div class="carte">
    <h2>Supprimer un utilisateur</h2>

    <p v-if="erreur" class="erreur">{{ erreur }}</p>

    <template v-if="utilisateur">
      <p>
        Voulez-vous vraiment supprimer
        <strong>{{ utilisateur.prenom }} {{ utilisateur.nom }}</strong> ?
      </p>
      <div class="boutons">
        <RouterLink to="/" class="btn">Annuler</RouterLink>
        <button class="btn btn-danger" @click="supprimer">Confirmer</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.carte { max-width: 420px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,.1); }
.boutons { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }
.btn { padding: 6px 14px; border-radius: 4px; font-size: 13px; text-decoration: none; border: 1px solid #ccc; background: white; color: #111; cursor: pointer; }
.btn-danger { background: #dc2626; color: white; border-color: #dc2626; }
.erreur { background: #ef4444; color: white; padding: 8px; border-radius: 4px; }
</style>