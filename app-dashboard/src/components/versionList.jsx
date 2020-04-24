import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Link from 'next/link'

import { getVersionsPoll, deleteVersion } from '../utils/Requests'

import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';
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
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';

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
  },
  deleteBtn:{
    color: "#fff",
    backgroundColor: red[500]
  },
  dlBtn:{
    color: "#fff",
    backgroundColor: teal['A700']
  }
}));

// function convertDate(a){
//   var dateParts = a.split("/");
//   return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
// }

// function descendingComparator(a, b, orderBy) {
//     console.log({a,b})
//   if (convertDate(b[orderBy]) < convertDate(a[orderBy])){
//     return -1;
//   }
//   if (convertDate(b[orderBy]) > convertDate(a[orderBy])) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator, search) {
//   if(search != null && search != '')
//   {
//     array = array.filter( element => element.created_at.toLowerCase().includes(search.toLowerCase()) );
//   }
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }



function VersionList(props) {
  const classes = useStyles();
  const [search, setSearch] = React.useState();
  const [versions, setVersions] = React.useState(props.versions);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('created_at');


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

//   function handleNewVersion(){
//     //ajouter redirection vers la page de creation
//   }

//   function handleSeeVersion(id){
//     //ajouter redirection vers la page de poll
//     console.log(props.pollId);
//   }

//   function handleDownloadVersion(id){
//     //ajouter redirection vers la page de poll
//   }



//   function handleCreateWithVersion(id){
//     //ajouter redirection vers la page de poll
//   }

  async function handleDeleteVersion(id){
    //ajouter redirection vers la page de poll
    await deleteVersion(props.pollId, id)
    const versions = await getVersionsPoll(props.pollId)
    await setVersions(versions)
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
                  Liste des Versions
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth size="small" id="outlined-search" label="Search field" type="search" variant="outlined" value={search} onChange={handleChangeSearch}/>
              </Grid>
              <Grid item xs={3} align="center">
                <Link href={`/new-version?id=${props.pollId}`}>
              <Fab className={classes.favButton} variant="extended" color="primary" aria-label="add" style={{position: 'fixed'}}>
                <AddBoxIcon />
                  Nouvelle version
              </Fab>
                </Link>

              </Grid>
            </Grid>

            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Version</TableCell>
                    <TableCell align="center">Date de creation</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {versions
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((version, index) => (
                    <TableRow key={version.name}>
                      <TableCell align="center" component="th" scope="row">
                        {version.name}
                      </TableCell>
                      <TableCell align="center">{version.created_at}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => handleSeeVersion(version.id)} variant="contained" color="primary" className={classes.button} startIcon={<VisibilityIcon />}>
                          Voir
                        </Button>
                        <Button onClick={() => handleDownloadVersion(version.id)} variant="contained" className={classes.dlBtn} startIcon={<GetAppIcon />}>
                          Télécharger
                        </Button>
                        <Link href={`/modify-formulaire?id=${version.id}&pollId=${props.pollId}`}>
                        <Button variant="contained" className={classes.button} startIcon={<AddBoxIcon />}>
                          Créer à partir de
                        </Button>
                        </Link>
                        <Button disabled={version.active} onClick={() => handleDeleteVersion(version.id)} variant="contained" color="" className={classes.deleteBtn} startIcon={<DeleteIcon />}>
                          Supprimer
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
              count={versions.length}
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

export default ({pollId}) => {
    const [versions, setVersions] = React.useState(null);

    React.useEffect(() => {
        if(pollId){
            (async () => {
                const data = await getVersionsPoll(pollId)
                console.info({data})
                setVersions(data)
            })()
        }
    }, [pollId])

    return (
        <div>
            {versions
                ? <VersionList versions={versions} pollId={pollId} />
                : <p>Load</p>
            }
        </div>
    )
}