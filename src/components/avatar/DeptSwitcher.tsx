import React from 'react';

const DeptSwitcher: React.FC<{ departments?: string[]; value?: string; onChange?: (v:string)=>void }> = ({ departments = [], value, onChange }) => {
  return (
    <div className="flex gap-2">
      {departments.map((d) => (
        <button key={d} onClick={() => onChange?.(d)} className={`px-3 py-1 rounded ${d===value? 'bg-indigo-600 text-white': 'bg-slate-700 text-slate-200'}`}>
          {d}
        </button>
      ))}
    </div>
  );
};

export default DeptSwitcher;
