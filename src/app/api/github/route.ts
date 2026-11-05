import { NextResponse } from "next/server";
import { fetchGitHubData } from "@/lib/github";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customUser = searchParams.get("username") || undefined;

    const data = await fetchGitHubData(customUser);

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to load GitHub data", details: error?.message },
      { status: 500 }
    );
  }
}
