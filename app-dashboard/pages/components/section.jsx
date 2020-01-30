import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import Create from '@material-ui/icons/Create';

import Question from './question';

const useStyle = makeStyles({
    paperStyle:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        margin: '20px 0px'
    },
    option:{
        display: 'flex',
        justifyContent: 'space-between'
    },
    segmentTitle:{
        overflowX: 'auto',
        overflowY: 'hidden',
        marginBottom: '10px',
    },
    title:{
        display:'flex',
        flexDirection:'row'
    }
})

export default ({deleteSection, sectionId, index, provided}) => {
    const { paperStyle, option } = useStyle();

    const [id, setId] = React.useState(1);
    const [ChoosedQuestions, setChoosedQuestions] = React.useState([{ id:`question${0}`, Question}]);

    const addQuestion = () => {
        setId(id+1)
        setChoosedQuestions([...ChoosedQuestions, { id:`question${id}`, Question}])
    }

    const deleteQuestion = (QuestionID) => {
        setChoosedQuestions(ChoosedQuestions.filter(({id}) => {
            return id !== QuestionID
        }))
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

        setChoosedQuestions(reorder(
            ChoosedQuestions,
            result.source.index,
            result.destination.index
        ))
    }

    return (
            <div>
            <DragDropContext
                onDragEnd={onDragEnd}>
                <Droppable droppableId="questions">
                {(provided) => (
                    <Card
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    elevation={4}
                    className={paperStyle}>
                <CardContent>
                    <InputTitle/>
                {
                    ChoosedQuestions.map((choosedQuestion, index) => {
                        return (
                            <Draggable draggableId={choosedQuestion.id} key={choosedQuestion.id} index={index}>
                                {provided => (
                                    <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}>
                                        <Question deleteQuestion={() => deleteQuestion(choosedQuestion.id)} />
                                    </div>
                                )}
                            </Draggable>
                            )
                        })
                    }
                </CardContent>
                {provided.placeholder}
                <CardActions>
                <div className={option}>
                    <Button color='primary' onClick={addQuestion}> add </Button>
                    <Button color='secondary' onClick={() => deleteSection()}>del</Button>
                </div>
                </CardActions>
            </Card>
            )}
            </Droppable>
        </DragDropContext>
        </div>
    )
}

const InputTitle = () => {

    const { segmentTitle, title } = useStyle();

    const [input, setInput] = React.useState(false);
    const [segmentName, setSegmentName] = React.useState("Segment");

    return (
        <div className={title}>
            <div className={segmentTitle}>
            {
                input
                ? (
                    <TextField
                    onBlur={({ target }) => {
                        setSegmentName(target.value)
                        setInput(false)
                    }}
                    onChange={({target}) => setSegmentName(target.value)}
                    defaultValue={segmentName}
                    onKeyDown={key => key.keyCode === 13 && setInput(false)}
                    />
                    )
                    : (
                    <Typography variant='h4' children={segmentName} />
                )
            }
            </div>
            <Button onClick={() => setInput(!input)}>
                <Create/>
            </Button>
        </div>
    )
}