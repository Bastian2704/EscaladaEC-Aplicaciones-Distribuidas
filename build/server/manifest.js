const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.DZVWcJGO.js",app:"_app/immutable/entry/app.A2HAOgHi.js",imports:["_app/immutable/entry/start.DZVWcJGO.js","_app/immutable/chunks/Cg8VCEQy.js","_app/immutable/chunks/Ckx13BoS.js","_app/immutable/chunks/DaLxRb8P.js","_app/immutable/entry/app.A2HAOgHi.js","_app/immutable/chunks/Ckx13BoS.js","_app/immutable/chunks/DjrrgQ94.js","_app/immutable/chunks/R8eUw0rf.js","_app/immutable/chunks/DaLxRb8P.js","_app/immutable/chunks/C6UGZhB6.js","_app/immutable/chunks/DZFDuCMu.js","_app/immutable/chunks/B6sxBtLM.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-CodrzZog.js')),
			__memo(() => import('./chunks/1-pkpmWXUx.js')),
			__memo(() => import('./chunks/2-BG2CEs-0.js')),
			__memo(() => import('./chunks/3-CDGheL2-.js')),
			__memo(() => import('./chunks/4-COqEi8XX.js')),
			__memo(() => import('./chunks/5-BgCvAtAr.js')),
			__memo(() => import('./chunks/6-CZeDC0LM.js')),
			__memo(() => import('./chunks/7-CduRj3PO.js')),
			__memo(() => import('./chunks/8-Br_yeccW.js')),
			__memo(() => import('./chunks/9-CZ4KVk5O.js')),
			__memo(() => import('./chunks/10-BzMbMOze.js')),
			__memo(() => import('./chunks/11-KvnJiWuR.js')),
			__memo(() => import('./chunks/12-F39CD5Q3.js')),
			__memo(() => import('./chunks/13-Bw8k6qWD.js')),
			__memo(() => import('./chunks/14-7pLLozbZ.js')),
			__memo(() => import('./chunks/15-Fke5wCxX.js')),
			__memo(() => import('./chunks/16-DB5rzror.js')),
			__memo(() => import('./chunks/17-Cl1ICQyt.js')),
			__memo(() => import('./chunks/18-BVm2286N.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(app)/area",
				pattern: /^\/area\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(app)/area/[areaId]/edit",
				pattern: /^\/area\/([^/]+?)\/edit\/?$/,
				params: [{"name":"areaId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(app)/area/[areaId]/sector",
				pattern: /^\/area\/([^/]+?)\/sector\/?$/,
				params: [{"name":"areaId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(app)/area/[areaId]/sector/[sectorId]/climb",
				pattern: /^\/area\/([^/]+?)\/sector\/([^/]+?)\/climb\/?$/,
				params: [{"name":"areaId","optional":false,"rest":false,"chained":false},{"name":"sectorId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(app)/area/[areaId]/sector/[sectorId]/climb/[climbId]/edit",
				pattern: /^\/area\/([^/]+?)\/sector\/([^/]+?)\/climb\/([^/]+?)\/edit\/?$/,
				params: [{"name":"areaId","optional":false,"rest":false,"chained":false},{"name":"sectorId","optional":false,"rest":false,"chained":false},{"name":"climbId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(app)/area/[areaId]/sector/[sectorId]/climb/[climbId]/grade",
				pattern: /^\/area\/([^/]+?)\/sector\/([^/]+?)\/climb\/([^/]+?)\/grade\/?$/,
				params: [{"name":"areaId","optional":false,"rest":false,"chained":false},{"name":"sectorId","optional":false,"rest":false,"chained":false},{"name":"climbId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(app)/area/[areaId]/sector/[sectorId]/climb/[climbId]/grade/[gradeId]/edit",
				pattern: /^\/area\/([^/]+?)\/sector\/([^/]+?)\/climb\/([^/]+?)\/grade\/([^/]+?)\/edit\/?$/,
				params: [{"name":"areaId","optional":false,"rest":false,"chained":false},{"name":"sectorId","optional":false,"rest":false,"chained":false},{"name":"climbId","optional":false,"rest":false,"chained":false},{"name":"gradeId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(app)/area/[areaId]/sector/[sectorId]/edit",
				pattern: /^\/area\/([^/]+?)\/sector\/([^/]+?)\/edit\/?$/,
				params: [{"name":"areaId","optional":false,"rest":false,"chained":false},{"name":"sectorId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/(app)/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/(public)/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CP8GOCiG.js'))
			},
			{
				id: "/(public)/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/(app)/routes",
				pattern: /^\/routes\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/(app)/routes/[id]/edit",
				pattern: /^\/routes\/([^/]+?)\/edit\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/(admin)/users",
				pattern: /^\/users\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
