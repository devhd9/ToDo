import { Add_Item, Change_Order, Delete_Item, Update_Item } from "./orderType"
import {addNewItemReturn, changeOrderReturnType} from'./ListAction'

export type inititalStateType = {Name:string,id:string,edit:boolean}[]

const inititalState:inititalStateType = [
    {Name:'Fix bugs in frontend',id:'0',edit:false},{Name:'Watering plants',id:'1',edit:false},{Name:'Book Reading',id:'2',edit:false}
]
// todo: Union of types not working. If its not the convention then what to do ?
// type allType = changeOrderReturnType|addNewItemReturn;
export const ToDoListReducer = (state:inititalStateType=inititalState,action:any):inititalStateType =>{
    console.log(action.type)
    switch(action.type){
        case Change_Order:return[
            ...action.newOrder
        ];
        case Add_Item:return[
            ...state,
            {Name:action.Name,id:(state.length.toString()),edit:false}
        ]
        case Update_Item:
            state[action.Index].Name = action.Value
            return[
                ...state
            ]
        case Delete_Item:
            console.log(action.Index)
        state.splice(action.Index,1)
        return[
            ...state
        ]
        default : return state
    }
}

// export const addNewItemReducer = (state:inititalStateType=inititalState,action:addNewItemReturn):inititalStateType=>{
//     console.log(action.Name)
//     console.log(state)
//     switch(action.type){
//         default : return state
//     }
// }

