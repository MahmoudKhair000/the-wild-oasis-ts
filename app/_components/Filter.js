'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Filter() {
  const filters = [
    { label: 'All', filter: 'all' },
    {
      label: <>1&mdash;3 guests</>,
      filter: 'small',
    },
    {
      label: <>4&mdash;7 guests</>,
      filter: 'medium',
    },
    {
      label: <>8&mdash;12 guests</>,
      filter: 'large',
    },
  ];

  const searchParams = useSearchParams();
  const router = useRouter(); // from next/navigation
  const pathname = usePathname();

  const activeFilter = searchParams?.get('capacity') ?? 'all';

  function handleFilter(filter) {
    // console.log(filter);
    const params = new URLSearchParams(searchParams);
    params.set('capacity', filter);
    // This only sets it internally
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    // This sets it in browser
  }

  return (
    <div className="border border-primary-800 flex">
      {filters.map((filter) => (
        <Button
          key={filter.label}
          filter={filter.filter}
          activeFilter={activeFilter}
          handleFilter={handleFilter}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}

function Button({ filter, activeFilter, handleFilter, children }) {
  return (
    <button
      className={`${filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''
        } px-5 py-2 hover:bg-primary-700`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
