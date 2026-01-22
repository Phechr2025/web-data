let sheetData = [];

async function loadData() {
  const res = await fetch("/api/products");
  sheetData = await res.json();
}

loadData();
setInterval(loadData, 3000);

function resolveImageUrl(url) {
  if (!url) return "";

  // Google Drive
  const drive = url.match(/drive\.google\.com\/file\/d\/(.+?)\//);
  if (drive) {
    return `https://drive.google.com/uc?export=view&id=${drive[1]}`;
  }

  // Direct image
  if (url.match(/^https?:\/\/.
