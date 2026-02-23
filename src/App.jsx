import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Work from './pages/Work.jsx';
import Speaking from './pages/Speaking.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/speaking" element={<Speaking />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
