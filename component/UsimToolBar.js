import * as React from "react";
import { useState } from "react";
import {
  Typography,
  List,
  Toolbar,
  AppBar,
  Drawer,
  Box,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
} from "@mui/material";
import Link from "./MuiNextLink";
import {
  PaidOutlined,
  Store,
  MoveToInbox,
  Logout,
  AccountCircle,
  ShoppingCart,
  SimCard,
  People,
  ListAlt,
  ChargingStation,
} from "@mui/icons-material";

const menuObjTop = [
  {
    name: "예치금 내역",
    icon: <PaidOutlined />,
    link: "/deposit",
  },
  {
    name: "개통 및 충전 처리",
    icon: <ChargingStation />,
    link: "/chargeIn",
  },
  {
    name: "개통 및 충전 내역",
    icon: <ListAlt />,
    link: "/chargeList",
  },

  {
    name: "대리점 개통 및 충전 현황",
    icon: <Store />,
    link: "/agencies/agencyState",
  },
];
const menuObjBot = [
  {
    name: "입금 내역",
    icon: <ListAlt />,
    link: "/payList",
  },

  {
    name: "유심 관리",
    icon: <SimCard />,
    link: "/sims/usimList",
  },

  {
    name: "상품 관리",
    icon: <ShoppingCart />,
    link: "/products/productList",
  },
  {
    name: "회원 관리",
    icon: <People />,
    link: "/members/memberList",
  },
  {
    name: "대리점 관리",
    icon: <Store />,
    link: "/agencies/agencyList",
  },
  {
    name: "Install App",
    icon: <MoveToInbox />,
    link: "/",
  },
];

const drawerWidth = 275;
const UsimToolBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="absolute"
        sx={{
          width: "100%",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" noWrap component="div">
            825 SIM
          </Typography>
          <AccountCircle
            sx={{ fontSize: "28px", cursor: "pointer" }}
            onClick={handleClick}
          />
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 8,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Link href="/mypage" underline="none" color="#000">
              <MenuItem>
                <AccountCircle
                  fontSize="medium"
                  sx={{
                    color: "#8a8a8a",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                />
                내 정보
              </MenuItem>
            </Link>
            <Divider sx={{ margin: "4px 0" }} />
            <Link href="/myUsimList" underline="none" color="#000">
              <MenuItem>
                <SimCard
                  fontSize="medium"
                  sx={{ color: "#8a8a8a", marginRight: "10px" }}
                />
                내 유심리스트
              </MenuItem>
            </Link>
            <Link href="/myStoreInfo" underline="none" color="#000">
              <MenuItem>
                <Store
                  fontSize="medium"
                  sx={{ color: "#8a8a8a", marginRight: "10px" }}
                />
                대리점 정보
              </MenuItem>
            </Link>
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="medium" />
              </ListItemIcon>
              로그아웃
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          color: "black",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            zIndex: 2,
            position: "absolute",
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <List sx={{ mt: "64px" }}>
          {menuObjTop.map((menu, index) => (
            <>
              <Link href={menu.link} sx={{ textDecoration: "none" }}>
                <ListItem button key={index}>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.name} />
                </ListItem>
              </Link>
            </>
          ))}
        </List>
        <Divider />
        <List>
          {menuObjBot.map((menu, index) => (
            <>
              <Link href={menu.link} sx={{ textDecoration: "none" }}>
                <ListItem button key={index}>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.name} />
                </ListItem>
              </Link>
            </>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default UsimToolBar;
