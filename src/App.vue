<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-info fixed-top">
      <img src="./assets/logo.png" heigth="40" width="40"/>
      <a class="navbar-brand ml-3" href="#">Previsão do tempo</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse"
        data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>
    <Forecast/>
  </div>
</template>

<script>
import Forecast from './components/Forecast.vue'

export default {
  name: 'App',
  components: {
    Forecast
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
