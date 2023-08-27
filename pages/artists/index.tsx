import { useRouter } from 'next/router';

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default ProfilePage;
