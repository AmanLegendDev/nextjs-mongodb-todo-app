import Todo from "@/models/Todo";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server"; 


export async function DELETE(req,{params}) {
    try{
        await connectDB()
        const {id} = await params;
        await Todo.findByIdAndDelete(id)
        return NextResponse.json(
            {message: "Task Delete"},
            {status: 200}
        )
    }catch(err){
            console.error("DELETE Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
    }
}


export async function PUT(req,{params}) {
    try{
        await connectDB()
        const {title , description} = await req.json()
        const { id } = await params;


        if (!title || title.trim() === "") {
          return NextResponse.json(
            { error: "Title is required" },
            { status: 400 }
          );
        }
        const updated = await Todo.findByIdAndUpdate(
            id,
            {title,description},
            {new:true}
        );
        return NextResponse.json(
            {message: "Todo Update",todo:updated},
            {status: 200}
        )


    }catch(err){
          console.error("PUT Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );

    }
    
    
}

export async function PATCH(req,{params}){
    try{
        await connectDB();
        const {id} = await params;
        const {completed} = await req.json()
        const updates =  await Todo.findByIdAndUpdate(
            id,
            {completed},
            {new: true}
        );
       return NextResponse.json(
      { message: "Status Updated", todo: updates },
      { status: 200 }
    );
    }catch(err){
  console.error("PATCH Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
    }
}