<template> 
  <tr class="table-tr">
    <td class="table-td">
      <img class="table-img" v-bind:src=panelCategorias.img >
    </td>
    <td class="table-td">
      {{panelCategorias.nombre}}      
    </td>
    <td class="table-td">
      {{panelCategorias.tipo}}      
    </td>
    <td class="table-td" >
      <i class="fas fa-trash" @click="baja"></i><br>
      <i class="far fa-edit" @click="editarBtn"></i>
    </td>
  </tr>  
</template>

<script>
export default {
  name: 'panelCategorias',
  props: ['panelCategorias'],
  methods:{
    baja: function() {
      this.$emit("baja",this.panelCategorias);
      this.$notify({
        group: 'foo',
        title: 'Categoria eliminada',
        type: 'success'
      });
    },
    editarBtn: function(){
     this.$emit("editarBtn",this.panelCategorias);
     this.rellenarInputs()
    },
    rellenarInputs(){
      this.$emit("rellenarInputs",this.panelCategorias);
    }
  }

}
</script>

