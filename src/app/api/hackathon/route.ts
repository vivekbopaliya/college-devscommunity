import axios from "axios";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  try {
    await axios.post(
      "https://sheet.best/api/sheets/1a8fb095-9b50-4b59-8a3a-15c263b532a3",
      body
    );
    return new Response("okay");
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
