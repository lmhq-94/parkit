export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '24px' 
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          🚗 ParkIt - Smart Parking Solutions
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#666' }}>
          Sistema inteligente de gestión de parqueos
        </p>
      </div>
    </main>
  );
} 