import React from 'react';

export const SpeechBubble: React.FC<{ text: string }> = ({ text }) => (
  <div className="inline-block bg-white text-slate-900 rounded-lg px-3 py-2 shadow">{text}</div>
);

export default SpeechBubble;
