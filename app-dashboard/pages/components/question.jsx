import React from 'react';

import { makeStyles } from '@material-ui/core/styles';



import Text from './input-type/text';
import Number from './input-type/number';
import CheckBox from './input-type/checkbox';
import Radio from './input-type/radio';
import Range from './input-type/range';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Create from '@material-ui/icons/Create';


const useStyle = makeStyles({
    questionsChoice:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-evenly',
        marginBottom: '10px'
    },
    card: {
        margin:'20px 0px'
    },
    questionTitleStyle:{
        display:'flex',
        direction:'row'
    },
    header: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between'
    }
})

export default ({ deleteQuestion }) => {

    const { selectionSection, header } = useStyle();

    const [ChoosedQuestion, setChoosedQuestion] = React.useState(Text);
    const [selected, setSelected] = React.useState("Text");

    const chooseAQuestion = (choosed) => {
        switch (choosed) {
            case "Number":
                setChoosedQuestion(Number)
                break;
            case "Text":
                setChoosedQuestion(Text)
                break;
            case "CheckBox":
                setChoosedQuestion(CheckBox)
                break;
            case "Range":
                setChoosedQuestion(Range)
                break;
            case "Radio":
                setChoosedQuestion(Radio)
                break;
            default:
                break;
        }
    }

    const handleSelect = (selectedValue) => {
      console.log(selectedValue)
        setSelected(selectedValue)
        chooseAQuestion(selectedValue)
    }

    return (
                <Card elevation={8}>
                <CardContent>
                    <div className={header}>
                        <QuestionTitle/>
                      <FormControl>
                        <Select
                          value={selected}
                          onChange={({target}) => handleSelect(target.value)}
                        >
                          <MenuItem value="Text" children="Text" />
                          <MenuItem value="Number" children="Number" />
                          <MenuItem value="CheckBox" children="CheckBox" />
                          <MenuItem value="Radio" children="Radio" />
                          <MenuItem value="Range" children="Range" />
                        </Select>
                      </FormControl>
                    </div>
                    <div className={selectionSection}>
                {
                  ChoosedQuestion
                }
                  </div>
                </CardContent>
                <CardActions>
            <Button color='secondary' onClick={deleteQuestion} children="delete" />
                    </CardActions>
            </Card>
    )
}

const QuestionTitle = () => {

    const { questionTitleStyle } = useStyle();

    const [modifyTitle, setModifyTitle] = React.useState(false);
    const [questionTitle, setQuestionTitle] = React.useState("Question");

    const handleClickIcon = () => {
        setModifyTitle(!modifyTitle)
    }

    const handleTextFieldChange = (textToChange) => {
        setQuestionTitle(textToChange)
    }

    return (
        <div className={questionTitleStyle}>
            {
                modifyTitle ? <TextField onKeyDown={({keyCode}) => keyCode === 13 && setModifyTitle(false)} onChange={({ target }) => handleTextFieldChange(target.value)} defaultValue={questionTitle} /> : <Typography variant='h6' children={questionTitle} />
            }
            <Button onClick={handleClickIcon} >
                <Create/>
            </Button>
        </div>
    )
}