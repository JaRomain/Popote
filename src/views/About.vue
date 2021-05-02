<template>
  <div>
    <h1>L'EQUIPE DE POPOTE</h1>
    <div id="div1">
      <br />
      <Equipe
        v-for="(value, index) in infos"
        :key="index"
        :prenom="value.prenom"
        :image="value.image"
      />
      <br />
    </div>

    <br />

    <div id="grandediv">
      <div id="cond">
        <h3>Nos Conditions Générales d'utilisation</h3>
        <br />
        <ConditionsGen />
        <p id="p">{{ texte }}</p>
      </div>

      <div id="engagement">
        <h3>Nos Engagements</h3>
        <br />
        <PopoteEngagment />
        <p id="p">{{ valeurs }}</p>
      </div>
    </div>

    <br />
    <br />
    <p><b> Sous la direction de Guillaume Graciet- Le Bocal Academy- DW2</b></p>
  </div>
</template>

<script>
import Equipe from "../components/Equipe.vue";
import ConditionsGen from "../components/ConditionsGen.vue";
import PopoteEngagment from "../components/PopoteEngagment.vue";

export default {
  name: "About",

  data: () => ({
    infos: [
      {
        prenom: "Ophélie",
        image:
          "https://cdn.pixabay.com/photo/2012/04/01/16/51/pizza-23477_960_720.png",
      },
      {
        prenom: "Emiline",
        image:
          "https://cdn.pixabay.com/photo/2012/04/13/01/51/hamburger-31775_960_720.png",
      },
      {
        prenom: "Romain",
        image:
          "https://cdn.pixabay.com/photo/2014/04/03/09/57/club-sandwich-309442_960_720.png",
      },
      {
        prenom: "Oscar",
        image:
          "https://cdn.pixabay.com/photo/2020/10/13/11/44/taco-5651624_960_720.png",
      },
    ],
    texte:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem ut quibusdam assumenda enim sit magni distinctio amet, sequi pariatur, veritatis sunt? Ea odit ipsa repudiandae eveniet illo perspiciatis quas exercitationem?",
    valeurs:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur vitae recusandae ex, fuga placeat autem repellendus mollitia, labore harum ipsam dicta explicabo nesciunt distinctio eligendi hic atque dolorum deleniti natus quam a.",
  }),

  components: {
    Equipe,
    ConditionsGen,
    PopoteEngagment,
  },
};
</script>

<style>
#div1 {
  display: flex;
  flex-direction: row;
  margin-top: 3vw;
  justify-content: space-between;
}
#grandediv {
  display: flex;
  flex-direction: row;
  text-align: justify;
}
#cond {
  width: 50vw;
  margin-right: 10vw;
  margin-left: 2vw;
}
#engagement {
  width: 50vw;
  margin-right: 2vw;
}
#imge {
  animation-duration: 2s;
  animation-name: slidein;
  animation-iteration-count: 1;
}
@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
</style>
