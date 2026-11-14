/* Saved for a future iteration: alternate About-page travel marks.
 * passport(): international cities as passport entry stamps (proof B).
 * sticker():  vintage luggage stickers (proof C), with STICKER_POS, ART, STICKER and PALETTES.
 * They take the same POSTMARKS entries as postmark() in index.html and reuse fitText() and the #pm-rough filter.
 * To try one, paste this back into index.html above PM_STYLE and switch travelMark() to call it.
 *
 * CSS that went with them:
 *   .pm-g{color:#7fe0a8;opacity:.5}
 *   .pm-p{color:#c9a3ff;opacity:.5}
 *   .pm-pp{width:calc(clamp(120px,14vw,210px) * var(--s))}
 *   .pm-lug{width:calc(clamp(84px,9.5vw,140px) * var(--s));opacity:.82;filter:drop-shadow(0 3px 4px rgba(0,0,0,.45))}
 *   .pm-lug .lug-rim *{fill:#f4efe6;stroke:#f4efe6;stroke-width:9;stroke-linejoin:round}
 *   .pm-lug .lug-edge *{fill:none;stroke:rgba(0,0,0,.25);stroke-width:1}
 *   .pm-lug .lug-city{fill:#fff;font-family:'Arial Narrow','Avenir Next Condensed','Helvetica Neue',Arial,sans-serif;font-weight:800;letter-spacing:.04em}
 *   .pm-lug .lug-zip{font-family:'Arial Narrow','Avenir Next Condensed','Helvetica Neue',Arial,sans-serif;font-weight:700;letter-spacing:.06em}
 *   .pm-st{width:calc(clamp(70px,8vw,120px) * var(--s));opacity:.3}
 *   .pm-st .st-paper{fill:#efe6d2;stroke:none}
 *   .pm-st .st-panel{fill:none;stroke:currentColor;stroke-width:1.5}
 *   .pm-st .st-ink{fill:#2a2522;font-weight:700}
 *   .pm-st .st-cancel path{stroke:#2a2522;stroke-width:1.6;opacity:.7}
 *   .pm-st.pm-c{color:#8a6d4a}
 */

// Passport entry stamp: boxed or oval, ENTRY / ARRIVED, city, country, postal code and a plane.
function passport([city, region, zip, intl, x, y, rot, size, ink], i){
  const oval = i % 2;
  const frame = oval ? `<ellipse cx="80" cy="50" rx="76" ry="46"/><ellipse cx="80" cy="50" rx="68" ry="38" stroke-dasharray="2 3"/>`
                     : `<rect x="4" y="4" width="152" height="92" rx="10"/><rect x="11" y="11" width="138" height="78" rx="5"/>`;
  const label = ["ENTRY","ARRIVED","ADMITTED","IMMIGRATION"][i % 4];
  return `<svg class="pm pm-pp pm-${ink}" viewBox="0 0 160 100" style="left:${x}%;top:${y}%;--r:${rot}deg;--s:${size}">
    <g filter="url(#pm-rough)">${frame}
    <text x="80" y="${oval?30:28}" font-size="10" text-anchor="middle" letter-spacing="3">${label}</text>
    <text x="80" y="54" font-size="${fitText(city,oval?88:110,18)}" text-anchor="middle">${city}</text>
    <text x="80" y="70" font-size="${fitText(region,oval?100:120,10)}" text-anchor="middle">${region}</text>
    <text x="80" y="${oval?84:83}" font-size="10" text-anchor="middle">✈ ${zip}</text></g></svg>`;
}
// Vintage luggage sticker: die-cut shape with a white rim, sky, a simple landmark, and a ribbon with the city.
const ART = {
  skyline:'<path d="M18 66V44h8v-6h6v28h4V30h5l1-8 1 8h5v36h4V40h9v26h5V48h7v18h7v-14h6v14z"/>',
  needle:'<path d="M8 66l22-26 12 12 10-14 18 28z" opacity=".35"/><path d="M48 66l2-30h-8l-2-3h20l-2 3h-8l2 30zM51 33V20l1-6 1 6v13z"/>',
  mountain:'<path d="M4 66l24-30 10 10 16-24 26 44z"/><path d="M48 30l6-8 6 9-4 3-3-3-3 3z" fill="#fff" opacity=".85"/>',
  bridge:'<path d="M10 66V50h80v16z" opacity=".25"/><path d="M28 50V22h4v28zM68 50V22h4v28z"/><path d="M8 34q22 16 22-12M30 22q20 26 40 0M70 22q0 28 22 12" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 48h84v3H8z"/>',
  dome:'<path d="M24 66v-6h52v6zM30 60V48h40v12zM34 48a16 14 0 0 1 32 0zM49 34V24h2v10z"/><circle cx="50" cy="23" r="2"/>',
  palm:'<circle cx="70" cy="34" r="12" opacity=".35"/><path d="M38 66c2-14 4-24 2-36l3 1c2 12 0 22-2 35z"/><path d="M41 30c-8-6-16-6-22-2 7-1 13 0 20 4zM42 30c6-8 14-10 22-8-7 1-13 4-19 9zM41 31c-2-8-8-12-14-12 5 3 9 7 12 13zM42 31c4-6 10-8 16-6-6 1-10 4-14 8z"/>',
  opera:'<path d="M10 66v-6h80v6z"/><path d="M22 60c2-12 8-22 20-26-4 8-6 16-6 26zM38 60c2-14 10-26 24-30-6 10-8 20-8 30zM56 60c2-10 8-18 18-20-4 6-6 13-6 20z"/>',
  falls:'<path d="M6 66V34h22v32zM72 66V30h22v36z"/><path d="M30 34h40v32H30z" opacity=".35"/><path d="M34 36v28M40 36v28M46 36v28M52 36v28M58 36v28M64 36v28" stroke="#fff" stroke-width="1.4" opacity=".8"/>',
  shamrock:'<circle cx="44" cy="36" r="9"/><circle cx="56" cy="36" r="9"/><circle cx="50" cy="26" r="9"/><path d="M49 40q2 14 8 24l-3 1q-6-10-7-25z"/>',
  bell:'<path d="M48 16h4v6h-4zM38 26q12-6 24 0 0 20 8 28H30q8-8 8-28z"/><path d="M28 54h44v5H28z"/><path d="M50 30l-2 6 3 4-2 6" fill="none" stroke="#fff" stroke-width="1.2"/>',
  lighthouse:'<path d="M42 66l3-40h10l3 40z"/><path d="M44 22h12v4H44zM47 16h6v6h-6z"/><path d="M53 19l30-8v14z" opacity=".3"/><path d="M43.5 44h13v5h-13zM42.5 56h15v5h-15z" fill="#fff" opacity=".6"/>',
  star:'<path d="M50 14l9 20 22 2-17 14 5 22-19-12-19 12 5-22-17-14 22-2z"/>',
  rocket:'<path d="M50 12q10 12 8 38H42q-2-26 8-38z"/><path d="M42 40l-8 14 8-2zM58 40l8 14-8-2z"/><circle cx="50" cy="30" r="3" fill="#fff"/><path d="M45 52h10l-5 12z" opacity=".5"/>',
  peach:'<circle cx="50" cy="44" r="18"/><path d="M50 26q2-8 10-10-2 8-10 10z"/><path d="M50 28q-6 14 0 34" fill="none" stroke="#fff" stroke-width="1.2" opacity=".5"/>',
  spire:'<path d="M30 66V44h40v22zM44 44l6-30 6 30z"/><path d="M38 66V54a4 4 0 0 1 8 0v12zM54 66V54a4 4 0 0 1 8 0v12z" fill="#fff" opacity=".5"/>',
  trumpet:'<path d="M14 42h40v6H14zM54 36q14 0 22-10v38q-8-10-22-10z"/><path d="M24 36h3v6h-3zM32 36h3v6h-3zM40 36h3v6h-3zM20 48q14 10 30 0" fill="none" stroke="currentColor" stroke-width="2"/>',
  tram:'<path d="M48 18h2l10 14h-2zM20 36h60v24H20z"/><path d="M26 40h10v8H26zM40 40h10v8H40zM54 40h10v8H54zM68 40h8v8h-8z" fill="#fff" opacity=".7"/><circle cx="32" cy="62" r="3"/><circle cx="68" cy="62" r="3"/>'
};
const STICKER = {ERIE:['lighthouse',0],PHILADELPHIA:['bell',1],'LOS ANGELES':['palm',2],DENVER:['mountain',3],'SAN FRANCISCO':['bridge',4],
  DUBLIN:['shamrock',5],MELBOURNE:['tram',6],SYDNEY:['opera',7],QUEENSTOWN:['mountain',8],CHRISTCHURCH:['spire',9],AUSTIN:['star',10],
  HOUSTON:['rocket',11],WASHINGTON:['dome',0],'NEW YORK':['skyline',4],PORTLAND:['mountain',5],SEATTLE:['needle',1],VANCOUVER:['mountain',7],
  'NIAGARA FALLS':['falls',3],ATLANTA:['peach',2],'NEW ORLEANS':['trumpet',6],TAMPA:['palm',8]};
// [sky, ground, ribbon, ink]
const PALETTES = [['#f3d9a4','#c9a46a','#1f5f8b','#2b2b2b'],['#f6e3c1','#d9b47a','#b23a2e','#3a2a20'],['#ffd27a','#e98a3c','#d1495b','#2a3d45'],
  ['#bfe0e8','#5d8f6a','#e0a526','#24343c'],['#f2c6a0','#c96f4a','#1d3557','#2b1d16'],['#d7ecd0','#5f9e5f','#1f6b3a','#1e2d22'],
  ['#f0e2b6','#a7895a','#6b3fa0','#2d2433'],['#bcd8f2','#3f7cb8','#f08a24','#14263a'],['#e3edf2','#7a9aa8','#c0392b','#22313a'],
  ['#efe0c8','#9c7b5a','#2e6f62','#2c2622'],['#f5d6c6','#c8553d','#264653','#2a1d18'],['#d6d3f0','#5a5ab0','#e76f51','#1d1b3a']];
// Stickers frame the page (top, sides, bottom) instead of sitting behind the text. [left %, top %] per POSTMARKS entry.
const STICKER_POS = [[0,-2],[11,1],[22,-3],[33,0],[67,-2],[78,1],[89,-1],[91,20],[92,36],[91,52],[92,68],
  [86,84],[74,87],[62,85],[26,86],[14,84],[2,87],[-2,20],[-1,36],[-2,52],[-1,68]];
function sticker([city, region, zip, intl, x, y, rot, size], i){
  [x, y] = STICKER_POS[i] || [x, y];
  const mx = (i % 7) * 14.6 - 3 + (Math.floor(i / 7) % 2) * 5, my = (2 - Math.floor(i / 7)) * 50 + 2;
  const [art, pal] = STICKER[city] || ['skyline', i % PALETTES.length];
  const [sky, ground, ribbon, ink] = PALETTES[pal];
  const shapes = [
    '<circle cx="50" cy="50" r="46"/>',
    '<rect x="4" y="10" width="92" height="80" rx="9"/>',
    '<path d="M8 94V44a42 40 0 0 1 84 0v50z"/>',
    '<ellipse cx="50" cy="50" rx="47" ry="38"/>',
    '<path d="M10 6h80v70l-40 20-40-20z"/>'];
  const shape = shapes[i % shapes.length];
  const band = [52, 64, 64, 50, 56][i % 5];
  return `<svg class="pm pm-lug" viewBox="-6 -6 112 112" style="left:${x}%;top:${y}%;--mx:${mx}%;--my:${my}px;--r:${rot}deg;--s:${size}">
    <defs><clipPath id="lc${i}">${shape}</clipPath></defs>
    <g class="lug-rim">${shape}</g>
    <g clip-path="url(#lc${i})">
      <rect x="0" y="0" width="100" height="100" fill="${sky}"/>
      <rect x="0" y="${band-4}" width="100" height="40" fill="${ground}"/>
      <g fill="${ink}" color="${ink}" transform="translate(0 ${band-66})">${ART[art]}</g>
      <rect x="0" y="${band}" width="100" height="${i%5===4?16:17}" fill="${ribbon}"/>
      <text class="lug-city" x="50" y="${band+12}" font-size="${Math.min(13, 80 / (city.length * 0.7))}" text-anchor="middle">${city}</text>
      <text class="lug-zip" x="50" y="${band+26}" font-size="${Math.min(7, 70 / ((region.length + zip.length + 3) * 0.66))}" text-anchor="middle" fill="${ink}">${region} · ${zip}</text>
    </g>
    <g class="lug-edge">${shape}</g></svg>`;
}
