import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import ModeSwitch from '../ModeSwitch/ModeSwitch';

export default function MainAppBar({ itemsCount }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: '999',
        }}
        className="app-bar"
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 0, display: { sm: 'block' } }}
            >
              Messages
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        anchor={'left'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box className="app-bar__drawer" role="presentation">
          <Box
            role="presentation"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.5rem 0 0.5rem 1rem',
            }}
          >
            <Typography variant="h6" noWrap component="div">
              Settings
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="close drawer"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box role="presentation" sx={{ padding: '1.5rem 1rem' }}>
            <ModeSwitch />
          </Box>
          <Divider />
          <Box role="presentation" sx={{ padding: '1rem' }}>
            <Typography variant="h6" noWrap component="p">
              Total messages loaded: {itemsCount}
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
