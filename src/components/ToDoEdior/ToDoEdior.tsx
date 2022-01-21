import axios from 'axios'
import React from 'react'
import { Provider} from 'react-redux'
import { store } from '../../Redux/To-Do-List/ListStore'
import EditorWindow from './EditorWindow/EditorWindow'


export default function ToDoEdior() {
    
    return (
        <Provider store={store}>
            <EditorWindow />
        </Provider>
    )
}
