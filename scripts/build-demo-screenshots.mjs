// Reproducible, code-native illustrations of the current Analytics UI.
// All data is fictional. Keep totals and derived metrics internally consistent.
import { readFileSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const out = new URL('../public/screenshots/', import.meta.url);
const logo = readFileSync(new URL('oneapp-mobile-app-icon.png', out)).toString('base64');
const shape = [18,20,19,22,21,25,23,26,25,29,27,30,28,33,31,35,32,36,34,38,36,41,39,43,40,46,44,48,46,51];
const series = (total, factor = 1) => {
  const sum = shape.reduce((a,b) => a+b,0);
  return shape.map(n => n / sum * total * factor);
};
const text = (x,y,value,size=12,color='#cbd5e1',weight=500,extra='') => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}" ${extra}>${value}</text>`;
const rect = (x,y,w,h,r,fill,stroke='none') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
const defs = `<defs><linearGradient id="card" x2="0" y2="1"><stop stop-color="#171d39"/><stop offset="1" stop-color="#0c1025"/></linearGradient><linearGradient id="area" x2="0" y2="1"><stop stop-color="#10b997" stop-opacity=".22"/><stop offset="1" stop-color="#10b997" stop-opacity="0"/></linearGradient><linearGradient id="active"><stop stop-color="#368cf9"/><stop offset="1" stop-color="#7163f4"/></linearGradient></defs>`;
const svg = (w,h,title,body) => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc"><title id="title">${title}</title><desc id="desc">OneApp product illustration with fictional demo data. Not actual business results.</desc>${defs}<g font-family="Arial,Helvetica,sans-serif">${body}</g></svg>`;
const path = (values,x,y,w,h,max) => values.map((n,i)=>`${i?'L':'M'}${(x+i*w/(values.length-1)).toFixed(2)},${(y+h-n/max*h).toFixed(2)}`).join(' ');

function tile(x,y,label,value,accent,icon,detail,change) {
  return rect(x,y,163,112,18,'url(#card)','#20263e')+rect(x+17,y,129,2,1,accent)+rect(x+16,y+15,30,30,9,accent+'20')+text(x+26,y+35,icon,18,accent,700)+text(x+16,y+61,label,10,'#9ba6be',600)+text(x+16,y+88,value,25,'#f8fafc',700)+text(x+16,y+104,detail,9,'#91a0b8',500)+(change?text(x+146,y+34,change,10,'#42dbb2',600,'text-anchor="end"'):'');
}
function mobile(kind) {
  const commerce = kind==='commerce';
  const total = commerce?1280000:184800;
  const growth=commerce?32:40;
  const prior=total/(1+growth/100);
  const values=series(total), old=series(prior);
  assert(Math.abs(values.reduce((a,b)=>a+b,0)-total)<0.01);
  assert.equal(1280000/16000,80);
  assert.equal(192000/1280000,.15);
  assert.equal(50400/8400,6);
  let b=rect(0,0,390,844,0,'#080c1e');
  b+=`<image x="19" y="15" width="49" height="49" xlink:href="data:image/png;base64,${logo}"/>`;
  b+=rect(90,29,commerce?96:111,24,12,'#151a30')+text(101,45,commerce?'The D Zone ›':'Webaholics ›',11,'#dae1f0');
  b+=rect(287,27,35,35,17,'#151b34')+text(297,50,'✦',22,'#71b4ff')+rect(334,27,35,35,17,'#151b34')+text(346,49,'●',16,'#c079ec');
  b+=rect(20,88,350,41,15,'#11162d','#1c2340');
  ['Pulse','Brief','Analytics','Trends'].forEach((n,i)=>{if(i===2)b+=rect(194,92,86,33,11,'url(#active)');b+=text(61+i*87,114,n,12,i===2?'#fff':'#8f9bb3',700,'text-anchor="middle"');});
  [ ['Today',20,48],['7d',75,32],['30d',114,40],['60d',161,36],['90d',204,36] ].forEach(([n,x,w])=>{b+=rect(x,145,w,24,6,n==='30d'?'#287bed':'#0c1226','#1a213a')+text(x+w/2,161,n,10,n==='30d'?'#fff':'#9aa8c0',700,'text-anchor="middle"');});
  b+=rect(252,145,118,24,12,'#10162e')+rect(commerce?309:254,147,58,20,10,'#287bed')+text(282,161,'SERVICE',8,commerce?'#8894ab':'#fff',700,'text-anchor="middle"')+text(338,161,'ECOMM',8,commerce?'#fff':'#8894ab',700,'text-anchor="middle"');
  b+=text(22,190,commerce?'All channels  ·  All stores':'Paid invoices  ·  Service analytics',10,'#8996af');
  b+=rect(20,205,350,278,19,'url(#card)','#20273f')+rect(36,205,318,3,1,'#10b997');
  b+=text(40,238,commerce?'Order Revenue':'Revenue Trend',18,'#fff',700)+text(40,257,'Last 30 days vs prior',11,'#8f9bb2');
  b+=text(349,239,commerce?'$1.28M':'$184.8k',24,'#fff',700,'text-anchor="end"')+text(349,259,`+${growth}.0%`,12,'#38d7ad',700,'text-anchor="end"');
  b+=rect(40,276,28,23,12,'#079d7e')+text(54,292,'$',12,'#fff',700,'text-anchor="middle"')+text(82,292,'#',11,'#7f8da7')+text(107,292,'BOTH',9,'#7f8da7',700);
  b+=rect(276,279,73,18,8,'#213536')+text(312,291,'DEMO DATA',8,'#83e0c7',700,'text-anchor="middle"');
  b+=text(40,319,'— Current',9,'#37c5a4')+text(112,319,'- - Prior',9,'#8590a8');
  const max=Math.max(...values)*1.1, line=path(values,40,334,309,119,max);
  [348,387,426,453].forEach(y=>b+=`<path d="M40 ${y}H349" stroke="#273048" stroke-opacity=".5"/>`);
  b+=`<path d="${path(old,40,334,309,119,max)}" fill="none" stroke="#6d7d97" stroke-dasharray="4 4" stroke-width="1.5"/><path d="${line}L349 453L40 453Z" fill="url(#area)"/><path d="${line}" fill="none" stroke="#19c39d" stroke-width="2.5" stroke-linejoin="round"/>`;
  b+=text(40,470,'Day 1',9,'#7b89a4')+text(349,470,'Day 30',9,'#7b89a4',500,'text-anchor="end"');
  b+=commerce
    ?tile(20,498,'PROFIT','$192.0k','#10b997','$','15.0% margin','+38.5%')+tile(207,498,'ORDERS','16,000','#408cff','▣','Completed orders','+28.0%')+tile(20,624,'AOV','$80.00','#23b8c6','◎','Revenue ÷ orders','+3.1%')+tile(207,624,'REFUNDS','1.2%','#e9bc4d','↻','192 refunded orders','−0.4pt')
    :tile(20,498,'SESSIONS','18,420','#408cff','◎','Website visits','+35.0%')+tile(207,498,'NEW LEADS','286','#10b997','◎','Qualified inquiries','+43.0%')+tile(20,624,'AVG POSITION','2.1','#ae74f5','▥','Organic search','↑ 1.3')+tile(207,624,'AD SPEND','$8.4k','#e9bc4d','ϟ','ROAS 6.0x · $50.4k attributed','');
  b+=text(195,759,'Illustrative demo figures · not actual results',9,'#94a0b8',500,'text-anchor="middle"');
  b+=rect(0,778,390,66,0,'#0a0f23');
  ['Home','Inbox','Leads','Tasks','Orders','More'].forEach((n,i)=>{const x=38+i*63;b+=text(x,802,['◆','▣','◎','☑','▧','•••'][i],18,i?'#72819c':'#5ba5fa',500,'text-anchor="middle"')+text(x,823,n,9,i?'#72819c':'#5ba5fa',600,'text-anchor="middle"');});
  return svg(390,844,`${commerce?'D Zone commerce':'Webaholics service'} analytics — demo data`,b);
}
writeFileSync(new URL('mobile-dzone-demo.svg',out),mobile('commerce'));
writeFileSync(new URL('mobile-webaholics-demo.svg',out),mobile('service'));

// The illustration demonstrates reporting, not a measured production outcome.
const overall=[78,81,80,84,83,86,85,87,88,86,89,90,88,91,92,91,93,92,94,93,95,94,96,95,97,96,97,98,97,98];
const weekday=[68,73,70,76,75,78,77,80,82,79,83,85,82,86,85,88,87,89,88,91,90,92,91,93,92,94,93,95,94,96];
let b=rect(0,0,1178,510,20,'#1c263a','#334055');
b+=text(26,40,'Response performance',22,'#f1f5f9',700)+text(26,67,'Customer message → first sent reply · last 30 days',14,'#aab7cb');
b+=rect(837,22,124,26,13,'#263b40')+text(899,40,'DEMO DATA',11,'#9ae1cc',700,'text-anchor="middle"')+text(995,40,'7d',13,'#aab7cb')+text(1054,40,'30d',13,'#fff',700)+text(1118,40,'90d',13,'#aab7cb')+rect(1041,53,52,3,0,'#baa2eb');
const average = values => (values.reduce((a,b)=>a+b,0)/values.length).toFixed(1);
b+=text(26,104,`${average(weekday)}% within 4h on weekdays`,15,'#83d7b1',700)+text(359,104,`${average(overall)}% within 12h overall`,15,'#9dd0ed',700);
[0,50,100].forEach(n=>{const y=303-n*1.62;b+=`<path d="M68 ${y}H1137" stroke="#374259"/>`+text(57,y+5,`${n}%`,12,'#aab7cb',500,'text-anchor="end"');});
b+=`<path d="${path(overall,68,141,1069,162,100)}" fill="none" stroke="#8ac9e7" stroke-width="3"/><path d="${path(weekday,68,141,1069,162,100)}" fill="none" stroke="#7ac9a6" stroke-width="3"/>`;
['Day 1','Day 7','Day 14','Day 21','Day 30'].forEach((n,i)=>b+=text(68+i*267,327,n,12,'#aab7cb',500,i===4?'text-anchor="end"':''));
b+=text(442,359,'— Weekday within 4h',12,'#7ac9a6')+text(640,359,'— Overall within 12h',12,'#8ac9e7');
b+=text(26,400,'Average reply time by channel',16,'#f1f5f9',700)+text(1150,400,'Elapsed time, including nights and weekends',11,'#aab7cb',500,'text-anchor="end"');
[['EBAY','1.2h',1.2],['AMAZON','1.8h',1.8],['WEBSITE CHAT','0.1h',.1]].forEach(([label,value,hours],i)=>{let x=26+i*385;b+=text(x,432,label,12,'#aab7cb')+text(x+355,432,value,16,'#f1f5f9',700,'text-anchor="end"')+rect(x,447,355,6,3,'#28364c')+rect(x,447,355*hours/24,6,3,'#8ac9e7');});
b+=text(26,486,'Illustrative demo data. Live response times depend on synced, successfully sent replies.',12,'#aab7cb');
writeFileSync(new URL('messages-response-demo.svg',out),svg(1178,510,'OneApp response performance — demo data',b));
console.log('Created three labeled demo illustrations; revenue, margin, AOV and ROAS checks passed.');
