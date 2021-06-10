<template>
  <div class="productos">
 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <section class="hero">
      <div class="hero-slide">
          <img src="../images/hero.png">
      </div>
    </section>
    <div class="ficha">
      <div class="fichaProducto" >
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active fichaProducto-img"  v-for="i of img" v-bind:key="i.nombre">
            <img class="d-block w-100" v-bind:src="i.img1[0]" alt="First slide">
          </div>
          <div class="carousel-item  fichaProducto-img" v-for="dato of datos" v-bind:key="dato.id">
            <img class="d-block w-100" v-bind:src="dato.img1[1]" alt="First slide">
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
        </div>

        <div class="fichaProducto-texto">
          <h1 class="subtitulos">Lámpara personalizada</h1>
          <br>
          <h2 class="fichaProducto-texto-titulo"><b>¿CÓMO HACERLO?</b></h2>
          <p class="fichaProducto-texto-descripcion">Rellene el formulario que se encuentra más abajo, y elija el estilo que quiere para su lámpara personalizada, su petición nos llegará y nos pondremos en contacto con usted para hacérsela llegar.</p>
          <br>
          <h2><b>¿TIENE ALGUNA DUDA?</b></h2>
          <div class="fichaProducto-texto-redes">
            <a href="https://www.facebook.com/re.creandoideas.5" class="social-media-link"><i class="fab fa-facebook-square"></i></a>
            <a href="https://www.instagram.com/re.creandoideas/" class="social-media-link"><i class="fab fa-instagram"></i></a>
            <a href="https://www.youtube.com/channel/UCI7Os-d2rOhXqeDVFLBp8aw/featured" class="social-media-link"><i class="fab fa-youtube"></i></a>
          
          </div>
        <hr>
        </div>
        <div class="formulario">
          <h1 class="subtitulos">Decore su propia lámpara</h1>
          <p>¿Quiere darle al producto su propio estilo? Rellene el siguiente formulario e indíquenos como quiere su lámpara.</p>
          
          <div class="formulario-contenedor">
            <form @submit.prevent="sendEmail">

              <p class="check" >Elija el tamaño:</p>
              <div class="radio">
                <div>
                  <input type="radio" id="grande" name="tamano" value="Grande">
                  <label class="labelR" for="grande">Grande: 14*14*12cm</label>
                </div>
                <div>
                  <input type="radio" id="pequena" name="tamano" value="Pequeña">
                  <label class="labelR" for="pequena" >Pequeña: 10*10*10cm</label>
                </div>
              </div>
             
              <label >Elija el color:</label>
              <select name="color" id="color">
                <option value="Rosa degradado">Rosa degradado</option>
                <option value="Verde degradado">Verde degradado</option>
                <option value="Gris oscuro">Gris oscuro</option>
                <option value="Gris claro">Gris claro</option>
                <option value="Blanco">Blanco</option>
                <option value="Hormigon">Hormigon</option>
              </select>

              
              <label >Elija la decoración:</label>
              <select name="decoracion" id="decoracion">
                <option value="Perlas">Perlas</option>
                <option value="Pegatinas">Pegatinas</option>
                <option value="Chapa">Chapa</option>
                <option value="Purpurina plata">Purpurina plata</option>
                <option value="Purpurina dorada">Purpurina dorada</option>
                <option value="Purpurina cobre">Purpurina cobre</option>
              </select>
            
             
              <label >Elija el cable:</label>
              <select name="cable" id="cable">
                <option value="Rosa">Rosa</option>
                <option value="Rojo">Rojo</option>
                <option value="Azul">Azul</option>
                <option value="Verde">Verde</option>
                <option value="Dorado">Dorado</option>
                <option value="Plata">Plata</option>
                <option value="Blanco">Blanco</option>
                <option value="Negro">Negro</option>
              </select>

              
              <p  class="check">Elija el enchufe:</p>
              <div class="radio">
                <div>
                  <input type="radio" id="blanco" name="enchufe" value="Blanco">
                  <label class="labelR" for="blanco">Blanco</label>
                </div>
                <div>
                  <input type="radio" id="negro" name="enchufe" value="Negro">
                  <label class="labelR" for="negro">Negro</label>
                </div>
              </div>


              <label >Elija el portalámparas E27:</label>
              <select name="portalamparas" id="portalámparas">
                <option value="Blanco con embellecedor">Blanco con embellecedor</option>
                <option value="Blanco sin embellecedor">Blanco sin embellecedor</option>
                <option value="Negro con embellecedor">Negro con embellecedor</option>
                <option value="Negro sin embellecedor">Negro sin embellecedor</option>
              </select>

             
              <label >Indique donde quiere el Interruptor:</label>
              <select name="donde" id="donde">
                <option value="Centro frontal">Centro frontal</option>
                <option value="Centro trasero">Centro trasero</option>
                <option value="Zona superior">Zona superior</option>
              </select>

             
              <label >Indique como quiere el Interruptor:</label>
              <select name="como" id="como">
                <option value="Palanca ON/OFF">Palanca ON/OFF</option>
                <option value="Redondo blanco">Redondo blanco</option>
                <option value="Redondo negro">Redondo negro</option>
                <option value="Redondo rojo">Redondo rojo</option>
                <option value="Rectangular negro">Rectangular negro</option>
                <option value="Rectangular rojo">Rectangular rojo</option>
              </select>

              
              <label for="email">Su correo electrónico:</label>
              <input name="email" type="text" id="email" pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}" required>
            
            <div class="politica">
              <input type="checkbox" required id="poli">
              <label class="container" for="poli">Acepto la <router-link to="/politica">Política de privacidad</router-link></label>
            </div>
             
              <input type="submit" >
            </form>
          </div>
        </div>
       
        
        <h1 class="relacionados">Productos relacionados</h1>
        
        <div class="productosL">
          
          <relacionados
          v-for="dato in datos" 
          v-bind:key="dato.id"
          v-bind:relacionados="dato"/>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
import relacionados from '../components/fichaProducto/relacionados.vue'
import emailjs from 'emailjs-com';
import { init } from 'emailjs-com';
init("user_AZ4ylWAxpMMopFJic4kMw");
//import routes from '../router/index.js'
import { db } from '../components/db.js'  
export default {
  
  components:{
    relacionados

  },
  data(){
      return{
        user: {
          loggedIn: false,
          data: null          
        },
          datos:null,
          img:null
          
      }
  },
  mounted: function(){
    if(this.datos==null)
      this.$bind('datos', db.collection('productos').where("categoria","==","Lámparas Creadas"));
  },
  methods:{
    sendEmail(e) { 
      try { 
        emailjs.sendForm('service_bhnszlm', 'template_ci13eah', e.target, 'user_AZ4ylWAxpMMopFJic4kMw', 
        { name: this.name,
          message: this.message,
          email: this.email
         
        }) 

      } catch(error) { 
        console.log({error}) 
        this.name = '', this.email = '', this.message = '' 
       this.$notify({
        group: 'foo',
        title: 'No se ha podido enviar',
        type: 'success'
      });
      } 

      this.name = '', this.email = '', this.message = '' 
       this.$notify({
        group: 'foo',
        title: 'Se ha enviado correctamente',
        type: 'success'
      });
    }
   
    
  },
  firestore:{
    datos: db.collection('productos').where("categoria","==","Lámparas Creadas").limit(3),
    img:  db.collection('productos').where("categoria","==","Lámparas Creadas").limit(1)                                
  }
}
</script>