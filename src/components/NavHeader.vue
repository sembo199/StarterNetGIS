<template lang="html">
  <div class="">
    <b-navbar toggleable="md" type="dark">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">StarterNet</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/tool">Tool</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form>
            <b-form-input id="searchbar" size="sm" class="mr-sm-2" type="text" v-model="searchTerm" placeholder="Zoek een gemeente"/>
          </b-nav-form>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  <b-tooltip target="searchbar" placement="bottom">
    <strong>Let op:</strong> u zoekt binnen de criteria. Wilt u zoeken in alle gemeentes? Klik dan eerst op <strong>Reset</strong>.
  </b-tooltip>
  </div>
</template>

<script>
import store from '../store'

export default {
  data() {
    return {
      searchTerm: ''
    }
  },
  watch: {
    // Zoekterm in store moet gelijk zijn aan zoekterm in Header
    searchTerm: function (val) {
      store.state.searchTerm = val
    }
  },
  mounted: function () {
    // Als emptySearchTerm aangeroepen wordt, moet het zoekvak geleegd worden.
    this.$root.$on('emptySearchTerm', () => {
     this.searchTerm = ''
    })
  }
}
</script>
