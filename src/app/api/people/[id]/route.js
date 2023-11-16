import { NextResponse } from "next/server";
import dbConnect from "@/utils/openDatabase";
import sleep from "@/utils/sleep";

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

export async function GET(_, { params }) {
  console.log("Get person by id request made");
  try {
    const { id } = params;
    const db = await dbConnect.open();
    const data = await db.get(`SELECT * FROM people WHERE id = ${id}`);
    db.close();
    if (data) {
      return NextResponse.json({ data });
    } else {
      return new Response(null, { status: 404, statusText: "Not found" });
    }
  } catch (err) {
    return new Response(err, { status: 400 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const db = await dbConnect.open();
    const { name } = await request.json();
    await sleep(2000);

    // Check validation
    if (typeof name !== "undefined" && !name) {
      throw new ValidationError(
        "Person `name` must be a non-empty string if present."
      );
    }
    await db.run(`UPDATE people SET name = '${name}' WHERE id = ${id}`);
    const data = await db.get(`SELECT * FROM people WHERE id = ${id}`);
    db.close();
    return NextResponse.json({ data });
  } catch (err) {
    return new Response(err, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const db = await dbConnect.open();
    await db.run(`DELETE from people WHERE id = ${id}`);
    await sleep(2000);
    db.close();
    return new Response(null, { status: 204 });
  } catch (err) {
    return new Response(err, { status: 400 });
  }
}
