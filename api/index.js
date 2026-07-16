import app from "../backend/src/app.js";

export default function handler(
  req,
  res
) {
  const requestUrl = new URL(
    req.url,
    "http://localhost"
  );

  const apiPath =
    requestUrl.searchParams.get(
      "__apiPath"
    ) || "";

  requestUrl.searchParams.delete(
    "__apiPath"
  );

  const remainingQuery =
    requestUrl.searchParams.toString();

  req.url = `/api/${apiPath}${
    remainingQuery
      ? `?${remainingQuery}`
      : ""
  }`;

  return app(req, res);
}