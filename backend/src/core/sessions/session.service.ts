import { SessionModel } from './session.model.js';
import { ApiError } from '../../utils/apiError.js';
import { logAuditEvent } from '../../shared/audit/audit.model.js';

export class SessionService {
  static async listActiveSessions(tenantId: string, userId: string) {
    return SessionModel.find({
      tenantId,
      userId,
      isValid: true,
      expiresAt: { $gt: new Date() }
    }).select('-tokenHash').sort({ createdAt: -1 });
  }

  static async revokeSession(sessionId: string, tenantId: string, actorUserId: string) {
    const session = await SessionModel.findOne({ sessionId, tenantId });
    if (!session) {
      throw new ApiError(404, 'SESSION_NOT_FOUND', 'Session not found');
    }

    session.isValid = false;
    await session.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'core.sessions',
      action: 'SESSION_REVOKED',
      recordType: 'Session',
      recordId: sessionId,
      status: 'success',
      severity: 'medium'
    });

    return { message: 'Session revoked successfully', sessionId };
  }

  static async revokeAllUserSessions(targetUserId: string, tenantId: string, actorUserId: string) {
    const result = await SessionModel.updateMany(
      { tenantId, userId: targetUserId, isValid: true },
      { isValid: false }
    );

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'core.sessions',
      action: 'ALL_USER_SESSIONS_REVOKED',
      recordType: 'User',
      recordId: targetUserId,
      afterState: { revokedCount: result.modifiedCount },
      status: 'success',
      severity: 'high'
    });

    return { message: 'All active sessions for user revoked', revokedCount: result.modifiedCount };
  }
}
