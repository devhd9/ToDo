import React, { KeyboardEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setStateAction } from '../../../Redux/To-Do-List/ListAction'
import Items from './Items'
import e from './EditorWindow.module.css'
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios'
import { inititalStateType } from '../../../Redux/To-Do-List/ListReducer'

const EditorWindow = () => {
    const dispatch = useDispatch()
    const state = useSelector((state:inititalStateType)=>state)
    const getListCallHandler = () => {
        axios.get(`${process.env.REACT_APP_URL}/list`)
            .then((res:any):void=>{
            dispatch(setStateAction(res.data))
    })
    .catch((err:any):void=>{
        console.log(err.message)
    })
    }
    
    return (
        <section className={`shadow-inner columns-1 py-2 bg-zinc-200 w-3/5 outline outline-2 mx-auto my-auto px-5 ${e.mainSection}`} >
            {state===null? getListCallHandler():null}
            <div className='row'>
                <div className=''>
                    <p className='text-center'> <strong className='text-fuchsia-900'>Create Your To-Do List !!</strong> </p>
                    <div className='w-100'>
                        <Items />
                    </div>
                       <NewItem />
                </div>
            </div>
        </section>
    )
}

const NewItem = ()=>{
    const dispatch = useDispatch()
    const [newItem, setNewItem] = useState('')
    const handleKeyPress = (e:KeyboardEvent) => {
        if(e.key==='Enter'){
            onClickHandler()
        }
    }
    const onClickHandler = () => {
        // If string isnot whitespaces then only add to the store
        if(newItem.trim()){
           try{
               axios.post(`${process.env.REACT_APP_URL}/list`,{itemName: newItem})
               .then(res=>{
                   if(res.status===201){
                       try{dispatch(setStateAction(res.data))}
                       catch(e:any){
                           console.log('here');
                           console.log(e.message);
                           
                       }
                    }
                })
            }
            catch(e:any){
                    console.log(e.message)
            } 
        }
        setNewItem('')
    }
    return(
    <>
            <TextareaAutosize minRows={newItem===''?2:1} onKeyPress={(e)=>handleKeyPress(e)} value={newItem} onChange={(e)=>setNewItem(e.target.value)} placeholder='new item...' className={`w-7/12 w-full drop-shadow-md outline-fuchsia-200 focus:outline-fuchsia-600 outline-2 outline px-2 py-1 mt-4 block rounded ${e.inputField}`} />
            <button onClick={onClickHandler} className='hover:bg-fuchsia-700 hover:border-fuchsia-900 my-2 text-white py-1 px-2 bg-fuchsia-600 border-2 border-fuchsia-700 inline-block rounded-md drop-shadow-lg'>Add Item</button>
    </>
    )
}

export default EditorWindow
