<template>

  <div class="pie">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
   
   <link href="https://fonts.googleapis.com/css?family=Dancing+Script:400,700|Josefin+Sans:300,400,600,700|Nunito:300,400,600,700" rel="stylesheet">
   
   <section class="footer">
     <div class="footer-nav-wrapper">
        <h1 class="tituloFooter">Más información</h1>
        <ul class="footer-nav">
            <li class="footer-nav-item">
              <router-link to="/creaciones" class="footer-nav-link">
                    Creaciones 
              </router-link>
            </li>
            <li class="footer-nav-item">
              <router-link to="/recreaciones" class="footer-nav-link">
                    Recreaciones
              </router-link>
            </li>
            <li class="footer-nav-item">
              <router-link to="/sobre" class="footer-nav-link">
                    Sobre Nosotros
              </router-link>
            </li>
            <li class="footer-nav-item">
               <router-link to="/politica" class="footer-nav-link">
                    Política de privacidad
               </router-link>
            </li>
            
        </ul>
    </div>
    <div class="footer-social-media">
      <h1 class="tituloFooter">Contáctanos</h1>
        <ul class="social-media">
            <li class="social-icon-item">
                <a href="https://www.facebook.com/re.creandoideas.5" target="_blank" class="social-icon-link">
                    <i class="fab fa-facebook-square"></i>
                    Facebook
                </a>
            </li>
            <li class="social-icon-item">
              <a href="https://www.youtube.com/channel/UCI7Os-d2rOhXqeDVFLBp8aw/featured" target="_blank" class="social-icon-link">
                    <i class="fab fa-youtube"></i>
                    Youtube
                </a>
                
            </li>
            <li class="social-icon-item">
                <a href="https://www.instagram.com/re.creandoideas/" target="_blank" class="social-icon-link">
                    <i class="fab fa-instagram"></i>
                    Instagram
                </a>
            </li>
        </ul>
    </div>
   </section>
  </div>
</template>


<script>
export default {
  name: 'pie',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
