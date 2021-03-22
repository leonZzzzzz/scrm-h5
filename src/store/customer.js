export default {
    namespaced: true,
    state: {
        customerList: []
    },
    mutations: {
        setCustomerList(state, arr) {
            state.customerList = arr
            console.log('设置成功', state.customerList);
        }

    }
}