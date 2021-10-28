import state from "./test.state"
import FS from '../../middleware/firestore'

export default {
  setDisableWeekdays: async ({commit}, objDays) => {
    commit('setStateDisableWeekdays', objDays)
  },
  setDisableDays: async ({commit}, arr) => {
    commit('setStateDisableDays', arr)
  },
  setDayToDisableDays: async ({commit}, dayObj) => {
    commit('setDayToStateDisableDays', dayObj)
  },
  removeDayFromDisableDays: async ({commit}, day) => {
    commit('removeDayFromStateDisableDays', day)
  },
  setDisableWeekdaysChefInBD: (async ({state, commit}) => {
    const option = {
      id: window.user.uid,
      item: {weekdays: state.disableWeekdays.weekdays}
    }
    await FS.users.setDisableWeekdaysChef(option)
  }),
  getDisableWeekdaysChefFromBD: async ({state, commit}, id) => {
    const disableWeekdays = await FS.users.getDisableWeekdaysChef(id)
      if (disableWeekdays != null) commit('setStateDisableWeekdays', disableWeekdays)
  },
  setDisableDaysChefInBD: (async ({state, commit}) => {
    const option = {
      id: window.user.uid,
      item: {disableDays: state.disableDays}
    }
    await FS.users.setDisableDaysChef(option)
  }),
  getDisableDaysChefFromBD: async ({state, commit}, id) => {
    const disableDays = await FS.users.getDisableDaysChef(id)
    if (disableDays != null) commit('setStateDisableDays', disableDays.disableDays)
  },
  getYardOrdersFromBD: async ({state, commit}, id) => {
    const orderedEvents = await FS.yards.getIdOrderFromYardOrders(id);
    console.log(orderedEvents, 'orderedEvents')
    if (orderedEvents != null) commit('setStateOrderedEvents', orderedEvents)
  },
}


