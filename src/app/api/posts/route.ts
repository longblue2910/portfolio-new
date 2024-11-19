import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title } = await req.json();

  if (!title || typeof title !== "string") {
    return NextResponse.json(
      { message: "Invalid or missing 'title' field" },
      { status: 400 }
    );
  }

  try {
    const apiResponse = await fetch(
      `http://blog-api.rimdasilva.com/api/post/paging?PageSize=10&PageIndex=1&api-version=1.0`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      }
    );

    if (!apiResponse.ok) {
      throw new Error(
        `Failed to fetch from external API: ${apiResponse.statusText}`
      );
    }

    const data = await apiResponse.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
