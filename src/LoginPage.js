
import { useState } from "react"
import { Button, Divider, Form, Grid, Image, Message, Segment } from 'semantic-ui-react'
import Adminfrontpage from "./Adminfrontpage";
import axios from "axios";
import EmployeePage from "./EmployeePage";

function MyLoginPage() {
    const[errorMessage,setErrorMessage] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [isloggedIn, setIsLoggedIn] =useState(false)
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        };
        
        const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        };
    const handlelogin = async() => {
      
      try {
        const response = await axios.post('http://localhost:3001/signin', {
        email:username,
        password,
        });
        console.log(response.data)
        const {token, role,email} = response.data;
        
        if (token) {
        setIsLoggedIn(true)
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        setRole(role); // Set the role in the state
        console.log('Login successful!');
      
        } else {
        setErrorMessage("Invalid email id or password");
        }
        } catch (error) {
        setErrorMessage("Invalid email id or password");
        }

    }
    if (isloggedIn) {
      if (role === '') {
        
        }else if (role === 'Admin') {
          return <Adminfrontpage  email={email}/>;
        } else {
            return <EmployeePage email={email}/>;
        }
       } 
  
    return(
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 700 }}>
      
        <Image centered src='Accenture icon.png' size='medium' />
     <Divider hidden />
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid
          value ={username}
           icon='user' iconPosition='left' 
           placeholder='E-mail address' 
           type='email' 
           onChange={handleUsernameChange}
           style= {{fontSize:'25px'}} />
          <Form.Input
            fluid
            value={password}
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={handlePasswordChange}
            style= {{fontSize:'25px'}}
          />

          <Button color='purple' fluid size='massive' onClick={handlelogin}>
            Login
          </Button>
          </Segment>
          {errorMessage && <div
          style={{fontSize:'1.5rem',color:'red',marginTop:'10px'}}
          >{errorMessage}</div>}
        
      </Form>
      <Message style={{fontSize: '20px'}}>
        New to us? <a href='/signup-page'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
    )
    }
export default MyLoginPage;
