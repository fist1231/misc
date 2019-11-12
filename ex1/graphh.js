console.log('graph');


const edges = [
	"1-2", "1-5", "2-8", "3-5", "4-5", "4-9", "5-9",
	"6-10", "7-10", "7-11", "8-12", "9-10", "9-12", "11-12"
]

const main = () => {
	const from = "12";
	const to = "3";
	const graph = getGraph(edges);
	const paths = pathBreadth(graph, from, to);
	printPaths(paths, from, to);
	printShortestPath(paths, from, to);


	const pathsD = pathDepth(graph, from, to, [], []);
	printPaths(pathsD, from, to);
	printShortestPath(pathsD, from, to);

	// const grph = buildGraph(edges);
	// console.log(`++++ Mega-graph: ${JSON.stringify(grph)}`);
	findRoute(graph, from, to);
	// const [first] = edges;
	// console.log(`#### first: ${first}; rest: ${true}`);
}


const printPaths = (paths, from, to) => {
	console.log(`The routes between ${from} and ${to} are: `);
	paths.map(x=>console.log(x));

}

const printShortestPath = (paths, from, to) => {
	console.log(`The shortest route:`);
	const minLength = paths.map(x => {
		return {length:x.length, val:x}
	}).reduce((accum, x) => {
		 return Math.min(accum, x.length);
	}, Number.MAX_SAFE_INTEGER);
	paths.filter(({length}) => length<=minLength).map(x=>console.log(x));
	console.log(`It's ${minLength-1} steps between ${from} and ${to}`);
}



const pathBreadth = (graph, n1, n2) => {
	const navs = [];
	const paths = [];
	navs.push([n1]);
	while(Array.isArray(navs) && navs.length) {
		const currArr = navs.pop();
		const nextArr = graph[currArr.slice(-1)];
		nextArr.forEach(x => {
			if(!currArr.includes(x)) {
				navs.push(currArr.concat([x]));
				if(x === n2) {
					paths.push(currArr.concat([x]));
					// console.log(`++++> paths: ${JSON.stringify(paths)}`);
				}
			}
		});
	}
	return paths;
}

const pathDepth = (graph, n1, n2, navs, paths) => {

	navs.push(n1);
	if(n1 === n2) {
		paths.push(navs);
	} else {
		const arr = graph[n1];
		// console.log(`++++> arr: ${JSON.stringify(arr)}`);
		arr.forEach(x=> {
		    const newArray = [...navs];
		    // console.log(`===> newArray: ${JSON.stringify(newArray)}`);
			// if(!navs.includes(x)) {
			if(!navs.some(z=> z===x)) {
				pathDepth(graph, x, n2, newArray, paths);
			}

		});
	}
	return paths;
}

function findRoute(graph, from, to) {
	let work = [{at: from, route: []}];
	for (let i = 0; i < work.length; i++) {
		let {at, route} = work[i];
		// console.log(`!!!!!!!!! at=${at}; graph[at]=${graph[at]}`);
		console.log(`======> work:`);
		work.forEach(x=>console.log(x));
		for (let place of graph[at]) {
			if (place == to) {
				const result = route.concat(place);
				console.log(`****************** result=${result}`);
				return result;
			}
			if (!work.some(w => w.at == place)) {
				work.push({at: place, route: route.concat(place)});
			}
		}
	}
}

const getGraph = (edges) => {
	const graph = new Object();
	edges.map(x=>x.split('-')).map(([from, to]) => {
		if(graph[from]) {
			graph[from].push(to);
		} else {
			graph[from] = [to];
		}
		if(graph[to]) {
			graph[to].push(from);
		} else {
			graph[to] = [from];
		}
	});
	console.log(`Graph: ${JSON.stringify(graph)}`)
	return graph;
}

function buildGraph(edges) {
	let graph = Object.create(null);
	function addEdge(from, to) {
		if (graph[from] == null) {
			graph[from] = [to];
		} else {
			graph[from].push(to);
		}
	}
	for (let [from, to] of edges.map(r => r.split("-"))) {
		addEdge(from, to);
		addEdge(to, from);
	}
	return graph;
}

main();

/*

   2------1
   |     /    3
   |    /    /
   |   /    /
 4-|--5 ----  6    7
   \  |       |   / \
   |\ |       |  /   \
   | \|       | /     \
   8  9-------10      11
    \ |               /  
     \|              /
      ------12-------

1: 2,5			8: 2,12
2: 1,8			9: 4,5,10,12
3: 5		   10: 6,7,9
4: 5,9		   11: 7,12
5: 1,3,4,9	   12: 8,9,11
6: 10
7: 10,11

*/