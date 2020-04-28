import React from 'react';

import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';

export const Range = ({bringBackState, parameters}) => {
  const [ maxValue, setMaxValue ] = React.useState(parameters.max || 20);
  const [minValue, setMinValue] = React.useState(parameters.min || -20);
  const [defaultValue, setDefaultValue] = React.useState(0);

  React.useEffect(() => {
    bringBackState({min: parseInt(minValue), max: parseInt(maxValue)})
  }, [minValue, maxValue])

	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
			<div>
        <TextField
          type="number"
          label="Min"
          value={minValue}
          onChange={({target}) => {
            setMinValue(target.value)
          }}
        />
				<TextField
					type="number"
          label="Max"
					value={maxValue}
					onChange={({ target }) => {
						setMaxValue(target.value);
					}}
				/>
			</div>
        <div style={{ width:'50%' }}>
				  <Slider valueLabelDisplay="auto" onChange={(event, newValue) => setDefaultValue(newValue)} value={defaultValue} max={maxValue} min={minValue} />
        </div>
		</div>
	);
};
