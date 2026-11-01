import { Award } from 'lucide-react'
import Split from './Split'
import Tilt from './Tilt'

export default function Certifications() {
  return (
    <section id="certifications" className="section certs">
      <Split text="Certification" className="section-title" />
      <Tilt className="cert" max={5}>
        <Award size={36} aria-hidden="true" />
        <h3>Google Data Analytics Specialization</h3>
        <p>Foundational knowledge of data analysis, data cleaning, data visualization, spreadsheets, SQL and Tableau to derive insights from data.</p>
        <span className="cert-shine" aria-hidden="true" />
      </Tilt>
    </section>
  )
}
