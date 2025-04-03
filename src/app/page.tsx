import ProtectedLayout from "../app/components/ProtectedLayout";

export default function Home() {
  return (
    <ProtectedLayout>
      <h1 className="text-xl font-bold">Welcome to Dashboard</h1>
    </ProtectedLayout>
  );
}
