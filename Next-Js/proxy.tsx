import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function proxy(request: NextRequest) {
    // console.log("MIDDLEWARE HIT:", request.nextUrl.pathname);
    const pathname = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value;
    const userType = request.cookies.get("user_type")?.value?.toLowerCase();


    if (!token) {
        return NextResponse.redirect(new URL("/", request.url));
    }


    const isCustomerPage = pathname === "/user-subscription";
    const isAdminPage = pathname.startsWith("/admin");


    if (isCustomerPage && userType !== "customer") {
        return NextResponse.redirect(new URL("/", request.url));
    }


    if (isAdminPage && userType !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
    }


    if (pathname === "/admin/inventory") {
        return NextResponse.redirect(
            new URL("/admin/inventory/virtual-business-unit", request.url)
        );
    }
    if (pathname === "/admin/settings") {
        return NextResponse.redirect(
            new URL("/admin/settings/plans-and-pricing", request.url)
        );


    }


    return NextResponse.next();
}


export const config = {
    matcher: ["/user-subscription", "/admin/:path*"],
};
