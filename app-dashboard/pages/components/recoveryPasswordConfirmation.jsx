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
  }));

  export default function RecoveryPasswordConfirmation() {
    const classes = useStyles();

    const [pass1, setPass1] = React.useState('');
    const [pass2, setPass2] = React.useState('');
    const [error, setError] = React.useState(true);

    const verifyPassword = () => {
      if(pass1 != pass2 || pass1 == null || pass2 == null)
        setError(false)
      else
        setError(true) 
      console.log( 'Password1:', pass1, 'Password2: ', pass2, 'Error: ', error); 
    }


    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.paper}>
            {/* Hero unit */}
            <Container maxWidth="sm" component="main">
                <Typography component="h3" variant="h4" align="center" color="textPrimary">
                    Récuperation de mot de passe
                </Typography>
                <form className={classes.form} noValidate>         
                    <TextField error={!error} onBlur={({target})=>{setPass1(target.value)}} id="newPassword" name="newPassword" label="Nouveau mot de passe" variant="outlined" margin="normal" required fullWidth autoFocus></TextField> 
                    <TextField error={!error} onBlur={({target})=>{setPass2(target.value)}} id="confirmation" name="confirmation" label="Confirmation du mot de passe" variant="outlined" margin="normal" required fullWidth autoFocus></TextField>   
                    {!error ? 
                      <Typography component="h4" variant="h5" align="center" color="error">
                      Mot de passe incorrect.
                      </Typography> 
                      : <span></span> 
                      
                    }
                    <Button fullWidth variant="contained" color="primary" onClick={() => verifyPassword()} className={classes.submit}>Confirmer</Button>                            
                </form>
            </Container>
            </div>            
        </React.Fragment>
    );
}