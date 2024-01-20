import axios from "axios";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    await axios.post(
      "https://sheet.best/api/sheets/e82b0fc1-2539-4756-967c-46337b25b4cf",
      body
    );
    return new Response("okay");
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
