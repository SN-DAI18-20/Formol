import 'date-fns';
import React from 'react';
import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles';

import { getSpecificPoll, deletePoll, updatePollInformation, downloadPoll } from '../utils/Requests'

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker
} from '@material-ui/pickers';
import DeleteIcon from '@material-ui/icons/Delete';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import GetAppIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import red from '@material-ui/core/colors/red';
import Select from '@material-ui/core/Select';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import teal from '@material-ui/core/colors/teal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';



const useStyles = makeStyles((theme) => ({
    button:{
        margin: theme.spacing(1)
    },
    buttonDelete:{
        color: "#fff",
        backgroundColor: red[500]
    },
    buttonDownload:{
        color: "#fff",
        backgroundColor: teal['A700']
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'stretch',
        marginBottom: theme.spacing(2),
    },
    cardContentInfo:{
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'stretch',
        marginBottom: theme.spacing(2)
    },
    cardCustom:{
        width:'100%'
    },
    cardHeader: {
        backgroundColor:
          theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
    },
    gridCustom:{
        width: '100%',
        marginBottom: theme.spacing(2)
    }

}));

function VersionList(props) {
    const classes = useStyles();
    const [poll, setPoll] = React.useState(props.poll);
    const [show, setShow] = React.useState(false);
    const [statePoll, setStatePoll] = React.useState(5);

    React.useEffect(() => {
        if(!poll.published_at){
            console.log(poll.published_at)
            setPoll({...poll, published_at: new Date()})
        }

        if(!poll.depublished_at){
            setPoll({...poll, depublished_at: new Date()})
        }

        if(new Date() < new Date(poll.published_at) || poll.draft == false)
            setShow(true);


        if(poll.draft == true){
            setStatePoll(1);
            if(new Date() <= new Date(poll.published_at) && poll.draft == true)
                setStatePoll(2);
        } else{
            if(new Date() < new Date(poll.depublished_at) && new Date() >= new Date(poll.published_at))
                setStatePoll(3);
            else
                setStatePoll(4);
        }



    }, [])

    React.useEffect(()=>{
        if(statePoll == 3 || statePoll == 4)
            setPoll({...poll, draft:false});
        if(statePoll == 2 || statePoll == 3 || statePoll == 4){
            setShow(true);
        }
        else
            setShow(false);
    }, [statePoll]);




    const handleChangeSelect = (event) => {
        setStatePoll(event.target.value);


        if(statePoll == 3 || statePoll == 4)
            setPoll({...poll, draft:false});
        if(statePoll == 2 || statePoll == 3 || statePoll == 4)
            setShow(true);
        else
            setShow(false);

    }

    const handleChangeName = (event) => {
        setPoll({...poll, name:event.target.value});
    }

    const handleChangeDescription = (event) => {
        setPoll({...poll, description:event.target.value});
    }

    const handlePublishedDateChange = (date) => {
        setPoll({...poll, published_at:date})
    };

    const handleDepublishedDateChange = (date) => {
        setPoll({...poll, depublished_at:date})
    };

    async function handleUpdate(){
        //request update des informations du formualire
        const { name, description, draft, published_at, depublished_at } = poll;
        console.log({poll})
        try {

            const response = await updatePollInformation(props.pollId, {
                name, description, draft, published_at, depublished_at
            })
            console.log({response})
        }catch(err) {
            console.log({err})
        }
    }

    async function handleDelete(id){
        //ajouter redirection vers la page de poll
        try {
            await deletePoll(id)
            window.location.replace("/formulaires")
        } catch(error) {
        }
    }

    async function handleDownload(){
        //ajouter redirection vers la page de poll
        console.log(props.poll.download_url)
      const data = await downloadPoll(props.poll.download_url)
      console.log({data})
    }

    function handleSee(id){
        //ajouter redirection vers la page de poll
    }

    function handleSeeStats(id){
        //ajouter redirection vers la page des statistiques de la poll
    }


    return(
        <Container maxWidth="md" component="main">
            <Grid container spacing={3} alignItems="baseline" className={classes.gridCustom}>
                <Grid item xs={6}>
                    <Grid container spacing={3} direction="column" justify="center" alignItems="baseline">
                        <Grid item className={classes.gridCustom}>
                            <Card className={classes.cardCustom}>
                                <CardHeader
                                title="Informations"
                                titleTypographyProps={{ align: 'left' }}
                                className={classes.cardHeader}
                                />
                                <CardContent>
                                    <div className={classes.cardContentInfo} direction="column" justify="left" alignItems="baseline">
                                        <Grid container>
                                            <Grid item className={classes.gridCustom}>
                                                <Typography variant="subtitle1" align="left" >
                                                Titre :
                                                </Typography>
                                            </Grid>
                                            <Grid item className={classes.gridCustom}>
                                                <TextField value={poll.name} onChange={handleChangeName}>

                                                </TextField>
                                            </Grid>
                                            <Grid item className={classes.gridCustom}>
                                                <Typography variant="subtitle1" align="left" >
                                                Description :
                                                </Typography>
                                            </Grid>
                                            <Grid item className={classes.gridCustom}>
                                                <TextField className={classes.gridCustom} onChange={handleChangeDescription} value={poll.description}  multiline rows={4}>

                                                </TextField>
                                            </Grid>
                                            <Grid item className={classes.gridCustom}>
                                                <Typography>
                                                Etat : {statePoll}
                                                </Typography>
                                            </Grid>
                                            <Grid item className={classes.gridCustom}>
                                                <Select id="select" value={statePoll} onChange={handleChangeSelect}>
                                                    <MenuItem value={1}>Brouillon</MenuItem>
                                                    <MenuItem value={2}>En attente de publication</MenuItem>
                                                    <MenuItem value={3}>Publié</MenuItem>
                                                    <MenuItem value={4}>Dé-publier</MenuItem>
                                                </Select>
                                            </Grid>
                                            {
                                                show ?
                                                    <Grid Container direction="column" justify="center" alignItems="baseline">


                                                        <Grid item className={classes.gridCustom}>
                                                            <Typography>
                                                                Publication prévue pour :
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item className={classes.gridCustom}>
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <DateTimePicker format="dd/MM/yyy HH:mm" value={new Date(poll.published_at)} onChange={handlePublishedDateChange}>

                                                                </DateTimePicker>
                                                            </MuiPickersUtilsProvider>
                                                        </Grid>
                                                        <Grid item className={classes.gridCustom}>
                                                            <Typography>
                                                                Dé-publication prévue pour :
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item className={classes.gridCustom}>
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <DateTimePicker format="dd/MM/yyy HH:mm" value={new Date(poll.depublished_at)} onChange={handleDepublishedDateChange}>

                                                                </DateTimePicker>
                                                            </MuiPickersUtilsProvider>
                                                        </Grid>
                                                    </Grid> : null}




                                        </Grid>
                                    </div>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={handleUpdate} variant="contained" color="primary" className={classes.button} startIcon={<SystemUpdateAltIcon />}>
                                    Modifier les informations
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item className={classes.gridCustom}>
                            <Card className={classes.cardCustom}>
                                <CardHeader
                                title="Zone dangereuse"
                                titleTypographyProps={{ align: 'left' }}
                                className={classes.cardHeader}
                                />
                                <CardContent>
                                    <div className={classes.cardContent}>
                                        <Typography variant="subtitle1" align="left" >
                                        En appuyant  sur le bouton, vous supprimez l'intégralité des données de ce formulaire et il ne sera pas possible de le restaurer.
                                        </Typography>

                                    </div>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => handleDelete(props.pollId)} variant="contained" className={classes.buttonDelete} startIcon={<DeleteIcon />}>
                                    Supprimer
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={3} direction="column" justify="center" alignItems="baseline">
                        <Grid item className={classes.gridCustom}>
                            <Card className={classes.cardCustom}>
                                <CardHeader
                                title="Accès au formulaire"
                                titleTypographyProps={{ align: 'left' }}
                                className={classes.cardHeader}
                                />
                                <CardContent>
                                    <div className={classes.cardContent}>
                                        <Typography variant="subtitle1" align="left" >
                                        Le formulaire est disponible sur le lien suivant : <br></br>
                                        <a href={poll.view_url}>{poll.view_url}</a>
                                        </Typography>

                                    </div>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => handleSee(props.pollId)} variant="contained" color="primary" className={classes.button} startIcon={<VisibilityIcon />}>
                                    Voir le formulaire
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item className={classes.gridCustom}>
                            <Card className={classes.cardCustom}>
                                <CardHeader
                                title="Télécharger le formulaire"
                                titleTypographyProps={{ align: 'left' }}
                                className={classes.cardHeader}
                                />
                                <CardContent>
                                    <div className={classes.cardContent}>
                                        <Typography variant="subtitle1" align="left" >
                                        Le formulaire est disponible au téléchargement sur le lien suivant : <br></br>
                                        <a href={poll.download_url}>{poll.download_url}</a>
                                        </Typography>
                                    </div>
                                </CardContent>
                                <CardActions>
                                  <a href={`${props.poll.download_url}`} download="poll.html" target="_blank">
                                    <Button onClick={handleDownload} variant="contained" color="primary" className={classes.buttonDownload} startIcon={<GetAppIcon />}>
                                    Télécharger le formulaire
                                    </Button>
                                  </a>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item className={classes.gridCustom}>
                            <Card className={classes.cardCustom}>
                                <CardHeader
                                title="Statistiques"
                                titleTypographyProps={{ align: 'left' }}
                                className={classes.cardHeader}
                                />
                                <CardContent>

                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => handleSeeStats(props.pollId)} variant="contained" color="primary" startIcon={<EqualizerIcon />}>
                                    Voir les statistiques.
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}


export default ({pollId}) =>{

    const [pollData, setPollData] = React.useState(null)

    React.useEffect(() => {
        if(pollId){
            (async () => {
                const data = await getSpecificPoll(pollId)
                const dataToPush = Object.assign({}, data)
                dataToPush.published_at = dataToPush.published_at || new Date()
                dataToPush.depublished_at = dataToPush.depublished_at || new Date()
                setPollData(dataToPush)
            })()
        }
    }, [pollId])

    console.log({pollData})
    return (
        <div>
            {
                pollData
                ? <VersionList poll={pollData} pollId={pollId} />
                : <p>Load</p>
            }
        </div>
    )
}