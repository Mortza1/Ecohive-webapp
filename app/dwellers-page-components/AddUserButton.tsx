"use client";

import React, { useState } from 'react';
import { User } from '../types/user';
import { users } from '../data/users';
import { sendInvite } from '../api/actions';

interface AddUserButtonProps {
  manager_id: string;
  house_id: string;
}

export const AddUserButton: React.FC<AddUserButtonProps> = ({ manager_id, house_id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<Partial<User>>({
    image: "https://cdn.builder.io/api/v1/image/assets/e97f4b049aa04c0fb59c904d1d337327/141d624aa64764dbd3b4950c64b8a5532929dede97a67787f0eb1b370f9b25c8",
    energySaved: "0KW"
  });
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!newUser.email) {
      setError('Please enter an email address');
      return;
    }
    
    const userToAdd: User = {
      _id: (users.length + 1).toString(),
      email: newUser.email,
      image: "https://cdn.builder.io/api/v1/image/assets/e97f4b049aa04c0fb59c904d1d337327/141d624aa64764dbd3b4950c64b8a5532929dede97a67787f0eb1b370f9b25c8",
      energySaved: "0KW",
      name: '',
      role: 'Home Manager'
    };

    setIsLoading(true); // Start loading
    try {
      // Call sendInvite method instead of adding the user directly
      await sendInvite({ manager_id, house_id, email: newUser.email });
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error sending invite:', error);
      setError(error instanceof Error ? error.message : 'Failed to send invite');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-[#9CAD88] text-white rounded-xl hover:bg-[#8b9b78] transition-colors"
      >
        <span>Add Dweller</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h2 className="text-xl font-bold text-stone-600 mb-4">Invite Dweller</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-600">Email</label>
                <input
                    type="email"
                    required
                    className="mt-1 w-full px-3 py-2 border border-gray-300 text-black rounded-md"
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />

              </div>

              <div className="flex gap-2 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 bg-[#9CAD88] text-white rounded-md hover:bg-[#8b9b78] transition-colors ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
                  disabled={isLoading} // Disable button while loading
                >
                 {isLoading ? (
                    <div style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #000', borderRadius: '50%', width: '20px', height: '20px', animation: 'spin 2s linear infinite' }}></div>
                  ) : (
                    'Send Invite'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};