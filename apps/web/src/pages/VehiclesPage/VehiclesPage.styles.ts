export const VehiclesPageStyles = {
  container: {
    padding: 2,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  title: {
    fontWeight: 'bold',
  },
  addButton: {
    textTransform: 'none',
  },
  alert: {
    marginBottom: 3,
  },
  statsGrid: {
    marginBottom: 3,
  },
  statCard: {
    height: '100%',
  },
  searchSection: {
    marginBottom: 3,
  },
  filterChips: {
    display: 'flex',
    gap: 1,
    flexWrap: 'wrap',
  },
  paper: {
    overflow: 'hidden',
  },
  table: {
    minWidth: 650,
  },
} as const;
