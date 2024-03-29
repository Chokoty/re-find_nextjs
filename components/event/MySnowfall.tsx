import Snowfall from 'react-snowfall';

export default function MySnowfall() {
  // const color = useColorModeValue(lightMode.snowfall, darkMode.snowfall);

  return (
    <>
      <Snowfall
        // Changes the snowflake color
        // color={color}
        color="#dee4fd"
        // Applied to the canvas element
        // style={{ background: '#fff' }}
        // Controls the number of snowflakes that are created (default 150)
        snowflakeCount={200}
        speed={[0.5, 3]}
        wind={[-0.3, 3]}
        radius={[0.5, 5]}
      />
    </>
  );
}
