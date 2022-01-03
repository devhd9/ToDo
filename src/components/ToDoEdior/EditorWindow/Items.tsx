import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const items = [
    {Name:'Het',id:'0'},{Name:'Vinod',id:'1'}
]
const Items = () => {
    const onDragEnd = () =>{
        console.log('On Drag End')
    }
    const getListStyle = (isDraggingOver:any) => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        // padding: grid,
        width: 250
      });
    return (
        <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                    className='my-1 py-1 px-2 bg-secondary'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    //   style={getItemStyle(
                    //     snapshot.isDragging,
                    //     provided.draggableProps.style
                    //   )}
                    >
                      {item.Name}
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

export default Items
