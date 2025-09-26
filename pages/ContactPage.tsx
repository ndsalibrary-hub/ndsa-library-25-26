
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Contact Us</h1>
      <div className="space-y-6 text-slate-700">
        <p>We are here to help you with any inquiries you may have. Please feel free to reach out to us through any of the following methods.</p>
        
        <div>
          <h2 className="text-xl font-semibold text-sky-700">Address</h2>
          <p>NDSA Library, 123 Knowledge Avenue, Education City, 45678</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-sky-700">Phone</h2>
          <p>(123) 456-7890</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-sky-700">Email</h2>
          <p>librarian@ndsa.edu</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-sky-700">Library Hours</h2>
          <ul className="list-disc list-inside ml-4">
            <li>Monday - Friday: 9:00 AM - 8:00 PM</li>
            <li>Saturday: 10:00 AM - 6:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
