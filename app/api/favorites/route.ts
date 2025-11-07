import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabase } from "@/lib/supabase";

// 내 찜 목록 조회
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: favorites } = await supabase
    .from('favorites')
    .select('pokemon_id')
    .eq('oauth_id', session.user.id);

  return Response.json(favorites || []);
}

// 찜 추가
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { pokemon_id } = await request.json();

  const { error } = await supabase
    .from('favorites')
    .insert({ oauth_id: session.user.id, pokemon_id });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ success: true });
}

// 찜 삭제
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { pokemon_id } = await request.json();

  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('oauth_id', session.user.id)
    .eq('pokemon_id', pokemon_id);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ success: true });
}