import React from 'react';

import { useRouter } from 'next/router'

import Container from '@material-ui/core/Container';
import SummaryPoll from '../src/components/pollSummary';

export default () => {

    const router = useRouter()

    const { id } = router.query
    const [pollID, setPollID] = React.useState()

    React.useEffect(() => {
        if (id) {
            setPollID(id)
        }
    }, [router])

    return(
        <SummaryPoll pollId={pollID}></SummaryPoll>
    );
}