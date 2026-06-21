"use client";

import { FC, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Notifications, NotificationsNone, Close } from "@mui/icons-material";
import { subscriptionRepo } from "@/repositories/SubscriptionRepository";

const EMAIL_KEY = "userEmail";
const SUBSCRIPTIONS_KEY = "subscriptions";

type ModalMode = "subscribe" | "unsubscribe";

interface SubscriptionBellProps {
  teamId: string;
  teamName: string;
}

export const SubscriptionBell: FC<SubscriptionBellProps> = ({
  teamId,
  teamName,
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("subscribe");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const subscriptions: string[] = JSON.parse(
      localStorage.getItem(SUBSCRIPTIONS_KEY) || "[]"
    );
    setIsSubscribed(subscriptions.includes(teamId));
  }, [teamId]);

  const openModal = (mode: ModalMode) => {
    const savedEmail = localStorage.getItem(EMAIL_KEY) || "";
    setEmail(savedEmail);
    setEmailError("");
    setModalMode(mode);
    setModalOpen(true);
  };

  const handleClick = () => {
    if (isSubscribed) {
      const savedEmail = localStorage.getItem(EMAIL_KEY);
      //Este quilombo es por no tener usuarios
      if (savedEmail) {
        // Tiene email guardado → desuscribir directo
        handleUnsubscribe(savedEmail);
      } else {
        // localStorage limpiado → pedir email para poder desuscribirse
        openModal("unsubscribe");
      }
    } else {
      openModal("subscribe");
    }
  };

  const handleSubscribe = async (userEmail: string) => {
    setLoading(true);
    try {
      await subscriptionRepo.subscribe(userEmail, teamId);
      localStorage.setItem(EMAIL_KEY, userEmail);
      const subscriptions: string[] = JSON.parse(
        localStorage.getItem(SUBSCRIPTIONS_KEY) || "[]"
      );
      if (!subscriptions.includes(teamId)) {
        subscriptions.push(teamId);
        localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(subscriptions));
      }
      setIsSubscribed(true);
      setModalOpen(false);
      setSnackbar({
        open: true,
        message: `Suscripto a ${teamName}`,
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Error al suscribirse. Intentá de nuevo.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async (userEmail: string) => {
    setLoading(true);
    try {
      await subscriptionRepo.unsubscribe(teamId, userEmail);
      const subscriptions: string[] = JSON.parse(
        localStorage.getItem(SUBSCRIPTIONS_KEY) || "[]"
      );
      localStorage.setItem(
        SUBSCRIPTIONS_KEY,
        JSON.stringify(subscriptions.filter((id) => id !== teamId))
      );
      // Si el email fue re-ingresado desde el modal, guardarlo
      localStorage.setItem(EMAIL_KEY, userEmail);
      setIsSubscribed(false);
      setModalOpen(false);
      setSnackbar({
        open: true,
        message: `Desuscripto de ${teamName}`,
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Error al desuscribirse. Intentá de nuevo.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleModalSubmit = () => {
    if (!validateEmail(email)) {
      setEmailError("Ingresá un email válido");
      return;
    }
    setEmailError("");
    if (modalMode === "subscribe") {
      handleSubscribe(email);
    } else {
      handleUnsubscribe(email);
    }
  };

  const isUnsubscribeModal = modalMode === "unsubscribe";

  return (
    <>
      <Tooltip
        title={
          isSubscribed
            ? "Suscripto — click para desuscribirse"
            : "Suscribirse a este equipo"
        }
      >
        <span>
          <IconButton
            onClick={handleClick}
            disabled={loading}
            size="small"
            sx={{
              color: isSubscribed ? "var(--color-primary)" : "#6b7280",
              padding: "2px",
              "&:hover": { color: "var(--color-primary)" },
            }}
          >
            {isSubscribed ? (
              <Notifications sx={{ fontSize: 16 }} />
            ) : (
              <NotificationsNone sx={{ fontSize: 16 }} />
            )}
          </IconButton>
        </span>
      </Tooltip>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { backgroundColor: "var(--color-secondary)", color: "#fff" },
        }}
      >
        <DialogTitle
          className="flex justify-between items-center text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {isUnsubscribeModal
            ? `Desuscribirse de ${teamName}`
            : `Suscribirse a ${teamName}`}
          <Close
            onClick={() => setModalOpen(false)}
            className="cursor-pointer"
            sx={{ fontSize: 20 }}
          />
        </DialogTitle>
        <DialogContent sx={{ pt: "16px !important" }}>
          <p className="text-sm text-gray-400 mb-3">
            {isUnsubscribeModal
              ? "Ingresá el email con el que te suscribiste para poder desuscribirte."
              : "Ingresá tu email para recibir novedades de este equipo."}
          </p>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
            error={!!emailError}
            helperText={emailError}
            onKeyDown={(e) => e.key === "Enter" && handleModalSubmit()}
            autoFocus
            size="small"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                "& fieldset": { borderColor: "#444" },
                "&:hover fieldset": { borderColor: "#666" },
                "&.Mui-focused fieldset": { borderColor: "var(--color-primary)" },
              },
              "& .MuiInputLabel-root": { color: "#9ca3af" },
              "& .MuiInputLabel-root.Mui-focused": { color: "var(--color-primary)" },
              "& .MuiFormHelperText-root": { color: "#f87171" },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, backgroundColor: "var(--color-secondary)" }}>
          <Button
            onClick={() => setModalOpen(false)}
            size="small"
            sx={{ color: "#9ca3af" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleModalSubmit}
            variant="contained"
            disabled={loading}
            size="small"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            {isUnsubscribeModal ? "Desuscribirme" : "Suscribirme"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
