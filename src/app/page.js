import Link from "next/link";
import { PEOPLE } from "@/utils/tags";

const getPeople = async () => {
  const res = await fetch("http://localhost:3000/api/people", {
    next: { tags: [PEOPLE] },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch people");
  }

  return res.json();
};

const Home = async () => {
  const { data: people } = await getPeople();

  return (
    <main>
      <h1>People</h1>
      <ul>
        {people.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/people/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
      <Link href="/people/">Add Person</Link>
    </main>
  );
};

export default Home;
