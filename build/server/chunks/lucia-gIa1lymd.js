import { Lucia } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { d as db, j as sessions, u as users } from './index3-DdXcqWnY.js';

const lucia = new Lucia(new DrizzlePostgreSQLAdapter(db, sessions, users), {
  sessionCookie: {
    name: "session",
    attributes: {
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    }
  },
  getUserAttributes: (attrs) => ({
    email: attrs.email,
    role: attrs.role
  })
});

export { lucia as l };
//# sourceMappingURL=lucia-gIa1lymd.js.map
