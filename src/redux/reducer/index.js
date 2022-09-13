import { combineReducers } from "redux"
import Auth from "./auth"
import { productReducer } from "./addProduct"


const rootReducers = combineReducers({
    auth: Auth,
    addProduct: productReducer
})


export default rootReducers