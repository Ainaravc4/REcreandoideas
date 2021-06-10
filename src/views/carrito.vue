<template>
  
    

    <div class="tabsDinamicas">
      <nav class="pestañas">
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Mi Carrito</a>
          <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Mis Compras</a>
        </div>
      </nav>
      
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          <div class="tabla">
            <h1 class="tabla-titulo">Carrito</h1>
            <table class="tabla-productos">
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>

              <listaCarrito 
                v-for="dato in datos"
                v-bind:key="dato.id"
                v-on:baja="baja(dato)"
                v-on:editar="editar(dato)"
                v-bind:listaCarrito="dato"/>

                <tr>
                  <td>Total: </td>
                  <td>{{calcularTotal}}€</td>
                  <td>{{cantidad}} productos</td>
                </tr>
            </table>
            <!-- Button trigger modal -->
            <button class=" tabla-btn" data-toggle="modal" data-target="#finalizarPedido">Finalizar pedido</button>
            <!-- Modal -->
            <div class="modal fade" id="finalizarPedido" tabindex="-1" role="dialog" aria-labelledby="finalizarPedidoTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div ref="paypal"></div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
      </div>
      <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
          <compras/>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from '../components/db.js'
import listaCarrito from '../components/carrito/listaCarrito.vue'
import compras from '../components/carrito/compras.vue'
import { db } from '../components/db.js'  
export default {
  components:{
    listaCarrito,
    compras
  },
  data(){
    return{
      user: {
        loggedIn: false,
        data: null          
      },
      datos:null,
      compras:null,
      productosTodos:null,

      loaded: false,
      paidFor: false
    }
  },
  
  mounted: function() {
      Firebase.auth.onAuthStateChanged( user => {
        if (user) {
          this.user.loggedIn = true;
          this.user.data = user;
          this.$bind('datos', db.collection('carrito').where("user", "==", Firebase.auth.currentUser.email));
        
        }
        else {
          this.user.loggedIn = false;
          this.user.data = {};
          this.datos=null;
          this.$router.push('/').catch(()=>{});
          
        }
      })

    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AYS-mYHKjmfxnjAxeqVSSmqxRn6M3g6OBopVzQvCY82LwXM8ljraL3OmduSk-0rTrpbFq_ZNAxLtNdXh&currency=EUR";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
      
  },
  methods:{
    baja:function(producto){
      db.collection('carrito')
      .doc(producto.id)
      .delete()
    },
    borrarCompras:function(producto){
      db.collection('compras')
      .doc(producto.id)
      .delete()
    },
    editar: function(producto) {
      db.collection('carrito')
      .doc(producto.id)
      .set(producto)
    },
    borrar: function() {
      for(let dato of this.datos){
        this.baja(dato)
      }
      this.$notify({
        group: 'foo',
        title: 'Se ha realizado el pedido',
        type: 'success'
        
      });
    },
    setLoaded: function() {
      let productos=[];
      var id='';
      for(let i of this.datos){
        productos.push({
        name:i.nombre,
        unit_amount:{
          currency_code:'EUR',
          value:i.precio
        },
        quantity:i.cantidad,
        sku:i.id+new Date().getMilliseconds()})
        id=i.id+new Date().getMilliseconds()
      }
      this.loaded = true;
      window.paypal

        .Buttons({
          
          createOrder: (data, actions) => {
            

            return actions.order.create({
              purchase_units: [{
                  amount: {
                    currency_code: "EUR",
                    value: this.calcularTotal,
                    breakdown:{ item_total: {value: this.calcularTotal, currency_code: 'EUR'}}
                  },
                  invoice_id:id+new Date().getMilliseconds(),
                  items:productos
                
                  
                }],
            });
            
            
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.data;
            this.paidFor = true;
            console.log(order);
            
            //cuando se realice la compra el carrito se borrará
            this.realizada();
            this.$notify({
              group: 'foo',
              title: 'Se ha realizado el pedido',
              type: 'success'
              
            });
            
          },
          onError: err => {
            console.log(err);
            this.$notify({
              group: 'foo',
              title: 'Se ha producido un error. Vuelve a intentarlo.',
              type: 'error'
              
            });
          }
        })
        .render(this.$refs.paypal);
    },
    
    realizada:function(){
      let miCarro=[];
      let miCarroFecha=[];
      for(let j of this.datos){
          miCarro.push(j.nombre+j.user+new Date().getDate()+'-'+(new Date().getMonth()+1)+'-'+new Date().getFullYear());
          miCarroFecha.push(new Date().getDate()+'-'+(new Date().getMonth()+1)+'-'+new Date().getFullYear());
      }


      if(this.compras.length==0){
        for(let j of this.datos){
          db.collection('compras').add(
            {nombre:j.nombre,
            cantidad:j.cantidad,
            precio:parseInt(j.subtotal) ,
            user:j.user,
            img:j.img[0],
            mes: new Date().getMonth()+1,
            fecha: new Date().getDate()+'-'+(new Date().getMonth()+1)+'-'+new Date().getFullYear()
          })
  
        }
      }else{
        let miCompra=[]
        let miCompraFecha=[]
        for(let j of this.compras){
          miCompra.push(j.nombre+j.user+j.fecha);
          miCompraFecha.push(j.fecha);
        }
        let nuevo=[]
        let repetido=[]
        for(let a in miCarro){
          if(miCompra.includes(miCarro[a])){
            repetido.push(this.datos[a])
          }else{
            nuevo.push(this.datos[a])
          }
        }

        let repeCom=[];
        for(let a in miCompra){
          if(miCarro.includes(miCompra[a])){
            repeCom.push({'cantidad':this.compras[a].cantidad,'precio':this.compras[a].precio,'id':this.compras[a].id})
          }
        }


        if(nuevo.length>=1){
          for(let j of nuevo){
            // console.log(j)
            db.collection('compras')
            .add(
              {nombre:j.nombre,
              cantidad:parseInt(j.cantidad),
              precio:parseInt(j.precio*j.cantidad) ,
              user:j.user,
              img:j.img[0],
              mes: new Date().getMonth()+1,
              fecha: new Date().getDate()+'-'+(new Date().getMonth()+1)+'-'+new Date().getFullYear()
            })
          }
        }
         if(repetido.length>=1){
          for(let j in repetido){
            // console.log(j)
            db.collection('compras')
            .doc(repeCom[j].id)
            .set(
              {nombre:repetido[j].nombre,
              cantidad:parseInt(repetido[j].cantidad+repeCom[j].cantidad),
              precio:parseInt(repetido[j].precio+repeCom[j].precio) ,
              user:repetido[j].user,
              img:repetido[j].img[0],
              mes: new Date().getMonth()+1,
              fecha: new Date().getDate()+'-'+(new Date().getMonth()+1)+'-'+new Date().getFullYear()
            })
          }
         }
      }
        
        for(let dato of this.datos){
          this.baja(dato)
        }
        for(let pro of this.productosTodos){
        var cant=0;
        for(let dato of this.datos){
          if(dato.nombre==pro.nombre){
            cant=pro.stock-dato.cantidad;
            if(cant>0){
              db.collection('productos')
              .doc(pro.id)
              .update({stock:cant, stock2:cant})
            }else{
              db.collection('productos')
              .doc(pro.id)
              .update({stock:0, stock2:0})
            }
          }
        }
        
      }
        
     }
     
    
      
  },
   
  computed:{
    porFechas(){
      let fechass = this.datos.map(item=>{
        return [item.fecha,item]
      });
      var fechasArr = new Map(fechass); 
      let unicos = [...fechasArr.values()];
      return unicos
   },
    porNombre(){
      let vendido = this.compras.map(item=>{
        return [item.nombre,item]
      });
      var fechasArr = new Map(vendido); 
      let unicos = [...fechasArr.values()];
      return unicos
   },
   porNombre2(){
      let vendido = this.compras.map(item=>{
        return [item.nombre,item]
      });
      var fechasArr = new Map(vendido); 
      let unicos = [...fechasArr.values()];
      return unicos
   },
    calcularTotal:function(){
      let total=0;
      for(let dato of this.datos){
          total+=parseFloat(dato.subtotal) ;
      }
      return total
    },
    cantidad:function(){
     let total=0;
     
      for(let dato of this.datos){
          total+=dato.cantidad;
      }
      return total
    }
  },
  firestore:{
      datos: db.collection('carrito').where("user","==",Firebase.auth.currentUser ? Firebase.auth.currentUser.email: ""),
      compras:db.collection('compras'),
      productosTodos:db.collection('productos')
      
  }
}
</script>