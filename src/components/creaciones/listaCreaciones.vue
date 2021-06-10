<template>
   
    <li  class=" seccionCategorias-li" >
      <img class="mr-3  seccionCategorias-li-img"  v-bind:src="listaCreaciones.img" v-if="listaCreaciones.id%2==0"><!---->
      <div class="media-body seccionCategorias-li-div">
        <h5 class="subtitulos"> {{listaCreaciones.nombre}} </h5>
        <p>{{listaCreaciones.descripcion}}</p>
        <button class="seccionCategorias-li-boton"><router-link :to="{name: 'productosCreados', params: { idCategoria: listaCreaciones.nombre }}">Más Información...</router-link> </button>
      </div>
      <img class="mr-3  seccionCategorias-li-img"   v-bind:src="listaCreaciones.img" v-if="listaCreaciones.idCategoria%2!=0">
    </li>
    
</template>

<script>
import { db } from '../../components/db.js'  
export default {
  name: 'listaCreaciones',
  props: ['listaCreaciones'],
  data(){
    return{
      datos:null
    }
    
  },
  firestore:{
    datos: db.collection('categorias')  
  }

}
</script>

