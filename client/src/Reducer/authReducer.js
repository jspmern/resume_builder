import { FETCH_DATA, LOADING } from "../Action/ActionConstant"

function authReducer(state,action)
{
      switch (action.type) {
        case LOADING:
            return {...state,loading:true}
            case FETCH_DATA:
            return {...state,loading:false,data:action.payload}
            case Error:
            return {...state,loading:false,error:action.payload}
            
      
        default:
             return state
      }
}
export default authReducer