
import { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { APIURLContext } from 'src/contexts/APIURLContext';
import axios from 'axios';
import useToken from 'src/hooks/useToken';

export default function LoginForm() {
    const [inputs, setInputs] = useState({});
    const apiURL = useContext(APIURLContext);
    const {token, setToken} = useToken();
    const navigate = useNavigate();

    if (token) {
        return <Navigate replace to='/profile' />
    }

    // Function that posts form data to the API
    async function loginUser(credentials) {
        try {
            let res = await axios.post(apiURL + '/users/login', credentials);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    // Handler function for form field changes
    const handleChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setInputs(values => ({...values, [fieldName]: fieldValue}));
    }

    // Handler function for the login form
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Create object that contains email and password user entered
        let loginCredentials = {};
        loginCredentials.email = inputs.email;
        loginCredentials.password = inputs.password;
        const loginResponse = await loginUser(loginCredentials);
        if (loginResponse == null) {
            alert('That username and password is not valid!');
        } else {
            setToken(loginResponse.accessToken);
            navigate('/profile');
        }
    }

    return (
        // Login form goes here
        <form method="post" onSubmit={handleSubmit}>
            <div className="login-form">
            <div className="form-group row justify-content-md-center">
                <label htmlFor="input-email" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input 
                        type="text"
                        className="form-control"
                        id="input-email"
                        value={inputs.email || ""}
                        name="email"
                        onChange={handleChange} 
                    />
                </div>
            </div>
            <div className="form-group row justify-content-md-center">
                <label htmlFor="input-password" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        id="input-password"
                        value={inputs.password || ""}
                        name="password"
                        onChange={handleChange} 
                    />
                </div>
            </div>
            <div className="form-group row justify-content-md-center">
                <div className="col-sm-12">
                    <button type="submit" className="btn btn-primary">Log In</button>
                </div>
            </div>

            </div>
        </form>
    )
}