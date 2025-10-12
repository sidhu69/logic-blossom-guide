import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type Ranking = {
  id: string;
  space_id: string;
  points: number;
  period: 'daily' | 'weekly' | 'monthly' | 'annually';
  period_start: string;
  updated_at: string;
  space?: {
    name: string;
    space_members: Array<{
      profiles: {
        id: string;
        username: string;
        avatar_url: string | null;
      };
    }>;
  };
};

export function useRealtimeRankings(period: string) {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Calculate period start
    const now = new Date();
    let periodStart: Date;
    
    switch (period) {
      case 'daily':
        periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'weekly':
        const day = now.getDay();
        periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day);
        break;
      case 'monthly':
        periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'annually':
        periodStart = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    // Fetch initial rankings
    const fetchRankings = async () => {
      const { data, error } = await supabase
        .from('rankings')
        .select(`
          *,
          space:space_id (
            name,
            space_members (
              profiles (
                id,
                username,
                avatar_url
              )
            )
          )
        `)
        .eq('period', period)
        .gte('period_start', periodStart.toISOString())
        .order('points', { ascending: false });

      if (!error && data) {
        setRankings(data);
      }
      setLoading(false);
    };

    fetchRankings();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`rankings:${period}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'rankings',
          filter: `period=eq.${period}`,
        },
        () => {
          // Refetch on any change
          fetchRankings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [period]);

  return { rankings, loading };
}
