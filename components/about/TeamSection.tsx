// components/about/TeamSection.tsx

"use client"
import { useEffect, useState } from "react";
import Image from "next/image";

interface Employee {
  _id: string;
  name: string;
  position: string;
  department: string;
  image?: string;
}


const TeamSection = () => {
  const [team, setTeam] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/employees");
        const data = await res.json();
        setTeam(data);
      } catch (err) {
        console.error("Failed to load team:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);


  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">Our amazing designers and architects!</p>

        {loading ? (
          <p className="text-gray-500">Loading team members...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {team.map((member) => (
              <div key={member._id} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                {member.image && (
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{member.position}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 italic">{member.department}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
