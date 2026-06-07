"use client";
import { useState } from "react";
import Link from "next/link";
const plans = [
  { id: "free", name: "Free Plan", price: 0, color: "border-gray-700", buttonColor: "bg-gray-700 hover:bg-gray-600", popular: false, features: ["5 AI legal queries per day","3 document generations per month","Basic Indian law coverage","Email support"] },
  { id: "pro", name: "Pro Plan", price: 299, color: "border-blue-500", buttonColor: "bg-blue-600 hover:bg-blue-700", popular: true, features: ["Unlimited AI legal queries","Unlimited document generation","Full Indian law coverage","Live court case search","Upload unlimited documents","Priority support"] },
  { id: "lawyer", name: "Lawyer Plan", price: 999, color: "border-purple-500", buttonColor: "bg-purple-600 hover:bg-purple-700", popular: false, features: ["Everything in Pro","White label for your firm","Client management dashboard","Bulk document generation","Custom legal templates","Dedicated support"] },
];
export default function Pricing() {
  const [loading, setLoading] = useState<string|null>(null);
  async function handlePayment(plan: any) {
    if (plan.price === 0) return;
    setLoading(plan.id);
    try {
      const res = await fetch("/api/payment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ amount: plan.price, plan: plan.name }) });
      const data = await res.json();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount * 100,
        currency: "INR",
        name: "AdvokateAI Panda",
        description: plan.name,
        order_id: data.orderId,
        handler: function() { alert("Payment successful! Welcome to " + plan.name); },
        prefill: { name: "User", email: "", contact: "" },
        theme: { color: "#3B82F6" },
      };
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch { alert("Payment failed. Please try again."); }
    setLoading(null);
  }
  return (
    <main className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-400">AdvokateAI Panda</h1>
          <p className="text-gray-400 mt-2">Simple transparent pricing for everyone</p>
          <Link href="/" className="inline-block mt-3 text-blue-400 hover:text-blue-300 text-sm">Back to Chat</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className={"bg-gray-900 rounded-2xl p-6 border-2 flex flex-col relative " + plan.color}>
              {plan.popular && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-4 py-1 rounded-full font-semibold">Most Popular</div>}
              <h2 className="text-xl font-bold text-white mb-2">{plan.name}</h2>
              <div className="mb-4">
                {plan.price === 0 ? <span className="text-3xl font-bold text-green-400">Free</span> : <span className="text-3xl font-bold text-white">Rs {plan.price}<span className="text-gray-400 text-sm font-normal">/month</span></span>}
              </div>
              <ul className="flex flex-col gap-2 mb-6 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300"><span className="text-green-400">?</span>{feature}</li>
                ))}
              </ul>
              <button onClick={() => handlePayment(plan)} disabled={loading === plan.id} className={"w-full py-3 rounded-xl font-semibold text-white transition-all " + plan.buttonColor}>
                {loading === plan.id ? "Processing..." : plan.price === 0 ? "Get Started Free" : "Subscribe Now"}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-gray-900 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Need a Lawyer?</h2>
          <p className="text-gray-400 text-center mb-6">Connect with verified Indian lawyers. Get a 30-minute consultation starting at Rs 499.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Civil Law","Criminal Law","Family Law","Property Law","Corporate Law","Consumer Law"].map((area) => (
              <button key={area} className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 rounded-xl p-4 text-left transition-all" onClick={() => alert("Lawyer referral coming soon! We will connect you with a verified " + area + " expert.")}>
                <p className="font-semibold text-white">{area}</p>
                <p className="text-gray-400 text-xs mt-1">Book consultation from Rs 499</p>
              </button>
            ))}
          </div>
        </div>
        <p className="text-center text-gray-600 text-xs mt-6">Secure payments powered by Razorpay. AdvokateAI Panda</p>
      </div>
    </main>
  );
}
