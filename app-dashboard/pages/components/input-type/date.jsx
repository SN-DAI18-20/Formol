import React, { useDebugValue } from 'react';


import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { makeStyles } from '@material-ui/core/styles';
const useStyle = makeStyles({
	minDateStyle: {
		marginRight: '10px'
	}
});

export const Dates = ({ bringBackState }) => {
	const { minDateStyle } = useStyle();

	const [ limit, setLimit ] = React.useState(false);
	const handleToggleLimit = ({ target }) => {
		const { checked } = target;
		setLimit(checked);
	};


	const [ maxDate, setMaxDate ] = React.useState(new Date(Date.now()));
	const handleMaxDateChange = (maxDate) => {
		setMaxDate(new Date(maxDate));
  };
  const [maxDateActive, setMaxDateActive] = React.useState(true);
  const handleToggleMaxDateActive = ({target}) => {
    const { checked } = target;
    setMaxDateActive(checked)
    setMaxDate(checked ? new Date(Date.now()) : false)
  }

	const [ minDate, setMinDate ] = React.useState(new Date(Date.now()));
	const handleMinDateChange = (minDate) => {
		setMinDate(new Date(minDate));
  };
  const [minDateActive, setMinDateActive] = React.useState(true);
  const handleToggleMinDateActive = ({target}) => {
    const { checked } = target;
    setMinDateActive(checked)
    setMinDate(checked ? new Date(Date.now()) : false)
  }

  React.useEffect(() => {
    if(limit){
      setMaxDateActive(true)
      setMinDateActive(true)
    }
  }, [limit])

  React.useEffect(() => {
    if(maxDateActive === false && minDateActive === false) {
      setLimit(false)
    }
  }, [maxDateActive, minDateActive])

	React.useEffect(
		() => {
			bringBackState({ minDate, maxDate });
		},
		[ minDate, maxDate ]
	);

	return (
		<div>
			<FormControlLabel
				control={<Switch value={limit} color="primary" onChange={handleToggleLimit} />}
        label="Limit date"
			/>
			{limit ? (
				<div>
					<div style={{display:'flex', flexDirection:'column'}} >
            <FormControlLabel control={<Switch onChange={handleToggleMinDateActive} checked={minDateActive} />} label="Min Date" />
						{minDateActive && (
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
                  className={minDateStyle}
                  maxDate={maxDateActive && maxDate}
									value={minDate}
									onChange={handleMinDateChange}
									disableToolbar
									variant="inline"
									format="MM/dd/yyyy"
									margin="normal"
									label="Min date"
								/>
							</MuiPickersUtilsProvider>
						)}
					</div>
					<div>
            <div style={{display:'flex', flexDirection:'column'}} >
            <FormControlLabel control={<Switch onChange={handleToggleMaxDateActive} checked={maxDateActive} />} label="Max Date" />
						{maxDateActive && (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
                  value={maxDate}
                  minDate={minDateActive && minDate}
									onChange={handleMaxDateChange}
									disableToolbar
									variant="inline"
									format="MM/dd/yyyy"
									margin="normal"
									label="Max date"
                  />
							</MuiPickersUtilsProvider>
						)}
            </div>
					</div>
				</div>
			) : (
				<div>
					<Typography>Il n'y à pas de limite de date</Typography>
				</div>
			)}
		</div>
	);
};
