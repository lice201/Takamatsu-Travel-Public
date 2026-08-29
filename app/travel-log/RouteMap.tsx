import {
  modeLabels,
  overviewLegs,
  overviewStops,
  type MapStop,
  type TransportMode,
  type TripLeg,
} from "./trip-data";
import styles from "./travel-log.module.css";
import timelineStyles from "./timeline.module.css";
import { ModeIcon } from "./ModeIcon";

const segmentClass: Record<TransportMode, string> = {
  walk: "segmentWalk",
  bicycle: "segmentBicycle",
  bus: "segmentBus",
  train: "segmentTrain",
  ferry: "segmentFerry",
  flight: "segmentFlight",
  shopping: "segmentShopping",
};

export function RouteMap({ stops, legs, compact = false }: { stops?: MapStop[]; legs?: TripLeg[]; compact?: boolean }) {
  const points = stops ?? overviewStops;
  const routeLegs = legs ?? overviewLegs;
  const modes = [...new Set(routeLegs.map((leg) => leg.mode))];
  const markers = points.filter(
    (point, index) => points.findIndex((candidate) => candidate.mapX === point.mapX && candidate.mapY === point.mapY) === index,
  );

  return (
    <figure className={`${styles.routeMap} ${compact ? styles.compactMap : ""}`} aria-label={compact ? "이날의 실제 이동 경로" : "3박 4일 전체 실제 이동 경로"}>
      <svg viewBox="0 0 100 100" role="img" aria-labelledby={compact ? undefined : "overview-map-title overview-map-desc"}>
        {!compact && <title id="overview-map-title">다카마쓰 여행 전체 실제 경로</title>}
        {!compact && <desc id="overview-map-desc">다카마쓰, 쇼도시마, 리쓰린, 고토히라, 마루가메, 붓쇼잔, 유메타운, 다카마쓰공항을 이동수단별 선으로 잇는 실제 여행 지도</desc>}
        <path className={styles.coast} d="M-8 6 C12 4 16 14 30 14 S49 4 59 12 75 14 108 3 L108-10-8-10Z" />
        <path className={styles.island} d="M41 18 C53 12 74 17 82 27 S76 42 61 42 42 35 41 18Z" />
        <path className={styles.shikoku} d="M-8 58 C15 48 34 53 49 49 S72 42 108 50 L108 108-8 108Z" />
        {points.slice(0, -1).map((point, index) => {
          const next = points[index + 1];
          const mode = routeLegs[index]?.mode ?? "walk";
          return (
            <line
              key={`${point.name}-${next.name}-${index}`}
              className={`${timelineStyles.routeSegment} ${timelineStyles[segmentClass[mode]]}`}
              x1={point.mapX}
              y1={point.mapY}
              x2={next.mapX}
              y2={next.mapY}
            />
          );
        })}
        {markers.map((stop, index) => (
          <g key={`${stop.name}-${stop.mapX}-${stop.mapY}`} transform={`translate(${stop.mapX} ${stop.mapY})`}>
            <circle className={styles.markerHalo} r={stop.mapEmphasis === "primary" ? "5.4" : stop.mapEmphasis === "terminal" ? "3.5" : "4.2"} />
            <circle className={styles.marker} r={stop.mapEmphasis === "primary" ? "2.7" : stop.mapEmphasis === "terminal" ? "1.7" : "2.1"} />
            <text className={styles.markerIndex} x="0" y="0.8" textAnchor="middle">{index + 1}</text>
          </g>
        ))}
      </svg>
      <figcaption>
        <span>{compact ? "ACTUAL DAY ROUTE" : "ACTUAL ROUTE · 24–27 AUG 2026"}</span>
        <span className={timelineStyles.mapLegend} aria-label="지도 이동수단 범례">
          {modes.map((mode) => <b key={mode} className={timelineStyles[`legend${modeLabels[mode]}`]}><ModeIcon mode={mode} />{modeLabels[mode]}</b>)}
        </span>
        {!compact && (
          <ol className={styles.mapPlaceLegend} aria-label="지도 장소 번호">
            {markers.map((stop, index) => <li key={`${stop.name}-${stop.mapX}-${stop.mapY}`}><b>{index + 1}</b><span>{stop.name}</span></li>)}
          </ol>
        )}
      </figcaption>
    </figure>
  );
}
