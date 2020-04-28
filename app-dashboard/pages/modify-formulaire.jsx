import React from 'react';

import { useRouter } from 'next/router'
import { getVersion } from '../src/utils/Requests'

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { Layout } from '../src/components/Layout'
import { Formulaire } from '../src/components/formulaire/Formulaire';

export default () => {

    const router = useRouter()
    const { id, pollId } = router.query

    const [defaultQuestions, setDefaultQuestions] = React.useState(null)

    React.useEffect(() => {
        if(id && pollId){
            (async () => {
                const response = await getVersion(pollId, id)
                setDefaultQuestions({questions: response.questions})
            })()
        }
    }, [router])

  return (
      <Layout>
    <Container maxWidth="md">
      <Box my={4}>
        {defaultQuestions
            ? <Formulaire pollId={pollId} updateVersion={true} defaultState={defaultQuestions} />
            : <p>Load</p>
        }
      </Box>
    </Container>
      </Layout>
  )
}