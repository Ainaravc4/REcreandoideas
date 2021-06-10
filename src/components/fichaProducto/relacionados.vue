<template>
        
        <div class="card listaProductos"  @click="recargar(relacionados.idProducto, $router.currentRoute.params.idProducto)">
            <img class="card-img-top" v-bind:src="relacionados.img1[0]" alt="Card image cap">
            <div class="card-body">
                <p class="card-text  listaProductos-nombre">{{relacionados.nombre}}</p>
                <p class="card-text  listaProductos-precio">{{relacionados.precio}}€ </p>
            </div>
        </div>
</template>

<script>
export default {
    name: 'relacionados',
    props: ['relacionados'],
   
    methods:{
        recargar:function(ruta, vieja){
            if(this.$router.currentRoute.path=='/creaciones/productos/fichaProducto/'+vieja)
                this.$router.go(this.$router.push('/creaciones/productos/fichaProducto/'+ruta))
           else
                this.$router.push('/creaciones/productos/fichaProducto/'+ruta)
        }
    }
}
</script>


