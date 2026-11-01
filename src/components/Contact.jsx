import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import Split from './Split'
import Magnetic from './Magnetic'
import { profile } from '../data'

export default function Contact() {
  const rows = [
    [Mail, profile.email, `mailto:${profile.email}`],
    [Phone, profile.phone, `tel:${profile.phone.replace(/\s/g, '')}`],
    [Github, 'github.com/sakthi-vel2005', profile.github],
    [Linkedin, 'linkedin.com/in/sakthivel-v-93083b247', profile.linkedin]
  ]
  return (
    <section id="contact" className="section contact">
      <Split as="h2" className="contact-title" text="Let's build something useful together." />
      <div className="contact-grid" data-reveal>
        <Magnetic strength={0.25}>
          <a className="btn btn-solid btn-xl" href={`mailto:${profile.email}`}>Send an email</a>
        </Magnetic>
        <ul className="contact-list">
          {rows.map(([Icon, label, href]) => (
            <li key={href}>
              <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
                <Icon size={18} aria-hidden="true" /> {label}
              </a>
            </li>
          ))}
          <li className="loc"><MapPin size={18} aria-hidden="true" /> {profile.location}</li>
        </ul>
      </div>
    </section>
  )
}
