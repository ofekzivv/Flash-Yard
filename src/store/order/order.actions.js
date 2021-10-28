import FS from '../../middleware/firestore'
import yard from '../yards/yards.state'
import test from '../test/test.state'


export default {
  createOrder: async ({state, commit}, option) => {
    const order = {
      notes: option.notes,
      numOfPeople: option.numOfPeople,
      date: option.date,
      uidClient: window.user.uid,
      uidChef: yard.editedYard.uidChef,
      uidYard: yard.editedYardId,
      pricePerHead: yard.editedYard.pricePerHead,
      totalPrice: yard.editedYard.pricePerHead * option.numOfPeople,
      email:'dlevy28@gmail.com',
      payment:false,
      creationTime:new Date(),
    }
    console.log(order, 'orderrrrrr')
    await commit('setOrderDetails', order)
  },
  createOrderInDB: async ({state}) => {
    const orderId = await FS.orders.createOrder(state.orderDetails)
    await FS.yards.addIdOrderToYardOrders({idYard:state.orderDetails.uidYard,data:{idOrder: orderId,date:state.orderDetails.date}})
    return orderId
  },
  getOrderAndUserById:(async ({state, commit},id)=>{
        const order=await FS.orders.getOrderById(id)
    const user=await FS.users.getUserById(order.uidClient)
    const OrderAndUser={...user,...order}
    console.log(OrderAndUser,'OrderAndUser')
    return OrderAndUser
  }),
  CheckingOrderWithDB: async ({state, commit}) => {
    //הפונקציה מחזירה TRUE ו FALSE
    //TRUE מסמל שכל הבדיקות תקינות
    //FALSE מסמל שנכשלנו באחת הבדיקות
    //בביצוע הבדיקה אם התשובה חיובית הפונקציה תחזיר FALSE כלומר נכשלנו בבדיקה

    //check dateOrder
    const orderDate = state.orderDetails.date
    console.log(orderDate, 'orderDate')
    const disableDaysChef = await FS.users.getDisableDaysChef(state.orderDetails.uidChef)
    console.log(disableDaysChef, 'disableDaysChef')
    if (disableDaysChef.disableDays.length && disableDaysChef.disableDays.find(day =>
      day.date === orderDate)) {
      // אם התנאי נכון תאריך ההזמנה קיים בדטה בייס כלומר השף לא יכול לעבוד בתאריך זה
      console.log('false', 'check dateOrder')
      return false
    } else {
      console.log('true', 'check dateOrder')
    }

    //check dayOrder
    const numDayOrderDate = _stringDateToNumDay(orderDate)
    console.log(numDayOrderDate, 'numDayOrderDate')
    const disableWeekdaysChef = await FS.users.getDisableWeekdaysChef(state.orderDetails.uidChef)
    console.log(disableWeekdaysChef, 'disableWeekdaysChef')
    if (disableWeekdaysChef.weekdays.length && disableWeekdaysChef.weekdays.find(numDay =>
      numDay === numDayOrderDate)) {
      // אם התנאי נכון יום ההזמנה קיים בדטה בייס כלומר השף לא יכול לעבוד בתאריך זה
      console.log('false', 'check dayOrder')
      return false
    } else {
      console.log('true', 'check dayOrder')
    }

    //check numPeopleOrder
    const yard = await FS.yards.getYardById(state.orderDetails.uidYard)
    const peopleRange = yard.peopleRange
    console.log(peopleRange, 'peopleRange')
    if (state.orderDetails.numOfPeople > peopleRange.max || state.orderDetails.numOfPeople < peopleRange.min || !state.orderDetails.numOfPeople) {
      // אם התנאי נכון כמות המוזמנים אינה תקינה
      console.log('false', 'check numPeopleOrder')
      return false
    } else {
      console.log('true', 'check numPeopleOrder')
    }
    //אם לא נכשלנו באף בדיקה הפונקציה מחזירה TRUE
    console.log('true', 'CheckingOrderWithDB return true')
    //await FS.addIdOrder(state.orderDetails)
    return true
  },
}




function _stringToDate(string) {
  let day = parseInt(string.split("/")[2])
  let month = parseInt(string.split("/")[1]) - 1
  let year = parseInt(string.split("/")[0])
  return new Date(year, month, day)
}
function _dateToString(date) {
  const YYYY = date.getFullYear()
  const MM = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)))
  const DD = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()))
  return YYYY + '/' + MM + '/' + DD
}
function _isTheStringDateInTheArray(stringDate, arr) {
  let inArr = false
  if (arr !== []) for (const element of arr) (element.date === stringDate) ? inArr = true : null
  return inArr
}
function _isTheNumDayInDisableWeekdays(numDay, arr) {
  let inArr = false
  if (arr !== []) for (const element of arr) (element === numDay) ? inArr = true : null
  return inArr
}
function _stringDateToNumDay(stringDate) {
  return _stringToDate(stringDate).getDay() + 1
}
