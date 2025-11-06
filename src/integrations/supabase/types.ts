export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      idea_validations: {
        Row: {
          created_at: string | null
          id: string
          idea_id: string
          market_need_score: number | null
          overall_score: number | null
          problem_clarity_score: number | null
          recommendations: string | null
          risk_notes: string | null
          solution_feasibility_score: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          idea_id: string
          market_need_score?: number | null
          overall_score?: number | null
          problem_clarity_score?: number | null
          recommendations?: string | null
          risk_notes?: string | null
          solution_feasibility_score?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          idea_id?: string
          market_need_score?: number | null
          overall_score?: number | null
          problem_clarity_score?: number | null
          recommendations?: string | null
          risk_notes?: string | null
          solution_feasibility_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "idea_validations_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "startup_ideas"
            referencedColumns: ["id"]
          },
        ]
      }
      kanban_tasks: {
        Row: {
          assigned_to: string | null
          attachments: string[] | null
          comments: Json | null
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          idea_id: string
          priority: Database["public"]["Enums"]["priority_level"] | null
          roadmap_item_id: string | null
          status: Database["public"]["Enums"]["task_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          attachments?: string[] | null
          comments?: Json | null
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          idea_id: string
          priority?: Database["public"]["Enums"]["priority_level"] | null
          roadmap_item_id?: string | null
          status?: Database["public"]["Enums"]["task_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          attachments?: string[] | null
          comments?: Json | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          idea_id?: string
          priority?: Database["public"]["Enums"]["priority_level"] | null
          roadmap_item_id?: string | null
          status?: Database["public"]["Enums"]["task_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kanban_tasks_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "startup_ideas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kanban_tasks_roadmap_item_id_fkey"
            columns: ["roadmap_item_id"]
            isOneToOne: false
            referencedRelation: "roadmap_items"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_matches: {
        Row: {
          created_at: string | null
          domain_match_score: number | null
          id: string
          idea_id: string
          match_reason: string | null
          mentor_id: string
          overall_score: number | null
          stage_match_score: number | null
          student_id: string
          tech_match_score: number | null
        }
        Insert: {
          created_at?: string | null
          domain_match_score?: number | null
          id?: string
          idea_id: string
          match_reason?: string | null
          mentor_id: string
          overall_score?: number | null
          stage_match_score?: number | null
          student_id: string
          tech_match_score?: number | null
        }
        Update: {
          created_at?: string | null
          domain_match_score?: number | null
          id?: string
          idea_id?: string
          match_reason?: string | null
          mentor_id?: string
          overall_score?: number | null
          stage_match_score?: number | null
          student_id?: string
          tech_match_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mentor_matches_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "startup_ideas"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_requests: {
        Row: {
          created_at: string | null
          id: string
          idea_id: string
          match_id: string
          mentor_feedback: string | null
          mentor_id: string
          message: string | null
          status: Database["public"]["Enums"]["request_status"] | null
          student_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          idea_id: string
          match_id: string
          mentor_feedback?: string | null
          mentor_id: string
          message?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          student_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          idea_id?: string
          match_id?: string
          mentor_feedback?: string | null
          mentor_id?: string
          message?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentor_requests_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "startup_ideas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentor_requests_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "mentor_matches"
            referencedColumns: ["id"]
          },
        ]
      }
      pitch_decks: {
        Row: {
          content: Json
          created_at: string | null
          id: string
          idea_id: string
          updated_at: string | null
        }
        Insert: {
          content: Json
          created_at?: string | null
          id?: string
          idea_id: string
          updated_at?: string | null
        }
        Update: {
          content?: Json
          created_at?: string | null
          id?: string
          idea_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pitch_decks_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "startup_ideas"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          domain_preferences: string[] | null
          email: string
          expertise: string[] | null
          full_name: string
          help_areas: string[] | null
          id: string
          interests: string[] | null
          mentorship_availability: boolean | null
          preferred_idea_stages:
            | Database["public"]["Enums"]["idea_stage"][]
            | null
          preferred_startup_stages:
            | Database["public"]["Enums"]["idea_stage"][]
            | null
          skills: string[] | null
          startup_domain: string | null
          startup_name: string | null
          team_size: number | null
          tech_stack: string[] | null
          traction: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          domain_preferences?: string[] | null
          email: string
          expertise?: string[] | null
          full_name: string
          help_areas?: string[] | null
          id?: string
          interests?: string[] | null
          mentorship_availability?: boolean | null
          preferred_idea_stages?:
            | Database["public"]["Enums"]["idea_stage"][]
            | null
          preferred_startup_stages?:
            | Database["public"]["Enums"]["idea_stage"][]
            | null
          skills?: string[] | null
          startup_domain?: string | null
          startup_name?: string | null
          team_size?: number | null
          tech_stack?: string[] | null
          traction?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          domain_preferences?: string[] | null
          email?: string
          expertise?: string[] | null
          full_name?: string
          help_areas?: string[] | null
          id?: string
          interests?: string[] | null
          mentorship_availability?: boolean | null
          preferred_idea_stages?:
            | Database["public"]["Enums"]["idea_stage"][]
            | null
          preferred_startup_stages?:
            | Database["public"]["Enums"]["idea_stage"][]
            | null
          skills?: string[] | null
          startup_domain?: string | null
          startup_name?: string | null
          team_size?: number | null
          tech_stack?: string[] | null
          traction?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      progress_updates: {
        Row: {
          ai_summary: string | null
          created_at: string | null
          id: string
          idea_id: string
          mentor_feedback: string | null
          risks_identified: string[] | null
          student_id: string
          update_text: string
          week_number: number
        }
        Insert: {
          ai_summary?: string | null
          created_at?: string | null
          id?: string
          idea_id: string
          mentor_feedback?: string | null
          risks_identified?: string[] | null
          student_id: string
          update_text: string
          week_number: number
        }
        Update: {
          ai_summary?: string | null
          created_at?: string | null
          id?: string
          idea_id?: string
          mentor_feedback?: string | null
          risks_identified?: string[] | null
          student_id?: string
          update_text?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "progress_updates_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "startup_ideas"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmap_items: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_completed: boolean | null
          kpis: string[] | null
          milestones: string[] | null
          projects: string[] | null
          required_skills: string[] | null
          roadmap_id: string
          title: string
          updated_at: string | null
          week_number: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_completed?: boolean | null
          kpis?: string[] | null
          milestones?: string[] | null
          projects?: string[] | null
          required_skills?: string[] | null
          roadmap_id: string
          title: string
          updated_at?: string | null
          week_number: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_completed?: boolean | null
          kpis?: string[] | null
          milestones?: string[] | null
          projects?: string[] | null
          required_skills?: string[] | null
          roadmap_id?: string
          title?: string
          updated_at?: string | null
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "roadmap_items_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "roadmaps"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmaps: {
        Row: {
          created_at: string | null
          id: string
          idea_id: string
          total_weeks: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          idea_id: string
          total_weeks?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          idea_id?: string
          total_weeks?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "roadmaps_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "startup_ideas"
            referencedColumns: ["id"]
          },
        ]
      }
      startup_ideas: {
        Row: {
          created_at: string | null
          id: string
          problem: string
          solution: string
          stage: Database["public"]["Enums"]["idea_stage"]
          tags: string[] | null
          target_user: string
          tech_stack: string[] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          problem: string
          solution: string
          stage: Database["public"]["Enums"]["idea_stage"]
          tags?: string[] | null
          target_user: string
          tech_stack?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          problem?: string
          solution?: string
          stage?: Database["public"]["Enums"]["idea_stage"]
          tags?: string[] | null
          target_user?: string
          tech_stack?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "student" | "alumni" | "faculty"
      idea_stage: "idea" | "poc" | "mvp"
      priority_level: "low" | "medium" | "high"
      request_status: "pending" | "accepted" | "rejected"
      task_status: "backlog" | "doing" | "done"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["student", "alumni", "faculty"],
      idea_stage: ["idea", "poc", "mvp"],
      priority_level: ["low", "medium", "high"],
      request_status: ["pending", "accepted", "rejected"],
      task_status: ["backlog", "doing", "done"],
    },
  },
} as const
