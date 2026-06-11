"use client";
import { useState } from "react";
import Link from "next/link";

const categories = [
  {
    id: "litigation",
    icon: "🏛️",
    label: "Litigation",
    color: "#fef2f2",
    border: "#fecaca",
    activeColor: "#dc2626",
    docs: [
      { id: "bail-application", name: "Bail Application", fields: ["Applicant Name", "Age", "Address", "Case Number", "Charges", "Court Name", "Reason for Bail", "Surety Details"] },
      { id: "anticipatory-bail", name: "Anticipatory Bail", fields: ["Applicant Name", "Age", "Address", "Apprehended Offence", "Section of Law", "Court Name", "Grounds for Bail", "Surety Details"] },
      { id: "civil-suit", name: "Civil Suit Plaint", fields: ["Plaintiff Name", "Plaintiff Address", "Defendant Name", "Defendant Address", "Court Name", "Facts of Case", "Relief Sought", "Valuation of Suit"] },
      { id: "written-statement", name: "Written Statement", fields: ["Defendant Name", "Defendant Address", "Plaintiff Name", "Case Number", "Court Name", "Preliminary Objections", "Reply to Facts", "Counter Claims"] },
      { id: "writ-petition", name: "Writ Petition", fields: ["Petitioner Name", "Petitioner Address", "Respondent Name", "High Court Name", "Type of Writ", "Facts", "Grounds", "Relief Sought"] },
      { id: "consumer-complaint", name: "Consumer Complaint", fields: ["Complainant Name", "Complainant Address", "Opposite Party Name", "Opposite Party Address", "Product or Service", "Deficiency Details", "Amount Paid", "Relief Sought"] },
      { id: "fir-complaint", name: "Police Complaint", fields: ["Complainant Name", "Complainant Address", "Police Station", "Date of Incident", "Place of Incident", "Accused Details", "Description of Incident", "Witnesses"] },
      { id: "cheque-bounce", name: "Cheque Bounce Notice", fields: ["Payee Name", "Payee Address", "Drawer Name", "Drawer Address", "Cheque Number", "Cheque Amount", "Date of Dishonour", "Bank Name"] },
      { id: "divorce-petition", name: "Divorce Petition", fields: ["Petitioner Name", "Petitioner Address", "Respondent Name", "Respondent Address", "Date of Marriage", "Place of Marriage", "Grounds for Divorce", "Children Details"] },
      { id: "vakalatnama", name: "Vakalatnama", fields: ["Client Name", "Client Address", "Advocate Name", "Bar Council Number", "Court Name", "Case Details", "Powers Granted"] },
    ]
  },
  {
    id: "corporate",
    icon: "🏢",
    label: "Corporate",
    color: "#eff6ff",
    border: "#bfdbfe",
    activeColor: "#2563eb",
    docs: [
      { id: "employment", name: "Employment Contract", fields: ["Company Name", "Company Address", "Employee Name", "Designation", "Monthly Salary", "Start Date", "Working Hours", "Notice Period"] },
      { id: "nda", name: "Non Disclosure Agreement", fields: ["Disclosing Party Name", "Disclosing Party Address", "Receiving Party Name", "Receiving Party Address", "Purpose", "Information Type", "Duration", "Jurisdiction"] },
      { id: "mou", name: "Memorandum of Understanding", fields: ["Party 1 Name", "Party 1 Address", "Party 2 Name", "Party 2 Address", "Purpose of MOU", "Responsibilities Party 1", "Responsibilities Party 2", "Duration"] },
      { id: "service-agreement", name: "Service Agreement", fields: ["Service Provider Name", "Service Provider Address", "Client Name", "Client Address", "Services Provided", "Payment Terms", "Duration", "Termination Clause"] },
      { id: "partnership-deed", name: "Partnership Deed", fields: ["Partner 1 Name", "Partner 2 Name", "Business Name", "Business Address", "Capital Contribution", "Profit Sharing Ratio", "Duration", "Responsibilities"] },
      { id: "loan-agreement", name: "Loan Agreement", fields: ["Lender Name", "Lender Address", "Borrower Name", "Borrower Address", "Loan Amount", "Interest Rate", "Repayment Schedule", "Security"] },
      { id: "consultancy", name: "Consultancy Agreement", fields: ["Consultant Name", "Consultant Address", "Client Name", "Client Address", "Scope of Work", "Fees", "Duration", "IP Rights"] },
    ]
  },
  {
    id: "property",
    icon: "🏠",
    label: "Property",
    color: "#f0fdf4",
    border: "#bbf7d0",
    activeColor: "#16a34a",
    docs: [
      { id: "rental", name: "Rental Agreement", fields: ["Landlord Name", "Tenant Name", "Property Address", "Monthly Rent", "Security Deposit", "Lease Duration", "Start Date", "Notice Period"] },
      { id: "sale-deed", name: "Sale Deed", fields: ["Seller Name", "Seller Address", "Buyer Name", "Buyer Address", "Property Description", "Sale Amount", "Payment Terms", "Possession Date"] },
      { id: "gift-deed", name: "Gift Deed", fields: ["Donor Name", "Donor Address", "Donee Name", "Donee Address", "Property Description", "Relationship", "Date of Transfer", "Witnesses"] },
      { id: "lease-deed", name: "Lease Deed", fields: ["Lessor Name", "Lessee Name", "Property Address", "Lease Amount", "Security Deposit", "Lease Period", "Start Date", "Renewal Terms"] },
    ]
  },
  {
    id: "general",
    icon: "📋",
    label: "General",
    color: "#faf5ff",
    border: "#e9d5ff",
    activeColor: "#7c3aed",
    docs: [
      { id: "affidavit", name: "Affidavit", fields: ["Deponent Name", "Age", "Address", "Purpose of Affidavit", "Facts to Declare", "Place of Execution"] },
      { id: "legal-notice", name: "Legal Notice", fields: ["Sender Name", "Sender Address", "Recipient Name", "Recipient Address", "Subject of Notice", "Details of Grievance", "Relief Sought", "Time Period to Respond"] },
      { id: "demand-letter", name: "Demand Letter", fields: ["Sender Name", "Sender Address", "Recipient Name", "Recipient Address", "Amount Owed", "Reason for Demand", "Due Date", "Consequences if Unpaid"] },
      { id: "power-of-attorney", name: "Power of Attorney", fields: ["Grantor Name", "Grantor Address", "Attorney Name", "Attorney Address", "Powers Granted", "Duration", "Place of Execution"] },
      { id: "undertaking", name: "Undertaking Letter", fields: ["Name", "Address", "Purpose of Undertaking", "Commitments Made", "Duration", "Place of Execution"] },
    ]
  }
];export default function DocumentsGenerator() {
  const [activeCat, setActiveCat] = useState(0);
  const [selected, setSelected] = useState<any>(null);
  const [fields, setFields] = useState<any>({});
  const [generating, setGenerating] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState("");

  function selectDoc(doc: any) {
    setSelected(doc);
    setFields({});
    setGeneratedDoc("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function generateDocument() {
    if (!selected) return;
    setGenerating(true);
    setGeneratedDoc("");
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentType: selected.name, details: fields }),
    });
    const data = await res.json();
    setGeneratedDoc(data.document || data.error);
    setGenerating(false);
  }

  function downloadDocument() {
    const blob = new Blob([generatedDoc], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = selected.id + "-" + Date.now() + ".txt";
    a.click();
  }

  const activeCatData = categories[activeCat];

  return (
    <div style={{minHeight:"100vh",background:"#f8fafc",fontFamily:"Inter,-apple-system,sans-serif"}}>

      {/* NAVBAR */}
      <nav style={{background:"white",borderBottom:"0.5px solid #e2e8f0",padding:"0 5%",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50}}>
        <Link href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}>
          <div style={{width:34,height:34,background:"#2563eb",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:16}}>A</div>
          <div style={{fontSize:15,fontWeight:700,color:"#1e293b"}}>AdvokateAI Panda</div>
        </Link>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <Link href="/app" style={{fontSize:13,color:"#475569",textDecoration:"none",padding:"8px 14px"}}>AI Chat</Link>
          <Link href="/pricing" style={{fontSize:13,color:"#475569",textDecoration:"none",padding:"8px 14px"}}>Pricing</Link>
          <Link href="/auth" style={{background:"#2563eb",color:"white",padding:"8px 18px",borderRadius:8,fontSize:13,fontWeight:600,textDecoration:"none"}}>Sign In</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{padding:"40px 5% 32px",background:"#f0f7ff",borderBottom:"0.5px solid #e2e8f0"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap" as const,gap:16}}>
          <div>
            <h1 style={{fontSize:28,fontWeight:700,color:"#0f172a",margin:"0 0 8px"}}>Legal Document Generator</h1>
            <p style={{fontSize:14,color:"#64748b",margin:0}}>Generate 30+ professional legal documents instantly — fill the form and download</p>
          </div>
          <div style={{display:"flex",gap:8}}>
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCat(i); setSelected(null); setGeneratedDoc(""); }}
                style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:10,fontSize:13,fontWeight:500,border:`0.5px solid ${activeCat===i ? cat.border : "#e2e8f0"}`,cursor:"pointer",background:activeCat===i ? cat.color : "white",color:activeCat===i ? cat.activeColor : "#475569",transition:"all 0.2s"}}
              >
                <span>{cat.icon}</span>{cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main style={{padding:"32px 5%",maxWidth:1100,margin:"0 auto"}}>

        {!selected ? (
          <div>
            <div style={{marginBottom:24}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
                <span style={{fontSize:20}}>{activeCatData.icon}</span>
                <h2 style={{fontSize:18,fontWeight:700,color:"#0f172a",margin:0}}>{activeCatData.label} Documents</h2>
                <span style={{background:activeCatData.color,color:activeCatData.activeColor,fontSize:11,fontWeight:600,padding:"2px 10px",borderRadius:999,border:`0.5px solid ${activeCatData.border}`}}>{activeCatData.docs.length} templates</span>
              </div>
              <p style={{fontSize:13,color:"#64748b",margin:0}}>Select a document type to get started</p>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16}}>
              {activeCatData.docs.map((doc: any) => (
                <button
                  key={doc.id}
                  onClick={() => selectDoc(doc)}
                  style={{background:"white",border:"0.5px solid #e2e8f0",borderRadius:14,padding:"20px",textAlign:"left" as const,cursor:"pointer",transition:"all 0.2s",display:"flex",flexDirection:"column",gap:8}}
                >
                  <div style={{width:36,height:36,background:activeCatData.color,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{activeCatData.icon}</div>
                  <div style={{fontSize:14,fontWeight:600,color:"#1e293b"}}>{doc.name}</div>
                  <div style={{fontSize:12,color:"#94a3b8"}}>{doc.fields.length} fields required</div>
                  <div style={{fontSize:12,color:activeCatData.activeColor,fontWeight:500,marginTop:4}}>Generate now →</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:generatedDoc?"1fr 1fr":"1fr",gap:24}}>

            {/* FORM */}
            <div style={{background:"white",borderRadius:16,border:"0.5px solid #e2e8f0",padding:28}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
                <button onClick={() => { setSelected(null); setGeneratedDoc(""); }} style={{width:32,height:32,borderRadius:8,border:"0.5px solid #e2e8f0",background:"white",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
                <div>
                  <h2 style={{fontSize:17,fontWeight:700,color:"#0f172a",margin:0}}>{selected.name}</h2>
                  <p style={{fontSize:12,color:"#64748b",margin:0}}>Fill in the details below</p>
                </div>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
                {selected.fields.map((field: string) => (
                  <div key={field}>
                    <label style={{fontSize:12,fontWeight:500,color:"#374151",display:"block",marginBottom:6}}>{field}</label>
                    <input
                      style={{width:"100%",background:"#f8fafc",border:"0.5px solid #e2e8f0",borderRadius:8,padding:"10px 12px",fontSize:13,outline:"none",color:"#1e293b",boxSizing:"border-box" as const}}
                      placeholder={"Enter " + field.toLowerCase()}
                      value={fields[field] || ""}
                      onChange={(e: any) => setFields((prev: any) => ({ ...prev, [field]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={generateDocument}
                disabled={generating}
                style={{width:"100%",background:generating?"#cbd5e1":"#2563eb",color:"white",padding:"13px",borderRadius:10,fontSize:14,fontWeight:600,border:"none",cursor:"pointer"}}
              >
                {generating ? "Generating your document..." : "Generate Document →"}
              </button>
            </div>

            {/* OUTPUT */}
            {generatedDoc && (
              <div style={{background:"white",borderRadius:16,border:"0.5px solid #e2e8f0",padding:28,display:"flex",flexDirection:"column"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                  <div>
                    <h2 style={{fontSize:17,fontWeight:700,color:"#0f172a",margin:"0 0 4px"}}>Document Ready!</h2>
                    <p style={{fontSize:12,color:"#64748b",margin:0}}>Review and download your document</p>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button
                      onClick={downloadDocument}
                      style={{background:"#2563eb",color:"white",padding:"8px 16px",borderRadius:8,fontSize:13,fontWeight:600,border:"none",cursor:"pointer"}}
                    >
                      Download
                    </button>
                    <button
                      onClick={() => setGeneratedDoc("")}
                      style={{background:"#f1f5f9",color:"#475569",padding:"8px 16px",borderRadius:8,fontSize:13,fontWeight:500,border:"none",cursor:"pointer"}}
                    >
                      Regenerate
                    </button>
                  </div>
                </div>
                <div style={{flex:1,background:"#f8fafc",borderRadius:10,padding:16,overflowY:"auto" as const,maxHeight:500,border:"0.5px solid #e2e8f0"}}>
                  <pre style={{fontSize:12,lineHeight:1.7,color:"#374151",whiteSpace:"pre-wrap" as const,margin:0,fontFamily:"'Courier New',monospace"}}>{generatedDoc}</pre>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer style={{padding:"24px 5%",background:"#0f172a",color:"#94a3b8",textAlign:"center" as const,marginTop:40}}>
        <div style={{fontSize:12}}>2025 AdvokateAI Panda. For educational purposes only. Always consult a qualified lawyer.</div>
      </footer>

    </div>
  );
}