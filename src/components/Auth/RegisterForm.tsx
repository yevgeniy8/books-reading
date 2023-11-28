import { Field, Formik, FormikHelpers, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const schema = yup.object().shape({
    name: yup.string().min(3).required(),
    email: yup
        .string()
        .email()
        .matches(emailRegexp, 'email invalid')
        .required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().min(6).required(),
});

interface Values {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm = () => {
    const initialValue = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const handleSubmit = (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ) => {
        console.log(values);
        if (values.password !== values.confirmPassword) {
            return console.log('incorrect');
        }
    };

    return (
        <div>
            <Formik
                initialValues={initialValue}
                onSubmit={handleSubmit}
                validationSchema={schema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <Form>
                        <button>Google Registration</button>
                        <div>
                            <label>
                                Ім’я *
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="..."
                                    value={values.name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    errors={errors.name}
                                    touched={touched.name?.toString()}
                                />
                                {touched.name &&
                                    (errors.name ? (
                                        <ErrorMessage
                                            component="div"
                                            name="name"
                                        />
                                    ) : (
                                        <div>This is an CORRECT name</div>
                                    ))}
                            </label>
                        </div>

                        <div>
                            <label htmlFor="">
                                Електронна адреса *
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    value={values.email}
                                />
                                {touched.email &&
                                    (errors.email ? (
                                        <ErrorMessage
                                            component="div"
                                            name="email"
                                        />
                                    ) : (
                                        <div>This is an CORRECT email</div>
                                    ))}
                            </label>
                        </div>

                        <div>
                            <label htmlFor="email">
                                Пароль *
                                <Field
                                    name="password"
                                    placeholder="..."
                                    type="password"
                                    value={values.password}
                                />
                                {touched.password &&
                                    (errors.password ? (
                                        <ErrorMessage
                                            component="div"
                                            name="password"
                                        />
                                    ) : (
                                        <div>This is an CORRECT password</div>
                                    ))}
                            </label>
                        </div>

                        <div>
                            <label htmlFor="">
                                Підтвердити пароль *
                                <Field
                                    name="confirmPassword"
                                    placeholder="..."
                                    type="password"
                                    value={values.confirmPassword}
                                />
                                {touched.confirmPassword &&
                                    (errors.confirmPassword ? (
                                        <ErrorMessage
                                            component="div"
                                            name="confirmPassword"
                                        />
                                    ) : (
                                        <div>
                                            This is an CORRECT confirm password
                                        </div>
                                    ))}
                            </label>
                        </div>

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterForm;
