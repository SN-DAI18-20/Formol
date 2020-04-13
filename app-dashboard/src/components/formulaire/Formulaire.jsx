import React from 'react';

import Button from '@material-ui/core/Button';

import { Questions } from './Questions'
import { Header } from './Header';

import { FormulaireContext, FormulaireProvider } from '../../utils/Contexts';

const Formulaire = () => {

export const Formulaire = () => {

    const { dividerStyle } = useStyle();

    return (
      <FormulaireProvider>
        <div>
          <Header />
          <Questions />
          <Divider className={dividerStyle} />
          <Draft />
          <SendButton/>
        </div>
      </FormulaireProvider>
    )
}

const SendButton = () => {

  const {state} = React.useContext(FormulaireContext);

  return (
    <div style={{ display:'flex', flexDirection: 'row-reverse' }}>
      <Button style={{ marginBottom: '40px' }} onClick={() => console.info({state})} color="primary" variant="contained">
        Valider formulaire
      </Button>
    </div>
    )
}
