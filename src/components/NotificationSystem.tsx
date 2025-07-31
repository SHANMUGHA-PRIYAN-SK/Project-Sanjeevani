import React, { useEffect } from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

interface NotificationSystemProps {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
}

export function NotificationSystem({ notifications, setNotifications }: NotificationSystemProps) {
  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (notifications.length > 0) {
        setNotifications(notifications.slice(1));
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [notifications, setNotifications]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => {
        const Icon = notification.type === 'success' ? CheckCircle :
                   notification.type === 'warning' ? AlertTriangle : Info;
        
        const bgColor = notification.type === 'success' ? 'bg-green-50 border-green-200' :
                       notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                       'bg-blue-50 border-blue-200';
        
        const textColor = notification.type === 'success' ? 'text-green-800' :
                         notification.type === 'warning' ? 'text-yellow-800' :
                         'text-blue-800';
        
        const iconColor = notification.type === 'success' ? 'text-green-600' :
                         notification.type === 'warning' ? 'text-yellow-600' :
                         'text-blue-600';

        return (
          <div
            key={notification.id}
            className={`${bgColor} border rounded-lg p-4 shadow-lg max-w-sm animate-in slide-in-from-right`}
          >
            <div className="flex items-start space-x-3">
              <Icon className={`w-5 h-5 ${iconColor} mt-0.5`} />
              <div className="flex-1">
                <p className={`${textColor} text-sm font-medium`}>
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}