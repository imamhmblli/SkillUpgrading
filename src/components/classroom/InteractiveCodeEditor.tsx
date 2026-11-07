import React, { useState } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, Sparkles } from 'lucide-react';

interface InteractiveCodeEditorProps {
  initialCode: string;
  expectedOutput?: string;
  language?: string;
}

export const InteractiveCodeEditor: React.FC<InteractiveCodeEditorProps> = ({
  initialCode,
  expectedOutput,
  language = 'python'
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync if initial code changes on lesson switch
  React.useEffect(() => {
    setCode(initialCode);
    setOutput(null);
  }, [initialCode]);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput(null);

    // Simulate real execution delay
    setTimeout(() => {
      setIsRunning(false);
      if (expectedOutput) {
        setOutput(expectedOutput);
      } else {
        setOutput(`> Executing ${language} runtime v3.12...\nProgram executed successfully with exit code 0.\nOutputs verified.`);
      }
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput(null);
  };

  const lines = code.split('\n');

  return (
    <div className="rounded-2xl overflow-hidden bg-[#0D1117] border border-slate-800 text-slate-200 font-mono text-xs shadow-2xl flex flex-col h-full">
      {/* Top Toolbar */}
      <div className="bg-[#161B22] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            main.{language === 'python' ? 'py' : 'sql'}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-indigo-300 font-semibold">
            Interactive Sandbox
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Salin Kode"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset Kode"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-lg transition-all shadow-sm shadow-indigo-900/50"
          >
            <Play className={`w-3.5 h-3.5 fill-white ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Menjalankan...' : 'Jalankan'}</span>
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 flex-1 overflow-auto flex font-mono text-[13px] leading-relaxed">
        {/* Line Numbers */}
        <div className="select-none text-slate-600 pr-4 text-right border-r border-slate-800/80 mr-4 font-mono">
          {lines.map((_, idx) => (
            <div key={idx} className="leading-6">
              {idx + 1}
            </div>
          ))}
        </div>

        {/* Textarea for interactive editable code */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="w-full bg-transparent text-emerald-300 focus:outline-hidden resize-none font-mono leading-6 tracking-wide placeholder-slate-600"
          rows={Math.max(8, lines.length)}
        />
      </div>

      {/* Terminal Output */}
      {output && (
        <div className="bg-[#090D13] border-t border-slate-800 p-4">
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-2">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>Output Konsol:</span>
          </div>
          <pre className="text-emerald-400 whitespace-pre-wrap font-mono text-xs leading-relaxed max-h-40 overflow-y-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};
