import { useState,useContext } from "react";
import { Box,TextField,Button,styled,Typography } from "@mui/material"
import "./login.css";
import { API } from "../../service/api";
import { DataContex } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";


const Components = styled(Box)`
    width:350px;
    margin:auto;
    margin-top:90px;
    box-shadow:5px 2px 5px 2px rgb(0 0 0/0.5);
`;
const Wrapper = styled(Box)`
    display:flex;
    flex:1;
    flex-direction:column;
    margin : 0px 40px 0px 40px;
    & > div, & > button, & > p{
        margin-top : 20px;
    }
`;
// & > div this is used to give css from parent to child.
//  here parent is box and its childrens are div and button.


const LoginButton = styled(Button)`
    text-transform : none;
    background : #ff6501;
`

const SignUpButton = styled(Button)`
    text-transform : none;
    color : #2874f0;
    box-shadow : 0 2px 3px 0 rgb(0 0 0/20%);
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const Text = styled(Typography)`
    color : #878787;
    font-size : 15px;
`;

const signUpInitialValues = {
    name : "",
    username : "",
    password : ""
};

const loginInitialValues = {
    username: '',
    password: ''
}

const Login = ({ isUserAuthenticated }) =>{
    
    const imgUrl = "https://1000logos.net/wp-content/uploads/2020/08/Blogger-Logo.jpg";
    
    const [account, toggleAccount] = useState('login');
    const [signUp, setSignUp] = useState(signUpInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');
    const { setAccount } = useContext(DataContex);
    const navigate = useNavigate();
    
    const toggleSignUp = () =>{
        account === 'login' ? toggleAccount('signup') : toggleAccount('login');
    }
    
    const onInputChange = (e) => {
        setSignUp({...signUp,[e.target.name]:e.target.value})
        // ...sighUp is user to append new values in the previous values as :-
        // setSignUp function will over ride values each time and change them due to which previous values will be lost.
        // [e.target.name] is taken as key of the object and 'e.target.value' is the value of the key.
        // console.log(e.target.name,e.target.value);
    }

    const signUpUser = async () => {
        let response = await API.userSignup(signUp);
        if (response.isSuccess){
            setError('');
            setSignUp(signUpInitialValues);
            toggleAccount('login');
        }
        else{
            setError('Something went wrong! please try again Later...');
        }
    }

    const onValueChange = (e) => {
        setLogin({...login, [e.target.name]:e.target.value});
        // same functionality as signup's onInputChange() function.
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if(response.isSuccess){
            setError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount( { username: response.data.username, name: response.data.name } );
            isUserAuthenticated(true);
            navigate('/');

        }
        else{
            setError('Something went wrong! please try again Later...');
        }
    }


    return(
        <Components>
            <img className="logoImg" src={imgUrl} alt="login img"/>

            {
                account === 'login' ?
                    <Wrapper>
                        <TextField variant="standard" onChange={ (e) => onValueChange(e) } name="username" label="Username" />
                        <TextField variant="standard" onChange={ (e) => onValueChange(e) } name="password" label="Password" />
                        { error && <Error>{error}</Error> };
                        <LoginButton variant="contained" onClick={ () => loginUser() } >Login</LoginButton>
                        <Text>OR</Text>
                        <SignUpButton onClick={() => toggleSignUp()} style={{marginBottom : `20px`}}>Create an account</SignUpButton>
                    </Wrapper>
                :
                    <Wrapper>
                        <TextField variant="standard" onChange={(e) => onInputChange(e)} name="name" label="Name" />
                        <TextField variant="standard" onChange={(e) => onInputChange(e)} name="username" label="Username" />
                        <TextField variant="standard" onChange={(e) => onInputChange(e)} name="password" label="Password" />
                        { error && <Error>{error}</Error> };
                        <SignUpButton onClick={() => signUpUser()}>Sign Up</SignUpButton>
                        <Text>OR</Text>
                        <LoginButton variant="contained" onClick={() => toggleSignUp()} style={{marginBottom : `20px`}}>Already a User</LoginButton>
                    </Wrapper>
            }



        </Components>
    )
}

export default Login;