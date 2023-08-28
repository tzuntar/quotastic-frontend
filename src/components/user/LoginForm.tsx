import React, {useState} from "react";
import {Controller} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import * as API from "../../api/Api";
import {LoginUserFields, useLoginForm} from "../../hooks/react-hook-form/useLogin";
import {StatusCode} from "../../constants/statusCodeConstants";
import authStore from "../../stores/auth.store";
import {routeConstants} from "../../constants/routeConstants";
import {observer} from "mobx-react";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const {handleSubmit, errors, control} = useLoginForm();
    const [apiError, setApiError] = useState('');

    const loginSubmit = handleSubmit(async (data: LoginUserFields) => {
        const response = await API.login(data);
        if (response.data?.statusCode === StatusCode.BAD_REQUEST ||
            response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
            return setApiError(response.data.message);
        }

        authStore.login(response.data);
        navigate(routeConstants.HOME);
    });

    return (
        <form onSubmit={loginSubmit}>
            {(apiError != null && apiError !== '') &&
                <p className="text-orange py-4">Error: {apiError}</p>
            }
            <Controller
                control={control}
                name="email"
                render={({field}) => (
                    <div>
                        <label htmlFor="email" className="hidden">E-mail</label>
                        <input
                            {...field}
                            type="email"
                            placeholder="E-mail"
                            aria-label="E-mail"
                            className="border-orange border-2 rounded-full px-6 py-1 sm:w-1/2 lg:w-1/3
                                       focus:outline-alt-orange"/>
                    </div>
                )}
            />
            <Controller
                control={control}
                name="password"
                render={({field}) => (
                    <div className="">
                        <label htmlFor="password" className="hidden">E-mail</label>
                        <input
                            {...field}
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            className="border-orange border-2 rounded-full px-6 py-1 sm:w-1/2 lg:w-1/3 mt-5
                                       focus:outline-alt-orange"/>
                    </div>
                )}
            />
            <input type="submit" value="Sign In"
                   className="bg-gradient-to-t from-orange to-alt-orange
                   p-2 rounded-full w-32 mt-6 text-white cursor-pointer
                   drop-shadow-md hover:shadow-lightener active:brightness-90"/>
        </form>
    )
}

export default observer(LoginForm);
