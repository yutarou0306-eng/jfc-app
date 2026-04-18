import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://mluwnlnauupkborbqzcu.supabase.co'
const supabaseKey = 'sb_publishable_4mBG1grwoTs0iE891fG8Kg_skokxSdU'

export const supabase = createClient(supabaseUrl, supabaseKey)
