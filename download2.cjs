const https = require('https');
const fs = require('fs');

https.get('https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_ADEMD_INFO&key=4495C881-6BD2-35F5-85E2-BD7991D2B1F6&domain=http://localhost:3000&attrFilter=emd_cd:like:41360&crs=EPSG:4326&format=geojson', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('./src/data/namyangju.json', data);
    console.log('Saved');
  });
});
