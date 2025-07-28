import { StyleSheet } from 'react-native';

export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeTitle: {
    flex: 1,
    fontSize: 20,
  },
  roleChip: {
    marginLeft: 8,
  },
  alertCard: {
    marginBottom: 16,
    backgroundColor: '#e3f2fd',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  sectionCard: {
    marginBottom: 16,
  },
  statusChip: {
    alignSelf: 'center',
  },
  confirmedChip: {
    backgroundColor: '#e8f5e8',
    borderColor: '#4caf50',
  },
  actionsContainer: {
    marginBottom: 20,
  },
  actionButton: {
    marginBottom: 8,
  },
});
