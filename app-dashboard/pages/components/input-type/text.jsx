import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyle = makeStyles({
	textStyle: {
		display: 'flex',
		justifyContent: 'baseline'
	},
	textField: {
		marginRight: '50px'
	}
});

export default () => {
	const [ text, setText ] = React.useState('');
	const [ selectedTextType, setSelectedTextType ] = React.useState('Court');
  const [ selectedType, setSelectedType ] = React.useState('text');

  const { textField, textStyle } = useStyle();

	return (
		<div className={textStyle}>
			<Select value={selectedType} onChange={({ target }) => setSelectedType(target.value)}>
				<MenuItem value="text" children="text" />
				<MenuItem value="email" children="email" />
				<MenuItem value="tel" children="tel" />
			</Select>
			<TextField
				className={textField}
				label="Placeholder"
				value={text}
				onChange={({ currentTarget }) => {
					setText(currentTarget.value);
				}}
			/>
			<Select
				value={selectedTextType}
				onChange={({ target }) => {
					setSelectedTextType(target.value);
				}}
			>
				<MenuItem value="Court" children="Court" />
				<MenuItem value="Long" children="Long" />
			</Select>
		</div>
	);
};
