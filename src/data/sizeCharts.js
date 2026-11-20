// Roman Urdu: File frontend/src/data/sizeCharts.js ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
// Reference measurements transcribed from the user-provided Manto screenshot.
// These are Manto garment measurements, NOT verified Aurangzaib manufacturing specs.
// Other categories intentionally require the store's own approved measurements.
export const kameezReference = {
  title: 'Kameez Shalwar', unit: 'cm', note:'Reference garment measurements from the supplied Manto screenshot. Please confirm Aurangzaib sizing before ordering.',
  tables: [
    { title: 'Kameez Measurements', columns: ['Size','Chest','Length','Arm Hole','Sleeves','Shoulders','Hip'], rows: [
      ['S',54.6,104,25.4,58.4,44.5,57.1],['M',57.1,107,26.7,61,47,59.7],['L',59.7,109,27.9,63.5,49.5,62.2],['XL',62.2,112,29.2,66,52.1,64.8]
    ]},
    { title: 'Shalwar Measurements', columns: ['Size','Length','Bottom Width'], rows: [
      ['S',102,3.2],['M',104,3.2],['L',107,3.2],['XL',109,3.2]
    ] }
  ]
}
export const waistcoatReference = {
 title: 'Waistcoat', unit:'cm',
 note: 'Reference waistcoat chart supplied in your screenshot (Shahzeb Saeed). Aurangzaib tailoring measurements must be confirmed before publishing as a store fit guarantee.',
 tables:[{title:'Waistcoat Measurements',columns:['Measurement','S','M','L','XL','XXL'],rows:[] }]
}
// The reference image uses inches; these are converted to cm so the CM/IN toggle remains accurate.
const waistRows = [
 ['Length',26,27,28,28,31],
 ['Chest',18,19,20.5,21.5,24],
 ['Waist',19,20,21,22.5,24.5],
 ['Collar',14.5,15.5,16.5,17.5,18]
]
waistcoatReference.tables=[{title:'Waistcoat Measurements',columns:['Size','Length','Chest','Waist','Collar'],rows:['S','M','L','XL','XXL'].map((sz,i)=>[sz,...waistRows.map(row=>+(row[i+1]*2.54).toFixed(2))])}]
export function sizeChartFor(product) {
  const name = `${product?.category||''} ${product?.subCategory||''} ${product?.name||''}`.toLowerCase()
  if (/waist.?coat|waist coat|prince coat/.test(name)) return waistcoatReference
  if (/kameez|shalwar|kurta|pajama|pyjama/.test(name)) return kameezReference
  return null
}
