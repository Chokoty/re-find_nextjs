import axios from 'axios';
import { useRouter } from 'next/router';

const ProfilePage = ({ author_artworks }) => {
  const router = useRouter();
  const { id } = router.query;

  console.log(id);
  return (
    <div>
      <h1>Profile {id}</h1>
    </div>
  );
};

export default ProfilePage;

export async function getServerSideProps(ctx) {
  console.log(ctx);
  const url =
    'https://re-find.reruru.com/author_artworks?name=' +
    encodeURIComponent(ctx.query.id) +
    '&type=like';
  try {
    const res = axios.get(url).then((res) => res.data);

    const author_artworks = await res;

    return {
      props: {
        author_artworks,
      },
    };
  } catch (error) {
    console.log('Error fetching data :', error);

    // Return an alternate value if the fetch fails
    return {
      props: {
        author_artworks: null,
        // counter: null,
        // last_update_info: null,
        // random_fanart: null,
      },
    };
  }
}
