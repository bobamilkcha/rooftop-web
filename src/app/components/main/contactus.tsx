"use client";

import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: '' // 'error' or 'success'
  });
  const [isHovering, setIsHovering] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phoneNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      // Simulate successful sending
      console.log('Form data sent:', formData);
      setNotification({
        show: true,
        message: 'Your inquiry has been sent.\nWe\'ll get in touch soon!',
        type: 'success'
      });

      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          message: ''
        });
      }, 500);

      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 10000);
    } else {
      setNotification({
        show: true,
        message: 'Please correct the errors in the form.',
        type: 'error'
      });
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 5000);
    }
  };

  return (
    <div className="bg-rtgray-800 rounded-xl max-w-2xl mx-auto font-exo2 relative">
      {notification.show && notification.type === 'success' ? (
        <div className="p-8 rounded-xl flex flex-col items-center justify-center h-full bg-rtgray-900 group">
          <div
            className="rounded-full flex items-center justify-center mb-8"
            style={{
              width: '96px',
              height: '96px',
              backgroundColor: 'rgba(253, 201, 19, 0.1)',
            }}
          >
            <img
              src="/contactus/Frame 510.svg"
              alt="Success Logo"
              style={{ width: '40px', height: '40px' }}
            />
          </div>
          <p className="text-center whitespace-pre-line mb-[191px] text-rtgray-300 font-semibold text-[20px]">
            {notification.message}
          </p>
          <button
            onClick={() => setNotification(prev => ({ ...prev, show: false }))}
            className="bg-[#444444] text-rtgray-300 rounded-[68px] text-base hover:bg-rtwhite hover:text-[#000000] flex items-center justify-center py-3 px-6 w-full transition-colors duration-150"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <img
              src={isHovering ? "/contactus/chevron-left black.svg" : "/contactus/chevron-left.svg"}
              alt="Back Arrow"
              className="mr-2 transition-all duration-150"
              style={{
                width: '20px',
                height: '20px',
                filter: isHovering ? 'invert(1)' : '',
              }}
            />
            Send another inquiry
          </button>
        </div>
      ) : (
        <div className="p-8">
          <h2 className="text-rtyellow-200 text-3xl font-semibold text-center mb-6 font-exo2">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-6 mb-4">
              <div className="space-y-2 flex-1">
                <label htmlFor="firstName" className="block text-rtgray-300 text-sm font-semibold mb-1">First name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="appearance-none border border-rtgray-600 rounded-md w-full py-3 px-4 text-white leading-tight focus:outline-none focus:shadow-outline bg-rtgray-900 placeholder-rtgray-500 text-sm"
                />
                {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
              </div>
              <div className="space-y-2 flex-1">
                <label htmlFor="lastName" className="block text-rtgray-300 text-sm font-semibold mb-1">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="appearance-none border border-rtgray-600 rounded-md w-full py-3 px-4 text-white leading-tight focus:outline-none focus:shadow-outline bg-rtgray-900 placeholder-rtgray-500 text-sm"
                />
                {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 mb-4">
              <div className="space-y-2 flex-1">
                <label htmlFor="email" className="block text-rtgray-300 text-sm font-semibold mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="appearance-none border border-rtgray-600 rounded-md w-full py-3 px-4 text-white leading-tight focus:outline-none focus:shadow-outline bg-rtgray-900 placeholder-rtgray-500 text-sm"
                />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
              </div>
              <div className="space-y-2 flex-1">
                <label htmlFor="phoneNumber" className="block text-rtgray-300 text-sm font-semibold mb-1">Phone number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="appearance-none border border-rtgray-600 rounded-md w-full py-3 px-4 text-white leading-tight focus:outline-none focus:shadow-outline bg-rtgray-900 placeholder-rtgray-500 text-sm"
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>}
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <label htmlFor="message" className="block text-rtgray-300 text-sm font-semibold mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Message"
                className="appearance-none border border-rtgray-600 rounded-md w-full py-3 px-4 text-white leading-tight focus:outline-none focus:shadow-outline bg-rtgray-900 placeholder-rtgray-500 text-sm"
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs italic">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="bg-rtyellow-200 hover:bg-rtwhite text-[#000000] font-medium py-3 px-6 rounded-[68px] focus:outline-none focus:shadow-outline w-full flex justify-center items-center text-base transition-colors duration-150 group"
            >
              Inquire Now
              <img
                src="/contactus/arrow-right.svg"
                alt="Right Arrow"
                className="ml-2 transition-all duration-150"
                style={{ width: '20px', height: '20px', filter: 'brightness(0)' }} // Always black
              />
            </button>
          </form>
        </div>
      )}

      {notification.show && notification.type === 'error' && (
        <div
          className={`absolute -top-4 left-1/2 transform -translate-x-1/2 -translate-y-full w-full max-w-md px-4 py-3 rounded-md shadow-lg bg-red-500 text-white`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
            <button
              onClick={() => setNotification(prev => ({ ...prev, show: false }))}
              className="ml-2 text-xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;