// HTTP Method: POST
// URL path exposed user functions/v1/post_notes. functions/ keeps other apis like for auth and db separate.
// /v1/ helps in versioning. in future, /v2/ can be made without affeecting existing clients.

import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'

serve(async (req) => {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = Deno.env.toObject()
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

  const { title, content, category, bg_color } = await req.json()

  const user_id = '9fbc433b-9bf1-4bec-95a3-66f580ea1506'  // Replace with a valid UUID

  const { error } = await supabase.from('notes').insert([{
    user_id: user_id,  // Using the static user_id
    title,
    content,
    category,
    bg_color,
  }])

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  }

  return new Response(JSON.stringify({ message: 'Note created successfully' }), { status: 201 })
})


