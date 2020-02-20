import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    space:{
        height: '15px'
    }
  }));

  export default function RecoveryPasswordConfirmation() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.paper}>
            {/* Hero unit */}
            <Container maxWidth="sm" component="main">
                <Typography component="h3" variant="h4" align="center" color="textPrimary">
                    Récuperation de mot de passe
                </Typography>
                <div className={classes.space}></div>
                <Typography component="h4" variant="h5" align="center" color="textPrimary">
                    Nouveau mot de passe
                </Typography>
                <form className={classes.form} noValidate>         
                    <TextField id="newPassword" name="newPassword" label="Nouveau mot de passe" variant="outlined" margin="normal" required fullWidth autoFocus></TextField> 
                    <TextField id="confirmation" name="confirmation" label="Confirmation du mot de passe" variant="outlined" margin="normal" required fullWidth autoFocus></TextField>                              
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Confirmer</Button>                                
                </form>
            </Container>
            </div>            
        </React.Fragment>
    );
}