import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type Game = {
  id: string;
  space_id: string;
  game_type: 'bingo' | 'tictactoe' | 'truthordare';
  game_state: any;
  created_at: string;
  updated_at: string;
};

export function useRealtimeGame(spaceId: string | null, gameType: string) {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!spaceId) {
      setLoading(false);
      return;
    }

    // Fetch or create game
    const initGame = async () => {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('space_id', spaceId)
        .eq('game_type', gameType)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        setGame(data);
      } else if (!data) {
        // Create new game
        const { data: newGame } = await supabase
          .from('games')
          .insert({
            space_id: spaceId,
            game_type: gameType,
            game_state: {},
          })
          .select()
          .single();

        if (newGame) {
          setGame(newGame);
        }
      }
      setLoading(false);
    };

    initGame();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`games:${spaceId}:${gameType}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'games',
          filter: `space_id=eq.${spaceId}`,
        },
        (payload) => {
          if (payload.new && (payload.new as Game).game_type === gameType) {
            setGame(payload.new as Game);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [spaceId, gameType]);

  const updateGameState = async (newState: any) => {
    if (!game) return { error: new Error('No game initialized') };

    const { error } = await supabase
      .from('games')
      .update({
        game_state: newState,
        updated_at: new Date().toISOString(),
      })
      .eq('id', game.id);

    return { error };
  };

  return { game, loading, updateGameState };
}
