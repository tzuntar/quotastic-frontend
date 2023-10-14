import {apiRequest} from "./Api";
import {UserKarmaType, UserType} from "../models/user";
import {apiRoutes} from "../constants/apiConstants";
import {LoginUserFields} from "../hooks/react-hook-form/useLogin";
import {RegistrationUserFields} from "../hooks/react-hook-form/useRegistration";

export const getCurrentUser = async () =>
    apiRequest<undefined, UserType>('get', apiRoutes.CURRENT_USER);

export const login = async (data: LoginUserFields) =>
    apiRequest<LoginUserFields, UserType>('post', apiRoutes.LOGIN, data);

export const register = async (data: RegistrationUserFields) =>
    apiRequest<RegistrationUserFields, UserType>('post', apiRoutes.SIGNUP, data);

export const refreshTokens = async () =>
    apiRequest<undefined, UserType>('post', apiRoutes.REFRESH_TOKENS);

export const logout = async () =>
    apiRequest<undefined, void>('post', apiRoutes.LOGOUT);

export const fetchUserById = async(userId: string) =>
    apiRequest<undefined, UserType>('get', `${apiRoutes.USERS_PREFIX}/${userId}`);

export const fetchUserKarma = async(userId: string) =>
    apiRequest<undefined, UserKarmaType>('get', `${apiRoutes.USERS_PREFIX}/${userId}/karma`);