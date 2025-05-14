import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiUpload, FiCheckCircle } from 'react-icons/fi';
import { format, addDays, getDay } from 'date-fns';

// Mock data for device types
const deviceTypes = [
  'Smartphone', 'Tablet', 'Laptop', 'Desktop Computer', 
  'Game Console', 'Smart Watch', 'Headphones/Earbuds', 'Other'
];

// Mock data for common issues
const commonIssues = {
  'Smartphone': [
    'Cracked Screen', 'Battery Issues', 'Charging Problems', 
    'Water Damage', 'Camera Not Working', 'Software Issues', 'Other'
  ],
  'Tablet': [
    'Cracked Screen', 'Battery Issues', 'Charging Problems', 
    'Water Damage', 'Not Powering On', 'Software Issues', 'Other'
  ],
  'Laptop': [
    'Screen Issues', 'Battery Problems', 'Keyboard Replacement', 
    'Charging Issues', 'Hard Drive Failure', 'Performance Problems', 'Other'
  ],
  'Desktop Computer': [
    'Not Powering On', 'Slow Performance', 'Hard Drive Issues',
    'Operating System Problems', 'Virus Removal', 'Hardware Upgrade', 'Other'
  ],
  'Game Console': [
    'Not Powering On', 'Disc Reading Issues', 'Controller Problems',
    'Overheating', 'Network Connection Issues', 'Other'
  ],
  'Smart Watch': [
    'Screen Damage', 'Battery Issues', 'Button Not Working',
    'Not Syncing', 'Water Damage', 'Other'
  ],
  'Headphones/Earbuds': [
    'Audio Problems', 'Charging Case Issues', 'Connection Problems',
    'Physical Damage', 'Battery Issues', 'Other'
  ],
  'Other': ['Please Describe Your Issue'],
};

// Generate available time slots
const generateTimeSlots = () => {
  const slots = [];
  const startHour = 9; // 9 AM
  const endHour = 18; // 6 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(timeString);
    }
  }
  
  return slots;
};

// Generate available dates (next 14 days excluding Sundays)
const generateAvailableDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 1; i <= 14; i++) {
    const date = addDays(today, i);
    // Skip Sundays (0 = Sunday)
    if (getDay(date) !== 0) {
      dates.push(date);
    }
  }
  
  return dates;
};

const BookRepairPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    deviceType: '',
    brand: '',
    model: '',
    issueType: '',
    issueDescription: '',
    date: '',
    time: '',
    images: [],
    termsAccepted: false,
  });

  const availableDates = generateAvailableDates();
  const timeSlots = generateTimeSlots();

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === 'file') {
      setFormData({
        ...formData,
        images: [...formData.images, ...files],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Reset issue type when device type changes
    if (name === 'deviceType') {
      setFormData({
        ...formData,
        deviceType: value,
        issueType: '',
      });
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to Supabase
    console.log('Form submitted:', formData);
    // Move to confirmation step
    nextStep();
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= item ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {item}
              </div>
              {item < 4 && (
                <div
                  className={`h-1 w-12 ${
                    step > item ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm mt-2 px-4">
          <span className={step >= 1 ? 'text-primary-600 font-medium' : 'text-gray-500'}>
            Device Info
          </span>
          <span className={step >= 2 ? 'text-primary-600 font-medium' : 'text-gray-500'}>
            Issue Details
          </span>
          <span className={step >= 3 ? 'text-primary-600 font-medium' : 'text-gray-500'}>
            Schedule
          </span>
          <span className={step >= 4 ? 'text-primary-600 font-medium' : 'text-gray-500'}>
            Confirmation
          </span>
        </div>
      </div>
    );
  };

  const renderDeviceInfoForm = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Device Information</h2>
        
        <div className="space-y-4">
          {/* Device Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Device Type*
            </label>
            <select
              name="deviceType"
              value={formData.deviceType}
              onChange={handleInputChange}
              className="input"
              required
            >
              <option value="">Select Device Type</option>
              {deviceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand/Manufacturer*
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              placeholder="e.g. Apple, Samsung, HP"
              className="input"
              required
            />
          </div>

          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model*
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              placeholder="e.g. iPhone 13, Galaxy S21"
              className="input"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={nextStep}
              disabled={!formData.deviceType || !formData.brand || !formData.model}
              className={`w-full py-3 px-4 rounded-md font-medium ${
                !formData.deviceType || !formData.brand || !formData.model
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderIssueDetailsForm = () => {
    const issueOptions = formData.deviceType ? commonIssues[formData.deviceType] || [] : [];

    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Issue Details</h2>
        
        <div className="space-y-4">
          {/* Issue Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type of Issue*
            </label>
            <select
              name="issueType"
              value={formData.issueType}
              onChange={handleInputChange}
              className="input"
              required
            >
              <option value="">Select Issue Type</option>
              {issueOptions.map((issue) => (
                <option key={issue} value={issue}>
                  {issue}
                </option>
              ))}
            </select>
          </div>

          {/* Issue Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Describe the Issue*
            </label>
            <textarea
              name="issueDescription"
              value={formData.issueDescription}
              onChange={handleInputChange}
              rows="4"
              placeholder="Please provide details about your device's problem..."
              className="input"
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Images (Optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500"
                  >
                    <span>Upload images</span>
                    <input
                      id="file-upload"
                      name="images"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      multiple
                      onChange={handleInputChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Display uploaded images */}
          {formData.images.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Uploaded Images
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from(formData.images).map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${index + 1}`}
                      className="h-24 w-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                    >
                      <span className="sr-only">Remove</span>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={prevStep}
              className="py-2 px-4 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              disabled={!formData.issueType || !formData.issueDescription}
              className={`py-2 px-4 rounded-md font-medium ${
                !formData.issueType || !formData.issueDescription
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderScheduleForm = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule Your Repair</h2>
        
        <div className="space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
            </div>
          </div>

          {/* Appointment Date and Time */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select Date & Time</h3>
            
            {/* Date Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date*
              </label>
              <div className="flex items-center">
                <FiCalendar className="text-gray-400 mr-2" />
                <select
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="input"
                  required
                >
                  <option value="">Select a Date</option>
                  {availableDates.map((date, index) => (
                    <option key={index} value={format(date, 'yyyy-MM-dd')}>
                      {format(date, 'EEEE, MMMM d, yyyy')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Time*
              </label>
              <div className="flex items-center">
                <FiClock className="text-gray-400 mr-2" />
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="input"
                  required
                >
                  <option value="">Select a Time</option>
                  {timeSlots.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mt-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={prevStep}
              className="py-2 px-4 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={
                !formData.firstName ||
                !formData.lastName ||
                !formData.email ||
                !formData.phone ||
                !formData.date ||
                !formData.time ||
                !formData.termsAccepted
              }
              className={`py-2 px-4 rounded-md font-medium ${
                !formData.firstName ||
                !formData.lastName ||
                !formData.email ||
                !formData.phone ||
                !formData.date ||
                !formData.time ||
                !formData.termsAccepted
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderConfirmation = () => {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <FiCheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h2>
        <p className="text-gray-600 mb-8">
          Your repair appointment has been scheduled successfully.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8 max-w-md mx-auto text-left">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Appointment Details</h3>
          
          <div className="space-y-3 text-sm">
            <p>
              <span className="font-medium">Device:</span> {formData.brand} {formData.model} ({formData.deviceType})
            </p>
            <p>
              <span className="font-medium">Issue:</span> {formData.issueType}
            </p>
            <p>
              <span className="font-medium">Date:</span> {formData.date && format(new Date(formData.date), 'EEEE, MMMM d, yyyy')}
            </p>
            <p>
              <span className="font-medium">Time:</span> {formData.time}
            </p>
            <p>
              <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
            </p>
            <p>
              <span className="font-medium">Contact:</span> {formData.email}
            </p>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          We've sent a confirmation email to <span className="font-medium">{formData.email}</span> with all the details.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="py-2 px-4 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50"
          >
            Return to Home
          </Link>
          <Link
            to="/account"
            className="py-2 px-4 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700"
          >
            View My Appointments
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {renderStepIndicator()}
          
          <form>
            {step === 1 && renderDeviceInfoForm()}
            {step === 2 && renderIssueDetailsForm()}
            {step === 3 && renderScheduleForm()}
            {step === 4 && renderConfirmation()}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookRepairPage; 