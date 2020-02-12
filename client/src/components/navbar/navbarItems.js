import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Icon } from '@material-ui/core';
import { observer } from 'mobx-react';
import cookie from 'react-cookies';

// Importing global state
import {globalState} from '../../state/globalState';

const NavBarItems = observer(class NavBarItems extends React.Component {
    constructor(props) {
        super(props);
    }

    // Logs out the user
    logout = () => {
        // Delete the cookie and clear the global state
        cookie.remove('JWT', { path: '/' });
        globalState.appState.user = null;
        globalState.appState.jwt = null;

        // Redirect to the home page
        // this.props.history.push('/');
    }

    render() {
        if(globalState.appState.jwt === null) {
            return(
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
            );
        }

        else {
            return (
                <List>
                    {/* Login */}
                    <ListItem button onClick={() => this.logout()}>
                        <ListItemIcon>
                            <Icon className="fas fa-sign-in-alt"></Icon>
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </ListItem>
                </List>
            );
        }
    }

});

export default NavBarItems;