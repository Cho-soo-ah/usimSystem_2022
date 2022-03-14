import * as React from "react";
import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  FormGroup,
  Divider,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "./MuiNextLink";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

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
  Logout,
} from "@mui/icons-material";
const menuObjTop = [
  {
    name: "마이페이지",
    icon: <Face />,
    link: "/mypage",
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
    link: "/storeList",
  },
];
const menuObjBot = [
  {
    name: "유심 리스트",
    icon: <PhoneIphone />,
    link: "/usimList",
  },
  {
    name: "입금 내역",
    icon: <PaidOutlined />,
    link: "/payList",
  },

  {
    name: "대리점 등록",
    icon: <AddBusiness />,
    link: "/storeUpload",
  },
  {
    name: "회원 관리",
    icon: <Face />,
    link: "/member",
  },
  {
    name: "상품 관리",
    icon: <PhoneIphone />,
    link: "/productList",
  },
  {
    name: "Install App",
    icon: <MoveToInbox />,
    link: "/",
  },
];
export default function MobileToolBar() {
  // ----------- menu list -----------
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
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
    </Box>
  );
  // ----------- menu list -----------

  return (
    <Box sx={{ width: "100%", position: "absolute", top: 0, left: 0 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            825 SIM
          </Typography>

          <div>
            {["right"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    sx={{ color: "#fff" }}
                  >
                    <MenuIcon>{anchor}</MenuIcon>
                  </IconButton>
                </Button>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </div>
          <Divider />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
