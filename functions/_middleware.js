// This middleware ensures that SPA routes work correctly
export async function onRequest(context) {
  // Get the pathname
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // If the request is for an HTML file other than index.html or has a file extension (except .html)
  // just let Cloudflare handle it normally
  if (pathname.includes('.') && !pathname.endsWith('.html')) {
    return context.next();
  }

  // Otherwise, we handle all other requests as potential SPA routes
  // Cloudflare will automatically look for index.html in "out" or "static"
  // directory and serve it
  return context.next();
}
