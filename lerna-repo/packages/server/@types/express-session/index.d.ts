import 'express-session';

declare module 'express-session' {
    export interface Session {
        token: { [key: string]: any };
    }
}
