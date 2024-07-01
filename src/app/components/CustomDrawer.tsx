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

export const CustomDrawer = () => {
  const { sidebarOpen, handleClose } = useSidebar();

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
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
          </ListItem>
        ))}
      </List>
      <Divider>Femenino</Divider>
      <List>
        {["Categoria A", "Categoria B", "Categoria C"].map((text, index) => (
          <ListItem key={index} disablePadding>
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
