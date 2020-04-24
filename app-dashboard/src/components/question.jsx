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


export default ({
  deleteQuestion,
  changeType,
  type,
  id,
  bringBackState,
  required,
  toggleRequired,
  bringBackName,
  deleteDisabled,
  question
}) => {

    console.log({question})

    const { header, questionType } = useStyle();

    const [ChoosedQuestion, setChoosedQuestion] = React.useState(type);
    const [selected, setSelected] = React.useState(type);

    const chooseAQuestion = (choosed) => {
      setChoosedQuestion(choosed)
    }

    const renderChoosedQuestion = (choosedQuestion) => {
      switch (choosedQuestion) {
        case "number":
            return <Number bringBackState={parameters => bringBackState(parameters, id)} />;
        case "text":
            return <Text bringBackState={parameters => bringBackState(parameters, id)} />;
        case "checkbox":
            return <CheckBox bringBackState={parameters => bringBackState(parameters, id)} />;
        case "range":
            return <Range bringBackState={parameters => bringBackState(parameters, id)} />;
        case "selector":
            return <Selector bringBackState={parameters => bringBackState(parameters, id)} />;
        case "date":
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
                        <QuestionTitle defaultName={question.name} id={id} bringBackName={bringBackName} />
                        <div>
                          <FormControlLabel label="Required" control={<Switch onChange={({target}) => toggleRequired(target.checked, id)} value={required} />} />
                          <FormControl>
                            <Select
                              value={selected}
                              onChange={({target}) => handleSelect(target.value)}
                            >
                              <MenuItem value="text" children="text" />
                              <MenuItem value="number" children="number" />
                              <MenuItem value="checkbox" children="checkbox" />
                              <MenuItem value="selector" children="selector" />
                              <MenuItem value="range" children="range" />
                              <MenuItem value="date" children="date" />
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
            <Button disabled={deleteDisabled} color='secondary' onClick={deleteQuestion} children="delete" />
                    </CardActions>
            </Card>
    )
}

const QuestionTitle = ({id, bringBackName, defaultName}) => {

    const { questionTitleStyle, inputButton } = useStyle();

    const [questionTitle, setQuestionTitle] = React.useState(defaultName || "");
    const questionNameEffect = () => bringBackName(id, questionTitle)
    React.useEffect(questionNameEffect, [questionTitle])

    const handleTextFieldChange = (textToChange) => {
        setQuestionTitle(textToChange || "")
    }

    return (
        <div className={questionTitleStyle}>
          <TextField
            className={inputButton}
            onChange={({ target }) => handleTextFieldChange(target.value)}
            defaultValue={questionTitle || ""}
            variant="outlined"
            label="Nom de la question"
          />
        </div>
    )
}