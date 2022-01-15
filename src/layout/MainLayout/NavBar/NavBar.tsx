import { useNavigate } from 'react-router-dom';

// material core
import List from '@mui/material/List';

// material icons
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';

// configs
import { PATH_NAME } from 'configs';

const NavBar = () => {
  const navigate = useNavigate();

  const handleGoTo = (path: string) => () => {
    navigate(path);
  };

  let abc = 13;
  let aa = null;

  return (
    <>
      <List>
        <ListItem button onClick={handleGoTo(PATH_NAME.EMPLOYER)}>
          <ListItemIcon>
            <PersonOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Employes" />
        </ListItem>
        <ListItem button onClick={handleGoTo(PATH_NAME.EMPLOYEES)}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Members" />
        </ListItem>
        <ListItem button onClick={handleGoTo(PATH_NAME.USER_MANAGEMENT)}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="User Management" />
        </ListItem>
      </List>
    </>
  );
};

export default NavBar;
