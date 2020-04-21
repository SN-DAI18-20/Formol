import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import MenuIcon from '@material-ui/icons/Menu'

import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

export const Layout = ({children}) => {

  const classes = useStyles()

  const [anchorElement, setAnchorElement] = React.useState(null)
  const openMenu = event => setAnchorElement(event.currentTarget)
  const closeMenu = () => setAnchorElement(null)

  return (
    <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={openMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon/>
            </IconButton>
            <Menu id="simple-menu" open={Boolean(anchorElement)} onClose={closeMenu} anchorEl={anchorElement}>
              <a className={classes.link} href="/">
                <MenuItem children="Accueil" onClick={closeMenu}/>
              </a>
              <a className={classes.link} href="/create-poll">
                <MenuItem children="Créer" onClick={closeMenu}/>
              </a>
              <a className={classes.link} href="/modify-poll">
                <MenuItem children="Modifier" onClick={closeMenu}/>
              </a>
              <a className={classes.link} href="/list-poll">
                <MenuItem children="Liste" onClick={closeMenu}/>
              </a>
            </Menu>
            <a className={`${classes.link} ${classes.title}`} href="/">
              <Typography variant="h6" children="Formol" />
            </a>
            <a className={classes.link} href="/login" children={<Button color="inherit">Login</Button>} />
          </Toolbar>
        </AppBar>
      <div>
        {children}
      </div>
    </div>
  );
};