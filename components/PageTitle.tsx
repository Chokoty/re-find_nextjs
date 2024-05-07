type Prop = {
  topTitle: {
    title: string;
    description: string;
  };
};

export default function PageTitle({ topTitle }: Prop) {
  return (
    <div className="mx-auto mt-2.5">
      <h1 className="text-center font-pop text-3xl font-normal 2xs:text-5xl">
        {topTitle.title}
      </h1>
      <p className="pt-4 text-center text-sm font-normal 2xs:text-base">
        {topTitle?.description}
      </p>
    </div>
  );
}
