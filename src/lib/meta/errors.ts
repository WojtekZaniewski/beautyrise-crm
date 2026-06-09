export interface GraphError {
  message: string;
  code?: number;
  subcode?: number;
  fbtraceId?: string;
  httpStatus?: number;
  retryable: boolean;
}

interface MetaErrorBody {
  error?: {
    message?: string;
    error_user_msg?: string;
    code?: number;
    error_subcode?: number;
    fbtrace_id?: string;
    type?: string;
    is_transient?: boolean;
  };
}

const FATAL_CODES = new Set([100, 190, 200, 294, 803, 2500, 2804]);
const TRANSIENT_CODES = new Set([1, 2, 4, 17, 341, 368]);

export function classifyGraphError(httpStatus: number, body: unknown): GraphError {
  const err = (body as MetaErrorBody | null)?.error ?? {};
  const code = err.code;
  const message = err.error_user_msg || err.message || `Graph HTTP ${httpStatus}`;

  let retryable: boolean;
  if (err.is_transient) retryable = true;
  else if (typeof code === "number" && TRANSIENT_CODES.has(code)) retryable = true;
  else if (typeof code === "number" && FATAL_CODES.has(code)) retryable = false;
  else if (httpStatus === 429 || httpStatus >= 500) retryable = true;
  else if (httpStatus >= 400) retryable = false;
  else retryable = true;

  return { message, code, subcode: err.error_subcode, fbtraceId: err.fbtrace_id, httpStatus, retryable };
}

export function isAuthError(err: GraphError): boolean {
  return err.code === 190 || err.code === 102 || err.code === 200 || err.code === 10;
}
