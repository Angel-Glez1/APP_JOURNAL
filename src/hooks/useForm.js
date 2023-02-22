import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidator();
    }, [formState]);


    useEffect(() => {
        setFormState(initialForm)
    }, [initialForm])


    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        return true;
    }, [formValidation]);

    const onInputChange = ({ target }) => setFormState(prev => ({
        ...prev,
        [target.name]: target.value
    }));


    const onResetForm = () => {
        setFormState(initialForm);
    }


    const createValidator = () => {
        const formCheckValues = {}

        for (const formFiled of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formFiled];
            formCheckValues[`${formFiled}Valid`] = fn(formState[formFiled]) ? null : errorMessage;
        }

        setFormValidation(formCheckValues);
    }



    return {
        ...formState,
        ...formValidation,
        formState,
        isFormValid,
        onInputChange,
        onResetForm,
    }
}


