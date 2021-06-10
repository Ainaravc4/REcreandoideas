<template>
  <div class="home">
    <section class="hero">
      <div class="hero-slide">
          <img src="../images/hero.png">
      </div>
    </section>
    <h1 class="subtitulos">¿Qué hacemos?</h1>
    <section class="queHacemos">
      <router-link to="/creaciones"> 
        <div class="queHacemos-body">
          <img class="queHacemos-body-img" src="../images/1.jpg" alt="lampara con flores">
          <h3 class="queHacemos-body-titulo">Creaciones</h3>
        </div>
      </router-link>
       <router-link to="/recreaciones">
      <div class="queHacemos-body">
        <img class="queHacemos-body-img" src="../images/2.jpg" alt="lampara con flores">
        <h3 class="queHacemos-body-titulo">Recreaciones</h3>
      </div>
       </router-link>
    </section>
    <section class="informacion">
      <div class="contenedor">
        <div class="parte contenedor-texto">
          <h1 class="subtitulos">Video Informativo</h1>
          <div class="contenedor-texto-info">
            Recreando ideas es una empresa familiar compuesta por varios miembros, cada uno aporta sus conocimientos y experiencia en su ámbito profesional, haciendo posible esta nueva aventura.
            Con 28 años de experiencia creando proyectos y diseños únicos en los hogares de nuestros clientes, esto ha hecho posible reforzar nuestras habilidades en diferentes campos. 
          </div>
        </div>
        <div class="parte contenedor-video">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/SUNpDBfM4FU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    </section>
    <h1 class="subtitulos productsHome">Nuestros productos</h1>
    <section class="productosL">
      <listaProductos
        v-for="dato in datos" 
        v-bind:key="dato.id"
        v-bind:listaProductos="dato"/>
    </section>
    <formularioContacto/>


    
  </div>
</template>

<script>


import listaProductos from '../components/productos/listaProductos.vue'
import { db } from '../components/db.js' 
import formularioContacto from '../components/home/formularioContacto.vue'
export default {
  name: 'App',
  components: {
    formularioContacto,
    listaProductos
  },
  data(){
    return{          
      datos:null
    }
  },
  firestore:{
    datos: db.collection('productos').limit(4)                                                
  }
  
}
</script>
