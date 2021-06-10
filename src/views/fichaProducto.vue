<template>
  <div class="productos">
 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <section class="hero">
      <div class="hero-slide">
          <img src="../images/hero.png">
      </div>
    </section>
    <div class="ficha">
     <listaFichas
        v-for="dato in datos" 
        v-bind:key="dato.id"
        v-bind:listaFichas="dato"/>
    </div>
  </div>
</template>

<script>
import listaFichas from '../components/fichaProducto/listaFichas.vue'
import routes from '../router/index.js'
import { db } from '../components/db.js'  
export default {
  components:{
    listaFichas

  },
  data(){
      return{
        user: {
          loggedIn: false,
          data: null          
        },
          datos:null,
          i:0
      }
  },
  mounted: function() {
    
    if(routes.currentRoute.params.idProducto!=" "){

    
      this.$bind('datos', db.collection('productos').where("idProducto", "==", routes.currentRoute.params.idProducto));
      

    }
  },
  firestore:{
    datos: db.collection('productos').where("idProducto", "==", routes.currentRoute.params.idProducto ? routes.currentRoute.params.idProducto : " ")                                                 
  }
}
</script>