export default function ProfileSlug({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col bg-primary p-3 drop-shadow-md h-full">
      {params.id}
    </div>
  );
}
