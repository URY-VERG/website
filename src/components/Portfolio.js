import React from "react";
import "./Portfolio.css";

const profile = {
  name: "Kishor",
  role: "Frontend Developer",
  location: "Maharashtra, India",
  intro:
    "मी responsive, fast आणि user-friendly web apps तयार करतो. React वापरून clean UI आणि practical features बनवणे मला आवडते.",
  about:
    "मी सतत नवीन technologies शिकत असतो आणि real-world problems साठी simple solutions तयार करायला आवडतात. टीमसोबत काम, debugging आणि product polish ही माझी strong areas आहेत.",
  email: "kishor@example.com",
  linkedin: "https://linkedin.com/in/kishor",
  github: "https://github.com/kishor",
};

const skills = [
  "React",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Node.js",
  "REST APIs",
  "Git & GitHub",
  "Responsive Design",
];

const projects = [
  {
    title: "AgriLink Farmer Portal",
    description:
      "शेतकऱ्यांसाठी market rates, crop insights आणि simple dashboard असलेले web app.",
    tech: "React, Node.js, Express",
    result: "Live price visibility + quick navigation",
  },
  {
    title: "Smart Weather Dashboard",
    description:
      "Location-based weather app ज्यात hourly forecast, humidity आणि wind data दाखवतो.",
    tech: "React, OpenWeather API, Chart.js",
    result: "Clear forecast cards and trend graphs",
  },
  {
    title: "Local Store E-commerce UI",
    description:
      "Small businesses साठी product listing, cart flow आणि checkout-ready storefront UI.",
    tech: "React, Context API, CSS",
    result: "Faster browsing + simple cart UX",
  },
];

function Portfolio() {
  return (
    <main className="portfolio">
      <section className="hero card">
        <p className="tag">Portfolio</p>
        <h1>{profile.name}</h1>
        <h2>{profile.role}</h2>
        <p>{profile.intro}</p>
        <p className="meta">📍 {profile.location}</p>
      </section>

      <section className="card">
        <h2>About Me</h2>
        <p>{profile.about}</p>
      </section>

      <section className="card">
        <h2>Skills</h2>
        <div className="chips">
          {skills.map((skill) => (
            <span key={skill} className="chip">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.title} className="project-item">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p className="project-meta">🛠 {project.tech}</p>
              <p className="project-result">✅ {project.result}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card contact">
        <h2>Contact</h2>
        <p>
          Email: <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
        <p>
          LinkedIn: <a href={profile.linkedin}>{profile.linkedin}</a>
        </p>
        <p>
          GitHub: <a href={profile.github}>{profile.github}</a>
        </p>
      </section>
    </main>
  );
}

export default Portfolio;
