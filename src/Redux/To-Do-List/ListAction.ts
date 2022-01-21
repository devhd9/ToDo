import {inititalStateType} from'./ListReducer'
import { Change_Order, Set_State } from './orderType'



export type setStateReturnType = {type:string,arr:inititalStateType}

export const setStateAction = (arr:inititalStateType):setStateReturnType => { 
    return{
        type:Set_State ,
        arr:arr
    }
}

export type changeOrderReturnType = {type:string,newOrder:inititalStateType}

export const changeOrder = (newOrder:inititalStateType):changeOrderReturnType => { 
    return{
        type:Change_Order ,
        newOrder:newOrder
    }
}


