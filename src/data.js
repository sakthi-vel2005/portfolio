// All content below comes from the resume PDF and the brief.
export const profile = {
  name: 'Sakthivel V',
  title: 'Java Full Stack Developer',
  secondary: 'Software Developer / AI Integration Enthusiast',
  location: 'Tiruchirappalli, Tamil Nadu, India',
  email: 'sakthivel972005@gmail.com',
  phone: '+91 7418457322',
  github: 'https://github.com/sakthi-vel2005',
  linkedin: 'https://linkedin.com/in/sakthivel-v-93083b247',
  resume: '/resume/Sakthivel_V_Resume.pdf',
  about:
    "I'm a Java Full Stack Developer passionate about building practical web applications and intelligent software solutions. I enjoy working with Java, React, databases, backend development, and AI integration to turn ideas into useful digital products."
}

export const skillGroups = [
  { name: 'Languages', items: ['Java', 'JavaScript', 'SQL'] },
  { name: 'Frontend', items: ['React.js', 'HTML', 'CSS', 'JavaScript'] },
  { name: 'Backend', items: ['Core Java', 'JDBC', 'Servlets', 'JSP', 'Hibernate', 'Apache Tomcat'] },
  { name: 'Database', items: ['MySQL', 'SQL'] },
  { name: 'Core concepts', items: ['OOP', 'DSA', 'Design Patterns', 'System Design', 'Computer Networking'] },
  { name: 'AI', items: ['AI API integration', 'Intelligent application development'] },
  { name: 'Tools', items: ['Git', 'GitHub', 'Docker'] }
]

export const projects = [
  {
    id: 'shareplate',
    title: 'SharePlate',
    kicker: 'AI-powered food rescue platform',
    status: 'In development',
    description:
      'A full-stack platform connecting food donors with NGOs to reduce food waste.',
    features: ['Food donation management', 'Recipient requests', 'Pickup coordination', 'AI-generated donation descriptions'],
    tech: ['React.js', 'Core Java', 'Java Servlets', 'JDBC', 'MySQL', 'Apache Tomcat', 'AI API'],
    flow: ['Donor', 'SharePlate', 'NGO'],
    github: null
  },
  {
    id: 'smartspend',
    title: 'SmartSpend',
    kicker: 'AI-powered personal expense tracker',
    status: 'Built',
    description:
      'A personal finance application for tracking income and expenses and understanding spending patterns.',
    features: ['Manual transaction entry', 'CSV bank statement import', 'Transaction management', 'Spending analytics', 'AI-powered financial insights', 'Budgeting recommendations'],
    tech: ['Java', 'JDBC', 'Servlets', 'JSP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'AI API'],
    flow: ['Transactions', 'Analytics', 'AI insights'],
    github: null
  }
]
