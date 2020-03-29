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
	paperStyle: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		margin: '20px 0px'
	},
	option: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	segmentTitle: {
		overflowX: 'auto',
		overflowY: 'hidden',
		marginBottom: '10px'
	},
	title: {
		display: 'flex',
		flexDirection: 'row'
	},
	cardHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});

export default () => {
	const { paperStyle, option } = useStyle();

	const [ id, setId ] = React.useState(1);
  const [ questions, setQuestions ] = React.useState([ { id: 0, type: 'Text', required:false } ]);

  const bringBackState = (state, id, type, required) => {
    const findedStateIndex = questions.findIndex(question => question.id === id)
    questions.splice(findedStateIndex, 1, { id, type, state, required })
    setQuestions([...questions])
  }


  const handleSend = () => {
    console.info("all that shit", questions)
  }

  const changeType = (type, id, required) => {
    const findedQuestionIndex = questions.findIndex(choosed => choosed.id === id)
    questions.splice(findedQuestionIndex, 1, { id, type, required })
    setQuestions([...questions])
  }
  const toggleRequired = (required, type, id) => {
    const findedQuestionIndex = questions.findIndex(choosed => choosed.id === id)
    questions.splice(findedQuestionIndex, 1, { id, type, required })
  }

	const addQuestion = () => {
		setId(id + 1);
		setQuestions([ ...questions, { id, type: 'Text', required: false } ]);
	};

	const deleteQuestion = (QuestionID) => {
    const questionWithDeletedOne = questions.filter(({ id }) => {
      return id !== QuestionID;
    })
		setQuestions([...questionWithDeletedOne]);
  };


	return (
		<div style={{height: '100%'}} >
			<Card elevation={4} className={paperStyle}>
				<CardContent>
					<InputTitle />
					{questions.map((choosedQuestion, index) => {
            const { id, type, required } = choosedQuestion;
						return (
                <Question
                  bringBackState={(stateToBringBack, required) => bringBackState(stateToBringBack, id, type, required)}
                  key={`question-${index}`}
                  id={id}
                  required={required}
                  toggleRequired={(checked) => toggleRequired(checked, type, id)}
                  changeType={(typeToChange, id, required) => changeType(typeToChange, id, required)}
                  type={type}
                  deleteQuestion={() => deleteQuestion(id)}
                />
						);
					})}
				</CardContent>
				<CardActions>
					<div className={option}>
						<Button color="primary" onClick={addQuestion}>
							add
						</Button>
					</div>
				</CardActions>
			</Card>
      <Button children="Envoyer" onClick={handleSend} />
		</div>
	);
};

const InputTitle = () => {
	const { segmentTitle, title } = useStyle();

	const [ input, setInput ] = React.useState(false);
	const [ segmentName, setSegmentName ] = React.useState('Segment');

	return (
		<div className={title}>
			<div className={segmentTitle}>
				{input ? (
					<TextField
						onBlur={({ target }) => {
							setSegmentName(target.value);
							setInput(false);
						}}
						onChange={({ target }) => setSegmentName(target.value)}
						defaultValue={segmentName}
						onKeyDown={(key) => key.keyCode === 13 && setInput(false)}
					/>
				) : (
					<Typography variant="h4" children={segmentName} />
				)}
			</div>
			<Button onClick={() => setInput(!input)}>
				<Create />
			</Button>
		</div>
	);
};
