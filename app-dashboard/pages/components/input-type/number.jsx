import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyle = makeStyles({
	number: {
		display: 'flex',
		flexDirection: 'row'
	}
});

export default () => {
	const { number } = useStyle();
	const [ between, setBetween ] = React.useState(false);
	const [ min, setMin ] = React.useState(0);
	const [ max, setMax ] = React.useState();

  const handleMinChange = (minToChange) => {
    if(minToChange < max){
      setMin(minToChange)
    }
  }

  const handleMaxChange = (maxToChange) => {
    if(maxToChange > min){
      setMax(maxToChange)
    }
  }

	React.useEffect(
		() => {
			setMin(0);
		},
		[ between ]
	);

	return (
		<div>
			<FormControlLabel
				label="Between"
				control={<Switch color="primary" onChange={() => setBetween(!between)} />}
			/>
			<div className={number}>
				<React.Fragment>
					{between && (
						<FormControl>
							<TextField
								onChange={({ target }) => handleMinChange(parseInt(target.value))}
								value={min}
								label="De"
								type="number"
							/>
						</FormControl>
					)}
					<FormControl>
						<TextField
							onChange={({ target }) => handleMaxChange(parseInt(target.value))}
							value={max}
							label={between ? 'À' : 'Limite'}
							type="number"
						/>
					</FormControl>
				</React.Fragment>
			</div>
		</div>
	);
};
