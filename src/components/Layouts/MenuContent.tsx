import * as React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import { FaUsers } from 'react-icons/fa';

// Itens de menu
const mainListItemsHome = [
    { text: 'Home', icon: <HomeRoundedIcon />, link: '/home' },
];

const mainListItemsAdministrator = [
    { text: 'Users', icon: <FaUsers />, link: '/admin/users' },
];

const secondaryListItems = [
    { text: 'Settings', icon: <SettingsRoundedIcon />, link: '/settings' },
    { text: 'About', icon: <InfoRoundedIcon />, link: '/about' },
    { text: 'Feedback', icon: <HelpRoundedIcon />, link: '/feedback' },
];

export default function MenuContent() {
    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {/* HOME */}
                <ListSubheader component="div" sx={{ fontWeight: 'bold' }}>
                    HOME
                </ListSubheader>
                {mainListItemsHome.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: 'block' }}
                    >
                        <ListItemButton component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider />

                {/* ADMINISTRADOR */}
                <ListSubheader component="div" sx={{ fontWeight: 'bold' }}>
                    ADMINISTRADOR
                </ListSubheader>
                {mainListItemsAdministrator.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: 'block' }}
                    >
                        <ListItemButton component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: 'block' }}
                    >
                        <ListItemButton component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}
