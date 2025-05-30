// components/about/ValuesSection.tsx
import React from "react";
import { Award, Users, Clock, Lightbulb } from "lucide-react";

const ValuesSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          These core principles guide our approach to every project and client relationship.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: Award,
            title: 'Excellence',
            description: 'We strive for excellence in every aspect of our work, from the initial concept to the final detail.'
          },
          {
            icon: Users,
            title: 'Collaboration',
            description: 'We believe the best results come from true collaboration between our team and our clients.'
          },
          {
            icon: Clock,
            title: 'Timeliness',
            description: 'We respect our clients time and work diligently to deliver projects on schedule and within budget.'
          },
          {
            icon: Lightbulb,
            title: 'Innovation',
            description: 'We continuously explore new ideas, materials, and techniques to create unique, forward-thinking designs.'
          }
        ].map((value, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <value.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default ValuesSection;
