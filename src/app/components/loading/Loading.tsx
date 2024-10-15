"use client";
import Image from "next/image";
import styles from "./LoadingScreen.module.css"; // Importamos los estilos

export default function LoadingScreen() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}>
        <Image
          src={"/assets/liga_cubb_logo_v2.png"}
          alt={"LIGA CUBB 2024"}
          width={200}
          height={100}
        />
      </div>
    </div>
  );
}
