<template>
    <div >
      <div class="g1">
      <GChart
      type="ColumnChart"
      :data="[
      ['Mes','Pagos'],
      ['Enero', this.enero],
      ['Febrero', this.febrero],
      ['Marzo', this.marzo],
      ['Abril',this.abril],
      ['Mayo', this.mayo],
      ['Junio', this.junio],
      ['Julio', this.julio],
      ['Agosto',this.agosto],
      ['Septiembre', this.septiembre],
      ['Octubre', this.octubre],
      ['Noviembre', this.noviembre],
      ['Diciembre', this.diciembre]
      ]"
      :options="chartOptions"
      />
      </div>
      <div class="compras">
      <p class="gastosTotal">Su total: {{total}}€</p>
      <div id="accordion">
        <div class="card" v-for="fecha of fechas" v-bind:key="fecha.id" >
          <div class="card-header" @click="abrir(fecha.id)" data-toggle="collapse"  v-bind:aria-controls="fecha.id" >
            <h1 class="mb-0">
              <button type="button" class="btn btn-link" >
                {{fecha.fecha}}
              </button>
            </h1>
          </div>

          <div v-bind:id="fecha.id"  class="collapse "  data-parent="#accordion">
            <div class="card-body">
              <div>
                <table >
                  <th></th>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <tr v-for="dato of datos" v-bind:key="dato.id" v-show="dato.fecha==fecha.fecha">
                    <td><img class="imgCompra" v-bind:src="dato.img" alt=""></td>
                    <td>{{dato.nombre}}</td>
                    <td>{{dato.cantidad}}</td>
                    <td>{{dato.precio}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  
</template>

<script>
import Firebase from '../../components/db.js'
import { GChart } from "vue-google-charts";
import { db } from '../db.js'  
export default {
  components:{
    GChart
  },
  data () {
    return {
      datos:[],
      chartData:[],
      
      chartOptions: {
        chart: {
          title: "Recreando ideas",
          subtitle: "Compras"
        },
        colors: ['#9FE0BA']
      }
      
    }
  },
  mounted(){
    
    this.$bind('datos', db.collection('compras').where("user", "==", Firebase.auth.currentUser.email));
      
  },
   methods:{
    abrir(id){
      if(document.getElementById(id).className=="collapse")
        var mostrar1=document.getElementById(id).className+=" show";
      else
        var mostrar2=document.getElementById(id).className="collapse";

      console.log(mostrar1, mostrar2)
    }
  },
 computed: {
   
    porNombre(){
      let vendido = this.carrito.map(item=>{
        return [item.nombre,item]
      });
      var fechasArr = new Map(vendido); 
      let unicos = [...fechasArr.values()];
      return unicos
   },
   total(){
     let total=0;
     for(let dato of this.datos){
       total=dato.precio+total;
     }
     return total;
   },
    fechas(){
      let fechass = this.datos.map(item=>{
        return [item.fecha,item]
      });
      var fechasArr = new Map(fechass); 

      let unicos = [...fechasArr.values()];
      return unicos
   },
    enero(){
      let total=0;
      for(let dato of this.datos){
        if(dato.mes==1){
          total= total+dato.precio;
        }
      }
      return total;
    },
    febrero(){
      let total=0;
      for(let dato of this.datos){
        if(dato.mes==2){
          total= total+dato.precio;
        }
      }
      return total;
    },
    marzo(){
      let total=0;
      for(let dato of this.datos){
        if(dato.mes==3){
          total= total+dato.precio;        
        }
      }
      return total;
    },
    abril(){
      let total=0;
      for(let dato of this.datos){
        if(dato.mes==4){
          total= total+dato.precio;        
        }
      }
      return total;
    },
    mayo(){
      let total=0;
      for(let dato of this.datos){
        if(dato.mes==5){
          total= total+dato.precio;   
             
        }
      }
      return total;
    },
    junio(){
      let total=0;
      for(let dato of this.datos){
        if(dato.mes==6){
          total= total+dato.precio;        
        }
      }
      return total;
    },
    julio(){
      let total=0;
      for(let dato of this.datos){
        if(dato.mes==7){
          total= total+dato.precio;        
        }
      }
      return total;
    },
    agosto(){
      let total=0;
      for(let dato of this.datos){
        if(dato.mes==8){
          total= total+dato.precio;        
        }
      }
      return total;
    },
    septiembre(){
      let total=0;
      for(let dato of this.datos){
        if(dato.mes==9){
          total= total+dato.precio;        
        }
      }
      return total;
    },
    octubre(){
      let total=0;
      for(let dato of this.datos){
        if(dato.mes==10){
          total= total+dato.precio;        
        }
      }
      return total;
    },
    noviembre(){
      let total=0;
      for(let dato of this.datos){
        if(dato.mes==11){
          total= total+dato.precio;        
        }
      }
      return total;
    },
    diciembre(){
      let total=0;
      for(let dato of this.datos){
        if(dato.mes==12){
          total= total+dato.precio;        
        }
      }
      return total;
    }
  },

  firestore:{
    datos: db.collection('compras').where("user","==",Firebase.auth.currentUser ? Firebase.auth.currentUser.email: "")
  }
}
</script>