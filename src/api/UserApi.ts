import {apiRequest} from "./Api";
import {UserType} from "../models/User";
import {apiRoutes} from "../constants/apiConstants";
import {LoginUserFields} from "../hooks/react-hook-form/useLogin";
import {RegisterUserFields} from "../hooks/react-hook-form/useRegister";

export const getCurrentUser = async () =>
    apiRequest<undefined, UserType>('get', apiRoutes.CURRENT_USER);

export const login = async (data: LoginUserFields) =>
    apiRequest<LoginUserFields, UserType>('post', apiRoutes.LOGIN, data);

export const signUp = async (data: RegisterUserFields) =>
    apiRequest<RegisterUserFields, UserType>('post', apiRoutes.SIGNUP, data);

export const refreshTokens = async () =>
    apiRequest<undefined, UserType>('post', apiRoutes.REFRESH_TOKENS);

export const logout = async () =>
    apiRequest<undefined, void>('post', apiRoutes.LOGOUT);
