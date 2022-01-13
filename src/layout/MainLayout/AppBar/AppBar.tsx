import * as React from 'react';

// material core
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

// material icon
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// stypes
import useStyles from './styles';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: `${process.env.REACT_APP_DRAWER_WIDTH}px`,
    width: `calc(100% - ${process.env.REACT_APP_DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type IProps = {
  open: boolean;
  handleDrawerOpen: () => void;
};

const PrimaryAppBar = ({ open = false, handleDrawerOpen }: IProps) => {
  const classes = useStyles();
  const menuId = 'primary-search-account-menu';
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorLanguage, setAnchorLanguage] = React.useState<null | HTMLElement>(null);
  const [language, setLanguage] = React.useState<string>(process.env.REACT_APP_LANGUAGE);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorLanguage(event.currentTarget);
  };

  const handleCloseLanguage = () => {
    setAnchorLanguage(null);
  };

  const handleChangeLanguage = (language: string) => () => {
    setLanguage(language);
    setAnchorLanguage(null);
  };

  const renderTextLanguage = () => {
    switch (language) {
      case 'en': {
        return 'ENGLISH';
      }
      case 'vn': {
        return 'VIETNAMESE';
      }
      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Internal Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
              className={classes.menuLanguage}
              aria-controls="simple-menu"
              title="Change Language"
              aria-haspopup="true"
              onClick={handleOpenLanguage}
            >
              {renderTextLanguage()} <ExpandMoreIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorLanguage}
              keepMounted
              open={Boolean(anchorLanguage)}
              onClose={handleCloseLanguage}
            >
              <MenuItem selected={language === 'en'} onClick={handleChangeLanguage('en')}>
                English
              </MenuItem>
              <MenuItem selected={language === 'vn'} onClick={handleChangeLanguage('vn')}>
                Vietnamese
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <div className={classes.name}>Tony Nguyen</div>
        <Divider />
        <MenuItem>Change password</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default PrimaryAppBar;
