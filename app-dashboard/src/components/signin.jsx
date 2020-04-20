import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Index() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.paper}>
            {/* Hero unit */}
            <Container maxWidth="sm" component="main">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Formol
              </Typography>
              <form className={classes.form} noValidate>         
                <TextField id="login" name="login" label="Login" variant="outlined" margin="normal" required fullWidth autoFocus></TextField>                
                <TextField id="password" name="password" label="Password" variant="outlined" type="password" margin="normal" required fullWidth autoFocus></TextField>                
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Se souvenir de moi."/>                 
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Login</Button>                                
                <Grid container spacing={1}>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                    Mot de passe oublié ?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                    {"Vous n'avez pas de compte? Inscrivez-vous."}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Container>
            </div>            
        </React.Fragment>
    );
}

