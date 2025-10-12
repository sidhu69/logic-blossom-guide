import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type Space = {
  id: string;
  name: string;
  code: string;
  created_by: string;
  created_at: string;
};

export function useSpace(userId: string | null) {
  const [space, setSpace] = useState<Space | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchSpace = async () => {
      // Get user's space
      const { data: memberData } = await supabase
        .from('space_members')
        .select('space_id')
        .eq('user_id', userId)
        .maybeSingle();

      if (memberData) {
        const { data: spaceData } = await supabase
          .from('spaces')
          .select('*')
          .eq('id', memberData.space_id)
          .single();

        if (spaceData) {
          setSpace(spaceData);
        }
      }
      setLoading(false);
    };

    fetchSpace();

    // Subscribe to space changes
    const channel = supabase
      .channel('space_members_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'space_members',
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchSpace();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const createSpace = async (name: string, userId: string) => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const { data: spaceData, error: spaceError } = await supabase
      .from('spaces')
      .insert({
        name,
        code,
        created_by: userId,
      })
      .select()
      .single();

    if (spaceError) return { error: spaceError };

    // Add creator as member
    const { error: memberError } = await supabase
      .from('space_members')
      .insert({
        space_id: spaceData.id,
        user_id: userId,
      });

    if (memberError) return { error: memberError };

    setSpace(spaceData);
    return { data: spaceData, error: null };
  };

  const joinSpace = async (code: string, userId: string) => {
    const { data: spaceData, error: spaceError } = await supabase
      .from('spaces')
      .select('*')
      .eq('code', code)
      .single();

    if (spaceError) return { error: spaceError };

    const { error: memberError } = await supabase
      .from('space_members')
      .insert({
        space_id: spaceData.id,
        user_id: userId,
      });

    if (memberError) return { error: memberError };

    setSpace(spaceData);
    return { data: spaceData, error: null };
  };

  return { space, loading, createSpace, joinSpace };
}
