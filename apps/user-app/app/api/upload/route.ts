import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Convert formData to a readable object
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    console.log("Received Form Data:", data);

    return NextResponse.json({
      message: "Data received successfully",
      data: data,
      statusCode: 200,
    });

  } catch (error) {
    console.error("Error processing form data:", error);
    return NextResponse.json({
      error: "File upload failed",
      statusCode: 500,
    });
  }
}
