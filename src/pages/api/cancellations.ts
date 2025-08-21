import { authClient, getABVariant } from '@/lib/supabase';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    if (!token)
      return res.status(401).json({ error: "Authorization token missing" });

    const newCancellation = req.body; // fields user wants to update (status, reason, etc.)

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

    // Fetch cancellation by user_id
    let { data: cancellation, error: subError } = await supabase
      .from("cancellations")
      .select("*")
      .eq("user_id", user.id)
      .limit(1); 

    if (subError) {
      console.error("Cancellation lookup error:", subError);
      return res
        .status(500)
        .json({ error: "Cancellation lookup failed", details: subError.message });
    }

    // If no cancellation exists → create one
if (!cancellation) {

  // Insert cancellation with found subscription_id
  const { data: seedCancellation, error: insertError } = await supabase
    .from("cancellations")
    .insert({
      user_id: user.id, 
      downsell_variant: getABVariant(),
    })
    .select()
    .single();

  if (insertError) {
    console.error("Insert error:", insertError);
    return res.status(500).json({ error: "Cancellation creation failed", details: insertError.message });
  }

  return res.status(200).json({
    cancellation: seedCancellation,
    message: "Cancellation created successfully",
  });
}

    // If updates exist → apply them
    if (newCancellation && Object.keys(newCancellation).length > 0) {
        // Fetch user's subscription
        const { data: subscription, error: subError } = await supabase
          .from("subscriptions")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle(); // returns null if none found

        if (subError) {
          console.error("Subscription lookup error:", subError);
          return res.status(500).json({ error: "Failed to find subscription", details: subError.message });
        }

      
    const { reason, accepted_downsell, found_job, responses, downsell_variant } = newCancellation;
    console.log("update: ", newCancellation);
      const { data: updated, error: updateError } = await supabase
        .from("cancellations")
        .insert
        ({ user_id:user.id,
          subscription_id: subscription?.id,
          reason, 
          accepted_downsell, 
          found_job, 
          responses, 
          downsell_variant })
        .eq("user_id", user.id)
        .select()
        .maybeSingle();

      if (updateError) {
        console.error("Update error:", updateError);
        return res.status(500).json({
          error: "Cancellation update failed",
          details: updateError.message,
        });
      }

      return res.status(200).json({
        cancellation: updated,
        message: "Cancellation updated successfully",
      });
    }

    // No updates sent → return existing cancellation
  res.status(200).json({ cancellation });

  } catch (err: any) {
    console.error("Unexpected error:", err);
    res
      .status(500)
      .json({ error: "Unexpected server error", details: err.message });
  }
}