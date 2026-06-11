"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleAuth() {
    setLoading(true);
    setMessage("");
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setMessage(error.message); } else { router.push("/app"); }
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
      if (error) { setMessage(error.message); } else { setMessage("Account created! Please check your email to verify."); }
    }
    setLoading(false);
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin + "/app" } });
  }

  return (
    <div style={{minHeight:"100vh",background:"#f0f7ff",display:"flex",flexDirection:"column",fontFamily:"Inter,-apple-system,sans-serif"}}>

      {/* NAVBAR */}
      <nav style={{background:"white",borderBottom:"0.5px solid #e2e8f0",padding:"0 5%",height:60,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Link href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}>
          <div style={{width:34,height:34,background:"#2563eb",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:16}}>A</div>
          <div style={{fontSize:15,fontWeight:700,color:"#1e293b"}}>AdvokateAI Panda</div>
        </Link>
        <Link href="/" style={{fontSize:13,color:"#64748b",textDecoration:"none"}}>Back to Home</Link>
      </nav>

      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 5%"}}>
        <div style={{width:"100%",maxWidth:440}}>

          {/* HEADER */}
          <div style={{textAlign:"center" as const,marginBottom:32}}>
            <div style={{width:56,height:56,background:"#2563eb",borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:24,margin:"0 auto 16px"}}>A</div>
            <h1 style={{fontSize:24,fontWeight:700,color:"#0f172a",margin:"0 0 8px"}}>{isLogin ? "Welcome back" : "Create your account"}</h1>
            <p style={{fontSize:14,color:"#64748b",margin:0}}>{isLogin ? "Sign in to access your AI legal assistant" : "Start your free legal journey today"}</p>
          </div>

          {/* CARD */}
          <div style={{background:"white",borderRadius:20,border:"0.5px solid #e2e8f0",padding:32,boxShadow:"0 4px 24px rgba(0,0,0,0.06)"}}>

            {/* TABS */}
            <div style={{display:"flex",background:"#f1f5f9",borderRadius:10,padding:4,marginBottom:24}}>
              <button onClick={() => setIsLogin(true)} style={{flex:1,padding:"8px",borderRadius:8,fontSize:13,fontWeight:600,border:"none",cursor:"pointer",background:isLogin?"white":"transparent",color:isLogin?"#2563eb":"#64748b",boxShadow:isLogin?"0 1px 3px rgba(0,0,0,0.1)":"none",transition:"all 0.2s"}}>
                Sign In
              </button>
              <button onClick={() => setIsLogin(false)} style={{flex:1,padding:"8px",borderRadius:8,fontSize:13,fontWeight:600,border:"none",cursor:"pointer",background:!isLogin?"white":"transparent",color:!isLogin?"#2563eb":"#64748b",boxShadow:!isLogin?"0 1px 3px rgba(0,0,0,0.1)":"none",transition:"all 0.2s"}}>
                Sign Up
              </button>
            </div>

            {/* GOOGLE */}
            <button onClick={handleGoogleLogin} style={{width:"100%",background:"white",border:"0.5px solid #e2e8f0",borderRadius:10,padding:"11px",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:20}}>
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Continue with Google
            </button>

            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
              <div style={{flex:1,height:"0.5px",background:"#e2e8f0"}}></div>
              <span style={{fontSize:12,color:"#94a3b8"}}>or</span>
              <div style={{flex:1,height:"0.5px",background:"#e2e8f0"}}></div>
            </div>

            {/* FIELDS */}
            {!isLogin && (
              <div style={{marginBottom:16}}>
                <label style={{fontSize:13,fontWeight:500,color:"#374151",display:"block",marginBottom:6}}>Full Name</label>
                <input style={{width:"100%",background:"#f8fafc",border:"0.5px solid #e2e8f0",borderRadius:10,padding:"11px 14px",fontSize:13,outline:"none",color:"#1e293b",boxSizing:"border-box" as const}} placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} />
              </div>
            )}

            <div style={{marginBottom:16}}>
              <label style={{fontSize:13,fontWeight:500,color:"#374151",display:"block",marginBottom:6}}>Email Address</label>
              <input style={{width:"100%",background:"#f8fafc",border:"0.5px solid #e2e8f0",borderRadius:10,padding:"11px 14px",fontSize:13,outline:"none",color:"#1e293b",boxSizing:"border-box" as const}} placeholder="Enter your email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div style={{marginBottom:20}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <label style={{fontSize:13,fontWeight:500,color:"#374151"}}>Password</label>
                {isLogin && <Link href="#" style={{fontSize:12,color:"#2563eb",textDecoration:"none"}}>Forgot password?</Link>}
              </div>
              <input style={{width:"100%",background:"#f8fafc",border:"0.5px solid #e2e8f0",borderRadius:10,padding:"11px 14px",fontSize:13,outline:"none",color:"#1e293b",boxSizing:"border-box" as const}} placeholder="Enter your password" type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key==="Enter" && handleAuth()} />
            </div>

            {message && (
              <div style={{background:message.includes("created")?"#f0fdf4":"#fef2f2",border:`0.5px solid ${message.includes("created")?"#bbf7d0":"#fecaca"}`,borderRadius:10,padding:"10px 14px",fontSize:13,color:message.includes("created")?"#15803d":"#dc2626",marginBottom:16}}>
                {message}
              </div>
            )}

            <button onClick={handleAuth} disabled={loading} style={{width:"100%",background:"#2563eb",color:"white",padding:"12px",borderRadius:10,fontSize:14,fontWeight:600,border:"none",cursor:"pointer",opacity:loading?0.7:1}}>
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Free Account"}
            </button>
          </div>

          <p style={{textAlign:"center" as const,fontSize:12,color:"#94a3b8",marginTop:20}}>
            By signing up you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}