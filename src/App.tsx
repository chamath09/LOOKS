/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppDataProvider } from './context/AppDataContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { CategoryPage } from './pages/Category';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import { Upload } from './pages/Upload';

export default function App() {
  return (
    <AppDataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="category/:id" element={<CategoryPage />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/:id" element={<BlogPost />} />
            <Route path="upload" element={<Upload />} />
          </Route>
        </Routes>
      </Router>
    </AppDataProvider>
  );
}

