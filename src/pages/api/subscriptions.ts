import { authClient } from '@/lib/supabase';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
try {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ error: "Authorization token missing" });

  const updates = req.body; // whatever fields user wants to update (status, cancel_reason, etc.)

  // Create a client scoped to the provided JWT
  const supabase = authClient(token);

  // Verify token and get user from auth.users
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    console.error("Auth error:", authError);
    return res
      .status(401)
      .json({ error: "Invalid or expired token", details: authError?.message });
  }

  // Fetch subscription by user_id
  let { data: subscription, error: subError } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (subError) {
    console.error("Subscription lookup error:", subError);
    return res
      .status(500)
      .json({ error: "Subscription lookup failed", details: subError.message });
  }

  // ✅ If no updates were sent in body → just return subscription
  if (!updates || Object.keys(updates).length === 0) {
    return res.status(200).json({ subscription });
  }

  // ✅ Otherwise apply updates
  const { data: updated, error: updateError } = await supabase
    .from("subscriptions")
    .update({
      ...updates,
      updated_at: new Date().toISOString(), // keep track of last update
    })
    .eq("user_id", user.id)
    .select()
    .single();

  if (updateError) {
    console.error("Update error:", updateError);
    return res
      .status(500)
      .json({ error: "Subscription update failed", details: updateError.message });
  }

  res.status(200).json({
    subscription: updated,
    message: "Subscription updated successfully",
  });
} catch (err: any) {
  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Unexpected server error", details: err.message });
}
}