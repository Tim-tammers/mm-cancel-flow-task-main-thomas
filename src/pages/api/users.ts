import { supabaseAdmin, supabase } from "@/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  // Check if user exists in your app's "users" table
  const { data: users, error: userError } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("email", email);

  if (userError) return res.status(500).json({ error: userError.message });

  let user = users?.[0];

  // If no user, create one in both Auth and DB
  if (!user) {
    // 1. Create in Auth
    const { data: authUser, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: true, // auto-confirm since it's a magic link
      });

    if (createError || !authUser?.user)
      return res.status(500).json({ error: createError?.message || "Could not create auth user" });

    // 2. Create in your "users" table
    const { data: newUser, error: userError } = await supabaseAdmin
      .from("users")
      .insert([{ id: authUser.user.id, email }]) // re-use the auth UID
      .select()
      .single();

    if (userError) return res.status(500).json({ error: userError.message });

    user = newUser;

    //If no user set create a subscription for testing. 
      const { data: newSub, error: insertError } = await supabaseAdmin
        .from("subscriptions")
        .insert([
          {
            user_id: user.id,
            monthly_price: 2500, // default $25 plan
            status: "active",
          }
        ])
        .select()
        .single()

      if (insertError) {
        console.error("Insert subscription error:", insertError)
        return res.status(500).json({ error: "Failed to create subscription", details: insertError.message })
      }

    
  }

  // Generate magic link
  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: "magiclink",
    email,
  });

  if (linkError || !linkData?.properties?.email_otp) {
    return res.status(500).json({ error: linkError?.message || "No OTP generated" });
  }

  const email_otp = linkData.properties.email_otp;

  // Verify OTP immediately (no click needed)
  const { data: session, error: verifyError } = await supabase.auth.verifyOtp({
    token: email_otp,
    email,
    type: "magiclink",
  });

  if (verifyError || !session) {
    return res.status(500).json({ error: verifyError?.message || "Could not verify token" });
  }

  

  // Return session and user info
  res.status(200).json({
    session,
    user,
  });
}