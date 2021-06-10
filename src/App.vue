<template>
  <div id="app">
    
      <cabecera/>
      <router-view/>
      <pie/>
      
    
    <notifications position="top left" group="foo" />
  </div>
</template>

<script>
import cabecera from './components/app/cabecera.vue'

import pie from './components/app/pie.vue'
export default {
  name: 'App',
  components: {
    cabecera,
    pie
  }
}
</script>





