import dayjs from "dayjs";

export const dateFormat = (
  val: number | string,
  formatter = "YYYY-MM-DD HH:mm"
) => dayjs(typeof val === "number" ? val * 1000 : val).format(formatter);
