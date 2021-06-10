<template> 
  <tr class="table-tr">
    <td class="table-td">
      <img class="table-img" v-bind:src=panelProductos.img1[0] >
    </td>
    <td class="table-td">
      {{panelProductos.nombre}}      
    </td>
    <td class="table-td">
      {{panelProductos.categoria}}
    </td>
    <td class="table-td" >
      <i class="fas fa-trash" @click="baja"></i><br>
      <i class="far fa-edit" @click="editarBtn"></i>
    </td>
  </tr>  
</template>

<script>
export default {
  name: 'panelProductos',
  props: ['panelProductos'],
  methods:{
    baja: function() {
      this.$emit("baja",this.panelProductos);
      this.$notify({
        group: 'foo',
        title: 'Producto eliminado',
        type: 'success'
      });
    },
    editarBtn: function(){
     this.$emit("editarBtn",this.panelProductos);
     this.rellenarInputs()
    },
    rellenarInputs(){
      this.$emit("rellenarInputs",this.panelProductos);
    }
  }

}
</script>

