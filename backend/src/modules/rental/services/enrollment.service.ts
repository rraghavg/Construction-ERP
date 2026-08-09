import { ProgramEnrollmentModel } from '../models/programEnrollment.model';
import { UnitModel } from '../../master-data/models/unit.model';
import { generateId } from '../../../utils/generateId';

export class EnrollmentService {
  /**
   * Enrolls a sold unit into either the Rental Program or Maintenance Only program.
   */
  static async enrollUnit(
    tenantId: string,
    unitId: string,
    ownerId: string,
    programType: 'RENTAL_PROGRAM' | 'MAINTENANCE_ONLY',
    userId: string
  ) {
    const unit = await UnitModel.findOne({ tenantId, unitId });
    if (!unit) {
      throw new Error('Unit not found');
    }

    if (unit.ownershipStatus !== 'SOLD') {
      throw new Error('Only SOLD units can be enrolled in a program.');
    }

    // Check for existing active enrollment
    const existingEnrollment = await ProgramEnrollmentModel.findOne({
      tenantId,
      unitId,
      status: 'ACTIVE'
    });

    if (existingEnrollment) {
      throw new Error(`Unit is already actively enrolled in ${existingEnrollment.programType}`);
    }

    // Create the enrollment record
    const enrollment = new ProgramEnrollmentModel({
      enrollmentId: generateId('ENR'),
      tenantId,
      unitId,
      ownerId,
      programType,
      status: 'ACTIVE',
      createdBy: userId,
      updatedBy: userId
    });

    await enrollment.save();

    // Update the unit's program enrollment flag
    unit.programEnrollment = programType;
    unit.updatedBy = userId;
    await unit.save();

    return enrollment;
  }

  /**
   * Fetches all active enrollments for a given tenant.
   */
  static async getActiveEnrollments(tenantId: string) {
    return await ProgramEnrollmentModel.find({ tenantId, status: 'ACTIVE' })
      .populate('unitId', 'unitNumber code buildingId floorId')
      .populate('ownerId', 'firstName lastName email phone')
      .sort({ createdAt: -1 });
  }

  /**
   * Cancels an active enrollment (e.g., when an owner opts out).
   */
  static async cancelEnrollment(tenantId: string, enrollmentId: string, userId: string) {
    const enrollment = await ProgramEnrollmentModel.findOne({ tenantId, enrollmentId });
    if (!enrollment) {
      throw new Error('Enrollment not found');
    }

    if (enrollment.status !== 'ACTIVE') {
      throw new Error('Only ACTIVE enrollments can be cancelled.');
    }

    enrollment.status = 'CANCELLED';
    enrollment.endDate = new Date();
    enrollment.updatedBy = userId;
    await enrollment.save();

    // Revert the unit's program enrollment flag
    await UnitModel.findOneAndUpdate(
      { tenantId, unitId: enrollment.unitId },
      { programEnrollment: 'NONE', updatedBy: userId }
    );

    return enrollment;
  }
}
