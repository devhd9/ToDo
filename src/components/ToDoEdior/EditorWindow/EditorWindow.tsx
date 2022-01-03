import React from 'react'
import Items from './Items'

const EditorWindow = () => {
    return (
        <section className='container' >
            <div className='row'>
                <div className='col-10 col-md-8 mx-auto bg-info'>
                    <h5 className='text-center'>To-Do List</h5>
                    <div className='w-100'>
                        <Items />
                    </div>
                    <div className='text-center'>
                        <button className='bg-primary btn btn-md'>Add Item</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditorWindow
