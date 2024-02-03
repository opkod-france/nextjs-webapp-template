/* eslint-disable unused-imports/no-unused-imports */

import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

/** Example on how to extend the built-in session types */
declare module 'next-auth' {
  interface Session {
    /** This is an example. You can find me in types/next-auth.d.ts */
    user: User;
    id?: string;
    access_token?: string;
  }
  interface User {
    id?: string;
    jwt?: string;
    role_type: string;
    username: string;
  }
}

/** Example on how to extend the built-in types for JWT */
declare module 'next-auth/jwt' {
  interface JWT {
    /** This is an example. You can find me in types/next-auth.d.ts */
    id?: string;
    access_token?: string;
    role_type: string;
    username: string;
  }
}
