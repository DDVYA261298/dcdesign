interface Props {
    title: string;
    count: number;
  }
  
  export default function StatsCard({ title, count }: Props) {
    return (
      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-2xl">{count}</p>
      </div>
    );
  }
  