import { DateTime } from "luxon";

export const formatDateTime = (isoString, format = "LLL d, t") => {
  const userTimeZone = DateTime.local().zoneName;
  return DateTime.fromISO(isoString, { zone: "utc" })
    .setZone(userTimeZone)
    .toFormat(format);
};
