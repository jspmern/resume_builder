import { FETCH_DATA, LOADING } from "../Action/ActionConstant"

function authReducer(state,action)
{
      switch (action.type) {
        case LOADING:
            return {...state,loading:true,success:false}
            case FETCH_DATA:
            return {...state,loading:false,data:action.payload.data,success:action.payload.success}
            case Error:
            return {...state,loading:false,error:action.payload,success:action.payload.success}
            
      
        default:
             return state
      }
}
export default authReducer