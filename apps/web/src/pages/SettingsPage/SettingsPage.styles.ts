import { SxProps, Theme } from '@mui/material/styles';

export const SettingsPageStyles = {
  container: {
    padding: 2,
  },
  title: {
    marginBottom: 2,
  },
  alert: {
    marginBottom: 3,
  },
  card: {
    height: '100%',
  },
  cardContent: {
    padding: 2,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 2,
  },
  icon: {
    marginRight: 1,
    color: 'primary.main',
  },
  formControl: {
    width: '100%',
  },
  themeInfo: {
    marginTop: 2,
    fontStyle: 'italic',
  },
  gridContainer: {
    spacing: 2,
  },
  gridItem: {
    marginBottom: 1,
  },
  label: {
    color: 'text.secondary',
  },
  value: {
    fontWeight: 'medium',
  },
  buttonContainer: {
    marginTop: 3,
  },
  button: {
    marginRight: 2,
  },
} as const;

export type SettingsStyles = typeof SettingsPageStyles;
