import type { Metadata } from "next";
import { RevealObserver } from "./RevealObserver";
import { RouteMap } from "./RouteMap";
import { PhotoSequence } from "./PhotoSequence";
import { RestaurantSection } from "./RestaurantSection";
import { ModeIcon } from "./ModeIcon";
import { withBasePath } from "../site-paths";
import { modeLabels, tripDays, tripStats, tripThemes, type ThemeSection, type TripLeg, type TripStop } from "./trip-data";
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

function StopContent({ stop }: { stop: TripStop }) {
  const insertions = [
    ...(stop.meals ?? []).map((meal, index) => ({
      kind: "meal" as const,
      index,
      insertAt: Math.min(Math.max(meal.insertAt ?? stop.photos.length, 0), stop.photos.length),
      order: 10,
      meal,
    })),
    ...(stop.interstitialLegs ?? []).map((insertion, index) => ({
      kind: "leg" as const,
      index,
      insertAt: Math.min(Math.max(insertion.insertAt, 0), stop.photos.length),
      order: insertion.order ?? 20,
      leg: insertion.leg,
    })),
  ].sort((left, right) => left.insertAt - right.insertAt || left.order - right.order || left.index - right.index);
  const sections: React.ReactNode[] = [];
  let photoStart = 0;
  let insertionStart = 0;

  while (insertionStart < insertions.length) {
    const insertAt = insertions[insertionStart].insertAt;
    if (insertAt > photoStart) {
      sections.push(<PhotoSequence key={`photos-${photoStart}-${insertAt}`} photos={stop.photos.slice(photoStart, insertAt)} />);
    }
    while (insertionStart < insertions.length && insertions[insertionStart].insertAt === insertAt) {
      const insertion = insertions[insertionStart];
      if (insertion.kind === "meal") {
        sections.push(<RestaurantSection key={`meal-${insertion.index}-${insertion.meal.restaurantName ?? insertion.meal.title ?? insertion.meal.label}`} meal={insertion.meal} />);
      } else {
        sections.push(<Transfer key={`leg-${insertion.index}-${insertion.leg.from}-${insertion.leg.to}`} leg={insertion.leg} />);
      }
      insertionStart += 1;
    }
    photoStart = insertAt;
  }

  if (photoStart < stop.photos.length) {
    sections.push(<PhotoSequence key={`photos-${photoStart}-end`} photos={stop.photos.slice(photoStart)} />);
  }

  return sections;
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
          <h1> 3박 4일간 우리의 추억</h1>
          <div><time dateTime="2026-08-24">24</time><span>—</span><time dateTime="2026-08-27">27 AUG 2026</time></div>
          <small>Japan : Kagawa · Shodoshima</small>
        </div>

      </header>

      <section className={styles.overview} id="trip-overview" aria-labelledby="overview-title">
        <div className={styles.sectionIntro} data-reveal>
          <p>TRIP OVERVIEW</p>
          <h2 id="overview-title">바다를 오간<br />나흘동안의 경로</h2>
          <span>Google Maps 타임라인을 바탕으로 다카마쓰공항, 쇼도시마, 리쓰린, 고토히라, 마루가메, 붓쇼잔과 마지막 날의 유메타운을 이어 정리했습니다.</span>
        </div>
        <div className={styles.overviewMapWrap} data-reveal><RouteMap /></div>
        <dl className={styles.stats}>{tripStats.map((stat) => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}</dl>
      </section>

      <aside className={styles.draftNote} aria-label="여행 기록 기준" data-reveal>
        <span>FIELD NOTES / ACTUAL ROUTE</span>
        <p>2026년 8월 24–27일의 실제 이동 기록에서 의미 있는 방문지와 이동 구간만 추렸습니다. 메인 식사의 경우 식당 위치와 이름을 포함하여 따로 섹션으로 분리하였으며, 짧은 환승과 확인되지 않은 상점·식당은 제외했습니다. </p>
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
                  <StopContent stop={stop} />
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
