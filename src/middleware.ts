import { NextResponse, NextRequest } from 'next/server';

// List of social media and search engine bots
const CRAWLER_USER_AGENTS = [
  'facebookexternalhit',
  'Facebot',
  'LinkedInBot',
  'Twitter',
  'Twitterbot',
  'Pinterest',
  'Googlebot',
  'bingbot',
  'Baiduspider',
  'YandexBot',
  'Slurp',
  'DuckDuckBot',
  'Discordbot',
  'WhatsApp',
  'Slackbot',
  'Telegrambot',
];

// Checks if the request is from a crawler
function isCrawler(userAgent: string): boolean {
  if (!userAgent) return false;

  return CRAWLER_USER_AGENTS.some(crawler =>
    userAgent.toLowerCase().includes(crawler.toLowerCase())
  );
}

// This function gets the HTML page name based on the URL path
function getStaticHtmlPage(pathname: string): string | null {
  // Make sure we have a pathname
  if (!pathname) return null;

  // Handle root path
  if (pathname === '/') {
    return '/index.html';
  }

  // Handle direct paths
  if (['/about', '/contact', '/privacy', '/articles'].includes(pathname)) {
    return `${pathname}.html`;
  }

  // Handle article paths
  const articleMatch = pathname.match(/^\/articles\/(.+)$/);
  if (articleMatch) {
    const slug = articleMatch[1];
    return `/${slug}.html`;
  }

  return null;
}

export function middleware(request: NextRequest) {
  try {
    const userAgent = request.headers.get('user-agent') || '';

    // Check if this is a crawler
    if (isCrawler(userAgent)) {
      const staticHtmlPage = getStaticHtmlPage(request.nextUrl.pathname);

      if (staticHtmlPage) {
        // For Netlify - use rewrite
        const url = request.nextUrl.clone();
        url.pathname = staticHtmlPage;
        return NextResponse.rewrite(url);
      }
    }
  } catch (error) {
    console.error('Middleware error:', error);
  }

  // For normal users, just continue
  return NextResponse.next();
}

// Define the matcher for the middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.js$|.*\\.css$|.*\\.svg$).*)'],
};
