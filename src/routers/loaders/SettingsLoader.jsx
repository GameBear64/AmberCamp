import Skeleton from 'react-loading-skeleton';

import Layout from '../../components/Layout/Layout';

function SettingsPageLoader() {
  const elements = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="m-auto my-10 flex w-3/6 flex-col items-center gap-20">
      {elements.map((key) => {
        const heightValue = Math.round(Math.random() * (300 - 50) + 50);
        return (
          <div key={key}>
            <Skeleton width={200} height={30} />
            <Skeleton width={400} height={heightValue} />
          </div>
        );
      })}
    </div>
  );
}

function SettingsTabsLoader() {
  return (
    <div className="m-auto items-center">
      <Skeleton height={50} />
      <div className="mx-auto my-10 flex w-11/12 justify-center">
        <Skeleton count={5} className="my-2" containerClassName="flex-1" height={30} />
      </div>
    </div>
  );
}

function SettingsLoader() {
  return (
    <Layout>
      <SettingsTabsLoader />
    </Layout>
  );
}

export { SettingsPageLoader, SettingsTabsLoader, SettingsLoader };
