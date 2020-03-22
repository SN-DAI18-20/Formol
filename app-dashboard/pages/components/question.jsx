import { makeStyles } from '@material-ui/core/styles';

import Text from './input-type/text';
import Number from './input-type/number';
import CheckBox from './input-type/checkbox';
import Selector from './input-type/selector';
import Range from './input-type/range';
import Date from './input-type/date';

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
    },
    questionType: {
      display: 'flex'
    }
})

export default ({ deleteQuestion }) => {

    const { header, questionType } = useStyle();

    const [ChoosedQuestion, setChoosedQuestion] = React.useState("Text");
    const [selected, setSelected] = React.useState("Text");

    const chooseAQuestion = (choosed) => {
      setChoosedQuestion(choosed)
    }

    const renderChoosedQuestion = (choosedQuestion) => {
      switch (choosedQuestion) {
        case "Number":
            return <Number/>;
        case "Text":
            return <Text/>;
        case "CheckBox":
            return <CheckBox/>;
        case "Range":
            return <Range/>;
        case "Selector":
            return <Selector/>;
        case "Date":
            return <Date/>;
        default:
            break;
    }
    }

    const handleSelect = (selectedValue) => {
        setSelected(selectedValue)
        chooseAQuestion(selectedValue)
    }

    return (
                <Card elevation={8} style={{ margin:'20px 0px' }}>
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
                          <MenuItem value="Selector" children="Selector" />
                          <MenuItem value="Range" children="Range" />
                          <MenuItem value="Date" children="Date" />
                        </Select>
                      </FormControl>
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
                modifyTitle
                ? <TextField
                    onKeyDown={({keyCode}) => keyCode === 13 && setModifyTitle(false)}
                    onChange={({ target }) => handleTextFieldChange(target.value)}
                    defaultValue={questionTitle}
                  />
                : <Typography variant='h6' children={questionTitle} />
            }
            <Button onClick={handleClickIcon} >
                <Create/>
            </Button>
        </div>
    )
}