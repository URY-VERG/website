import React, { useMemo, useState } from "react";
import "./Learning.css";

const resources = [
  {
    id: "organic",
    title: "🌾 Organic Farming Basics",
    desc: "Composting, natural inputs, and safe pest control.",
    // Note: YouTube IDs can be swapped anytime without code changes.
    youtubeId: "XttMPRL8U5I",
    videoUrl: "https://www.youtube.com/watch?v=XttMPRL8U5I",
    pdfs: [
      {
        label: "PM-KISAN Operational Guidelines (PDF)",
        url: "https://krishi.maharashtra.gov.in/Site/Upload/Pdf/PM%20KISAN%20OPERATIONAL%20GUIDELINES.pdf",
      },
      {
        label: "PM-KISAN FAQs (PIB PDF)",
        url: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2021/nov/doc2021112361.pdf",
      },
    ],
  },
  {
    id: "irrigation",
    title: "💧 Smart Irrigation & Water Saving",
    desc: "More crop per drop, drip basics, and water planning.",
    youtubeId: "dYkYyNQF8cE",
    videoUrl: "https://www.youtube.com/watch?v=dYkYyNQF8cE",
    pdfs: [
      {
        label: "PMKSY Manual for District Functionaries (PDF)",
        url: "https://darpg.gov.in/sites/default/files/Pradhan%20Mantri%20Krishi%20Sichai%20Yojana.pdf",
      },
      {
        label: "PMKSY Guidelines (website)",
        url: "https://www.pmksy.gov.in/Guidelines.aspx",
      },
    ],
  },
  {
    id: "credit",
    title: "💳 Loans & Kisan Credit Card (KCC)",
    desc: "Understand credit, documents, and application basics.",
    youtubeId: "3Y9v0e2t6kU",
    videoUrl: "https://www.youtube.com/watch?v=3Y9v0e2t6kU",
    pdfs: [
      {
        label: "KCC: Agri Credit application form (SBI PDF)",
        url: "https://sbi.co.in/documents/14463/22577/application+form.pdf/24a2171c-9ab5-a4de-08ef-7a5891525cfe",
      },
    ],
  },
  {
    id: "tools",
    title: "📱 Useful Apps for Farmers",
    desc: "Gov portals, scheme discovery, and farmer services.",
    youtubeId: "V1Pl8CzNzCw",
    videoUrl: "https://www.youtube.com/watch?v=V1Pl8CzNzCw",
    pdfs: [
      {
        label: "PM-KISAN portal (website)",
        url: "https://pmkisan.gov.in/",
      },
      {
        label: "myScheme: scheme discovery (website)",
        url: "https://www.myscheme.gov.in/",
      },
    ],
  },
];

function Learning() {
  const [activeId, setActiveId] = useState(resources[0]?.id ?? "");

  const active = useMemo(
    () => resources.find((r) => r.id === activeId) ?? resources[0],
    [activeId]
  );

  return (
    <div className="learning-page">
      <h2>📘 Learning Center</h2>
      <p className="lead">Short videos and articles — Marathi & English — to help farmers learn practical techniques.</p>

      {active?.youtubeId && (
        <div style={{ marginBottom: 18 }}>
          <div className="video-preview">
            {/* Show a clickable thumbnail to avoid iframe autoplay/embedding issues */}
            <VideoPlayer youtubeId={active.youtubeId} title={active.title} />
          </div>
          <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: 'center' }}>
            <a
              href={active.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Open on YouTube
            </a>
            {(active.pdfs ?? []).map((p) => (
              <div key={p.url} style={{ display: 'flex', gap: 8 }}>
                <a
                  href={`/api/proxy?url=${encodeURIComponent(p.url)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  Open
                </a>
                <a
                  href={`/api/proxy?url=${encodeURIComponent(p.url)}&download=1`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="learning-grid">
        {resources.map((item) => (
          <button
            key={item.id}
            type="button"
            className="learn-card"
            onClick={() => setActiveId(item.id)}
            style={{
              textAlign: "left",
              cursor: "pointer",
              border:
                item.id === activeId ? "2px solid #22c55e" : "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <div className="card-actions">
              <span className="btn" style={{ pointerEvents: "none" }}>
                Watch
              </span>
              <span className="btn-outline" style={{ pointerEvents: "none" }}>
                PDFs
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Learning;

function VideoPlayer({ youtubeId, title }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <div className="video-player" style={{ position: 'relative' }}>
      {!playing ? (
        <button
          className="video-thumb"
          onClick={() => setPlaying(true)}
          style={{ border: 0, padding: 0, background: 'none' }}
        >
          <img src={thumb} alt={title} style={{ width: '100%', display: 'block' }} />
          <div className="play-overlay">▶</div>
        </button>
      ) : (
        <iframe
          title={title}
          width="100%"
          height="360"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ border: 0, display: 'block' }}
        />
      )}
    </div>
  );
}
