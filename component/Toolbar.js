import * as React from "react";
import {
  Typography,
  List,
  Toolbar,
  AppBar,
  CssBaseline,
  Drawer,
  Box,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "../component/MuiNextLink";
import {
  Face,
  PhoneIphone,
  PaidOutlined,
  Store,
  PersonAddAltOutlined,
  AddBusiness,
  ListAltOutlined,
  LockOutlined,
  MoveToInbox,
} from "@mui/icons-material";

const menuObjTop = [
  {
    name: "로그아웃",
    icon: <Face />,
    link: "/login",
  },
  {
    name: "개통 및 충전 처리",
    icon: <PhoneIphone />,
    link: "/chargeIn",
  },
  {
    name: "개통 및 충전 검증",
    icon: <PhoneIphone />,
    link: "/chargeList",
  },
  {
    name: "예치금 내역",
    icon: <PaidOutlined />,
    link: "/deposit",
  },
  {
    name: "대리점 개통 및 충전 현황",
    icon: <Store />,
    link: "/store",
  },
];
const menuObjBot = [
  {
    name: "유심 리스트/업로드",
    icon: <PhoneIphone />,
    link: "/usimList",
  },
  {
    name: "입금 내역",
    icon: <PaidOutlined />,
    link: "/payList",
  },
  {
    name: "대리점/직원 목록",
    icon: <ListAltOutlined />,
    link: "/employeeList",
  },
  {
    name: "대리점/직원 등록",
    icon: <AddBusiness />,
    link: "/employeeUpload",
  },
  {
    name: "딜러 등록",
    icon: <PersonAddAltOutlined />,
    link: "/dealer",
  },
  {
    name: "회원 관리",
    icon: <Face />,
    link: "/member",
  },
  {
    name: "상품 관리",
    icon: <PhoneIphone />,
    link: "/product",
  },
  {
    name: "비밀번호 변경",
    icon: <LockOutlined />,
    link: "/changeAccount",
  },
  {
    name: "Install App",
    icon: <MoveToInbox />,
    link: "/",
  },
];

const drawerWidth = 270;
const ToolbarWrap = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="absolute"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          mr: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            825 SIM
          </Typography>
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
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <Divider />
        <List>
          {menuObjTop.map((menu) => (
            <>
              <Link href={menu.link} sx={{ textDecoration: "none" }}>
                <ListItem button>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.name} />
                </ListItem>
              </Link>
            </>
          ))}
        </List>
        <Divider />
        <List>
          {menuObjBot.map((menu) => (
            <>
              <Link href={menu.link} sx={{ textDecoration: "none" }}>
                <ListItem button>
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

export default ToolbarWrap;
