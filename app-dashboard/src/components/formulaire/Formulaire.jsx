import React from 'react';

import Button from '@material-ui/core/Button';

import { createPoll, createNewVersion } from '../../utils/Requests'
import { Questions } from './Questions'
import { Header } from './Header';
import { Draft } from './Draft';

import { FormulaireProvider, FormulaireContext } from '../../utils/Contexts';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';
const useStyle = makeStyles({
  dividerStyle:{
    margin: '40px 0px'
  }
})

export const Formulaire = ({defaultData, modify, updateVersion, pollId}) => {

    const { dividerStyle } = useStyle();

    return (
      <FormulaireProvider defaultState={defaultData}>
        <div>
          {modify || <Header />}
          <Questions />
          <Divider className={dividerStyle} />
          <Draft />
          <SendButton updateVersion={updateVersion} pollId={pollId} />
        </div>
      </FormulaireProvider>
    )
}

const SendButton = ({updateVersion, pollId}) => {

  const {state} = React.useContext(FormulaireContext);

  const handleClick = async () => {
      if(updateVersion){
        const response = await createNewVersion(pollId, state.form)
        window.history.back()
      } else {
        const response = await createPoll(state)
        window.history.back()
      }
  }

  return (
    <div style={{ display:'flex', flexDirection: 'row-reverse' }}>
      <Button style={{ marginBottom: '40px' }} onClick={handleClick} color="primary" variant="contained">
        Valider formulaire
      </Button>
    </div>
    )
}