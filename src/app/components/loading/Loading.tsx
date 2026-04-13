"use client";
import Image from "next/image";
import styles from "./LoadingScreen.module.css";
import { tenantConfig } from "@/config/tenant";

export default function LoadingScreen() {
  const { logoPath, name } = tenantConfig.brand;
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}></div>
        <div className={styles.imageContainer}>
          <Image
            src={logoPath}
            alt={name}
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
