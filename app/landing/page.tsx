"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function Landing() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUser(session.user);
    });
  }, []);

  return (
    <div style={{fontFamily:"Inter,-apple-system,sans-serif",background:"#ffffff",color:"#1e293b",minHeight:"100vh"}}>

      {/* NAVBAR */}
      <nav style={{position:"sticky",top:0,zIndex:50,background:"rgba(255,255,255,0.95)",backdropFilter:"blur(8px)",borderBottom:"0.5px solid #e2e8f0",padding:"0 5%"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,background:"linear-gradient(135deg,#2563eb,#7c3aed)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:18}}>A</div>
            <div>
              <div style={{fontSize:16,fontWeight:700,color:"#1e293b"}}>AdvokateAI Panda</div>
              <div style={{fontSize:10,color:"#64748b",letterSpacing:0.5}}>INDIA'S AI LEGAL ASSISTANT</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Link href="/documents-generator" style={{fontSize:13,color:"#475569",textDecoration:"none",padding:"8px 14px",borderRadius:8}}>Documents</Link>
            <Link href="/pricing" style={{fontSize:13,color:"#475569",textDecoration:"none",padding:"8px 14px",borderRadius:8}}>Pricing</Link>
            {user ? (
              <Link href="/app" style={{background:"#2563eb",color:"white",padding:"8px 18px",borderRadius:8,fontSize:13,fontWeight:600,textDecoration:"none"}}>Dashboard</Link>
            ) : (
              <>
                <Link href="/auth" style={{fontSize:13,color:"#2563eb",textDecoration:"none",padding:"8px 14px",borderRadius:8,fontWeight:500}}>Sign In</Link>
                <Link href="/auth" style={{background:"#2563eb",color:"white",padding:"8px 18px",borderRadius:8,fontSize:13,fontWeight:600,textDecoration:"none"}}>Get Started Free</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{padding:"80px 5% 60px",textAlign:"center",background:"linear-gradient(180deg,#eff6ff 0%,#ffffff 100%)"}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#dbeafe",color:"#1d4ed8",padding:"6px 16px",borderRadius:999,fontSize:12,fontWeight:500,marginBottom:24}}>
            <span style={{width:6,height:6,background:"#2563eb",borderRadius:"50%",display:"inline-block"}}></span>
            Powered by Advanced AI — Free to Start
          </div>
          <h1 style={{fontSize:"clamp(32px,5vw,56px)",fontWeight:700,lineHeight:1.15,margin:"0 0 20px",color:"#0f172a"}}>
            India's Smartest<br/>
            <span style={{color:"#2563eb"}}>AI Legal Assistant</span>
          </h1>
          <p style={{fontSize:"clamp(16px,2vw,20px)",color:"#475569",lineHeight:1.7,margin:"0 0 36px",maxWidth:600,marginLeft:"auto",marginRight:"auto"}}>
            Get instant legal advice, generate professional documents, and know your rights — all powered by AI. For students, lawyers, and every Indian citizen.
          </p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/app" style={{background:"#2563eb",color:"white",padding:"14px 32px",borderRadius:12,fontSize:15,fontWeight:600,textDecoration:"none",display:"inline-block"}}>
              Ask a Legal Question Free →
            </Link>
            <Link href="/documents-generator" style={{background:"white",color:"#2563eb",padding:"14px 32px",borderRadius:12,fontSize:15,fontWeight:600,textDecoration:"none",border:"1.5px solid #bfdbfe",display:"inline-block"}}>
              Generate Documents
            </Link>
          </div>
          <p style={{fontSize:12,color:"#94a3b8",marginTop:16}}>No credit card required · 3 free questions daily · Trusted by 1000+ users</p>
        </div>
      </section>{/* STATS */}
      <section style={{padding:"40px 5%",background:"#f8fafc",borderTop:"0.5px solid #e2e8f0",borderBottom:"0.5px solid #e2e8f0"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24,textAlign:"center"}}>
          {[
            {num:"30+",label:"Legal Document Types"},
            {num:"500+",label:"IPC Sections Covered"},
            {num:"24/7",label:"Always Available"},
            {num:"Free",label:"To Get Started"},
          ].map(stat => (
            <div key={stat.label}>
              <div style={{fontSize:32,fontWeight:700,color:"#2563eb"}}>{stat.num}</div>
              <div style={{fontSize:13,color:"#64748b",marginTop:4}}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{padding:"80px 5%"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <h2 style={{fontSize:"clamp(24px,3vw,36px)",fontWeight:700,color:"#0f172a",margin:"0 0 12px"}}>Everything you need for legal help</h2>
            <p style={{fontSize:16,color:"#64748b",margin:0}}>One platform for all your legal needs — simple, fast, and intelligent</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24}}>
            {[
              {icon:"💬",title:"AI Legal Chat",desc:"Ask any legal question in plain English. Get instant, detailed answers based on Indian law — IPC, CrPC, Constitution, and more.",color:"#eff6ff",border:"#bfdbfe"},
              {icon:"📄",title:"Document Generator",desc:"Generate 30+ professional legal documents in seconds — rental agreements, legal notices, affidavits, bail applications, and more.",color:"#f0fdf4",border:"#bbf7d0"},
              {icon:"🔍",title:"Live Case Search",desc:"Search real Indian court judgments and case laws from IndiaKanoon, Bar & Bench, and LiveLaw — always up to date.",color:"#faf5ff",border:"#e9d5ff"},
              {icon:"📂",title:"Document Learning",desc:"Upload your own legal documents — case files, agreements, judgments — and the AI learns from them to give personalized answers.",color:"#fff7ed",border:"#fed7aa"},
              {icon:"⚖️",title:"Lawyer Connect",desc:"Connect with verified Indian lawyers for consultation. Get expert advice for your specific situation starting at Rs 499.",color:"#fef2f2",border:"#fecaca"},
              {icon:"🔒",title:"Secure & Private",desc:"Your legal queries and documents are completely private and secure. We never share your data with anyone.",color:"#f0f9ff",border:"#bae6fd"},
            ].map(f => (
              <div key={f.title} style={{background:f.color,border:`1px solid ${f.border}`,borderRadius:16,padding:24}}>
                <div style={{fontSize:32,marginBottom:12}}>{f.icon}</div>
                <h3 style={{fontSize:16,fontWeight:600,color:"#0f172a",margin:"0 0 8px"}}>{f.title}</h3>
                <p style={{fontSize:13,color:"#475569",lineHeight:1.6,margin:0}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section style={{padding:"80px 5%",background:"#f8fafc"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <h2 style={{fontSize:"clamp(24px,3vw,36px)",fontWeight:700,color:"#0f172a",margin:"0 0 12px"}}>Built for every Indian</h2>
            <p style={{fontSize:16,color:"#64748b",margin:0}}>Whether you are a student, lawyer, or common citizen — we have you covered</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24}}>
            {[
              {icon:"🎓",title:"Law Students",desc:"Understand complex legal concepts, prepare for exams, research case laws, and draft practice documents with AI assistance.",items:["Case law research","IPC section explanations","Moot court preparation","Legal drafting practice"]},
              {icon:"⚖️",title:"Lawyers & Advocates",desc:"Save hours of drafting time, research faster, and provide better service to your clients with AI-powered legal tools.",items:["Fast document drafting","Client communication templates","Case research automation","Legal notice generation"]},
              {icon:"👨‍👩‍👧",title:"Common Citizens",desc:"Know your rights, understand legal notices, get plain-language explanations of complex laws without expensive consultations.",items:["Know your rights","Understand legal notices","Tenant and employee rights","Consumer protection laws"]},
            ].map(u => (
              <div key={u.title} style={{background:"white",border:"0.5px solid #e2e8f0",borderRadius:16,padding:28}}>
                <div style={{fontSize:36,marginBottom:12}}>{u.icon}</div>
                <h3 style={{fontSize:18,fontWeight:700,color:"#0f172a",margin:"0 0 8px"}}>{u.title}</h3>
                <p style={{fontSize:13,color:"#64748b",lineHeight:1.6,margin:"0 0 16px"}}>{u.desc}</p>
                <ul style={{margin:0,padding:0,listStyle:"none"}}>
                  {u.items.map(item => (
                    <li key={item} style={{fontSize:13,color:"#374151",padding:"4px 0",display:"flex",alignItems:"center",gap:8}}>
                      <span style={{color:"#22c55e",fontWeight:700}}>✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{padding:"80px 5%"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <h2 style={{fontSize:"clamp(24px,3vw,36px)",fontWeight:700,color:"#0f172a",margin:"0 0 12px"}}>How it works</h2>
            <p style={{fontSize:16,color:"#64748b",margin:0}}>Get legal help in 3 simple steps</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:32,textAlign:"center"}}>
            {[
              {step:"1",title:"Ask your question",desc:"Type your legal question in plain English — no legal jargon needed",color:"#dbeafe"},
              {step:"2",title:"AI analyses it",desc:"Our AI searches Indian laws, IPC sections, and real court judgments",color:"#dcfce7"},
              {step:"3",title:"Get instant answer",desc:"Receive a clear, detailed answer with relevant laws and next steps",color:"#ede9fe"},
            ].map(s => (
              <div key={s.step} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
                <div style={{width:56,height:56,background:s.color,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:"#1e293b"}}>{s.step}</div>
                <h3 style={{fontSize:16,fontWeight:600,color:"#0f172a",margin:0}}>{s.title}</h3>
                <p style={{fontSize:13,color:"#64748b",lineHeight:1.6,margin:0}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{padding:"80px 5%",background:"linear-gradient(135deg,#2563eb,#7c3aed)",textAlign:"center"}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <h2 style={{fontSize:"clamp(24px,3vw,40px)",fontWeight:700,color:"white",margin:"0 0 16px"}}>Ready to know your legal rights?</h2>
          <p style={{fontSize:16,color:"#bfdbfe",margin:"0 0 36px",lineHeight:1.7}}>Join thousands of Indians who use AdvokateAI Panda for legal help every day. Start free — no credit card needed.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/app" style={{background:"white",color:"#2563eb",padding:"14px 32px",borderRadius:12,fontSize:15,fontWeight:700,textDecoration:"none"}}>Start for Free →</Link>
            <Link href="/pricing" style={{background:"transparent",color:"white",padding:"14px 32px",borderRadius:12,fontSize:15,fontWeight:600,textDecoration:"none",border:"1.5px solid rgba(255,255,255,0.4)"}}>View Pricing</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:"40px 5%",background:"#0f172a",color:"#94a3b8"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:32,marginBottom:32}}>
            <div>
              <div style={{fontSize:16,fontWeight:700,color:"white",marginBottom:8}}>AdvokateAI Panda</div>
              <p style={{fontSize:13,lineHeight:1.7,margin:0}}>India's smartest AI-powered legal assistant. Free to start, always available.</p>
            </div>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:"white",marginBottom:12,textTransform:"uppercase",letterSpacing:0.5}}>Features</div>
              {["AI Legal Chat","Document Generator","Lawyer Connect","Case Search"].map(item => (
                <div key={item} style={{fontSize:13,padding:"4px 0"}}>{item}</div>
              ))}
            </div>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:"white",marginBottom:12,textTransform:"uppercase",letterSpacing:0.5}}>Legal Areas</div>
              {["Criminal Law","Civil Law","Family Law","Property Law"].map(item => (
                <div key={item} style={{fontSize:13,padding:"4px 0"}}>{item}</div>
              ))}
            </div>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:"white",marginBottom:12,textTransform:"uppercase",letterSpacing:0.5}}>Company</div>
              {["About Us","Privacy Policy","Terms of Service","Contact"].map(item => (
                <div key={item} style={{fontSize:13,padding:"4px 0"}}>{item}</div>
              ))}
            </div>
          </div>
          <div style={{borderTop:"0.5px solid #1e293b",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
            <div style={{fontSize:12}}>© 2025 AdvokateAI Panda. All rights reserved.</div>
            <div style={{fontSize:12}}>For educational purposes only. Always consult a qualified lawyer.</div>
          </div>
        </div>
      </footer>

    </div>
  );
}