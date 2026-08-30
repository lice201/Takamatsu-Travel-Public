"use client";

import { useEffect, useState } from "react";
import { withBasePath } from "../site-paths";
import styles from "./day-navigation.module.css";

const navigationItems = [
  { id: "day-1", desktopLabel: "DAY 1", mobileLabel: "01" },
  { id: "day-2", desktopLabel: "DAY 2", mobileLabel: "02" },
  { id: "day-3", desktopLabel: "DAY 3", mobileLabel: "03" },
  { id: "day-4", desktopLabel: "DAY 4", mobileLabel: "04" },
  { id: "theme-yadon", desktopLabel: "YADON", mobileLabel: "Y" },
] as const;

export function DayNavigation() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => Math.abs(left.boundingClientRect.top) - Math.abs(right.boundingClientRect.top))[0];
        if (activeEntry) setActiveId(activeEntry.target.id);
      },
      { rootMargin: "-18% 0px -72% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function handleNavigation(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const section = document.getElementById(id);
    if (!section) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  }

  return (
    <nav className={styles.navigation} aria-label="날짜별 빠른 이동">
      <a className={styles.planLink} href={withBasePath("/plan/")} aria-label="기존 여행계획 페이지로 이동">← PLAN</a>
      <div className={styles.dayLinks}>
        {navigationItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={styles.dayLink}
            data-active={activeId === item.id ? "true" : undefined}
            aria-current={activeId === item.id ? "location" : undefined}
            onClick={(event) => handleNavigation(event, item.id)}
          >
            <span className={styles.desktopLabel}>{item.desktopLabel}</span>
            <span className={styles.mobileLabel}>{item.mobileLabel}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
