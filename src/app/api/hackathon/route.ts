import axios from "axios";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    await axios.post(process.env.HACKATHON_URL!, body);
    return new Response("ok");
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
