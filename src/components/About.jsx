import Split from './Split'
import Tilt from './Tilt'
import { profile } from '../data'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="about-grid">
        <div data-reveal>
          <Tilt className="portrait" max={6}>
            <img
              src="/images/portrait-960.webp"
              srcSet="/images/portrait-480.webp 480w, /images/portrait-960.webp 960w"
              sizes="(max-width: 768px) 90vw, 40vw"
              width="960" height="929" loading="lazy" decoding="async"
              alt="Portrait of Sakthivel V in a cream knit sweater" />
            <span className="portrait-glow" aria-hidden="true" />
          </Tilt>
        </div>
        <div className="about-text">
          <h2 className="section-title">About</h2>
          <Split as="p" className="statement" text={profile.about} />
          <dl className="facts" data-reveal>
            <div><dt>Profile</dt><dd>Java Full Stack Developer, entry-level, based in {profile.location}.</dd></div>
            <div><dt>Education</dt><dd>B.Tech Information Technology, Vel Tech Multi Tech College (2022–2026). CGPA 7.48.</dd></div>
            <div><dt>Training</dt><dd>Java Full Stack Development at Tap Academy.</dd></div>
            <div><dt>Interests</dt><dd>Backend development, databases, system design, AI API integration.</dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}
