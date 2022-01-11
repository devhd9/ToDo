
import {inititalStateType} from'./ListReducer'
import { Add_Item, Change_Order, Delete_Item, Update_Item } from './orderType'

export type changeOrderReturnType = {type:string,newOrder:inititalStateType}

export const changeOrder = (newOrder:inititalStateType):changeOrderReturnType => { 
    return{
        type:Change_Order ,
        newOrder:newOrder
    }
}

export type addNewItemReturn = {type:string,Name:string}

export const addNewItemActionType = (Name:string):addNewItemReturn => {
    return{
        type:Add_Item,
        Name:Name
    }
}

export type updateItemReturnType = {type:string,Index:number,Value:string}

export const updateItemActionType = (Index:number,Value:string):updateItemReturnType => {
    return{
        type:Update_Item,
        Index:Index,
        Value:Value
    }
}

export type deleteItemReturnType = {type:string,Index:number}

export const deleteItemActionType = (Index:number):deleteItemReturnType => {
    return{
        type:Delete_Item,
        Index:Index
    }
}


// export const addItem = ()