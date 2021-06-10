<template>
    <div class="tabla">
      
      <form  class="tabla-form">
        <h1>Categorias</h1>

        <div class="dato">
          <label for="nombre1" >Nombre</label>
          <input id="nombre1" type="text" v-model="nombre1" required="required" placeholder="Indica el nombre" >
        </div>

        <div class="dato">
          <label for="descripcion" >Descripción</label>
          <textarea id="descripcion" rows="4" cols="20" v-model="descripcion" placeholder="Indica la descripción"/>
        </div>

        <div class="dato">
          <label for="tipo">Tipo</label>
          <select v-model="tipo" name="tipo" id="tipo" required="required" >
            <option>Creacion</option>
            <option>Recreacion</option>
          </select>
        </div>

        <div class="dato img">
          <label for="imagen1">Imagen 1</label>
          <input  type="file"  id="imagen"  @change="verImagen1" accept="image/*" required="required">
          <div class="img" v-if="imageData1!=null">                     
            <img class="tabla-dato-img"  :src="img1">
          </div> 
        </div>

        <div class="dato">
          <button  @click="alta" v-if="botonEditar==false">Crear</button>
          <button  @click="editar" v-if="botonEditar==true">Editar</button>
          <button class="ora" @click="borrarInputs" v-if="botonEditar==true">Cancelar</button>
        </div>
      </form>


      <table class="tabla-productos">
        <tr>
          <th>Img</th>
          <th>Nombre</th>
          <th>Tipo</th>
        </tr>

        <panelCategorias
          v-for="dato in datos"
          v-bind:key="dato.id"
          v-on:baja="baja(dato)"
          v-on:rellenarInputs="rellenarInputs(dato)"
          v-on:editarBtn="editarBtn()"       
          v-bind:panelCategorias="dato"/>
        
      </table>
      
    </div>

  
</template>

<script>
import panelCategorias from './panelCategorias.vue'
import { db } from '../../components/db.js'  
export default {
  components:{
    panelCategorias
  },
  data(){
      return{
          datos:[],
          tipo:"",
          nombre1:"",
          descripcion:"",
          imageData1:null,
          img1:"",
          imagen1:"",
          botonEditar:false,
          idCategoria:""
      }
  },
  methods:{
    alta: function() {
      db.collection('categorias').add({
        tipo:this.tipo,
        nombre:this.nombre1,
        img:this.img1,
        descripcion:this.descripcion
      })
      this.$notify({
        group: 'foo',
        title: 'Categoria creada',
        type: 'success'
      });
      this.borrarInputs();
    },

    baja:function(categoria){
      db.collection('categorias')
      .doc(categoria.id)
      .delete()
    },
    rellenarInputs(categoria){
      this.nombre1=categoria.nombre;
      this.tipo=categoria.tipo;
      this.img1=categoria.img;
      this.descripcion=categoria.descripcion;
      this.idCategoria=categoria.id;
    },
    borrarInputs(){
      this.nombre1="";
      this.img1="";
      this.descripcion="";
      this.imageData1=null;
      this.tipo="";
      this.botonEditar=false;
    },
    editar: function() {
      db.collection('categorias')
      .doc(this.idCategoria)
      .set(
        {
        tipo:this.tipo,
        nombre:this.nombre1,
        img:this.img1,
        descripcion:this.descripcion
        }
      )
      this.$notify({
        group: 'foo',
        title: 'Categoria editada',
        type: 'success'
      });
      this.borrarInputs();
    },
    editarBtn(){
      this.botonEditar=true
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
  },
  firestore:{
      datos: db.collection('categorias')
  }
}
</script>