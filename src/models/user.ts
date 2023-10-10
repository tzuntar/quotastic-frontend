export type UserType = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    karma: number;
    avatarUrl?: string;

    accessToken?: string;
    jwtRefreshToken?: string;
}

export type UserKarmaType = {
    karma: number;
    quotesCount: number;
}