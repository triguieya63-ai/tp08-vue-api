import { createRouter, createWebHistory } from "vue-router";
import ListeUtilisateurs from "../views/ListeUtilisateurs.vue";
import AjouterUtilisateur from "../views/AjouterUtilisateur.vue";
import ModifierUtilisateur from "../views/ModifierUtilisateur.vue";
import SupprimerUtilisateur from "../views/SupprimerUtilisateur.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "liste", component: ListeUtilisateurs },
    { path: "/ajouter", name: "ajouter", component: AjouterUtilisateur },
    { path: "/modifier/:id", name: "modifier", component: ModifierUtilisateur, props: true },
    { path: "/supprimer/:id", name: "supprimer", component: SupprimerUtilisateur, props: true }
  ]
});

export default router;