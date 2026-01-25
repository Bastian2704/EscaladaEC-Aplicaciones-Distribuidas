import { j as json } from './index-B2LGyy1l.js';

const GET = () => {
  return json({
    instance: process.env.WEBSITE_INSTANCE_ID ?? "local",
    hostname: process.env.WEBSITE_HOSTNAME
  });
};

export { GET };
//# sourceMappingURL=_server.ts-D_3GsLAw.js.map
