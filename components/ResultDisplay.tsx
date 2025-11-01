
import React, { useState, useEffect, useMemo } from 'react';
import { Loader } from './Loader';

interface ResultDisplayProps {
  markedUpText: string;
  isLoading: boolean;
}

const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
    </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

const parseAndRenderDiff = (text: string) => {
    if (!text) return null;
    // Split the text by our custom diff markers, keeping the delimiters
    const parts = text.split(/(\[-.*?-\]|\[\+.*?\+\])/g).filter(Boolean);
  
    return parts.map((part, index) => {
      if (part.startsWith('[-')) {
        return (
          <del key={index} className="text-red-400 bg-red-900/30 px-1 rounded transition-all duration-300">
            {part.slice(2, -2)}
          </del>
        );
      }
      if (part.startsWith('[+')) {
        return (
          <ins key={index} className="text-green-400 bg-green-900/30 px-1 rounded no-underline transition-all duration-300">
            {part.slice(2, -2)}
          </ins>
        );
      }
      return <span key={index}>{part}</span>;
    });
};

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ markedUpText, isLoading }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [cleanText, setCleanText] = useState('');

  useEffect(() => {
    if (markedUpText) {
      // Generate the clean text for the copy button by stripping markers
      const cleaned = markedUpText
        .replace(/\[-.*?-\]/g, '')       // Remove deletions
        .replace(/\[\+(.*?)\+\]/g, '$1'); // Keep additions' content
      setCleanText(cleaned);
      setIsCopied(false);
    } else {
        setCleanText('');
    }
  }, [markedUpText]);

  const handleCopy = () => {
    if (cleanText) {
      navigator.clipboard.writeText(cleanText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };
  
  const renderedDiff = useMemo(() => parseAndRenderDiff(markedUpText), [markedUpText]);

  return (
    <div className="flex flex-col relative">
      <label htmlFor="output-text" className="mb-2 font-semibold text-slate-300">
        Suggested Correction
      </label>
      <div className="relative w-full h-64 md:h-80 bg-slate-700/50 border-2 border-slate-700 rounded-lg p-4 text-slate-200 overflow-y-auto">
        {isLoading && !markedUpText ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : renderedDiff ? (
          <p className="whitespace-pre-wrap leading-relaxed">{renderedDiff}</p>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            Suggestions will appear here...
          </div>
        )}
      </div>
      {cleanText && (
        <button
            onClick={handleCopy}
            className="absolute top-9 right-2 bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200 disabled:opacity-50"
            title="Copy corrected text"
            disabled={isCopied}
        >
          {isCopied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5 text-slate-400" />}
        </button>
      )}
    </div>
  );
};
