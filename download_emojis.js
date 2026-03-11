const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'mobile', 'assets', 'images');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const emojis = {
  'boy_3d.png': 'Boy/3D/boy_3d.png',
  'car_3d.png': 'Automobile/3D/automobile_3d.png',
  'racecar_3d.png': 'Racing%20car/3D/racing_car_3d.png',
  'sparkles_3d.png': 'Sparkles/3D/sparkles_3d.png',
  'suv_3d.png': 'Sport%20utility%20vehicle/3D/sport_utility_vehicle_3d.png',
  'crown_3d.png': 'Crown/3D/crown_3d.png',
  'gear_3d.png': 'Gear/3D/gear_3d.png'
};

const baseUrl = 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/';

async function download() {
  for (const [name, endpoint] of Object.entries(emojis)) {
    const url = baseUrl + endpoint;
    const dest = path.join(dir, name);
    
    await new Promise((resolve) => {
      https.get(url, (res) => {
        if (res.statusCode === 200) {
          const file = fs.createWriteStream(dest);
          res.pipe(file);
          file.on('finish', () => { file.close(); console.log('Downloaded:', name); resolve(); });
        } else {
          console.log('Failed:', name, res.statusCode);
          resolve();
        }
      }).on('error', (e) => {
        console.error('Error:', name, e.message);
        resolve();
      });
    });
  }
}

download();
