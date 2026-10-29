/**
 * Phone and appointment hours, matching the Google Business Profile.
 * Update CLOSED_DATES each year (NSW public holidays and the Christmas break),
 * and keep the Business Profile's special hours in step.
 */

export const HOURS = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "10:30",
  closes: "20:00",
  label: "Monday to Friday, 10:30am to 8pm",
  short: "Mon–Fri 10:30am–8pm",
};

/* Sydney dates (YYYY-MM-DD) when we're closed on a weekday */
export const CLOSED_DATES = [
  "2026-12-24",
  "2026-12-25",
  "2026-12-28",
  "2026-12-29",
  "2026-12-30",
  "2026-12-31",
  "2027-01-01",
  "2027-01-26",
];

const OPEN_MINUTES = 10 * 60 + 30;
const CLOSE_MINUTES = 20 * 60;

function sydneyParts(date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-AU", {
      timeZone: "Australia/Sydney",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      weekday: "long",
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );
  return {
    iso: `${parts.year}-${parts.month}-${parts.day}`,
    weekday: parts.weekday,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  };
}

function isOpenDay(iso, weekday) {
  return HOURS.days.includes(weekday) && !CLOSED_DATES.includes(iso);
}

/**
 * Where we are right now in Sydney time, for the "Open now" line.
 * Returns { open, today, text }, where today is the Sydney weekday name.
 */
export function getOpenStatus(now = new Date()) {
  const { iso, weekday, minutes } = sydneyParts(now);

  if (isOpenDay(iso, weekday)) {
    if (minutes >= OPEN_MINUTES && minutes < CLOSE_MINUTES) {
      return { open: true, today: weekday, text: "Open now · until 8pm" };
    }
    if (minutes < OPEN_MINUTES) {
      return { open: false, today: weekday, text: "Closed now · opens 10:30am today" };
    }
  }

  for (let i = 1; i <= 14; i += 1) {
    const next = sydneyParts(new Date(now.getTime() + i * 86400000));
    if (isOpenDay(next.iso, next.weekday)) {
      const when = i === 1 ? "tomorrow" : next.weekday;
      return { open: false, today: weekday, text: `Closed now · opens 10:30am ${when}` };
    }
  }
  return { open: false, today: weekday, text: `Closed now · ${HOURS.short}` };
}
