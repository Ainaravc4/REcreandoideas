<template>

  <div class="formulario">
    <h1 class="subtitulos">Contacta con nosotros</h1>
    <div class="formulario-contenedor">
      <form @submit.prevent="sendEmail">
        <label >Nombre</label>
        <input type="text" v-model="name" name="name" required>

        <label >Email</label>
        <input type="text"  v-model="email" name="email" pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}" required>

        <label >Asunto</label>
        <textarea name="message" cols="30" rows="10"  v-model="message" required></textarea>

      <div class="politica">
        <input type="checkbox" required id="poli">
        <label class="container" for="poli">Acepto la <router-link to="/politica">Política de privacidad</router-link></label>
        
      </div>    
        <input type="submit">
      </form>
    </div>
  </div>
</template>


<script>
import emailjs from 'emailjs-com';
import { init } from 'emailjs-com';
init("user_AZ4ylWAxpMMopFJic4kMw");
export default { 
  name: 'formulario',
  data() { 
    return { 
      name: '', 
      email: '', 
      message: '' 
    } 
  }, 
  methods: { 
    sendEmail(e) { 
      try { 
        emailjs.sendForm('service_bhnszlm', 'template_02cdk6d', e.target, 'user_AZ4ylWAxpMMopFJic4kMw', 
        { name: this.name,
          message: this.message,
          email: this.email
         
        }) 

      } catch(error) { 
        console.log({error}) 
      } 

      this.name = '', this.email = '', this.message = '' 
      }, 
  } 
}

</script>

