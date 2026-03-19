# Supabase Setup Instructions

Follow these steps before running the admin dashboard.

---

## 1. Create the `products` Table

1. Go to your Supabase project
2. Click **Table Editor** on the left sidebar
3. Click **New Table**
4. Name it `products`
5. Add the following columns:

| Column Name | Type | Default Value | Notes |
|---|---|---|---|
| `id` | uuid | `gen_random_uuid()` | Primary key |
| `name` | text | — | |
| `price` | int4 | — | In KES |
| `brand` | text | — | |
| `category` | text | — | `men`, `women`, or `unisex` |
| `image_url` | text | — | URL from Supabase Storage |
| `stock` | int4 | — | Number of pairs available |
| `created_at` | timestamptz | `now()` | Auto-filled |

6. Make sure **Row Level Security (RLS)** is enabled
7. Click **Save**

---

## 2. Set Up RLS Policies

After creating the table, add these policies so the public can read products but only the admin can write.

Go to **Table Editor → products → RLS Policies → New Policy**

### Policy 1 — Allow public to read products
- **Policy name:** `Allow public read`
- **Operation:** SELECT
- **Target roles:** Leave blank (applies to all)
- **Expression:** `true`

### Policy 2 — Allow authenticated admin to insert
- **Policy name:** `Allow admin insert`
- **Operation:** INSERT
- **Target roles:** `authenticated`
- **Expression:** `true`

### Policy 3 — Allow authenticated admin to update
- **Policy name:** `Allow admin update`
- **Operation:** UPDATE
- **Target roles:** `authenticated`
- **Expression:** `true`

### Policy 4 — Allow authenticated admin to delete
- **Policy name:** `Allow admin delete`
- **Operation:** DELETE
- **Target roles:** `authenticated`
- **Expression:** `true`

---

## 3. Create a Storage Bucket for Product Images

1. Click **Storage** on the left sidebar
2. Click **New Bucket**
3. Name it `products`
4. Toggle **Public bucket** to ON
5. Click **Save**

### Add Storage Policy

Go to **Storage → products bucket → Policies → New Policy**

- **Policy name:** `Allow public read`
- **Operation:** SELECT
- **Expression:** `true`

For uploads (INSERT), set:
- **Target roles:** `authenticated`
- **Expression:** `true`

---

## 4. Create the Admin User

1. Go to **Authentication** on the left sidebar
2. Click **Users**
3. Click **Invite User**
4. Enter the admin email address
5. The admin will receive an email to set their password

> Only create one admin user. Do not enable public signups — keep **Email signups** turned off under **Authentication → Providers → Email**.

To disable public signups:
1. Go to **Authentication → Providers → Email**
2. Toggle **Enable Email Signup** to **OFF**
3. Click **Save**

---

## 5. Add Environment Variables

Make sure your `.env` file at the root of the project has:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Both values are found in **Settings → API** in your Supabase project.

> Never use the **service role (secret) key** in the frontend. Always use the **anon public key**.

---

## 6. Verify Setup Checklist

- [ ] `products` table created with all columns
- [ ] RLS enabled on `products` table
- [ ] All 4 RLS policies added
- [ ] `products` storage bucket created and set to public
- [ ] Storage policies added
- [ ] Admin user created via invite
- [ ] Public email signup disabled
- [ ] `.env` file has correct URL and anon key

---

Once all steps above are complete, the admin dashboard will be fully functional.
