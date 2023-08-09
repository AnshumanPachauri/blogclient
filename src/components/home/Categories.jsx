
import styled from "@emotion/styled";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { categories } from "../../constants/data";
import { Link, useSearchParams } from "react-router-dom";

const CreateButton = styled(Button)`
    background: #6495ED;
    color: #ffffff;
    width: 85%;
    display: flex;
    margin: 20px;

`

const Styledtable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`


const Categories = () => {

    const [SearchParams] = useSearchParams();
    const category = SearchParams.get('category');

    return(
        <>
            <StyledLink to={`/create?category=${ category || '' }`} style={{ textDecoration: 'none' }}>

                <CreateButton variant="contained">Create Blog</CreateButton>
            
            </StyledLink>

            <Styledtable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink to={'/'}>
                                All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            // in map function a unique key is given i.e id that should be provided to the parent component
                            // here key is given to tabelrow.
                            <TableRow key={category.id}>
                                <TableCell>
                                    <StyledLink to={`/?category=${category.type}`}>
                                        { category.type }    
                                    </StyledLink>
                                </TableCell>
                            </TableRow>                            
                        ))
                    }

                </TableBody>
            </Styledtable>
        </>
        
    )
        
}

export default Categories;