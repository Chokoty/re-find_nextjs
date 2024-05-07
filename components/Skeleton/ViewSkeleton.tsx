type Prop = {
  view: string;
};

export default function ViewSkeleton({ view }: Prop) {
  if (view === 'masonry') {
    return (
      <div
        role="status"
        className="grid w-full animate-pulse grid-cols-2 gap-2 px-2 2xs:gap-2.5 2xs:px-6 min-[590px]:grid-cols-3 min-[830px]:grid-cols-4 min-[1110px]:grid-cols-5 min-[1350px]:grid-cols-6 min-[1528px]:grid-cols-7 min-[1792px]:grid-cols-8 min-[2020px]:grid-cols-9"
      >
        {Array.from({ length: 15 }, (_, index) => (
          <div className="w-full" key={index}>
            <div className="h-[236px] w-full overflow-hidden rounded-2xl bg-gray-125 dark:bg-gray-500" />
            <div className="mt-2 h-5 w-full rounded-sm bg-gray-125 dark:bg-gray-500" />
            <div className="mt-2 h-4 w-[90%] rounded-sm bg-gray-125 dark:bg-gray-500" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      role="status"
      className="grid w-full animate-pulse grid-cols-2 gap-2 px-2 2xs:gap-2.5 2xs:px-6 min-[600px]:grid-cols-3 min-[900px]:grid-cols-4 min-[1150px]:grid-cols-5 min-[1330px]:grid-cols-6 min-[1550px]:grid-cols-7 min-[1900px]:grid-cols-8"
    >
      {Array.from({ length: 20 }, (_, index) => (
        <div className="w-full" key={index}>
          <div className="mb-2 h-[120px] w-full overflow-hidden rounded-2xl bg-gray-125 dark:bg-gray-500 2xs:h-[157px]" />
          <div className="mt-1 h-4 w-[90%] rounded-sm bg-gray-125 dark:bg-gray-500" />
          <div className="mt-1 h-3 w-4/5 rounded-sm bg-gray-125 dark:bg-gray-500" />
        </div>
      ))}
    </div>
  );
}
