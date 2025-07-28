import { SxProps, Theme } from '@mui/material';

const drawerWidth = 240;

export const layoutStyles = {
  // User info section
  userInfoContainer: {
    p: 2,
    borderBottom: 1,
    borderColor: 'divider',
  } as SxProps<Theme>,

  userAvatar: {
    width: 40,
    height: 40,
    mr: 2,
  } as SxProps<Theme>,

  // Main layout
  mainContainer: {
    display: 'flex',
  } as SxProps<Theme>,

  // AppBar
  appBar: {
    width: { md: `calc(100% - ${drawerWidth}px)` },
    ml: { md: `${drawerWidth}px` },
  } as SxProps<Theme>,

  menuButton: {
    mr: 2,
    display: { md: 'none' },
  } as SxProps<Theme>,

  title: {
    flexGrow: 1,
  } as SxProps<Theme>,

  headerAvatar: {
    width: 32,
    height: 32,
  } as SxProps<Theme>,

  // Navigation drawer
  navContainer: {
    width: { md: drawerWidth },
    flexShrink: { md: 0 },
  } as SxProps<Theme>,

  // Mobile drawer
  mobileDrawer: {
    display: { xs: 'block', md: 'none' },
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: drawerWidth,
    },
  } as SxProps<Theme>,

  // Desktop drawer
  desktopDrawer: {
    display: { xs: 'none', md: 'block' },
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: drawerWidth,
    },
  } as SxProps<Theme>,

  // Main content
  mainContent: {
    flexGrow: 1,
    p: 3,
    width: { md: `calc(100% - ${drawerWidth}px)` },
  } as SxProps<Theme>,
};
