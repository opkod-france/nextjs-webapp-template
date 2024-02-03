import styled from '@emotion/styled';
import FaceIcon from '@mui/icons-material/Face';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  IconButton as MuiIconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { signOut } from 'next-auth/react';
import React, { SyntheticEvent } from 'react';

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const NavbarUserDropdown = () => {
  const [anchorMenu, setAnchorMenu] = React.useState<HTMLElement | null>(null);
  const toggleMenu = (event: SyntheticEvent<HTMLButtonElement>) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  return (
    <>
      <Tooltip title="Compte">
        <IconButton
          aria-owns={anchorMenu ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
          size="large"
        >
          <FaceIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem
          onClick={() => {
            signOut();
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Se déconnecter</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavbarUserDropdown;
