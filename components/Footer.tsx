
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center py-4 px-4">
      <p className="text-sm text-slate-500">
        &copy; {new Date().getFullYear()} AI Autocorrect Pro. All rights reserved.
      </p>
    </footer>
  );
};
   