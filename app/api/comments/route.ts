import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const story_id = searchParams.get("story_id");
  if (!story_id) return new Response("story_id required", { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("comments")
    .select("*")
    .eq("story_id", story_id)
    .order("created_at", { ascending: false });

  if (error) return new Response(error.message, { status: 500 });
  return Response.json(data);
}

export async function POST(req: Request) {
  const { story_id, name, body, rating } = await req.json();

  if (!story_id || !body) {
    return new Response("story_id and body required", { status: 400 });
  }

  const safeRating =
    typeof rating === "number" && rating >= 1 && rating <= 5 ? rating : null;

  const { data, error } = await supabaseAdmin
    .from("comments")
    .insert([{ story_id, name: name || null, body, rating: safeRating }])
    .select()
    .single();

  if (error) return new Response(error.message, { status: 500 });
  return Response.json(data);
}
