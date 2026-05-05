import React from "react";
import "./Portfolio.css";

const skills = ["React", "JavaScript", "HTML", "CSS", "Node.js"];

const projects = [
  {
    title: "Project 1: E-commerce Website",
    description: "Responsive online store with cart, checkout and payment flow.",
    tech: "React, Node.js, Razorpay",
  },
  {
    title: "Project 2: Weather Dashboard",
    description: "City-wise weather app with live temperature and forecast view.",
    tech: "React, OpenWeather API",
  },
  {
    title: "Project 3: Market Price Tracker",
    description: "Dashboard to show latest commodity prices and trends.",
    tech: "React, Charts",
  },
];

function Portfolio() {
  return (
    <main className="portfolio">
      <section className="hero card">
        <p className="tag">Hello 👋</p>
        <h1>मी [तुमचे नाव]</h1>
        <p>
          मी एक passionate developer आहे. इथे माझी माहिती, skills आणि projects
          तुम्हाला पाहायला मिळतील.
        </p>
      </section>

      <section className="card">
        <h2>About Me</h2>
        <p>
          माझ्या portfolio मध्ये तुम्हाला माझा background, काम करण्याची पद्धत, आणि
          माझी आवडती तंत्रज्ञानं दिसतील. हा मजकूर तुम्ही तुमच्या खरी माहितीने
          update करू शकता.
        </p>
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
              <small>{project.tech}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="card contact">
        <h2>Contact</h2>
        <p>Email: yourname@email.com</p>
        <p>LinkedIn: linkedin.com/in/yourname</p>
        <p>GitHub: github.com/yourname</p>
      </section>
    </main>
  );
}

export default Portfolio;
