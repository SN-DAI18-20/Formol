import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Section from './section';

const useStyle = makeStyles({
    paperPadding: {
        padding:15,
        display:'flex',
        justifyContent:'center'
    },
    buttonPadding: {
        padding: 15
    }
})

export default () => {

    const { paperPadding, buttonPadding } = useStyle();

    const [sections, setSections] = React.useState([]);
    const [id, setId] = React.useState(0);
    const [canAddSection, setCanAddSection] = React.useState(true);

    const addSection = () => {
        setSections([...sections, { id:`section${id}`, Section}])
        setId(id+1)
    }

    const deleteSection = (SectionID) => {
        setSections(sections.filter(section => {
            return section.id !== SectionID.id
        }))
    }

    const toggleShowAddSection = () => {
        setCanAddSection(!canAddSection)
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }

    const onDragEnd = (result) => {
        if(!result.destination){
            return
        }
        if(!result.destination.index === result.source.index){
            return
        }

        setSections(reorder(
            sections,
            result.source.index,
            result.destination.index
        ))
        toggleShowAddSection()
    }

    return (
            <div>
                <DragDropContext onDragStart={toggleShowAddSection} onDragEnd={onDragEnd}>
                    <Droppable droppableId="sections">
                        {provided => (
                            <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            >
                                {sections.map(({Section, id}, index) => {
                                    console.log(id);
                                    return (
                                        <Draggable draggableId={id} key={id} index={index}>
                                        {provided=>(
                                                <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                key={id}
                                                >
                                        <Section
                                            deleteSection={() => deleteSection({id, Section})}/>
                                    </div>
                                    )
                                }
                                </Draggable>
                                )
                            })}
                            </div>
                            )
                        }
                    </Droppable>
                </DragDropContext>
                    {canAddSection && <Paper elevation={4} className={paperPadding}>
                        <Button onClick={addSection} className={buttonPadding}>Ajouter une section</Button>
                    </Paper>}
            </div>
    )
}