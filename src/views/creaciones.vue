<template>
  <div class="seccionCategorias">
    <section class="hero">
      <div class="hero-slide">
          <img src="../images/hero.png">
      </div>
    </section>
    <h1 class="subtitulos">Creaciones</h1>
    <ul>
     <listaCreaciones
        v-for="dato in datos" 
        v-bind:key="dato.id"
        v-bind:listaCreaciones="dato"/>
    </ul>
    
  </div>
</template>

<script>
import listaCreaciones from '../components/creaciones/listaCreaciones.vue'
import { db } from '../components/db.js'  
export default {
  components:{
    listaCreaciones
  },
  data(){
      return{
        user: {
          loggedIn: false,
          data: null          
        },
          datos:null,
          ruta:this.$router.currentRoute.name
      }
  },
  firestore:{
    datos: db.collection('categorias').where("tipo","==", "Creacion"  ),    
  }
}
</script>