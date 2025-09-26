
import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import { ScaleIcon } from '../components/icons/ScaleIcon';

const RulesPage: React.FC = () => {
  const { rules } = useLibrary();

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <ScaleIcon className="h-10 w-10 text-sky-600" />
        <h1 className="ml-4 text-3xl font-bold text-slate-800">Library Rules & Regulations</h1>
      </div>
      <p className="text-slate-600 mb-8">To ensure a quiet and pleasant environment for everyone, all members are requested to adhere to the following rules.</p>
      <ul className="space-y-4">
        {rules.map((rule, index) => (
          <li key={rule.id} className="flex items-start">
            <span className="flex-shrink-0 bg-sky-600 text-white rounded-full h-6 w-6 text-sm font-bold flex items-center justify-center mr-4">{index + 1}</span>
            <span className="text-slate-700">{rule.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RulesPage;
