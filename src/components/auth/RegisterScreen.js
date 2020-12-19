import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { removeEror, setError } from '../../actions/ui'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'

export const RegisterScreen = () => {

    // const [state, setstate] = useState(initialState)
    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);

    const [values, handleInputChange] = useForm({
        name: 'eyder',
        email: 'eyder@eyder.com',
        password: '123456',
        confirm: '123456'
    })

    const { name, email, password, confirm } = values;

    const hanldeRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }

    }

    const isFormValid = () => {

        if (name.trim().length <= 0) {
            dispatch(setError('Name is required'));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email is not valid'));
            return false;
        } else if (password !== confirm || password.length < 5) {
            dispatch(setError('Password should be at least 6 characters and march each other'));
            return false;
        }

        dispatch(removeEror());
        return true;
    }

    return (
        <div>

            <h3 className="auth__title">Register</h3>

            <form 
            className="animate__animated animate__fadeIn animate__faster"
             onSubmit={hanldeRegister}
             >
                {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            {msgError}
                        </div>
                    )

                }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm"
                    className="auth__input"
                    value={confirm}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already Registered?
                </Link>

            </form>
        </div>
    )
}
