"use client";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useSidebar } from "../context/SideBarContext";
import Link from "next/link";
import { Home } from "@mui/icons-material";

export const CustomDrawer = () => {
  const { sidebarOpen, handleClose } = useSidebar();

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <ListItem disablePadding>
        <Link href={"/"} onClick={handleClose} className="w-full">
          <ListItemButton>
            <ListItemIcon>
              <div className="h-10 w-10 rounded-full items-center justify-center flex">
                <Home />
              </div>
            </ListItemIcon>
            <ListItemText primary={"Inicio"} />
          </ListItemButton>
        </Link>
      </ListItem>
      <Divider>Masculino</Divider>
      <List>
        {[
          "Categoria A",
          "Categoria B",
          "Categoria C",
          "Categoria D",
          "Categoria E",
        ].map((text, index) => (
          <ListItem key={index} disablePadding>
            <Link href={"/categoria"} onClick={handleClose} className="w-full">
              <ListItemButton>
                <ListItemIcon>
                  <div className="h-10 w-10 rounded-full bg-blue-200 items-center justify-center flex">
                    <p className="font-extrabold text-2xl">
                      {text.split(" ")[1]}
                    </p>
                  </div>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider>Femenino</Divider>
      <List>
        {["Categoria A", "Categoria B", "Categoria C"].map((text, index) => (
          <ListItem key={index} disablePadding>
            <Link href={"/categoria"} onClick={handleClose} className="w-full">
              <ListItemButton>
                <ListItemIcon>
                  <div className="h-10 w-10 rounded-full bg-red-200 items-center justify-center flex">
                    <p className="font-extrabold text-2xl">
                      {text.split(" ")[1]}
                    </p>
                  </div>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      open={sidebarOpen}
      onClose={handleClose}
      className="z-0"
      PaperProps={{ className: "pt-24 pl-2" }}
    >
      {DrawerList}
    </Drawer>
  );
};
