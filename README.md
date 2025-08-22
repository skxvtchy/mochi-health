# Mochi Health

A simple Next.js project that tracks weights and notes using Supabase.
Used react, rechart.js, supabase

---

## Start / End Time
- **Start:** 5:23pm
- **End:** 7:22pm

---

## 🚀 How to Run Locally

1. Clone the repository:

```bash
npm install
# or
yarn
# or
pnpm install
```

2. Start development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open browser at ```http://localhost:3000```


------------------------------------------------------------------


## 🕑 How the Two Hours Were Spent

During this two-hour session:

- **Supabase Integration:** Connected the frontend to a cloud Supabase backend table (`weights`) using a working REST API. Verified `GET`, `POST`, and `PATCH` requests with proper headers.  10min
- **Table Functionality:** Implemented adding, editing, and saving weight entries. Ensured that the save feature works with the backend. 20min
- **Data Calculations:** Implemented accurate percentage weight change calculation from the starting weight (220 lbs). 40min  
- **Chart Display:** Added a Recharts chart to visualize weight data (dates may be slightly misaligned). 15min  
- **UI/UX along with components:** Bulk time implementing it along with making it split ot different components to make code readable 20min


- **Shortcuts / Decisions:**  
  - **Pagination:** Began work on pagination just did frontend realized it might take too long 5min
  - **Docker Consideration:** Attempted Docker Compose setup; unsure if it works as it took too long spin up so i skipped it. 5 min
  - `.env` file was intentionally not `.gitignore`-d for ease of testing the API. 5 min
  - Focused on core functionality first (table display and Supabase save) before polishing chart and pagination. 
  - Table might be really hard to read just trying to make it functional adding typing. 


## ⚠️ Issues / Known Problems  
- Chart (using Recharts) does not accurately reflect the data — dates may be misaligned or displayed incorrectly.  
- Pagination is not properly implemented; table shows all rows without proper page controls.  
- Cannot edit goals, starting weight, or current weight directly in the backend.  
- Editing a row sometimes fails if the `id` is missing.
- purposely did not git.ignore .env file so that you can run the api

---

## ✅ Features / Implemented Functionality
- Percentage change in weight is accurately calculated from the starting weight (220 lbs)
- Display weight entries in a table  
- Edit existing entries and save updates to Supabase backend  
- Add new entries to the table  
- Fetch entries in descending order by `created_at` (newest first)  
- Working save feature connected to cloud Supabase API  

