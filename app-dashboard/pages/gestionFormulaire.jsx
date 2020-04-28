import React from 'react';
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';

import { Layout } from '../src/components/Layout'
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PollSummary from '../src/components/pollSummary'
import ListVersion from '../src/components/versionList'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export default function gstionFormulaire() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [pollID, setPollID] = React.useState(null)

  const router = useRouter()
  const { id, goToVersion } = router.query

  React.useEffect(() => {
    if(id){
        setPollID(id)
    }
    if(goToVersion === "true"){
        setValue(1)
    }
  }, [router])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
      <Layout>

    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          >
          <Tab label="Général" {...a11yProps(0)} />
          <Tab label="Version" {...a11yProps(1)} />
          <Tab label="Utilisateur" {...a11yProps(2)} />
          <Tab label="Statistiques" {...a11yProps(3)}></Tab>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        >
        <TabPanel value={value} index={0} dir={theme.direction}>
            <PollSummary pollId={pollID}></PollSummary>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <ListVersion pollId={pollID}></ListVersion>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
            Utilisateurs
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
            Statistiques
        </TabPanel>
      </SwipeableViews>
    </div>
        </Layout>
  );
}