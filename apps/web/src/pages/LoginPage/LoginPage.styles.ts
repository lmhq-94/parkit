import { SxProps, Theme } from '@mui/material';

export const loginPageStyles = {
  container: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } as SxProps<Theme>,

  avatar: {
    m: 1,
    bgcolor: 'secondary.main',
  } as SxProps<Theme>,

  paper: {
    mt: 3,
    p: 4,
    width: '100%',
  } as SxProps<Theme>,

  alert: {
    mb: 2,
  } as SxProps<Theme>,

  submitButton: {
    mt: 3,
    mb: 2,
  } as SxProps<Theme>,

  credentialsBox: {
    mt: 2,
  } as SxProps<Theme>,
};
