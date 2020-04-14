import React from 'react';

import Button from '@material-ui/core/Button';

import { Questions } from './Questions'
import { Header } from './Header';
import { Draft } from './Draft';

import { FormulaireProvider } from '../../utils/Contexts';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';
const useStyle = makeStyles({
  dividerStyle:{
    margin: '40px 0px'
  }
})

export const Formulaire = () => {

    const { dividerStyle } = useStyle();

    return (
      <FormulaireProvider>
        <div>
          <Header />
          <Questions />
          <Divider className={dividerStyle} />
          <Draft />
          <div style={{ display:'flex', flexDirection: 'row-reverse' }}>
            <Button style={{ marginBottom: '40px' }} onClick={() => console.info({state})} color="primary" variant="contained">
              Valider formulaire
            </Button>
          </div>
        </div>
      </FormulaireProvider>
    )
}