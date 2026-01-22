function searchDI() {
  const di = document.getElementById("diInput").value.trim();
  const result = document.getElementById("result");

  if (!di) {
    alert("กรุณาใส่รหัสสินค้า (DI)");
    return;
  }

  result.innerHTML = "⏳ กำลังค้นหา...";

  fetch(`/search?di=${encodeURIComponent(di)}`)
    .then(res => res.json())
    .then(data => {
      if (!data || data.error) {
        result.innerHTML = "❌ ไม่พบข้อมูล";
        return;
      }

      result.innerHTML = `
        <div class="card">
          <p><b>ชื่อสินค้า:</b> ${data.name}</p>
          <p><b>รหัสสินค้า:</b> ${data.id}</p>
          <p><b>รายละเอียด:</b> ${data.detail}</p>
          <p><b>เพิ่มเติม:</b> ${data.extra || "-"}</p>
          ${data.image ? `<img src="${data.image}">` : ""}
        </div>
      `;
    })
    .catch(() => {
      result.innerHTML = "❌ เกิดข้อผิดพลาด";
    });
}
