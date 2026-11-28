import { isTodo, resumeHref, shown, site, tidy, visible } from "@/content/site";
import Console from "./Console";
import Icon, { IconName } from "./Icons";
import ProjectCard from "./ProjectCard";
import SystemDiagram from "./SystemDiagram";
import T from "./T";
import TypedRole from "./TypedRole";

function Head({ no, eyebrow, title, lead }: { no: string; eyebrow: string; title: string; lead?: string }) {
  return (
    <header className="head" data-reveal>
      <p className="eyebrow">
        <span>{no}</span>
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </header>
  );
}

function socials() {
  const { email, github, linkedin } = site.contact;
  const all: { icon: IconName; label: string; value: string; href: string }[] = [
    { icon: "github", label: "GitHub", value: github, href: github },
    { icon: "linkedin", label: "LinkedIn", value: linkedin, href: linkedin },
    { icon: "mail", label: "Email", value: email, href: `mailto:${email}` },
  ];
  return all.filter((s) => !isTodo(s.value));
}

function contactRows() {
  const { email, location, github, linkedin } = site.contact;
  const rows: { icon: IconName; k: string; v: string; href?: string }[] = [
    { icon: "mail", k: "Email", v: email, href: `mailto:${email}` },
    { icon: "github", k: "GitHub", v: github, href: github },
    { icon: "linkedin", k: "LinkedIn", v: linkedin, href: linkedin },
    { icon: "pin", k: "Location", v: location },
  ];
  return rows.filter((r) => visible(r.v));
}

export default function Sheets() {
  const projects = site.projects.filter((p) => visible(p.tagline));
  const links = socials();

  return (
    <main id="top" className="sheets">
      <section className="hero" data-stage="0">
        <div className="hero-main">
          {site.status && visible(site.status) && (
            <p className="status">
              <i aria-hidden="true" />
              <T>{site.status}</T>
            </p>
          )}
          <p className="hello">Hi, I&apos;m</p>
          <h1 className="hero-name">
            <span>{site.firstName}</span> <span>{site.lastName}</span>
          </h1>
          <p className="hero-role">
            <TypedRole />
          </p>
          <p className="hero-intro">{site.summary}</p>
          <ul className="hero-tools" aria-label="Tools I work with">
            {site.tools.map((t) => (
              <li key={t.name}>
                <img src={`/logos/${t.icon}.svg`} alt="" width={16} height={16} />
                {t.name}
              </li>
            ))}
          </ul>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#work">
              View my work <Icon name="arrow" />
            </a>
            <a className="btn btn-ghost" href={resumeHref} download>
              Resume <Icon name="download" />
            </a>
            {links.map((l) => (
              <a key={l.label} className="icon-btn" href={l.href} aria-label={l.label}>
                <Icon name={l.icon} />
              </a>
            ))}
          </div>
        </div>
        <dl className="stats">
          {site.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd className={s.text ? "stats-text" : undefined}>{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="sheet" id="about">
        <Head no="01" eyebrow="About" title="A bit about me" />
        <div className="about">
          <div className="about-main">
            <div className="prose" data-reveal>
              {site.about.map((p) => (
                <p key={p}>
                  <T>{p}</T>
                </p>
              ))}
            </div>
            <div className="about-points" data-reveal>
              <div>
                <h3>Focused on</h3>
                <ul className="tags">
                  {site.focus.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Currently learning</h3>
                <ul className="tags tags-soft">
                  {site.learning.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <dl className="card facts-card" data-reveal>
            {site.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="sheet" id="services">
        <Head no="02" eyebrow="Services" title="What I do" lead="Where I spend most of my time as a developer." />
        <div className="services">
          {site.services.map((s) => (
            <article className="card service" key={s.title} data-reveal>
              <span className="service-icon">
                <Icon name={s.icon as IconName} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul className="tags">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="sheet" id="work" data-stage="1">
        <Head no="03" eyebrow="Projects" title="Selected work" lead="Work projects at Raasoft and personal builds, each written up as a short case study." />
        <div className="projects">
          {projects.map((p) => (
            <ProjectCard key={p.code} p={p} />
          ))}
        </div>
      </section>

      <section className="sheet" id="system" data-stage="2">
        <Head
          no="04"
          eyebrow="Architecture"
          title="How the kiosk reaches the ATM"
          lead="The four layers between the kiosk's React app and the cash-handling hardware."
        />
        <SystemDiagram />
      </section>

      <section className="sheet" id="experience" data-stage="3">
        <Head no="05" eyebrow="Experience" title="Where I've worked" />
        <ol className="timeline">
          {site.experience.map((job) => (
            <li key={job.company} data-reveal>
              <span className="tl-dot" aria-hidden="true" />
              <div className="card tl-card">
                <div className="tl-head">
                  <h3>
                    {visible(job.role) ? (
                      <>
                        <T>{job.role}</T> <span className="at">· {job.company}</span>
                      </>
                    ) : (
                      job.company
                    )}
                  </h3>
                  {visible(job.period) && (
                    <span className="tl-period">
                      <T>{job.period}</T>
                    </span>
                  )}
                </div>
                {shown(job.points).length > 0 && (
                  <ul className="bullets">
                    {shown(job.points).map((p) => (
                      <li key={p}>
                        <T>{p}</T>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>

        <h3 className="subhead" data-reveal>
          Education
        </h3>
        <ol className="timeline">
          {site.education.map((e) => (
            <li key={e.degree} data-reveal>
              <span className="tl-dot" aria-hidden="true" />
              <div className="card tl-card">
                <div className="tl-head">
                  <h3>{tidy(e.degree)}</h3>
                  {visible(e.period) && (
                    <span className="tl-period">
                      <T>{e.period}</T>
                    </span>
                  )}
                </div>
                {visible(e.school) && (
                  <p className="muted">
                    <T>{e.school}</T>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>

        {shown(site.achievements).length > 0 && (
          <>
            <h3 className="subhead" data-reveal>
              Certifications
            </h3>
            <ul className="certs" data-reveal>
              {shown(site.achievements).map((a) => (
                <li key={a} className="card">
                  <T>{a}</T>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="sheet" id="skills" data-stage="4">
        <Head no="06" eyebrow="Skills" title="Skills and tools" />
        <div className="skills">
          {site.skills
            .filter((g) => shown(g.items).length > 0)
            .map((g) => (
              <div className="card skill" key={g.group} data-reveal>
                <h3>{g.group}</h3>
                <ul className="tags">
                  {shown(g.items).map((s) => (
                    <li key={s}>
                      <T>{s}</T>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </section>

      <section className="sheet" id="contact" data-stage="5">
        <Head no="07" eyebrow="Contact" title="Let's work together" lead="Have a role or a project in mind? Send me a message and I'll get back to you." />
        <div className="contact">
          <div className="card contact-card" data-reveal>
            <dl className="contact-list">
              {contactRows().map((r) => (
                <div key={r.k}>
                  <dt>
                    <Icon name={r.icon} />
                    {r.k}
                  </dt>
                  <dd>
                    {r.href && !isTodo(r.v) ? <a href={r.href}>{r.v.replace(/^https?:\/\//, "")}</a> : <T>{r.v}</T>}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="contact-cta">
              {!isTodo(site.contact.email) && (
                <a className="btn btn-primary" href={`mailto:${site.contact.email}`}>
                  Email me <Icon name="mail" />
                </a>
              )}
              <a className="btn btn-ghost" href={resumeHref} download>
                Download resume <Icon name="download" />
              </a>
            </div>
          </div>
          <div data-reveal>
            <Console />
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <div>
            <strong>{site.name}</strong>
            <span>{site.role}</span>
          </div>
          <div className="footer-links">
            {links.map((l) => (
              <a key={l.label} className="icon-btn" href={l.href} aria-label={l.label}>
                <Icon name={l.icon} />
              </a>
            ))}
            <a className="btn btn-ghost btn-small" href="#top">
              Back to top <Icon name="up" />
            </a>
          </div>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} {site.name}. Built with Next.js and Three.js.
        </p>
      </footer>
    </main>
  );
}
