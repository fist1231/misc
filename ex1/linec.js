import fs from 'fs';
// import path from 'path';
var path = require('path');

//var fs = require('fs');

console.log(`linec`);

class Linec {

	main () {
		fs.stat('c:/tmp/tsa.txt', (err, stats) => {
		  if (err) throw err;
		});
		fs.readFile('c:/tmp/tsa.txt', 'utf8', (err, data) => {
		  if (err) throw err;
		});

		// const dirname = 'c:/nspires';
		const dirname = 'c:/xx1';

		// root dir and array of Promises
		// const promise = this.processDir(dirname);
		const promise = this.parseFolderOld(dirname);
		promise.then(result	=> {
			console.log(`result=${result}`);
		});

		// this.promiseLand();
	}


		processDir(dirname) {
			return new Promise((resolve, reject) => {
				fs.readdir(dirname, (err, filenames) => {
					if (err) reject(err);//throw err;
					// console.log(`filenames=${filenames}`);
					const proms = filenames.map(x => {
						// console.log(`---> path.extname(x): ${z}`);
						let fullPath = path.join(dirname, x);
						return this.countFiles(fullPath, x);
					});

					Promise.all(proms)
					.then(p => {
						console.log(`p=${p}`);
						const count = p.reduce((a,b)=>a+b,0);
						console.log(`==> count=${count}`);
						resolve(count);
					});

				});
			});
		}	

		countFiles(fullPath, x) {
			return new Promise((resolve, reject) => {
				// let count = 0;
				// console.log(`***> map promise start, count: ${count} for ${fullPath}`);
				fs.stat(fullPath, (err, stat) => {
					if (err) reject(err);
					if(stat.isDirectory()) {
						if(x[0] != '.') {
							const prom3 = this.processDir(fullPath);
							// prom3.then(res => {
							// 	console.log(`### inner res=${res}`);
							// 	count += res;
							// 	console.log(`### inner count=${count}`);
							// 	resolve(count);
							// })
							// promises.push(prom3);
							resolve(prom3);
						}
					} else { // file
						if(path.extname(x) == '.java') {
							resolve(1);
							// count += 1;
							// console.log(`***> map promise .java, count: ${count} for ${fullPath}`);
						}
					}
					// console.log(`***> map promise end be4 resolve, count: ${count} for ${fullPath}`);
					// promises.push(Promise.resolve(count));
					// resolve(count);
					// resolve({arr:promises, count}); 
				});
			});

		}


	promiseLand() {

		new Promise((resolve, reject) => {
			resolve("aaa");
		})
		.then((result) => {
			return(`bbb: ${result}`);
		})
		.then((result) => {
			console.log(`%%%%% result: ${result}`);
			console.group(`what da heck`);
			console.groupEnd();
			console.log(`back in business`);
		});


		new Promise(function(res, rej) {
		    res(`aaa:`);
		})
		.then(function(result) {
		    return Promise.resolve(`bbb: ${result}`);
	    })
		.then(function(result) {
		    console.log(`--- result: ${result}`);
		});

	}

	parseFolder(dirname, count) {
		return new Promise((resolve, reject) => {

			fs.readdir(dirname, (err, filenames) => {
				if (err) reject(err);//throw err;
				// console.log(`filenames=${filenames}`);
				const promises = filenames.map(x => {
					// console.log(`---> path.extname(x): ${z}`);
					let fullPath = path.join(dirname, x);
					this.func1(fullPath, x, count);
					// .then((rez) => {
					// 	// console.log(`^^^^^^> promised rez=${rez}`);
					// 	return rez;
					// })
					// .catch((err) => console.log(`~~~> error in promise: ${err}`));
				});
				// resolve(count);
				Promise.all(promises).then((res) => {
					// const cnt = res.reduce((x,y) => x + y, 0);
					// console.log(`~~~~> promised cnt=${cnt}`);
					resolve(res);
				});
			});
		});
		// .then((rez) => {
		// 	// console.log(`^^^^^^> promised rez=${rez}`);
		// 	resolev(rez);
		// })
		// .catch((err) => console.log(`*******> error in promise: ${err}`));
	}

	func1(fullPath, x, count) {
		return new Promise((resolve, reject) => {
				fs.stat(fullPath, (err, stat) => {
					if (err) reject(err);
					if(stat.isDirectory()) {
						// console.log(`****> It's a dir: ${fullPath}`);
						if(x[0] != '.') {
							this.parseFolder(fullPath, count)
							.then((rez) => {
								// console.log(`^^^^^^> promised count before=${count}`);
								// console.log(`^^^^^^> promised rez before=${rez}`);
								count += rez;
								console.log(`^^^^^^> promised count after=${count}`);
							})
							.catch((err) => console.log(`xxxx> error in promise: ${err}`));

						} else {
							// 
							// console.log(`xxxx Skipping ${fullPath}`);
						}

					} else { // file
						if(path.extname(x) == '.java') {
							// console.log(`${x}`);
							count = count + 1;
							// console.log(` ---> count=${count}`);
						}
					}
					resolve(count);
					// console.log(`====> ${JSON.stringify(stat)}`);
					// console.log(`====> ${stat.isFile()}`);
					// console.log(`====> ${stat.isDirectory()}`);
					// resolve(count);
					// return count;
				});

		});
	}

	parseFolderOld(dirname) {

		// let count = 0;
		// console.log(`***> parseFolderOld start, count: ${count}`);
		return new Promise((resolve, reject) => {
			// console.log(`***> parseFolderOld main promise start, count: ${count}; dirname=${dirname}`);
			fs.readdir(dirname, (err, filenames) => {
				if (err) reject(err);//throw err;

				const promises = filenames.map(x => {
					const fullPath = path.join(dirname, `${x}`);
					return new Promise((reslv, rejct) => {
						// console.log(`***> map promise start, count: ${count} for ${fullPath}`);
						fs.stat(fullPath, (err, stat) => {
							if (err) rejct(err);
							if(stat.isDirectory()) {
								if(x[0] != '.') {
									reslv(this.parseFolderOld(fullPath));
								}
							} else { // file
								if(path.extname(x) == '.java') {
									reslv(1);
									// console.log(`***> map promise .java, count: ${count} for ${fullPath}`);
								}
							}
						});
					});
				});
				Promise.all(promises)
				.then((res) => {
					// count += res;
					console.log(`^^^^^^> promised res=${res}`);
					// return Math.max(...res);
					const count = res.reduce((a, b) => a + b, 0);
					resolve(count);
				});
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