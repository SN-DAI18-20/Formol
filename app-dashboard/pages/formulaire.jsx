import React from 'react';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { Form } from './components/creation-formulaire/Form'
import { HeaderForm } from './components/HeaderForm';

import { FormulaireContext, reducer } from './components/creation-formulaire/Contexts';

export default () => {

    const [state, dispatch] = React.useReducer(reducer);

    return (
        <Container maxWidth="sm">
            <Box my={4}>
              <FormulaireContext.Provider value={{ state, dispatch }}>
                <HeaderForm/>
                <Form />
                <Button onClick={() => console.info({state})}> Envoyer </Button>
              </FormulaireContext.Provider>
            </Box>
        </Container>
    )
}