import React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import { logout } from '../../../services/userService';
const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function MenuDrawer() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(open);
    };

    const logoutHandler = () => {
        logout()
            .then((res) => {
                
            })
            .catch(error => {
                console.log(error);
            });
    }

    const list = (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button key={'profile'}>
                    <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                    <ListItemText primary={'Профил'} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={logoutHandler} key={'logout'}>
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText primary={'Излез'} />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment key={'right'}>
                <Button color="inherit" onClick={toggleDrawer(true)}><MenuIcon /></Button>
                <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
                    {list}
                </Drawer>
            </React.Fragment>
        </div>
    );
}