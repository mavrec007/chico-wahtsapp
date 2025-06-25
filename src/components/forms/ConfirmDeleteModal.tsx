
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  message?: string;
  itemName?: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  message,
  itemName
}) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 dark:bg-black/60 backdrop-blur-sm z-50"
            onClick={onCancel}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-2xl max-w-sm sm:max-w-md w-full p-4 sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="confirm-title"
              aria-describedby="confirm-desc"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 id="confirm-title" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {t('confirm_delete')}
                  </h3>
                </div>
                <button
                  onClick={onCancel}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label={t('cancel')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p id="confirm-desc" className="text-gray-600 dark:text-gray-300 mb-6">
                {message || t('delete_confirmation_message')}
                {itemName && (
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {' "' + itemName + '"'}
                  </span>
                )}
              </p>
              
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={onCancel}
                  className="px-4 sm:px-6 w-full sm:w-auto"
                >
                  {t('cancel')}
                </Button>
                <Button
                  variant="destructive"
                  onClick={onConfirm}
                  className="px-4 sm:px-6 w-full sm:w-auto"
                >
                  {t('delete')}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDeleteModal;
