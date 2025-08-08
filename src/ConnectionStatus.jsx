import { useState, useEffect } from 'react';

export default function ConnectionStatus({ status }) {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    setLastUpdate(new Date());
  }, [status]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return '#4CAF50';
      case 'connecting':
        return '#FF9800';
      case 'error':
        return '#F44336';
      case 'disconnected':
        return '#9E9E9E';
      default:
        return '#666';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      padding: '8px 12px',
      borderRadius: '4px',
      backgroundColor: getStatusColor(status),
      color: 'white',
      fontSize: '12px',
      fontWeight: 'bold',
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    }}>
      {status.toUpperCase()}
      <div style={{ fontSize: '10px', opacity: 0.8 }}>
        {lastUpdate.toLocaleTimeString()}
      </div>
    </div>
  );
}
