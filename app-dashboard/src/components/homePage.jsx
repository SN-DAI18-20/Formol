import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  gridCustom: {
    height:'100%'
  },
  cardCustom:{
    height:'100%'
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: theme.spacing(2),
    height: '100px'
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: 'Creation',
    price: '0',
    description: [
      'Créer vos questionnaires peronnalisés.'
    ],
    buttonText: 'Créer',
    link: 'create-formulaire',
    buttonVariant: 'outlined',
  },
  {
    title: 'Modification',
    //subheader: 'Most popular',
    price: '15',
    description: [
      'Modifier vos questionnaires.'
    ],
    buttonText: 'Modifier',
    buttonVariant: 'outlined',
  },
  {
    title: 'Liste',
    price: '30',
    link: 'formulaires',
    description: [
      'Liste de tous les questionnaire déjà créés.'
    ],
    buttonText: 'Afficher',
    buttonVariant: 'outlined',
  },
];

export default function Index() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Formol
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Formol est est un outil simple de création de questionnaires personnalisables pour vos besoins
          d'informations et d'avis.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="stretch" className={classes.gridCustom}>
          {tiers.map(tier => (
            <Grid item key={tier.title} xs={12} md={4}>
              <Card className={classes.cardCustom}>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardContent}>
                    <ul>
                      {tier.description.map(line => (
                        <Typography component="li" variant="subtitle1" align="center" key={line}>
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardActions>
                  <a style={{ textDecoration: 'none' }} href={tier.link}>
                    <Button fullWidth variant={tier.buttonVariant} color="primary">
                      {tier.buttonText}
                    </Button>
                  </a>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
