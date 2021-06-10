<template>
 <div class="tabsDinamicas">
      <nav class="pestañas">
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Categorias</a>
          <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Productos</a>
          <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Ingresos</a>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          <crearCategorias/> 
        </div>
        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
          <crearProductos/>
        </div>
        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
          <ingresos/>
          
        </div>
      </div>
    </div>
  
</template>

<script>
import Firebase from '../components/db.js'
import crearProductos from '../components/panel/crearProductos.vue'
import crearCategorias from '../components/panel/crearCategorias.vue'
import ingresos from '../components/panel/ingresos.vue'
export default {
  components:{
    crearProductos,
    crearCategorias,
    ingresos
  },
  data(){
      return{
         user: {
          loggedIn: false,
          data: null       
        },
      }
  },
   mounted: function() {
      Firebase.auth.onAuthStateChanged( user => {
        if (user) {
          this.user.loggedIn = true;
          this.user.data = user;
          
        }
        else {
          this.user.loggedIn = false;
          this.user.data = {};
          this.$router.push("/").catch(()=>{});
        }
      })
      
  }
}
</script>