
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { DetailedUserData } from '@/pages/Register';

export const useSupabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveUser = async (userData: DetailedUserData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Insert the user data into the 'registrations' table
      const { error } = await supabase
        .from('registrations')
        .insert([userData]);
      
      if (error) {
        throw error;
      }
      
      return { success: true };
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving the registration');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      return { data, success: true };
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching registrations');
      return { success: false, error: err.message, data: [] };
    } finally {
      setLoading(false);
    }
  };

  return {
    saveUser,
    getUsers,
    loading,
    error
  };
};
