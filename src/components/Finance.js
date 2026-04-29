import React from "react";
import "./Finance.css";

const schemes = [
  {
    id: 1,
    name: "PM-KISAN",
    desc: "Income support scheme for landholding farmers (DBT).",
    links: [
      {
        label: "Operational Guidelines (PDF)",
        url: "https://krishi.maharashtra.gov.in/Site/Upload/Pdf/PM%20KISAN%20OPERATIONAL%20GUIDELINES.pdf",
      },
      {
        label: "FAQs (PIB PDF)",
        url: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2021/nov/doc2021112361.pdf",
      },
      { label: "Official Portal", url: "https://pmkisan.gov.in/" },
    ],
  },
  {
    id: 2,
    name: "Kisan Credit Card (KCC)",
    desc: "Short-term credit for crop and allied activities (varies by bank).",
    links: [
      {
        label: "KCC Application (SBI PDF)",
        url: "https://sbi.co.in/documents/14463/22577/application+form.pdf/24a2171c-9ab5-a4de-08ef-7a5891525cfe",
      },
    ],
  },
  {
    id: 3,
    name: "PMKSY (Irrigation)",
    desc: "Har Khet Ko Pani + More Crop Per Drop.",
    links: [
      {
        label: "PMKSY Manual (PDF)",
        url: "https://darpg.gov.in/sites/default/files/Pradhan%20Mantri%20Krishi%20Sichai%20Yojana.pdf",
      },
      { label: "Guidelines (Website)", url: "https://www.pmksy.gov.in/Guidelines.aspx" },
    ],
  },
  {
    id: 4,
    name: "myScheme (Find schemes fast)",
    desc: "Search central + state schemes by category and eligibility.",
    links: [{ label: "Open myScheme", url: "https://www.myscheme.gov.in/" }],
  },
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
              {(s.links ?? []).length > 0 ? (
                s.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    {l.label}
                  </a>
                ))
              ) : (
                <button type="button" className="btn-disabled" disabled>
                  Info Coming
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Finance;
