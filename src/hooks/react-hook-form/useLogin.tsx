import * as Yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

export interface LoginUserFields {
    email: string,
    password: string
}

export const useLoginForm = () => {
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email().required('Please enter a valid e-mail'),
        password: Yup.string().required('Please enter your credentials')
    });

    const {
        handleSubmit,
        formState: {errors},
        control
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onSubmit',
        resolver: yupResolver(LoginSchema)
    });

    return {handleSubmit, errors, control};
}
