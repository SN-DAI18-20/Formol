import React from 'react';

import Container from '@material-ui/core/Container';
import ListVersion from '../src/components/versionList';

export default () => {
    return(
        <Container>
            <ListVersion pollId={50}></ListVersion>
        </Container>
    );
}