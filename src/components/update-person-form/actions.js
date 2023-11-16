"use server";

import { PEOPLE } from "@/utils/tags";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const updatePersonById = async (personId, formData) => {
  const res = await fetch(`http://localhost:3000/api/people/${personId}`, {
    method: "PATCH",
    body: JSON.stringify({ name: formData.get("name") }),
  });

  if (!res.ok) {
    throw new Error("Failed to patch person");
  }

  revalidateTag(PEOPLE);
  redirect("/");
};

export const deletePersonById = async (personId) => {
  const res = await fetch(`http://localhost:3000/api/people/${personId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete person");
  }

  revalidateTag(PEOPLE);
  redirect("/");
};
