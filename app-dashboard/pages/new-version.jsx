import React from 'react'

import { useRouter } from 'next/router'

import { Formulaire } from '../src/components/formulaire/Formulaire'
import { Layout } from '../src/components/Layout'

export default () => {

    const router = useRouter()
    const { id } = router.query;

    const [pollId, setPollId] = React.useState(null);

    React.useEffect(() => {
        if(id){
            setPollId(id)
        }
    }, [router])

    return (
        <div>
            <Layout>
            <Formulaire modify={true} updateVersion={true} pollId={id} />
            </Layout>
        </div>
    )
}