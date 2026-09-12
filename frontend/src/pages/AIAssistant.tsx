import { useState } from 'react';
import { Bot, Send, AlertTriangle, FileText } from 'lucide-react';
import { apiFetch } from '../services/api';

export default function AIAssistant() {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; disclaimer?: string }>>([
    {
      sender: 'ai',
      text: 'Hello! I am the Smart Hospital Management System AI Assistant. How can I assist you with clinical record summaries or hospital administrative workflows today?',
      disclaimer: 'Disclaimer: This AI service does not replace clinical judgment or medical diagnosis.'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [patientIdSummary, setPatientIdSummary] = useState('');
  const [clinicalNotesInput, setClinicalNotesInput] = useState('');
  const [summaryResult, setSummaryResult] = useState<any>(null);

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || loading) return;

    const userText = inputMsg.trim();
    setInputMsg('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const data = await apiFetch('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ message: userText, context: 'Hospital Platform Portal' })
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.reply || 'Request processed.',
          disclaimer: data.disclaimer
        }
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'AI Service currently operating in deterministic fallback mode: ' + (err.message || 'Service offline'),
          disclaimer: 'Fallback response active.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarizeRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientIdSummary || !clinicalNotesInput) return;

    try {
      const data = await apiFetch('/ai/summarize', {
        method: 'POST',
        body: JSON.stringify({
          patient_id: patientIdSummary,
          clinical_notes: clinicalNotesInput
        })
      });
      setSummaryResult(data);
    } catch (err: any) {
      alert(err.message || 'Summarization failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-health-gray p-6 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-health-sage/30 rounded-xl text-health-olive">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-health-charcoal">AI Hospital Operations & Clinical Assistant</h1>
            <p className="text-sm text-health-olive">Clinical record summarization, operational AI Q&A, and patient triage support.</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs flex items-center space-x-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>Safety Notice: AI outputs are generated as administrative and clinical support tools and do not constitute formal diagnostic advice.</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Chat Console */}
        <div className="bg-white rounded-2xl border border-health-gray p-5 shadow-sm flex flex-col h-[500px]">
          <h3 className="font-bold text-health-charcoal text-sm pb-3 border-b border-health-gray mb-3 flex items-center space-x-2">
            <Bot className="w-4 h-4 text-health-olive" />
            <span>Operational AI Chat Terminal</span>
          </h3>

          <div className="flex-1 overflow-y-auto space-y-3 p-2 custom-scrollbar text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-3 rounded-2xl max-w-[85%] ${
                    m.sender === 'user' ? 'bg-health-olive text-white' : 'bg-health-ivory text-health-charcoal border border-health-gray'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                {m.disclaimer && <span className="text-[10px] text-health-olive mt-1 italic max-w-[85%]">{m.disclaimer}</span>}
              </div>
            ))}
            {loading && <p className="text-xs text-health-olive italic">AI assistant is reflecting...</p>}
          </div>

          <form onSubmit={handleSendChat} className="pt-3 border-t border-health-gray flex space-x-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask AI about appointments, pharmacy, or clinical workflow..."
              className="flex-1 px-3 py-2 border border-health-gray rounded-xl text-xs bg-health-ivory/50 focus:outline-none focus:ring-2 focus:ring-health-olive"
            />
            <button type="submit" className="p-2 bg-health-olive hover:bg-health-charcoal text-white rounded-xl">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Clinical Summarizer Tool */}
        <div className="bg-white rounded-2xl border border-health-gray p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-health-charcoal text-sm pb-3 border-b border-health-gray flex items-center space-x-2">
            <FileText className="w-4 h-4 text-health-olive" />
            <span>AI Clinical Record Summarizer</span>
          </h3>

          <form onSubmit={handleSummarizeRecord} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold mb-1">Patient ID / MRN</label>
              <input
                required
                value={patientIdSummary}
                onChange={(e) => setPatientIdSummary(e.target.value)}
                placeholder="e.g. MRN-10001"
                className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Clinical SOAP Notes & Symptoms</label>
              <textarea
                rows={4}
                required
                value={clinicalNotesInput}
                onChange={(e) => setClinicalNotesInput(e.target.value)}
                placeholder="Paste raw physician notes, lab parameters, or encounter observations..."
                className="w-full p-2.5 border border-health-gray rounded-xl bg-health-ivory/50"
              />
            </div>
            <button type="submit" className="w-full py-2.5 bg-health-olive text-white font-medium rounded-xl hover:bg-health-charcoal">
              Generate AI Clinical Summary
            </button>
          </form>

          {summaryResult && (
            <div className="p-4 bg-health-ivory/60 rounded-xl border border-health-sage/40 text-xs space-y-2">
              <h4 className="font-bold text-health-charcoal">Generated AI Clinical Summary</h4>
              <p className="text-health-olive whitespace-pre-line">{summaryResult.summary}</p>
              {summaryResult.recommended_actions && (
                <div className="pt-2 border-t border-health-gray">
                  <span className="font-semibold text-health-charcoal">Recommended Next Actions:</span>
                  <ul className="list-disc list-inside text-health-olive mt-1">
                    {summaryResult.recommended_actions.map((act: string, i: number) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
