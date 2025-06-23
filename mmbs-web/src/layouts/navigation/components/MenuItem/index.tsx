import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

interface props {
    title: string;
    url: string;
    subTitles: any[];
}

export default function MenuComponent({ title, subTitles }: props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigator = useNavigate();

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuItemHandler = (url: string) => {
        setAnchorEl(null);
        navigator(url);
    };

    return (
        <Box component='span' sx={{ flexGrow: 1 }}>
            <Typography
                textAlign='center'
                variant='subtitle1'
                fontFamily={"logoFont"}
                fontSize={20}
                onClick={handleClick}
            >
                {title}
            </Typography>
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                sx={{ pt: 1.5, pb: 1.5, mt: 2 }}
            >
                {subTitles.map((sub) => (
                    <MenuItem
                        sx={{ minwidth: "10vw", pt: 1.5, pb: 1.5 }}
                        onClick={() => menuItemHandler(sub.url)}
                    >
                        {sub.subTitle}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}