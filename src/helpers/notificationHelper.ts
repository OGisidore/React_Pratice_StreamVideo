import { Notification } from "../models/Notification"



export const initNotification = (dispatch :(data:any)=>void,type:any, message : string,status : string="success", timeout : number=2000)=>{
let notification : Notification = {
    _id : (Math.random()*8547964).toString(),
    message:message,
    status:status,
    timeout:timeout

}
dispatch({
    type:type,
    payload:notification,
})
}