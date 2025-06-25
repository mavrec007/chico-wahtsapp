
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoadingStore } from '@/stores/useLoadingStore';

const RouteChangeListener: React.FC = () => {
  const location = useLocation();
  const hideLoading = useLoadingStore((state) => state.hideLoading);

  useEffect(() => {
    // Hide loading when route changes
    hideLoading();
  }, [location, hideLoading]);

  return null;
};

export default RouteChangeListener;
