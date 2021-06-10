<template>
  <div class="cabecera">
    
    <nav class="navbar sticky-top navbar-expand-sm navbar-dark ">
      
      <a class="navbar-brand" href="#">
        <router-link class="nav-item-link" to="/"><img src="../../images/logo.png" class="align-top logo" alt=""></router-link>
      </a>
      <div class="menu">
        <div class="cliente">
          <li class="nav-item" v-if="  authenticated && this.user.data.email!='admin@gmail.com'">
            <router-link class="nav-item-link"  to="/carrito">{{ firstName }}<i class="fas fa-shopping-cart"></i> ({{cantidadProductos}}) {{precioCarrito}}€ </router-link>
          </li>

          <li class="nav-item" v-if="this.user.data.email=='admin@gmail.com'">
            <router-link class="nav-item-link" to="/panel"><i class="fas fa-user-cog"></i></router-link> 
          </li>

          <li class="nav-item">
            <p class="nav-item-link"  v-if="!authenticated" @click="registro=false"  data-toggle="modal" data-backdrop="false" data-target="#exampleModal4"><i class="fas fa-sign-in-alt"></i></p>
            <p class="nav-item-link" v-if="authenticated" @click="logout" ><i class="fas fa-sign-out-alt"></i></p>

            <div  class="modal fade" id="exampleModal4" tabindex="-1" role="dialog" aria-labelledby="exampleModal4Label" aria-hidden="true">
              <div  class="modal-dialog" role="document">
                <div  class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      X
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="modal-body-form">
                        <label for="correo">Email</label>
                        <input type="text" id="correo" v-model="email">
                        <label for="contraseña">Contraseña</label>
                        <input type="password" id="contraseña" v-model="password">
                        <p v-if="!registro" @click="registro=!registro">Registrarse</p>
                        <button class="modal-body-form-button" v-if="!registro" @click="loginCorreo" >Iniciar sesion</button>
                        <button class="modal-body-form-button" v-if="registro" @click="registrarse" >Registrarse</button>
                    </div>
                    <hr>
                    <div class="modal-body-redes">
                      <ul>
                        <li class="social-media-item">
                          <a href="#" class="social-media-link" @click="loginFacebook">
                              <i class="fab fa-facebook-square"></i>
                          </a>
                          <span>Iniciar sesion con Facebook</span>
                        </li>
                        <li class="social-media-item" @click="loginGoogle">
                          <a href="#" class="social-media-link">
                              <i class="fab fa-google"></i>
                          </a>
                          <span>Iniciar sesion con Google</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </li>

          
        </div>
        <div class="opciones">
          <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse  justify-content-center" id="navbarNav">
            <ul class="navbar-nav ">
              <li class="nav-item">
                <router-link class="nav-item-link" to="/creaciones">Creaciones</router-link> 
              </li>
              <li class="nav-item">
                <router-link class="nav-item-link" to="/recreaciones">Recreaciones</router-link> 
              </li>
              <li class="nav-item">
                <router-link class="nav-item-link" to="/sobre">Sobre Nosotros</router-link> 
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </nav>
    
  </div>
</template>

<script>
import Firebase from '../db.js'
import { db } from '../db.js' 

export default {
  name: 'cabecera',
  props: {
    msg: String
  },
  data () {
      return {
        user: {
          loggedIn: false,
          data: {}          
        },
        registro:false,
        email:"",
        password:"",
        modal:null,
        datos:[],
        click:false
      }  
    },
  mounted: function() {
      Firebase.auth.onAuthStateChanged( user => {
        if (user) {
          this.user.loggedIn = true;
          this.user.data = user;
           this.$notify({
            group: 'foo',
            title: 'Ha iniciado sesión',
            type: 'success'
          });

        }
        else {
          this.user.loggedIn = false;
          this.user.data = {};
          this.$notify({
          group: 'foo',
          title: 'Ha cerrado sesión',
          type: 'success'
        });
        }
      })
  },
  methods:{
    carrito: function(){
      if (!this.authenticated) {
        this.$notify({
        group: 'foo',
        title: 'Tiene que iniciar sesión',
        type: 'error'
      });
      }
    },
    loginGoogle:function(){
      Firebase.loginGoogle();
      
    },
    loginFacebook:function(){
      Firebase.loginFacebook();
      
    },
    logout() {
      Firebase.logout();
      
    },
    loginCorreo(){
      this.modal=Firebase.signInWithEmailPassword(this.email,this.password);
     
    },
    registrarse(){
      Firebase.signUpWithEmailPasswoerd(this.email,this.password);
      this.$notify({
        group: 'foo',
        title: 'Ha sido registrado',
        type: 'success'
      });
      this.registro=false;
    }
    
    
  },
  computed: {
    cantidadProductos(){
      let total=0;
      if(this.user.loggedIn){
        for(let dato of this.datos)
          if(dato.user==Firebase.auth.currentUser.email)
            total+=dato.cantidad;
      }
     return total
    },
    precioCarrito(){
      let total=0;
      if(this.user.loggedIn){
        for(let dato of this.datos)
          if(dato.user==Firebase.auth.currentUser.email)
            total+=parseInt(dato.subtotal) ;
      }
      return total
    },
    authenticated(){
      return this.user.loggedIn
    },
    firstName(){
      if (this.user.data.displayName) {
        return this.user.data.displayName.split(' ')[0]
        
      }
      if (this.user.data.email) {
        return this.user.data.email.split(' ')[0]
        
      }
      return null
    }    
  },
  firestore:{
      datos: db.collection('carrito')
  }
}


</script>

