import React from 'react';

const Modal: React.FC<{ open: boolean; onClose?: ()=>void; children?: React.ReactNode }> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white text-slate-900 rounded p-6 max-w-lg w-full">
        {children}
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-4 py-2 bg-slate-200 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
