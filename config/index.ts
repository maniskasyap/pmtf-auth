import { Secret } from 'jsonwebtoken';
import { env } from 'process';

export default {
  jwt: {
    tokenKey: env.TOKEN_KEY as Secret,
  },
  team: {
    host: env.TEAM_HOST,
    new: env.TEAM_NEW,
    getMember: env.TEAM_BY_ID,
    getMemberByEmail: env.TEAM_BY_EMAIL,
  },
  io: {
    host: env.IO_HOST,
    updatePw: env.IO_TEAM_UPDATE_PW,
  },
};
