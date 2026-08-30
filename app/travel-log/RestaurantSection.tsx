import type { MealStop } from "./trip-data";
import { PhotoSequence } from "./PhotoSequence";
import styles from "./travel-log.module.css";

function visibleText(value?: string) {
  const text = value?.trim();
  return text && text !== "—" ? text : undefined;
}

export function RestaurantSection({ meal }: { meal: MealStop }) {
  const restaurantName = visibleText(meal.restaurantName);
  const displayTitle = restaurantName ?? visibleText(meal.title);
  if (!displayTitle) return null;

  const branchName = visibleText(meal.branchName);
  const subtitle = visibleText(meal.subtitle);
  const location = visibleText(meal.location);
  const time = visibleText(meal.time);
  const review = visibleText(meal.review);
  const overallReview = visibleText(meal.overallReview);
  const note = visibleText(meal.note);
  const menu = meal.menu?.filter((item) => item.trim()) ?? [];
  const detailCount = Number(menu.length > 0) + Number(Boolean(review));

  return (
    <section className={styles.mealSection} aria-label={`${meal.label} · ${displayTitle}`} data-reveal>
      <header className={styles.mealHeader}>
        <p>FOOD / {meal.label}</p>
        <div>
          <h4>{displayTitle}</h4>
          {(branchName || subtitle) && <p className={styles.mealIdentity}>{branchName && <strong>{branchName}</strong>}{subtitle && <span>{subtitle}</span>}</p>}
          {(location || time) && (
            <dl className={styles.mealMeta}>
              {location && <div><dt>LOCATION</dt><dd>{location}</dd></div>}
              {time && <div><dt>TIME</dt><dd>{time}</dd></div>}
            </dl>
          )}
        </div>
      </header>
      {detailCount > 0 && (
        <div className={styles.mealNotes} data-columns={detailCount}>
          {menu.length > 0 && <div><b>MENU</b><ul>{menu.map((item) => <li key={item}>{item}</li>)}</ul></div>}
          {review && <div><b>REVIEW</b><blockquote>{review}</blockquote></div>}
        </div>
      )}
      {note && <p className={styles.mealNote}>{note}</p>}
      {meal.photos.length > 0 && <PhotoSequence photos={meal.photos} />}
      {overallReview && (
        <section className={styles.overallReviewBox} aria-label="전체적인 후기">
          <p className={styles.overallReviewLabel}>OVERALL REVIEW</p>
          <p className={styles.overallReviewText}>{overallReview}</p>
        </section>
      )}
    </section>
  );
}
