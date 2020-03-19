import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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
  },
  cardHeader:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default () => {
  const { paperStyle, option, cardHeader } = useStyle();

  const [id, setId] = React.useState(1);
  const [ChoosedQuestions, setChoosedQuestions] = React.useState([{ id:`question${0}`}]);

  const addQuestion = () => {
      setId(id+1)
      setChoosedQuestions([...ChoosedQuestions, { id:`question${id}`}])
  }

  const deleteQuestion = (QuestionID) => {
      setChoosedQuestions(ChoosedQuestions.filter(({id}) => {
          return id !== QuestionID
      }))
  }

  return (
          <div>
                  <Card
                  elevation={4}
                  className={paperStyle}>
              <CardContent>
                  <InputTitle/>
              {
                  ChoosedQuestions.map((choosedQuestion, index) => {
                      return (
                                  <div key={`question${index}`}>
                                      <Question deleteQuestion={() => deleteQuestion(choosedQuestion.id)} />
                                  </div>
                          )
                      })
                  }
              </CardContent>
              <CardActions>
              <div className={option}>
                  <Button color='primary' onClick={addQuestion}> add </Button>
              </div>
              </CardActions>
          </Card>
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