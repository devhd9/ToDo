import { combineReducers, createStore } from "redux";
import { ToDoListReducer} from "./ListReducer";


export const store = createStore(ToDoListReducer)