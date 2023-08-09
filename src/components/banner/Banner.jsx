import { Box, Typography, styled } from "@mui/material";

const Image = styled(Box)`
    background: url(https://png.pngtree.com/background/20230519/original/pngtree-desktop-room-design-gamer-s-gaming-setup-photography-picture-image_2661535.jpg) center/55% repeat-x #000;
    width: 100%;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Heading = styled(Typography)`
    font-size: 70px;
    color: #ffffff;
    line-height: 1
`

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #ffffff;
    border-radius: 5px;
`


const Banner = () => {
    return (
        <Image>
            <Heading>BLOG</Heading>
            <SubHeading> Anshuman's Life </SubHeading>
        </Image>
    )
}

export default Banner;