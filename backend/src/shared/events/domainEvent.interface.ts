/**
 * Authoritative Domain Event Interface Contract for APEX Construction ERP.
 */

export interface IDomainEvent<T = any> {
  eventId: string;
  eventType: string;
  tenantId: string;
  actorId: string;
  timestamp: string;
  entityType: string;
  entityId: string;
  payload: T;
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    requestId?: string;
  };
}

export type EventSubscriber<T = any> = (event: IDomainEvent<T>) => Promise<void> | void;
