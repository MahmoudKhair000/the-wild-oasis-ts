import Spinner from '@/app/_components/Spinner';

export default function Loading() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center ">
      <div className="scale-[2]">
        <Spinner />
        <p className="text-xl text-primary-200">Loading cabin data...</p>
      </div>
    </div>
  );
}
