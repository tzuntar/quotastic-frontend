import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {RegistrationUserFields, useRegistrationForm} from "../../hooks/react-hook-form/useRegistration";
import * as API from '../../api/Api';
import {StatusCode} from "../../constants/statusCodeConstants";
import authStore from "../../stores/auth.store";
import {routeConstants} from "../../constants/routeConstants";
import {observer} from "mobx-react";
import {Controller} from "react-hook-form";

const RegistrationForm: React.FC = () => {
    const navigate = useNavigate();
    const {handleSubmit, errors, control} = useRegistrationForm();
    const [apiError, setApiError] = useState('');

    const registrationSubmit = handleSubmit(async (data: RegistrationUserFields) => {
        const response = await API.register(data);
        if (response.data?.statusCode === StatusCode.CREATED ||
            response.data?.statusCode === StatusCode.OK) {
            authStore.login(response.data);
            return navigate(routeConstants.HOME);
        }

        // registration failed, don't redirect
        setApiError(response.data.message);
    });

    return (
        <form onSubmit={registrationSubmit}>
            {(apiError != null && apiError !== '') &&
                <p className="text-orange font-bold pb-4">Unable to create account: {apiError}</p>
            }
            <div className="grid grid-cols-2 w-full gap-4">
                <Controller
                    control={control}
                    name="firstName"
                    render={({field}) => (
                        <div>
                            <label htmlFor="firstName" className="hidden">First name</label>
                            <input
                                {...field}
                                type="text"
                                placeholder="First name"
                                aria-label="First name"
                                autoComplete="first-name"
                                className="border-orange border-[1.5px] rounded-full px-6 py-1 w-full
                                       focus:outline-alt-orange focus:drop-shadow-sm"/>
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="lastName"
                    render={({field}) => (
                        <div>
                            <label htmlFor="lastName" className="hidden">Last name</label>
                            <input
                                {...field}
                                type="text"
                                placeholder="Last name"
                                aria-label="Last name"
                                autoComplete="last-name"
                                className="border-orange border-[1.5px] rounded-full px-6 py-1 w-full
                                       focus:outline-alt-orange focus:drop-shadow-sm"/>
                        </div>
                    )}
                />
            </div>
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
                            className="border-orange border-[1.5px] rounded-full px-6 py-1 mt-5 w-full
                                       focus:outline-alt-orange focus:drop-shadow-sm"/>
                    </div>
                )}
            />
            <Controller
                control={control}
                name="password"
                render={({field}) => (
                    <div className="">
                        <label htmlFor="password" className="hidden">Create a password</label>
                        <input
                            {...field}
                            type="password"
                            placeholder="Create a password"
                            aria-label="Create a password"
                            autoComplete="new-password"
                            className="border-orange border-[1.5px] rounded-full px-6 py-1 mt-5 w-full
                                       focus:outline-alt-orange focus:drop-shadow-sm"/>
                    </div>
                )}
            />
            <Controller
                control={control}
                name="passwordConfirmation"
                render={({field}) => (
                    <div className="">
                        <label htmlFor="passwordConfirmation" className="hidden">Re-enter the password</label>
                        <input
                            {...field}
                            type="password"
                            placeholder="Re-enter the password"
                            aria-label="Re-enter the password"
                            autoComplete="new-password"
                            className="border-orange border-[1.5px] rounded-full px-6 py-1 mt-5 w-full
                                       focus:outline-alt-orange focus:drop-shadow-sm"/>
                    </div>
                )}
            />
            <input type="submit" value="Create Account"
                   className="bg-gradient-to-t from-orange to-alt-orange
                   p-2 rounded-full px-8 mt-6 text-white cursor-pointer
                   drop-shadow-md hover:shadow-lightener active:brightness-90"/>
        </form>
    );
}

export default observer(RegistrationForm);
