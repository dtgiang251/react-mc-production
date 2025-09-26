"use client";

import React, { useState } from 'react';

export const BookingForm = ({ 
  data,
  className
}: { 
  data: any;
  className?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    agreement: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      alert(data.form_message.required_fields);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert(data.form_message.invalid_email);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        agreement: false
      });
      
      alert(data.form_message.submit_success);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(data.form_message.submit_error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`booking-form text-sm ${className || ''}`}>
      <h3 className="text-xl font-semibold mb-4 leading-none text-gray">{data?.booking_title}</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 mb-6">
        <div>
        <label className="text-gray-300">{data?.name_label}
          <input
            type="text"
            required
            className="w-full mt-1 px-2 py-3 leading-[18px] rounded-lg bg-transparent border border-gray-300 outline-none"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          /></label>
        </div>
        <div>
        <label className="text-gray-300">{data?.services_label}
          <select 
            className="w-full mt-1 px-2 py-3 leading-[18px] rounded-lg bg-transparent border border-gray-300 outline-none"
            value={formData.service}
            onChange={(e) => setFormData({...formData, service: e.target.value})}
          >
            {data?.services?.map((service: any) => (
              <option className="text-black" key={service.service_name} value={service.service_name}>
                {service.service_name}
              </option>
            ))}
          </select></label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 mb-6">
        <label className="text-gray-300">{data?.email_label}
        <input
          type="email"
          required
          className="w-full mt-1 px-2 py-3 leading-[18px] rounded-lg bg-transparent border border-gray-300 outline-none"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        </label>
        <label className="text-gray-300">{data?.phone_label}
        <input
          type="text"
          className="w-full mt-1 px-2 py-3 leading-[18px] rounded-lg bg-transparent border border-gray-300 outline-none"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
        </label>
      </div>

      <div className="mb-6 message">
        <label className="text-gray-300">{data?.message_label}
        <textarea
          className="w-full mt-1 px-2 py-3 leading-[18px] rounded-lg bg-transparent border border-gray-300 outline-none min-h-[150px]"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
        />
        </label>
      </div>

      <div className="form-bottom">
        <div className="flex items-start gap-2 mb-6">
          <label className="checkbox-wrap text-xs leading-[14px] opacity-60">
            <input
              type="checkbox"
              required
              className="mt-1"
              checked={formData.agreement}
              onChange={(e) => setFormData({...formData, agreement: e.target.checked})}
            />
            <span>{data?.accent_primary}</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-[#C4AD94] hover:text-white border-x border-b border-t-0 border-solid border-primary2 relative z-10 text-black text-base md:text-sm transition font-bold duration-200 rounded-full px-11 py-4 flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF60_inset,_0px_1px_0px_0px_#FFFFFF60_inset]"
        >
          {loading ? 'Submitting...' : data?.submit_label}
        </button>
      </div>
    </form>
  );
};