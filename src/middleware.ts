// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth(); // Resuelve la promesa

  if (!isPublicRoute(req) && !userId) {
    // Si no es una ruta pública y no hay usuario autenticado, redirige al inicio de sesión
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Continúa con la solicitud si está autenticado o es una ruta pública
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
