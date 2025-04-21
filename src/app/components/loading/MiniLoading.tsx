"use client";
import Image from "next/image";
import styles from "./LoadingScreenMini.module.css";

export default function MiniLoading() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}></div>
        <div className={styles.imageContainer}>
          <Image
            src={"/assets/logo_2025.png"}
            alt={"LIGA CUBB 2025"}
            width={15}
            height={15}
          />
        </div>
      </div>
    </div>
  );
}
