"use client";
import { useState, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const [messages, setMessages] = useState([{ role: "assistant", text: "Hello! Welcome to AdvokateAI Panda. Ask me anything about Indian law, your rights, or legal procedures. You can also upload .txt documents for me to learn from!" }]);
  const [history, setHistory] = useState<{role:string,content:string}[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const fileRef = useRef<any>(null);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMessage = input;
    setInput("");
    setMessages((prev:any) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);
    const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: userMessage, history }) });
    const data = await res.json();
    setHistory(prev => [...prev, { role: "user", content: userMessage }, { role: "assistant", content: data.reply }]);
    setMessages((prev:any) => [...prev, { role: "assistant", text: data.reply }]);
    setLoading(false);
  }

  async function uploadFile(e:any) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadMsg("Uploading...");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      setUploadMsg(data.message || data.error || "Done!");
    } catch { setUploadMsg("Upload failed."); }
    setUploading(false);
    setTimeout(() => setUploadMsg(""), 4000);
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl flex flex-col gap-4">
        <div className="text-center mb-2">
          <h1 className="text-4xl font-bold text-blue-400">AdvokateAI Panda</h1>
          <p className="text-gray-400 text-sm mt-1">Indias smartest AI-powered legal assistant</p>
          <Link href="/documents-generator" className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">Generate Legal Documents</Link>
        </div>
        <div className="bg-gray-800 rounded-xl p-3 flex items-center justify-between">
          <span className="text-sm text-gray-300">Upload txt documents for AI to learn</span>
          <div className="flex items-center gap-2">
            {uploadMsg && <span className="text-xs text-green-400">{uploadMsg}</span>}
            <button onClick={() => fileRef.current.click()} disabled={uploading} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">{uploading ? "Uploading..." : "Upload File"}</button>
            <input ref={fileRef} type="file" accept=".txt" onChange={uploadFile} className="hidden" />
          </div>
        </div>
        <div className="bg-gray-900 rounded-2xl p-4 h-96 overflow-y-auto flex flex-col gap-3">
          {messages.map((msg:any, i:number) => (
            <div key={i} className={"flex " + (msg.role === "user" ? "justify-end" : "justify-start")}>
              <div className={"max-w-xs lg:max-w-md px-4 py-2 rounded-2xl text-sm " + (msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-100")}>{msg.text}</div>
            </div>
          ))}
          {loading && <div className="flex justify-start"><div className="bg-gray-700 px-4 py-2 rounded-2xl text-sm text-gray-300">Thinking...</div></div>}
        </div>
        <div className="flex gap-2">
          <input className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-3 text-sm outline-none border border-gray-700 focus:border-blue-500" placeholder="Ask a legal question..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} />
          <button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold">Send</button>
        </div>
        <p className="text-center text-gray-600 text-xs">For educational purposes only. Always consult a qualified lawyer. AdvokateAI Panda</p>
      </div>
    </main>
  );
}
