import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bjlagwuytrozejkqmtot.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || ''

if (!supabaseKey) {
  console.warn('SUPABASE_KEY não encontrada nas variáveis de ambiente')
}

export const supabase = createClient(supabaseUrl, supabaseKey)