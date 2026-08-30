"use client";

import { useEffect, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import styles from "./photo-lightbox.module.css";

export type LightboxPhoto = {
  src: string;
  alt: string;
  caption: string;
};

type PhotoLightboxProps = {
  photos: LightboxPhoto[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
};

export function PhotoLightbox({ photos, activeIndex, onIndexChange, onClose, returnFocusRef }: PhotoLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const photo = photos[activeIndex];
  const photoCount = photos.length;

  useEffect(() => {
    const returnFocus = returnFocusRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      returnFocus?.focus();
    };
  }, [returnFocusRef]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onIndexChange((activeIndex - 1 + photoCount) % photoCount);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onIndexChange((activeIndex + 1) % photoCount);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, onClose, onIndexChange, photoCount]);

  if (!photo) return null;

  return createPortal(
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label="사진 크게 보기"
      ref={dialogRef}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button className={styles.closeButton} type="button" aria-label="사진 닫기" onClick={onClose} ref={closeButtonRef}>
        <span aria-hidden="true">×</span>
      </button>
      <div className={styles.content}>
        <img src={photo.src} alt={photo.alt} width="1800" height="1260" decoding="async" />
        <div className={styles.details}>
          <span className={styles.counter}>{String(activeIndex + 1).padStart(2, "0")} / {String(photoCount).padStart(2, "0")}</span>
          {photo.caption && <p>{photo.caption}</p>}
        </div>
      </div>
      <button
        className={`${styles.arrowButton} ${styles.previousButton}`}
        type="button"
        aria-label="이전 사진"
        onClick={() => onIndexChange((activeIndex - 1 + photoCount) % photoCount)}
      >
        <span aria-hidden="true">←</span>
      </button>
      <button
        className={`${styles.arrowButton} ${styles.nextButton}`}
        type="button"
        aria-label="다음 사진"
        onClick={() => onIndexChange((activeIndex + 1) % photoCount)}
      >
        <span aria-hidden="true">→</span>
      </button>
    </div>,
    document.body,
  );
}
