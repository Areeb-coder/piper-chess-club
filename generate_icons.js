const sharp = require('sharp');
const fs = require('fs');

async function generateIcons() {
  const inputPath = 'C:/Users/admin/Downloads/ChatGPT Image Jul 5, 2026, 02_46_57 AM (1).png';
  console.log('Reading image...');
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  
  // Flood fill from the 4 corners to find exterior white
  const visited = new Uint8Array(width * height);
  const queue = [];
  
  function push(x, y) {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      const idx = y * width + x;
      if (visited[idx] === 0) {
        // check if it's white-ish
        const pIdx = idx * 4;
        const r = data[pIdx];
        const g = data[pIdx+1];
        const b = data[pIdx+2];
        if (r > 200 && g > 200 && b > 200) {
           visited[idx] = 1;
           queue.push(idx);
        } else {
           visited[idx] = 2; // boundary
        }
      }
    }
  }

  push(0, 0);
  push(width-1, 0);
  push(0, height-1);
  push(width-1, height-1);
  
  let head = 0;
  while(head < queue.length) {
      const idx = queue[head++];
      const x = idx % width;
      const y = Math.floor(idx / width);
      push(x - 1, y);
      push(x + 1, y);
      push(x, y - 1);
      push(x, y + 1);
  }

  // Now, all visited[idx] === 1 are exterior white. Make them transparent.
  // For anti-aliasing on the edges, we can apply a slight blur or just fade the boundaries.
  // We will do a simple pass: if it's visited===1, alpha=0.
  
  for (let i = 0; i < visited.length; i++) {
     if (visited[i] === 1) {
         data[i*4 + 3] = 0;
     }
  }
  
  // A quick blur on alpha channel to smooth edges? 
  // Actually, sharp can do a trim to get the core, and since it's an icon, resizing will smooth it out anyway.

  console.log('Trimming transparent edges...');
  const transparentImg = sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 }
  }).trim();

  // Create different sizes
  console.log('Generating sizes...');
  
  await transparentImg.clone().resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toFile('src/app/icon.png');
  await transparentImg.clone().resize(180, 180, { fit: 'contain', background: '#111111' }).flatten({ background: '#111111' }).toFile('src/app/apple-icon.png');
  
  if (!fs.existsSync('public/icons')) fs.mkdirSync('public/icons');
  await transparentImg.clone().resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toFile('public/icons/icon-192.png');
  await transparentImg.clone().resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toFile('public/icons/icon-512.png');

  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);
