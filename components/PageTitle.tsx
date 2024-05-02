type Prop = {
  topTitle: {
    title: string;
    description: string;
  };
};

export default function PageTitle({ topTitle }: Prop) {
  return (
    <div className="mx-auto">
      <h1 className="text-center font-['ONE-Mobile-POP'] text-3xl font-normal 2xs:text-5xl">
        {topTitle.title}
      </h1>
      <p className="pt-4 text-center font-['ONE-Mobile-POP'] text-xl font-normal 2xs:text-3xl">
        {topTitle?.description}
      </p>
    </div>
  );
}
