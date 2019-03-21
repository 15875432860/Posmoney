<template>
  <div id="app">
  <leftnav></leftnav>
	
	
	
<!--
	<div class="main">
		<leftnav></leftnav>
		<router-view/>
	</div>
--> 
  <router-view/>
  </div>
</template>

<script>
	import leftnav from '@/components/common/leftNav'
	import rightnav from '@/components/common/rightNav'
	import pos from '@/components/Pos'
	import pos3 from '@/components/pos3'
	
	
export default {
  name: 'App',
	components:{
		leftnav,rightnav,pos,pos3
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
	background-color: #EFF2F7;
}
.main{
  float:left;
  width:100%; 
  background-color: #EFF2F7;
  height:100%;
  overflow: auto;
}
</style>
