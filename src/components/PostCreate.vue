<template>
  <div class="post">
    <div class="select">
      <div id="imgcreatepost">
        <label for="urlImg">Url de l'image : </label>
        <input
          id="imginput"
          type="text"
          v-model="bodyContent.image"
          placeholder="https://url-de-mon-image.jpg"
          class="input"
        />
      </div>
      <div id="categ">
        <label for="category">Catégorie : </label>
        <select name="category" id="category" v-model="bodyContent.category">
          <option value="other">Autre</option>
          <option value="recipe">Recette</option>
          <option value="advice">Conseil</option>
          <option value="creation">Création</option>
        </select>
      </div>
    </div>
    <div id="text">
      <textarea
        name="messagePost"
        id="messagePost"
        cols="30"
        rows="10"
        placeholder="Mon post"
        class="input"
        v-model="bodyContent.content"
      ></textarea>
      <button class="btna click" @click="createPost">Ajouter</button>
      <button class="btna click" @click="$emit('hide-createpost')">
        Annuler
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatePost",
  props: {
    name: String,
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      bodyContent: {
        title: "title",
        content: "",
        image: "",
        category: "other",
        date: Date.now(),
      },
    };
  },
  methods: {
    async createPost() {
      const options = {
        method: "POST", // Verbe
        headers: {
          "Content-Type": "application/json", // En-tête du type de données envoyé
          Authorization: "bearer " + this.token,
        },
        body: JSON.stringify(this.bodyContent), // Transforme le body en JSON et défini le body de la requête
      };
      console.log(options);
      try {
        /* Envoi de la requête */
        console.log("test1");
        const response = await fetch(
          "https://popote-api.osc-fr1.scalingo.io/post",
          options
        );
        console.log("test2");
        const data = await response.json(); // Lire la réponse au format JSON

        //debug
        console.log("Si true, c'est OK");
        console.log(data.success);
        console.log(data);

        //Envoie l'evenement personnalisé en cas de succés
        this.$emit("valid-post");
      } catch (error) {
        /* En cas d'erreur lors de l'exécutino de la requête */
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
#imgcreatepost {
  display: flex;
  flex-direction: column;
}
#categ {
  display: flex;
  flex-direction: column;
  margin: 7% 0;
}
#text {
  display: flex;
  flex-direction: column;
}
#category {
  width: 30%;
  align-self: center;
  margin-top: 2%;
}

.btna {
  border: none;
  border-radius: 3px;
  background-color: white;
  height: 25px;
  width: 40%;
  margin-bottom: 2%;
  margin-top: 2%;
  align-self: center;
}
.btna:hover {
  background-color: rgb(226, 226, 226);
}

textarea {
  height: 60px;
  width: 70%;
}

#imginput {
  margin-top: 3%;
}
</style>
