import Skeleton from 'react-loading-skeleton';

import Layout from '../../components/Layout/Layout';

function SettingsPageLoader() {
  const elements = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="m-auto my-20 flex w-3/6 flex-col items-center gap-20">
      {elements.map((key) => {
        const heightValue = Math.round(Math.random() * (400 - 50) + 50);
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
    <div className="m-auto my-20 w-3/6 items-center ">
      <Skeleton height={90} />
      <div className="mt-10">
        <Skeleton count={7} className="my-3" height={30} />
      </div>
    </div>
  );
}

function SettingsLoader() {
  return <Layout left={<SettingsTabsLoader />} right={<SettingsPageLoader />} />;
}

export { SettingsPageLoader, SettingsTabsLoader, SettingsLoader };
