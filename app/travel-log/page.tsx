import type { Metadata } from "next";
import { RevealObserver } from "./RevealObserver";
import { RouteMap } from "./RouteMap";
import { ModeIcon } from "./ModeIcon";
import { withBasePath } from "../site-paths";
import { modeLabels, tripDays, tripStats, tripThemes, type MealStop, type ThemeSection, type TripLeg, type TripPhoto } from "./trip-data";
import styles from "./travel-log.module.css";
import timelineStyles from "./timeline.module.css";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Takamatsu Travel Log | 3 Nights / 4 Days",
  description: "실제 이동 기록을 바탕으로 정리한 2026년 8월 다카마쓰·쇼도시마 3박 4일 여행기",
  openGraph: {
    title: "Takamatsu Travel Log",
    description: "24–27 August 2026 · Kagawa & Shodoshima",
    images: [{ url: withBasePath("/og-v12.png"), width: 1200, height: 630, alt: "다카마쓰 3박 4일 여행 기록" }],
  },
};

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

const MAX_PHOTOS_PER_BLOCK = 3;

function buildPhotoBlocks(photos: TripPhoto[]) {
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

function PhotoSequence({ photos }: { photos: TripPhoto[] }) {
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

function ThemeGallery({ theme }: { theme: ThemeSection }) {
  return (
    <section className={styles.themeSection} aria-label={theme.label} data-reveal>
      <header className={styles.themeIntro}>
        <p>{theme.label}</p>
        <div><h3>{theme.title}</h3><span>{theme.note}</span></div>
      </header>
      <PhotoSequence photos={theme.photos} />
    </section>
  );
}

function MealSection({ meal }: { meal: MealStop }) {
  return (
    <section className={styles.mealSection} aria-label={`${meal.label} · ${meal.restaurantName}`} data-reveal>
      <header className={styles.mealHeader}>
        <p>FOOD / {meal.label}</p>
        <div>
          <span>{meal.time ?? "—"}{meal.location ? ` · ${meal.location}` : ""}</span>
          <h4>{meal.restaurantName}</h4>
        </div>
      </header>
      <div className={styles.mealNotes}>
        <div>
          <b>MENU</b>
          {meal.menu.length > 0 ? <ul>{meal.menu.map((item) => <li key={item}>{item}</li>)}</ul> : <p>TODO · ADD ORDERED MENU</p>}
        </div>
        <div>
          <b>REVIEW</b>
          {meal.review ? <blockquote>{meal.review}</blockquote> : <p>TODO · ADD RESTAURANT REVIEW</p>}
        </div>
      </div>
      {meal.photos.length > 0 && <PhotoSequence photos={meal.photos} />}
    </section>
  );
}

function LegTime({ leg, className }: { leg: TripLeg; className?: string }) {
  if (!leg.startTime && !leg.endTime) return <span className={className}>TIME —</span>;
  return <span className={className}>{leg.startTime ?? "—"} — {leg.endTime ?? "—"}</span>;
}

function Transfer({ leg }: { leg: TripLeg }) {
  return (
    <div className={timelineStyles.transfer} aria-label={`${leg.from}에서 ${leg.to}까지 ${modeLabels[leg.mode]} 이동`}>
      <div className={timelineStyles.transferRail} aria-hidden="true"><i /></div>
      <div className={timelineStyles.transferBody}>
        <div className={timelineStyles.transferHeader}>
          <span className={timelineStyles.modeBadge}><ModeIcon mode={leg.mode} /><strong>{modeLabels[leg.mode]}</strong></span>
          <LegTime leg={leg} className={timelineStyles.transferTime} />
        </div>
        <p>{leg.from} → {leg.to}</p>
      </div>
    </div>
  );
}

export default function TravelLogPage() {
  return (
    <main className={styles.travelLog}>
      <RevealObserver />
      <a className={styles.skipLink} href="#trip-overview">여행 개요로 건너뛰기</a>
      <nav className={styles.logNav} aria-label="여행 기록 내비게이션">
        <a href={withBasePath("/plan/")} aria-label="기존 여행계획 페이지로 이동">← PLAN</a>
        <div>{tripDays.map((day) => <a key={day.day} href={`#day-${day.day}`}>D{day.day}</a>)}</div>
      </nav>

      <header className={styles.hero}>
        <img src={withBasePath("/travel-log/day2/day2-03.jpg")} alt="쇼도시마행 페리에서 바라본 세토내해" width="2400" height="1800" fetchPriority="high" decoding="async" />
        <div className={styles.heroShade} />
        <div className={styles.heroMeta}><span>TRAVEL LOG</span><span>01 — 04</span></div>
        <div className={styles.heroCopy}>
          <p>TAKAMATSU</p>
          <h1>3 NIGHTS<br />/ 4 DAYS</h1>
          <div><time dateTime="2026-08-24">24</time><span>—</span><time dateTime="2026-08-27">27 AUG 2026</time></div>
          <small>Japan · Kagawa · Shodoshima</small>
        </div>

      </header>

      <section className={styles.overview} id="trip-overview" aria-labelledby="overview-title">
        <div className={styles.sectionIntro} data-reveal>
          <p>TRIP OVERVIEW</p>
          <h2 id="overview-title">바다를 오간<br />나흘의 경로</h2>
          <span>실제 이동 기록을 바탕으로 다카마쓰공항, 쇼도시마, 리쓰린, 고토히라, 마루가메, 붓쇼잔과 마지막 날의 유메타운을 이어 정리했습니다.</span>
        </div>
        <div className={styles.overviewMapWrap} data-reveal><RouteMap /></div>
        <dl className={styles.stats}>{tripStats.map((stat) => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}</dl>
      </section>

      <aside className={styles.draftNote} aria-label="여행 기록 기준" data-reveal>
        <span>FIELD NOTES / ACTUAL ROUTE</span>
        <p>2026년 8월 24–27일의 실제 이동 기록에서 의미 있는 방문지와 이동 구간만 추렸습니다. 짧은 환승과 확인되지 않은 상점·식당은 제외했습니다. 사진 126장을 연결했으며, <strong>—</strong>로 표시된 전체 거리는 추가 검증 전까지 비워 둡니다.</p>
      </aside>

      <section className={styles.days} aria-label="날짜별 실제 여행 기록">
        {tripDays.map((day) => (
          <article className={styles.day} id={`day-${day.day}`} key={day.day} aria-labelledby={`day-${day.day}-title`}>
            <header className={styles.dayHeader} data-reveal>
              <div className={styles.dayNumber}><span>DAY</span><strong>{String(day.day).padStart(2, "0")}</strong></div>
              <div className={styles.dayTitle}>
                <time dateTime={day.date}>{day.displayDate} · 2026</time>
                {day.eyebrow && <b className={styles.dayEyebrow}>{day.eyebrow}</b>}
                <p>{day.area}</p>
                <h2 id={`day-${day.day}-title`}>{day.title}</h2>
                <span>{day.summary}</span>
                {day.contextLegs && (
                  <div className={timelineStyles.contextLegs} aria-label="이날의 항공 이동">
                    {day.contextLegs.map((leg) => (
                      <div key={`${leg.from}-${leg.to}`}>
                        <span className={timelineStyles.modeBadge}><ModeIcon mode={leg.mode} /><b>{modeLabels[leg.mode]}</b></span>
                        <span>{leg.from} → {leg.to}</span>
                        <LegTime leg={leg} className={timelineStyles.contextTime} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <RouteMap stops={day.stops} legs={day.legs} compact />
            </header>

            <div className={`${styles.stopList} ${timelineStyles.timelineStopList}`}>
              {day.stops.map((stop, stopIndex) => (
                <section className={styles.stop} key={`${day.day}-${stop.name}-${stopIndex}`} aria-labelledby={`day-${day.day}-stop-${stopIndex}`}>
                  <div className={styles.stopMeta} data-reveal>
                    <span>{String(stopIndex + 1).padStart(2, "0")}</span>
                    <div>
                      <time>{stop.time}</time>
                      <h3 id={`day-${day.day}-stop-${stopIndex}`}>{stop.name}</h3>
                      <p>{stop.note}</p>
                      <small>{stop.lat.toFixed(4)}° N · {stop.lng.toFixed(4)}° E</small>
                    </div>
                  </div>
                  {stop.photos.length > 0 && (
                    <PhotoSequence photos={stop.photos} />
                  )}
                  {stop.meal && <MealSection meal={stop.meal} />}
                  {day.legs[stopIndex] && <Transfer leg={day.legs[stopIndex]} />}
                </section>
              ))}
            </div>
            {day.themes?.map((theme) => <ThemeGallery key={theme.label} theme={theme} />)}
          </article>
        ))}
      </section>

      {tripThemes.map((theme) => <ThemeGallery key={theme.label} theme={theme} />)}

      <footer className={styles.epilogue} data-reveal>
        <img src={withBasePath("/travel-log/day4/day4-24.jpg")} alt="귀국편 비행기에서 바라본 세토내해" width="1800" height="2400" loading="lazy" decoding="async" />
        <div className={styles.epilogueShade} />
        <div><p>SEE YOU AGAIN,</p><h2>TAKAMATSU.</h2><span>AUGUST 2026</span></div>

      </footer>
    </main>
  );
}
