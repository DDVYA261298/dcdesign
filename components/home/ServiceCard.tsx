// components/home/ServiceCard.tsx
interface ServiceCardProps {
  title: string;
  description: string;
  iconName: string;  // e.g. "eicon-layout"
}

export default function ServiceCard({ title, description, iconName }: ServiceCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg flex items-start space-x-4">
      <i className={`eicon ${iconName} text-4xl text-primary`} />
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
