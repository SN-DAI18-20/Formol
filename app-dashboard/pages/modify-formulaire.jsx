import React from 'react';

import { useRouter } from 'next/router'

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { Questions } from '../src/components/formulaire/Questions';
import { Header } from '../src/components/formulaire/Header';
import { Draft } from '../src/components/formulaire/Draft';

import { FormulaireContext, reducer } from '../src/utils/Contexts';
import { Divider } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
const useStyle = makeStyles({
  dividerStyle:{
    margin: "40px 0px"
  }
})

export default () => {

  const { dividerStyle } = useStyle();

  const [state, dispatch] = React.useReducer(reducer);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <FormulaireContext.Provider value={{state, dispatch}}>
          <Header/>
          <Questions/>
          <Divider className={dividerStyle} />
          <Draft/>
        </FormulaireContext.Provider>
      </Box>
    </Container>
  )
}