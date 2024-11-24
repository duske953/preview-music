import { Button } from '@/components/ui/button';

export default function ButtonLoadData({
  disabled,
  setSize,
  size,
}: {
  disabled: boolean;
  setSize: (arg: number) => void;
  size: number;
}) {
  return (
    <div className="flex justify-center pt-12">
      <Button
        disabled={disabled}
        variant="outline"
        onClick={() => setSize(size + 1)}
      >
        Load More
      </Button>
    </div>
  );
}
