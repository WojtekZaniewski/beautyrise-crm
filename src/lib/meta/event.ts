import { randomUUID } from "node:crypto";

export type ActionSource =
  | "website" | "app" | "phone_call" | "chat" | "email"
  | "physical_store" | "system_generated" | "business_messaging" | "other";

export type CustomData = Record<string, unknown>;

export interface HashedUserData {
  em?: string | string[];
  ph?: string | string[];
  fn?: string;
  ln?: string;
  ct?: string;
  st?: string;
  zp?: string;
  country?: string;
  db?: string;
  ge?: string;
  external_id?: string;
  fbc?: string;
  fbp?: string;
  client_ip_address?: string;
  client_user_agent?: string;
  fb_login_id?: string;
}

export interface ServerEvent {
  event_name: string;
  event_time: number;
  event_id?: string;
  event_source_url?: string;
  action_source: ActionSource;
  user_data: HashedUserData;
  custom_data?: CustomData;
}

export interface EventInput {
  event_name: string;
  event_id?: string;
  event_time?: number;
  action_source?: ActionSource;
  user_data: HashedUserData;
  custom_data?: CustomData;
}

const SEVEN_DAYS = 7 * 24 * 60 * 60;

export function clampEventTime(t: number | undefined, nowSec = Math.floor(Date.now() / 1000)): number {
  const ts = typeof t === "number" && Number.isFinite(t) ? Math.floor(t) : nowSec;
  if (ts > nowSec + 60) return nowSec;
  if (ts < nowSec - SEVEN_DAYS) return nowSec - SEVEN_DAYS + 60;
  return ts;
}

export function buildServerEvent(input: EventInput): ServerEvent {
  const evt: ServerEvent = {
    event_name: input.event_name,
    event_time: clampEventTime(input.event_time),
    event_id: input.event_id || randomUUID(),
    action_source: input.action_source ?? "system_generated",
    user_data: input.user_data,
  };
  if (input.custom_data && Object.keys(input.custom_data).length > 0) {
    evt.custom_data = input.custom_data;
  }
  return evt;
}
