import styled from '@emotion/styled';
import {
  Badge,
  Box,
  Button,
  IconButton,
  List,
  Popover as MuiPopover,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

const Popover = styled(MuiPopover)`
  .MuiPaper-root {
    width: 300px;
    ${props => props.theme.shadows[1]};
    border: 1px solid ${props => props.theme.palette.divider};
  }
`;

const Indicator = styled(Badge)`
  .MuiBadge-badge {
    background: ${props => props.theme.header.indicator.background};
    color: ${props => props.theme.palette.common.white};
  }
`;

const NotificationHeader = styled(Box)`
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.palette.divider};
`;

function NavbarNotificationsDropdown() {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Tooltip title='Notifications'>
        <IconButton color='inherit' ref={ref} onClick={handleOpen} size='large'>
          <Indicator badgeContent={7}></Indicator>
        </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <NotificationHeader p={2}>
          <Typography variant='subtitle1' color='textPrimary'>
            7 New Notifications
          </Typography>
        </NotificationHeader>
        <React.Fragment>
          <List disablePadding></List>
          <Box p={1} display='flex' justifyContent='center'>
            <Link href='/'>
              <Button size='small'>Show all notifications</Button>
            </Link>
          </Box>
        </React.Fragment>
      </Popover>
    </React.Fragment>
  );
}

export default NavbarNotificationsDropdown;
