"use client";
import { useState } from "react";
import Link from "next/link";
const cats = [
  { cat: "Litigation", docs: [
    { id: "bail", name: "Bail Application", fields: ["Applicant Name","Age","Address","Case Number","Charges","Court Name","Reason for Bail","Surety Details"] },
    { id: "anticipatory", name: "Anticipatory Bail", fields: ["Applicant Name","Age","Address","Apprehended Offence","Section of Law","Court Name","Grounds for Bail","Surety Details"] },
    { id: "civil-suit", name: "Civil Suit Plaint", fields: ["Plaintiff Name","Plaintiff Address","Defendant Name","Defendant Address","Court Name","Facts of Case","Relief Sought","Valuation"] },
    { id: "writ", name: "Writ Petition", fields: ["Petitioner Name","Petitioner Address","Respondent Name","High Court Name","Type of Writ","Facts","Grounds","Relief Sought"] },
    { id: "consumer", name: "Consumer Complaint", fields: ["Complainant Name","Complainant Address","Opposite Party Name","Opposite Party Address","Product or Service","Deficiency Details","Amount Paid","Relief Sought"] },
    { id: "fir", name: "Police Complaint", fields: ["Complainant Name","Complainant Address","Police Station","Date of Incident","Place of Incident","Accused Details","Description","Witnesses"] },
    { id: "cheque", name: "Cheque Bounce Notice", fields: ["Payee Name","Payee Address","Drawer Name","Drawer Address","Cheque Number","Cheque Amount","Date of Dishonour","Bank Name"] },
    { id: "divorce", name: "Divorce Petition", fields: ["Petitioner Name","Petitioner Address","Respondent Name","Respondent Address","Date of Marriage","Place of Marriage","Grounds","Children Details"] },
    { id: "vakalatnama", name: "Vakalatnama", fields: ["Client Name","Client Address","Advocate Name","Bar Council Number","Court Name","Case Details","Powers Granted"] },
  ]},
  { cat: "Corporate", docs: [
    { id: "employment", name: "Employment Contract", fields: ["Company Name","Company Address","Employee Name","Designation","Monthly Salary","Start Date","Working Hours","Notice Period"] },
    { id: "nda", name: "NDA", fields: ["Disclosing Party Name","Disclosing Party Address","Receiving Party Name","Receiving Party Address","Purpose","Information Type","Duration","Jurisdiction"] },
    { id: "mou", name: "MOU", fields: ["Party 1 Name","Party 1 Address","Party 2 Name","Party 2 Address","Purpose","Responsibilities Party 1","Responsibilities Party 2","Duration"] },
    { id: "service", name: "Service Agreement", fields: ["Service Provider Name","Service Provider Address","Client Name","Client Address","Services","Payment Terms","Duration","Termination"] },
    { id: "partnership", name: "Partnership Deed", fields: ["Partner 1 Name","Partner 2 Name","Business Name","Business Address","Capital Contribution","Profit Sharing","Duration","Responsibilities"] },
    { id: "loan", name: "Loan Agreement", fields: ["Lender Name","Lender Address","Borrower Name","Borrower Address","Loan Amount","Interest Rate","Repayment Schedule","Security"] },
    { id: "consultancy", name: "Consultancy Agreement", fields: ["Consultant Name","Consultant Address","Client Name","Client Address","Scope of Work","Fees","Duration","IP Rights"] },
  ]},
  { cat: "Property", docs: [
    { id: "rental", name: "Rental Agreement", fields: ["Landlord Name","Tenant Name","Property Address","Monthly Rent","Security Deposit","Lease Duration","Start Date","Notice Period"] },
    { id: "sale", name: "Sale Deed", fields: ["Seller Name","Seller Address","Buyer Name","Buyer Address","Property Description","Sale Amount","Payment Terms","Possession Date"] },
    { id: "gift", name: "Gift Deed", fields: ["Donor Name","Donor Address","Donee Name","Donee Address","Property Description","Relationship","Date of Transfer","Witnesses"] },
    { id: "lease", name: "Lease Deed", fields: ["Lessor Name","Lessee Name","Property Address","Lease Amount","Security Deposit","Lease Period","Start Date","Renewal Terms"] },
  ]},
  { cat: "General", docs: [
    { id: "affidavit", name: "Affidavit", fields: ["Deponent Name","Age","Address","Purpose","Facts to Declare","Place of Execution"] },
    { id: "notice", name: "Legal Notice", fields: ["Sender Name","Sender Address","Recipient Name","Recipient Address","Subject","Details of Grievance","Relief Sought","Time to Respond"] },
    { id: "demand", name: "Demand Letter", fields: ["Sender Name","Sender Address","Recipient Name","Recipient Address","Amount Owed","Reason","Due Date","Consequences"] },
    { id: "poa", name: "Power of Attorney", fields: ["Grantor Name","Grantor Address","Attorney Name","Attorney Address","Powers Granted","Duration","Place of Execution"] },
    { id: "undertaking", name: "Undertaking Letter", fields: ["Name","Address","Purpose","Commitments Made","Duration","Place of Execution"] },
  ]},
];
export default function DocumentsGenerator() {
  const [selected, setSelected] = useState<any>(null);
  const [fields, setFields] = useState<any>({});
  const [generating, setGenerating] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState("");
  const [activeCat, setActiveCat] = useState(0);
  function selectDoc(doc: any) { setSelected(doc); setFields({}); setGeneratedDoc(""); }
  async function generateDocument() {
    if (!selected) return;
    setGenerating(true);
    setGeneratedDoc("");
    const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ documentType: selected.name, details: fields }) });
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
  return (
    <main className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">AdvokateAI Panda</h1>
            <p className="text-gray-400 text-sm mt-1">Legal Document Generator</p>
          </div>
          <Link href="/" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm">Back to Chat</Link>
        </div>
        {!selected ? (
          <div>
            <div className="flex gap-2 mb-6 flex-wrap">
              {cats.map((c, i) => (
                <button key={i} onClick={() => setActiveCat(i)} className={"px-4 py-2 rounded-lg text-sm font-semibold " + (activeCat === i ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700")}>{c.cat}</button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cats[activeCat].docs.map((doc: any) => (
                <button key={doc.id} onClick={() => selectDoc(doc)} className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 rounded-xl p-4 text-left transition-all">
                  <p className="font-semibold text-white">{doc.name}</p>
                  <p className="text-gray-400 text-xs mt-1">{doc.fields.length} fields required</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setSelected(null)} className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm">Back</button>
              <h2 className="text-xl font-semibold">{selected.name}</h2>
            </div>
            {!generatedDoc ? (
              <div className="bg-gray-900 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-4">Fill in the details to generate your document</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selected.fields.map((field: string) => (
                    <div key={field}>
                      <label className="text-sm text-gray-300 mb-1 block">{field}</label>
                      <input className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm outline-none border border-gray-700 focus:border-blue-500" placeholder={"Enter " + field.toLowerCase()} value={fields[field] || ""} onChange={(e: any) => setFields((prev: any) => ({ ...prev, [field]: e.target.value }))} />
                    </div>
                  ))}
                </div>
                <button onClick={generateDocument} disabled={generating} className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold w-full">
                  {generating ? "Generating..." : "Generate Document"}
                </button>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-green-400">Document Generated!</h3>
                  <div className="flex gap-2">
                    <button onClick={downloadDocument} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">Download</button>
                    <button onClick={() => setGeneratedDoc("")} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">Regenerate</button>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 max-h-96 overflow-y-auto">
                  <pre className="text-gray-200 text-xs whitespace-pre-wrap font-mono">{generatedDoc}</pre>
                </div>
              </div>
            )}
          </div>
        )}
        <p className="text-center text-gray-600 text-xs mt-6">For educational purposes only. Always consult a qualified lawyer. AdvokateAI Panda</p>
      </div>
    </main>
  );
}
