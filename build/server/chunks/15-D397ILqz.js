import { a as requireUser } from './guards-DZEKhdLa.js';
import { S as ServiceFactory } from './serviceFactory-BdHGVNT9.js';
import './index-B2LGyy1l.js';
import './lucia-CGGv7VMT.js';
import 'lucia';
import '@lucia-auth/adapter-drizzle';
import 'postgres';
import './shared-server-DaWdgxVh.js';
import 'argon2';

const load = async (event) => {
  const viewer = requireUser(event);
  const { userId } = event.params;
  const service = ServiceFactory.create("recommendations");
  const result = await service.getProfile(userId, { id: viewer.id, role: viewer.role });
  const items = [result.user];
  return {
    items,
    userRopeClimbs: result.sport.userClimbs,
    userNoRopeClimbs: result.noRope.userClimbs,
    userTradClimbs: result.trad.userClimbs,
    topSport: result.sport.top,
    topNoRope: result.noRope.top,
    topTrad: result.trad.top,
    sportRecommendations: result.sport.recommendations,
    noRopeRecommendations: result.noRope.recommendations,
    tradRecommendations: result.trad.recommendations,
    page: Math.max(1, Number(event.url.searchParams.get("page") ?? 1)),
    status: event.url.searchParams.get("status") ?? "active"
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 15;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-qTG1hQXu.js')).default;
const server_id = "src/routes/(app)/profile/[userId]/+page.server.ts";
const imports = ["_app/immutable/nodes/15.RKgh1ezM.js","_app/immutable/chunks/CLFBao1S.js","_app/immutable/chunks/D-rjrqWF.js","_app/immutable/chunks/R2lLDMU1.js","_app/immutable/chunks/1ipHKKXI.js","_app/immutable/chunks/DcMo3cCv.js","_app/immutable/chunks/DYby9N2k.js","_app/immutable/chunks/BWJMsvq9.js","_app/immutable/chunks/BMTFBQAs.js","_app/immutable/chunks/SsGePZVV.js","_app/immutable/chunks/CDGVdonO.js","_app/immutable/chunks/DR-j32Px.js","_app/immutable/chunks/DN3OWba0.js","_app/immutable/chunks/DYFObpwG.js"];
const stylesheets = ["_app/immutable/assets/15.D_8fxKxS.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=15-D397ILqz.js.map
