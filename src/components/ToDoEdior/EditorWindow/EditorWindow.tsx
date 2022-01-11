import React, { KeyboardEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewItemActionType } from '../../../Redux/To-Do-List/ListAction'
import Items from './Items'

const EditorWindow = () => {
    return (
        <section className='container my-auto' >
            <div className='row'>
                <div style={{backgroundColor:'#e3e3e3', outline:'2px solid grey'}} className='col-10 col-md-8 mx-auto p-md-3 p-0'>
                    <h5 className='text-center'>To-Do List</h5>
                    <div className='w-100'>
                        <Items />
                    </div>
                    <div>
                       <NewItem />
                    </div>
                    <div className='text-center'>
                    </div>
                </div>
            </div>
        </section>
    )
}

const NewItem = ()=>{
    const dispatch = useDispatch()
    const [newItem, setNewItem] = useState('')
    const handleKeyPress = (e:KeyboardEvent) => {
        if(e.key=='Enter'){
            onClickHandler()
        }
    }
    const onClickHandler = () => {
        // If string isnot whitespaces then only add to the store
        if(newItem.trim()) dispatch(addNewItemActionType(newItem));
        setNewItem('')
    }
    return(
        <>
            <input onKeyPress={(e)=>handleKeyPress(e)} value={newItem} onChange={(e)=>setNewItem(e.target.value)} placeholder='new item...' className='my-2 py-1 px-2 bg-white w-75 me-0' />
            <button onClick={onClickHandler} className='my-2 text-white py-1 px-2 bg-secondary'>Add Item</button>
        </>
    )
}

export default EditorWindow
