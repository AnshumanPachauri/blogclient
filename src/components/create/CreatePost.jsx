import styled from "@emotion/styled";
import { Box, FormControl, InputBase, Button, TextareaAutosize } from "@mui/material";
import {AddCircle as Add} from "@mui/icons-material";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { DataContex } from "../../context/DataProvider";
import { API } from "../../service/api";

const Container = styled(Box)`
    margin: 50px 100px
`

const StyledFormControl = styled(FormControl)`
    display: flex;
    margin-top: 10px;
    flex-direction: row
`

const InpytTextField = styled(InputBase)`
    flex: 1;
    margin: 0px 30px;
    font-size: 20px;
`

// if we take an html tag in styled....thenits style is treated as an object.
const Image = styled('img')({
    paddingTop:"15px",
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
})

const Textarea = styled(TextareaAutosize)`
    width: 99%;
    margin-top: 40px;
    font-size: 16px;
    border: none;
    &:focus-visible{
        outline: none;
    }
`;

const InitialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}



const CreatePost = () => {
    
    const [post, setPost] = useState(InitialPost);
    const [file, setFile] = useState('');
    const location = useLocation();
    const { account } = useContext(DataContex);
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1456953180671-730de08edaa7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80';
    // this hook will be called whenever the createblog page will be opened.
    // in this the username, category will be automatically set when the page will be called.
    useEffect( () => {
        const getImage = async () => {
            if (file){
                // ek naya formdata banega
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                // data me file ka naam or file append karva denge...

                // API CALL WILL BE MADE HERE.
                
                const response = await API.uploadFile(data);

                post.picture = response.data; //todo here the url of the picture will be sent.
                // the image will be stored on the mongoDB server
                // An API will be called wherre a url will be given that will be applied in the image tag.
            }
        }
        getImage();
        // this react hook location is used to get searchparams from the url.
        // here we need the category param from the url.    
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file] )//image k change hone p setFile baar baar call hoga and file change hoga...so file ko isme daal denge. 
    // this hook has 2 arguments...first is callback function and second one is when the callback function will be called.

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    return (
        <Container>
            <Image src={url} alt="PostBanner"/>

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" style={{ display: 'flex', alignItems: 'start', justifyContent: 'start'}}/>
                </label>
                <input 
                    type="file"
                    id="fileInput" 
                    style={{ display: 'none' }}
                    onChange={ (e) => setFile(e.target.files[0]) }
                />
                <InpytTextField placeholder="Title" onChange={(e) => handleChange(e)} name="title" />
                <Button variant="contained">Publish</Button>

            </StyledFormControl>
            <Textarea minRows={7} 
            placeholder="Description..." 
            onChange={(e) => handleChange(e)}
            name="description"
            />
        </Container>
    )
}   

export default CreatePost;