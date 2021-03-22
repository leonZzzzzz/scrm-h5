export default {
  namespaced: true,
  state: {
    customerCluePageData: null
  },
  mutations: {
    updateCustomerCluePageData(state, data) {
      state.customerCluePageData = data
    }
  }
}