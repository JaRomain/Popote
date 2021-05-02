<template>
  <div id="flexcontainer">
    <div id="leftcolumn">
      <div class="bestPost">
        <h3>Meilleur post</h3>
        <!--Appel du coponent posts avec les données de l'objet bestpost récupéré via une requête-->
        <Posts
          :profilpic="bestpost.profilePicture"
          :name="bestpost.firstname"
          :lastname="bestpost.lastname"
          :userid="bestpost.userId"
          :content="bestpost.content"
          :postpic="bestpost.image"
          :postid="bestpost._id"
          :listcomment="bestpost.comments"
          :listlike="bestpost.likes"
          :categories="bestpost.category"
          v-on:display-post="callposts"
        />
      </div>
      <!--Choix d'affichage par catégories-->
      <div class="bestPost">
        <h3>Catégories</h3>
        <div class="categorie" @click="postRecipe">
          <img src="../assets/pizza.png" alt="pizza" />
          <p>Recettes</p>
        </div>
        <div class="categorie" @click="postAdvice">
          <img src="../assets/burger.jpg" alt="pizza" />
          <p>Conseils</p>
        </div>
        <div class="categorie" @click="postCreation">
          <img src="../assets/sandwich.jpg" alt="pizza" />
          <p>Créations</p>
        </div>
        <div class="categorie" @click="postOther">
          <img src="../assets/tacos.jpg" alt="pizza" />
          <p>Autres</p>
        </div>
        <div class="categorie" @click="postAll">
          <img src="../assets/gateau.jpg" alt="pizza" />
          <p>Tous les post</p>
        </div>
      </div>
    </div>
    <div id="centralcolumn">
      <!--Création d'un nouveau post qui affiche le component PostCreate-->
      <button
        @click="newPost"
        v-if="newPostBoolean == false"
        class="click btn btncreate"
      >
        Nouveau post
      </button>
      <PostCreate
        v-if="newPostBoolean"
        v-on:valid-post="validPost"
        v-on:hide-createpost="hideCreatePost"
      ></PostCreate>
      <!--Appel du component Posts, autant de fois qu'il y a d'élément dans la liste posts
      (grace à v-for), la liste posts est récupérée avec une requête-->
      <Posts
        v-for="(value, index) in posts"
        :key="index"
        :profilpic="value.profilePicture"
        :name="value.firstname"
        :lastname="value.lastname"
        :userid="value.userId"
        :content="value.content"
        :postpic="value.image"
        :postid="value._id"
        :listcomment="value.comments"
        :listlike="value.likes"
        :categories="value.category"
        v-on:display-post="callposts"
      />
    </div>
    <div id="rigthcolumn">
      <div class="members">
        <h3>Membres</h3>
        <!--Affichage des membres-->
        <Member
          v-for="(elem, index) in users"
          :key="index"
          :firstname="elem.firstname"
          :lastname="elem.lastname"
          :userid="elem._id"
          :profilePicture="elem.profilePicture"
        ></Member>
      </div>
    </div>
  </div>
</template>

<script>
import Posts from "../components/Posts.vue";
import PostCreate from "../components/PostCreate.vue";
import Member from "../components/Member.vue";
export default {
  name: "Actu",

  data: () => ({
    newPostBoolean: false,
    posts: [],
    bestpost: [],
    users: [],
    token: localStorage.getItem("token"),
  }),
  methods: {
    callposts() {
      this.postAll();
      this.bestpostdisplay();
    },
    //Modification de la variable d'affichage de création de post newPostBoolean
    newPost() {
      if (this.token == "null") {
        //Renvoie à la page home la personne n'est pas connectée
        alert("Connectez vous pour créer un nouveau post !");
        this.$router.push("/");
      } else {
        this.newPostBoolean = true;
      }
    },
    validPost() {
      this.newPostBoolean = false;
      this.postAll();
    },
    hideCreatePost() {
      this.newPostBoolean = false;
    },
    /*---REQUETE catégorie : recette ---*/
    async postRecipe() {
      this.posts = [];
      console.log(this.posts);
      const response = await fetch(
        "https://popote-api.osc-fr1.scalingo.io/posts?category=recipe",
        { method: "GET" }
      );
      const data = await response.json();
      this.posts = data.posts;
    },
    /*---REQUETE catégorie : conseil ---*/
    async postAdvice() {
      this.posts = [];
      console.log(this.posts);
      const response = await fetch(
        "https://popote-api.osc-fr1.scalingo.io/posts?category=advice",
        { method: "GET" }
      );
      const data = await response.json();
      this.posts = data.posts;
    },
    /*---REQUETE catégorie : création ---*/
    async postCreation() {
      this.posts = [];
      console.log(this.posts);
      const response = await fetch(
        "https://popote-api.osc-fr1.scalingo.io/posts?category=creation",
        { method: "GET" }
      );
      const data = await response.json();
      this.posts = data.posts;
    },
    /*---REQUETE catégorie : autre ---*/
    async postOther() {
      this.posts = [];
      console.log(this.posts);
      const response = await fetch(
        "https://popote-api.osc-fr1.scalingo.io/posts?category=other",
        { method: "GET" }
      );
      const data = await response.json();
      this.posts = data.posts;
    },
    /*---REQUETE GET/posts---*/
    async postAll() {
      this.posts = [];
      console.log(this.posts);
      const response = await fetch(
        "https://popote-api.osc-fr1.scalingo.io/posts",
        { method: "GET" }
      );
      const data = await response.json();
      this.posts = data.posts;
      console.log("affichage des posts");
      console.log(this.posts);
    },
    /*---REQUETE GET/user/all---*/
    async usersAll() {
      const response = await fetch(
        "https://popote-api.osc-fr1.scalingo.io/user/all",
        { method: "GET", headers: { Authorization: "bearer " + this.token } }
      );
      const data = await response.json();
      this.users = data.users;
      console.log("user all");
      console.log(this.users);
    },
    /*---REQUETE GET/posts/top---*/
    async bestpostdisplay() {
      this.bestpost = {};
      const response = await fetch(
        "https://popote-api.osc-fr1.scalingo.io/posts/top",
        { method: "GET" }
      );
      const data = await response.json();
      if (data.post) {
        this.bestpost = data.post;
        console.log("c'est le best post");
        console.log(this.bestpost);
      }
    },
  },
  components: {
    Posts,
    PostCreate,
    Member,
  },
  //Ces 3 requêtes doivent être faite avant que la page soit chargée
  mounted: function() {
    this.postAll();
    this.usersAll();
    this.bestpostdisplay();
  },
};
</script>

<style scoped>
#flexcontainer {
  display: flex;
  justify-content: space-around;
}
#leftcolumn {
  width: 30%;
}
#leftcolumn .bestPost,
#rigthcolumn .members {
  background-color: white;
  border-radius: 30px;
  width: 90%;
  padding: 2%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
}

.bestPost .categorie {
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  border: 1px solid #e09f3e;
  border-radius: 20px;
  height: 70px;
  display: flex;
  align-items: center;
}
.bestPost .categorie img {
  height: 100%;
  border-radius: 20px 0px 0px 20px;
}
.bestPost .categorie p {
  margin-left: 15px;
}

#centralcolumn {
  width: 35%;
}
#rigthcolumn {
  width: 30%;
}
.conectedUsers {
  border: 1px solid red;
  border-radius: 5px;
  margin: 10px 0;
  width: 80%;
}
.btncreate {
  width: 30%;
  margin-top: 10px;
}
</style>
