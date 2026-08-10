import { JobModel, IJob } from '../models/job.model.js';
import { ApplicantModel, IApplicant } from '../models/applicant.model.js';
import { ApiError } from '../../../utils/apiError.js';

export class RecruitmentService {
  static async createJob(tenantId: string, data: Partial<IJob> & { title: string; department: string; location: string; type: string; description: string; requirements: string; salaryRange: { min: number; max: number }; positions: number; createdBy: string }): Promise<IJob> {
    const jobId = `JOB-${Date.now().toString().slice(-6)}`;
    const job = new JobModel({
      ...data,
      jobId,
      tenantId
    });
    return await job.save();
  }

  static async listJobs(tenantId: string, status?: string): Promise<IJob[]> {
    const query: any = { tenantId };
    if (status) query.status = status;
    return await JobModel.find(query).sort({ postedDate: -1 });
  }

  static async closeJob(tenantId: string, jobId: string): Promise<IJob> {
    const job = await JobModel.findOne({ tenantId, jobId });
    if (!job) {
      throw new ApiError(404, 'JOB_NOT_FOUND', 'Job not found');
    }
    job.status = 'CLOSED';
    job.closingDate = new Date();
    return await job.save();
  }

  static async addApplicant(tenantId: string, data: Partial<IApplicant> & { jobId: string; name: string; email: string; phone: string; resumeUrl: string; experience: number; createdBy: string }): Promise<IApplicant> {
    const applicantId = `APP-${Date.now().toString().slice(-6)}`;
    const applicant = new ApplicantModel({
      ...data,
      applicantId,
      tenantId
    });
    return await applicant.save();
  }

  static async listApplicants(tenantId: string, jobId?: string): Promise<IApplicant[]> {
    const query: any = { tenantId };
    if (jobId) query.jobId = jobId;
    return await ApplicantModel.find(query).sort({ createdAt: -1 });
  }

  static async updateApplicantStatus(tenantId: string, applicantId: string, status: 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFERED' | 'HIRED' | 'REJECTED', interviewDate?: Date, notes?: string): Promise<IApplicant> {
    const applicant = await ApplicantModel.findOne({ tenantId, applicantId });
    if (!applicant) {
      throw new ApiError(404, 'APPLICANT_NOT_FOUND', 'Applicant not found');
    }
    applicant.status = status;
    if (interviewDate) applicant.interviewDate = interviewDate;
    if (notes) applicant.notes = notes;
    return await applicant.save();
  }

  static async hireApplicant(tenantId: string, applicantId: string): Promise<IApplicant> {
    return this.updateApplicantStatus(tenantId, applicantId, 'HIRED');
  }
}
