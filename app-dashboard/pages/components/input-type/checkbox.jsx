import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

import CheckBox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteForever from '@material-ui/icons/DeleteForever';

const useStyle = makeStyles({
	checkBoxStyle: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'baseline'
	},
	addButton: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '20px'
	}
});

export default ({bringBackState}) => {
	const { addButton } = useStyle();

	const [ checkBoxs, setCheckBoxs ] = React.useState([ { value: '', id: 1, defaultChecked: false } ]);

	const addCheckBox = () => {
    const checkBoxsTable = [...checkBoxs]
    const id = checkBoxs.length === 0 ? 1 : checkBoxs.pop().id + 1
    setCheckBoxs([ ...checkBoxsTable, { value: '', id, defaultChecked: false } ]);
	};

	const updateCheckBox = (checkBoxToUpdate) => {
		const findedCheckBoxIndex = checkBoxs.findIndex((checkbox) => checkbox.id === checkBoxToUpdate.id);
		checkBoxs.splice(findedCheckBoxIndex, 1, checkBoxToUpdate);
		setCheckBoxs([...checkBoxs]);
	};

	const deleteCheckBox = (checkBoxToDelete) => {
		const checkboxID = checkBoxs.findIndex(({ id }) => id === checkBoxToDelete);
		checkBoxs.splice(checkboxID, 1);
		setCheckBoxs([...checkBoxs]);
  };

  React.useEffect(() => {
    bringBackState({checkBoxs})
  }, [checkBoxs])

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			{checkBoxs.map(({ id, value, defaultChecked }) => {
				return (
					<UpdateCheckBox
						key={`checkbox-${id}`}
						props={{ id, value, defaultChecked }}
						deleteCheckBox={deleteCheckBox}
						updateCheckBox={updateCheckBox}
					/>
				);
			})}
			<div className={addButton}>
				<Button children="Ajouter une checkbox" onClick={addCheckBox} />
			</div>
		</div>
	);
};

const UpdateCheckBox = ({ props, deleteCheckBox, updateCheckBox }) => {
	const { checkBoxStyle } = useStyle();
	const { id } = props;
	const [ value, setValue ] = React.useState(props.value);
  const [ defaultChecked, setDefaultChecked ] = React.useState(props.defaultChecked);

	return (
		<div className={checkBoxStyle}>
			<CheckBox
				checked={defaultChecked}
				onChange={({ target }) => {
					setDefaultChecked(target.checked);
					updateCheckBox({ id, value, defaultChecked });
				}}
			/>
			<TextField
				value={value}
				onChange={({ target }) => {
					setValue(target.value);
					updateCheckBox({ id, value, defaultChecked });
				}}
				label="Placeholder"
			/>
			<IconButton onClick={() => deleteCheckBox(id)} children={<DeleteForever />} />
		</div>
	);
};
