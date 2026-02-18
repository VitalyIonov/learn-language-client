import React from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  type LoaderFunctionArgs,
  data,
} from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PageLayout } from "~/page-layout";

import { NotificationContainer } from "~/shared/components";
import type { Route } from "./+types/root";
import { I18nProvider } from "~/shared/providers/i18n";
import { getLangFromCookie, normalizeLang } from "~/shared/utils/i18n";
import "./app.css";
import "./globals.css";

const I18N_BASE = import.meta.env.VITE_I18N_BASE as string;
const API_URL = import.meta.env.VITE_API_URL as string;

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function headers({ loaderHeaders }: Route.HeadersArgs) {
  return loaderHeaders;
}

async function fetchMessages(lang: string) {
  const res = await fetch(`${I18N_BASE}/${lang}.json`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Response("i18n load failed", { status: 500 });
  return res.json();
}

async function fetchUser(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const headers: Record<string, string> = {};
  if (cookie) headers.cookie = cookie;

  const res = await fetch(`${API_URL}/client/current_user`, {
    cache: "no-store",
    headers,
  });

  if (!res.ok)
    throw new Response("couldn't load the current user", { status: 500 });
  return res.json();
}

function prepareCookieLang(lang: string) {
  const base = `interface_lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax; HttpOnly`;
  return process.env.NODE_ENV === "production"
    ? `${base}; Secure; Domain=.learn-language.es`
    : base;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieLang = getLangFromCookie(request.headers.get("cookie"));
  let lang = normalizeLang(cookieLang);
  const headers = new Headers();

  if (!cookieLang) {
    try {
      const user = await fetchUser(request);

      lang = normalizeLang(user?.interfaceLang);

      headers.append("Set-Cookie", prepareCookieLang(lang));
    } catch (error) {
      console.error("Error fetching client info:", error);
    }
  }

  const messages = await fetchMessages(lang);

  return data({ lang, messages }, { headers });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { lang } = useLoaderData<typeof loader>();

  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const queryClient = new QueryClient({});

export default function App() {
  const { lang, messages } = useLoaderData<typeof loader>();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider lang={lang} messages={messages}>
        <PageLayout>
          <Outlet />
          <NotificationContainer />
        </PageLayout>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
