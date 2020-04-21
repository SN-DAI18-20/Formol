import React from 'react';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { Layout } from '../src/components/Layout'
import { Formulaire } from '../src/components/formulaire/Formulaire';

export default () => {

    return (
      <Layout>
        <Container maxWidth="md">
            <Box my={4}>
                <Formulaire />
            </Box>
        </Container>
      </Layout>
    )
}