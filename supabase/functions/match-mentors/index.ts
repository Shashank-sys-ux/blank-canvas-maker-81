import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ideaId } = await req.json();
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Fetch the idea
    const { data: idea, error: ideaError } = await supabaseClient
      .from('startup_ideas')
      .select('*')
      .eq('id', ideaId)
      .single();

    if (ideaError) throw ideaError;

    // Fetch all alumni and faculty profiles
    const { data: mentorProfiles, error: profilesError } = await supabaseClient
      .from('profiles')
      .select('*, user_roles!inner(role)')
      .or('user_roles.role.eq.alumni,user_roles.role.eq.faculty');

    if (profilesError) throw profilesError;

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    const matches = [];

    for (const mentor of mentorProfiles || []) {
      const prompt = `Score this mentor-student match (0-100) based on:

Startup Idea:
- Title: ${idea.title}
- Domain/Tags: ${idea.tags?.join(', ') || 'Not specified'}
- Tech Stack: ${idea.tech_stack?.join(', ') || 'Not specified'}
- Stage: ${idea.stage}

Mentor Profile:
- Name: ${mentor.full_name}
- Startup: ${mentor.startup_name || 'Not specified'}
- Domain: ${mentor.startup_domain || 'Not specified'}
- Tech Stack: ${mentor.tech_stack?.join(', ') || 'Not specified'}
- Expertise: ${mentor.expertise?.join(', ') || 'Not specified'}
- Help Areas: ${mentor.help_areas?.join(', ') || 'Not specified'}
- Availability: ${mentor.mentorship_availability ? 'Available' : 'Limited'}

Provide:
1. Domain Match Score (0-100) - How well do their domains align?
2. Tech Match Score (0-100) - How well do their tech stacks overlap?
3. Stage Match Score (0-100) - Does mentor's experience match the idea stage?
4. Overall Score (0-100) - Weighted average
5. Match Reason - 2-3 sentences explaining why this is a good (or bad) match

Format as JSON:
{
  "domain_match_score": <number>,
  "tech_match_score": <number>,
  "stage_match_score": <number>,
  "overall_score": <number>,
  "match_reason": "<string>"
}`;

      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { 
              role: 'system', 
              content: 'You are a mentor-matching expert. Analyze domain fit, technical alignment, and experience relevance.' 
            },
            { role: 'user', content: prompt }
          ],
          response_format: { type: "json_object" }
        }),
      });

      if (!response.ok) continue;

      const data = await response.json();
      const result = JSON.parse(data.choices[0].message.content);

      // Only include matches with overall score > 40
      if (result.overall_score > 40) {
        matches.push({
          student_id: idea.user_id,
          mentor_id: mentor.user_id,
          idea_id: ideaId,
          domain_match_score: result.domain_match_score,
          tech_match_score: result.tech_match_score,
          stage_match_score: result.stage_match_score,
          overall_score: result.overall_score,
          match_reason: result.match_reason,
        });
      }
    }

    // Sort by overall score and take top 5
    matches.sort((a, b) => b.overall_score - a.overall_score);
    const topMatches = matches.slice(0, 5);

    // Insert matches into database
    if (topMatches.length > 0) {
      const { data: insertedMatches, error: matchError } = await supabaseClient
        .from('mentor_matches')
        .insert(topMatches)
        .select();

      if (matchError) throw matchError;

      return new Response(JSON.stringify(insertedMatches), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify([]), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in match-mentors function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});