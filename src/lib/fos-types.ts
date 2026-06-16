export type FosSprintStatus = "active" | "completed" | "archived";
export type FosPriorityStatus = "not_started" | "in_progress" | "completed" | "blocked";
export type FosIdeaStatus = "backlog" | "under_review" | "approved" | "rejected";

export interface FosSprint {
  id: string;
  workspace_id: string;
  name: string;
  goal: string;
  start_date: string;
  end_date: string;
  status: FosSprintStatus;
  completion_pct: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface FosWeeklyPriority {
  id: string;
  workspace_id: string;
  sprint_id: string | null;
  week_start: string;
  title: string;
  description: string | null;
  owner_id: string | null;
  owner_label: string | null;
  deadline: string | null;
  status: FosPriorityStatus;
  is_company_goal: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface FosWeeklyReview {
  id: string;
  workspace_id: string;
  user_id: string;
  user_label: string | null;
  week_start: string;
  done_this_week: string | null;
  not_done: string | null;
  blockers: string | null;
  focus_next_week: string | null;
  created_at: string;
  updated_at: string;
}

export interface FosIdea {
  id: string;
  workspace_id: string;
  author_id: string | null;
  author_label: string | null;
  title: string;
  description: string | null;
  status: FosIdeaStatus;
  created_at: string;
  updated_at: string;
}

export interface FosSprintGoalHistory {
  id: string;
  sprint_id: string;
  old_goal: string;
  new_goal: string;
  changed_by: string | null;
  changed_at: string;
}

export interface FosMetrics {
  tasksCompletedThisWeek: number;
  tasksOverdue: number;
  sprintCompletionRate: number;
  accountabilityScore: number;
  activeProjects: number;
  blockedTasks: number;
}

export interface FosActivityItem {
  id: string;
  type: "priority_completed" | "idea_added" | "review_submitted" | "lead_added" | "sprint_started";
  label: string;
  actor: string | null;
  created_at: string;
}

export function getWeekStart(d: Date = new Date()): string {
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diff);
  return monday.toISOString().split("T")[0];
}
