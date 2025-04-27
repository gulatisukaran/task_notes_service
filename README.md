# Supabase Notes Service Task

  
This is a minimal backend for a personal notes service built with Supabase. It includes a simple schema for storing notes and two REST endpoints to manage notes for a user.


## 📦 Deliverables

  

-  `schema.sql`: The SQL file containing the `CREATE TABLE` statement for the `notes` table.

-  `functions/`: Directory containing Supabase Edge Functions for interacting with the notes.

	-  `post_notes.js`: Handles the `POST /notes` request to create a new note.

	- `get_notes.js`: Handles the `GET /notes` request to retrieve all notes for a user.

## 🛠️ Setup & Deploy Steps

**Install Supabase CLI**

If you don't have the Supabase CLI installed, follow the instructions in the [Supabase CLI Installation Guide](https://supabase.com/docs/guides/cli) to install it for your system.
  

### 1. Set Up Supabase Project

  

1. Create a new Supabase project at [Supabase](https://supabase.io/).

2. Once the project is created, get your `SUPABASE_URL` and `SUPABASE_ANON_KEY` from the project settings under "API".

3. Create a `.env` file in the root of your project with the following content:

```bash
SUPABASE_URL=<your_supabase_url>

SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

#### Alternative way using CLI: 
Directly use the command `supabase login`  and then `supabase init` to setup the environment variables. With the supabase init command, the URL and ANON key will be automatically added to your Supabase config file.

### 2. Deploy Supabase Edge Functions

The Edge functions directory looks like this:
```bash
functions/
	|── post_notes.ts
	|── get_notes.ts
```
1. To deploy the edge functions, start supabase locally using `supabase start` command.
2. Now to run the edge functions, `supabase functions serve` 
3. To deploy the functions to the cloud: 

	```bash
	supabase functions deploy post_notes
	supabase functions deploy get_notes
	```
4. These functions are available as the following endpoints:
`https://<your-supabase-project-url>/functions/v1/post_notes`


### 3. Testing Edge Functions

**Here's a sample curl command to test the post_note edge function.**

**POST Command**
```bash
curl -i --location --request POST 'https://<your-supabase-project-url>/functions/v1/post_notes' \
    --header 'Authorization: Bearer <jwt_token>' \
    --header 'Content-Type: application/json' \
    --data '{"title": "New Note", "content": "This is a test note", "category": "Personal", "bg_color": "#FFDDC1"}'
```
**Response:**
```bash 
{"message":"Note created successfully"}
```

**GET Command:**
```bash 
curl -i --location --request GET 'http://127.0.0.1:54321/functions/v1/get_notes' \

--header 'Authorization: Bearer <jwt token>'
```
**Response:**
```bash 
[{"id":"af650d16-3852-4081-952b-3fdbaea9ab82","user_id":"9fbc433b-9bf1-4bec-95a3-66f580ea1506","title":"New Note","content":"This is a test note","category":"Personal","bg_color":"#FFDDC1","created_at":"2025-04-27T07:46:22.741218+00:00"}]
```