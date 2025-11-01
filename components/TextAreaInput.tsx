
import React from 'react';

interface TextAreaInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  disabled: boolean;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="input-text" className="mb-2 font-semibold text-slate-300">
        Your Text
      </label>
      <textarea
        id="input-text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full h-64 md:h-80 bg-slate-900 border-2 border-slate-700 rounded-lg p-4 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-all duration-300 resize-none placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
};
   