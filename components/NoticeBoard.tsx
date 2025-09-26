
import React from 'react';
import type { Notice } from '../types';

interface NoticeBoardProps {
  notices: Notice[];
}

const NoticeBoard: React.FC<NoticeBoardProps> = ({ notices }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2 border-slate-200">Notice Board</h2>
      <ul className="space-y-4">
        {notices.map(notice => (
          <li key={notice.id} className="p-4 bg-sky-50 rounded-md">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-sky-800">{notice.title}</h3>
              <span className="text-xs text-slate-500">{notice.date}</span>
            </div>
            <p className="text-slate-600 mt-1">{notice.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeBoard;
