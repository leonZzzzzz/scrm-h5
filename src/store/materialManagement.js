export default {
    namespaced: true,
    state: {
        userId: "",
        customerId: ""
    },
    mutations: {
        setUserId(state, id) {
            state.userId = id
        },
        setCustomerId(state, id) {
            state.CustomerId = id
        }

    }
}