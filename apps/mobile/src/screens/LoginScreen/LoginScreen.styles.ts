import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  surface: {
    elevation: 4,
    borderRadius: 12,
  },
  card: {
    borderRadius: 12,
  },
  cardContent: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 8,
    color: '#1976d2',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
    paddingVertical: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#666',
  },
  testButton: {
    marginBottom: 24,
  },
  credentials: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
  },
  credentialsTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  credentialsText: {
    color: '#666',
    marginBottom: 4,
  },
});
