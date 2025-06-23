import * as React from 'react';
import { Box, Typography, Drawer } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import { useState, KeyboardEvent, useEffect } from "react";

import { useUserStore } from "src/stores";

import { Outlet } from "react-router-dom";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

export default function MyPageLeftSide() {

const { user } = useUserStore();

const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };


  return (
    <Box display="flex">
      <Box width={"16vw"}>
        <Box
          marginLeft={"5vw"}
          marginTop={"5vw"}
          borderRadius={1}
          sx={{ width: "100%", maxWidth: 360, bgcolor: "#FFFF66" }}
        >
          <Box
            padding={2}
            borderRadius={1}
            textAlign={"right"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <PersonIcon
              sx={{
                bgcolor: "#FFFF66",
              }}
            />
            <Typography
              variant="subtitle1"
              component="span"
              fontWeight={800}
              fontSize={20}
              fontFamily={"logoFont"}
            >
              {user != null && <>{user.userName}</>} 님
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{ width: "100%", maxWidth: 360, bgcolor: "#FFFF99" }}
          marginLeft={"5vw"}
          marginTop={"2vw"}
          marginBottom={"5vw"}
          borderRadius={1}
        >
          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="주문 / 배송 조회" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="장바구니" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="좋아요" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="1 : 1 문의" />
            </ListItemButton>
          </List>
          <Divider />
          <List component="nav" aria-label="secondary mailbox folder">
            <ListItemButton
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <ListItemText primary="회원 정보 수정" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 5}
              onClick={(event) => handleListItemClick(event, 5)}
            >
              <ListItemText primary="회원 탈퇴" />
            </ListItemButton>
          </List>
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
}