import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const projectStats = [
  { name: 'Jan', projects: 4 },
  { name: 'Feb', projects: 3 },
  { name: 'Mar', projects: 5 },
  { name: 'Apr', projects: 7 },
  { name: 'May', projects: 2 },
  { name: 'Jun', projects: 6 }
];

export default function Chart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={projectStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="projects" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
