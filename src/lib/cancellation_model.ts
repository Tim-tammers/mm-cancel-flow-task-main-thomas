export interface Cancellation {                      
  readonly subscription_id: string;      
  readonly downsell_variant?: string;   
  reason?: string;          
  accepted_downsell?: boolean; 
  created_at: string;          
  found_job?: boolean;         
  responses?: Record<string, any>; 
  current_price: number;
}