import React, { useEffect, useState } from 'react';
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
import { apiRequest } from '../../shared/APIManagement';

import appIcon from '../../assets/app_icon.png';
import Badge from '@mui/material/Badge';
import {mainPagePath, carAddPagePath, usersPagePath, reservationsPagePath, usersRentingsPagePath, changePasswordPagePath, carEditPagePath} from "../../shared/pagesPaths.ts";
import NotificationsModal from './NotificationsModal.tsx';
const Navbar = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('access_token'));
  }, []);

  const [user, setUser] = useState<{ firstName: string; lastName: string; role: string }>({
    firstName: '',
    lastName: '',
    role: '',
  });

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('access_token'));
    setUser({
      firstName: localStorage.getItem('user_first_name') || '',
      lastName: localStorage.getItem('user_last_name') || '',
      role: localStorage.getItem('user_role') || '',
    });
  }, []);

const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

const [notificationsOpen, setNotificationsOpen] = React.useState(false);
const [notifications] = React.useState([
  'Twoja rezerwacja została zatwierdzona.',
  'Samochód XYZ jest już gotowy do odbioru.',
  'Termin przeglądu pojazdu ABC zbliża się.',
  'Zbliża się koniec wypożyczenia auta 123.',
  'Zbliża się koniec wypożyczenia auta 123.',
  'Zbliża się koniec wypożyczenia auta 123.',
  'Zbliża się koniec wypożyczenia auta 123.',
  'Zbliża się koniec wypożyczenia auta 123.',
  'Zbliża się koniec wypożyczenia auta 123.',
  'Zbliża się koniec wypożyczenia auta 123.',
  'Zbliża się koniec wypożyczenia auta 123.',
  'Zbliża się koniec wypożyczenia auta 123.',
  'Zbliża się koniec wypożyczenia auta 123.',
  'Zbliża się koniec wypożyczenia auta 123.',
]);

  const navbarItems = [
    { pathname: mainPagePath, title: "Main Page" },
    ...(user.role === "ADMIN"
      ? [
          { pathname: carAddPagePath, title: "Add Car" },
          { pathname: carEditPagePath, title: "Edit Cars" },
          { pathname: usersPagePath, title: "Users" },
          { pathname: reservationsPagePath, title: "Reservations" },
        ]
      : []),
  ];

const handleLogout = async () => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    try {
      await apiRequest(
        'POST',
        'auth/logout',
        null,
        { Authorization: `Bearer ${accessToken}` }
      );
    } catch (e) {
      // Możesz obsłużyć błąd, np. wyświetlić komunikat
    }
  }
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  window.location.href = '/login';
};

  const userSettings = [
    { title: 'Main Page', path: mainPagePath },
    { title: 'My Rents', path: usersRentingsPagePath },
    { title: 'Change Password', path: changePasswordPagePath },
    { title: 'Logout', path: '', action: handleLogout },
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

        {isLoggedIn ? (
          <>
          {isDesktop && (
            <IconButton
              size="large"
              color="inherit"
              className="notifications-button"
              onClick={() => setNotificationsOpen(true)}
            >
              <Badge badgeContent={notifications.length} color="error">
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
                      handleLogout();
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
          </>
          ) : (
            <Box className="navbar-auth-buttons" sx={{ display: 'flex', gap: 2, ml: 2 }}>
              <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to="/login"
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/register"
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
      <NotificationsModal
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
      />
    </AppBar>
  );
};

export default Navbar;