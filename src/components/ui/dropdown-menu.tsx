import * as React from "react";

interface DropdownMenuProps {
  children: React.ReactNode;
}

const DropdownMenuContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  open: false,
  setOpen: () => {}
});

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  
  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({ 
  asChild, 
  children 
}: { 
  asChild?: boolean; 
  children: React.ReactNode;
}) {
  const { open, setOpen } = React.useContext(DropdownMenuContext);
  
  return (
    <div onClick={() => setOpen(!open)}>
      {children}
    </div>
  );
}

export function DropdownMenuContent({ 
  align = 'center',
  className = '',
  children 
}: { 
  align?: 'start' | 'center' | 'end';
  className?: string;
  children: React.ReactNode;
}) {
  const { open, setOpen } = React.useContext(DropdownMenuContext);
  const ref = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open, setOpen]);
  
  if (!open) return null;
  
  const alignmentClasses = {
    start: 'left-0',
    center: 'left-1/2 transform -translate-x-1/2',
    end: 'right-0'
  };
  
  return (
    <div 
      ref={ref}
      className={`absolute z-50 min-w-32 overflow-hidden rounded-md border bg-white p-1 text-gray-950 shadow-md mt-1 ${alignmentClasses[align]} ${className}`}
    >
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ 
  className = '',
  children 
}: { 
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`px-2 py-1.5 text-sm font-semibold ${className}`}>
      {children}
    </div>
  );
}

export function DropdownMenuSeparator({ className = '' }: { className?: string }) {
  return <div className={`-mx-1 my-1 h-px bg-gray-100 ${className}`} />;
}

export function DropdownMenuCheckboxItem({
  checked,
  onCheckedChange,
  className = '',
  children
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const { setOpen } = React.useContext(DropdownMenuContext);
  
  return (
    <div 
      className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onCheckedChange(!checked);
        // Don't close dropdown on checkbox click to allow multiple selections
      }}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <span className="text-blue-600">✓</span>}
      </span>
      <div className="pl-6">{children}</div>
    </div>
  );
}
