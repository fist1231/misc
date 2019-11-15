import fs from 'fs';
// import path from 'path';
var path = require('path');

//var fs = require('fs');

console.log(`linec`);

class Linec {

	main () {
		console.log(`number of lines: ${true}`);
		fs.stat('c:/tmp/tsa.txt', (err, stats) => {
		  if (err) throw err;
  			console.log(`stats: ${JSON.stringify(stats)}`);
		});
		fs.readFile('c:/tmp/tsa.txt', 'utf8', (err, data) => {
		  if (err) throw err;
		  console.log(`JSOn data: ${JSON.stringify(data)}`);
		  console.log(`data: ${data}`);
		   //  fs.close(data, (err) => {
			  // if (err) throw err;
	 	  //   });

		});

		const dirname = 'c:/nspires/';
		this.parseFolder(dirname);
		// fs.readdirSync(dirname).forEach(x=> console.log(x));
	}

	parseFolder(dirname) {
		fs.readdir(dirname, (err, filenames) => {
			if (err) throw err;
			console.log(`filenames=${filenames}`);
			filenames.map(x => {
				let fullPath = path.join(dirname, x);
				// console.log(`---> path.extname(x): ${z}`);
				fs.stat(fullPath, (err, stat) => {
					if (err) throw err;
					if(stat.isDirectory()) {
						console.log(`****> It's a dir: ${fullPath}`);
						if(x[0] != '.') {
							this.parseFolder(fullPath);
						} else {
							console.log(`xxxx Skipping ${fullPath}`);
						}

					}
					// console.log(`====> ${JSON.stringify(stat)}`);
					// console.log(`====> ${stat.isFile()}`);
					// console.log(`====> ${stat.isDirectory()}`);
					
				})
			});
		});
	}

}

const run = () => {
	const lc = new Linec();
	lc.main();
}

run();

export default Linec;