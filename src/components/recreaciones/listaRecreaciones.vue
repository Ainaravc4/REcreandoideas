<template>
   
    <li  class=" seccionCategorias-li" >
      <img class="mr-3  seccionCategorias-li-img"   v-bind:src="listaRecreaciones.img" v-if="listaRecreaciones.idCategoria%2==0"><!---->
      <div class="media-body seccionCategorias-li-div">
        <h5 class="subtitulos"> {{listaRecreaciones.nombre}} </h5>
        <p>{{listaRecreaciones.descripcion}}</p>
        <button class="seccionCategorias-li-boton"><router-link :to="{name: 'productosRecreados', params: { idCategoria: listaRecreaciones.nombre }}">Más Información...</router-link> </button>
      </div>
      <img class="mr-3  seccionCategorias-li-img"   v-bind:src="listaRecreaciones.img" v-if="listaRecreaciones.idCategoria%2!=0">
    </li>
  
</template>

<script>
export default {
  name: 'listaRecreaciones',
  props: ['listaRecreaciones'],
  data(){
    return{
    }
    
  },
  methods:{
    /*baja: function() {
      
    }*/

  }

}
</script>

