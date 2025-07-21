import Docs from './Docs.jsx'; // ✅ Make sure this file exists
import Home from './Home.jsx';
import Members from './Members.jsx';
import NotFound from './NotFound.jsx';
import Layout from '../layouts/Layout.jsx';
import { Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/docs/*" element={<Docs />} /> {/* ✅ Renders Docs for any /docs/... */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export { Router };     // ✅ Optional named export
export default Router; // ✅ Default export (important for App.jsx)
