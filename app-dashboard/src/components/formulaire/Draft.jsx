import React from 'react';

import { FormulaireContext } from '../../utils/Contexts';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

export const Draft = () => {

  const {state, dispatch} = React.useContext(FormulaireContext);

  const [status, setStatus] = React.useState(state?.draft?.status || false);
  const handleStatus = event => {
    setStatus(event.target.value)
  }

  const [startPublication, setStartPublication] = React.useState(state?.draft?.startPulication || new Date(Date.now()));
  const handleStartPublication = startDate => {
    setStartPublication(new Date(startDate))
  }

  const [endPublication, setEndPublication] = React.useState(state?.draft?.endPublication || new Date(Date.now()));
  const handleEndPublication = endDate => {
    setEndPublication(new Date(endDate))
  }

  const effect = () => {
    dispatch({
      type:'setDraft',
      payload:{status, startPublication, endPublication}
    })
  }
  React.useEffect(effect, [status, startPublication, endPublication])

  const statusUpdate = () => {
    setEndPublication(status && new Date(Date.now()))
    setStartPublication(status && new Date(Date.now()))
  }
  React.useEffect(statusUpdate, [status])

  return (
    <div>
      <FormControl>
        <InputLabel children="Brouillon" />
        <Select value={status} onChange={handleStatus}>
          <MenuItem value={true} children="Oui" />
          <MenuItem value={false} children="Non" />
        </Select>
      </FormControl>
      {status && (
        <div>
          <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
                  value={startPublication}
                  maxDate={endPublication && endPublication}
									onChange={handleStartPublication}
									disableToolbar
									variant="inline"
									format="MM/dd/yyyy"
									margin="normal"
									label="Date de début de publication"
                  />
							</MuiPickersUtilsProvider>
          </div>
          <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              value={endPublication}
              minDate={startPublication}
              onChange={handleEndPublication}
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              label="Date de fin de publication"
              />
          </MuiPickersUtilsProvider>
      </div>
      </div>
        )}
    </div>
  )
}