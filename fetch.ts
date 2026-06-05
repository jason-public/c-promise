import fs from 'fs';

const fetchUrl = async () => {
  const res = await fetch('https://getupnote.com/share/notes/KZ0C6ILOO4eW8smmM4m7GvauUwE2/019e6da7-bdc1-7235-8cbc-97ab798ab27e');
  const text = await res.text();
  const cleanText = text.replace(/<[^>]+>/g, '\n').replace(/\n+/g, '\n');
  fs.writeFileSync('pledges.txt', cleanText);
};
fetchUrl();
