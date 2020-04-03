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
	segmentname: {
		overflowX: 'auto',
		overflowY: 'hidden',
		marginBottom: '10px'
	},
	nameStyle: {
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

  const [ name, setName ] = React.useState(state?.name || 'Name');
  const nameEffect = () => dispatch({type:'updateName', payload:name})
  React.useEffect(nameEffect, [name])

  const [ description, setDescription ] = React.useState(state?.description || '');
  const descriptionEffect = () => dispatch({ type: 'updateDescription', payload:description })
  React.useEffect(descriptionEffect, [description])



	return (
		<div style={{ height: '100%' }}>
					<Inputname
						description={description}
						setDescription={setDescription}
						name={name}
						setName={setName}
					/>
		</div>
	);
};

const Inputname = ({ name, setName, description, setDescription }) => {
	const { segmentname, nameStyle } = useStyle();

	const [ input, setInput ] = React.useState(false);

	return (
		<div>
			<div className={nameStyle}>
				<div className={segmentname}>
					{input ? (
						<TextField
							onBlur={({ target }) => {
								setName(target.value);
								setInput(false);
							}}
							onChange={({ target }) => setName(target.value)}
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
