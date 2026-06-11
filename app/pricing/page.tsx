"use client";
import { useState } from "react";
import Link from "next/link";

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    desc: "Perfect for getting started",
    color: "#f8fafc",
    border: "#e2e8f0",
    buttonBg: "#f1f5f9",
    buttonColor: "#475569",
    popular: false,
    features: [
      "3 AI legal queries per day",
      "3 document generations per month",
      "Basic Indian law coverage",
      "Access to IPC sections",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 299,
    desc: "Best for regular users",
    color: "#eff6ff",
    border: "#2563eb",
    buttonBg: "#2563eb",
    buttonColor: "white",
    popular: true,
    features: [
      "Unlimited AI legal queries",
      "Unlimited document generation",
      "Full Indian law coverage",
      "Live court case search",
      "Upload unlimited documents",
      "Priority support",
      "Download documents as PDF",
    ],
  },
  {
    id: "lawyer",
    name: "Advocate",
    price: 999,
    desc: "For legal professionals",
    color: "#faf5ff",
    border: "#7c3aed",
    buttonBg: "#7c3aed",
    buttonColor: "white",
    popular: false,
    features: [
      "Everything in Pro",
      "White label for your firm",
      "Client management dashboard",
      "Bulk document generation",
      "Custom legal templates",
      "API access",
      "Dedicated support",
    ],
  },
];

const faqs = [
  {q:"Is it really free to start?", a:"Yes! You get 3 free AI queries and 3 document generations every day with no credit card required."},
  {q:"Can I cancel anytime?", a:"Absolutely. Cancel your subscription anytime with no questions asked. No hidden fees."},
  {q:"Is my legal data private?", a:"100% yes. Your queries and documents are completely private and encrypted. We never share your data."},
  {q:"What Indian laws are covered?", a:"We cover IPC, CrPC, Constitution, Consumer Protection Act, Rent Control Acts, Labour Laws, Company Law, and 1000+ more."},
  {q:"Can I use it in Hindi?", a:"Currently English only, but Hindi support is coming soon!"},
];

export default function Pricing() {
  const [loading, setLoading] = useState<string|null>(null);
  const [openFaq, setOpenFaq] = useState<number|null>(null);

  async function handlePayment(plan: any) {
    if (plan.price === 0) { window.location.href = "/auth"; return; }
    setLoading(plan.id);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: plan.price, plan: plan.name }),
      });
      const data = await res.json();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount * 100,
        currency: "INR",
        name: "AdvokateAI Panda",
        description: plan.name + " Plan",
        order_id: data.orderId,
        handler: function() { alert("Payment successful! Welcome to " + plan.name + " Plan."); },
        prefill: { name: "", email: "", contact: "" },
        theme: { color: "#2563eb" },
      };
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch { alert("Payment failed. Please try again."); }
    setLoading(null);
  }

  return (
    <div style={{minHeight:"100vh",background:"#ffffff",fontFamily:"Inter,-apple-system,sans-serif"}}>

      {/* NAVBAR */}
      <nav style={{background:"white",borderBottom:"0.5px solid #e2e8f0",padding:"0 5%",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50}}>
        <Link href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}>
          <div style={{width:34,height:34,background:"#2563eb",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:16}}>A</div>
          <div style={{fontSize:15,fontWeight:700,color:"#1e293b"}}>AdvokateAI Panda</div>
        </Link>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <Link href="/app" style={{fontSize:13,color:"#475569",textDecoration:"none",padding:"8px 14px"}}>Dashboard</Link>
          <Link href="/auth" style={{background:"#2563eb",color:"white",padding:"8px 18px",borderRadius:8,fontSize:13,fontWeight:600,textDecoration:"none"}}>Sign In</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{padding:"60px 5% 40px",textAlign:"center" as const,background:"#f0f7ff"}}>
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#dbeafe",color:"#1d4ed8",padding:"6px 16px",borderRadius:999,fontSize:12,fontWeight:500,marginBottom:20}}>
            Simple transparent pricing
          </div>
          <h1 style={{fontSize:40,fontWeight:700,color:"#0f172a",margin:"0 0 16px"}}>Choose your plan</h1>
          <p style={{fontSize:16,color:"#64748b",margin:0,lineHeight:1.7}}>Start free and upgrade when you need more. No hidden fees, cancel anytime.</p>
        </div>
      </section>

      {/* PLANS */}
      <section style={{padding:"60px 5%"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24,alignItems:"start"}}>
          {plans.map(plan => (
            <div key={plan.id} style={{background:plan.color,border:`${plan.popular?"2px":"0.5px"} solid ${plan.border}`,borderRadius:20,padding:28,position:"relative" as const}}>
              {plan.popular && (
                <div style={{position:"absolute" as const,top:-14,left:"50%",transform:"translateX(-50%)",background:"#2563eb",color:"white",padding:"4px 20px",borderRadius:999,fontSize:12,fontWeight:600,whiteSpace:"nowrap" as const}}>
                  Most Popular
                </div>
              )}
              <div style={{marginBottom:20}}>
                <h2 style={{fontSize:20,fontWeight:700,color:"#0f172a",margin:"0 0 4px"}}>{plan.name}</h2>
                <p style={{fontSize:13,color:"#64748b",margin:"0 0 16px"}}>{plan.desc}</p>
                <div style={{display:"flex",alignItems:"baseline",gap:4}}>
                  {plan.price === 0 ? (
                    <span style={{fontSize:36,fontWeight:700,color:"#22c55e"}}>Free</span>
                  ) : (
                    <>
                      <span style={{fontSize:13,color:"#64748b"}}>Rs</span>
                      <span style={{fontSize:36,fontWeight:700,color:"#0f172a"}}>{plan.price}</span>
                      <span style={{fontSize:13,color:"#64748b"}}>/month</span>
                    </>
                  )}
                </div>
              </div>
              <ul style={{margin:"0 0 24px",padding:0,listStyle:"none",display:"flex",flexDirection:"column",gap:10}}>
                {plan.features.map(feature => (
                  <li key={feature} style={{display:"flex",alignItems:"center",gap:10,fontSize:13,color:"#374151"}}>
                    <span style={{width:20,height:20,background:"#dcfce7",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#16a34a",flexShrink:0}}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePayment(plan)}
                disabled={loading === plan.id}
                style={{width:"100%",background:plan.buttonBg,color:plan.buttonColor,padding:"12px",borderRadius:10,fontSize:14,fontWeight:600,border:`0.5px solid ${plan.border}`,cursor:"pointer",opacity:loading===plan.id?0.7:1}}
              >
                {loading === plan.id ? "Processing..." : plan.price === 0 ? "Get Started Free" : "Subscribe Now"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* LAWYER CONNECT */}
      <section style={{padding:"60px 5%",background:"#f8fafc"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center" as const,marginBottom:40}}>
            <h2 style={{fontSize:32,fontWeight:700,color:"#0f172a",margin:"0 0 12px"}}>Need a real lawyer?</h2>
            <p style={{fontSize:15,color:"#64748b",margin:0}}>Connect with verified Indian lawyers for your specific legal needs</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16}}>
            {[
              {icon:"⚖️",area:"Civil Law",price:"Rs 499"},
              {icon:"🔒",area:"Criminal Law",price:"Rs 599"},
              {icon:"👨‍👩‍👧",area:"Family Law",price:"Rs 499"},
              {icon:"🏠",area:"Property Law",price:"Rs 699"},
              {icon:"🏢",area:"Corporate Law",price:"Rs 799"},
              {icon:"🛒",area:"Consumer Law",price:"Rs 399"},
            ].map(item => (
              <button
                key={item.area}
                onClick={() => alert("Lawyer referral coming soon! We will connect you with a verified " + item.area + " expert.")}
                style={{background:"white",border:"0.5px solid #e2e8f0",borderRadius:14,padding:"20px 16px",textAlign:"center" as const,cursor:"pointer",transition:"all 0.2s"}}
              >
                <div style={{fontSize:28,marginBottom:8}}>{item.icon}</div>
                <div style={{fontSize:14,fontWeight:600,color:"#1e293b",marginBottom:4}}>{item.area}</div>
                <div style={{fontSize:12,color:"#2563eb",fontWeight:500}}>From {item.price}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{padding:"60px 5%"}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <div style={{textAlign:"center" as const,marginBottom:40}}>
            <h2 style={{fontSize:32,fontWeight:700,color:"#0f172a",margin:"0 0 12px"}}>Frequently asked questions</h2>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {faqs.map((faq, i) => (
              <div key={i} style={{background:"white",border:"0.5px solid #e2e8f0",borderRadius:12,overflow:"hidden"}}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{width:"100%",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",background:"none",border:"none",cursor:"pointer",textAlign:"left" as const}}
                >
                  <span style={{fontSize:14,fontWeight:500,color:"#1e293b"}}>{faq.q}</span>
                  <span style={{fontSize:18,color:"#64748b",transform:openFaq===i?"rotate(45deg)":"rotate(0)",transition:"transform 0.2s"}}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{padding:"0 20px 16px",fontSize:13,color:"#64748b",lineHeight:1.7}}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:"24px 5%",background:"#0f172a",color:"#94a3b8",textAlign:"center" as const}}>
        <div style={{fontSize:12}}>2025 AdvokateAI Panda. For educational purposes only. Always consult a qualified lawyer.</div>
        <div style={{marginTop:8,display:"flex",justifyContent:"center",gap:20}}>
          <Link href="/" style={{fontSize:12,color:"#64748b",textDecoration:"none"}}>Home</Link>
          <Link href="/app" style={{fontSize:12,color:"#64748b",textDecoration:"none"}}>Dashboard</Link>
          <Link href="/documents-generator" style={{fontSize:12,color:"#64748b",textDecoration:"none"}}>Documents</Link>
          <Link href="/auth" style={{fontSize:12,color:"#64748b",textDecoration:"none"}}>Sign In</Link>
        </div>
      </footer>

    </div>
  );
}