// HTTP Method: GET
// URL path exposed user functions/v1/get_notes. functions/ keeps other apis like for auth and db separate.
// /v1/ helps in versioning. in future, /v2/ can be made without affeecting existing clients.

import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'

serve(async (req) => {

  const { SUPABASE_URL, SUPABASE_ANON_KEY } = Deno.env.toObject()
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

  const user_id = '9fbc433b-9bf1-4bec-95a3-66f580ea1506'  // Static user id from an already created user

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', user_id) 

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  }

  return new Response(JSON.stringify(data), { status: 200 })
})