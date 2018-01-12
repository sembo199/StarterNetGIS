import * as types from './mutation-types.js'

export const mutations = {
  [types.GET_GEMEENTES] (state, payload) {
    state.gemeentes = payload
  }
}
