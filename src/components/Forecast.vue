<template>
  <div class="forecast panel-primary">
    <div class="row">
      <div class="col-sm-6 offset-sm-3">
        <div class="card bg-info">
          <form ref="form" class="form-inline my-2 my-lg-5 justify-content-center"
            v-on:submit.prevent="getForecast">
            <input v-model="locale" class="form-control mr-sm-2" type="text"
              placeholder="Procurar local">
            <button class="btn btn-info my-2 my-sm-0" v-on:click="getForecast" type="button">
              <i class="fas fa-search"></i>
            </button>
          </form>
          <div class="card bg-info" v-show="Object.keys(current).length > 0">
            <div class="container ml-5 mt-4 mb-2">
              <div class="row">
                <span class="text-white">TEMPO ATUAL</span>
              </div>
              <div class="row" v-on:if="current">
                <div class="block">
                  <span>{{ timeWithZero(new Date(current.dt).getHours()) }}:</span>
                  <span>{{ timeWithZero(new Date(current.dt).getMinutes()) }}</span>
                </div>
                <div>
                  <img v-show="iconCurrent !== ''" :src='iconCurrent' width="120" height="120">
                  <span class="text-white h1">{{Math.round(current.temp)}}°</span>
                  <div class="row ml-4" v-on:if="current">
                    <span class="text-white">
                      {{capitalize(currentWeather.description)}}
                    </span>
                  </div>
                </div>
                <div class="col-8 ml-3">
                  <table class="table table-bordered text-left">
                    <tbody>
                      <tr>
                        <td><span class="text-white">Humidade: {{current.humidity}}%</span></td>
                        <td>
                          <span class="text-white">
                            Sensação térmica: {{Math.round(current.feels_like)}}°
                          </span>
                        </td>
                        <td>
                          <span class="text-white">
                            Visibilidade: {{Math.round((current.visibility * 1.60934) / 1000)}} Km
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span class="text-white">
                            Vento: {{Math.round(current.wind_speed * 3.6)}} Km/h
                          </span>
                        </td>
                        <td>
                          <span class="text-white">
                            Direção do vento: {{degToCompass(current.wind_deg)}}
                          </span>
                        </td>
                        <td><span class="text-white">Pressão: {{current.pressure}} mb</span></td>
                      </tr>
                      <tr>
                        <td>
                          <span class="text-white">
                            <span>Nascer do sol: </span>
                            <span>{{ timeWithZero(new Date(current.sunrise).getHours()) }}:</span>
                            <span>{{ timeWithZero(new Date(current.sunrise).getMinutes()) }}</span>
                          </span>
                        </td>
                        <td>
                          <span class="text-white">
                            <span>Pôr do sol: </span>
                            <span>{{ timeWithZero(new Date(current.sunset).getHours()) }}:</span>
                            <span>{{ timeWithZero(new Date(current.sunset).getMinutes()) }}</span>
                          </span>
                        </td>
                        <td>
                          <span class="text-white">
                            Ponto de orvalho: {{Math.round(current.dew_point)}}°
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 offset-3 mb-5 mt-5" v-if="loading">
            <div class="spinner-border text-white" role="status">
              <span class="sr-only"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Forecast',
  props: [],
  data() {
    return {
      locale: '',
      forecasts: {},
      current: {},
      currentWeather: {},
      iconCurrent: '',
      loading: false
    }
  },
  metaInfo() {
    return {
      title: "Previsão do tempo",
      meta: [
        { name: 'description', content: ''},
        { property: 'og:title', content: "Epiloge - Build your network in your field of interest"},
        { property: 'og:site_name', content: 'Epiloge'},
        {property: 'og:type', content: 'website'},
        {name: 'robots', content: 'index,follow'}
      ]
    }
  },
  methods: {
    getForecast() {
      this.$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      this.loading = true;
      this.$http.get("forecast/search.json?locale="+this.locale).then((result) => {
        this.iconCurrent = result.data["current"]["weather"][0]["icon_uri"]
        this.current = result.data.current;
        this.currentWeather = result.data.current.weather[0];
        this.forecasts = result.data.daily;
        this.loading = false;
      })
    },
    timeWithZero(dt) {
      return (dt < 10 ? '0' : '') + dt;
    },
    degToCompass(num) {
      var val = Math.floor((num / 22.5) + 0.5);
      var arr = ["N", "NNL", "NL", "LNL", "L", "LSL", "SL", "SSL", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"];
      return arr[(val % 16)];
    },
    capitalize(string){
      if(!string) return;
      return string[0].toUpperCase() + string.slice(1);
    }
  }
}
</script>
