
export default function Page() {
  return <div>Hello</div>
}

//import { fetchProductById  } from "@/app/lib/data";

/*
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchProductById(id),

  ]);

  if (!invoice) {
    notFound();
  }
  return (
    <main>

    </main>
  );
}
*/