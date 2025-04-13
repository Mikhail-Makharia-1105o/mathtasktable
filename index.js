import  { readFileSync } from 'fs';
import parseCSV from './parseCSV.js';

const data = readFileSync('./table1.csv').toString();
const [headers, table] = parseCSV(data);

function warshall(table, headers) {
    // Количество вершин в графе
    const n = headers.length;
    
    // Создаем копию матрицы смежности
    const dist = new Array(n);
    for (let i = 0; i < n; i++) {
      dist[i] = new Array(n);
      for (let j = 0; j < n; j++) {
        // Если есть ребро - используем его вес, иначе Infinity
        dist[i][j] = table[i][j] !== '1000' ? +table[i][j] : Infinity;
      }
      // Расстояние от вершины к самой себе всегда 0
      dist[i][i] = 0;
    }
  
    // Основной алгоритм
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          // Если путь через вершину k короче
          if (dist[i][j] > dist[i][k] + dist[k][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
    }
  
    return dist;
}

console.log(warshall(table, headers))

function getShortestPath(table, headers, row, column) {
    const dist = warshall(table, headers);
    if (!(headers.includes(row)) || !(headers.includes(column))) {
        throw new Error('Invalid row or column');
    }
    return dist[headers.indexOf(row)][headers.indexOf(column)];
}

console.log(`Answer: ${getShortestPath(table, headers, 'A', 'G')}`)