import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  scannerCard: {
    marginBottom: 16,
  },
  scannerContent: {
    alignItems: 'center',
    padding: 20,
  },
  scannerIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  scannerTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  scannerDescription: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  scanButton: {
    marginBottom: 12,
    width: '100%',
  },
  scanButtonContent: {
    paddingVertical: 8,
  },
  clearButton: {
    width: '100%',
  },
  manualCard: {
    marginBottom: 16,
  },
  manualDescription: {
    marginBottom: 16,
    color: '#666',
  },
  codeInput: {
    marginBottom: 16,
  },
  eventTypeContainer: {
    marginBottom: 16,
  },
  eventTypeLabel: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  eventTypeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  eventTypeButton: {
    flex: 1,
  },
  registerButton: {
    width: '100%',
  },
  resultCard: {
    marginBottom: 16,
  },
  successCard: {
    backgroundColor: '#e8f5e8',
  },
  errorCard: {
    backgroundColor: '#ffebee',
  },
  resultContent: {
    alignItems: 'center',
    padding: 16,
  },
  resultIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  resultTitle: {
    marginBottom: 4,
  },
  resultMessage: {
    textAlign: 'center',
  },
  eventsCard: {
    marginBottom: 16,
  },
  eventIcon: {
    fontSize: 24,
    alignSelf: 'center',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
  },
});
