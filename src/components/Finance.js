import React from "react";
import "./Finance.css";

const schemes = [
  { id: 1, name: "PM-KISAN", desc: "Direct income support scheme for farmers.", pdf: "pm-kisan.pdf" },
  { id: 2, name: "Kisan Credit Card (KCC)", desc: "Short-term credit for crop & equipment.", pdf: "kcc-form.pdf" },
  { id: 3, name: "Agriculture Infrastructure Fund", desc: "Loans for storage, cold chain and infra.", pdf: null }
];

function Finance() {
  return (
    <div className="finance-page">
      <h2>💰 Finance & Schemes</h2>
      <p className="lead">Download scheme details and forms. For help contact local bank or agri officer.</p>

      <div className="scheme-grid">
        {schemes.map(s => (
          <div className="scheme-card" key={s.id}>
            <h3>{s.name}</h3>
            <p>{s.desc}</p>
            <div className="scheme-actions">
              {s.pdf ? (
                <>
                  <a href={`/resources/${s.pdf}`} target="_blank" rel="noopener noreferrer" className="btn">Open PDF</a>
                  <a href={`/resources/${s.pdf}`} download className="btn-outline">Download</a>
                </>
              ) : (
                <a href="#" className="btn-disabled">Info Coming</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Finance;
