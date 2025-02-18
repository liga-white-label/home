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
import { useSidebar } from "@/app/context/SideBarContext";
import Link from "next/link";
import {
  useAllCampeonatosQuery,
  useCampeonatoQuery,
} from "@/repositories/CampeonatoRepository";
import { Liga } from "@/app/models/Campeonato";
import { Categoria } from "@/app/models/Categoria";
import MiniLoading from "./loading/MiniLoading";

export const CustomDrawer = () => {
  const { sidebarOpen, handleClose } = useSidebar();

  const { data: allCampeonatos, isLoading: isLoadingAllCampeonatos } =
    useAllCampeonatosQuery();

  const campeonatoActualVacio = allCampeonatos?.find((c) => c.current);

  const { data: campeonatoActualData, isLoading: isLoadingCampeonatoActual } =
    useCampeonatoQuery(campeonatoActualVacio?.id || "");

  const ligaActual = campeonatoActualData as Liga;

  const categorias = ligaActual?.categories || [];

  const isLoading = isLoadingAllCampeonatos || isLoadingCampeonatoActual;

  const allCopas =
    allCampeonatos?.filter((c) => c.type === "cup" && c.enabled) || [];

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
      {categorias.length > 0 && (
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
                    {categorias
                      ?.filter((c: Categoria) => c.gender === "male")
                      .map((cat: Categoria, index: number) => (
                        <ListItem key={index} disablePadding>
                          <Link
                            href={`/campeonatos/${ligaActual.id}/categorias/${cat.id}`}
                            onClick={handleClose}
                            className="!w-full"
                          >
                            <ListItemButton>
                              <ListItemText
                                className="!flex !items-center !justify-center !text-white "
                                primary={
                                  <p className="!text-xl">
                                    Categoria {cat.name}
                                  </p>
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
                    {categorias
                      ?.filter((c: Categoria) => c.gender === "female")
                      .map((cat: Categoria, index: number) => (
                        <ListItem key={index} disablePadding>
                          <Link
                            href={`/campeonatos/${ligaActual.id}/categorias/${cat.id}`}
                            onClick={handleClose}
                            className="!w-full"
                          >
                            <ListItemButton>
                              <ListItemText
                                className="!flex !items-center !justify-center !text-white "
                                primary={
                                  <p className="!text-xl">
                                    Categoria {cat.name}
                                  </p>
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
      )}
      <ListItem disablePadding>
        <Link href={"/novedades"} onClick={handleClose} className="!w-full">
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
                {allCopas?.length > 0 ? (
                  allCopas?.map((c, index) => (
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
                  ))
                ) : (
                  <ListItem disablePadding>
                    <ListItemText
                      className="!flex !items-center !justify-center !text-white !text-center"
                      primary={<p className="!text-xl">No hay copas</p>}
                    />
                  </ListItem>
                )}
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
      {isLoading ? <MiniLoading /> : DrawerList}
    </Drawer>
  );
};
