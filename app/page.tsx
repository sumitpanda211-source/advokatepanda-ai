"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

const FREE_LIMIT = 3;
const quickQuestions = [
  "What are my tenant rights in India?",
  "How to file an FIR?",
  "What is Section 498A IPC?",
  "How to register a company in India?",
];

export default function Home() {
  const [messages, setMessages] = useState([{ role: "assistant", text: "Hello! I am your AI Legal Assistant. Ask me anything about Indian law. You get 3 free questions, no signup needed!" }]);
  const [history, setHistory] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [user, setUser] = useState<any>(null);
  const [queryCount, setQueryCount] = useState(0);
  const [showSignup, setShowSignup] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const fileRef = useRef<any>(null);
  const messagesEndRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUser(session.user);
    });
    const saved = localStorage.getItem("queryCount");
    if (saved) setQueryCount(parseInt(saved));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setQueryCount(0);
    localStorage.setItem("queryCount", "0");
  }

  async function sendMessage(msg?: string) {
    const userMessage = msg || input;
    if (!userMessage.trim()) return;
    if (!user && queryCount >= FREE_LIMIT) { setShowSignup(true); return; }
    setInput("");
    setMessages((prev: any) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage, history })
    });
    const data = await res.json();
    setHistory(prev => [...prev, { role: "user", content: userMessage }, { role: "assistant", content: data.reply }]);
    setMessages((prev: any) => [...prev, { role: "assistant", text: data.reply }]);
    setLoading(false);
    if (!user) {
      const newCount = queryCount + 1;
      setQueryCount(newCount);
      localStorage.setItem("queryCount", newCount.toString());
      if (newCount >= FREE_LIMIT) setTimeout(() => setShowSignup(true), 1000);
    }
  }

  async function uploadFile(e: any) {
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
  }return (
    <div style={{minHeight:"100vh",background:"#f8fafc",display:"flex",flexDirection:"column",fontFamily:"Inter, sans-serif"}}>

      <nav style={{background:"white",borderBottom:"1px solid #e2e8f0",padding:"12px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50,boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:36,height:36,background:"#2563eb",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:"bold",fontSize:18}}>A</div>
          <div>
            <div style={{fontSize:16,fontWeight:700,color:"#1e293b"}}>AdvokateAI Panda</div>
            <div style={{fontSize:11,color:"#94a3b8"}}>India's AI Legal Assistant</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          {!user && queryCount > 0 && <span style={{fontSize:12,background:"#fef3c7",color:"#92400e",padding:"4px 12px",borderRadius:999,fontWeight:500}}>{FREE_LIMIT - queryCount} free questions left</span>}
          {user ? (
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:32,height:32,background:"#dbeafe",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#2563eb",fontWeight:600,fontSize:14}}>{user.email[0].toUpperCase()}</div>
              <button onClick={handleLogout} style={{fontSize:13,color:"#94a3b8",background:"none",border:"none",cursor:"pointer",fontWeight:500}}>Logout</button>
            </div>
          ) : (
            <Link href="/auth" style={{background:"#2563eb",color:"white",padding:"8px 16px",borderRadius:8,fontSize:13,fontWeight:600,textDecoration:"none"}}>Sign In</Link>
          )}
        </div>
      </nav>

      <div style={{display:"flex",flex:1}}>
        <aside style={{width:240,background:"white",borderRight:"1px solid #e2e8f0",padding:16,display:"flex",flexDirection:"column",gap:4,minHeight:"calc(100vh - 61px)"}}>
          <div style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1,marginBottom:8,padding:"0 12px"}}>Menu</div>
          {[{id:"chat",icon:"💬",label:"AI Legal Chat"},{id:"upload",icon:"📂",label:"Upload Documents"}].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:8,fontSize:13,fontWeight:500,border:"none",cursor:"pointer",background:activeTab===item.id?"#eff6ff":"transparent",color:activeTab===item.id?"#2563eb":"#475569",textAlign:"left" as const}}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
          <button onClick={() => router.push("/documents-generator")} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:8,fontSize:13,fontWeight:500,border:"none",cursor:"pointer",background:"transparent",color:"#475569",textAlign:"left" as const}}>
            <span>📄</span>Document Generator
          </button>
          <div style={{marginTop:16,borderTop:"1px solid #f1f5f9",paddingTop:16}}>
            <div style={{fontSize:11,fontWeight:600,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1,marginBottom:8,padding:"0 12px"}}>Account</div>
            <Link href="/pricing" style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:8,fontSize:13,fontWeight:500,color:"#475569",textDecoration:"none"}}>
              <span>💰</span>Pricing and Plans
            </Link>
            <Link href="/pricing" style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:8,fontSize:13,fontWeight:500,color:"#475569",textDecoration:"none"}}>
              <span>⚖️</span>Find a Lawyer
            </Link>
          </div>
          <div style={{marginTop:"auto",padding:12,background:"#eff6ff",borderRadius:12}}>
            <div style={{fontSize:12,fontWeight:600,color:"#1e40af",marginBottom:4}}>Pro Plan</div>
            <div style={{fontSize:11,color:"#3b82f6",marginBottom:8}}>Unlimited queries and all features</div>
            <Link href="/pricing" style={{display:"block",textAlign:"center",background:"#2563eb",color:"white",padding:"8px",borderRadius:8,fontSize:12,fontWeight:600,textDecoration:"none"}}>Upgrade Rs 299/mo</Link>
          </div>
        </aside>

        <main style={{flex:1,display:"flex",flexDirection:"column",padding:24,gap:16,maxWidth:900,margin:"0 auto",width:"100%"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
            {[{label:"Legal Questions",value:"Ask Freely",bg:"#eff6ff",color:"#1d4ed8"},{label:"Documents",value:"30+ Types",bg:"#f0fdf4",color:"#15803d"},{label:"Indian Laws",value:"Covered",bg:"#faf5ff",color:"#7e22ce"},{label:"Available",value:"24 x 7",bg:"#fffbeb",color:"#92400e"}].map(card => (
              <div key={card.label} style={{background:card.bg,borderRadius:12,padding:12}}>
                <div style={{fontSize:11,fontWeight:500,color:card.color,opacity:0.7}}>{card.label}</div>
                <div style={{fontSize:18,fontWeight:700,color:card.color,marginTop:2}}>{card.value}</div>
              </div>
            ))}
          </div>

          {showSignup && !user && (
            <div style={{background:"#2563eb",borderRadius:16,padding:20,color:"white",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap" as const,gap:12}}>
              <div>
                <div style={{fontWeight:700,fontSize:16}}>You have used your 3 free questions!</div>
                <div style={{color:"#bfdbfe",fontSize:13,marginTop:2}}>Create a free account to continue using AdvokateAI Panda.</div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <Link href="/auth" style={{background:"white",color:"#2563eb",padding:"8px 16px",borderRadius:8,fontWeight:600,fontSize:13,textDecoration:"none"}}>Create Free Account</Link>
                <Link href="/pricing" style={{background:"#1d4ed8",color:"white",padding:"8px 16px",borderRadius:8,fontWeight:600,fontSize:13,textDecoration:"none"}}>View Plans</Link>
              </div>
            </div>
          )}

          {activeTab === "chat" && (
            <div style={{background:"white",borderRadius:16,boxShadow:"0 1px 3px rgba(0,0,0,0.08)",border:"1px solid #e2e8f0",display:"flex",flexDirection:"column",flex:1}}>
              <div style={{padding:"12px 16px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:8,height:8,background:"#22c55e",borderRadius:"50%"}}></div>
                <span style={{fontSize:13,fontWeight:600,color:"#334155"}}>AI Legal Assistant</span>
                <span style={{fontSize:11,color:"#94a3b8",marginLeft:"auto"}}>Powered by Groq AI</span>
              </div>
              <div style={{flex:1,overflowY:"auto" as const,padding:16,display:"flex",flexDirection:"column",gap:12,minHeight:300,maxHeight:400}}>
                {messages.map((msg: any, i: number) => (
                  <div key={i} style={{display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start",alignItems:"flex-start",gap:8}}>
                    {msg.role==="assistant" && <div style={{width:28,height:28,background:"#2563eb",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:11,fontWeight:700,flexShrink:0}}>A</div>}
                    <div style={{maxWidth:480,padding:"10px 14px",borderRadius:msg.role==="user"?"16px 4px 16px 16px":"4px 16px 16px 16px",fontSize:13,lineHeight:1.6,background:msg.role==="user"?"#2563eb":"#f1f5f9",color:msg.role==="user"?"white":"#1e293b"}}>{msg.text}</div>
                  </div>
                ))}
                {loading && (
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:28,height:28,background:"#2563eb",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:11,fontWeight:700}}>A</div>
                    <div style={{background:"#f1f5f9",padding:"10px 14px",borderRadius:"4px 16px 16px 16px",fontSize:13,color:"#94a3b8"}}>Thinking...</div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div style={{padding:"8px 16px",display:"flex",gap:8,flexWrap:"wrap" as const}}>
                {quickQuestions.map((q, i) => (
                  <button key={i} onClick={() => sendMessage(q)} style={{fontSize:11,background:"#f8fafc",border:"1px solid #e2e8f0",color:"#475569",padding:"6px 12px",borderRadius:999,cursor:"pointer"}}>
                    {q}
                  </button>
                ))}
              </div>
              <div style={{padding:16,borderTop:"1px solid #f1f5f9"}}>
                <div style={{display:"flex",gap:8}}>
                  <input style={{flex:1,background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:12,padding:"12px 16px",fontSize:13,outline:"none",color:"#1e293b"}} placeholder={!user && queryCount >= FREE_LIMIT ? "Sign up to continue..." : "Ask a legal question..."} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter" && sendMessage()} disabled={!user && queryCount >= FREE_LIMIT} />
                  <button onClick={() => sendMessage()} disabled={loading || (!user && queryCount >= FREE_LIMIT)} style={{background:loading||(!user&&queryCount>=FREE_LIMIT)?"#cbd5e1":"#2563eb",color:"white",padding:"12px 20px",borderRadius:12,fontSize:13,fontWeight:600,border:"none",cursor:"pointer"}}>Send</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "upload" && (
            <div style={{background:"white",borderRadius:16,boxShadow:"0 1px 3px rgba(0,0,0,0.08)",border:"1px solid #e2e8f0",padding:24}}>
              <div style={{fontSize:18,fontWeight:700,color:"#1e293b",marginBottom:4}}>Upload Legal Documents</div>
              <div style={{fontSize:13,color:"#64748b",marginBottom:24}}>Upload your legal documents and the AI will learn from them.</div>
              <div onClick={() => fileRef.current.click()} style={{border:"2px dashed #e2e8f0",borderRadius:12,padding:32,textAlign:"center" as const,cursor:"pointer"}}>
                <div style={{fontSize:40,marginBottom:8}}>📂</div>
                <div style={{fontWeight:500,color:"#475569"}}>Click to upload .txt files</div>
                <div style={{fontSize:12,color:"#94a3b8",marginTop:4}}>Your legal cases, judgments, notes</div>
                {uploadMsg && <div style={{color:"#16a34a",fontWeight:500,marginTop:12}}>{uploadMsg}</div>}
              </div>
              <input ref={fileRef} type="file" accept=".txt" onChange={uploadFile} style={{display:"none"}} />
            </div>
          )}

          <div style={{textAlign:"center" as const,fontSize:11,color:"#cbd5e1"}}>For educational purposes only. Always consult a qualified lawyer. AdvokateAI Panda</div>
        </main>
      </div>
    </div>
  );
}