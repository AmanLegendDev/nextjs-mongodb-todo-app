import Todo from "@/models/Todo";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        await connectDB()
        const {title,description} = await req.json()
        if(!title || title.trim() === ""){
            return NextResponse.json(
                {error: "Title is Requierd"},
                {status: 400}
            );
        }
        const newtodo = await Todo.create({
        title,
        description,
        })
        return NextResponse.json(
            {message: "todo Created",todo: newtodo},
            {status: 201},

        )
    }catch(err){
       console.error("🔥🔥🔥 REAL ERROR:", err);
  return NextResponse.json(
    { error: err.message },
    { status: 500 }
  );
    }
}

export async function GET() {
    try{
        await connectDB()
    const todos  = await Todo.find().sort({createdAt: -1})
    return NextResponse.json({todos})



    }catch(err){
 console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
    }
}