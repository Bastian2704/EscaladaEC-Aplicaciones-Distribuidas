import { r as requireAdmin } from './guards-DZEKhdLa.js';
import './index-B2LGyy1l.js';

const load = async (event) => {
  const user = requireAdmin(event);
  return { user };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./layout.svelte-UxsTmhKc.js')).default;
const server_id = "src/routes/(admin)/+layout.server.ts";
const imports = ["_app/immutable/nodes/2.CdB9tFSx.js","_app/immutable/chunks/CAmZEJkh.js","_app/immutable/chunks/R8eUw0rf.js","_app/immutable/chunks/Ckx13BoS.js","_app/immutable/chunks/Dyoa9UM_.js","_app/immutable/chunks/DZFDuCMu.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-BG2CEs-0.js.map
