import React from 'react';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import Segment from './components/segments';

export default () => {
    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Segment/>
            </Box>
        </Container>
    )
}