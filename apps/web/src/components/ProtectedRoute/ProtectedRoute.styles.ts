import { SxProps, Theme } from '@mui/material';

export const protectedRouteStyles = {
  // Loading state
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
  } as SxProps<Theme>,

  // Error states
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
  } as SxProps<Theme>,

  errorIcon: {
    fontSize: 64,
    color: 'error.main',
    mb: 2,
  } as SxProps<Theme>,

  errorMessage: {
    mb: 3,
  } as SxProps<Theme>,
};
