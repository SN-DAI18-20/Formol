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
	const [ description, setDescription ] = React.useState('');
	const [ name, setName ] = React.useState('Segment');
  const [ form, setForm ] = React.useState([ { id: 0, type: 'Text', required: false } ]);
  const [ formToSend, setFormToSend ] = React.useState();

	const bringBackState = (state, id, type, required) => {
		const findedStateIndex = form.findIndex((question) => question.id === id);
		form.splice(findedStateIndex, 1, { id, type, state, required });
		setForm([ ...form ]);
	};

	const handleSend = async () => {
    console.log("form", form)
    setFormToSend({
      name,
      description,
      form
    })
		console.info('all that shit', formToSend);
  };

	const changeType = (type, id, required) => {
		const findedQuestionIndex = form.findIndex((choosed) => choosed.id === id);
		form.splice(findedQuestionIndex, 1, { id, type, required });
		setForm([ ...form ]);
	};
	const toggleRequired = (required, type, id) => {
		const findedQuestionIndex = form.findIndex((choosed) => choosed.id === id);
		form.splice(findedQuestionIndex, 1, { id, type, required });
	};

	const addQuestion = () => {
		setId(id + 1);
		setForm([ ...form, { id, type: 'Text', required: false } ]);
	};

	const deleteQuestion = (QuestionID) => {
		const questionWithDeletedOne = form.filter(({ id }) => {
			return id !== QuestionID;
		});
		setForm([ ...questionWithDeletedOne ]);
	};

	return (
		<div style={{ height: '100%' }}>
			<Card elevation={4} className={paperStyle}>
				<CardContent>
					<InputTitle
						description={description}
						setDescription={setDescription}
						name={name}
						setname={setName}
					/>
					{form.map((choosedQuestion, index) => {
						const { id, type, required } = choosedQuestion;
						return (
							<Question
								bringBackState={(stateToBringBack, required) =>
									bringBackState(stateToBringBack, id, type, required)}
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

const InputTitle = ({ name, setname, description, setDescription }) => {
	const { segmentTitle, title } = useStyle();

	const [ input, setInput ] = React.useState(false);

	return (
		<div>
			<div className={title}>
				<div className={segmentTitle}>
					{input ? (
						<TextField
							onBlur={({ target }) => {
								setname(target.value);
								setInput(false);
							}}
							onChange={({ target }) => setname(target.value)}
							defaultValue={name}
							onKeyDown={(key) => key.keyCode === 13 && setInput(false)}
						/>
					) : (
						<Typography variant="h4" children={name} />
					)}
				</div>
				<Button onClick={() => setInput(!input)}>
					<Create />
				</Button>
			</div>
			<TextField
				label="Description"
				value={description}
				onChange={({ target }) => setDescription(target.value)}
				multiline
			/>
		</div>
	);
};
