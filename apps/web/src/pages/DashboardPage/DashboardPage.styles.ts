import { SxProps, Theme } from '@mui/material';

export const dashboardPageStyles = {
  container: {
    p: 3,
  } as SxProps<Theme>,

  title: {
    mb: 3,
  } as SxProps<Theme>,

  alert: {
    mb: 3,
  } as SxProps<Theme>,

  statsGrid: {
    mb: 4,
  } as SxProps<Theme>,

  card: {
    height: '100%',
  } as SxProps<Theme>,

  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as SxProps<Theme>,

  cardIcon: {
    backgroundColor: 'primary.main',
    borderRadius: '50%',
    p: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as SxProps<Theme>,

  contentGrid: {
    mb: 3,
  } as SxProps<Theme>,

  paper: {
    p: 3,
    height: '100%',
  } as SxProps<Theme>,

  listItem: {
    borderBottom: 1,
    borderColor: 'divider',
  } as SxProps<Theme>,
};
