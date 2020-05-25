export class UserDetails {


    constructor(private token: string, private refreshToken: string) {
    }

    getToken(): string {
        return this.token;
    }

    getRefreshToken(): string {
        return this.refreshToken
    }

}
