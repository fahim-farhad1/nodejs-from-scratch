import type { ServerResponse } from "http";

export const sendResponse = (
  res: ServerResponse,
  success: boolean,
  statusCode: number,
  message: string,
  data?: any,
) => {
  res.writeHead(statusCode, { "content-type": "application/json" }).end(
    JSON.stringify({
      success: success,
      message: message,
      data: data,
    }),
  );
};
