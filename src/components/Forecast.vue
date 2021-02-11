<template>
  <div class="forecast panel-primary">
    <div class="row">
      <div class="col-sm-6 offset-sm-3">
        <div class="card bg-light">
          <form ref="form" class="form-inline my-2 my-lg-5 justify-content-center">
            <input v-model="locale" class="form-control mr-sm-2" type="text" placeholder="Procurar local">
            <button class="btn btn-info my-2 my-sm-0" v-on:click="getForecast" type="button">
              <i class="fas fa-search"></i>
            </button>
          </form>
          {{data}}
          <div class="col-sm-6 offset-3 mb-5" v-if="loading">
            <div class="spinner-border text-info" role="status">
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
  props: ['currencyName'],
  data() {
    return {
      locale: '',
      data: null,
      loading: false
    }
  },
  metaInfo() {
    return {
      title: "Previsão do tempo",
      meta: [
        { name: 'description', content:  'Epiloge is about connecting in your field of interest. Our vision is to help people share their knowledge, work, projects, papers and ideas and build their network through what they do rather where they live, study or work.'},
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
        this.data = result.data;
        this.loading = false;
      })
    }
  }
}
</script>
