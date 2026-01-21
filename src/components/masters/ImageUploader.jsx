'use client';

import { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { portfolioImagesAPI } from '@/lib/api';
import { cn } from '@/lib/utils';
import { MAX_PORTFOLIO_IMAGES } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function ImageUploader({ portfolioId, existingImages = [], onUploadSuccess }) {
  const { isAdmin } = useAuth();
  const fileInputRef = useRef(null);
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const remainingSlots = MAX_PORTFOLIO_IMAGES - existingImages.length;

  if (!isAdmin) {
    return null;
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    setError(null);

    // Validate file count
    if (files.length > remainingSlots) {
      setError(`You can only upload ${remainingSlots} more image(s). Maximum is ${MAX_PORTFOLIO_IMAGES}.`);
      return;
    }

    // Validate file types
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const invalidFiles = files.filter((f) => !validTypes.includes(f.type));
    if (invalidFiles.length > 0) {
      setError('Please select only image files (JPEG, PNG, GIF, WebP).');
      return;
    }

    // Validate file sizes (max 5MB each)
    const maxSize = 5 * 1024 * 1024;
    const oversizedFiles = files.filter((f) => f.size > maxSize);
    if (oversizedFiles.length > 0) {
      setError('Each image must be less than 5MB.');
      return;
    }

    setSelectedFiles(files);

    // Generate previews
    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setPreviews(newPreviews);
  };

  const removePreview = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);

    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index].url);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('portfolio_id', portfolioId);
      selectedFiles.forEach((file) => {
        formData.append('images', file);
      });

      const response = await portfolioImagesAPI.upload(formData);

      // Clean up previews
      previews.forEach((p) => URL.revokeObjectURL(p.url));
      setSelectedFiles([]);
      setPreviews([]);

      onUploadSuccess?.(response);
    } catch (err) {
      setError(err.message || 'Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const clearAll = () => {
    previews.forEach((p) => URL.revokeObjectURL(p.url));
    setSelectedFiles([]);
    setPreviews([]);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft border border-charcoal-100/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-charcoal-900">
          Upload Images
        </h3>
        <span className="text-sm text-charcoal-500">
          {existingImages.length} / {MAX_PORTFOLIO_IMAGES} images
        </span>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      {remainingSlots > 0 ? (
        <>
          {/* Drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              'relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all',
              'hover:border-primary-400 hover:bg-primary-50/50',
              previews.length > 0 ? 'border-primary-300 bg-primary-50/30' : 'border-charcoal-200'
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />

            <svg
              className="w-12 h-12 mx-auto text-charcoal-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>

            <p className="text-charcoal-600 mb-1">
              Click to select or drag and drop images
            </p>
            <p className="text-sm text-charcoal-400">
              PNG, JPG, GIF, WebP up to 5MB each. Max {remainingSlots} more image(s).
            </p>
          </div>

          {/* Preview grid */}
          {previews.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-charcoal-700">
                  {previews.length} image(s) selected
                </span>
                <button
                  onClick={clearAll}
                  className="text-sm text-charcoal-500 hover:text-red-500 transition-colors"
                >
                  Clear all
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {previews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-xl overflow-hidden bg-charcoal-100">
                      <img
                        src={preview.url}
                        alt={preview.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => removePreview(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white
                               flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <p className="mt-1 text-xs text-charcoal-500 truncate">
                      {preview.name}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  onClick={handleUpload}
                  loading={uploading}
                  disabled={selectedFiles.length === 0}
                >
                  Upload {selectedFiles.length} Image(s)
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <svg
            className="w-12 h-12 mx-auto text-charcoal-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-charcoal-600">
            Maximum images reached ({MAX_PORTFOLIO_IMAGES})
          </p>
          <p className="text-sm text-charcoal-400 mt-1">
            Delete some images to upload new ones.
          </p>
        </div>
      )}
    </div>
  );
}
