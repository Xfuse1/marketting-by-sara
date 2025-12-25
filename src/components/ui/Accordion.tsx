import React from 'react';

const Accordion: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border rounded overflow-hidden">
      <button onClick={()=>setOpen(!open)} className="w-full text-left px-4 py-2 bg-slate-800">{title}</button>
      {open && <div className="p-4 bg-slate-900 text-slate-300">{children}</div>}
    </div>
  );
};

export default Accordion;
