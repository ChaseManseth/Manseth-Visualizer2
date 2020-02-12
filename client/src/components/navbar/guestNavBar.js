// Author: Chase Manseth
// Date: 2/6/2020
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, CssBaseline, Typography,
Divider, IconButton, ListItem, ListItemIcon, ListItemText, Icon } from '@material-ui/core';
import { ChevronLeft, ChevronRight, Menu } from '@material-ui/icons';
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Page Imports
import Home from '../../pages/home/home';
import Register from '../../pages/register';
import Login from '../../pages/login';


const drawerWidth = 240;

// Styles
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // backgroundColor: '#202225',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(5) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  brand: {
      textDecoration: 'none',
      color: 'white',
      '&:hover': {
          color: 'white',
      },
  }
}));


// Main NavBar Function
// TODO: Might want to break it into subsections
export default function GuestNavBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Top NavBar */}
      <AppBar
        color='inherit'
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.brand}
            component={Link} 
            to={'/'}
          >
            Manseth Visualizer
          </Typography>
        </Toolbar>
      </AppBar>
    
      {/* Side NavBar or Drawer */}
    <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
        })}
        classes={{
        paper: clsx({
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
        }),
        }}
    >
        <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRight style={{color: 'white'}} /> : <ChevronLeft style={{color: 'white'}}/>}
            </IconButton>
        </div>
        <Divider />

        {/* The Name of Buttons */}
        <List>
            {/* Register */}
            <ListItem button
                component={Link} 
                to={'/register'}
            >
                <ListItemIcon>
                    <Icon className="fas fa-user"></Icon>
                </ListItemIcon>
                <ListItemText>Register</ListItemText>
            </ListItem>

            {/* Login */}
            <ListItem button
                component={Link} 
                to={'/login'}
            >
                <ListItemIcon>
                    <Icon className="fas fa-sign-in-alt"></Icon>
                </ListItemIcon>
                <ListItemText>Login</ListItemText>
            </ListItem>
        </List>
    </Drawer>


    {/* Main Content */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        
        {/* Everything In Here should be the content and or Routes */}
            {/* All Routes from / */}
            <Switch>
                <Route exact path="/login" render = {(props) => <Login {...props}/>} />
                <Route exact path="/register" render = {(props) => <Register {...props}/>} />
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>

      </main>
    </div>
  );
}