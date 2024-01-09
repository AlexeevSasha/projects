import { NextResponse, type NextFetchEvent } from 'next/server';
import type { NextRequest } from 'next/server';
import type { MiddlewareFactory } from './middleware-factory';

export const withValidateOAuthState: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    // Get user's session_state cookie;
    const sessionStateCookie = request.cookies.get('session_state')?.value;
    // Get state from query OAuth callback;
    const oauthCallbackState = request.nextUrl.searchParams.get('state');

    let nextUrl = request.nextUrl;

    if (sessionStateCookie && oauthCallbackState) {
      // If OAuth callback state is not valid
      // Cleaning OAuth tokens from query | cookies
      if (sessionStateCookie !== oauthCallbackState) {
        nextUrl.searchParams.delete('state');
        nextUrl.searchParams.delete('code');

        const response = NextResponse.redirect(nextUrl);

        response.cookies.delete('code_verifier');
        response.cookies.delete('session_state');

        return response;
      } else {
        // If OAuth callback state is valid
        // Setting new cookie code -> redirecting to nextUrl with sanitized query.
        // Then retrieving code cookie in getInitialProps for user fetching.
        const cachedCode = nextUrl.searchParams.get('code');

        nextUrl.searchParams.delete('state');
        nextUrl.searchParams.delete('code');

        const response = NextResponse.redirect(nextUrl);

        response.cookies.set('code', cachedCode as string);

        return response;
      }
    }

    // Passing to next middleware
    return next(request, _next);
  };
};
