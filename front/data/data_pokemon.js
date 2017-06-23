var data_pokemon = new Map();
data_pokemon.set('bulbasaur',		{'code': 'bulbasaur',	 	'number':  1,	'stigmata': 90,	'attack':118,	'defense':118,	'maxcp': 981,	'types':['grass', 'poison',		],	});
data_pokemon.set('ivysaur', 		{'code': 'ivysaur', 	 	'number':  2,	'stigmata':120,	'attack':151,	'defense':151,	'maxcp':1552,	'types':['grass', 'poison',		],	});
data_pokemon.set('venusaur',		{'code': 'venusaur',	 	'number':  3,	'stigmata':160,	'attack':198,	'defense':198,	'maxcp':2568,	'types':['grass', 'poison',		],	});
data_pokemon.set('charmander',		{'code': 'charmander',	 	'number':  4,	'stigmata': 78,	'attack':116,	'defense': 96,	'maxcp': 831,	'types':['fire',				],	});
data_pokemon.set('charmeleon',		{'code': 'charmeleon',	 	'number':  5,	'stigmata':116,	'attack':158,	'defense':129,	'maxcp':1484,	'types':['fire',				],	});
data_pokemon.set('charizard',		{'code': 'charizard',	 	'number':  6,	'stigmata':156,	'attack':223,	'defense':176,	'maxcp':2686,	'types':['fire', 'flying',		],	});
data_pokemon.set('squirtle',		{'code': 'squirtle',	 	'number':  7,	'stigmata': 88,	'attack': 94,	'defense':122,	'maxcp': 808,	'types':['water',				],	});
data_pokemon.set('wartortle',		{'code': 'wartortle',	 	'number':  8,	'stigmata':118,	'attack':126,	'defense':155,	'maxcp':1324,	'types':['water',				],	});
data_pokemon.set('blastoise',		{'code': 'blastoise',	 	'number':  9,	'stigmata':158,	'attack':171,	'defense':210,	'maxcp':2291,	'types':['water',				],	});
data_pokemon.set('caterpie',		{'code': 'caterpie',	 	'number': 10,	'stigmata': 90,	'attack': 55,	'defense': 62,	'maxcp': 393,	'types':['bug',					],	});
data_pokemon.set('metapod', 		{'code': 'metapod', 	 	'number': 11,	'stigmata':100,	'attack': 45,	'defense': 94,	'maxcp': 419,	'types':['bug',					],	});
data_pokemon.set('butterfree',		{'code': 'butterfree',	 	'number': 12,	'stigmata':120,	'attack':167,	'defense':151,	'maxcp':1701,	'types':['bug', 'flying',		],	});
data_pokemon.set('weedle',  		{'code': 'weedle',  	 	'number': 13,	'stigmata': 80,	'attack': 63,	'defense': 55,	'maxcp': 397,	'types':['bug', 'poison',		],	});
data_pokemon.set('kakuna',  		{'code': 'kakuna',  	 	'number': 14,	'stigmata': 90,	'attack': 46,	'defense': 86,	'maxcp': 392,	'types':['bug', 'poison',		],	});
data_pokemon.set('beedrill',		{'code': 'beedrill',	 	'number': 15,	'stigmata':130,	'attack':169,	'defense':150,	'maxcp':1777,	'types':['bug', 'poison',		],	});
data_pokemon.set('pidgey',  		{'code': 'pidgey',  	 	'number': 16,	'stigmata': 80,	'attack': 85,	'defense': 76,	'maxcp': 580,	'types':['flying', 'normal',	],	});
data_pokemon.set('pidgeotto',		{'code': 'pidgeotto',	 	'number': 17,	'stigmata':126,	'attack':117,	'defense':108,	'maxcp':1085,	'types':['flying', 'normal',	],	});
data_pokemon.set('pidgeot',  		{'code': 'pidgeot',  	 	'number': 18,	'stigmata':166,	'attack':166,	'defense':157,	'maxcp':1994,	'types':['flying', 'normal',	],	});
data_pokemon.set('rattata', 		{'code': 'rattata', 	 	'number': 19,	'stigmata': 60,	'attack':103,	'defense': 70,	'maxcp': 588,	'types':['normal',				],	});
data_pokemon.set('raticate',		{'code': 'raticate',	 	'number': 20,	'stigmata':110,	'attack':161,	'defense':144,	'maxcp':1549,	'types':['normal',				],	});
data_pokemon.set('spearow', 		{'code': 'spearow', 	 	'number': 21,	'stigmata': 80,	'attack':112,	'defense': 61,	'maxcp': 673,	'types':['flying', 'normal',	],	});
data_pokemon.set('fearow',  		{'code': 'fearow',  	 	'number': 22,	'stigmata':130,	'attack':182,	'defense':135,	'maxcp':1814,	'types':['flying', 'normal',	],	});
data_pokemon.set('ekans',   		{'code': 'ekans',   	 	'number': 23,	'stigmata': 70,	'attack':110,	'defense':102,	'maxcp': 778,	'types':['poison',				],	});
data_pokemon.set('arbok',   		{'code': 'arbok',   	 	'number': 24,	'stigmata':120,	'attack':167,	'defense':158,	'maxcp':1737,	'types':['poison',				],	});
data_pokemon.set('pikachu', 		{'code': 'pikachu', 	 	'number': 25,	'stigmata': 70,	'attack':112,	'defense':101,	'maxcp': 787,	'types':['electr',				],	});
data_pokemon.set('raichu',  		{'code': 'raichu',  	 	'number': 26,	'stigmata':120,	'attack':193,	'defense':165,	'maxcp':2025,	'types':['electr',				],	});
data_pokemon.set('sandshrew',		{'code': 'sandshrew',	 	'number': 27,	'stigmata':100,	'attack':126,	'defense':145,	'maxcp':1194,	'types':['ground',				],	});
data_pokemon.set('sandslash',		{'code': 'sandslash',		'number': 28,	'stigmata':150,	'attack':182,	'defense':202,	'maxcp':2328,	'types':['ground',				],	});
data_pokemon.set('nidoranfemale',	{'code': 'nidoranfemale',	'number': 29,	'stigmata':110,	'attack': 86,	'defense': 94,	'maxcp': 736,	'types':['poison',				],	});
data_pokemon.set('nidorina',		{'code': 'nidorina',	 	'number': 30,	'stigmata':140,	'attack':117,	'defense':126,	'maxcp':1218,	'types':['poison',				],	});
data_pokemon.set('nidoqueen',		{'code': 'nidoqueen',	 	'number': 31,	'stigmata':180,	'attack':180,	'defense':174,	'maxcp':2338,	'types':['ground', 'poison',	],	});
data_pokemon.set('nidoranmale',		{'code': 'nidoranmale',	 	'number': 32,	'stigmata': 92,	'attack':105,	'defense': 76,	'maxcp': 739,	'types':['poison',				],	});
data_pokemon.set('nidorino',		{'code': 'nidorino',	 	'number': 33,	'stigmata':122,	'attack':137,	'defense':112,	'maxcp':1252,	'types':['poison',				],	});
data_pokemon.set('nidoking',		{'code': 'nidoking',	 	'number': 34,	'stigmata':162,	'attack':204,	'defense':157,	'maxcp':2386,	'types':['ground', 'poison',	],	});
data_pokemon.set('clefairy',		{'code': 'clefairy',	 	'number': 35,	'stigmata':140,	'attack':107,	'defense':116,	'maxcp':1085,	'types':['fairy',				],	});
data_pokemon.set('clefable',		{'code': 'clefable',	 	'number': 36,	'stigmata':190,	'attack':178,	'defense':171,	'maxcp':2353,	'types':['fairy',				],	});
data_pokemon.set('vulpix',  		{'code': 'vulpix',  	 	'number': 37,	'stigmata': 76,	'attack': 96,	'defense':122,	'maxcp': 774,	'types':['fire',				],	});
data_pokemon.set('ninetales',		{'code': 'ninetales',	 	'number': 38,	'stigmata':146,	'attack':169,	'defense':204,	'maxcp':2157,	'types':['fire',				],	});
data_pokemon.set('jigglypuff',		{'code': 'jigglypuff',	 	'number': 39,	'stigmata':230,	'attack': 80,	'defense': 44,	'maxcp': 713,	'types':['fairy', 'normal',		],	});
data_pokemon.set('wigglytuff',		{'code': 'wigglytuff',	 	'number': 40,	'stigmata':280,	'attack':156,	'defense': 93,	'maxcp':1906,	'types':['fairy', 'normal',		],	});
data_pokemon.set('zubat',   		{'code': 'zubat',   	 	'number': 41,	'stigmata': 80,	'attack': 83,	'defense': 76,	'maxcp': 569,	'types':['flying', 'poison',	],	});
data_pokemon.set('golbat',  		{'code': 'golbat',  	 	'number': 42,	'stigmata':150,	'attack':161,	'defense':153,	'maxcp':1830,	'types':['flying', 'poison',	],	});
data_pokemon.set('oddish',  		{'code': 'oddish',  	 	'number': 43,	'stigmata': 90,	'attack':131,	'defense':116,	'maxcp':1069,	'types':['grass', 'poison',		],	});
data_pokemon.set('gloom',   		{'code': 'gloom',   	 	'number': 44,	'stigmata':120,	'attack':153,	'defense':139,	'maxcp':1512,	'types':['grass', 'poison',		],	});
data_pokemon.set('vileplume',		{'code': 'vileplume',	 	'number': 45,	'stigmata':150,	'attack':202,	'defense':170,	'maxcp':2367,	'types':['grass', 'poison',		],	});
data_pokemon.set('paras',   		{'code': 'paras',   	 	'number': 46,	'stigmata': 70,	'attack':121,	'defense': 99,	'maxcp': 836,	'types':['bug', 'grass',		],	});
data_pokemon.set('parasect',		{'code': 'parasect',	 	'number': 47,	'stigmata':120,	'attack':165,	'defense':146,	'maxcp':1657,	'types':['bug', 'grass',		],	});
data_pokemon.set('venonat', 		{'code': 'venonat',  	 	'number': 48,	'stigmata':120,	'attack':100,	'defense':102,	'maxcp': 902,	'types':['bug', 'poison',		],	});
data_pokemon.set('venomoth',		{'code': 'venomoth',	 	'number': 49,	'stigmata':140,	'attack':179,	'defense':150,	'maxcp':1937,	'types':['bug', 'poison',		],	});
data_pokemon.set('diglett', 		{'code': 'diglett', 	 	'number': 50,	'stigmata': 20,	'attack':109,	'defense': 88,	'maxcp': 465,	'types':['ground',				],	});
data_pokemon.set('dugtrio', 		{'code': 'dugtrio', 	 	'number': 51,	'stigmata': 70,	'attack':167,	'defense':147,	'maxcp':1333,	'types':['ground',				],	});
data_pokemon.set('meowth',  		{'code': 'meowth',  	 	'number': 52,	'stigmata': 80,	'attack': 92,	'defense': 81,	'maxcp': 638,	'types':['normal',				],	});
data_pokemon.set('persian', 		{'code': 'persian', 	 	'number': 53,	'stigmata':130,	'attack':150,	'defense':139,	'maxcp':1539,	'types':['normal',				],	});
data_pokemon.set('psyduck', 		{'code': 'psyduck', 	 	'number': 54,	'stigmata':100,	'attack':122,	'defense': 96,	'maxcp': 966,	'types':['water',				],	});
data_pokemon.set('golduck', 		{'code': 'golduck', 	 	'number': 55,	'stigmata':160,	'attack':191,	'defense':163,	'maxcp':2270,	'types':['water',				],	});
data_pokemon.set('mankey',  		{'code': 'mankey',  	 	'number': 56,	'stigmata': 80,	'attack':148,	'defense': 87,	'maxcp':1002,	'types':['fight',				],	});
data_pokemon.set('primeape',		{'code': 'primeape',	 	'number': 57,	'stigmata':130,	'attack':207,	'defense':144,	'maxcp':2105,	'types':['fight',				],	});
data_pokemon.set('growlithe',		{'code': 'growlithe',	 	'number': 58,	'stigmata':110,	'attack':136,	'defense': 96,	'maxcp':1110,	'types':['fire',				],	});
data_pokemon.set('arcanine',		{'code': 'arcanine',	 	'number': 59,	'stigmata':180,	'attack':227,	'defense':166,	'maxcp':2839,	'types':['fire',				],	});
data_pokemon.set('poliwag', 		{'code': 'poliwag', 	 	'number': 60,	'stigmata': 80,	'attack':101,	'defense': 82,	'maxcp': 695,	'types':['water',				],	});
data_pokemon.set('poliwhirl',		{'code': 'poliwhirl',	 	'number': 61,	'stigmata':130,	'attack':130,	'defense':130,	'maxcp':1313,	'types':['water',				],	});
data_pokemon.set('poliwrath',		{'code': 'poliwrath',	 	'number': 62,	'stigmata':180,	'attack':182,	'defense':187,	'maxcp':2441,	'types':['fight', 'water',		],	});
data_pokemon.set('abra',			{'code': 'abra',		 	'number': 63,	'stigmata': 50,	'attack':195,	'defense':103,	'maxcp':1148,	'types':['psycho',				],	});
data_pokemon.set('kadabra', 		{'code': 'kadabra', 	 	'number': 64,	'stigmata': 80,	'attack':232,	'defense':138,	'maxcp':1859,	'types':['psycho',				],	});
data_pokemon.set('alakazam',		{'code': 'alakazam',	 	'number': 65,	'stigmata':110,	'attack':271,	'defense':194,	'maxcp':2887,	'types':['psycho',				],	});
data_pokemon.set('machop',  		{'code': 'machop',  	 	'number': 66,	'stigmata':140,	'attack':137,	'defense': 88,	'maxcp':1199,	'types':['fight',				],	});
data_pokemon.set('machoke', 		{'code': 'machoke', 	 	'number': 67,	'stigmata':160,	'attack':177,	'defense':130,	'maxcp':1910,	'types':['fight',				],	});
data_pokemon.set('machamp', 		{'code': 'machamp', 	 	'number': 68,	'stigmata':180,	'attack':234,	'defense':162,	'maxcp':2889,	'types':['fight',				],	});
data_pokemon.set('bellsprout',		{'code': 'bellsprout',	 	'number': 69,	'stigmata':100,	'attack':139,	'defense': 64,	'maxcp': 916,	'types':['grass', 'poison',		],	});
data_pokemon.set('weepinbell',		{'code': 'weepinbell',	 	'number': 70,	'stigmata':130,	'attack':172,	'defense': 95,	'maxcp':1475,	'types':['grass', 'poison',		],	});
data_pokemon.set('victreebel',		{'code': 'victreebel',	 	'number': 71,	'stigmata':160,	'attack':207,	'defense':138,	'maxcp':2268,	'types':['grass', 'poison',		],	});
data_pokemon.set('tentacool',		{'code': 'tentacool',	 	'number': 72,	'stigmata': 80,	'attack': 97,	'defense':182,	'maxcp': 956,	'types':['poison', 'water',		],	});
data_pokemon.set('tentacruel',		{'code': 'tentacruel',	 	'number': 73,	'stigmata':160,	'attack':166,	'defense':237,	'maxcp':2374,	'types':['poison', 'water',		],	});
data_pokemon.set('geodude', 		{'code': 'geodude', 	 	'number': 74,	'stigmata': 80,	'attack':132,	'defense':163,	'maxcp':1193,	'types':['ground', 'rock',		],	});
data_pokemon.set('graveler',		{'code': 'graveler',	 	'number': 75,	'stigmata':110,	'attack':164,	'defense':196,	'maxcp':1815,	'types':['ground', 'rock',		],	});
data_pokemon.set('golem',   		{'code': 'golem',   	 	'number': 76,	'stigmata':160,	'attack':211,	'defense':229,	'maxcp':2916,	'types':['ground', 'rock',		],	});
data_pokemon.set('ponyta',  		{'code': 'ponyta',  	 	'number': 77,	'stigmata':100,	'attack':170,	'defense':132,	'maxcp':1502,	'types':['fire',				],	});
data_pokemon.set('rapidash',		{'code': 'rapidash',	 	'number': 78,	'stigmata':130,	'attack':207,	'defense':167,	'maxcp':2252,	'types':['fire',				],	});
data_pokemon.set('slowpoke',		{'code': 'slowpoke',	 	'number': 79,	'stigmata':180,	'attack':109,	'defense':109,	'maxcp':1204,	'types':['psycho', 'water',		],	});
data_pokemon.set('slowbro', 		{'code': 'slowbro', 	 	'number': 80,	'stigmata':190,	'attack':177,	'defense':194,	'maxcp':2482,	'types':['psycho', 'water',		],	});
data_pokemon.set('magnemite',		{'code': 'magnemite',	 	'number': 81,	'stigmata': 50,	'attack':165,	'defense':128,	'maxcp':1083,	'types':['electr', 'steel',		],	});
data_pokemon.set('magneton',		{'code': 'magneton',	 	'number': 82,	'stigmata':100,	'attack':223,	'defense':182,	'maxcp':2237,	'types':['electr', 'steel',		],	});
data_pokemon.set('farfetchd',		{'code': 'farfetchd',	 	'number': 83,	'stigmata':104,	'attack':124,	'defense':118,	'maxcp':1092,	'types':['flying', 'normal',	],	});
data_pokemon.set('doduo',   		{'code': 'doduo',   	 	'number': 84,	'stigmata': 70,	'attack':158,	'defense': 88,	'maxcp':1011,	'types':['flying', 'normal',	],	});
data_pokemon.set('dodrio',  		{'code': 'dodrio',  	 	'number': 85,	'stigmata':120,	'attack':218,	'defense':145,	'maxcp':2138,	'types':['flying', 'normal',	],	});
data_pokemon.set('seel',			{'code': 'seel',		 	'number': 86,	'stigmata':130,	'attack': 85,	'defense':128,	'maxcp': 899,	'types':['water',				],	});
data_pokemon.set('dewgong', 		{'code': 'dewgong', 	 	'number': 87,	'stigmata':180,	'attack':139,	'defense':184,	'maxcp':1894,	'types':['water',				],	});
data_pokemon.set('grimer',  		{'code': 'grimer',  	 	'number': 88,	'stigmata':160,	'attack':135,	'defense': 90,	'maxcp':1269,	'types':['poison',				],	});
data_pokemon.set('muk',	 			{'code': 'muk',	 	 		'number': 89,	'stigmata':210,	'attack':190,	'defense':184,	'maxcp':2709,	'types':['poison',				],	});
data_pokemon.set('shellder',		{'code': 'shellder',	 	'number': 90,	'stigmata': 60,	'attack':116,	'defense':168,	'maxcp': 958,	'types':['water',				],	});
data_pokemon.set('cloyster',		{'code': 'cloyster',	 	'number': 91,	'stigmata':100,	'attack':186,	'defense':323,	'maxcp':2475,	'types':['ice', 'water',		],	});
data_pokemon.set('gastly',  		{'code': 'gastly',  	 	'number': 92,	'stigmata': 60,	'attack':186,	'defense': 70,	'maxcp':1002,	'types':['ghost', 'poison',		],	});
data_pokemon.set('haunter', 		{'code': 'haunter', 	 	'number': 93,	'stigmata': 90,	'attack':223,	'defense':112,	'maxcp':1716,	'types':['ghost', 'poison',		],	});
data_pokemon.set('gengar',  		{'code': 'gengar',  	 	'number': 94,	'stigmata':120,	'attack':261,	'defense':156,	'maxcp':2619,	'types':['ghost', 'poison',		],	});
data_pokemon.set('onix',			{'code': 'onix',		 	'number': 95,	'stigmata': 70,	'attack': 85,	'defense':288,	'maxcp':1002,	'types':['ground', 'rock',		],	});
data_pokemon.set('drowzee', 		{'code': 'drowzee', 	 	'number': 96,	'stigmata':120,	'attack': 89,	'defense':158,	'maxcp': 992,	'types':['psycho',				],	});
data_pokemon.set('hypno',   		{'code': 'hypno',   	 	'number': 97,	'stigmata':170,	'attack':144,	'defense':215,	'maxcp':2048,	'types':['psycho',				],	});
data_pokemon.set('krabby',  		{'code': 'krabby',  	 	'number': 98,	'stigmata': 60,	'attack':181,	'defense':156,	'maxcp':1386,	'types':['water',				],	});
data_pokemon.set('kingler', 		{'code': 'kingler', 	 	'number': 99,	'stigmata':110,	'attack':240,	'defense':214,	'maxcp':2694,	'types':['water',				],	});
data_pokemon.set('voltorb', 		{'code': 'voltorb', 	 	'number':100,	'stigmata': 80,	'attack':109,	'defense':114,	'maxcp': 857,	'types':['electr',				],	});
data_pokemon.set('electrode',		{'code': 'electrode',	 	'number':101,	'stigmata':120,	'attack':173,	'defense':179,	'maxcp':1900,	'types':['electr',				],	});
data_pokemon.set('exeggcute',		{'code': 'exeggcute',	 	'number':102,	'stigmata':120,	'attack':107,	'defense':140,	'maxcp':1102,	'types':['grass', 'psycho',		],	});
data_pokemon.set('exeggutor',		{'code': 'exeggutor',	 	'number':103,	'stigmata':190,	'attack':233,	'defense':158,	'maxcp':2916,	'types':['grass', 'psycho',		],	});
data_pokemon.set('cubone',  		{'code': 'cubone',  	 	'number':104,	'stigmata':100,	'attack': 90,	'defense':165,	'maxcp': 943,	'types':['ground',				],	});
data_pokemon.set('marowak', 		{'code': 'marowak', 	 	'number':105,	'stigmata':120,	'attack':144,	'defense':200,	'maxcp':1691,	'types':['ground',				],	});
data_pokemon.set('hitmonlee',		{'code': 'hitmonlee',	 	'number':106,	'stigmata':100,	'attack':224,	'defense':211,	'maxcp':2406,	'types':['fight',				],	});
data_pokemon.set('hitmonchan',		{'code': 'hitmonchan',	 	'number':107,	'stigmata':100,	'attack':193,	'defense':212,	'maxcp':2098,	'types':['fight',				],	});
data_pokemon.set('lickitung',		{'code': 'lickitung',	 	'number':108,	'stigmata':180,	'attack':108,	'defense':137,	'maxcp':1322,	'types':['normal',				],	});
data_pokemon.set('koffing', 		{'code': 'koffing',  	 	'number':109,	'stigmata': 80,	'attack':119,	'defense':164,	'maxcp':1091,	'types':['poison',				],	});
data_pokemon.set('weezing', 		{'code': 'weezing',		 	'number':110,	'stigmata':130,	'attack':174,	'defense':221,	'maxcp':2183,	'types':['poison',				],	});
data_pokemon.set('rhyhorn', 		{'code': 'rhyhorn', 	 	'number':111,	'stigmata':160,	'attack':140,	'defense':157,	'maxcp':1679,	'types':['ground', 'rock',		],	});
data_pokemon.set('rhydon',  		{'code': 'rhydon',  	 	'number':112,	'stigmata':210,	'attack':222,	'defense':206,	'maxcp':3300,	'types':['ground', 'rock',		],	});
data_pokemon.set('chansey', 		{'code': 'chansey', 	 	'number':113,	'stigmata':500,	'attack': 60,	'defense':176,	'maxcp':1469,	'types':['normal',				],	});
data_pokemon.set('tangela', 		{'code': 'tangela', 	 	'number':114,	'stigmata':130,	'attack':183,	'defense':205,	'maxcp':2208,	'types':['grass',				],	});
data_pokemon.set('kangaskhan',		{'code': 'kangaskhan',	 	'number':115,	'stigmata':210,	'attack':181,	'defense':165,	'maxcp':2463,	'types':['normal',				],	});
data_pokemon.set('horsea',  		{'code': 'horsea',  	 	'number':116,	'stigmata': 60,	'attack':129,	'defense':125,	'maxcp': 921,	'types':['water',				],	});
data_pokemon.set('seadra',  		{'code': 'seadra',  	 	'number':117,	'stigmata':110,	'attack':187,	'defense':182,	'maxcp':1979,	'types':['water',				],	});
data_pokemon.set('goldeen', 		{'code': 'goldeen',  	 	'number':118,	'stigmata': 90,	'attack':123,	'defense':115,	'maxcp':1006,	'types':['water',				],	});
data_pokemon.set('seaking', 		{'code': 'seaking', 	 	'number':119,	'stigmata':160,	'attack':175,	'defense':154,	'maxcp':2040,	'types':['water',				],	});
data_pokemon.set('staryu',  		{'code': 'staryu',  	 	'number':120,	'stigmata': 60,	'attack':137,	'defense':112,	'maxcp': 926,	'types':['water',				],	});
data_pokemon.set('starmie', 		{'code': 'starmie', 	 	'number':121,	'stigmata':120,	'attack':210,	'defense':184,	'maxcp':2303,	'types':['psycho', 'water',		],	});
data_pokemon.set('mrmime',  		{'code': 'mrmime',  	 	'number':122,	'stigmata': 80,	'attack':192,	'defense':233,	'maxcp':1984,	'types':['fairy', 'psycho',		],	});
data_pokemon.set('scyther', 		{'code': 'scyther', 	 	'number':123,	'stigmata':140,	'attack':218,	'defense':170,	'maxcp':2464,	'types':['bug', 'flying',		],	});
data_pokemon.set('jynx',			{'code': 'jynx',		 	'number':124,	'stigmata':130,	'attack':223,	'defense':182,	'maxcp':2512,	'types':['ice', 'psycho',		],	});
data_pokemon.set('electabuzz',		{'code': 'electabuzz',	 	'number':125,	'stigmata':130,	'attack':198,	'defense':173,	'maxcp':2196,	'types':['electr',				],	});
data_pokemon.set('magmar',  		{'code': 'magmar',  	 	'number':126,	'stigmata':130,	'attack':206,	'defense':169,	'maxcp':2254,	'types':['fire',				],	});
data_pokemon.set('pinsir',  		{'code': 'pinsir',  	 	'number':127,	'stigmata':130,	'attack':238,	'defense':197,	'maxcp':2770,	'types':['bug',					],	});
data_pokemon.set('tauros',  		{'code': 'tauros',  	 	'number':128,	'stigmata':150,	'attack':198,	'defense':197,	'maxcp':2488,	'types':['normal',				],	});
data_pokemon.set('magikarp',		{'code': 'magikarp',	 	'number':129,	'stigmata': 40,	'attack': 29,	'defense':102,	'maxcp': 220,	'types':['water',				],	});
data_pokemon.set('gyarados',		{'code': 'gyarados',	 	'number':130,	'stigmata':190,	'attack':237,	'defense':197,	'maxcp':3281,	'types':['flying', 'water',		],	});
data_pokemon.set('lapras',  		{'code': 'lapras',  	 	'number':131,	'stigmata':260,	'attack':165,	'defense':180,	'maxcp':2603,	'types':['ice', 'water',		],	});
data_pokemon.set('ditto',   		{'code': 'ditto',   	 	'number':132,	'stigmata': 96,	'attack': 91,	'defense': 91,	'maxcp': 718,	'types':['normal',				],	});
data_pokemon.set('eevee',   		{'code': 'eevee',   	 	'number':133,	'stigmata':110,	'attack':104,	'defense':121,	'maxcp': 969,	'types':['normal',				],	});
data_pokemon.set('vaporeon',		{'code': 'vaporeon',	 	'number':134,	'stigmata':260,	'attack':205,	'defense':177,	'maxcp':3157,	'types':['water',				],	});
data_pokemon.set('jolteon', 		{'code': 'jolteon', 	 	'number':135,	'stigmata':130,	'attack':232,	'defense':201,	'maxcp':2730,	'types':['electr',				],	});
data_pokemon.set('flareon', 		{'code': 'flareon', 	 	'number':136,	'stigmata':130,	'attack':246,	'defense':204,	'maxcp':2904,	'types':['fire',				],	});
data_pokemon.set('porygon', 		{'code': 'porygon', 	 	'number':137,	'stigmata':130,	'attack':153,	'defense':139,	'maxcp':1567,	'types':['normal',				],	});
data_pokemon.set('omanyte', 		{'code': 'omanyte', 	 	'number':138,	'stigmata': 70,	'attack':155,	'defense':174,	'maxcp':1345,	'types':['rock', 'water',		],	});
data_pokemon.set('omastar', 		{'code': 'omastar', 	 	'number':139,	'stigmata':140,	'attack':207,	'defense':227,	'maxcp':2685,	'types':['rock', 'water',		],	});
data_pokemon.set('kabuto',  		{'code': 'kabuto',  	 	'number':140,	'stigmata': 60,	'attack':148,	'defense':162,	'maxcp':1172,	'types':['rock', 'water',		],	});
data_pokemon.set('kabutops',		{'code': 'kabutops',	 	'number':141,	'stigmata':120,	'attack':220,	'defense':203,	'maxcp':2517,	'types':['rock', 'water',		],	});
data_pokemon.set('aerodactyl',		{'code': 'aerodactyl',	 	'number':142,	'stigmata':160,	'attack':221,	'defense':164,	'maxcp':2608,	'types':['flying', 'rock',		],	});
data_pokemon.set('snorlax', 		{'code': 'snorlax',  	 	'number':143,	'stigmata':320,	'attack':190,	'defense':190,	'maxcp':3355,	'types':['normal',				],	});
data_pokemon.set('dratini', 		{'code': 'dratini', 	 	'number':147,	'stigmata': 82,	'attack':119,	'defense': 94,	'maxcp': 860,	'types':['dragon',				],	});
data_pokemon.set('dragonair',		{'code': 'dragonair',	 	'number':148,	'stigmata':122,	'attack':163,	'defense':138,	'maxcp':1609,	'types':['dragon',				],	});
data_pokemon.set('dragonite',		{'code': 'dragonite',	 	'number':149,	'stigmata':182,	'attack':263,	'defense':201,	'maxcp':3581,	'types':['dragon', 'flying',	],	});
data_pokemon.set('chikorita',		{'code': 'chikorita',	 	'number':152,	'stigmata': 90,	'attack': 92,	'defense':122,	'maxcp': 801,	'types':['grass',				],	});
data_pokemon.set('bayleef', 		{'code': 'bayleef', 	 	'number':153,	'stigmata':120,	'attack':122,	'defense':155,	'maxcp':3355,	'types':['grass',				],	});
data_pokemon.set('meganium',		{'code': 'meganium',	 	'number':154,	'stigmata':160,	'attack':168,	'defense':202,	'maxcp':2227,	'types':['grass',				],	});
data_pokemon.set('cyndaquil',		{'code': 'cyndaquil',	 	'number':155,	'stigmata': 78,	'attack':116,	'defense': 96,	'maxcp': 831,	'types':['fire',				],	});
data_pokemon.set('quilava', 		{'code': 'quilava', 	 	'number':156,	'stigmata':116,	'attack':158,	'defense':129,	'maxcp':1484,	'types':['fire',				],	});
data_pokemon.set('typhlosion',		{'code': 'typhlosion',	 	'number':157,	'stigmata':156,	'attack':223,	'defense':176,	'maxcp':2686,	'types':['fire',				],	});
data_pokemon.set('totodile',		{'code': 'totodile',	 	'number':158,	'stigmata':100,	'attack':117,	'defense':116,	'maxcp':1011,	'types':['water',				],	});
data_pokemon.set('croconaw',		{'code': 'croconaw',	 	'number':159,	'stigmata':130,	'attack':150,	'defense':151,	'maxcp':1598,	'types':['water',				],	});
data_pokemon.set('feraligatr',		{'code': 'feraligatr',	 	'number':160,	'stigmata':170,	'attack':205,	'defense':197,	'maxcp':2721,	'types':['water',				],	});
data_pokemon.set('sentret', 		{'code': 'sentret', 	 	'number':161,	'stigmata': 70,	'attack': 79,	'defense': 77,	'maxcp': 519,	'types':['normal',				],	});
data_pokemon.set('furret',  		{'code': 'furret',  	 	'number':162,	'stigmata':170,	'attack':148,	'defense':130,	'maxcp':1667,	'types':['normal',				],	});
data_pokemon.set('hoothoot',		{'code': 'hoothoot',	 	'number':163,	'stigmata':120,	'attack': 67,	'defense':101,	'maxcp': 640,	'types':['flying', 'normal',	],	});
data_pokemon.set('noctowl', 		{'code': 'noctowl', 	 	'number':164,	'stigmata':200,	'attack':145,	'defense':179,	'maxcp':2040,	'types':['flying', 'normal',	],	});
data_pokemon.set('ledyba',  		{'code': 'ledyba',  	 	'number':165,	'stigmata': 80,	'attack': 72,	'defense':142,	'maxcp': 663,	'types':['bug', 'flying',		],	});
data_pokemon.set('ledian',  		{'code': 'ledian',  	 	'number':166,	'stigmata':110,	'attack':107,	'defense':209,	'maxcp':1275,	'types':['bug', 'flying',		],	});
data_pokemon.set('spinarak',		{'code': 'spinarak',	 	'number':167,	'stigmata': 80,	'attack':105,	'defense': 73,	'maxcp': 685,	'types':['bug', 'poison',		],	});
data_pokemon.set('ariados', 		{'code': 'ariados',  	 	'number':168,	'stigmata':140,	'attack':161,	'defense':128,	'maxcp':1636,	'types':['bug', 'poison',		],	});
data_pokemon.set('crobat',  		{'code': 'crobat',  	 	'number':169,	'stigmata':170,	'attack':194,	'defense':178,	'maxcp':2466,	'types':['flying', 'poison',	],	});
data_pokemon.set('chinchou',		{'code': 'chinchou',	 	'number':170,	'stigmata':150,	'attack':106,	'defense':106,	'maxcp':1067,	'types':['electr', 'water',		],	});
data_pokemon.set('lanturn', 		{'code': 'lanturn', 	 	'number':171,	'stigmata':250,	'attack':146,	'defense':146,	'maxcp':2077,	'types':['electr', 'water',		],	});
data_pokemon.set('pichu',   		{'code': 'pichu',   	 	'number':172,	'stigmata': 40,	'attack': 77,	'defense': 63,	'maxcp': 376,	'types':['electr',				],	});
data_pokemon.set('cleffa',  		{'code': 'cleffa',  	 	'number':173,	'stigmata':100,	'attack': 75,	'defense': 91,	'maxcp': 620,	'types':['fairy',				],	});
data_pokemon.set('igglybuff',		{'code': 'igglybuff',	 	'number':174,	'stigmata':180,	'attack': 69,	'defense': 34,	'maxcp': 512,	'types':['fairy', 'normal',		],	});
data_pokemon.set('togepi',  		{'code': 'togepi',  	 	'number':175,	'stigmata': 70,	'attack': 67,	'defense':116,	'maxcp': 540,	'types':['fairy',				],	});
data_pokemon.set('togetic', 		{'code': 'togetic', 	 	'number':176,	'stigmata':110,	'attack':139,	'defense':191,	'maxcp':1543,	'types':['fairy', 'flying',		],	});
data_pokemon.set('natu',			{'code': 'natu',		 	'number':177,	'stigmata': 80,	'attack':134,	'defense': 89,	'maxcp': 925,	'types':['flying', 'psycho',	],	});
data_pokemon.set('xatu',			{'code': 'xatu',		 	'number':178,	'stigmata':130,	'attack':192,	'defense':146,	'maxcp':1975,	'types':['flying', 'psycho',	],	});
data_pokemon.set('mareep',  		{'code': 'mareep',  	 	'number':179,	'stigmata':110,	'attack':114,	'defense': 82,	'maxcp': 887,	'types':['electr',				],	});
data_pokemon.set('flaaffy', 		{'code': 'flaaffy', 	 	'number':180,	'stigmata':140,	'attack':145,	'defense':112,	'maxcp':1402,	'types':['electr',				],	});
data_pokemon.set('ampharos',		{'code': 'ampharos',	 	'number':181,	'stigmata':180,	'attack':211,	'defense':172,	'maxcp':2695,	'types':['electr',				],	});
data_pokemon.set('bellossom',		{'code': 'bellossom',	 	'number':182,	'stigmata':150,	'attack':169,	'defense':189,	'maxcp':2108,	'types':['grass',				],	});
data_pokemon.set('marill',  		{'code': 'marill',  	 	'number':183,	'stigmata':140,	'attack': 37,	'defense': 93,	'maxcp': 420,	'types':['fairy', 'water',		],	});
data_pokemon.set('azumarill',		{'code': 'azumarill',	 	'number':184,	'stigmata':200,	'attack':112,	'defense':152,	'maxcp':1503,	'types':['fairy', 'water',		],	});
data_pokemon.set('sudowoodo',		{'code': 'sudowoodo',	 	'number':185,	'stigmata':140,	'attack':167,	'defense':198,	'maxcp':2065,	'types':['rock',				],	});
data_pokemon.set('politoed',		{'code': 'politoed',	 	'number':186,	'stigmata':180,	'attack':174,	'defense':192,	'maxcp':2371,	'types':['water',				],	});
data_pokemon.set('hoppip',  		{'code': 'hoppip',  	 	'number':187,	'stigmata': 70,	'attack': 67,	'defense':101,	'maxcp': 508,	'types':['flying', 'grass',		],	});
data_pokemon.set('skiploom',		{'code': 'skiploom',	 	'number':188,	'stigmata':110,	'attack': 91,	'defense':127,	'maxcp': 882,	'types':['flying', 'grass',		],	});
data_pokemon.set('jumpluff',		{'code': 'jumpluff',	 	'number':189,	'stigmata':150,	'attack':118,	'defense':197,	'maxcp':1553,	'types':['flying', 'grass',		],	});
data_pokemon.set('aipom',   		{'code': 'aipom',   	 	'number':190,	'stigmata':110,	'attack':136,	'defense':112,	'maxcp':1188,	'types':['normal',				],	});
data_pokemon.set('sunkern', 		{'code': 'sunkern', 	 	'number':191,	'stigmata': 60,	'attack': 55,	'defense': 55,	'maxcp': 316,	'types':['grass',				],	});
data_pokemon.set('sunflora',		{'code': 'sunflora',	 	'number':192,	'stigmata':150,	'attack':185,	'defense':148,	'maxcp':2048,	'types':['grass',				],	});
data_pokemon.set('yanma',   		{'code': 'yanma',   	 	'number':193,	'stigmata':130,	'attack':154,	'defense': 94,	'maxcp':1326,	'types':['bug', 'flying',		],	});
data_pokemon.set('wooper',  		{'code': 'wooper',  	 	'number':194,	'stigmata':110,	'attack': 75,	'defense': 75,	'maxcp': 596,	'types':['ground', 'water',		],	});
data_pokemon.set('quagsire',		{'code': 'quagsire',	 	'number':195,	'stigmata':190,	'attack':152,	'defense':152,	'maxcp':1929,	'types':['ground', 'water',		],	});
data_pokemon.set('espeon',  		{'code': 'espeon',  	 	'number':196,	'stigmata':130,	'attack':261,	'defense':194,	'maxcp':3000,	'types':['psycho',				],	});
data_pokemon.set('umbreon', 		{'code': 'umbreon', 	 	'number':197,	'stigmata':190,	'attack':126,	'defense':250,	'maxcp':2052,	'types':['dark',				],	});
data_pokemon.set('murkrow', 		{'code': 'murkrow', 	 	'number':198,	'stigmata':120,	'attack':175,	'defense': 87,	'maxcp':1392,	'types':['dark', 'flying',		],	});
data_pokemon.set('slowking',		{'code': 'slowking',	 	'number':199,	'stigmata':190,	'attack':177,	'defense':194,	'maxcp':2482,	'types':['psycho', 'water',		],	});
data_pokemon.set('misdreavus',		{'code': 'misdreavus',	 	'number':200,	'stigmata':120,	'attack':167,	'defense':167,	'maxcp':1781,	'types':['ghost',				],	});
data_pokemon.set('unown',   		{'code': 'unown',   	 	'number':201,	'stigmata': 96,	'attack':136,	'defense': 91,	'maxcp':1022,	'types':['psycho',				],	});
data_pokemon.set('wobbuffet',		{'code': 'wobbuffet',	 	'number':202,	'stigmata':380,	'attack': 60,	'defense':106,	'maxcp':1024,	'types':['psycho',				],	});
data_pokemon.set('girafarig',		{'code': 'girafarig',	 	'number':203,	'stigmata':140,	'attack':182,	'defense':133,	'maxcp':1863,	'types':['normal', 'psycho',	],	});
data_pokemon.set('pineco',  		{'code': 'pineco',  	 	'number':204,	'stigmata':100,	'attack':108,	'defense':146,	'maxcp':1045,	'types':['bug',					],	});
data_pokemon.set('forretress',		{'code': 'forretress',	 	'number':205,	'stigmata':150,	'attack':161,	'defense':242,	'maxcp':2263,	'types':['bug', 'steel',		],	});
data_pokemon.set('dunsparce',		{'code': 'dunsparce',	 	'number':206,	'stigmata':200,	'attack':131,	'defense':131,	'maxcp':1615,	'types':['normal',				],	});
data_pokemon.set('gligar',  		{'code': 'gligar',  	 	'number':207,	'stigmata':130,	'attack':143,	'defense':204,	'maxcp':1758,	'types':['flying', 'ground',	],	});
data_pokemon.set('steelix', 		{'code': 'steelix',  	 	'number':208,	'stigmata':150,	'attack':148,	'defense':333,	'maxcp':2439,	'types':['ground', 'steel',		],	});
data_pokemon.set('snubbull',		{'code': 'snubbull',	 	'number':209,	'stigmata':120,	'attack':137,	'defense': 89,	'maxcp':1124,	'types':['fairy',				],	});
data_pokemon.set('granbull',		{'code': 'granbull',	 	'number':210,	'stigmata':180,	'attack':212,	'defense':137,	'maxcp':2440,	'types':['fairy',				],	});
data_pokemon.set('qwilfish',		{'code': 'qwilfish',	 	'number':211,	'stigmata':130,	'attack':184,	'defense':148,	'maxcp':1910,	'types':['poison', 'water',		],	});
data_pokemon.set('scizor',  		{'code': 'scizor',  	 	'number':212,	'stigmata':140,	'attack':236,	'defense':191,	'maxcp':2801,	'types':['bug', 'steel',		],	});
data_pokemon.set('shuckle', 		{'code': 'shuckle', 	 	'number':213,	'stigmata': 40,	'attack': 17,	'defense':396,	'maxcp': 300,	'types':['bug', 'rock',			],	});
data_pokemon.set('heracross',		{'code': 'heracross',	 	'number':214,	'stigmata':160,	'attack':234,	'defense':189,	'maxcp':2938,	'types':['bug', 'fight',		],	});
data_pokemon.set('sneasel',  		{'code': 'sneasel', 	 	'number':215,	'stigmata':110,	'attack':189,	'defense':157,	'maxcp':1868,	'types':['dark', 'ice',			],	});
data_pokemon.set('teddiursa',		{'code': 'teddiursa',	 	'number':216,	'stigmata':120,	'attack':142,	'defense': 93,	'maxcp':1184,	'types':['normal',				],	});
data_pokemon.set('ursaring',		{'code': 'ursaring',	 	'number':217,	'stigmata':180,	'attack':236,	'defense':144,	'maxcp':2760,	'types':['normal',				],	});
data_pokemon.set('slugma',  		{'code': 'slugma',  	 	'number':218,	'stigmata': 80,	'attack':118,	'defense': 71,	'maxcp': 750,	'types':['fire',				],	});
data_pokemon.set('magcargo',		{'code': 'magcargo',	 	'number':219,	'stigmata':100,	'attack':139,	'defense':209,	'maxcp':1543,	'types':['fire', 'rock',		],	});
data_pokemon.set('swinub',  		{'code': 'swinub',  	 	'number':220,	'stigmata':100,	'attack': 90,	'defense': 74,	'maxcp': 663,	'types':['ground', 'ice',		],	});
data_pokemon.set('piloswine',		{'code': 'piloswine',	 	'number':221,	'stigmata':200,	'attack':181,	'defense':147,	'maxcp':2284,	'types':['ground', 'ice',		],	});
data_pokemon.set('corsola', 		{'code': 'corsola',  	 	'number':222,	'stigmata':110,	'attack':118,	'defense':156,	'maxcp':1214,	'types':['rock', 'water',		],	});
data_pokemon.set('remoraid',		{'code': 'remoraid',	 	'number':223,	'stigmata': 70,	'attack':127,	'defense': 69,	'maxcp': 749,	'types':['water',				],	});
data_pokemon.set('octillery',		{'code': 'octillery',	 	'number':224,	'stigmata':150,	'attack':197,	'defense':141,	'maxcp':2124,	'types':['water',				],	});
data_pokemon.set('mantine', 		{'code': 'mantine',  	 	'number':226,	'stigmata':130,	'attack':148,	'defense':260,	'maxcp':2032,	'types':['flying',				],	});
data_pokemon.set('skarmory',		{'code': 'skarmory',	 	'number':227,	'stigmata':130,	'attack':148,	'defense':260,	'maxcp':2032,	'types':['flying', 'steel',		],	});
data_pokemon.set('houndour',		{'code': 'houndour',	 	'number':228,	'stigmata': 90,	'attack':152,	'defense': 93,	'maxcp':1110,	'types':['dark', 'fire',		],	});
data_pokemon.set('houndoom',		{'code': 'houndoom',	 	'number':229,	'stigmata':150,	'attack':224,	'defense':159,	'maxcp':2529,	'types':['dark', 'fire',		],	});
data_pokemon.set('kingdra', 		{'code': 'kingdra', 	 	'number':230,	'stigmata':150,	'attack':194,	'defense':194,	'maxcp':2424,	'types':['dragon', 'water',		],	});
data_pokemon.set('phanpy',  		{'code': 'phanpy',  	 	'number':231,	'stigmata':180,	'attack':107,	'defense':107,	'maxcp':1175,	'types':['ground',				],	});
data_pokemon.set('donphan', 		{'code': 'donphan', 	 	'number':232,	'stigmata':180,	'attack':214,	'defense':214,	'maxcp':3022,	'types':['ground',				],	});
data_pokemon.set('porygon2',		{'code': 'porygon2',	 	'number':233,	'stigmata':170,	'attack':198,	'defense':183,	'maxcp':2546,	'types':['normal',				],	});
data_pokemon.set('stantler',		{'code': 'stantler',	 	'number':234,	'stigmata':146,	'attack':192,	'defense':132,	'maxcp':1988,	'types':['normal',				],	});
data_pokemon.set('tyrogue',  		{'code': 'tyrogue', 	 	'number':236,	'stigmata': 70,	'attack': 64,	'defense': 64,	'maxcp': 404,	'types':['fight',				],	});
data_pokemon.set('hitmontop',		{'code': 'hitmontop',	 	'number':237,	'stigmata':100,	'attack':173,	'defense':214,	'maxcp':1905,	'types':['fight',				],	});
data_pokemon.set('smoochum',		{'code': 'smoochum',	 	'number':238,	'stigmata': 90,	'attack':153,	'defense':116,	'maxcp':1230,	'types':['ice', 'psycho',		],	});
data_pokemon.set('elekid',  		{'code': 'elekid',  	 	'number':239,	'stigmata': 90,	'attack':135,	'defense':110,	'maxcp':1073,	'types':['electr',				],	});
data_pokemon.set('magby',   		{'code': 'magby',   	 	'number':240,	'stigmata': 90,	'attack':151,	'defense':108,	'maxcp':1178,	'types':['fire',				],	});
data_pokemon.set('miltank', 		{'code': 'miltank', 	 	'number':241,	'stigmata':190,	'attack':157,	'defense':211,	'maxcp':2312,	'types':['normal',				],	});
data_pokemon.set('blissey', 		{'code': 'blissey',  	 	'number':242,	'stigmata':510,	'attack':129,	'defense':229,	'maxcp':3219,	'types':['normal',				],	});
data_pokemon.set('larvitar',		{'code': 'larvitar',	 	'number':246,	'stigmata':100,	'attack':115,	'defense': 93,	'maxcp': 904,	'types':['ground', 'rock',		],	});
data_pokemon.set('pupitar', 		{'code': 'pupitar', 	 	'number':247,	'stigmata':140,	'attack':155,	'defense':133,	'maxcp':1608,	'types':['ground', 'rock',		],	});
data_pokemon.set('tyranitar',		{'code': 'tyranitar',	 	'number':248,	'stigmata':200,	'attack':251,	'defense':212,	'maxcp':3670,	'types':['dark', 'rock',		],	});