'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { jobRequestsAPI } from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal, { ModalFooter } from '@/components/ui/Modal';

export default function JobRequestForm({ master, isOpen, onClose, onSuccess }) {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    preferredDate: '',
    preferredTime: '',
    budget: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isAuthenticated) {
      setError('Please log in to submit a job request.');
      return;
    }

    // Validation
    if (!formData.title.trim()) {
      setError('Please enter a title for your job request.');
      return;
    }
    if (!formData.description.trim()) {
      setError('Please describe your job requirements.');
      return;
    }

    setLoading(true);

    try {
      const response = await jobRequestsAPI.create({
        masterId: master.id,
        ...formData,
        budget: formData.budget ? parseFloat(formData.budget) : null,
      });

      setSuccess(true);
      onSuccess?.(response);

      // Reset form after success
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          title: '',
          description: '',
          preferredDate: '',
          preferredTime: '',
          budget: '',
          address: '',
          phone: '',
        });
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to submit job request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sage-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-display text-2xl font-semibold text-charcoal-900 mb-2">
            Request Sent!
          </h3>
          <p className="text-charcoal-600">
            Your job request has been sent to {master.name}. They will respond shortly.
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request a Job"
      description={`Send a job request to ${master.name}`}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        <Input
          label="Job Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Fix leaky kitchen faucet"
          required
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-charcoal-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your job requirements in detail..."
            rows={4}
            className="w-full px-4 py-3 bg-white border-2 border-charcoal-200 rounded-xl
                     font-body text-charcoal-900 placeholder:text-charcoal-400
                     transition-all duration-200 ease-smooth resize-none
                     focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Preferred Date"
            name="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
          />
          <Input
            label="Preferred Time"
            name="preferredTime"
            type="time"
            value={formData.preferredTime}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Budget (Optional)"
            name="budget"
            type="number"
            value={formData.budget}
            onChange={handleChange}
            placeholder="$"
            min="0"
            step="0.01"
          />
          <Input
            label="Contact Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
          />
        </div>

        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Where should the work be done?"
        />

        <ModalFooter>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Send Request
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
