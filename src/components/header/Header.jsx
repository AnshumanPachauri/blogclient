import { AppBar,Toolbar, styled } from "@mui/material";
import { Link } from "react-router-dom";

const Component = styled(AppBar)`
    background: white;
    color: black;
`

const Container = styled(Toolbar)`
    justify-content: center;

    & > a {
        padding: 20px;
        text-decoration: none;
        color: black;
    }
`


const Header = () => {
    return(

        <Component>
            <Container>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/contact'>Contact</Link>
                <Link to='/login'>LogOut</Link>
            </Container>
        </Component>

    )
}

export default Header;