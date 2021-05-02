<template>
  <div>
    <div class="flexcontainer">
      <img src="../assets/food.png" alt="pizza" />
      <Connect v-if="affichageCo == true" v-on:modif-connect="modifBoolen" />
      <Inscription v-if="affichageCo == false" v-on:modif-ins="insBoolen" />
    </div>
  </div>
</template>

<script>
import Connect from "../components/Connect.vue";
import Inscription from "../components/Inscription.vue";
export default {
  name: "Home",
  data() {
    return {
      //Variable d'affichage des composants connect et inscription
      affichageCo: true,
    };
  },
  methods: {
    //Modification de la variable aux click
    modifBoolen() {
      this.affichageCo = false;
    },
    insBoolen() {
      this.affichageCo = true;
    },
  },

  components: {
    Connect,
    Inscription,
  },
};
</script>

<style>
.flexcontainer {
  display: flex;
  justify-content: space-between;
}

.flexcontainer img {
  width: 50%;
}
</style>
