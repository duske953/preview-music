import noData from '@/public/noData.svg';
import Image from 'next/image';
export default function DataNotFound({
  msg = ' We could not find any result for your query',
}: {
  msg?: string;
}) {
  return (
    <section className="py-5">
      <div className="flex flex-col items-center">
        <div>
          <Image className="size-72" src={noData} alt="ken" />
        </div>
        <p className="mt-5 font-bold text-center">{msg}</p>
      </div>
    </section>
  );
}
