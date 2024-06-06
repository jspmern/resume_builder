import { useContext } from "react"
import { authContext } from "../context/AuthContext"

export let useAuth=()=>{
   return useContext(authContext)
}
 