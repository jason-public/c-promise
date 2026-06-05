// get_geojson.mjs
import http from 'http';
import fs from 'fs';

const url = 'http://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_ADEMD_INFO&key=4495C881-6BD2-35F5-85E2-BD7991D2B1F6&domain=http://localhost:3000&attrFilter=emd_cd:like:41360&crs=EPSG:4326&format=geojson';

http.get(url, {
  headers: {
    'Referer': 'http://localhost:3000',
    'Origin': 'http://localhost:3000',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    fs.writeFileSync('./src/data/namyangju.json', body);
    console.log('Saved data, length:', body.length);
  });
}).on('error', (e) => {
  console.error("Got error: " + e.message);
});
