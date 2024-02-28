const Search = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <div>Search {id}</div>;
};

export default Search;
