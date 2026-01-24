import { r as redirect } from './index-B2LGyy1l.js';

const load = async ({ locals }) => {
  const user = locals.user;
  if (!locals.user) throw redirect(303, "/login");
  return { user: locals.user, role: user?.role ?? "guest" };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./layout.svelte-UxsTmhKc.js')).default;
const server_id = "src/routes/(app)/+layout.server.ts";
const imports = ["_app/immutable/nodes/3.TwRnBX4I.js","_app/immutable/chunks/Bji-ZsTx.js","_app/immutable/chunks/CLFBao1S.js","_app/immutable/chunks/D-rjrqWF.js","_app/immutable/chunks/BpIjJAma.js","_app/immutable/chunks/DYby9N2k.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-ymiDXPuZ.js.map
