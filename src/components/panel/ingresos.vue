<template>
    <div class="ingresos">
     
      <div class="grafico" v-if="grafico1">
        <GChart 
        class="g"
        type="PieChart"
        v-bind:data="productosVendidos"
        :options="chartOptions"
        />
      </div>
      <div class="g1" v-else>
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
        :options="chartOptions2"
      />
      </div>
       <button class="cambioGrafico" @click="grafico1=!grafico1">Cambiar vista</button>
      <p class="gastosTotal">Sus ingresos son: {{total}}€</p>
      <div id="accordion">
        <div class="card" v-for="fecha of fechas" v-bind:key="fecha.id" >
          <div class="card-header" @click="abrir(fecha.id)" data-toggle="collapse"  v-bind:aria-controls="fecha.id" >
            <h1 class="mb-0">
              <button type="button" class="btn btn-link" >
                {{fecha.fecha}}
              </button>
            </h1>
          </div>
         
          <div v-bind:id="fecha.id" class="collapse"  data-parent="#accordion">
            <div class="card-body">
              <div>
                <table >
                  <th></th>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <tr v-for="dato of porNombre" v-bind:key="dato.id" v-show="dato.fecha==fecha.fecha">
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

  
</template>

<script>
import { GChart } from "vue-google-charts";
import { db } from '../db.js'  
export default {
  components:{
    GChart
  },
  data () {
    return {
      datos:[],
      productos:[],
      chartData:[],
      grafico1:true,
      chartOptions: {
        chart: {
          title: "Recreando ideas",
          subtitle: "Ingresos"
        },
        
      },
       chartOptions2: {
        chart: {
          title: "Recreando ideas",
          subtitle: "Ingresos"
        },
        colors: ['#9FE0BA']
      }
    }
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
    },
   porNombre(){
    
     let unicos=[]
     for(let p of this.ingresos){
        let nombre="";
        let cantidad=0;
        let precio=0;
        let img="";
        let fecha="";
      for(let d of this.datos){
       if(p.nombre == d.nombre && p.fecha == d.fecha){
         nombre=d.nombre;
         cantidad+=d.cantidad;
         precio+=d.precio;
         img=d.img;
        fecha=d.fecha;
       }
      }
      if(nombre!=""){
        unicos.push({'id':p.fecha+nombre,'cantidad':cantidad,'nombre':nombre,'precio':precio,'img':img,'fecha':fecha})
      }
      
     }
     return unicos;
   },
   /*cantidad(){
     
      let datos=[];
      for(let p of this.vendidos){
      let precio=0;
       let total2=0;
        for(let c of this.datos){
          if(c.nombre==p.nombre && c.fecha==p.fecha){
            total2=total2+c.cantidad  
            precio=precio+c.precio
            datos.push({'cantidad':total2,'nombre':p.nombre,'precio':precio,'img':p.img})
          }else if(c.nombre==p.nombre && c.fecha!=p.fecha)
            datos.push({'cantidad':c.cantidad,'nombre':p.nombre,'precio':c.precio,'img':p.img})

        }
       
      }
      console.log(datos)
      return datos;
   },*/
    total(){
     let total=0;
     for(let dato of this.datos){
       total=dato.precio+total;
     }
     return total;
   },
   ingresos(){
     let u=[];
     for(let d of this.datos){
       u.push({id:d.nombre+d.fecha,nombre:d.nombre,fecha:d.fecha,cantidad:d.cantidad,precio:d.precio})
     }
      let fechass = u.map(item=>{
        return [item.id,item]
      });
      var fechasArr = new Map(fechass); 
      let unicos = [...fechasArr.values()];
      return unicos
   },
    fechas(){
      let fechass = this.datos.map(item=>{
        return [item.fecha,item]
      });
      var fechasArr = new Map(fechass); 
      let unicos = [...fechasArr.values()];
      return unicos
   },
 
   vendidos(){
      let vendido = this.datos.map(item=>{
        return [item.nombre,item]
      });
      var fechasArr = new Map(vendido); 
      let unicos = [...fechasArr.values()];
      return unicos
   },
    productosVendidos(){
      let datos=[["Productos","Vendidos"]]
      for(let p of this.vendidos){
        let total=0;
        for(let c of this.datos){
          if(c.nombre==p.nombre)
            total=total+p.cantidad
        }
        datos.push([p.nombre,total])
      }
      return datos;
    },
  },

  firestore:{
      datos: db.collection('compras').orderBy('mes','asc'),
      productos: db.collection('productos')
  }
}
</script>