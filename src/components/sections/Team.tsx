import React from 'react';
import type { TeamMember } from '../../data/types';

const Team: React.FC<{ members?: TeamMember[] }> = ({ members = [] }) => (
  <section id="team" className="py-16">
    <h2 className="text-2xl font-semibold">Team</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      {members.length ? (
        members.map((m) => (
          <div key={m.id} className="p-4 bg-slate-800 rounded border border-slate-700">
            <div className="text-sm text-slate-500 mb-2">{m.departmentKey.toUpperCase()}</div>
            <h3 className="font-medium">{m.name.en}</h3>
            <p className="text-sm text-slate-400">{m.role.en}</p>
            <p className="text-xs text-slate-500 mt-2 line-clamp-2">{m.bio.en}</p>
          </div>
        ))
      ) : (
        <p className="text-slate-400">No team members yet (use src/data/mock.ts)</p>
      )}
    </div>
  </section>
);

export default Team;
