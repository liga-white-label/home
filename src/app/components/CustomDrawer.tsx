"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useSidebar } from "../context/SideBarContext";
import Link from "next/link";

export const CustomDrawer = () => {
  const { sidebarOpen, handleClose } = useSidebar();

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <ListItem disablePadding>
        <Link href={"/"} onClick={handleClose} className="w-full">
          <ListItemButton>
            <ListItemText
              className="flex items-center justify-center text-white "
              primary={<p className="text-xl">Inicio</p>}
            />
          </ListItemButton>
        </Link>
      </ListItem>
      <ListItem disablePadding>
        <Accordion className="bg-[#A60000] w-full shadow-none">
          <AccordionSummary
            className="m-0"
            aria-controls="categorias-content"
            sx={{
              ".MuiAccordionSummary-content": { margin: 0 },
            }}
            id="categorias-header"
          >
            <ListItemButton>
              <ListItemText
                className="flex items-center justify-center text-white "
                primary={<p className="text-xl">Categorias</p>}
              />
            </ListItemButton>
          </AccordionSummary>
          <AccordionDetails>
            <Divider
              className="text-white"
              sx={{
                "&::before, &::after": {
                  borderColor: "white",
                },
              }}
            >
              Masculino
            </Divider>
            <List>
              {[
                "Categoria A",
                "Categoria B",
                "Categoria C",
                "Categoria D",
                "Categoria E",
              ].map((text, index) => (
                <ListItem key={index} disablePadding>
                  <Link
                    href={`/categoria-${text.split(" ")[1].toLowerCase()}`}
                    onClick={handleClose}
                    className="w-full"
                  >
                    <ListItemButton>
                      <ListItemText
                        className="flex items-center justify-center text-white "
                        primary={<p className="text-xl">{text}</p>}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
            <Divider
              className="text-white"
              sx={{
                "&::before, &::after": {
                  borderColor: "white",
                },
              }}
            >
              Femenino
            </Divider>
            <List>
              {["Categoria A", "Categoria B", "Categoria C"].map(
                (text, index) => (
                  <ListItem key={index} disablePadding>
                    <Link
                      href={`/categoria-${text
                        .split(" ")[1]
                        .toLowerCase()}-fem`}
                      onClick={handleClose}
                      className="w-full"
                    >
                      <ListItemButton>
                        <ListItemText
                          className="flex items-center justify-center text-white "
                          primary={<p className="text-xl">{text}</p>}
                        />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                )
              )}
            </List>
          </AccordionDetails>
        </Accordion>
      </ListItem>
      <ListItem disablePadding>
        <Link href={"/"} onClick={handleClose} className="w-full">
          <ListItemButton>
            <ListItemText
              className="flex items-center justify-center text-white "
              primary={<p className="text-xl">Novedades</p>}
            />
          </ListItemButton>
        </Link>
      </ListItem>
      <ListItem disablePadding>
        <Link href={"/"} onClick={handleClose} className="w-full">
          <ListItemButton>
            <ListItemText
              className="flex items-center justify-center text-white "
              primary={<p className="text-xl">Copas</p>}
            />
          </ListItemButton>
        </Link>
      </ListItem>
    </Box>
  );

  return (
    <Drawer
      open={sidebarOpen}
      onClose={handleClose}
      className="z-0"
      PaperProps={{ className: "pt-24 pl-2 bg-[#A60000]" }}
      anchor="right"
    >
      {DrawerList}
    </Drawer>
  );
};

/**
 * 
 * <Divider
        className="text-white"
        sx={{
          "&::before, &::after": {
            borderColor: "white",
          },
        }}
      >
        Masculino
      </Divider>
      <List>
        {[
          "Categoria A",
          "Categoria B",
          "Categoria C",
          "Categoria D",
          "Categoria E",
        ].map((text, index) => (
          <ListItem key={index} disablePadding>
            <Link
              href={`/categoria-${text.split(" ")[1].toLowerCase()}`}
              onClick={handleClose}
              className="w-full"
            >
              <ListItemButton>
                <ListItemText
                  className="flex items-center justify-center text-white "
                  primary={<p className="text-xl">{text}</p>}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider
        className="text-white"
        sx={{
          "&::before, &::after": {
            borderColor: "white",
          },
        }}
      >
        Femenino
      </Divider>
      <List>
        {["Categoria A", "Categoria B", "Categoria C"].map((text, index) => (
          <ListItem key={index} disablePadding>
            <Link href={"/categoria"} onClick={handleClose} className="w-full">
              <ListItemButton>
                <ListItemText
                  className="flex items-center justify-center text-white "
                  primary={<p className="text-xl">{text}</p>}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      
 */
