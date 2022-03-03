import * as React from "react";
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
  {
    name: "로그아웃",
    icon: <Logout />,
    link: "/",
  },
];
export default function MobileToolBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

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
          {auth && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <AccountCircle />
            </IconButton>
          )}
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
                    onClick={handleMenu}
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

      {/* 로그인버전 확인 후 삭제 */}
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      {/* 로그인버전 확인 후 삭제 */}
    </Box>
  );
}
