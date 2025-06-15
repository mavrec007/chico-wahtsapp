
import BookingDashboard from './BookingDashboard';
import { useEffect } from 'react';
import { botManager } from '../services/BotManager';

const Index = () => {
  useEffect(() => {
    // Initialize the bot system when the app loads
    botManager.initialize().catch(console.error);
  }, []);

  return <BookingDashboard />;
};

export default Index;
