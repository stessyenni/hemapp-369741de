
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type TableName = keyof Database['public']['Tables'];
type TableRow<T extends TableName> = Database['public']['Tables'][T]['Row'];
type TableInsert<T extends TableName> = Database['public']['Tables'][T]['Insert'];

export const useSupabaseData = <T extends TableName>(
  table: T,
  select: string = '*',
  dependencies: any[] = []
) => {
  const { user } = useAuth();
  const [data, setData] = useState<TableRow<T>[]>([]);
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
      const { data: result, error } = await supabase
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

export const useSupabaseInsert = <T extends TableName>(table: T) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const insert = async (data: Omit<TableInsert<T>, 'user_id' | 'id' | 'created_at'>) => {
    if (!user) {
      toast.error('You must be logged in to perform this action');
      return { error: 'Not authenticated' };
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from(table)
        .insert({
          ...data,
          user_id: user.id,
        } as TableInsert<T>);

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
