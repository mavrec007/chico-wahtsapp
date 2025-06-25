
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoadingStore } from '@/stores/useLoadingStore';
import Spinner from '@/components/ui/spinner';

const LoadingOverlay: React.FC = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center gap-4"
          >
            <Spinner size="lg" />
            <p className="text-gray-600 font-medium">جاري التحميل...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
