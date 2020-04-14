import React from 'react';

import { useRouter } from 'next/router'

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { Formulaire } from '../src/components/formulaire/Formulaire';

export default () => {

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Formulaire/>
      </Box>
    </Container>
  )
}