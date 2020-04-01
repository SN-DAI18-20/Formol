import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Create from '@material-ui/icons/Create';

import { FormulaireContext } from './creation-formulaire/Contexts';

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
	titleStyle: {
		display: 'flex',
		flexDirection: 'row'
	},
	cardHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});

export const HeaderForm = () => {

  const { state, dispatch } = React.useContext(FormulaireContext);

  const [ title, setTitle ] = React.useState(state?.title || 'Title');
  const titleEffect = () => dispatch({type:'updateTitle', payload:title})
  React.useEffect(titleEffect, [title])

  const [ description, setDescription ] = React.useState(state?.description || '');
  const descriptionEffect = () => dispatch({ type: 'updateDescription', payload:description })
  React.useEffect(descriptionEffect, [description])



	return (
		<div style={{ height: '100%' }}>
					<InputTitle
						description={description}
						setDescription={setDescription}
						title={title}
						setTitle={setTitle}
					/>
		</div>
	);
};

const InputTitle = ({ title, setTitle, description, setDescription }) => {
	const { segmentTitle, titleStyle } = useStyle();

	const [ input, setInput ] = React.useState(false);

	return (
		<div>
			<div className={titleStyle}>
				<div className={segmentTitle}>
					{input ? (
						<TextField
							onBlur={({ target }) => {
								setTitle(target.value);
								setInput(false);
							}}
							onChange={({ target }) => setTitle(target.value)}
							defaultValue={title}
							onKeyDown={(key) => key.keyCode === 13 && setInput(false)}
						/>
					) : (
						<Typography variant="h4" children={title} />
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
