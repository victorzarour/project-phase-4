import { Button } from "./Button";
import { FormInput } from "./FormInput";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LoginForm.css"

// TO DO GET ERRORS TO DISPLAY ON PAGE

const LoginForm = ({ setUser }) => {

  const [response, setResponse] = useState(false)

  const [ formData, setFormData ] = useState({
    username: "",
    password: ""
  });
  const [ errors, setErrors ] = useState([]);

  const history = useHistory();

  const { username, password } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }).then( (resp) => {
      if (resp.ok) {
        resp.json().then( (user) => {
          setUser(user);
          history.push("/");
        });
      } else {
        resp.json().then( (json) => {
          setErrors(Object.entries(json.errors));
        });
      }
    });
    setResponse(true)
  };

  return (
    // <form onSubmit={ handleSubmit }>
    //   <FormInput
    //   label="Username"
    //   type="text"
    //   required
    //   onChange={ handleChange }
    //   name="username"
    //   value={ username }
    //   />

    //   <FormInput
    //   label="Password"
    //   type="password"
    //   required
    //   onChange={ handleChange }
    //   name="password"
    //   value={ password }
    //   />
    //   <Button type="submit">Login</Button>
    //   </form>

      <section className='login_body'>
      <div className='userDiv'>
        <form className={`${!response ? 'userform' : 'hidden'}`} autoComplete='off' onSubmit={handleSubmit}>
          <h2>LOGIN</h2>
            <input
              type='text' required label='Username' name='username' onChange={handleChange} value={username} placeholder="USERNAME"
            />
            <input
              type='text' required label='Password' name='password' onChange={handleChange} value={password} placeholder="PASSWORD"
            />
            <button type="submit" className="user-form-btn">SUBMIT</button>
        </form>
      <div className={`${response ? 'userform' : 'hidden'}`}>
        <h2>WELCOME, {username}</h2>
      </div>
      </div>
     </section>
     


  );
};

export default LoginForm;