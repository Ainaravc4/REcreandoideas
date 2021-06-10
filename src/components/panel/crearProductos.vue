<template>
    <div class="tabla">
      
      <form  class="tabla-form">
        <h1>Productos</h1>
        <div class="dato">
          <label for="nombre" >Nombre</label>
          <input id="nombre" type="text" v-model="nombre" required="required" placeholder="Indica el nombre">
        </div>

        <div class="dato">
          <label for="descripcion">Descripcion</label>
          <input id="descripcion" type="text" v-model="descripcion" placeholder="Haz una breve descripción">
        </div>

        <div class="dato">
          <label for="categoria">Categoria</label>
          <select v-model="categoria" name="categoria" id="categoria" required="required" >
            <option  v-for="cat of arrayCategorias" v-bind:key="cat.id">{{cat.nombre}}</option>
          </select>
        </div>

        <div class="dato">
          <label for="precio">Precio</label>
          <input id="precio" type="number"  v-model="precio" pattern="[0-9]+" title="Solo números" required="required" placeholder="Indica el precio">
        </div>

        <div class="dato">
          <label for="stock">Stock</label>
          <input id="stock" type="number"  v-model="stock" pattern="[0-9]+" title="Solo números" required="required" placeholder="Indica la cantidad">
        </div>

        <div class="dato">
          <label for="video">Video</label>
          <input id="video" type="text"  v-model="video" placeholder="Inserta la url">
        </div>


        <div class="dato">
          <label for="materiales">Materiales</label>
          <input id="materiales" type="text"  v-model="materiales" pattern="^[^\s,]+(?:,\s*[^\s,]+)*$" placeholder="Separalos por comas">
        </div>

        <div class="dato">
          <label for="herramientas">Herramientas</label>
          <input id="herramientas" type="text"  v-model="herramientas" placeholder="Separalas por comas">
        </div>

        <div class="dato img">
          <label for="imagen1" >Imagen 1</label>
          <input  type="file"  id="imagen1"  @change="verImagen1" accept="image/*" required="required">
          <div class="img" v-if="imageData1!=null">                     
            <img class="tabla-dato-img"  :src="img1">
          </div> 
        </div>

        <div class="dato img">
          <label for="imagen2">Imagen 2</label>
          <input  type="file"  id="imagen2"  @change="verImagen2" accept="image/*" >
          <div class="img" v-if="imageData2!=null">                     
            <img class="tabla-dato-img"  :src="img2">
          </div> 
        </div>

        <div class="dato img">
          <label for="imagen3">Imagen 3</label>
          <input  type="file"  id="imagen3"  @change="verImagen3" accept="image/*" >
          <div class="img" v-if="imageData3!=null">                     
            <img class="tabla-dato-img"  :src="img3">
          </div> 
        </div>

        <div class="dato">
          <button @click="alta" v-if="botonEditar==false">Crear</button>
          <button  @click="editar" v-if="botonEditar==true">Editar</button>
          <button class="ora" @click="borrarInputs" v-if="botonEditar==true">Cancelar</button>
        </div>
      </form>


      <table class="tabla-productos">
        <tr>
          <th>Img</th>
          <th>Nombre</th>
          <th>Categoria</th>
        </tr>

        <panelProductos
          v-for="dato in datos"
          v-bind:key="dato.id"
          v-on:baja="baja(dato)"
          v-on:rellenarInputs="rellenarInputs(dato)"
          v-on:editarBtn="editarBtn()"       
          v-bind:panelProductos="dato"/>

      </table>
      
    </div>

  
</template>

<script>
//import Firebase from '../components/db.js'
import panelProductos from './panelProductos.vue'
import { db } from '../../components/db.js'
//import { storage } from '../components/db.js'   
export default {
  components:{
    panelProductos
  },
  data(){
      return{
         user: {
          loggedIn: false,
          data: null       
        },
          botonEditar:false,
          mostrar:true,
          mostrar2:true,
          datos:[],
          descripcion:"",
          categoria:"",
          nombre:"",
          precio:"",
          video:"",
          materiales:"",
          herramientas:"",
          stock:"",
          imagen1:"",
          imagen2:"",
          imagen3:"",
          idProducto:"",

          imageData1: null,
          imageData2: null,
          imageData3: null,
          img1: null,
          img2: null,
          img3: null,
          arrayCategorias:[]
      }
  },
  methods:{
    alta: function() {
      db.collection('productos').add({
        
        categoria: this.categoria,
        idProducto: this.generarID,
        descripcion: this.descripcion,
        materiales:this.materiales.toString().split(','),
        herramientas: this.herramientas.toString().split(','),
        video: this.video,
        nombre: this.nombre,
        precio: this.precio,
        stock: this.stock,
        stock2: this.stock,
        img1:[this.img1,this.img2,this.img3]
      })
      this.$notify({
        group: 'foo',
        title: 'Producto creada',
        type: 'success'
      });
      this.borrarInputs();
    },

    baja:function(producto){
      db.collection('productos')
      .doc(producto.id)
      .delete()
    },
    rellenarInputs(producto){
      this.nombre=producto.nombre;
      this.descripcion=producto.descripcion;
      this.categoria=producto.categoria;
      this.precio=producto.precio;
      this.stock=producto.stock;
      this.video=producto.video;
      this.materiales=producto.materiales;
      this.herramientas=producto.herramientas;      
      this.img1=producto.img1[0];
      this.img2=producto.img1[1];
      this.img3=producto.img1[2];
      this.idProducto=producto.id;

    },
    editar: function() {
      db.collection('productos')
      .doc(this.idProducto)
      .set(
        {categoria: this.categoria,
        descripcion: this.descripcion,
        materiales:this.materiales.toString().split(","),
        herramientas: this.herramientas.toString().split(","),
        video: this.video,
        nombre: this.nombre,
        precio: this.precio,
        stock: this.stock,
        stock2: this.stock,
        img1:[this.img1,this.img2,this.img3],
        idProducto:this.idProducto
        },
        
      )
      this.$notify({
        group: 'foo',
        title: 'Producto editada',
        type: 'success'
      });
      this.borrarInputs();
     
    },
    editarBtn(){
      this.botonEditar=true
    },
    borrarInputs(){
      this.descripcion="",
      this.categoria="",
      this.nombre="",
      this.precio="",
      this.video="",
      this.materiales="",
      this.herramientas="",
      this.stock="",
      this.img1="",
      this.img2="",
      this.img3="",
      this.imageData1=null,
      this.imageData2=null,
      this.imageData3=null,
      this.idProducto="",
      this.botonEditar=false
    },
    verImagen1: function(event){
      this.uploadValue=0;     
      this.imageData1 =event.target.files[0];
      var reader = new FileReader();

      reader.onload = (e) => {       
          this.img1 = e.target.result;
      }
      reader.readAsDataURL(this.imageData1);
      
    },

    verImagen2: function(event){
      this.uploadValue=0;        
      this.imageData2 =event.target.files[0];
      var reader = new FileReader();

      reader.onload = (e) => {       
          this.img2 = e.target.result;
      }
      reader.readAsDataURL(this.imageData2);

    },
    verImagen3: function(event){
      this.uploadValue=0;        
      this.imageData3 =event.target.files[0];
      var reader = new FileReader();

      reader.onload = (e) => {       
          this.img3 = e.target.result;
      }
      reader.readAsDataURL(this.imageData3);

    }
  },
  computed:{
     
      generarID: function(){
        var result='';
        var characters= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        for ( var i = 0; i < 10; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
      }

  },
  firestore:{
      datos: db.collection('productos'),
      arrayCategorias:db.collection('categorias')
  }
}
</script>