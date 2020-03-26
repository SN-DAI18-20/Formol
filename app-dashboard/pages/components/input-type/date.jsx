import React from 'react';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { makeStyles } from '@material-ui/core/styles';
const useStyle = makeStyles({
  minDateStyle: {
    marginRight: '10px'
  }
})

export default ({bringBackState}) => {

  const { minDateStyle } = useStyle();

	const [ maxDate, setMaxDate ] = React.useState();
	const handleMaxDateChange = (maxDate) => {
		setMaxDate(maxDate);
	};

	const [ minDate, setMinDate ] = React.useState();
	const handleMinDateChange = (minDate) => {
		setMinDate(minDate);
  };

  const [between, setBetween] = React.useState(false);
  const handleToggleBetween = ({target}) => {
    const {checked} = target
    setBetween(checked)
  }

  React.useEffect(() => {
    bringBackState({between, minDate, maxDate})
  }, [between, minDate, maxDate])

	return (
		<div>
			<FormControlLabel control={<Switch color="primary" onChange={handleToggleBetween} />} label="Between" />
			<div>
        {between && <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            className={minDateStyle}
						value={minDate}
						onChange={handleMinDateChange}
						disableToolbar
						variant="inline"
						format="MM/dd/yyyy"
						margin="normal"
						label="Min date"
					/>
        </MuiPickersUtilsProvider>}
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						value={maxDate}
						onChange={handleMaxDateChange}
						disableToolbar
						variant="inline"
						format="MM/dd/yyyy"
						margin="normal"
						label="Max date"
					/>
				</MuiPickersUtilsProvider>
			</div>
		</div>
	);
};
