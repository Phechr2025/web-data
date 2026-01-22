let sheetData = [];

async function loadData() {
  const res = await fetch("/api/products");
  sheetData = await res.json();
}

setInterval(loadData, 1000);
loadData();

document.getElementById("search").addEventListener("input", () => {
  const id = document.getElementById("search").value.trim();
  const result = document.getElementById("result");
  result.innerHTML = "";

  if (!id) return;

  const found = sheetData.slice(1).find(row => row[1] === id);

  if (!found) {
    result.innerHTML = "<p>❌ ไม่พบสินค้า</p>";
    return;
  }

  result.innerHTML = `
    <div class="card">
      <h2>${found[0]}</h2>
      <p><b>ID:</b> ${found[1]}</p>
      <p><b>รายละเอียด:</b> ${found[2] || "-"}</p>
      <p><b>เพิ่มเติม:</b> ${found[3] || "-"}</p>
      ${found[4] ? `<img src="${found[4]}">` : ""}
    </div>
  `;
});
