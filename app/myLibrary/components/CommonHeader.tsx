export default function CommonTitle({ title }: { title: string }) {
  return (
    <div className="mb-12 flex items-end justify-start gap-4">
      <p className="text-left text-xl font-extrabold md:text-3xl">{title}</p>
    </div>
  );
}
