import PGroup from './objects/PGroup.js';

console.log('ex7');

var roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  // edges.map(r=>console.log(r));
  // edges.map(r=>console.log(r.split("-")));
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

var roadGraph = buildGraph(roads);
// console.log(roadGraph);


let a7 = () => {

	PGroup.empty = new PGroup([]);

	const g1 = PGroup.empty.add('zero');
	const g2 = g1.add('one');
	const g3 = g2.add('two');
	const g4 = g3.add('three');
	const g5 = g4.add('one');

	const g6 = g5.delete('one');
	const g7 = g6.delete('eleven');
	const g8 = g7.delete('three');
	const g9 = g8.delete('two');
	const g19 = g9.delete('one');
}

a7();