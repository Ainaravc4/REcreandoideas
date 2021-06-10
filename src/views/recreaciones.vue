<template>
  <div class="seccionCategorias">
    <section class="hero">
      <div class="hero-slide">
          <img src="../images/hero.png">
      </div>
    </section>
    <h1 class="subtitulos">Recreaciones</h1>
    <ul>
     <listaRecreaciones
        v-for="dato in datos" 
        v-bind:key="dato.id"
        v-bind:listaRecreaciones="dato"/>
    </ul>
    
  </div>
</template>

<script>
import listaRecreaciones from '../components/recreaciones/listaRecreaciones.vue'
import { db } from '../components/db.js'  
export default {
  components:{
    listaRecreaciones
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
  computed:{
    /*calcularTotal:function(){
      let total=0;
      for(let dato of this.datos){
          total+=parseInt(dato.subtotal) ;
      }
      return total
    }*/
  
  },
  firestore:{
    datos: db.collection('categorias').where("tipo","==", "Recreacion"  ),    
  }
}
</script>