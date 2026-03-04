import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("krishi_carbon.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT,
    phone TEXT,
    email TEXT UNIQUE,
    password TEXT,
    state TEXT,
    district TEXT,
    farmSize REAL
  );

  CREATE TABLE IF NOT EXISTS soil_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    soilType TEXT,
    pH REAL,
    nitrogen REAL,
    phosphorus REAL,
    potassium REAL,
    score INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS carbon_credits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    tonsStored REAL,
    value REAL,
    status TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS farm_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    type TEXT,
    details TEXT,
    amount REAL,
    date TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS community_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    title TEXT,
    content TEXT,
    authorName TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES users(id)
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Auth Endpoints
  app.post("/api/auth/signup", (req, res) => {
    const { fullName, phone, email, password, state, district, farmSize } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO users (fullName, phone, email, password, state, district, farmSize) VALUES (?, ?, ?, ?, ?, ?, ?)");
      const info = stmt.run(fullName, phone, email, password, state, district, farmSize);
      res.json({ id: info.lastInsertRowid, fullName, email, phone, state, district, farmSize });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/signin", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password);
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Dashboard Endpoints
  app.get("/api/dashboard/:userId", (req, res) => {
    const userId = req.params.userId;
    const soil = db.prepare("SELECT * FROM soil_data WHERE userId = ? ORDER BY timestamp DESC LIMIT 1").get(userId);
    const carbon = db.prepare("SELECT SUM(tonsStored) as totalTons, SUM(value) as totalValue FROM carbon_credits WHERE userId = ?").get(userId);
    const recentRecords = db.prepare("SELECT * FROM farm_records WHERE userId = ? ORDER BY date DESC LIMIT 5").all(userId);
    res.json({ soil, carbon, recentRecords });
  });

  app.post("/api/soil/save", (req, res) => {
    const { userId, soilType, pH, nitrogen, phosphorus, potassium, score } = req.body;
    const stmt = db.prepare("INSERT INTO soil_data (userId, soilType, pH, nitrogen, phosphorus, potassium, score) VALUES (?, ?, ?, ?, ?, ?, ?)");
    stmt.run(userId, soilType, pH, nitrogen, phosphorus, potassium, score);
    res.json({ success: true });
  });

  app.post("/api/carbon/add", (req, res) => {
    const { userId, tonsStored, value, status } = req.body;
    const stmt = db.prepare("INSERT INTO carbon_credits (userId, tonsStored, value, status) VALUES (?, ?, ?, ?)");
    stmt.run(userId, tonsStored, value, status);
    res.json({ success: true });
  });

  // Farm Records
  app.get("/api/records/:userId", (req, res) => {
    const records = db.prepare("SELECT * FROM farm_records WHERE userId = ? ORDER BY date DESC").all(req.params.userId);
    res.json(records);
  });

  app.post("/api/records/add", (req, res) => {
    const { userId, type, details, amount, date } = req.body;
    const stmt = db.prepare("INSERT INTO farm_records (userId, type, details, amount, date) VALUES (?, ?, ?, ?, ?)");
    stmt.run(userId, type, details, amount, date);
    res.json({ success: true });
  });

  // Community
  app.get("/api/community/posts", (req, res) => {
    const posts = db.prepare("SELECT * FROM community_posts ORDER BY timestamp DESC").all();
    res.json(posts);
  });

  app.post("/api/community/posts", (req, res) => {
    const { userId, title, content, authorName } = req.body;
    const stmt = db.prepare("INSERT INTO community_posts (userId, title, content, authorName) VALUES (?, ?, ?, ?)");
    stmt.run(userId, title, content, authorName);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
