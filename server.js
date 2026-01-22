const express = require("express");
const fetch = require("node-fetch");
const app = express();

const SHEET_ID = "ใส่_SHEET_ID_ตรงนี้";
const API_KEY = "ใส่_API_KEY_ตรงนี้";

app.use(express.static("public"));

app.get("/api/products", async (req, res) => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.values);
  } catch (err) {
    res.status(500).json({ error: "โหลดข้อมูลไม่สำเร็จ" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));
