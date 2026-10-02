// import { unstable_noStore as noStore } from 'next/cache';

import CabinCard from '@/app/_components/CabinCard';
import { getCabins } from '@/app/_lib/data-service';

async function CabinList({ filter }) {
  // This will make the entire page that uses this component to be revalidated on every request (dynamic page rendering). This is useful when you want to always show the latest data, but it can also increase the load on your server and slow down the page load time. Use it with caution.
  // And in preparing for the future of Next.js, When Partial Pre-rendering is enabled, doing this will make this component the dynamic hole in the cabins' page static shell, instead of making the entire page dynamic, which is the default behavior when using async components in Next.js 13.4 and above.

  // noStore();

  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins;
  switch (filter) {
    case 'all':
      displayedCabins = cabins;
      break;
    case 'small':
      displayedCabins = cabins.filter((x) => x.maxCapacity <= 3);
      break;
    case 'medium':
      displayedCabins = cabins.filter(
        (x) => x.maxCapacity >= 4 && x.maxCapacity <= 7,
      );
      break;
    case 'large':
      displayedCabins = cabins.filter((x) => x.maxCapacity >= 8);
      break;

    default:
      displayedCabins = cabins;
      break;
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard
          cabin={cabin}
          key={cabin.id}
        />
      ))}
    </div>
  );
}

export default CabinList;
