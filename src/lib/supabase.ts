// src/lib/supabase.ts
// Supabase client configuration for database connections
// Does not include authentication setup or advanced features

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


export function authClient(token: string){
const client = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } }
  });

  return client;
} 

// Server-side client with service role key for admin operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
) 


//CSPRNG num generator for cancellation
export function getABVariant(): "A" | "B" {
  // Create a Uint8Array with 1 byte
  const array = new Uint8Array(1);

  // Fill it with a cryptographically secure random number
  crypto.getRandomValues(array);

  // Map to 0 or 1
  const randomBit = array[0] % 2;

  return randomBit === 0 ? "A" : "B";
}

export function getPriceVariant(): 2500 | 2900 {
  // Create a Uint8Array with 1 byte
  const array = new Uint8Array(1);

  // Fill it with a cryptographically secure random number
  crypto.getRandomValues(array);

  // Map to 0 or 1
  const randomBit = array[0] % 2;

  return randomBit === 0 ? 2500 : 2900;
}

