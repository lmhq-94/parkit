import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  section: {
    marginTop: 8,
  },
  listItem: {
    borderRadius: 8,
    marginVertical: 2,
  },
  selectedItem: {
    backgroundColor: 'rgba(25, 118, 210, 0.1)',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 20,
    marginRight: 12,
  },
  languageName: {
    fontSize: 16,
  },
  themeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  themeName: {
    fontSize: 16,
  },
  selected: {
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: 18,
  },
  themeInfo: {
    marginTop: 8,
    fontStyle: 'italic',
  },
  accountInfo: {
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#666',
  },
  infoValue: {
    flex: 1,
    textAlign: 'right',
  },
  buttonContainer: {
    marginTop: 16,
    gap: 8,
  },
  button: {
    marginVertical: 4,
  },
});
