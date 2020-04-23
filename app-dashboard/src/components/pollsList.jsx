import React from 'react';

import { getPolls } from '../utils/Requests'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  button:{
    margin: theme.spacing(1)
  },
  header: {
    padding: 10
  },
  favButton:{
    borderRadius: 10
  }
}));

const http = require('http');

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator, search) {
  if(search != null && search != '')
  {
    array = array.filter( element => element.name.toLowerCase().includes(search.toLowerCase()) || element.description.toLowerCase().includes(search.toLowerCase()));
  }
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function SimpleTable() {
  const classes = useStyles();
  const [search, setSearch] = React.useState();
  const [polls, setPolls] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  }

  function handleNewPoll(){
    //ajouter redirection vers la page de creation
  }

  function handleSeePoll(id){
    //ajouter redirection vers la page de poll
  }

  React.useEffect(() => {
    getPolls()
    // http.get('http://www.mocky.io/v2/5e9b7b133300009432bf17b9', (res) => {
    //   res.setEncoding('utf8')
    //   res.on('data', function(body){
    //    setPolls(JSON.parse(body));
    //   })
    // });
  }, [])

  function IsPublished(pollIsPublished){
    if(pollIsPublished == true)
      return "Non";
    else
      return "Oui";
  }

  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Grid container className={classes.header}>
              <Grid item xs={3}>
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                  Liste des Formulaires
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth size="small" id="outlined-search" label="Search field" type="search" variant="outlined" value={search} onChange={handleChangeSearch}/>
              </Grid>
              <Grid item xs={3} align="center">
              <Fab className={classes.favButton} variant="extended" color="primary" aria-label="add" onClick={() => handleNewPoll()} style={{position: 'fixed'}}>
                <AddBoxIcon />
                  Nouveau
              </Fab>

              </Grid>
            </Grid>

            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nom</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Brouillon ?</TableCell>
                    <TableCell align="center">Publication ?</TableCell>
                    <TableCell align="center">Dernière modification</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {stableSort(polls, getComparator(order, orderBy), search)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((poll, index) => (
                    <TableRow key={poll.name}>
                      <TableCell align="center" component="th" scope="row">
                        {poll.name}
                      </TableCell>
                      <TableCell align="center">{poll.description}</TableCell>
                      <TableCell align="center">{IsPublished(!poll.is_published)}</TableCell>
                      <TableCell align="center">{IsPublished(poll.is_published)}</TableCell>
                      <TableCell align="center">{poll.updated_at}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => handleSeePoll(poll.id)} variant="contained" color="primary" className={classes.button} startIcon={<VisibilityIcon />}>
                          Voir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={polls.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
      </Paper>
    </div>
  );
}