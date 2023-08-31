import * as Yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

export interface RegistrationUserFields {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirmation: string
}

export const useRegistrationForm = () => {
    const RegistrationSchema = Yup.object().shape({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        email: Yup.string().email()
            .required('Please provide a valid e-mail address'),
        password: Yup.string().required(),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password')], 'The passwords must match')
            .required('The passwords must match'),
    });

    const {
        handleSubmit,
        formState: {errors},
        control
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        },
        mode: 'onSubmit',
        resolver: yupResolver(RegistrationSchema)
    });

    return {handleSubmit, errors, control};
}
