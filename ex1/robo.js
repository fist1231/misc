console.log('Robo');

const robo = () => {

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
		  for (let [from, to] of edges.map(r => r.split("-"))) {
		    addEdge(from, to);
		    addEdge(to, from);
		  }
		  return graph;
		}

		var roadGraph = buildGraph(roads);	
		// console.log(roadGraph);


		const myGraph = list => {
			let obj = Object.create(null);

			const makeRoute = (from, to) => {
				if(obj[from] == null) {
					obj[from] = [to];
				} else {
					obj[from].push(to);
				}
			}

			list.map(x => x.split('-')).forEach( ([from, to]) => { 
				makeRoute(from, to);
				makeRoute(to, from);
			});



			// const lst1 = list.map(x => x.split('-') );
			// console.log(lst1);
			// const lst2 = list.map(x => x.split('-') ).reduce( (x, [from, to]) => { (x!=undefined && x[from]!=null)?x[from].push(to):x[from]=[to] }, Object.create(null) );
			// console.log(lst2);

			return obj;
		}

		// console.log(myGraph(roads));


		var VillageState = class VillageState {
		  constructor(place, parcels) {
		    this.place = place;
		    this.parcels = parcels;
		  }

		  move(destination) {
		    if (!roadGraph[this.place].includes(destination)) {
		      return this;
		    } else {
		      let parcels = this.parcels.map(p => {
		        if (p.place != this.place) return p;
		        return {place: destination, address: p.address};
		      }).filter(p => p.place != p.address);
		      return new VillageState(destination, parcels);
		    }
		  }
		}

		function runRobot(state, robot, memory) {
		  for (let turn = 0;; turn++) {
		    if (state.parcels.length == 0) {
		      console.log(`Done in ${turn} turns`);
		      break;
		    }
		    let action = robot(state, memory);
		    state = state.move(action.direction);
		    memory = action.memory;
		    // console.log(`Moved to ${action.direction}`);
		  }
		}

		function randomPick(array) {
		  let choice = Math.floor(Math.random() * array.length);
		  return array[choice];
		}

		function randomRobot(state) {
		  return {direction: randomPick(roadGraph[state.place])};
		}

		VillageState.random = function(parcelCount = 5) {
		  let parcels = [];
		  for (let i = 0; i < parcelCount; i++) {
		    let address = randomPick(Object.keys(roadGraph));
		    let place;
		    do {
		      place = randomPick(Object.keys(roadGraph));
		    } while (place == address);
		    parcels.push({place, address});
		  }
		  console.log(parcels);

		  return new VillageState("Post Office", parcels);
		};


		const randomState = VillageState.random(20);

		runRobot(randomState, randomRobot);


		var mailRoute = [
		  "Alice's House", "Cabin", "Alice's House", "Bob's House",
		  "Town Hall", "Daria's House", "Ernie's House",
		  "Grete's House", "Shop", "Grete's House", "Farm",
		  "Marketplace", "Post Office"
		];

		function routeRobot(state, memory) {
		  if (memory.length == 0) {
		    memory = mailRoute;
		  }
		  return {direction: memory[0], memory: memory.slice(1)};
		}

		runRobot(randomState, routeRobot, mailRoute);


}

robo();