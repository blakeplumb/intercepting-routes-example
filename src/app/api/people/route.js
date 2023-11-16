import { NextResponse } from "next/server";
import dbConnect from "@/utils/openDatabase";
import sleep from "@/utils/sleep";

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

export async function GET(request) {
  console.log("Get all people request made");
  try {
    const db = await dbConnect.open();
    const results = await db.all(
      "SELECT *, count(*) OVER() AS total FROM people"
    );
    db.close();
    return NextResponse.json({
      data: results,
    });
  } catch (err) {
    return new Response(err, { status: 400 });
  }
}

export async function POST(request) {
  try {
    const db = await dbConnect.open();
    const { name } = await request.json();
    await sleep(2000);

    // Check validation
    if (!name) {
      throw new ValidationError("Person `name` non-empty string is required.");
    }

    const result = await db.run("INSERT INTO people(name) VALUES(?)", [name]);
    const data = await db.get(
      `SELECT * FROM people WHERE id = ${result.lastID}`
    );
    db.close();
    return NextResponse.json({ data });
  } catch (err) {
    return new Response(err, { status: 400 });
  }
}
