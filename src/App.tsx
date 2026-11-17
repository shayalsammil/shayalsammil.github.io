import { ReactNode, useEffect, useState } from "react";
import {
  achievements,
  certifications,
  education,
  goals,
  involvement,
  profile,
  projects,
  technicalSkills,
  testimonials,
} from "./content";
import type { Project } from "./content";

const sections = [
  { id: "goals", label: "Goals" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  ...(projects.length ? [{ id: "projects", label: "Projects" }] : []),
  { id: "involvement", label: "Leadership & CCA" },
  { id: "achievements", label: "Achievements" },
  { id: "references", label: "References" },
  { id: "contact", label: "Contact" },
];

/* ---------- Icons ---------- */

// Google Material Symbols (loaded in index.css). Add a new name there too when you use one here.
type IconName = "arrow_forward" | "close" | "mail" | "menu" | "open_in_new";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <span aria-hidden="true" className="icon material-symbols-outlined" style={{ fontSize: size }}>
      {name}
    </span>
  );
}

// The official LinkedIn logo, in LinkedIn blue with the white "in".
function LinkedInLogo({ size = 20 }: { size?: number }) {
  return (
    <svg aria-hidden="true" className="linkedin-logo" height={size} viewBox="0 0 24 24" width={size}>
      <rect fill="#fff" height="18" rx="1" width="18" x="3" y="3" />
      <path
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        fill="#0A66C2"
      />
    </svg>
  );
}

/* ---------- Layout ---------- */

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label={`${profile.name}, back to top`}>
          <span className="brand-name">{profile.name}</span>
        </a>
        <button
          aria-controls="navigation-menu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <Icon name={menuOpen ? "close" : "menu"} size={24} />
        </button>
        <div className={`nav-links ${menuOpen ? "is-open" : ""}`} id="navigation-menu">
          {sections.map((section) => (
            <a href={`#${section.id}`} key={section.id} onClick={() => setMenuOpen(false)}>
              {section.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>
            <Icon name="mail" size={18} /> Email
          </a>
          <a href={profile.linkedin} rel="noreferrer" target="_blank">
            <LinkedInLogo size={16} /> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

function Section({
  id,
  title,
  intro,
  tinted = false,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  tinted?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className={`section section-shell ${tinted ? "section-tinted" : ""}`}
      id={id}
    >
      <div className="section-heading reveal">
        <h2 id={`${id}-title`}>{title}</h2>
        {intro && <p className="section-description">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

/* ---------- Home page ---------- */

// Types the text out once. The full text is laid out invisibly underneath so nothing below
// jumps as it types, and screen readers get the whole line straight away.
function Typewriter({ text, className }: { text: string; className?: string }) {
  const reducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(reducedMotion ? text.length : 0);

  useEffect(() => {
    if (reducedMotion) {
      setCount(text.length);
      return;
    }
    setCount(0);
    let timer = 0;
    const type = (n: number) => {
      setCount(n);
      if (n < text.length) timer = window.setTimeout(() => type(n + 1), 55);
    };
    timer = window.setTimeout(() => type(1), 500);
    return () => window.clearTimeout(timer);
  }, [text, reducedMotion]);

  return (
    <p className={`typewriter ${className ?? ""}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="typewriter-ghost">
        {text}
      </span>
      <span aria-hidden="true" className="typewriter-typed">
        {text.slice(0, count)}
        <span className={`typewriter-caret ${count >= text.length ? "is-done" : ""}`} />
      </span>
    </p>
  );
}

function Hero() {
  return (
    <section className="hero section-shell" id="top" aria-labelledby="hero-title">
      <div className="hero-copy reveal">
        <h1 id="hero-title">{profile.name}</h1>
        <Typewriter className="hero-title" text={profile.headline} />
        <div className="hero-actions">
          <a className="button button-primary" href="#contact">
            Get in touch <Icon name="arrow_forward" />
          </a>
          {profile.resumeUrl && (
            <a
              className="button button-secondary"
              href={profile.resumeUrl}
              rel="noreferrer"
              target="_blank"
            >
              View résumé
            </a>
          )}
        </div>
      </div>
      <ProfilePhoto />
    </section>
  );
}

// Shows public/images/profile.jpg. Until that file exists, nothing is shown, so the site
// never displays a broken image.
function ProfilePhoto() {
  const [missing, setMissing] = useState(false);
  if (!profile.photo || missing) return null;
  return (
    <figure className="hero-photo reveal">
      <img
        alt={`Portrait of ${profile.name}`}
        decoding="async"
        onError={() => setMissing(true)}
        src={profile.photo}
      />
    </figure>
  );
}

// A row with text on one side and an image on the other, used by Projects and Achievements.
// Every second row is mirrored. Portrait images (certificates) are capped in height.
function FeatureRow({
  meta,
  title,
  body,
  tags = [],
  link,
  image,
  imageAlt,
  flipped,
  portrait = false,
  stat,
}: {
  meta: string;
  title: string;
  body: string;
  tags?: string[];
  link?: Project["link"];
  image: string;
  imageAlt: string;
  flipped: boolean;
  portrait?: boolean;
  stat?: { value: string; label: string };
}) {
  return (
    <article
      className={`feature-row reveal ${flipped ? "feature-row--flipped" : ""} ${
        portrait ? "feature-row--portrait" : ""
      }`}
    >
      <div className="feature-text">
        <p className="feature-meta">{meta}</p>
        <h3>{title}</h3>
        {stat && (
          <p className="feature-stat">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </p>
        )}
        <div className={stat ? "feature-note" : "feature-panel"}>
          <p>{body}</p>
        </div>
        {tags.length > 0 && (
          <div className="tags">
            {tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
        {link && (
          <a className="text-link" href={link.url} rel="noreferrer" target="_blank">
            {link.label} <Icon name="open_in_new" size={16} />
          </a>
        )}
      </div>
      <figure className="feature-figure">
        <img alt={imageAlt} loading="lazy" src={image} />
      </figure>
    </article>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <h2 className="reveal" id="contact-title">
        Contact
      </h2>
      <div className="contact-links reveal">
          <a href={`mailto:${profile.email}`}>
            <span className="contact-link-icon">
              <Icon name="mail" />
            </span>
            <span>
              <small>Email</small>
              {profile.email}
            </span>
          </a>
          <a href={profile.linkedin} rel="noreferrer" target="_blank">
            <span className="contact-link-icon">
              <LinkedInLogo size={22} />
            </span>
            <span>
              <small>LinkedIn</small>
              {profile.linkedinLabel}
            </span>
            <Icon name="open_in_new" size={17} />
          </a>
      </div>
    </section>
  );
}

function HomePage() {
  useReveal();

  return (
    <main id="main-content">
      <Hero />

      <Section id="goals" title="Professional goals" tinted>
        <div className="goals reveal">
          <p className="goals-statement">{goals.statement}</p>
          <ul className="rule-list">
            {goals.objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="education" title="Education">
        <div className="rows">
          {education.map((item) => (
            <article className="row reveal" key={item.title}>
              <p className="row-meta">{item.period}</p>
              <div>
                <h3>{item.title}</h3>
                <p className="row-sub">{item.school}</p>
              </div>
              {item.detail ? <p className="row-detail">{item.detail}</p> : <span />}
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="skills"
        title="Skills"
        tinted
      >
        <h3 className="subheading reveal">Technical</h3>
        <div className="skills-grid">
          {technicalSkills.map((group) => (
            <article className="skill-group reveal" key={group.title}>
              <h4>{group.title}</h4>
              <div className="tags">
                {group.items.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <h3 className="subheading reveal">Certifications</h3>
        <div className="rows">
          {certifications.map((cert) => (
            <article className="row row--compact reveal" key={cert.title}>
              <p className="row-source">{cert.issuer}</p>
              <h4>{cert.title}</h4>
              <span />
            </article>
          ))}
        </div>
      </Section>

      {projects.length > 0 && (
        <Section id="projects" title="Projects">
          <div className="feature-list">
            {projects.map((project, index) => (
              <FeatureRow
                body={project.summary}
                flipped={index % 2 === 1}
                image={project.image}
                imageAlt={project.imageAlt}
                key={project.title}
                link={project.link}
                meta={`${project.period} · ${project.role}`}
                tags={project.tools}
                title={project.title}
              />
            ))}
          </div>
        </Section>
      )}

      <Section
        id="involvement"
        title="Leadership & co-curricular activities"
        tinted={projects.length > 0}
      >
        <div className="rows">
          {involvement.map((group) => (
            <article className="row reveal" key={group.period}>
              <p className="row-meta">{group.period}</p>
              <ul className="rule-list rule-list--tight">
                {group.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
              <span />
            </article>
          ))}
        </div>
      </Section>

      <Section id="achievements" title="Achievements" tinted={projects.length === 0}>
        <div className="feature-list">
          {achievements.map((item, index) => (
            <FeatureRow
              body={item.description}
              flipped={index % 2 === 1}
              image={item.image}
              imageAlt={item.imageAlt}
              key={item.title}
              meta={item.detail}
              portrait
              stat={item.stat}
              title={item.title}
            />
          ))}
        </div>
      </Section>

      <Section id="references" title="References" tinted={projects.length > 0}>
        {testimonials.length > 0 && (
          <div className="testimonials">
            {testimonials.map((item) => (
              <figure className="testimonial reveal" key={item.name}>
                <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
                <figcaption>
                  {item.name}, <span>{item.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
        <p className="references-note reveal">
          Academic and co-curricular references, certificates and transcripts are available on
          request.
        </p>
      </Section>

      <Contact />
    </main>
  );
}

/* ---------- App ---------- */

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <HomePage />
      <Footer />
    </>
  );
}

export default App;
