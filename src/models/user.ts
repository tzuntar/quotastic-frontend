export type UserType = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    karma: number;
    avatarUrl?: string;

    access_token?: string;
    jwtRefreshToken?: string;
}