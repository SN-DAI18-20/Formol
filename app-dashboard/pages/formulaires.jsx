import React from 'react';

import { Layout } from '../src/components/Layout'

import Container from '@material-ui/core/Container';
import ListPolls from '../src/components/pollsList';

export default () => {
    return (
      <Layout>
        <Container>
            <ListPolls></ListPolls>
        </Container>
      </Layout>
    );
}