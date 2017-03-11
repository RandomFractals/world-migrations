<template>
  <md-bottom-bar id="footer" class="footer md-transparent">
    <span class="caption md-caption">data:</span>
    <a class="link"
      href="http://www.un.org/en/development/desa/population/migration/data/estimates2/estimates15.shtml"
      target="_blank">United Nations</a>
    |
    <span class="caption md-caption">code:</span>
    <a class="link" 
      href="https://github.com/RandomFractals/world-migrations"
      target="_blank">world-migrations</a>
    |    
    <span class="caption md-caption" style="flex: 1">{{ copyright }}</span>
  </md-bottom-bar>
</template>

<script>
export default {
  name: 'bottomBar',
  data () {
    return {
      copyright: ' v.0.0.1 © Random Fractals, Inc | 2017'
    }
  }
}
</script>

<style>

/* App Footer styles */
#footer {
  background-color: #f9f9f9;
	border: solid 1px #ccc;  
	margin: 0px;
	padding: 5px;		   
	position: fixed;
	bottom: 0px;
	height: 18px;  
  width: 100%;
}

.caption {
  font-size: 0.8em;
  padding-left: 5px;
}

.link {
  font-size: 0.8em;
  text-decoration: none
}
</style>