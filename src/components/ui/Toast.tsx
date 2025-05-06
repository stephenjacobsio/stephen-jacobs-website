"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
  isVisible: boolean;
}

const typeConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-100 dark:bg-green-900/30",
    textColor: "text-green-800 dark:text-green-300",
    borderColor: "border-green-500",
    iconColor: "text-green-500",
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-red-100 dark:bg-red-900/30",
    textColor: "text-red-800 dark:text-red-300",
    borderColor: "border-red-500",
    iconColor: "text-red-500",
  },
  info: {
    icon: Info,
    bgColor: "bg-cyan-100 dark:bg-cyan-900/30",
    textColor: "text-cyan-800 dark:text-cyan-300",
    borderColor: "border-cyan-500",
    iconColor: "text-cyan-500",
  },
};

const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
  isVisible,
}) => {
  const [visible, setVisible] = useState(isVisible);
  const config = typeConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    setVisible(isVisible);
    
    if (isVisible) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-4 z-50 max-w-md"
        >
          <div 
            className={`flex items-center p-4 rounded-lg shadow-md border-l-4 ${config.bgColor} ${config.textColor} border-l-${config.borderColor}`}
          >
            <Icon className={`mr-3 ${config.iconColor}`} size={18} />
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button 
              onClick={() => {
                setVisible(false);
                if (onClose) onClose();
              }}
              className="ml-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
