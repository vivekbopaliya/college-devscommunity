import axios from "axios";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  try {
    await axios.post(
      "https://sheet.best/api/sheets/436c6e22-3e1f-4ce5-bc37-c124ce60fe12",
      body
    );
    return new Response("okay");
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
