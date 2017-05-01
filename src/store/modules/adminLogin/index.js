import types from './adminLoginTypes'

const state = {
  auth: false
}

const getters = {
  [types.GetAuth]: (state) => state.auth
}
const actions = {
  [types.AuthLogin]({ commit, rootState }, { http, model }) {
    // http({
    //   method: 'post',
    //   url: `/api/Account/login`,
    //   data: model
    // }).then(model => {
    //   commit(types.AuthLogin, { model: model.data, rootState })
    // })
    commit(types.AuthLogin)
  }
}
const mutations = {
  /**
   * 驗證當前User是否登入
   * state.auth:是否登入
   */
  [types.AuthLogin](state, { model, rootState }) {
    // switch (model.statu) {
    //   case 'ok':
    //     rootState.antiKey = model.data
    //     state.auth = true
    //     break
    //   case 'err':
    //     alert(model.msg)
    //     break
    // }
    state.auth = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}