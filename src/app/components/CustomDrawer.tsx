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
import {
  useAllCampeonatosQuery,
  useCampeonatoQuery,
} from "@/repositories/CampeonatoRepository";

export const CustomDrawer = () => {
  const { sidebarOpen, handleClose } = useSidebar();

  const { data: allCampeonatos, isLoading: isLoadingAllCampeonatos } =
    useAllCampeonatosQuery();

  const campeonatoActualVacio = allCampeonatos?.find((c) => c.current);

  const { data: campeonatoActual } = useCampeonatoQuery(
    campeonatoActualVacio?.id || ""
  );
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <ListItem disablePadding>
        <Link href={"/"} onClick={handleClose} className="!w-full">
          <ListItemButton>
            <ListItemText
              className="!flex !items-center !justify-center !text-white "
              primary={<p className="!text-xl">Inicio</p>}
            />
          </ListItemButton>
        </Link>
      </ListItem>
      <ListItem disablePadding>
        <Accordion className="!bg-[#A60000] !w-full !shadow-none">
          <AccordionSummary
            className="!m-0"
            aria-controls="categorias-content"
            sx={{
              ".MuiAccordionSummary-content": { margin: 0 },
            }}
            id="categorias-header"
          >
            <ListItemButton>
              <ListItemText
                className="!flex !items-center !justify-center !text-white "
                primary={<p className="!text-xl">Categorias</p>}
              />
            </ListItemButton>
          </AccordionSummary>
          <AccordionDetails>
            {isLoadingAllCampeonatos ? (
              <p>Cargando...</p>
            ) : (
              <>
                <Divider
                  className="!text-white"
                  sx={{
                    "&::before, &::after": {
                      borderColor: "white",
                    },
                  }}
                >
                  Masculino
                </Divider>
                <List>
                  {campeonatoActual?.categories
                    ?.filter((c) => c.gender === "male")
                    .map((cat, index) => (
                      <ListItem key={index} disablePadding>
                        <Link
                          href={`/campeonatos/${campeonatoActual.id}/categorias/${cat.id}`}
                          onClick={handleClose}
                          className="!w-full"
                        >
                          <ListItemButton>
                            <ListItemText
                              className="!flex !items-center !justify-center !text-white "
                              primary={
                                <p className="!text-xl">Categoria {cat.name}</p>
                              }
                            />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    ))}
                </List>
                <Divider
                  className="!text-white"
                  sx={{
                    "&::before, &::after": {
                      borderColor: "white",
                    },
                  }}
                >
                  Femenino
                </Divider>
                <List>
                  {campeonatoActual?.categories
                    ?.filter((c) => c.gender === "female")
                    .map((cat, index) => (
                      <ListItem key={index} disablePadding>
                        <Link
                          href={`/campeonatos/${campeonatoActual.id}/categorias/${cat.id}`}
                          onClick={handleClose}
                          className="!w-full"
                        >
                          <ListItemButton>
                            <ListItemText
                              className="!flex !items-center !justify-center !text-white "
                              primary={
                                <p className="!text-xl">Categoria {cat.name}</p>
                              }
                            />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    ))}
                </List>
              </>
            )}
          </AccordionDetails>
        </Accordion>
      </ListItem>
      <ListItem disablePadding>
        <Link href={"/"} onClick={handleClose} className="!w-full">
          <ListItemButton>
            <ListItemText
              className="!flex !items-center !justify-center !text-white "
              primary={<p className="!text-xl">Novedades</p>}
            />
          </ListItemButton>
        </Link>
      </ListItem>
      <ListItem disablePadding>
        <Accordion className="!bg-[#A60000] !w-full !shadow-none">
          <AccordionSummary
            className="!m-0"
            aria-controls="copas-content"
            sx={{
              ".MuiAccordionSummary-content": { margin: 0 },
            }}
            id="copas-header"
          >
            <ListItemButton>
              <ListItemText
                className="!flex !items-center !justify-center !text-white "
                primary={<p className="!text-xl">Copas</p>}
              />
            </ListItemButton>
          </AccordionSummary>
          <AccordionDetails>
            {isLoadingAllCampeonatos ? (
              <p>Cargando...</p>
            ) : (
              <List>
                {allCampeonatos
                  ?.filter((c) => c.type === "cup" && c.enabled)
                  .map((c, index) => (
                    <ListItem key={index} disablePadding>
                      <Link
                        href={`/campeonatos/${c.id}`}
                        onClick={handleClose}
                        className="!w-full"
                      >
                        <ListItemButton>
                          <ListItemText
                            className="!flex !items-center !justify-center !text-white !text-center"
                            primary={<p className="!text-xl">{c.name}</p>}
                          />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  ))}
              </List>
            )}
          </AccordionDetails>
        </Accordion>
      </ListItem>
    </Box>
  );

  return (
    <Drawer
      open={sidebarOpen}
      onClose={handleClose}
      className="!z-0"
      PaperProps={{ className: "!pt-24 !pl-2 !bg-[#A60000]" }}
      anchor="right"
    >
      {DrawerList}
    </Drawer>
  );
};
