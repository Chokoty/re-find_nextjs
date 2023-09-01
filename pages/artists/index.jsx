import { useState } from 'react';
import { useRouter } from 'next/router';

const Artists = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState('');

  const handleSearch = () => {
    if (nickname) {
      router.push(`/artists/${nickname}`);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <input
        type="text"
        placeholder="Enter nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Artists;
