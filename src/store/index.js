import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations.js'
import * as actions from './actions.js'

Vue.use(Vuex)

const state = {
  gemeentes: [],
  searchTerm: ''
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
