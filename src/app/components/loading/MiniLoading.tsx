"use client";
import Image from "next/image";
import styles from "./LoadingScreenMini.module.css";
import { tenantConfig } from "@/config/tenant";

export default function MiniLoading() {
  const { logoPath, name } = tenantConfig.brand;
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}></div>
        <div className={styles.imageContainer}>
          <Image
            src={logoPath}
            alt={name}
            width={15}
            height={15}
          />
        </div>
      </div>
    </div>
  );
}
