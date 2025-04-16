// import clientPromise from '@/lib/mongodb';
// import { NextResponse } from 'next/server';
// import { ObjectId } from 'mongodb';

// export async function PUT(req, context) {
//   const { params } = context;
//   const { id } = await params;

//   const { amount, description, date, category } = await req.json();
//   if (!amount || !description || !date || !category) {
//     return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
//   }

//   const client = await clientPromise;
//   const db = client.db('personal_finance');
//   await db.collection('transactions').updateOne(
//     { _id: new ObjectId(id) },
//     { $set: { amount, description, date: new Date(date), category } }
//   );

//   const updated = await db
//     .collection('transactions')
//     .findOne({ _id: new ObjectId(id) });

//   return NextResponse.json(updated);
// }

// export async function DELETE(req, context) {
//   const { params } = context;
//   const { id } = await params;

//   const client = await clientPromise;
//   const db = client.db('personal_finance');
//   await db.collection('transactions').deleteOne({ _id: new ObjectId(id) });

//   return NextResponse.json({ success: true });
// }






import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(req, context) {
  try {
    const { id } = context.params;
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("finance");
    const collection = db.collection("transactions");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    return NextResponse.json({ success: true, updatedCount: result.modifiedCount });
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = context.params;

    const client = await clientPromise;
    const db = client.db("finance");
    const collection = db.collection("transactions");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, deletedCount: result.deletedCount });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
