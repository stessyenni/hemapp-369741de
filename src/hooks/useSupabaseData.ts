
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useSupabaseData = (
  table: string,
  select: string = '*',
  dependencies: any[] = []
) => {
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!user) {
      setData([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data: result, error } = await (supabase as any)
        .from(table)
        .select(select)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setData(result || []);
      setError(null);
    } catch (err) {
      console.error(`Error fetching ${table}:`, err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error(`Error loading ${table}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, table, select, ...dependencies]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

export const useSupabaseInsert = (table: string) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const insert = async (data: any) => {
    if (!user) {
      toast.error('You must be logged in to perform this action');
      return { error: 'Not authenticated' };
    }

    try {
      setLoading(true);
      const { error } = await (supabase as any)
        .from(table)
        .insert({
          ...data,
          user_id: user.id,
        });

      if (error) {
        throw error;
      }

      toast.success('Data saved successfully!');
      return { error: null };
    } catch (err) {
      console.error(`Error inserting into ${table}:`, err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      toast.error(errorMessage);
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { insert, loading };
};
