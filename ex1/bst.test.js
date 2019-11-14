import Bst from './bst';

const expectedTree = 
{
	"top":{"id":22,
			"left":{"id":1,
						"left":{"id":-3,
									"left":{"id":-6},
									"right":{"id":-2}
								},
						"right":{"id":11,
									"left":{"id":8},
									"right":{"id":12}
								}
					}
			,"right":{"id":44,
						"left":{"id":35,
									"left":{"id":33},
									"right":{"id":39}
								},
						"right":{"id":60,
									"left":{"id":55}
								}
					}
			}
};

// For add element 0
const addElementTree = 
{
	"top":{"id":22,
			"left":{"id":1,
						"left":{"id":-3,
									"left":{"id":-6},
									"right":{"id":-2, 
												"right":{"id":0} 
											}
								},
						"right":{"id":11,
									"left":{"id":8},
									"right":{"id":12}
								}
					}
			,"right":{"id":44,
						"left":{"id":35,
									"left":{"id":33},
									"right":{"id":39}
								},
						"right":{"id":60,
									"left":{"id":55}
								}
					}
			}
};

const afterRebalance = 
{
	"top":{
		"id":12,
			"left":{
					"id":0,
						"left":{"id":-3,
									"left":{"id":-6},
									"right":{"id":-2}
							    },
						"right":{"id":8,
									"left":{"id":1},
									"right":{"id":11}
							    }
					},
			"right":{"id":39,
						"left":{"id":33,
									"left":{"id":22},
									"right":{"id":35}
								},
						"right":{"id":55,
									"left":{"id":44},
									"right":{"id":60}
								}
					}
			}
};

const bst = new Bst();

test('bst main test', () => {
	expect(bst.main()).toEqual(expectedTree);
});


test('bst addElement test', () => {
	expect(bst.addElement(0, bst.main())).toEqual(addElementTree);
});


const arr = [22, 60, 11, 55, 8, -2, 12, -6, 35, 33, 44, 39, 1, -3];
test('bst rebalance test', () => {
	arr.sort((x,y)=>x-y);
	const inBst = bst.createBst(arr);
	expect(bst.rebalanceTree(inBst)).toEqual(afterRebalance);
});
