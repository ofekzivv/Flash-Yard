export default {
  setStateDisableWeekdays:(state , Weekdays)=> state.disableWeekdays=Weekdays,
  // setStateDisableWeekdays:(state , Weekdays)=> {debugger;state.disableWeekdays[0].weekdays=Weekdays},
  //setStateDisableWeekdays:(state , Weekdays)=> state.disableWeekdays=Weekdays,

  setStateDisableDays:(state , disableDays)=> state.disableDays = [...disableDays],

  setStateOrderedEvents:(state , orderedEvents)=> state.orderedEvents = [...orderedEvents],

  setDayToStateDisableDays:(state , dayObj)=> state.disableDays.push(dayObj),

  removeDayFromStateDisableDays:(state, day) => {
    const index = state.disableDays.findIndex(y => y.date === day)
    state.disableDays.splice(index, 1)
  },

  resetDisableWeekdays: ((state) => state.disableWeekdays = []),

  resetDisableDays: ((state) => state.disableDays = []),

  resetOrderedEvents: ((state) => state.orderedEvents = []),


}



