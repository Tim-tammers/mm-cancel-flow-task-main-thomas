import { authClient } from '@/lib/supabase';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ error: "Authorization token missing" });

  // Create a client scoped to the provided JWT
  const supabase = authClient(token);

    // Verify token and get user from auth.users
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      console.error("Auth error:", authError)
      return res.status(401).json({ error: "Invalid or expired token", details: authError?.message })
    }

    // Fetch user from your own table
    const { data: dbUser, error: dbError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id) // IMPORTANT: must match auth.users.id
      .single()

    if (dbError) {
      console.error("DB user lookup error:", dbError)
      return res.status(500).json({ error: "Database query failed", details: dbError.message })
    }

    if (!dbUser) {
      return res.status(404).json({ error: "User not found in custom table" })
    }

    // Check for existing subscription
    let { data: subscription, error: subError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle() // ✅ won't throw on no rows

    if (subError) {
      console.error("Subscription lookup error:", subError)
      return res.status(500).json({ error: "Subscription lookup failed", details: subError.message })
    }


    res.status(200).json({
      message: "Auth + subscription works ✅",
      authUser: user,
      dbUser,
      subscription,
    })

}catch (err: any) {
    console.error("Unexpected error:", err)
    res.status(500).json({ error: "Unexpected server error", details: err.message })
  }
}