const API_BASE =
  process.env.API_PROXY_TARGET || "https://dev.homecare.mcabee.in/api/admin";

const forwardHeaders = ["authorization", "content-type", "accept"];

async function proxyRequest(request, context) {
  const { path = [] } = await context.params;
  const targetUrl = `${API_BASE}/${path.join("/")}${request.nextUrl.search}`;

  const headers = new Headers();
  for (const name of forwardHeaders) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }

  if (!headers.has("accept")) {
    headers.set("accept", "application/json");
  }

  const init = {
    method: request.method,
    headers,
    cache: "no-store",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.text();
  }

  const response = await fetch(targetUrl, init);
  const body = await response.text();

  return new Response(body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") || "application/json",
    },
  });
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
