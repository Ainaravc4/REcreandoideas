
<template>
   
  <div class="fichaProducto" >
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item  fichaProducto-img" v-for="(img,idx) of listaFichas.img1" v-bind:key="img"  :class="{ active: idx==0 }" >
        <img class="d-block w-100"  v-bind:src="img" >
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
      <h1 class="subtitulos">{{listaFichas.nombre}}</h1>

      <p class="fichaProducto-texto-precio"><b>{{listaFichas.precio}} € </b></p>
      <p class="fichaProducto-texto-descripcion">{{listaFichas.descripcion}}</p>

      <p  v-show="listaFichas.categoria=='Lámparas Creadas'"><b>¿Quieres crear tu propia lámpara?</b></p>
      <p  v-show="listaFichas.categoria=='Lámparas Creadas'">Accede a la siguiente página: </p>
      <router-link class="crear" :to="{name: 'personalizar'}">
        <button class="fichaProducto-texto-crear" v-show="listaFichas.categoria=='Lámparas Creadas'">Crear</button>
      </router-link>

      <p><b>¿Te atreves a hacerlo por ti mismo?</b></p>
      <p>Envíanos tus resultados:</p>
      <div class="fichaProducto-texto-redes">
        <a href="https://www.facebook.com/re.creandoideas.5" class="social-media-link"><i class="fab fa-facebook-square"></i></a>
        <a href="https://www.instagram.com/re.creandoideas/" class="social-media-link"><i class="fab fa-instagram"></i></a>
        <a href="https://www.youtube.com/channel/UCI7Os-d2rOhXqeDVFLBp8aw/featured" class="social-media-link"><i class="fab fa-youtube"></i></a>
      
      </div>
     <button class="fichaProducto-texto-comprar" @click="alta">Añadir al Carrito</button>
    <hr>

    </div>
    
    <div class="tabsDinamicas">
      <nav class="pestañas">
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Proceso</a>
          <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Materiales</a>
          <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Herramientas</a>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          <h1>Proceso</h1>
          <div class="parte contenedor-video">
            <iframe width="560" height="315" v-bind:src="listaFichas.video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

           
          </div>
        </div>
        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
          <h1>Materiales</h1>
          <ol>
            <li v-for="(material) in listaFichas.materiales" v-bind:key="material.idProducto">{{material}}</li>
          </ol>
          </div>
        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
          <h1>Herramientas</h1>
          <ol>
            <li v-for="(herramienta) in listaFichas.herramientas" v-bind:key="herramienta.idProducto">{{herramienta}}</li>
          </ol>
        </div>
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
</template>

<script>
import Firebase from '../../components/db.js'
import relacionados from '../fichaProducto/relacionados.vue'
import routes from '../../router/index.js'
import { db } from '../../components/db.js'  
export default {
  name: 'listaFichas',
  props: ['listaFichas'],
  components:{
    relacionados
  },
  data(){
    return{
      datos:null,
      carrito:null,
      idca:null,
      comprobarStock:null
    }
    
  },
    mounted(){
    
    this.$bind('comprobarStock', db.collection('carrito').where("ide","==",routes.currentRoute.params.idProducto));
      
  },
  methods:{
    alta: function() {
      if(Firebase.auth.currentUser==null || Firebase.auth.currentUser.email=="admin@gmail.com"){
        this.$notify({
        group: 'foo',
        title: 'Tienes que iniciar sesión como cliente',
        type: 'error'
      });
      }else{
        let boo=false;
        let can=0;
        if(this.carrito.length==0){
          db.collection('carrito').add({
              user:Firebase.auth.currentUser.email,
              nombre: this.listaFichas.nombre,
              img: this.listaFichas.img1,
              precio:parseInt(this.listaFichas.precio) ,
              cantidad:1,
              ide:this.listaFichas.idProducto,
              stock2:parseInt(this.listaFichas.stock),
              stock:parseInt(this.listaFichas.stock2),
              subtotal:parseInt(this.listaFichas.precio)
            })
            this.$notify({
              group: 'foo',
              title: 'Añadido a carrito',
              type: 'success'
            });
        }else if(this.carrito.length>=1){
          for(let c of this.porNombre){
            if(c.nombre==this.listaFichas.nombre){
              boo=true;
              can=c.cantidad+1

              this.idca=c.id
            }
          }

          if(boo==true){ 
            if(this.comprobarStock[0].cantidad<parseInt(this.listaFichas.stock) ){
              db.collection('carrito')
                .doc(this.idca)
                .set({
                  subtotal:parseInt(this.listaFichas.precio*can) ,
                  nombre:this.listaFichas.nombre,
                  cantidad:can,
                  ide:this.listaFichas.idProducto,
                  precio:parseInt(this.listaFichas.precio) ,
                  user:Firebase.auth.currentUser.email,
                  img:this.listaFichas.img1,
                  stock2:parseInt(this.listaFichas.stock),
                  stock:parseInt(this.listaFichas.stock2),
                  mes: new Date().getMonth()+1,
                  fecha: new Date().getDate()+'-'+(new Date().getMonth()+1)+'-'+new Date().getFullYear()
                })
                this.$notify({
                  group: 'foo',
                  title: 'Añadido a carrito',
                  type: 'success'
                });
            }else{
              this.$notify({
                group: 'foo',
                title: 'No hay existencias',
                type: 'error'
              });
            }
          }else if(boo==false){
            db.collection('carrito').add({
              user:Firebase.auth.currentUser.email,
              nombre: this.listaFichas.nombre,
              img: this.listaFichas.img1,
              precio:parseInt(this.listaFichas.precio) ,
              cantidad:1,
              ide:this.listaFichas.idProducto,
              stock2:parseInt(this.listaFichas.stock),
              stock:parseInt(this.listaFichas.stock2),
              subtotal:parseInt(this.listaFichas.precio)
            })
            this.$notify({
              group: 'foo',
              title: 'Añadido a carrito',
              type: 'success'
            });
          }
        }
        
      }
    }, 
  },
  computed:{
    porNombre(){
      let vendido = this.carrito.map(item=>{
        return [item.nombre,item]
      });
      var fechasArr = new Map(vendido); 
      let unicos = [...fechasArr.values()];
      return unicos
   }
  },

firestore:{
    carrito:db.collection('carrito'),
    datos: db.collection('productos').where("categoria","==", routes.currentRoute.params.idCategoria ? routes.currentRoute.params.idCategoria : "Lámparas Creadas").limit(3),
    comprobarStock:db.collection('carrito').where("ide","==",routes.currentRoute.params.idProducto ? routes.currentRoute.params.idProducto : " " )                                                  
  }
}
</script>

