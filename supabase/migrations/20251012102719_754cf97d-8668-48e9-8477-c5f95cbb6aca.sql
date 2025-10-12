-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create spaces table (for couples/pairs)
CREATE TABLE public.spaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create space_members table (who's in which space)
CREATE TABLE public.space_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id UUID REFERENCES public.spaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(space_id, user_id)
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id UUID REFERENCES public.spaces(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create rankings table
CREATE TABLE public.rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id UUID REFERENCES public.spaces(id) ON DELETE CASCADE,
  points INTEGER DEFAULT 0,
  period TEXT NOT NULL CHECK (period IN ('daily', 'weekly', 'monthly', 'annually')),
  period_start TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(space_id, period, period_start)
);

-- Create games table
CREATE TABLE public.games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id UUID REFERENCES public.spaces(id) ON DELETE CASCADE,
  game_type TEXT NOT NULL CHECK (game_type IN ('bingo', 'tictactoe', 'truthordare')),
  game_state JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.space_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for spaces
CREATE POLICY "Users can view their spaces" ON public.spaces FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.space_members WHERE space_id = spaces.id AND user_id = auth.uid())
);
CREATE POLICY "Users can create spaces" ON public.spaces FOR INSERT WITH CHECK (auth.uid() = created_by);

-- RLS Policies for space_members
CREATE POLICY "Users can view members of their spaces" ON public.space_members FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.space_members sm WHERE sm.space_id = space_members.space_id AND sm.user_id = auth.uid())
);
CREATE POLICY "Users can join spaces" ON public.space_members FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for messages
CREATE POLICY "Users can view messages in their spaces" ON public.messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.space_members WHERE space_id = messages.space_id AND user_id = auth.uid())
);
CREATE POLICY "Users can send messages in their spaces" ON public.messages FOR INSERT WITH CHECK (
  auth.uid() = sender_id AND 
  EXISTS (SELECT 1 FROM public.space_members WHERE space_id = messages.space_id AND user_id = auth.uid())
);

-- RLS Policies for rankings
CREATE POLICY "Users can view rankings in their spaces" ON public.rankings FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.space_members WHERE space_id = rankings.space_id AND user_id = auth.uid())
);
CREATE POLICY "Users can update rankings in their spaces" ON public.rankings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.space_members WHERE space_id = rankings.space_id AND user_id = auth.uid())
);
CREATE POLICY "Users can insert rankings in their spaces" ON public.rankings FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.space_members WHERE space_id = rankings.space_id AND user_id = auth.uid())
);

-- RLS Policies for games
CREATE POLICY "Users can view games in their spaces" ON public.games FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.space_members WHERE space_id = games.space_id AND user_id = auth.uid())
);
CREATE POLICY "Users can update games in their spaces" ON public.games FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.space_members WHERE space_id = games.space_id AND user_id = auth.uid())
);
CREATE POLICY "Users can insert games in their spaces" ON public.games FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.space_members WHERE space_id = games.space_id AND user_id = auth.uid())
);

-- Enable realtime for relevant tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.rankings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.games;
ALTER PUBLICATION supabase_realtime ADD TABLE public.space_members;

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update rankings
CREATE OR REPLACE FUNCTION public.update_ranking_points(
  p_space_id UUID,
  p_points INTEGER,
  p_period TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  period_start_date TIMESTAMPTZ;
BEGIN
  -- Calculate period start based on period type
  CASE p_period
    WHEN 'daily' THEN
      period_start_date := DATE_TRUNC('day', NOW());
    WHEN 'weekly' THEN
      period_start_date := DATE_TRUNC('week', NOW());
    WHEN 'monthly' THEN
      period_start_date := DATE_TRUNC('month', NOW());
    WHEN 'annually' THEN
      period_start_date := DATE_TRUNC('year', NOW());
  END CASE;

  -- Insert or update ranking
  INSERT INTO public.rankings (space_id, points, period, period_start)
  VALUES (p_space_id, p_points, p_period, period_start_date)
  ON CONFLICT (space_id, period, period_start)
  DO UPDATE SET 
    points = rankings.points + p_points,
    updated_at = NOW();
END;
$$;