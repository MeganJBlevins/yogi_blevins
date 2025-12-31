import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './views/Home'
import Projects from './views/Projects'
import About from './views/About'
import Contact from './views/Contact'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default App

