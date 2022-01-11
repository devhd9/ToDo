import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from 'react-redux';
import { changeOrder, deleteItemActionType, updateItemActionType } from '../../../Redux/To-Do-List/ListAction';
import {inititalStateType} from'../../../Redux/To-Do-List/ListReducer'
import i from './Items.module.css'

const reorder = (list:inititalStateType, startIndex:number, endIndex:number):inititalStateType => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Items = () => {
  const state = useSelector((state:inititalStateType) => state)
  console.log(state)
  const dispatch = useDispatch()
    const onDragEnd= (result:any) =>{
      if (!result.destination) {
        return;
      }
      const items:inititalStateType = reorder(
        state,
        result.source.index,
        result.destination.index
      );
      dispatch(changeOrder(items))
    }
    const deleteHandler = (index:number) =>{
      dispatch(deleteItemActionType(index))
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {state.map((item:{Name:string,id:string,edit:boolean}, index:number) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                    className={i.todoItem+' my-2 py-1 px-2 bg-white'}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Edit dispatch={dispatch} item={item} index={index} />
                      <span onClick={()=>deleteHandler(index)} className={`btn btn-sm btn-danger mx-1 ${i.deleteButton}`}>Delete</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
}
const Edit = (props:any) =>{
  const {index,item,dispatch} = props
  const [edit, setEdit] = useState(false)
  const changeHandler = (value:string) => {
    dispatch(updateItemActionType(index,value))
  }
  return(
  <span>
  {item.edit? <input onChange={(e)=>changeHandler(e.target.value)} style={{width:'75%'}} value={item.Name}/>:item.Name }
  <span onClick={()=>{item.edit=!item.edit;setEdit(!edit)}} className={`btn btn-sm btn-primary mx-1 ${i.deleteButton}`}> {item.edit?'close':'Edit'}</span>
  </span>



  )

}
export default Items
