import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';


import Texte from './texte';
import Metrique from './metrique';
import { Card, CardContent, CardActions } from '@material-ui/core';

const useStyle = makeStyles({
    questionsChoice:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-evenly',
        marginBottom: '10px'
    },
    card: {
        margin:'10px 0px'
    }
})

export default ({ deleteQuestion }) => {

    const { questionsChoice, card } = useStyle();

    const [ChoosedQuestion, setChoosedQuestion] = React.useState();


    const chooseAQuestion = (choosed) => {
        switch (choosed) {
            case Metrique:
                setChoosedQuestion(Metrique)
                break;
            case Texte:
                setChoosedQuestion(Texte)
                break;
            default:
                break;
        }
    }

    return (
                <Card
                    elevation={8}
                    className={card}
                >
                <CardContent>
                {
                    ChoosedQuestion
                    ?
                    ChoosedQuestion
                    :
                    (
                        <div className={questionsChoice}>
                            <Button onClick={() => chooseAQuestion(Metrique)} children="Metrique"/>
                            <Button onClick={() => chooseAQuestion(Texte)} children="Texte"/>
                        </div>
                    )
                }
                </CardContent>
                <CardActions>
                {
                    ChoosedQuestion
                    && <Button color='primary' onClick={() => setChoosedQuestion(false)} children="Change" />
                }
            <Button color='secondary' onClick={deleteQuestion} children="delete" />
                    </CardActions>
            </Card>
    )
}