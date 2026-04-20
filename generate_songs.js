const fs = require('fs');
const artists = ["The Weeknd", "Taylor Swift", "Drake", "Bad Bunny", "Ed Sheeran", "Ariana Grande", "Harry Styles", "Dua Lipa", "Justin Bieber", "Billie Eilish", "Post Malone", "Olivia Rodrigo", "Kendrick Lamar", "SZA", "Doja Cat", "Eminem", "Rihanna", "Bruno Mars", "Coldplay", "Imagine Dragons"];
const adjectives = ["Midnight", "Dark", "Golden", "Silent", "Neon", "Broken", "Lost", "Wild", "Beautiful", "Cruel", "Sweet", "Bitter", "Electric", "Magic", "Secret"];
const nouns = ["City", "Heart", "Dreams", "Love", "Tears", "Night", "Stars", "Echo", "Moon", "Sun", "Fire", "Soul", "River", "Road", "Sky"];

const songs = [];
let id = 1;
for (let i = 0; i < 50; i++) {
  const artist = artists[Math.floor(Math.random() * artists.length)];
  const title = adjectives[Math.floor(Math.random() * adjectives.length)] + " " + nouns[Math.floor(Math.random() * nouns.length)];
  const image = `https://picsum.photos/seed/${id}/64/64`;
  songs.push(`  { id: ${id}, title: "${title}", artist: "${artist}", image: "${image}" },`);
  id++;
}
fs.writeFileSync('songs_list.txt', songs.join('\n'));