import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import appIcon from '../../assets/app_icon.png';
import Badge from '@mui/material/Badge';
import {mainPagePath, carAddPagePath, usersPagePath, reservationsPagePath, usersRentingsPagePath, changePasswordPagePath, carEditPagePath} from "../../shared/pagesPaths.ts";
const Navbar = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const user = {
    firstName: 'Jan',
    lastName: 'Kowalski',
  };

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  const navbarItems = [
    { pathname: mainPagePath, title: "Main Page" },
    { pathname: carAddPagePath, title: "Add Car" }, //admin
    { pathname: carEditPagePath, title: "Edit Cars" }, // admin
    { pathname: usersPagePath, title: "Users" }, // admin
    { pathname: reservationsPagePath , title: "Reservations" }, // admin
  ];

  const userSettings = [
    { title: 'Main Page', path: mainPagePath },
    { title: 'My Rents', path: usersRentingsPagePath },
    { title: 'Change Password', path: changePasswordPagePath },
    { title: 'Logout', path: '' }
  ];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

React.useEffect(() => {
  if (anchorElUser) {
    document.body.classList.add('lock-scroll');
  } else {
    document.body.classList.remove('lock-scroll');
  }
}, [anchorElUser]);

React.useEffect(() => {
  if (anchorElNav) {
    document.body.classList.add('lock-scroll');
  }
  else {
    document.body.classList.remove('lock-scroll');
  }
}, [anchorElNav]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" className="navbar">
      <Container maxWidth="xl" className="navbar-container">
        <Toolbar disableGutters className="navbar-toolbar">

          {isDesktop ? (
            <div className="navbar-logo-desktop">
              <img src={appIcon} alt="App Logo" className="logo-icon-desktop" />
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to={mainPagePath}
                className="logo-text-desktop"
              >
                CarRental
              </Typography>
            </div>
          ) : (
            <div className="navbar-mobile-header">
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleOpenNavMenu}
                color="inherit"
                className="navbar-menu-button"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                className="menu-appbar-mobile"
              >
                {navbarItems.map((item) => (
                  <MenuItem key={item.title} onClick={handleCloseNavMenu}>
                    <Typography
                      component={Link}
                      to={item.pathname}
                      className="menu-item-text"
                    >
                      {item.title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
              <img src={appIcon} alt="App Logo" className="logo-icon-mobile" />
              <Typography
                variant="h5"
                noWrap
                component={Link}
                to="/HomePage"
                className="logo-text-mobile"
              >
                CarRental
              </Typography>
            </div>
          )}

          {isDesktop && (
            <Box className="menu-buttons-desktop">
              {navbarItems.map((item) => (
                <Button
                  key={item.title}
                  component={Link}
                  to={item.pathname}
                  onClick={handleCloseNavMenu}
                  className="menu-button"
                >
                  {item.title}
                </Button>
              ))}
            </Box>
          )}

          {isDesktop && (
            <IconButton
              size="large"
              color="inherit"
              className="notifications-button"
            >
              <Badge badgeContent={12} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )}

          <Box className="navbar-user-settings">
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} className="user-avatar-button">
                <Avatar className="user-avatar">{initials}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              id="user-menu"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              className="user-menu"
            >
          
              {!isDesktop && (
                <MenuItem>
                  <Box display="flex" alignItems="center">
                    <NotificationsIcon style={{ marginRight: '8px' }} />
                    <Typography textAlign="center" className="user-menu-option-text">
                      Notifications
                    </Typography>
                  </Box>
                </MenuItem>
              )}
              {userSettings.map((setting) => (
                <MenuItem
                  key={setting.title}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting.title === 'Logout') {
                      //handleLogout();
                    } 
                    else {
                      window.location.href = setting.path;
                    }
                  }}
                >
                  <Box display="flex" alignItems="center">
                  {setting.title === 'My Profile' && <PersonIcon style={{ marginRight: '8px' }} />}
                  {setting.title === 'Logout' && <LogoutIcon style={{ marginRight: '8px' }} />}
                    <Typography textAlign="center" className="user-menu-option-text">
                      {setting.title}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;