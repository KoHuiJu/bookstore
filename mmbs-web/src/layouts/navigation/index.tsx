import { useState, KeyboardEvent, MouseEvent } from "react";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Popper from "@mui/material/Popper";
import SearchIcon from "@mui/icons-material/Search";
import { Link, Navigate, useNavigate } from "react-router-dom";

import MenuComponent from "./components/MenuItem";
import PoperMenuItem from "./components/PoperMenuItem";
import { AGE_LIST, CATEGORY_LIST } from "../../constants/navigation";
import axios from "axios";
import { Button } from "@mui/material";

export default function Navigation() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [productTitle, setProductTitle] = useState<string>('');

    // 리액트에서 URL을 옮길 때 사용되는 
    const navigator = useNavigate();

    const SearchAdd = () =>{
        // SearchAdd 동작 시 '/search/:productTitle'로 이동
        // productTitle에는 사용자가 검색창에 입력한 값이 담겨 있음
        navigator(`/search/${productTitle}`);
    }
    // enter key 동작 
    const handleKeyPress = (event: KeyboardEvent<HTMLElement>) => {
        if(event.key === 'Enter') SearchAdd();
      }

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' sx={{ backgroundColor: "#F0A500" }}>
                <Toolbar style={{ paddingRight: "10vw", paddingLeft: "10vw" }} >
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        type='button'
                        onClick={handleClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box display='flex' sx={{ flexGrow: 1 }} fontFamily={"logoFont"}>
                        {CATEGORY_LIST.map((category) => (
                            <MenuComponent
                                title={category.title}
                                url={category.url}
                                subTitles={category.subTitles}
                            />
                        ))}
                        <Divider
                            style={{ borderColor: "#ffffff" }}
                            orientation='vertical'
                            flexItem
                        />
                        {AGE_LIST.map((age) => (
                            <MenuComponent
                                title={age.title}
                                // <Link to={subTitles.url}>{subTitles.subTitle}</Link>
                                subTitles={age.subTitles}
                                url={age.url}
                            />
                        ))}
                    </Box>
                    <Popper
                        id={id}
                        open={open}
                        placement='bottom-start'
                        anchorEl={anchorEl}
                        sx={{ zIndex: 999 }}
                    >
                        <PoperMenuItem setAnchorEl={setAnchorEl} />
                    </Popper>
                    <Search>
                            <IconButton onClick={SearchAdd}>
                                <SearchIcon/>
                            </IconButton>
                        <StyledInputBase
                            placeholder='Search…'
                            inputProps={{ "aria-label": "search" }}
                            onChange={(e) => setProductTitle(e.target.value)}
                            onKeyPress={(event) => handleKeyPress(event)}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));
