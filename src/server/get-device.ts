import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export const getDevice = async () => {
  const header = await headers();
  const userAgent = header.get("user-agent");
  if (userAgent) {
    const uaParser = new UAParser(userAgent);
    return uaParser.getDevice().type === "mobile";
  }
  return;
};
