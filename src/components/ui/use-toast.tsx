import * as React from "react";

interface ToastProps {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const toast = React.useCallback(({ title, description, variant = 'default' }: ToastProps) => {
    // Simple console log implementation - replace with actual toast library
    console.log(`Toast [${variant}]: ${title}${description ? ` - ${description}` : ''}`);
    
    // You can implement a proper toast notification here
    // For now, we'll just show an alert
    if (variant === 'destructive') {
      alert(`Error: ${title}${description ? `\n${description}` : ''}`);
    } else {
      alert(`${title}${description ? `\n${description}` : ''}`);
    }
  }, []);

  return { toast };
}
