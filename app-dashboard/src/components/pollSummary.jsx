import 'date-fns';  
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const http = require('http');

export default function versionList(props) {
    const classes = useStyles();
    const [poll, setPoll] = React.useState({
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "description": "string",
        "draft": true,
        "view_url": "string",
        "download_url": "string",
        "version": {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "name": "string"
        },
        "published_at": "2020-04-23T13:28:30.116Z",
        "depublished_at": "2020-04-23T23:28:30.116Z",
        "created_at": "string",
        "updated_at": "string"
      });
    const [show, setShow] = React.useState(false);
    const [statePoll, setStatePoll] = React.useState(5);

    React.useEffect(() => {
        //décommenter et changer l'url pour l'api, id du formule dans props.pollId
        /*http.get('http://www.mocky.io/v2/5e68e2b02f00000498d8b08e', (res) => {
          res.setEncoding('utf8')  
          res.on('data', function(body){
            setPoll(JSON.parse(body));    
          })  
        });*/

        if(new Date() < new Date(poll.published_at) || poll.draft == false)
            setShow(true);


        if(poll.draft == true){
            setStatePoll(1);
            console.log("test 1 " + statePoll);
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
            console.log("show " + show);
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
         console.log(show);
        
    }

    const handleChangeName = (event) => {
        setPoll({...poll, name:event.target.value});
        console.log(poll.name);
    }

    const handleChangeDescription = (event) => {
        setPoll({...poll, description:event.target.value});
        console.log(poll.description);
    }

    const handlePublishedDateChange = (date) => {
        setPoll({...poll, published_at:date.toISOString()})
        console.log(poll.published_at);
    };

    const handleDepublishedDateChange = (date) => {
        setPoll({...poll, depublished_at:date.toISOString()})
        console.log(poll.depublished_at);
    };

    function handleUpdate(id){
        //request update des informations du formualire
        console.log(poll);
    }

    function handleDelete(id){
        //ajouter redirection vers la page de poll
    }

    function handleDownload(id){
        //ajouter redirection vers la page de poll
    }

    function handleSee(id){
        //ajouter redirection vers la page de poll
        console.log(props.pollId);
    }

    function handleSeeStats(id){
        //ajouter redirection vers la page des statistiques de la poll
        console.log(props.pollId);
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
                                    <Button onClick={() => handleUpdate(props.pollId)} variant="contained" color="primary" className={classes.button} startIcon={<SystemUpdateAltIcon />}>
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
                                    <Button onClick={() => handleDownload(props.pollId)} variant="contained" color="primary" className={classes.buttonDownload} startIcon={<GetAppIcon />}>
                                    Télécharger le formulaire
                                    </Button>
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

