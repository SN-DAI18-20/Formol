import React from 'react';

import Button from '@material-ui/core/Button';

import { Questions } from './Questions'
import { Header } from './Header';

import { FormulaireContext, reducer } from '../../utils/Contexts';

const Formulaire = () => {

    const [state, dispatch] = React.useReducer(reducer);

    return (
      <FormulaireContext.Provider value={{ state, dispatch }}>
        <Header/>
        <Questions/>
        <div style={{ display:'flex', flexDirection: 'row-reverse' }}>
          <Button color="primary" variant="contained">
            Valider formulaire
          </Button>
        </div>
      </FormulaireContext.Provider>
    )
}

export default Formulaire;
