import React from 'react';

import Button from '@material-ui/core/Button';

import { createPoll, createNewVersion } from '../../utils/Requests'

import Divider from '@material-ui/core/Divider'
import { Questions } from './Questions'
import { Header } from './Header';
import { Draft } from './Draft';

import { FormulaireContext, FormulaireProvider } from '../../utils/Contexts';

import { makeStyles } from '@material-ui/core/styles';
const useStyle = makeStyles({
  dividerStyle:{
    margin: '40px 0px'
  }
})

export const Formulaire = ({modify, updateVersion, pollId, defaultState}) => {

    const { dividerStyle } = useStyle();

    return (
      <FormulaireProvider defaultState={defaultState} >
        <div>
          {modify || updateVersion || <Header />}
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
      try{
          if(updateVersion){
                await createNewVersion(pollId, state)
                window.location.replace(`/gestionFormulaire?id=${pollId}&goToVersion=true`)
            } else {
                const stateToPush = Object.assign({}, state)
                stateToPush.form = state.questions
                delete stateToPush.questions
                await createPoll(stateToPush)
                window.location.replace('/formulaires')
            }
        } catch (err){

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
