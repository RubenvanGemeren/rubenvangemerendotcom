"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClayCard from "./ClayCard";
import { useI18n } from "@/lib/i18n-context";

interface SyncPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  isSubmitting?: boolean;
  error?: string | null;
}

export default function SyncPasswordModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
  error = null,
}: SyncPasswordModalProps) {
  const { t } = useI18n();
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      onConfirm(password);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setPassword("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <ClayCard className="p-6">
                <h2 className="text-xl font-bold text-text mb-4">
                  {t('pages.github.sync.modal.title')}
                </h2>
                <p className="text-sm text-text-subtle mb-4">
                  {t('pages.github.sync.modal.description')}
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="sync-password"
                      className="block text-sm font-medium text-text mb-2"
                    >
                      {t('pages.github.sync.modal.syncCode')}
                    </label>
                    <input
                      id="sync-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 rounded-button border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder={t('pages.github.sync.modal.enterSyncCode')}
                      autoFocus
                    />
                    {error && (
                      <p className="mt-2 text-sm text-red-500">{error}</p>
                    )}
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={isSubmitting}
                      className="px-4 py-2 rounded-button bg-surface text-text border border-border hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                    >
                      {t('pages.github.sync.modal.cancel')}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !password.trim()}
                      className="px-4 py-2 rounded-button bg-primary text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                    >
                      {isSubmitting ? t('pages.github.sync.modal.syncing') : t('pages.github.sync.modal.sync')}
                    </button>
                  </div>
                </form>
              </ClayCard>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

