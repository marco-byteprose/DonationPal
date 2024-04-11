
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
        <div className="container-fluid login-container d-flex justify-content-center align-items-center">
            <div className="container login text-bg-light p-3 rounded shadow">
                <form method="post" onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="inputEmail" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" value={inputs.email || ""} name="email" onChange={handleChange} />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="inputPassword" class="form-label">Password</label>
                        <input type="password" class="form-control" id="inputPassword" value={inputs.password || ""} name="password" onChange={handleChange} />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}