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

export const Number = ({bringBackState}) => {
	const { number } = useStyle();
	const [ between, setBetween ] = React.useState(false);
	const [ min, setMin ] = React.useState(0);
	const [ max, setMax ] = React.useState(10);

  const handleMinChange = (minToChange) => {
    if(minToChange < max){
      setMin(minToChange)
    } else {
      setMin(max-1)
    }
  }

  const handleMaxChange = (maxToChange) => {
    if(maxToChange > min && maxToChange != NaN){
      setMax(maxToChange)
    } else{
      setMax(min+1)
    }
  }

	React.useEffect(
		() => {
			setMin(0);
		},
		[ between ]
  );

  React.useEffect(() => {
    bringBackState({ between, min, max })
  }, [between, min, max])

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
                onChange={({ target }) => setMin(target.value)}
                onBlur={({target}) => handleMinChange(parseInt(target.value))}
								value={min}
								label="De"
								type="number"
							/>
						</FormControl>
					)}
					<FormControl>
						<TextField
              onChange={({ target }) => setMax(target.value)}
              onBlur={({target}) => handleMaxChange(parseInt(target.value))}
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
