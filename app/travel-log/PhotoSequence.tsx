import type { TripPhoto } from "./trip-data";
import styles from "./travel-log.module.css";

const sizeClassMap: Record<TripPhoto["size"], string> = {
  xs: styles.sizeXs,
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
  full: styles.sizeFull,
};

function Photo({ photo }: { photo: TripPhoto }) {
  return (
    <figure
      className={[styles.photo, styles[photo.layout], sizeClassMap[photo.size]].join(" ")}
      data-photo-size={photo.size}
      data-placeholder-note={photo.placeholder ? photo.replacementNote : undefined}
    >
      {photo.src ? (
        <img
          src={photo.src}
          alt={photo.alt}
          width="1400"
          height="980"
          loading="lazy"
          decoding="async"
          style={{ objectPosition: photo.objectPosition, objectFit: photo.objectFit }}
        />
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
  return (
    <div className={styles.photoSequence} data-reveal>
      {buildPhotoBlocks(photos).map((block, blockIndex) => (
        <div className={styles.photoBlock} data-count={block.length} key={`photo-block-${blockIndex}`}>
          {block.map((photo, photoIndex) => (
            <Photo key={`${photo.src ?? photo.placeholderLabel}-${photoIndex}`} photo={photo} />
          ))}
        </div>
      ))}
    </div>
  );
}
