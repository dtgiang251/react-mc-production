"use client";

import React, { useState } from 'react';
import { Button } from "@/components/elements/button";
import { translations } from '@/translations/common';
import { useParams } from 'next/navigation';
import { i18n } from "@/i18n.config";
import { Locale } from '@/translations/types';

export const BookingForm = ({ 
  data,
  className
}: { 
  data: any;
  className?: string;
}) => {
  const params = useParams();
  const currentLocale = (params?.locale as Locale) || (i18n.defaultLocale as Locale);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    agreement: true
  });

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = data.form_message?.required_fields || 'This field is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = data.form_message?.required_fields || 'This field is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = data.form_message?.invalid_email || 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = data.form_message?.required_fields || 'This field is required';
    }
    
    if (!formData.service) {
      newErrors.service = data.form_message?.required_fields || 'This field is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
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
        agreement: true
      });
      
      alert(data.form_message.submit_success);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(data.form_message.submit_error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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
              className={`w-full mt-1 px-2 py-3 text-base leading-[18px] rounded-lg bg-transparent border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } outline-none`}
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </label>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="text-gray-300">{data?.services_label}
            <select 
              className={`w-full mt-1 px-2 py-3 leading-[18px] rounded-lg bg-transparent border ${
                errors.service ? 'border-red-500' : 'border-gray-300'
              } outline-none`}
              value={formData.service}
              onChange={(e) => handleInputChange('service', e.target.value)}
            >
              <option value="">{translations[currentLocale]?.selectService || translations[i18n.defaultLocale].selectService}</option>
              {data?.services?.map((service: any) => (
                <option className="text-black" key={service.service_name} value={service.service_name}>
                  {service.service_name}
                </option>
              ))}
            </select>
          </label>
          {errors.service && (
            <p className="text-red-500 text-xs mt-1">{errors.service}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 mb-6">
        <div>
          <label className="text-gray-300">{data?.email_label}
            <input
              type="email"
              className={`w-full mt-1 px-2 py-3 text-base leading-[18px] rounded-lg bg-transparent border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } outline-none`}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </label>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="text-gray-300">{data?.phone_label}
            <input
              type="text"
              className={`w-full mt-1 px-2 py-3 text-base leading-[18px] rounded-lg bg-transparent border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } outline-none`}
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </label>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="mb-6 message">
        <label className="text-gray-300">{data?.message_label}
        <textarea
          className="w-full mt-1 px-2 py-3 text-base leading-[18px] rounded-lg bg-transparent border border-gray-300 outline-none min-h-[150px]"
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
              checked={formData.agreement}
              required
              className="mt-1"
              onChange={(e) => setFormData({...formData, agreement: e.target.checked})}
            />
            <span>{data?.accent_primary}</span>
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="hover:text-white relative z-10 text-black text-base md:text-sm transition font-bold duration-200 px-11 py-4 flex items-center justify-center"
        >
          {loading ? 'Submitting...' : data?.submit_label}
        </Button>
      </div>
    </form>
  );
};