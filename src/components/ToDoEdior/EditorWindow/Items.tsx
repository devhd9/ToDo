import { useRef, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from 'react-redux';
import { changeOrder, setStateAction } from '../../../Redux/To-Do-List/ListAction';
import {inititalStateType} from'../../../Redux/To-Do-List/ListReducer'
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';

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
    const deleteHandler = (id:string) =>{
      axios.delete(`${process.env.REACT_APP_URL}/list/${id}`,{})
      .then((res)=>{
        if(res.status===200){
          dispatch(setStateAction(res.data))
        }
      })
      .catch(err=>{
        console.log(err);
        
      })
    }
    const updateHandler = (id:string,value:string) => {
      axios.put(`${process.env.REACT_APP_URL}/list/${id}`,{
        newName:value
      })
      .then((res)=>{
        if(res.status===200){
          dispatch(setStateAction(res.data))
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {!state?<></>:
              state.map((item:{Name:string,id:string,}, index:number) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                      <Item provided={provided} updateHandler={updateHandler} deleteHandler={deleteHandler} dispatch={dispatch} item={item} index={index} />
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
const Item = (props:any) =>{
  const {item,updateHandler,deleteHandler,provided} = props
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState(item.Name)
  const textAreaRef= useRef<HTMLTextAreaElement>(null)
  const changeHandler = (value:string) => {
    setValue(value)
  }
  const editOnClickHandler = (id:string) => {
    // If edit was true means save clicked
    let flag = false
    if(!value.trim()) flag=true
    if(edit){
      if(flag){
        deleteHandler(id)
        return
      }
      updateHandler(id,value)
    }
    textAreaRef.current?.focus()
    setEdit(!edit)
  }
  const buttonClassString = 'px-2 py-1 mx-1 mb-auto text-white rounded cursor-pointer border-2'
  const textAreaClassString = 'px-2 py-1 my-auto w-10/12 border rounded break-all shadow-lg'
  const editBtn = 'border-cyan-700 bg-cyan-600 hover:border-cyan-900 hover:bg-cyan-700'
  const deleteBtn = 'border-red-700 bg-red-600 hover:border-red-900 hover:bg-red-700'

  return(
    <div className='my-3' {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
      <div className='flex'>
      {edit?<TextareaAutosize ref={textAreaRef} minRows={1} maxRows={5} disabled={edit?false:true} onChange={(e)=>changeHandler(e.target.value)} className={`outline outline-cyan-400 ${textAreaClassString}`} value={value}/>:<ItemText textAreaClassString={textAreaClassString} text={value} /> }
      <span className='flex float-right'>
        <span onClick={()=>editOnClickHandler(item.id)} className={`${buttonClassString} ${editBtn}`}> {edit?'Save':'Edit'}</span>
        <span onClick={()=>deleteHandler(item.id)} className={`${buttonClassString} ${deleteBtn}`}>Delete</span>
      </span>
   </div>
  </div>
  )
}
const ItemText = (props:any) => {
  const {text,textAreaClassString} = props
  return(
<div className={`${textAreaClassString} border-cyan-600 bg-white max-h-32 overflow-scroll overflow-x-hidden`}>
  {/* Condtion to stop empty division collapse */}
  {!text?'   ':text}
</div>
  )
}
export default Items
