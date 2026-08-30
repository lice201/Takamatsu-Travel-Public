"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { TripPhoto } from "./trip-data";
import { PhotoLightbox, type LightboxPhoto } from "./PhotoLightbox";
import styles from "./travel-log.module.css";

const sizeClassMap: Record<TripPhoto["size"], string> = {
  xs: styles.sizeXs,
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
  full: styles.sizeFull,
};

function Photo({ photo, onOpen }: { photo: TripPhoto; onOpen?: (trigger: HTMLButtonElement) => void }) {
  return (
    <figure
      className={[styles.photo, styles[photo.layout], sizeClassMap[photo.size]].join(" ")}
      data-photo-size={photo.size}
      data-placeholder-note={photo.placeholder ? photo.replacementNote : undefined}
    >
      {photo.src ? (
        <button
          className={styles.photoButton}
          type="button"
          aria-label={`사진 크게 보기: ${photo.alt}`}
          onClick={(event) => onOpen?.(event.currentTarget)}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            width="1400"
            height="980"
            loading="lazy"
            decoding="async"
            style={{ objectPosition: photo.objectPosition, objectFit: photo.objectFit }}
          />
        </button>
      ) : (
        <div className={styles.textPhotoPlaceholder} role="img" aria-label={photo.alt}>
          <span>{photo.placeholderLabel ?? "PHOTO"}</span>
        </div>
      )}
      {(photo.caption || photo.placeholder) && <figcaption><span>{photo.caption}</span>{photo.placeholder && <small>PLACEHOLDER</small>}</figcaption>}
    </figure>
  );
}

export const MAX_PHOTOS_PER_BLOCK = 3;

export function buildPhotoBlocks(photos: TripPhoto[]) {
  const grouped: TripPhoto[][] = [];
  let activeKey: string | undefined;

  photos.forEach((photo, index) => {
    const key = photo.group === undefined ? `auto-${Math.floor(index / MAX_PHOTOS_PER_BLOCK)}` : `group-${photo.group}`;
    if (key !== activeKey) {
      grouped.push([]);
      activeKey = key;
    }
    grouped.at(-1)?.push(photo);
  });

  return grouped.flatMap((group) => {
    const blocks: TripPhoto[][] = [];
    for (let index = 0; index < group.length; index += MAX_PHOTOS_PER_BLOCK) {
      blocks.push(group.slice(index, index + MAX_PHOTOS_PER_BLOCK));
    }
    return blocks;
  });
}

export function PhotoSequence({ photos }: { photos: TripPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const lightboxPhotos = useMemo(
    () => photos.filter((photo): photo is TripPhoto & LightboxPhoto => Boolean(photo.src)),
    [photos],
  );
  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  function openPhoto(photo: TripPhoto, trigger: HTMLButtonElement) {
    const index = lightboxPhotos.indexOf(photo as TripPhoto & LightboxPhoto);
    if (index < 0) return;
    returnFocusRef.current = trigger;
    setActiveIndex(index);
  }

  return (
    <>
      <div className={styles.photoSequence} data-reveal>
        {buildPhotoBlocks(photos).map((block, blockIndex) => (
          <div className={styles.photoBlock} data-count={block.length} key={`photo-block-${blockIndex}`}>
            {block.map((photo, photoIndex) => (
              <Photo key={`${photo.src ?? photo.placeholderLabel}-${photoIndex}`} photo={photo} onOpen={(trigger) => openPhoto(photo, trigger)} />
            ))}
          </div>
        ))}
      </div>
      {activeIndex !== null && (
        <PhotoLightbox
          photos={lightboxPhotos}
          activeIndex={activeIndex}
          onIndexChange={setActiveIndex}
          onClose={closeLightbox}
          returnFocusRef={returnFocusRef}
        />
      )}
    </>
  );
}
