import { Secret } from 'jsonwebtoken';
import { env } from 'process';

export default {
  jwt: {
    tokenKey: env.TOKEN_KEY as Secret,
  },
  team: {
    host: env.TEAM_HOST,
    new: env.TEAM_NEW,
    // getMemberAll: env.IO_TEAM_ALL,
    getMember: env.TEAM_BY_ID,
    getMemberByEmail: env.TEAM_BY_EMAIL,
  },
};
