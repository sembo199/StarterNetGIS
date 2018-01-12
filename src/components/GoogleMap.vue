<template lang="html">
  <div class="">
    <!-- NavHeader importeren voor navigatie -->
    <NavHeader></NavHeader>

    <!-- Linkerdeel van de pagina met criteria -->
    <div id="left-part">
      <!-- Opdeling van de criteria links en rechts -->
      <div id="inner-left-part">
        <div class="criteria-item">
          <!-- Criteria voor min. gem. koopprijs -->
          <h6>Minimaal gemiddelde koopprijs: <a @click="openInfoModal(1)"><i class="far fa-question-circle fa-2x"></i></a></h6>
          <b-form-slider v-model="checkGem" :min="minGem" :max="checkGemMax" :value="checkGem"/>
          <p>€ {{checkGem.toLocaleString()}},-</p>
        </div>
        <div class="criteria-item">
          <!-- Criteria voor max. gem. koopprijs -->
          <h6>Maximaal gemiddelde koopprijs: <a @click="openInfoModal(2)"><i class="far fa-question-circle fa-2x"></i></a></h6>
          <b-form-slider v-model="checkGemMax" :min="checkGem" :max="maxGem" :value="checkGemMax"/>
          <p>€ {{checkGemMax.toLocaleString()}},-</p>
        </div>
        <div class="criteria-item">
          <!-- Criteria voor percentage hoogopgeleiden -->
          <h6>Minimaal percentage hoogopgeleiden: <a @click="openInfoModal(3)"><i class="far fa-question-circle fa-2x"></i></a></h6>
          <b-form-slider v-model="checkHoger" :min="minHoger" :max="maxHoger" :value="checkHoger"/>
          <p>{{checkHoger}}%</p>
        </div>
      </div>
      <!-- Rechter deel van criteria -->
      <div id="inner-right-part">
        <div class="criteria-item">
          <!-- Criteria voor max. geregistreerde misdrijven per 1000 inwoners -->
          <h6>Max. criminaliteit per 1000 inw.: <a @click="openInfoModal(4)"><i class="far fa-question-circle fa-2x"></i></a></h6>
          <b-form-slider v-model="checkCrim" :min="minCrim" :max="maxCrim" :value="checkCrim"/>
          <p>{{checkCrim}} per 1000 inwoners</p>
        </div>
        <div class="criteria-item">
          <!-- Welke criteria heeft de hoogste prioriteit -->
          <h6>Hoogste prioriteit: <a @click="openInfoModal(5)"><i class="far fa-question-circle fa-2x"></i></a></h6>
          <b-form-select v-model="hoogstePrioriteit" :options="options" class="select">
          </b-form-select><br>
        </div>
        <div class="criteria-item reset-criteria">
          <!-- Reset alle criteria -->
          <h6>Reset naar alle gemeentes: <a @click="openInfoModal(6)"><i class="far fa-question-circle fa-2x"></i></a></h6>
          <button class="btn btn-primary resetbutton" @click="showAll">Reset</button>
        </div>
      </div>

      <!-- Modal voor de info over criteria  -->
      <b-modal ref="criteriaModal" centered hide-footer title="Info">
        <div class="d-block text-center">
          <p>{{infotext}}</p>
        </div>
      </b-modal>

      <!-- <b-table striped hover :items="$store.state.gemeentes" :fields="fields"></b-table> -->
      <div id="paginationlist">
        <b-pagination align="center" :total-rows="computedGemeentes.length" v-model="pagina" :per-page="aantalGemeenten">
        </b-pagination>
        <h2 v-if="computedGemeentes.length == 0" class="errormessage">{{errorMessage}}</h2>
        <ul v-else="" id="gemeentelijstul">
          <li id="gemeentelijst"
            v-for="(gemeente, index) in computedGemeentes"
            v-if="index >= (aantalGemeenten * (pagina - 1)) && index < ((aantalGemeenten * (pagina - 1)) + aantalGemeenten)">
            <div class="listitemleft">
              <div class="gemeenteindex">{{ index + 1 }}</div><h1 class="gemeentelisttitle">{{gemeente.Gemeentenaam}}</h1><br>
              Gem. koopprijs: <span class="light-text">(max. € {{maxGem.toLocaleString()}},-)</span><br>
              <b-progress height="25px" class="progress-item" :max="maxGem">
                <b-progress-bar :value="gemeente.GemiddeldeVerkoopprijs">
                  €&nbsp;<strong>{{ gemeente.GemiddeldeVerkoopprijs.toLocaleString() }},-</strong>
                </b-progress-bar>
              </b-progress>
              Hoogopgeleiden: <span class="light-text">(max. {{maxHoger}}%)</span><br>
              <span v-if="!gemeente.PercentageHoogopgeleiden"><b>Onbekend</b><br></span>
              <b-progress v-if="gemeente.PercentageHoogopgeleiden" variant="success" height="25px" class="progress-item" :max="maxHoger">
                <b-progress-bar :value="gemeente.PercentageHoogopgeleiden">
                  <strong>{{ gemeente.PercentageHoogopgeleiden }}%</strong>
                </b-progress-bar>
              </b-progress>
              Criminaliteit: <span class="light-text">(max. {{maxCrim}}/1000 inwoners)</span><br>
              <span v-if="!gemeente.GeregistreerdeMisdrijvenPer1000Inwoners"><b>Onbekend</b><br></span>
              <b-progress v-if="gemeente.GeregistreerdeMisdrijvenPer1000Inwoners" variant="danger" height="25px" class="progress-item" :max="maxCrim">
                <b-progress-bar :value="gemeente.GeregistreerdeMisdrijvenPer1000Inwoners">
                  <strong>{{ gemeente.GeregistreerdeMisdrijvenPer1000Inwoners }}</strong>
                </b-progress-bar>
              </b-progress>
            </div>
            <div class="listitemright">
              <!-- Laat de gemeente op de kaart zien -->
              <a @click="showCityOnMap(gemeente)"><i class="fas fa-map-marker fa-2x"></i></a><br>
              <!-- Toon de informatie over de gemeente -->
              <a @click="showCityInfo(gemeente)"><i class="fas fa-info-circle fa-2x"></i></a>
            </div>
          </li>
        </ul>
      </div>

      <!-- GemeenteModal -->
      <b-modal ref="gemeenteModal" centered hide-footer :title="clickedGemeente.Gemeentenaam">
        <div class="d-block text-left">
          <!-- Laat ten alle tijde de gem. koopprijs zien, die is overal bekend. -->
          <p>Binnen de gemeente {{clickedGemeente.Gemeentenaam}} zijn de volgende cijfers bekend:</p>
          <p>De gemiddelde koopprijs van huizen is berekend op <br>€ {{parseInt(clickedGemeente.GemiddeldeVerkoopprijs).toLocaleString()}},-</p>
          <!-- Als het percentage hoogopgeleiden bekend is: weergeef, anders laten zien dat deze ontbreekt. -->
          <p v-if="clickedGemeente.PercentageHoogopgeleiden">Onder de bevolking is {{clickedGemeente.PercentageHoogopgeleiden}}% hoogopgeleid, oftewel een HBO-diploma of hoger.</p>
          <p v-else="">Het percentage hoogopgeleiden van deze gemeente is onbekend.</p>
          <!-- Als het aantal misdrijven bekend is: weergeef, anders laten zien dat deze ontbreekt. -->
          <p v-if="clickedGemeente.GeregistreerdeMisdrijvenPer1000Inwoners">Gemiddeld heeft {{clickedGemeente.GeregistreerdeMisdrijvenPer1000Inwoners}} van de 1000 inwoners een strafbaar feit begaan.</p>
          <p v-else="">De hoeveelheid geregistreerde misdrijven per 1000 inwoners van deze gemeente is onbekend.</p>
        </div>
      </b-modal>
    </div>

    <!-- Vue2 Goole Maps inladen -->
    <gmap-map
      id="map"
      :center="center"
      :zoom="zoom"
      map-type-id="terrain"
      v-bind:options="mapStyle"
    >
      <!-- Markers inladen aan de hand van computedGemeentes -->
      <gmap-marker
        :key="index"
        v-for="(g, index) in computedGemeentes"
        v-if="index >= (aantalGemeenten * (pagina - 1)) && index < ((aantalGemeenten * (pagina - 1)) + aantalGemeenten)"
        :position="g.location"
        :clickable="true"
        :draggable="false"
        :icon="`../../src/assets/img/custom-icon.png`"
        @click="showCityOnMapAndInfo(g)"
        :label="`${index + 1}`"
      ></gmap-marker>
    </gmap-map>

  </div>
</template>

<script>
import { firebaseApp, gemeentesRef } from '../assets/js/firebaseApp'
import NavHeader from './NavHeader.vue'
import store from '../store'
import 'bootstrap-slider/dist/css/bootstrap-slider.css'

export default {
  data() {
    return {
      infotext: '',
      errorMessage: 'Ophalen van de gemeenten...',
      center: {
        lat: 52.156111,
        lng: 5.387827
      },
      zoom: 7,
      minGem: 127804,
      maxGem: 649703,
      checkGem: 127804,
      checkGemMax: 649703,
      minHoger: 10,
      maxHoger: 50,
      checkHoger: 10,
      minCrim: 19,
      maxCrim: 96.4,
      checkCrim: 96.4,
      clickedGemeente: {
        naam: ''
      },
      aantalGemeenten: 10,
      pagina: 1,
      hoogstePrioriteit: 1,
      options: [
        { value: '1', text: 'Gemiddelde koopprijs oplopend' },
        { value: '2', text: 'Gemiddelde koopprijs aflopend' },
        { value: '3', text: 'Percentage hoogopgeleiden' },
        { value: '4', text: 'Aantal misdrijven per 1000 inwoners' }
      ],
      mapStyle: {styles: [
                            {
                                "featureType": "all",
                                "elementType": "labels",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "landscape",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    },
                                    {
                                        "color": "#f3f4f4"
                                    }
                                ]
                            },
                            {
                                "featureType": "landscape.man_made",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "weight": 0.9
                                    },
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    },
                                    {
                                        "color": "#83cead"
                                    }
                                ]
                            },
                            {
                                "featureType": "road",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    },
                                    {
                                        "color": "#ffffff"
                                    }
                                ]
                            },
                            {
                                "featureType": "road",
                                "elementType": "labels",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    },
                                    {
                                        "color": "#fee379"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    },
                                    {
                                        "color": "#fee379"
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    },
                                    {
                                        "color": "#7fc8ed"
                                    }
                                ]
                            }
                        ]}
    }
  },
  methods: {
    openInfoModal(number) {
      // Info over de criteria-sliders.
      if(number == 1) {
        // Koopprijs
        this.infotext = 'Met deze slider kunt u instellen wat voor u de minimale gemiddelde koopprijs binnen de gemeente moet zijn. Het is het gemiddelde van alle verkochte huisprijzen binnen die gemeente genomen.'
        this.$refs.criteriaModal.show()
      } else if (number == 2) {
        // Maximale Koopprijs
        this.infotext = 'Met deze slider kunt u instellen wat voor u de maximale gemiddelde koopprijs binnen de gemeente moet zijn. Het is het gemiddelde van alle verkochte huisprijzen binnen die gemeente genomen.'
        this.$refs.criteriaModal.show()
      } else if (number == 3) {
        // Percentage Hoogopgeleiden
        this.infotext = 'Met deze slider kunt u instellen hoeveel procent van de bevolking van de betreffende gemeente hoogopgeleid (HBO of hoger) moet zijn.'
        this.$refs.criteriaModal.show()
      } else if (number == 4) {
        // Criminaliteit per 1000 inwoners
        this.infotext = 'Met deze slider kunt u instellen wat voor u de minimaal gewenste criminaliteitscijfers zijn per 1000 inwoners. 50 van de 1000 inwoners wil dus zeggen dat onder 1000 inwoners 50 mensen een strafbaar feit hebben gepleegd.'
        this.$refs.criteriaModal.show()
      } else if (number == 5) {
        // Criminaliteit per 1000 inwoners
        this.infotext = 'Met dit menu kunt u instellen in welke volgorde de resultaten aan u moeten worden getoond. De vier opties hierin zijn: gemiddelde koopprijs oplopend, gemiddelde koopprijs aflopend, percentage hoogopgeleiden en criminaliteit per 1000 inwoners.'
        this.$refs.criteriaModal.show()
      } else if (number == 6) {
        // Criminaliteit per 1000 inwoners
        this.infotext = 'Met deze knop kunt u alle criteria herstellen naar hun beginwaarde zodat alle gemeentes weer tevoorschijn komen. Dit kan bijvoorbeeld nodig zijn wanneer u op zoek wilt gaan naar een gemeente die niet aan de gestelde criteria voldoet.'
        this.$refs.criteriaModal.show()
      }
    },
    showCityInfo(gemeente) {
      // Laat info over gemeente zien als op info-knop gedrukt wordt.
      this.clickedGemeente = gemeente
      this.$refs.gemeenteModal.show()
    },
    showCityOnMap(gemeente) {
      // Zoom in op de kaart om te weten waar de gemeente ligt.
      this.center = gemeente.location
      this.zoom = 11
    },
    showCityOnMapAndInfo(gemeente) {
      // Zoom in op de kaart om te weten waar de gemeente ligt en laat info zien.
      this.showCityOnMap(gemeente)
      this.showCityInfo(gemeente)
    },
    compare(a,b) {
    // Functie voor het sorteren van de lijst op de hoogste prioriteit criteria.
      if (this.hoogstePrioriteit == 1) {
        // Prioriteit 1: Laagste koopprijs bovenaan
        if (a.GemiddeldeVerkoopprijs < b.GemiddeldeVerkoopprijs)
          return -1;
        if (a.GemiddeldeVerkoopprijs > b.GemiddeldeVerkoopprijs)
          return 1;
        return 0;
      } else if (this.hoogstePrioriteit == 2) {
        // Prioriteit 2: Hoogste koopprijs bovenaan
        if (a.GemiddeldeVerkoopprijs < b.GemiddeldeVerkoopprijs)
          return 1;
        if (a.GemiddeldeVerkoopprijs > b.GemiddeldeVerkoopprijs)
          return -1;
        return 0;
      } else if (this.hoogstePrioriteit == 3) {
        // Prioriteit 3: hoogste percentage hoogopgeleiden bovenaan
        if (a.PercentageHoogopgeleiden < b.PercentageHoogopgeleiden || !a.PercentageHoogopgeleiden)
          return 1;
        if (a.PercentageHoogopgeleiden > b.PercentageHoogopgeleiden || !b.PercentageHoogopgeleiden)
          return -1;
        return 0;
      } else if (this.hoogstePrioriteit == 4) {
        // Prioriteit 4: laagste criminaliteitscijfers bovenaan
        if (a.GeregistreerdeMisdrijvenPer1000Inwoners > b.GeregistreerdeMisdrijvenPer1000Inwoners || !a.GeregistreerdeMisdrijvenPer1000Inwoners)
          return 1;
        if (a.GeregistreerdeMisdrijvenPer1000Inwoners < b.GeregistreerdeMisdrijvenPer1000Inwoners || !b.GeregistreerdeMisdrijvenPer1000Inwoners)
          return -1;
        return 0;
      }
    },
    showAll() {
      // Alle minimum waarden terugzetten.
      this.checkGem = this.minGem
      this.checkGemMax = this.maxGem
      this.checkHoger = this.minHoger
      this.checkCrim = this.maxCrim
      this.hoogstePrioriteit = 1
      // SearchTerm in store moet weer naar ''
      store.state.searchTerm = ''
      // Emit emptySearchTerm() functie zodat de Zoekterm in de NavHeader geleegd kan worden
      this.$root.$emit('emptySearchTerm');
      // Zoom terug op 7 en centreren
      this.zoom = 7
      this.center = {
        lat: 52.156111,
        lng: 5.387827
      }
    }
  },
  mounted() {
    // Haal gemeentes op uit DB en listener wanneer nieuwe worden toegevoegd.
    gemeentesRef.on('value', snap => {
      let gemeentes = []
      snap.forEach(gemeente => {
        gemeentes.push(gemeente.val())
      })
      store.state.gemeentes = gemeentes
    })
  },
  computed: {
    computedGemeentes: function () {
      // Variabelen ophalen uit Vue Instantie
      var checkGem = this.checkGem
      var checkGemMax = this.checkGemMax
      var checkHoger = this.checkHoger
      var checkCrim = this.checkCrim
      var checkedwithoutorder = store.state.gemeentes.filter(function(item) {
          // Voldoet de gemeente aan de gestelde waarden?
          if (item.GemiddeldeVerkoopprijs >= checkGem &&
              item.GemiddeldeVerkoopprijs <= checkGemMax &&
             (item.PercentageHoogopgeleiden >= checkHoger ||
              item.PercentageHoogopgeleiden == undefined) &&
              item.Gemeentenaam.toLowerCase().includes(store.state.searchTerm.toLowerCase()) &&
              (item.GeregistreerdeMisdrijvenPer1000Inwoners <= checkCrim ||
              item.GeregistreerdeMisdrijvenPer1000Inwoners == undefined)) {
            return item
          }
      })

      // Als de lijst leeg is, verander de errorMessage naar "Geen resultaten"
      if(checkedwithoutorder.length != 0) {
        this.errorMessage = 'Er zijn geen gemeentes die voldoen aan de opgegeven criteria.'
      }

      // Hier de code voor het uitzoomen en centreren van de kaart wanneer er gesleept/geklikt is
      this.zoom = 7
      this.center = {
        lat: 52.156111,
        lng: 5.387827
      }
      // Stuur een gecontroleerde, gesorteerde lijst terug.
      return checkedwithoutorder.sort(this.compare);
    }
  },
  components: {
    NavHeader
  }
}
</script>
