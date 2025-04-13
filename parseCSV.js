// Так как работаем с таблицей для графа, headers у нас одинаковые по горизонтали и вертикали. Пустые клетки это пути к самому себе, а 1000 это отсутствие пути.
export default function parseCSV(csvString) {
  const rows = csvString.split('\n').map(line => line.trim()).filter((item, index) => index !== 0);
  const headers = csvString.split('\n').map(line => line.trim())[0].split(',').map(header => header.trim()).filter(header => header !== '');
  const data = [];
  for (const line in rows) {
    data.push(rows[line].split(',').map(cell => cell.trim()).filter((cell, i) => i !== 0));
  }
  return [headers, data];
}