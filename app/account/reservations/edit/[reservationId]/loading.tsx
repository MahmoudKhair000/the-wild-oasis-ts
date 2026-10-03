import Spinner from '@/app/_components/Spinner';

export default function Loading() {
  return (
    <div className="h-full w-full flex justify-center items-center ">
      <div className="scale-[1.2]">
        <Spinner />
      </div>
    </div>
  );
}
