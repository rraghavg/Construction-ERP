import apiClient from '../api/apiClient';

export const crmService = {
  // Fetch All Leads
  async getLeads() {
    try {
      const response = await apiClient.get('/crm/leads');
      return response.data;
    } catch (err) {
      console.warn('CRM API unavailable, falling back to local dataset:', err);
      return null;
    }
  },

  // Create New Lead Prospect
  async createLead(leadData) {
    const response = await apiClient.post('/crm/leads', leadData);
    return response.data;
  },

  // Create Opportunity
  async createOpportunity(oppData) {
    const response = await apiClient.post('/crm/opportunities', oppData);
    return response.data;
  },

  // Update Opportunity Stage
  async updateOpportunityStage(oppId, stageData) {
    const response = await apiClient.patch(`/crm/opportunities/${oppId}/stage`, stageData);
    return response.data;
  },

  // Reassign Opportunity
  async assignOpportunity(oppId, assignData) {
    const response = await apiClient.patch(`/crm/opportunities/${oppId}/assign`, assignData);
    return response.data;
  },

  // Log Interaction / Schedule Follow-Up
  async createInteraction(interactionData) {
    const response = await apiClient.post('/crm/interactions', interactionData);
    return response.data;
  },

  // Schedule Site Visit
  async createSiteVisit(visitData) {
    const response = await apiClient.post('/crm/site-visits', visitData);
    return response.data;
  },

  // Fetch CRM Analytics
  async getAnalytics(projectId = 'ALL') {
    try {
      const response = await apiClient.get('/crm/analytics', { params: { projectId } });
      return response.data;
    } catch (err) {
      console.warn('CRM Analytics API unavailable:', err);
      return null;
    }
  }
};
