
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ResultDisplay } from './components/ResultDisplay';
import { TextAreaInput } from './components/TextAreaInput';
import { correctText } from './services/geminiService';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [correctedText, setCorrectedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCorrectText = useCallback(async () => {
    // This function is now called by the debounced effect
    setIsLoading(true);
    setError(null);

    try {
      const result = await correctText(inputText);
      setCorrectedText(result);
    } catch (err) {
      setError('Failed to correct text. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  useEffect(() => {
    // Clear results if input is empty
    if (!inputText.trim()) {
      setCorrectedText('');
      setError(null);
      return;
    }

    // Debounce the API call
    const handler = setTimeout(() => {
      handleCorrectText();
    }, 800); // Wait for 800ms of inactivity before correcting

    // Cleanup function to reset the timer
    return () => {
      clearTimeout(handler);
    };
  }, [inputText, handleCorrectText]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 font-sans">
      <Header />
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full bg-slate-800/50 rounded-2xl shadow-2xl shadow-cyan-500/10 p-6 md:p-8 border border-slate-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TextAreaInput
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Start writing... corrections will appear automatically."
              disabled={false} // User can always type
            />
            <ResultDisplay markedUpText={correctedText} isLoading={isLoading} />
          </div>
          {error && <p className="text-red-400 mt-6 text-center">{error}</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
