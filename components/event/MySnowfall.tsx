import Snowfall from 'react-snowfall';

const MySnowfall = () => {
  return (
    <>
      <Snowfall
        // Changes the snowflake color
        color="#dee4fd"
        // Applied to the canvas element
        // style={{ background: '#fff' }}
        // Controls the number of snowflakes that are created (default 150)
        snowflakeCount={200}
      />
    </>
  );
};

export default MySnowfall;
