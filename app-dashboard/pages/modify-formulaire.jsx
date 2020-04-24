import React from 'react';

import { useRouter } from 'next/router'

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { getVersion } from '../src/utils/Requests';

import { Formulaire } from '../src/components/formulaire/Formulaire';

export default () => {

  const router = useRouter()

  const { pollId, id } = router.query
  const [specificPollData, setSpecificPollData] = React.useState()

  React.useEffect(() => {
    (async () => {
      if(id && pollId){
        const specificPollData = await getVersion(pollId, id)
        console.log({specificPollData})
        setSpecificPollData(specificPollData)
      }
    })()
  }, [router])

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Formulaire modify={true} defaultData={specificPollData} />
      </Box>
    </Container>
  )
}