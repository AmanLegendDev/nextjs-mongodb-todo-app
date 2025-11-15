📝 nextjs-mongodb-todo-app

A fully functional CRUD Todo Application built with Next.js 14 (App Router) and MongoDB Atlas.
Includes Create, Read, Update, Delete, and Mark as Completed features — all with clean UI + responsive design.

Live Demo 👉 https://nextjs-mongodb-todo-app.vercel.app/

GitHub Repo 👉 https://github.com/AmanLegendDev/nextjs-mongodb-todo-app

🚀 Features

✅ Add new tasks

✏️ Edit existing tasks

❌ Delete tasks

✔️ Mark tasks as Completed (checkbox with line-through UI)

🗓 Shows created date

🎨 Beautiful TailwindCSS UI

⚡ Instant UI refresh using no-store fetch

🌐 MongoDB Atlas database

🔐 Environment variables securely handled with Vercel

🛠 Tech Stack
Technology	Usage
Next.js 14	Full-stack framework (App Router)
React	Frontend UI
MongoDB Atlas	Cloud database
Mongoose	MongoDB ODM
TailwindCSS	Styling
Vercel	Deployment
📂 Project Structure
src/
 ├── app/
 │   ├── api/
 │   │   └── todos/
 │   │       ├── route.js       # POST + GET
 │   │       └── [id]/route.js  # DELETE + PUT + PATCH
 │   ├── layout.js
 │   └── page.js                # UI + Logic
 ├── lib/
 │   └── mongodb.js             # DB connection
 └── models/
     └── Todo.js                # Mongoose Schema

⚙️ Environment Variables (Required)

Create a .env.local file:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.byyvgfo.mongodb.net/todo-app

🧪 How to Run Locally
git clone https://github.com/AmanLegendDev/nextjs-mongodb-todo-app
cd nextjs-mongodb-todo-app
npm install
npm run dev

🚢 Deployment

This project is deployed on Vercel.
Just add your environment variable in:

Project → Settings → Environment Variables → MONGODB_URI

Then click Redeploy.

📸 Screenshots

<img width="896" height="611" alt="mongo-todo" src="https://github.com/user-attachments/assets/3582d1d7-c6f0-4ea6-ba25-12f768d19bee" />

⭐ If you like this project

Give the repo a star ⭐ on GitHub — helps the profile grow
