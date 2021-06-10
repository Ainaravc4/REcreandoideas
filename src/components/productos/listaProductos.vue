<template>
   
  <router-link class="pro" :to="{name: 'fichaProducto', params: { idProducto: listaProductos.idProducto }}">
    <div class="card listaProductos" >
      <img class="card-img-top" v-bind:src="listaProductos.img1[0]" alt="Card image cap">
      <div class="card-body">
        <p class="card-text  listaProductos-nombre">{{listaProductos.nombre}}</p>
        <p class="card-text  listaProductos-precio">{{listaProductos.precio}}€ </p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'listaProductos',
  props: ['listaProductos'],
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

