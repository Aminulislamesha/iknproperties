import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { getDb, saveDb } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'ikn_properties_super_secret_jwt_key_2026';

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Static uploads folder
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
app.use('/uploads', express.static(UPLOADS_DIR));

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
    req.user = user;
    next();
  });
};

// ================= FILE UPLOAD CONFIG & ROUTES =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${cleanName}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max
  fileFilter: (req, file, cb) => {
    const allowedExts = /jpeg|jpg|png|webp|gif|svg|avif/;
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    if (file.mimetype.startsWith('image/') || allowedExts.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG, WebP, GIF, SVG, AVIF) are allowed!'));
    }
  }
});

// Single image upload
app.post('/api/upload', authenticateToken, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No image file was received.' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      message: 'Image uploaded successfully',
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size
    });
  });
});

// Multiple images upload (for project detail galleries)
app.post('/api/upload/multiple', authenticateToken, (req, res) => {
  upload.array('images', 25)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files were received.' });
    }
    const files = req.files.map(f => ({
      url: `/uploads/${f.filename}`,
      filename: f.filename,
      size: f.size
    }));
    res.json({
      message: `${req.files.length} images uploaded successfully`,
      urls: files.map(f => f.url),
      files
    });
  });
});

// Base64 upload fallback
app.post('/api/upload/base64', authenticateToken, (req, res) => {
  const { data, filename } = req.body;
  if (!data) {
    return res.status(400).json({ error: 'No base64 image data provided.' });
  }
  try {
    const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Invalid base64 data string.' });
    }
    const mimeType = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    let ext = mimeType.split('/')[1] || 'jpg';
    if (ext === 'jpeg') ext = 'jpg';
    const cleanName = (filename || 'image').replace(/[^a-zA-Z0-9_-]/g, '_');
    const safeFilename = `${cleanName}-${Date.now()}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, safeFilename);
    fs.writeFileSync(filePath, buffer);
    res.json({
      message: 'Image uploaded successfully',
      url: `/uploads/${safeFilename}`,
      filename: safeFilename
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save base64 image.' });
  }
});

// ================= AUTH ROUTES =================
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Please enter username and password.' });
  }

  const db = getDb();
  const user = db.users.find(u => u.username.toLowerCase() === username.toLowerCase());

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    message: 'Login successful',
    token,
    user: { id: user.id, username: user.username, role: user.role, name: user.name }
  });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const db = getDb();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }
  res.json({
    user: { id: user.id, username: user.username, role: user.role, name: user.name }
  });
});

app.post('/api/auth/change-password', authenticateToken, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Please provide both current and new password.' });
  }

  const db = getDb();
  const userIndex = db.users.findIndex(u => u.id === req.user.id);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found.' });
  }

  const validPassword = bcrypt.compareSync(currentPassword, db.users[userIndex].password);
  if (!validPassword) {
    return res.status(400).json({ error: 'Current password is incorrect.' });
  }

  db.users[userIndex].password = bcrypt.hashSync(newPassword, 10);
  saveDb(db);

  res.json({ message: 'Password changed successfully.' });
});

// ================= SETTINGS ROUTES =================
app.get('/api/settings', (req, res) => {
  const db = getDb();
  res.json(db.settings);
});

app.put('/api/settings', authenticateToken, (req, res) => {
  const db = getDb();
  db.settings = { ...db.settings, ...req.body };
  saveDb(db);
  res.json({ message: 'Settings updated successfully', settings: db.settings });
});

// ================= SLIDERS ROUTES =================
app.get('/api/sliders', (req, res) => {
  const db = getDb();
  res.json(db.sliders || []);
});

app.put('/api/sliders', authenticateToken, (req, res) => {
  const db = getDb();
  db.sliders = req.body;
  saveDb(db);
  res.json({ message: 'Sliders updated successfully', sliders: db.sliders });
});

// ================= PROJECTS ROUTES =================
app.get('/api/projects', (req, res) => {
  const db = getDb();
  const { status, category } = req.query;
  let list = db.projects || [];
  if (status) {
    list = list.filter(p => p.status.toLowerCase() === status.toLowerCase());
  }
  if (category) {
    list = list.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
  }
  res.json(list);
});

app.get('/api/projects/:idOrSlug', (req, res) => {
  const db = getDb();
  const { idOrSlug } = req.params;
  const project = (db.projects || []).find(p => p.id === idOrSlug || p.slug === idOrSlug);
  if (!project) {
    return res.status(404).json({ error: 'Project not found.' });
  }
  res.json(project);
});

app.post('/api/projects', authenticateToken, (req, res) => {
  const db = getDb();
  const newProject = {
    id: `proj-${Date.now()}`,
    slug: (req.body.title || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    createdAt: new Date().toISOString(),
    ...req.body
  };
  db.projects = db.projects || [];
  db.projects.unshift(newProject);
  saveDb(db);
  res.status(201).json({ message: 'Project created successfully', project: newProject });
});

app.put('/api/projects/:id', authenticateToken, (req, res) => {
  const db = getDb();
  const index = (db.projects || []).findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Project not found.' });
  }
  db.projects[index] = { ...db.projects[index], ...req.body, updatedAt: new Date().toISOString() };
  saveDb(db);
  res.json({ message: 'Project updated successfully', project: db.projects[index] });
});

app.delete('/api/projects/:id', authenticateToken, (req, res) => {
  const db = getDb();
  const filtered = (db.projects || []).filter(p => p.id !== req.params.id);
  db.projects = filtered;
  saveDb(db);
  res.json({ message: 'Project deleted successfully' });
});

// ================= PROGRESS ROUTES =================
app.get('/api/progress', (req, res) => {
  const db = getDb();
  const { projectId } = req.query;
  let list = db.progressUpdates || [];
  if (projectId) {
    list = list.filter(p => p.projectId === projectId);
  }
  res.json(list);
});

app.post('/api/progress', authenticateToken, (req, res) => {
  const db = getDb();
  const newUpdate = {
    id: `prog-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...req.body
  };
  db.progressUpdates = db.progressUpdates || [];
  db.progressUpdates.unshift(newUpdate);

  // Optionally update project's progress percentage
  if (req.body.projectId && req.body.percentage) {
    const projIdx = db.projects.findIndex(p => p.id === req.body.projectId || p.slug === req.body.projectId);
    if (projIdx !== -1) {
      db.projects[projIdx].progressPercentage = Number(req.body.percentage);
    }
  }

  saveDb(db);
  res.status(201).json({ message: 'Progress update recorded', progress: newUpdate });
});

app.delete('/api/progress/:id', authenticateToken, (req, res) => {
  const db = getDb();
  db.progressUpdates = (db.progressUpdates || []).filter(p => p.id !== req.params.id);
  saveDb(db);
  res.json({ message: 'Progress update deleted' });
});

// ================= LEADS & INQUIRIES ROUTES =================
app.get('/api/leads', authenticateToken, (req, res) => {
  const db = getDb();
  res.json(db.leads || []);
});

app.post('/api/leads', (req, res) => {
  const { name, phone, email, project, serviceType, message } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone number are required.' });
  }

  const db = getDb();
  const newLead = {
    id: `lead-${Date.now()}`,
    name,
    phone,
    email: email || '',
    project: project || 'General',
    serviceType: serviceType || 'Inquiry',
    message: message || '',
    status: 'New',
    createdAt: new Date().toISOString()
  };

  db.leads = db.leads || [];
  db.leads.unshift(newLead);
  saveDb(db);

  res.status(201).json({
    message: 'Thank you! Your inquiry has been received. Our team will contact you shortly.',
    leadId: newLead.id
  });
});

app.put('/api/leads/:id', authenticateToken, (req, res) => {
  const db = getDb();
  const idx = (db.leads || []).findIndex(l => l.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Lead not found.' });
  }
  db.leads[idx] = { ...db.leads[idx], ...req.body, updatedAt: new Date().toISOString() };
  saveDb(db);
  res.json({ message: 'Lead updated successfully', lead: db.leads[idx] });
});

app.delete('/api/leads/:id', authenticateToken, (req, res) => {
  const db = getDb();
  db.leads = (db.leads || []).filter(l => l.id !== req.params.id);
  saveDb(db);
  res.json({ message: 'Lead deleted successfully' });
});

// ================= BLOGS ROUTES =================
app.get('/api/blogs', (req, res) => {
  const db = getDb();
  res.json(db.blogs || []);
});

app.get('/api/blogs/:idOrSlug', (req, res) => {
  const db = getDb();
  const { idOrSlug } = req.params;
  const blog = (db.blogs || []).find(b => b.id === idOrSlug || b.slug === idOrSlug);
  if (!blog) {
    return res.status(404).json({ error: 'Article not found.' });
  }
  res.json(blog);
});

app.post('/api/blogs', authenticateToken, (req, res) => {
  const db = getDb();
  const newBlog = {
    id: `blog-${Date.now()}`,
    slug: (req.body.title || 'post').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    createdAt: new Date().toISOString(),
    ...req.body
  };
  db.blogs = db.blogs || [];
  db.blogs.unshift(newBlog);
  saveDb(db);
  res.status(201).json({ message: 'Article created successfully', blog: newBlog });
});

app.put('/api/blogs/:id', authenticateToken, (req, res) => {
  const db = getDb();
  const idx = (db.blogs || []).findIndex(b => b.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Article not found.' });
  }
  db.blogs[idx] = { ...db.blogs[idx], ...req.body, updatedAt: new Date().toISOString() };
  saveDb(db);
  res.json({ message: 'Article updated successfully', blog: db.blogs[idx] });
});

app.delete('/api/blogs/:id', authenticateToken, (req, res) => {
  const db = getDb();
  db.blogs = (db.blogs || []).filter(b => b.id !== req.params.id);
  saveDb(db);
  res.json({ message: 'Article deleted successfully' });
});

// ================= TESTIMONIALS ROUTES =================
app.get('/api/testimonials', (req, res) => {
  const db = getDb();
  res.json(db.testimonials || []);
});

app.post('/api/testimonials', authenticateToken, (req, res) => {
  const db = getDb();
  const newTestimonial = {
    id: `test-${Date.now()}`,
    ...req.body
  };
  db.testimonials = db.testimonials || [];
  db.testimonials.unshift(newTestimonial);
  saveDb(db);
  res.status(201).json({ message: 'Testimonial added', testimonial: newTestimonial });
});

app.delete('/api/testimonials/:id', authenticateToken, (req, res) => {
  const db = getDb();
  db.testimonials = (db.testimonials || []).filter(t => t.id !== req.params.id);
  saveDb(db);
  res.json({ message: 'Testimonial deleted' });
});

// ================= FAQS ROUTES =================
app.get('/api/faqs', (req, res) => {
  const db = getDb();
  res.json(db.faqs || []);
});

app.post('/api/faqs', authenticateToken, (req, res) => {
  const db = getDb();
  const newFaq = {
    id: `faq-${Date.now()}`,
    ...req.body
  };
  db.faqs = db.faqs || [];
  db.faqs.push(newFaq);
  saveDb(db);
  res.status(201).json({ message: 'FAQ added', faq: newFaq });
});

app.delete('/api/faqs/:id', authenticateToken, (req, res) => {
  const db = getDb();
  db.faqs = (db.faqs || []).filter(f => f.id !== req.params.id);
  saveDb(db);
  res.json({ message: 'FAQ deleted' });
});

// ================= STATS / DASHBOARD METRICS =================
app.get('/api/admin/metrics', authenticateToken, (req, res) => {
  const db = getDb();
  const totalProjects = (db.projects || []).length;
  const totalLeads = (db.leads || []).length;
  const newLeads = (db.leads || []).filter(l => l.status === 'New').length;
  const totalBlogs = (db.blogs || []).length;
  const totalUpdates = (db.progressUpdates || []).length;

  res.json({
    totalProjects,
    totalLeads,
    newLeads,
    totalBlogs,
    totalUpdates,
    recentLeads: (db.leads || []).slice(0, 5)
  });
});

// ================= DYNAMIC SITEMAP.XML GENERATOR =================
app.get('/sitemap.xml', (req, res) => {
  const db = getDb();
  const baseUrl = 'https://iknproperties.com';
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/projects</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/project-progress</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/blogs</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/faq</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;

  // Dynamic project pages
  (db.projects || []).forEach(p => {
    xml += `  <url>
    <loc>${baseUrl}/projects/${p.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
  });

  // Dynamic blog articles
  (db.blogs || []).forEach(b => {
    xml += `  <url>
    <loc>${baseUrl}/blogs/${b.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  xml += `</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// Serve Public & Dist directories
const PUBLIC_DIR = path.join(__dirname, '../public');
if (fs.existsSync(PUBLIC_DIR)) {
  app.use(express.static(PUBLIC_DIR));
}

// Serve Frontend in Production (dist directory)
const DIST_DIR = path.join(__dirname, '../dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.use((req, res, next) => {
    if (req.url.startsWith('/api/') || req.url.startsWith('/uploads/') || req.url === '/sitemap.xml') {
      return next();
    }
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`IKN Properties Server running smoothly on http://localhost:${PORT}`);
});
