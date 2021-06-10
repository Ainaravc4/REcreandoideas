<template>
  <div class="productos">
    <section class="hero">
      <div class="hero-slide">
          <img src="../images/hero.png">
      </div>
    </section>
    <h1 class="subtitulos">{{nombreCategoria}}</h1>
    <div class="productosL">
     <listaProductos
        v-for="dato in datos" 
        v-bind:key="dato.id"
        v-bind:listaProductos="dato"/>
    </div>
  </div>
</template>

<script>
import listaProductos from '../components/productos/listaProductos.vue'
import routes from '../router/index.js'
import { db } from '../components/db.js'  
export default {
  components:{
    listaProductos

  },
  data(){
      return{
        user: {
          loggedIn: false,
          data: null          
        },
          
          datos:null
      }
  },
  mounted: function() {
    
    if(routes.currentRoute.params.idCategoria!=" ")
      this.$bind('datos', db.collection('productos').where("categoria", "==", routes.currentRoute.params.idCategoria));
  
  },
  computed:{
    nombreCategoria(){
      let n= routes.currentRoute.params.idCategoria;
      return n;
    }
  },
  firestore:{
    datos: db.collection('productos').where("categoria", "==", routes.currentRoute.params.idCategoria ? routes.currentRoute.params.idCategoria : " ")                                                 
  }
}
</script>