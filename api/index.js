const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "database.json");
const setPath = path.join(__dirname, "setting.json");

module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  // GET Produk
  if (req.method === "GET" && req.url === "/products") {
    const db = JSON.parse(fs.readFileSync(dbPath));
    return res.end(JSON.stringify(db));
  }

  // GET Setting
  if (req.method === "GET" && req.url === "/setting") {
    const st = JSON.parse(fs.readFileSync(setPath));
    return res.end(JSON.stringify(st));
  }

  // Update Produk
  if (req.method === "POST" && req.url === "/update") {
    let body = "";
    req.on("data", c => body += c);
    req.on("end", () => {
      fs.writeFileSync(dbPath, JSON.stringify(JSON.parse(body), null, 2));
      res.end(JSON.stringify({ status: "produk diupdate" }));
    });
  }

  // Update Setting
  if (req.method === "POST" && req.url === "/updatesetting") {
    let body = "";
    req.on("data", c => body += c);
    req.on("end", () => {
      fs.writeFileSync(setPath, JSON.stringify(JSON.parse(body), null, 2));
      res.end(JSON.stringify({ status: "setting diupdate" }));
    });
  }
};
