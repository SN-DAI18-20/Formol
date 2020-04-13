import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { Text } from './input-type/text';
import { Number } from './input-type/number';
import { CheckBox } from './input-type/checkbox';
import { Selector } from './input-type/selector';
import { Range } from './input-type/range';
import { Dates } from './input-type/date';

const useStyle = makeStyles({
    inputButton: {
      marginBottom: '20px'
    },
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
    },
    questionType: {
      display: 'flex'
    }
})


export default ({ deleteQuestion, changeType, type, id, bringBackState, required, toggleRequired, bringBackName }) => {

    const { header, questionType } = useStyle();

    const [ChoosedQuestion, setChoosedQuestion] = React.useState(type);
    const [selected, setSelected] = React.useState(type);

    const chooseAQuestion = (choosed) => {
      setChoosedQuestion(choosed)
    }

    const renderChoosedQuestion = (choosedQuestion) => {
      switch (choosedQuestion) {
        case "Number":
            return <Number bringBackState={parameters => bringBackState(parameters, id)} />;
        case "Text":
            return <Text bringBackState={parameters => bringBackState(parameters, id)} />;
        case "CheckBox":
            return <CheckBox bringBackState={parameters => bringBackState(parameters, id)} />;
        case "Range":
            return <Range bringBackState={parameters => bringBackState(parameters, id)} />;
        case "Selector":
            return <Selector bringBackState={parameters => bringBackState(parameters, id)} />;
        case "Date":
            return <Dates bringBackState={parameters => bringBackState(parameters, id)} />;
        default:
            break;
      }
    }

    const handleSelect = (selectedValue) => {
        setSelected(selectedValue)
        chooseAQuestion(selectedValue)
        changeType(selectedValue, id)
    }

    return (
                <Card elevation={8} style={{ margin:'20px 0px' }}>
                <CardContent>
                    <div className={header}>
                        <QuestionTitle id={id} bringBackName={bringBackName} />
                        <div>
                          <FormControlLabel label="Required" control={<Switch onChange={({target}) => toggleRequired(target.checked, id)} value={required} />} />
                          <FormControl>
                            <Select
                              value={selected}
                              onChange={({target}) => handleSelect(target.value)}
                            >
                              <MenuItem value="Text" children="Text" />
                              <MenuItem value="Number" children="Number" />
                              <MenuItem value="CheckBox" children="CheckBox" />
                              <MenuItem value="Selector" children="Selector" />
                              <MenuItem value="Range" children="Range" />
                              <MenuItem value="Date" children="Date" />
                            </Select>
                          </FormControl>
                        </div>
                    </div>
                    <div className={questionType}>
                {
                  renderChoosedQuestion(ChoosedQuestion)
                }
                  </div>
                </CardContent>
                <CardActions>
            <Button color='secondary' onClick={deleteQuestion} children="delete" />
                    </CardActions>
            </Card>
    )
}

const QuestionTitle = ({id, bringBackName}) => {

    const { questionTitleStyle, inputButton } = useStyle();

    const [questionTitle, setQuestionTitle] = React.useState();
    const questionNameEffect = () => bringBackName(id, questionTitle)
    React.useEffect(questionNameEffect, [questionTitle])

    const handleTextFieldChange = (textToChange) => {
        setQuestionTitle(textToChange)
    }

    return (
        <div className={questionTitleStyle}>
          <TextField
            className={inputButton}
            onChange={({ target }) => handleTextFieldChange(target.value)}
            defaultValue={questionTitle}
            variant="outlined"
            label="Nom de la question"
          />
        </div>
    )
}