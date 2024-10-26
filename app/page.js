"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDatabase, ref, set } from "firebase/database";

import { v4 as uuidv4 } from 'uuid';
import { app } from './lib/firebase';

function writeUserData(userId, data) {
  const db = getDatabase(app);
  set(ref(db, 'users/' + userId), data);
}

const Page = () => {
  const [formData, setFormData] = useState({
    'lead_token': '61725b25f21c4d4d8773c88313c3f390',
    'caller_id': '',
    'traffic_source_id': '563967',
    'email': '',
    'first_name': '',
    'last_name': '',
    'state': '',
    'zip': '',
    'sub_id': '23426',
    'trusted_form_cert_url': 'https://cert.trustedform.com/3431e9af964e3ea37f42d57b23027de099024a23',
    'trusted_form_cert': 'https://ping.trustedform.com/0.iLHKNwuOBAIjay-2030JZ6VblKyE4OHfrFilBTbLl3LnEZJfqb4zjNmxkA_Ea1dXTkMafzs.GYTrsXdSgN7Ks26V0f4RYg.Y0YBNLnZxgdCeYTnmd8CQQ',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load the TrustedForm script
    const tfScript = document.createElement('script');
    tfScript.type = 'text/javascript';
    tfScript.async = true;
    tfScript.src = 'https://api.trustedform.com/trustedform.js?field=trusted_form_cert_url&ping_field=trusted_form_cert&l=' +
      new Date().getTime() + Math.random();
    document.body.appendChild(tfScript);

    // Example: Listen for an event or callback from the script
    window.addEventListener('trustedFormReady', (event) => {
      setFormData((prevData) => ({
        ...prevData,
        trusted_form_cert_url: event.detail.certUrl,
        trusted_form_cert: event.detail.cert,
      }));
    });

    return () => {
      // Clean up the event listener if necessary
      window.removeEventListener('trustedFormReady', () => {});
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);
    try {
      // Send data to your API using POST method
      const apiResponse = await axios.post('/api', formData);
      console.log('API Response:', apiResponse.data);

      // Generate a unique user ID
      const userId = uuidv4();
      writeUserData(userId, formData);

      toast.success('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <ToastContainer />
      <div className="w-full max-w-lg bg-white p-8 border-2 border-red-300 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">NEC Claims</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">First Name:</label>
            <input 
              type="text" 
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Last Name:</label>
            <input 
              type="text" 
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Caller ID:</label>
            <input 
              type="text" 
              name="caller_id"
              value={formData.caller_id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Email:</label>
            <input 
              type="text" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">State:</label>
            <input 
              type="text" 
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Zip Code:</label>
            <input 
              type="text" 
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Trusted Forms URL:</label>
            <input 
              type="text" 
              name="trusted_form_cert_url"
              value={formData.trusted_form_cert_url}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Trusted Form Certificate:</label>
            <input 
              type="text"
              name="trusted_form_cert"
              value={formData.trusted_form_cert}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="text-center">
            <button 
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;