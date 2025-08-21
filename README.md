

**Thomas Leary**

**MM Take Home Assignment**

**Architechture Designs**
--Step by step that resuses components to simplify codebase and make changes accross pages easier.
--On modal load the api is called and returns the user authentication and the downsell variant assigned to the user.
  -if user doesnt exist then one is created along with a subscription and cancellation entry that assigns downsell.
--Modal functions dynamically to fit multiple sized screens without breaking.
--Components are conditionally rendered to reduce overhead. 
--JSON object added to the cancellation table to store various questions answered. 
--Supabase was used for datamanagement and storage. 
--Tailwind CSS: All UI is styled with Tailwind. Responsive utilities ensure mobile-first design.
--Without figma pro getting pixel perfect was impossible in the time frame but I got it as close as i could. 
--Flow Implementation
    Step 0: Initial cancellation prompt (Step1Props).
    Step 1: Job-related questions (Step2Job) with conditional rendering based on whether the user found a job.
    Downsell Step: Conditional display of $10 off offer (DiscountStep) based on deterministic A/B variant.
    Completion Step: Displays confirmation messages; handles visa support prompts if applicable.
--Atomic API Calls: Ensures that submission of reason, downsell acceptance, and flow progression occur in the correct order.
--AI was used to quickly build components and fine tune them later. Reusability is key. 
--If cancellation pipeline finished the subscription in the db is set to pending_cancellation.
--If downsell is accepted the monthly price decreases as well. 

**Security Auth**
--On inital load with the user email, the admin supabase creates the user entry, subscription and inital cancellation for downsell. /
--Downsell varient is set on user creation and when a new cancellation is created it references what already exists in the db. 
--The user is assigned a token that only allows them to interact with their DB. 
--XSS/CSRF Protection: Sensitive inputs are sanitized and API routes only accept authenticated requests.
--No Payment Processing: Downsell logic is simulated; no sensitive financial data is handled.

**A/B testing Approach**
--When the user first creates a cancellation they are assigned an A/B var in the db. 
--Whenever the user starts the pipeline the var is checked and the appropriet path is assigned. 
--Server level security ensures that the user cannot just keep trying to get the downsell. 
--When the Variant is A the user skips and is not displayed the message. 
--Inital var is set using random bit generation for true randomness. 
