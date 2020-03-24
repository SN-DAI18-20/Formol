import React from 'react';

import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default () => {
	const [ maxValue, setMaxValue ] = React.useState(20);

	const [ marks, setMarks ] = React.useState([
		{
			id: 0,
			label: 'Valeur max',
			value: maxValue
		}
	]);

	const addMark = () => {
		setMarks([
			...marks,
			{
				id: marks.length,
				label: '',
				value: marks.length
			}
		]);
	};

	const deleteMark = (markID) => {
		const findedIndex = marks.findIndex((mark) => mark.id === markID);
		const marksToUpdate = [ ...marks ];
		marksToUpdate.splice(findedIndex, 1);
		setMarks([ ...marksToUpdate ]);
	};

	const updateMark = (markToUpdate) => {
		const findedIndex = marks.findIndex((mark) => mark.id === markToUpdate.id);
		const marksToUpdate = [ ...marks ];
		marksToUpdate.splice(findedIndex, 1, markToUpdate);
		setMarks([ ...marksToUpdate ]);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
			<div>
				<TextField
					type="number"
					label="Max"
					defaultValue={maxValue}
					onChange={({ target }) => {
						setMaxValue(target.value);
						dispatchMarks('maxValue');
					}}
				/>
			</div>
        <div style={{ width:'50%' }}>
				  <Slider max={maxValue} marks={marks} />
        </div>
			<div>
				{marks.map(({ id, label, value }) => {
					return <Mark key={`mark-${id}`} deleteMark={deleteMark} updateMark={updateMark} id={id} label={label} value={value} />;
				})}
				<Button
					onClick={() => {
						addMark();
					}}
					children="Ajouter un mark"
				/>
			</div>
		</div>
	);
};

const Mark = (markProps) => {
	const { id, deleteMark, updateMark } = markProps;

	const [ label, setLabel ] = React.useState(markProps.label);
  const [ value, setValue ] = React.useState(markProps.value);

	return (
		<div key={`mark-${id}`}>
			<TextField
				type="text"
				onChange={({ target }) => {
					setLabel(target.value);
				}}
        label="Label"
        defaultValue={label}
				value={label}
			/>
			<TextField
				type="number"
				onChange={({ target }) => {
					setValue(target.value);
				}}
				label="Valeur"
				defaultValue={value}
			/>
			<div>
				<Button
					onClick={() => {
						deleteMark(id);
					}}
					color="secondary"
					children="Supprimer"
				/>
				<Button
          color="primary"
					onClick={() => {
						updateMark({
							id,
							label,
							value
						});
					}}
					children="Mettre à jour"
				/>
			</div>
		</div>
	);
};
