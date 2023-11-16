"use server";

import { PEOPLE } from "@/utils/tags";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const createPerson = async (formData) => {
  const res = await fetch("http://localhost:3000/api/people", {
    method: "POST",
    body: JSON.stringify({ name: formData.get("name") }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to create person");
  }

  revalidateTag(PEOPLE);
  redirect("/");
};
