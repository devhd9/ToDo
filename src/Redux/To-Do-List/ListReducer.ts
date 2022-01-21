import { Change_Order, Set_State } from "./orderType"

export type inititalStateType = {Name:string,id:string}[]

// ! find solution for this force conversion | Don't want to use force conversion
const initialState:inititalStateType|null =  null


// todo: Union of types not working. If its not the convention then what to do ?
// type allType = changeOrderReturnType|addNewItemReturn;
export const ToDoListReducer = (state:any=initialState,action:any):inititalStateType =>{
    console.log(action.type)
    switch(action.type){
        case Set_State: 
         return[
            ...action.arr
        ]
        case Change_Order:
        return[
            ...action.newOrder
        ];
        default : return state
    }
}
