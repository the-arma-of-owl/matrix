'use client';
import { useState } from 'react';

export default function OracleChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'oracle', text: string}[]>([
      {role: 'oracle', text: 'Sistemde bir açık var. Yardıma ihtiyacın var mı?'}
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
      if(!input) return;
      
      const userMsg = input;
      setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
      setInput('');

      try {
          // AI GELİŞTİRİCİSİ İÇİN: Kendi localhost backend API endpointini buraya gir
          const response = await fetch('/api/chat', { // Veya kendi fastApi'n => "http://localhost:8000/chat"
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message: userMsg })
          });
          
          if(response.ok) {
            const data = await response.json();
            setMessages(prev => [...prev, {role: 'oracle', text: data.reply}]);
          } else {
             setMessages(prev => [...prev, {role: 'oracle', text: 'Bağlantı kesildi...'}]);
          }
      } catch (error) {
          console.error(error);
          setMessages(prev => [...prev, {role: 'oracle', text: 'Oracle\'a ulaşılamıyor (Ajan engellemesi).'}]);
      }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Sohbet Kutusu Kapatılıp Açılabilir */}
      {isOpen && (
        <div className="bg-black/90 border border-green-500/50 shadow-[0_0_15px_rgba(0,255,156,0.2)] w-80 h-96 mb-4 flex flex-col font-mono text-sm backdrop-blur-sm">
          <div className="bg-green-900/40 text-green-400 p-3 border-b border-green-800 font-bold uppercase">
             {'>'} Oracle.exe
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto w-full flex flex-col gap-3">
             {messages.map((msg, idx) => (
                 <div key={idx} className={`w-full flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-2 rounded-sm ${msg.role === 'user' ? 'bg-green-800 text-white' : 'bg-gray-900 border-l-2 border-green-500 text-green-400'}`}>
                        {msg.text}
                    </div>
                 </div>
             ))}
          </div>

          <div className="p-2 border-t border-green-800/50 flex">
             <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                className="flex-1 bg-transparent border-none text-green-400 placeholder-green-800 outline-none px-2"
                placeholder="Yaz Neo..." 
             />
             <button onClick={sendMessage} className="text-green-500 font-bold hover:text-green-400">{'>>'}</button>
          </div>
        </div>
      )}

      {/* Yuvarlak Açma Butonu */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-green-900 rounded-full border-2 border-green-500 text-green-400 flex items-center justify-center text-xs shadow-[0_0_15px_#00FF9C] hover:scale-110 transition-transform font-bold"
      >
        O
      </button>

    </div>
  );
}
