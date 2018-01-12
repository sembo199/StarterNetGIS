import * as types from './mutation-types.js'

export const getGemeentes = ({commit}, payload) => {
  commit(types.GET_GEMEENTES, payload)
}
