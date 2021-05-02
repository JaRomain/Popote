<template>
  <div class="post">
    <div class="posthead">
      <img class="pdp" :src="profilpic" />
      <span @click="userProfil" class="click span"
        >{{ name }} {{ lastname }}</span
      >
      <span class="categoryPost">Catégorie : {{ postCategory }}</span>
    </div>

    <p class="content">{{ content }}</p>
    <img class="img" :src="postpic" />
    <div class="postfooter">
      <div class="boutons">
        <button class="btnp click" @click="addlike">J'aime</button>
        <button @click="Comment" class="btnp click">Commenter</button>
      </div>
      <div class="counter">
        <p class="click">{{ listlike.length }}</p>
        <p @click="affcomment" class="click">{{ listcomment.length }}</p>
      </div>
    </div>
    <div v-if="comment == true">
      <div class="ligne"></div>
      <textarea
        v-model="bodyContent.content"
        id="story"
        name="story"
        rows="5"
        cols="33%"
        placeholder="Mon commentaire"
      >
      </textarea>
      <br />
      <button @click="callAll" class="btnc click">Commenter</button>
    </div>
    <div v-if="displaycomments">
      <div
        v-for="(elem, index) in listcomment"
        :key="index"
        class="commentInPost"
      >
        <p>{{ elem.firstname }} {{ elem.lastname }}</p>
        <p class="content">{{ elem.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Posts",

  props: {
    profilpic: String,
    name: String,
    lastname: String,
    userid: String,
    content: String,
    postpic: String,
    postid: String,
    categories: String,
    listcomment: Array,
    listlike: Array,
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      comment: false,
      posts: [],
      bodyContent: {
        content: "",
      },
      displaycomments: false,
      postCategory: "",
    };
  },
  methods: {
    affcomment() {
      this.displaycomments = !this.displaycomments;
    },
    callAll: function() {
      this.Comment(), this.createComm();
    },
    Comment: function() {
      if (this.token !== "null") {
        this.comment = !this.comment;
      } else {
        //Renvoie à la page home la personne n'est pas connectée
        this.$router.push("/");
        alert("Connectez vous pour commenter !");
      }
    },
    userProfil() {
      this.$router.push(`/Profil/${this.userid}`);
    },
    /*---REQUETE POST/post/comment---*/
    async createComm() {
      /*Les ... récupère les propriété de (ici) bodyContent
      On est obligé de faire comme ca car on récupère une valeur liée en v-model (dans 
      bodyContent) et une props (this.postid) */
      let body = {
        ...this.bodyContent,
        postId: this.postid,
      };
      const options = {
        method: "POST", // Verbe
        headers: {
          "Content-Type": "application/json", // En-tête du type de données envoyé
          Authorization: "bearer " + this.token,
        },
        body: JSON.stringify(body), // Transforme le body en JSON et défini le body de la requête
      };
      console.log(options);
      try {
        /* Envoi de la requête */
        //console.log("test1")
        const response = await fetch(
          "https://popote-api.osc-fr1.scalingo.io/post/comment",
          options
        );
        //console.log("test2")
        const data = await response.json(); // Lire la réponse au format JSON

        //debug
        console.log("Si true, c'est OK");
        console.log(data.success);
        console.log(data);

        //Event personnalisée pour réafficher les post avec nouveau nombre de comment
        this.$emit("display-post");
      } catch (error) {
        /* En cas d'erreur lors de l'exécutino de la requête */
        console.log(error);
      }
    },
    /*---REQUETE POST/post/like---*/
    async addlike() {
      let body = {
        postId: this.postid,
      };
      const options = {
        method: "POST", // Verbe
        headers: {
          "Content-Type": "application/json", // En-tête du type de données envoyé
          Authorization: "bearer " + this.token,
        },
        body: JSON.stringify(body), // Transforme le body en JSON et défini le body de la requête
      };
      console.log(options);
      try {
        /* Envoi de la requête */
        const response = await fetch(
          "https://popote-api.osc-fr1.scalingo.io/post/like",
          options
        );
        //console.log("test2")
        const data = await response.json(); // Lire la réponse au format JSON
        //debug
        console.log("Si true, c'est OK pour like");
        console.log(data.success);
        console.log(data);

        if (this.token == "null") {
          //Renvoie à la page home la personne n'est pas connectée
          alert("Connectez vous pour aimer !");
          this.$router.push("/");
        }

        //Event personnalisée pour réafficher les post avec nouveau nombre de comment
        this.$emit("display-post");
      } catch (error) {
        /* En cas d'erreur lors de l'exécutino de la requête */
        console.log(error);
      }
    },
  },
  /*Conversion des catégories (dont on récupère les valeurs en anglais)
  en ce que l'on souhaite afficher*/
  mounted: function() {
    if (this.categories == "other") {
      this.postCategory = "Autre";
    } else if (this.categories == "recipe") {
      this.postCategory = "Recettes";
    } else if (this.categories == "advice") {
      this.postCategory = "Conseils";
    } else {
      this.postCategory = "Créations";
    }
  },
};
</script>

<style>
.post {
  margin: auto;
  margin-bottom: 15px;
  margin-top: 15px;
  border: 1px solid white;
  border-radius: 8px;
  width: 90%;
  box-shadow: 4px 5px 8px grey;
  background-color: white;
}
.posthead {
  display: flex;
  justify-content: start;
  margin-top: 3%;
  margin-left: 3%;
  margin-bottom: 4%;
}
.pdp {
  border-radius: 50%;
  height: 8%;
  width: 8%;
}
.content {
  margin-bottom: 3%;
  margin-left: 7%;
  text-align: start;
}
.img {
  width: 50%;
  overflow: hidden;
}
.boutons {
  height: 30px;
  width: 50%;
  display: flex;
  justify-content: start;
  margin-left: 5%;
  margin-bottom: 3%;
  margin-top: 5%;
}
.btnp {
  border: none;
  border-radius: 3px;
  padding: 3px 4px;
  background-color: white;
  height: 25px;
  margin: 0px 5px;
}
.btnc {
  border: none;
  border-radius: 3px;
  padding: 3px 4px;
  background-color: white;
  height: 25px;
  margin: 0px 5px;
  margin-bottom: 3%;
}
.btnc:hover {
  background-color: rgb(226, 226, 226);
}
.btnp:hover {
  background-color: rgb(226, 226, 226);
}
.span {
  margin-left: 3%;
  margin-right: 20%;
}
.postfooter {
  display: flex;
}
.counter {
  width: 50%;
  text-align: right;
  margin-top: 5%;
}
.counter p {
  display: inline-block;
  margin: 0 5%;
}
.ligne {
  border: 1px solid lightgrey;
  width: 86%;
  margin-left: 7%;
  margin-bottom: 3%;
}
#commentPic {
  width: 20px;
}
.categoryPost {
  font-size: 80%;
  font-weight: bold;
}
.commentInPost {
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
}
.commentInPost .content {
  font-weight: lighter;
}
</style>
