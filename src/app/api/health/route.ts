export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    { status: "ok", sha: process.env.DEPLOYMENT_SHA },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
