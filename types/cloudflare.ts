/**
 * Cloudflare Pages Functions and Durable Objects TypeScript types
 */

// Durable Object namespace binding
export interface DurableObjectNamespace {
  idFromName(name: string): DurableObjectId;
  get(id: DurableObjectId): DurableObjectStub;
}

export interface DurableObjectId {
  toString(): string;
}

export interface DurableObjectStub {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

// Durable Object state
export interface DurableObjectState {
  waitUntil(promise: Promise<unknown>): void;
  storage: DurableObjectStorage;
}

export interface DurableObjectStorage {
  get<T = unknown>(key: string): Promise<T | undefined>;
  put<T = unknown>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<boolean>;
  list<T = unknown>(options?: DurableObjectListOptions): Promise<Map<string, T>>;
}

export interface DurableObjectListOptions {
  start?: string;
  end?: string;
  prefix?: string;
  reverse?: boolean;
  limit?: number;
}

// Environment variables for Pages Functions
export interface Env {
  // MongoDB configuration
  MONGODB_URI?: string;
  MONGODB_DATABASE?: string;
  MONGODB_DEFAULT_COLLECTION?: string;

  // GitHub configuration
  GITHUB_USERNAME?: string;
  GITHUB_TOKEN?: string;
  GITHUB_PRIVATE_OWNER?: string;
  GITHUB_PRIVATE_REPO?: string;
  SYNC_SECRET?: string;

  // Durable Object binding
  MONGO_DO?: DurableObjectNamespace;
}

// Environment variables for Durable Object
export interface DurableObjectEnv {
  MONGODB_URI: string;
  MONGODB_DATABASE: string;
  MONGODB_DEFAULT_COLLECTION?: string;
}

// Pages Function context
export interface PagesFunctionContext {
  request: Request;
  env: Env;
  params?: Record<string, string>;
  waitUntil?: (promise: Promise<unknown>) => void;
  next?: () => Promise<Response>;
  data?: Record<string, unknown>;
}

// MongoDB operation types
export type MongoOperation =
  | 'find'
  | 'findOne'
  | 'insertOne'
  | 'updateOne'
  | 'deleteOne'
  | 'count'
  | 'aggregate';

export interface MongoOperationArgs {
  filter?: Record<string, unknown>;
  document?: Record<string, unknown>;
  update?: Record<string, unknown>;
  options?: Record<string, unknown>;
  pipeline?: unknown[];
  limit?: number;
  skip?: number;
}

export interface MongoOperationOptions {
  collection?: string;
  args?: MongoOperationArgs;
}

// MongoDB operation result types
export interface MongoFindResult {
  documents: unknown[];
}

export interface MongoFindOneResult {
  [key: string]: unknown;
}

export interface MongoInsertOneResult {
  insertedId: string;
  acknowledged: boolean;
}

export interface MongoUpdateOneResult {
  matchedCount: number;
  modifiedCount: number;
  upsertedId?: string;
  acknowledged: boolean;
}

export interface MongoDeleteOneResult {
  deletedCount: number;
  acknowledged: boolean;
}

export interface MongoCountResult {
  count: number;
}

export interface MongoAggregateResult {
  documents: unknown[];
}

// Type guards for operation results
export function isCountResult(result: MongoOperationResult): result is MongoCountResult {
  return typeof result === 'object' && result !== null && 'count' in result;
}

export function isAggregateResult(result: MongoOperationResult): result is MongoAggregateResult {
  return typeof result === 'object' && result !== null && 'documents' in result;
}

export type MongoOperationResult =
  | MongoFindResult
  | MongoFindOneResult
  | MongoInsertOneResult
  | MongoUpdateOneResult
  | MongoDeleteOneResult
  | MongoCountResult
  | MongoAggregateResult;

// Durable Object request/response
export interface DurableObjectRequest {
  op: MongoOperation;
  collection?: string;
  args?: MongoOperationArgs;
}

export interface DurableObjectResponse {
  result?: MongoOperationResult;
  error?: string;
}

