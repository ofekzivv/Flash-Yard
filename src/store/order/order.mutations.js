export default {
    setOrderDetails: ((state, order) => {
    state.orderDetails = {...order}
    console.log(state.orderDetails)
  }),

  resetOrderDetails: ((state) => {
    for (const key in state.orderDetails) state.orderDetails[key] = '';
    if (state.orderDetails.id !== undefined) delete state.orderDetails.id;
  }),

}
