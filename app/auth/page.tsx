"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

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
      if (error) { setMessage(error.message); } else { router.push("/"); }
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
      if (error) { setMessage(error.message); } else { setMessage("Account created! Please check your email to verify."); }
    }
    setLoading(false);
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin } });
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-blue-400">AdvokateAI Panda</h1>
          <p className="text-gray-400 text-sm mt-1">Indias smartest AI-powered legal assistant</p>
        </div>
        <div className="bg-gray-900 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex gap-2">
            <button onClick={() => setIsLogin(true)} className={"flex-1 py-2 rounded-lg text-sm font-semibold " + (isLogin ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300")}>Login</button>
            <button onClick={() => setIsLogin(false)} className={"flex-1 py-2 rounded-lg text-sm font-semibold " + (!isLogin ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300")}>Sign Up</button>
          </div>
          {!isLogin && (
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Full Name</label>
              <input className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm outline-none border border-gray-700 focus:border-blue-500" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} />
            </div>
          )}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Email</label>
            <input className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm outline-none border border-gray-700 focus:border-blue-500" placeholder="Enter your email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Password</label>
            <input className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm outline-none border border-gray-700 focus:border-blue-500" placeholder="Enter your password" type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAuth()} />
          </div>
          {message && <p className={"text-sm text-center " + (message.includes("created") ? "text-green-400" : "text-red-400")}>{message}</p>}
          <button onClick={handleAuth} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-3 rounded-xl font-semibold">
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
          </button>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-gray-500 text-xs">OR</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>
          <button onClick={handleGoogleLogin} className="w-full bg-white hover:bg-gray-100 text-gray-900 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
            Continue with Google
          </button>
        </div>
        <p className="text-center text-gray-600 text-xs">By signing up you agree to our terms. AdvokateAI Panda</p>
      </div>
    </main>
  );
}
