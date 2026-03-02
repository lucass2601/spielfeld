import { DateTime } from "luxon";

export const formatDateTime = (
  isoString: string,
  format: string = "LLL d, yyyy",
) => {
  const userTimeZone = DateTime.local().zoneName;
  return DateTime.fromISO(isoString, { zone: "utc" })
    .setZone(userTimeZone)
    .toFormat(format);
};
