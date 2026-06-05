// fetch_vworld.js
import fs from 'fs';

async function run() {
  try {
     const url = 'https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_ADEMD_INFO&key=4495C881-6BD2-35F5-85E2-BD7991D2B1F6&domain=http://localhost:3000&attrFilter=emd_cd:like:41360&crs=EPSG:4326&format=geojson';
     const res = await fetch(url);
     const text = await res.text();
     fs.writeFileSync('src/data/namyangju.json', text);
     console.log('Success!', text.substring(0, 100));
  } catch (e) {
     console.error(e);
  }
}
run();
