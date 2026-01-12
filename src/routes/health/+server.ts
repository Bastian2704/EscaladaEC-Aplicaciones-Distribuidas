import { json } from '@sveltejs/kit';

export const GET = () => {
  return json({
    instance: process.env.WEBSITE_INSTANCE_ID ?? 'local',
    hostname: process.env.WEBSITE_HOSTNAME
  });
};
