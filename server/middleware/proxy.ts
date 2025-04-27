import { defineEventHandler, proxyRequest, getRequestURL, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  const query = getQuery<URLSearchParams>(event);

  const pathPrefixes = ["/saas-aimall-", "/saas-plugin-"];
  if (pathPrefixes.some(prefix => url.pathname.startsWith(prefix))) {
    const target =
      useRuntimeConfig().public.BACKEND_API || "http://10.233.90.164:9999";
    let targetUrl = `${target}${url.pathname}`;
    if (Object.keys(query).length > 0) {
      const queryString = new URLSearchParams(query).toString();
      targetUrl += `?${queryString}`;
    }
    return await proxyRequest(event, targetUrl);
  }
  return;
});
