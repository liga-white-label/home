"use client";
import Image from "next/image";
import styles from "./LoadingScreen.module.css"; // Importamos los estilos

export default function LoadingScreen() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}></div>
        <div className={styles.imageContainer}>
          <Image
            src={"/assets/logo_2025.png"}
            alt={"LIGA CUBB 2025"}
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
