export type FosSprintStatus = "active" | "completed" | "archived";
export type FosPriorityStatus = "not_started" | "in_progress" | "completed" | "blocked";
export type FosIdeaStatus = "backlog" | "under_review" | "approved" | "rejected";
export type FosDecisionStatus = "pending" | "decided";

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
  is_fire: boolean;
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
  commitmentScore: number;
  activeProjects: number;
  blockedTasks: number;
  leadsThisWeek: number;
  hasWeeklyReview: boolean;
  sprintGoalChanges: number;
}

export interface FosDecision {
  id: string;
  workspace_id: string;
  author_label: string | null;
  title: string;
  description: string | null;
  reason: string | null;
  status: FosDecisionStatus;
  decided_at: string;
  created_at: string;
}

export interface FosWaitingFor {
  id: string;
  workspace_id: string;
  from_label: string;
  for_label: string;
  description: string;
  resolved: boolean;
  created_at: string;
}

export interface FosDailyNote {
  id: string;
  workspace_id: string;
  owner_label: string;
  date: string;
  content: string | null;
  created_at: string;
  updated_at: string;
}

export interface FosFounderJournal {
  id: string;
  workspace_id: string;
  author_label: string;
  date: string;
  went_well: string | null;
  problem: string | null;
  biggest_win: string | null;
  created_at: string;
  updated_at: string;
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
