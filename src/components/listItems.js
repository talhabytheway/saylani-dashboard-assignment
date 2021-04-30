import React from 'react';
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  ExitToApp as ExitToAppIcon,
  Dashboard as DashboardIcon,
  VpnKey as VpnKeyIcon,
  Person as PersonIcon,
  People as PeopleIcon,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

const mainListItems = (
  <div>
    <Link
      style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}
      to="/dashboard"
    >
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Divider />
    <Link
      style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}
      to="/"
    >
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </Link>
    <Link
      style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}
      to="/roles"
    >
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Roles" />
      </ListItem>
    </Link>
    <Link
      style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}
      to="/permissions"
    >
      <ListItem button>
        <ListItemIcon>
          <VpnKeyIcon />
        </ListItemIcon>
        <ListItemText primary="Permissions" />
      </ListItem>
    </Link>
    <Divider />
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);

export default mainListItems;
