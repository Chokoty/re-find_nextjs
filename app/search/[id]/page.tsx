export default function Search({ params }: { params: { id: string } }) {
  const { id } = params;
  return <div>Search {id}</div>;
}
