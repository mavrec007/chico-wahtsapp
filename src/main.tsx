
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './lib/i18n';
import '@/services/whatsapp/whatsapp.client';
createRoot(document.getElementById("root")!).render(<App />);
