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
import ListSubheader from '@mui/material/ListSubheader'; // Importa ListSubheader
import { FaUsers } from 'react-icons/fa';
import { TbCashRegister } from 'react-icons/tb';
import { LuBox } from 'react-icons/lu';
import { MdOutlineDeliveryDining, MdOutlineMoveToInbox, MdOutlineOutbox } from 'react-icons/md';

// Itens de menu
const mainListItemsHome = [
    { text: 'Home', icon: <HomeRoundedIcon />, link: '/home' },
];

const mainListItemsPos = [
    { text: 'Sale', icon: <TbCashRegister />, link: '/pos' },
    { text: 'Customers', icon: <FaUsers />, link: '/customers' },
];

const mainListItemsStock = [
    { text: 'Items', icon: <LuBox />, link: '/pos' },
    { text: 'Stock Entry', icon: <MdOutlineMoveToInbox />, link: '/stock-entry' },
    { text: 'Stock Exit', icon: <MdOutlineOutbox />, link: '/stock-exit' },
];

const mainListItemsDelivery = [
    { text: 'Delivery', icon: <MdOutlineDeliveryDining />, link: '/deliveries' },
];

const mainListItemsAdministrator = [
    { text: 'Users', icon: <FaUsers />, link: '/users' },
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
                <ListSubheader component="div" sx={{ fontWeight: 'bold' }}>HOME</ListSubheader>
                {mainListItemsHome.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider />

                {/* POS */}
                <ListSubheader component="div" sx={{ fontWeight: 'bold' }}>POS</ListSubheader>
                {mainListItemsPos.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider />

                {/* STOCK */}
                <ListSubheader component="div" sx={{ fontWeight: 'bold' }}>STOCK</ListSubheader>
                {mainListItemsStock.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider />

                {/* DELIVERY */}
                <ListSubheader component="div" sx={{ fontWeight: 'bold' }}>DELIVERY</ListSubheader>
                {mainListItemsDelivery.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider />

                {/* ADMINISTRADOR */}
                <ListSubheader component="div" sx={{ fontWeight: 'bold' }}>ADMINISTRADOR</ListSubheader>
                {mainListItemsAdministrator.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
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
