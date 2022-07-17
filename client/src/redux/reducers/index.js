import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import profile from './userReducer'
import modal from './modalReducer'
import categorys from './categoryReducer'
import categoryModal from './categoryModalReducer'
import allproducts from './productReducer'
import productModal from './productModal'
import cart from './cartReducer'
import order from './orderReducer'
import generic from './genericReducer'
import myOrders from './myOrder'
import allProduct from './allProduct'
import modalAdmin from './modalAdmin'
import detailOrder from './detailOrder'
export default combineReducers({
  auth,
  alert,
  profile,
  modal,
  categorys,
  categoryModal,
  allproducts,
  productModal,
  cart, order,
  generic,
  myOrders,
  allProduct,
  modalAdmin,
  detailOrder
})