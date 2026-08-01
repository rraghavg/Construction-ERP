// Mock Data Store for Construction ERP - Complete Central Data Repository

export const MODULES_LIST = [
  {
    id: 'dashboard',
    name: 'Dashboard Overview',
    icon: 'LayoutDashboard',
    badge: null,
    submodules: ['Main Overview', 'Branch Performance', 'Executive Summary']
  },
  {
    id: 'master-data',
    name: 'Master Data',
    icon: 'Database',
    badge: '13 Categories',
    submodules: [
      'Master Data Dashboard',
      'Company',
      'Projects',
      'Buildings',
      'Towers',
      'Floors',
      'Flats / Shops / Offices',
      'Flat Types',
      'Vendors',
      'Dealers',
      'Employees',
      'Banks',
      'Tax Settings',
      'Payment Modes',
      'Complaint Categories'
    ]
  },
  {
    id: 'crm',
    name: 'CRM & Lead Management',
    icon: 'Users',
    badge: '42 Leads',
    submodules: [
      'CRM Dashboard',
      'Leads',
      'Follow Ups',
      'Site Visits',
      'Call Recording',
      'Sales Pipeline',
      'Sales Targets',
      'Customer Conversion'
    ]
  },
  {
    id: 'sales',
    name: 'Sales & Bookings',
    icon: 'TrendingUp',
    badge: '184 Bookings',
    submodules: [
      'Sales Dashboard',
      'Bookings',
      'Agreements',
      'Payment Plans',
      'Installments',
      'Receipts',
      'Demand Letters',
      'Possession',
      'Cancellation-Refund',
      'Sales Pipeline',
      'Sales Targets'
    ]
  },
  {
    id: 'customer-mgmt',
    name: 'Customer Management',
    icon: 'Headphones',
    badge: '324 Customers',
    submodules: [
      'Customer Dashboard',
      'Customers Directory',
      'KYC Documents',
      'Nominees Registry',
      'Communication History',
      'Customer Helpdesk / Complaints',
      'Possession & Handover',
      'Demand Notices',
      'NOC Certificates'
    ]
  },
  {
    id: 'rental-mgmt',
    name: 'Rental Management',
    icon: 'KeyRound',
    badge: '482 Units',
    submodules: [
      'Rental Dashboard',
      'Owners Directory',
      'Tenant Allocation',
      'Rental Agreements',
      'Rent Collection',
      'Security Deposits',
      'Owner Settlement',
      'Lease Renewals',
      'Vacancies Catalog',
      'Rental Reports'
    ]
  },
  {
    id: 'maintenance',
    name: 'Maintenance & Facilities',
    icon: 'Wrench',
    badge: '42 Open',
    submodules: [
      'Maintenance Dashboard',
      'Complaints Register',
      'Service Requests',
      'Vendor Assignments',
      'Work Completion',
      'Maintenance Bills',
      'Customer Feedback',
      'SLA / TAT Report'
    ]
  },
  {
    id: 'inventory',
    name: 'Inventory & Materials',
    icon: 'Boxes',
    badge: '23 Low Stock',
    submodules: [
      'Inventory Dashboard',
      'Materials Catalog',
      'Suppliers Directory',
      'Purchase Orders',
      'GRN (Goods Receipt)',
      'Stock Issue',
      'Material Consumption',
      'Stock Transfer',
      'Stock Adjustment',
      'Reports & Valuation'
    ]
  },
  {
    id: 'finance',
    name: 'Finance & Accounts',
    icon: 'IndianRupee',
    badge: '12 Overdue',
    submodules: [
      'Finance Dashboard',
      'Chart of Accounts',
      'Income Management',
      'Expenses Management',
      'Banking & Reconciliation',
      'Budgeting & Forecasting',
      'Taxes (GST / TDS)',
      'Fixed Assets',
      'Financial Reports'
    ]
  },
  {
    id: 'hr',
    name: 'HR & Payroll',
    icon: 'UserCheck',
    badge: '186 Employees',
    submodules: [
      'HR Dashboard',
      'Employees Directory',
      'Attendance & Shifts',
      'Leave Management',
      'Payroll Processing',
      'Performance Reviews',
      'Recruitment & Jobs',
      'Training & Skill Development',
      'Documents Vault',
      'HR Reports'
    ]
  },
  {
    id: 'doc-mgmt',
    name: 'Document Management',
    icon: 'FileText',
    badge: null,
    submodules: ['Architectural Plans', 'Approved Contracts', 'Legal Documents', 'Client Files']
  },
  {
    id: 'notification-center',
    name: 'Notification Center',
    icon: 'Bell',
    badge: '9 Tasks',
    submodules: ['Unified Task Center', 'System Alerts', 'Broadcast Announcements', 'SMS & Email Logs']
  },
  {
    id: 'reports',
    name: 'Reports & Analytics',
    icon: 'BarChart3',
    badge: '7 Categories',
    submodules: [
      'Reports Dashboard',
      'Sales Reports',
      'Finance Reports',
      'Inventory Reports',
      'Customer Reports',
      'Rental Reports',
      'Maintenance Reports',
      'HR Reports',
      'Custom Report Builder',
      'Scheduled Reports'
    ]
  },
  {
    id: 'notifications',
    name: 'Notifications Centre',
    icon: 'Bell',
    badge: '23 Unread',
    submodules: [
      'All Notifications',
      'Unread Alerts',
      'Important',
      'Reminders',
      'System Alerts',
      'Notification Settings'
    ]
  },
  {
    id: 'user-mgmt',
    name: 'User Management & RBAC',
    icon: 'ShieldCheck',
    badge: '128 Users',
    submodules: [
      'User Management Dashboard',
      'Users Directory',
      'Roles & Hierarchy',
      'Permission Matrix',
      'User Groups',
      'Access Requests',
      'Login Activity & Audit',
      'Security Settings'
    ]
  },
  {
    id: 'settings',
    name: 'System Settings & Preferences',
    icon: 'Settings',
    badge: '128 Configs',
    submodules: [
      'Settings Dashboard',
      'General & Company',
      'Financial & Tax',
      'Project Defaults',
      'Approval Workflows',
      'System & Security',
      'Backup & Restore',
      'Integrations & Webhooks'
    ]
  },
  {
    id: 'audit-logs',
    name: 'Audit & Compliance Logs',
    icon: 'ShieldAlert',
    badge: '12,458 Logs',
    submodules: [
      'Audit Dashboard',
      'All Audit Logs',
      'Login History',
      'Data Changes Diff',
      'Critical Security Actions',
      'Deleted Records',
      'Access Changes',
      'Audit Reports & Alerts'
    ]
  }
];

export const INITIAL_KPIS = {
  totalProjects: {
    label: 'Total Projects',
    value: 24,
    formattedValue: '24 Active',
    trend: '+3 this quarter',
    trendType: 'positive',
    icon: 'Building2',
    targetModule: 'master-data',
    targetSubmodule: 'Projects',
    tooltip: 'Active and upcoming project developments across all branches'
  },
  totalBookings: {
    label: 'Total Bookings',
    value: 184,
    formattedValue: '184 Units',
    trend: '+14.2% vs last FY',
    trendType: 'positive',
    icon: 'FileCheck',
    targetModule: 'sales',
    targetSubmodule: 'Bookings',
    tooltip: 'Total confirmed property bookings in the selected time range'
  },
  totalSales: {
    label: 'Total Sales (₹)',
    value: 1425000000,
    formattedValue: '₹ 142.50 Cr',
    trend: '+18.5% YoY',
    trendType: 'positive',
    icon: 'TrendingUp',
    targetModule: 'sales',
    targetSubmodule: 'Bookings',
    tooltip: 'Combined agreement value of all confirmed property sales'
  },
  receipts: {
    label: 'Receipts (₹)',
    value: 883200000,
    formattedValue: '₹ 88.32 Cr',
    trend: '62% Collection Efficiency',
    trendType: 'positive',
    icon: 'Receipt',
    targetModule: 'finance',
    targetSubmodule: 'Receipts & Payments',
    tooltip: 'Total funds realized and credited to escrow bank accounts'
  },
  openComplaints: {
    label: 'Open Complaints',
    value: 14,
    formattedValue: '14 Pending',
    trend: '-4 resolved today',
    trendType: 'warning',
    icon: 'AlertCircle',
    targetModule: 'customer-mgmt',
    targetSubmodule: 'Customer Helpdesk / Complaints',
    tooltip: 'Active customer issues requiring support response'
  },
  todaysTasks: {
    label: "Today's Tasks",
    value: 9,
    formattedValue: '9 Actionable',
    trend: '3 high priority',
    trendType: 'neutral',
    icon: 'CheckSquare',
    targetModule: 'notification-center',
    targetSubmodule: 'Unified Task Center',
    tooltip: 'Pending operations, site visits, and approvals due today'
  }
};

export const SALES_OVERVIEW_DATA = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  projects: {
    'All Projects': [14.2, 18.5, 22.1, 26.8, 31.4, 29.5],
    'Green Heights': [6.1, 8.2, 9.5, 11.8, 14.2, 12.8],
    'Prime Residency': [4.5, 5.8, 7.2, 8.9, 10.1, 9.4],
    'Sunshine Towers': [2.2, 3.1, 3.8, 4.2, 5.0, 5.1],
    'River View': [1.4, 1.4, 1.6, 1.9, 2.1, 2.2]
  }
};

export const COLLECTION_OVERVIEW_DATA = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  collected: [5.2, 6.8, 7.5, 8.1, 9.4, 8.8],
  pending: [1.8, 2.1, 2.4, 1.9, 2.2, 1.6]
};

export const TOP_PROJECTS_DATA = [
  {
    id: 'PRJ001',
    name: 'Green Heights',
    location: 'Gachibowli, Hyderabad',
    salesValueCr: 42.8,
    unitsSold: 88,
    totalUnits: 120,
    occupancyPct: 73.3,
    status: 'Active Construction'
  },
  {
    id: 'PRJ002',
    name: 'Prime Residency',
    location: 'Whitefield, Bengaluru',
    salesValueCr: 38.5,
    unitsSold: 64,
    totalUnits: 80,
    occupancyPct: 80.0,
    status: 'Handover Stage'
  },
  {
    id: 'PRJ003',
    name: 'Sunshine Towers',
    location: 'Baner, Pune',
    salesValueCr: 28.2,
    unitsSold: 52,
    totalUnits: 75,
    occupancyPct: 69.3,
    status: 'Structure Complete'
  },
  {
    id: 'PRJ004',
    name: 'River View Residency',
    location: 'OMR, Chennai',
    salesValueCr: 19.4,
    unitsSold: 36,
    totalUnits: 60,
    occupancyPct: 60.0,
    status: 'Foundation Phase'
  },
  {
    id: 'PRJ005',
    name: 'Azure Sky Luxury Villas',
    location: 'Jubilee Hills, Hyderabad',
    salesValueCr: 13.6,
    unitsSold: 12,
    totalUnits: 16,
    occupancyPct: 75.0,
    status: 'Pre-Launch'
  }
];

export const RECENT_BOOKINGS_DATA = [
  {
    id: 'BKG00145',
    customerName: 'Rajesh Kumar',
    unit: 'Flat 101, Tower A',
    project: 'Green Heights',
    amount: '₹ 1.25 Cr',
    timeAgo: '2h ago',
    status: 'Confirmed'
  },
  {
    id: 'BKG00144',
    customerName: 'Priya Sharma',
    unit: 'Villa 08, Block C',
    project: 'Azure Sky',
    amount: '₹ 2.85 Cr',
    timeAgo: '4h ago',
    status: 'Agreement'
  },
  {
    id: 'BKG00143',
    customerName: 'Anand Verma',
    unit: 'Flat 405, Tower B',
    project: 'Prime Residency',
    amount: '₹ 95.00 L',
    timeAgo: '1d ago',
    status: 'Confirmed'
  },
  {
    id: 'BKG00142',
    customerName: 'Sunita Reddy',
    unit: 'Flat 802, Tower 1',
    project: 'Sunshine Towers',
    amount: '₹ 1.10 Cr',
    timeAgo: '1d ago',
    status: 'In Progress'
  },
  {
    id: 'BKG00141',
    customerName: 'Vikram Mehta',
    unit: 'Flat 203, Tower C',
    project: 'Green Heights',
    amount: '₹ 1.35 Cr',
    timeAgo: '2d ago',
    status: 'Confirmed'
  }
];

export const OVERDUE_PAYMENTS_DATA = [
  {
    id: 'INV00123',
    customerName: 'Suresh Menon',
    unit: 'Flat 302, Tower A',
    project: 'Green Heights',
    amount: '₹ 8.50 L',
    daysOverdue: 28,
    dueDate: '2026-07-03',
    severity: 'critical'
  },
  {
    id: 'INV00119',
    customerName: 'Kavita Patel',
    unit: 'Flat 604, Block 2',
    project: 'Sunshine Towers',
    amount: '₹ 4.20 L',
    daysOverdue: 18,
    dueDate: '2026-07-13',
    severity: 'high'
  },
  {
    id: 'INV00115',
    customerName: 'Arjun Das',
    unit: 'Villa 04, Azure',
    project: 'Azure Sky',
    amount: '₹ 12.00 L',
    daysOverdue: 12,
    dueDate: '2026-07-19',
    severity: 'warning'
  }
];

export const INITIAL_TASKS_DATA = [
  {
    id: 'TSK-101',
    title: 'Approve Demand Notice for Green Heights Unit 101',
    assignedTo: 'Admin (You)',
    dueDate: 'Today, 5:00 PM',
    completed: false,
    priority: 'High'
  },
  {
    id: 'TSK-102',
    title: 'Schedule Possession Handover with Priya Sharma',
    assignedTo: 'John Doe (Admin)',
    dueDate: 'Tomorrow, 11:00 AM',
    completed: false,
    priority: 'Medium'
  },
  {
    id: 'TSK-103',
    title: 'Verify Brokerage Payout for Sunshine Towers Block 2',
    assignedTo: 'Accounts Manager',
    dueDate: '02 Aug 2026',
    completed: false,
    priority: 'Normal'
  },
  {
    id: 'TSK-104',
    title: 'Review Escrow Account Realization Report Q2',
    assignedTo: 'Admin (You)',
    dueDate: '05 Aug 2026',
    completed: true,
    priority: 'Normal'
  }
];

export const INITIAL_COMPLAINTS_DATA = [
  {
    id: 'CMP00123',
    customerName: 'Mahesh Nair',
    unit: 'Flat 304, Green Heights',
    description: 'Plumbing leakage in Master Bathroom shower fitting',
    status: 'Open',
    statusBadge: 'danger',
    date: '1 Aug 2026',
    category: 'Plumbing'
  },
  {
    id: 'CMP00122',
    customerName: 'Swati Deshmukh',
    unit: 'Flat 102, Prime Residency',
    description: 'Electrical DB breaker tripping frequently under load',
    status: 'In Progress',
    statusBadge: 'warning',
    date: '31 Jul 2026',
    category: 'Electrical'
  },
  {
    id: 'CMP00121',
    customerName: 'Pankaj Roy',
    unit: 'Flat 505, Sunshine Towers',
    description: 'Balcony sliding door roller alignment issue',
    status: 'In Progress',
    statusBadge: 'warning',
    date: '30 Jul 2026',
    category: 'Carpentry'
  },
  {
    id: 'CMP00120',
    customerName: 'Neha Agarwal',
    unit: 'Villa 02, Azure Sky',
    description: 'Water seepage near dining room window frame',
    status: 'Resolved',
    statusBadge: 'success',
    date: '28 Jul 2026',
    category: 'Civil'
  }
];

export const ROLE_PERMISSIONS = {
  'Super Admin': {
    label: 'Super Admin',
    description: 'Full system-wide access across all branches, projects, and finance KPIs.',
    visibleWidgets: ['kpi', 'salesChart', 'collectionChart', 'topProjects', 'bookings', 'overdue', 'tasks', 'complaints'],
    maskedFinance: false,
    canCompleteTasks: true
  },
  'Admin': {
    label: 'Admin',
    description: 'Full management access for assigned branch and projects.',
    visibleWidgets: ['kpi', 'salesChart', 'collectionChart', 'topProjects', 'bookings', 'overdue', 'tasks', 'complaints'],
    maskedFinance: false,
    canCompleteTasks: true
  },
  'Manager': {
    label: 'Manager (Sales/Ops)',
    description: 'Departmental access. Scoped sales, collections & task execution.',
    visibleWidgets: ['kpi', 'salesChart', 'collectionChart', 'topProjects', 'bookings', 'overdue', 'tasks', 'complaints'],
    maskedFinance: false,
    canCompleteTasks: true
  },
  'Staff (Sales/Ops)': {
    label: 'Staff (Sales/CRM/Ops)',
    description: 'Scoped to own leads, assigned bookings & tasks. Financial widgets masked.',
    visibleWidgets: ['kpi', 'salesChart', 'topProjects', 'bookings', 'tasks', 'complaints'],
    maskedFinance: true,
    canCompleteTasks: true
  },
  'Auditor (Read-Only)': {
    label: 'Auditor (Read-Only)',
    description: 'Read-only view across all modules. Action buttons disabled.',
    visibleWidgets: ['kpi', 'salesChart', 'collectionChart', 'topProjects', 'bookings', 'overdue', 'tasks', 'complaints'],
    maskedFinance: false,
    canCompleteTasks: false
  }
};

// CRM Datasets
export const CRM_KPIS = {
  totalLeads: {
    label: 'Total Leads',
    value: 248,
    formattedValue: '248 Leads',
    trend: '↑ 12% this month',
    trendType: 'positive',
    statusFilter: 'all',
    icon: 'Users'
  },
  newLeads: {
    label: 'New Leads',
    value: 42,
    formattedValue: '42 New',
    trend: '↑ 18% this month',
    trendType: 'positive',
    statusFilter: 'New',
    icon: 'UserPlus'
  },
  inProgress: {
    label: 'In Progress',
    value: 86,
    formattedValue: '86 Active',
    trend: '↑ 8% this month',
    trendType: 'positive',
    statusFilter: 'In Progress',
    icon: 'Clock'
  },
  converted: {
    label: 'Converted',
    value: 54,
    formattedValue: '54 Closed',
    trend: '↑ 22% this month',
    trendType: 'positive',
    statusFilter: 'Converted',
    icon: 'CheckCircle2'
  },
  conversionRate: {
    label: 'Conversion Rate',
    value: 21.8,
    formattedValue: '21.8%',
    trend: '↑ 5.6% this month',
    trendType: 'positive',
    statusFilter: 'Converted',
    icon: 'TrendingUp'
  }
};

export const CRM_LEADS_OVERVIEW_SERIES = {
  '30D': {
    dates: ['01 May', '05 May', '10 May', '15 May', '20 May', '25 May', '31 May'],
    newLeads: [12, 18, 24, 29, 35, 38, 42],
    convertedLeads: [4, 7, 12, 18, 22, 28, 34]
  },
  '7D': {
    dates: ['25 May', '26 May', '27 May', '28 May', '29 May', '30 May', '31 May'],
    newLeads: [4, 6, 5, 8, 9, 7, 10],
    convertedLeads: [1, 2, 3, 2, 4, 3, 5]
  },
  '90D': {
    dates: ['Mar W1', 'Mar W3', 'Apr W1', 'Apr W3', 'May W1', 'May W3'],
    newLeads: [45, 62, 78, 95, 110, 142],
    convertedLeads: [15, 22, 34, 45, 58, 76]
  }
};

export const CRM_LEADS_BY_SOURCE = {
  totalCount: 248,
  sources: [
    { label: 'Website', count: 99, color: '#6366f1' },
    { label: 'Referral', count: 62, color: '#10b981' },
    { label: 'Walk-in', count: 50, color: '#f59e0b' },
    { label: 'Advertisement', count: 25, color: '#06b6d4' },
    { label: 'Other', count: 12, color: '#8b5cf6' }
  ]
};

export const INITIAL_LEADS_LIST = [
  {
    id: 'L1005',
    name: 'Rahul Verma',
    initials: 'RV',
    mobile: '+91 98765 43210',
    email: 'rahul.verma@example.com',
    location: 'Noida, Uttar Pradesh',
    source: 'Website',
    projectInterested: 'Green Heights',
    budget: '₹50L – ₹70L',
    requirement: '2 BHK Apartment',
    preferredDate: '2026-08-10',
    assignedTo: 'Anjali Sharma (Executive)',
    status: 'New',
    nextFollowUp: 'Today, 3:30 PM',
    remarks: 'Customer looking for park-facing flat on mid floors. Urgent booking intention.',
    siteVisit: {
      siteName: 'Green Heights Tower B',
      date: '28 Jul 2026',
      driverAssigned: 'Ramesh Singh (Cab #402)',
      rating: 4,
      feedback: 'Very impressed with sample flat layout and clubhouse amenities.'
    },
    timeline: [
      { id: 1, type: 'created', title: 'Lead Captured via Website Form', date: '31 Jul 2026, 11:20 AM' },
      { id: 2, type: 'call', title: 'Initial Call Completed by Anjali', date: '31 Jul 2026, 02:15 PM' },
      { id: 3, type: 'visit', title: 'Site Visit Completed at Green Heights', date: '01 Aug 2026, 10:30 AM' }
    ]
  },
  {
    id: 'L1004',
    name: 'Pooja Agarwal',
    initials: 'PA',
    mobile: '+91 99887 66554',
    email: 'pooja.a@example.com',
    location: 'Whitefield, Bengaluru',
    source: 'Referral',
    projectInterested: 'Prime Residency',
    budget: '₹80L – ₹1.1Cr',
    requirement: '3 BHK Apartment',
    preferredDate: '2026-08-12',
    assignedTo: 'Vikram Malhotra (Senior)',
    status: 'Contacted',
    nextFollowUp: 'Tomorrow, 11:00 AM',
    remarks: 'Referred by existing buyer Mr. Roy. Needs corner 3 BHK.',
    siteVisit: null,
    timeline: [
      { id: 1, type: 'created', title: 'Lead Added via Referral', date: '30 Jul 2026, 04:00 PM' }
    ]
  },
  {
    id: 'L1003',
    name: 'Karan Malhotra',
    initials: 'KM',
    mobile: '+91 97112 33445',
    email: 'karan.m@example.com',
    location: 'Baner, Pune',
    source: 'Walk-in',
    projectInterested: 'Sunshine Towers',
    budget: '₹60L – ₹80L',
    requirement: '2 BHK Apartment',
    preferredDate: '2026-08-15',
    assignedTo: 'Priya Verma (Executive)',
    status: 'In Progress',
    nextFollowUp: '03 Aug 2026, 2:00 PM',
    remarks: 'Discussed loan options with HDFC bank representative on site.',
    siteVisit: null,
    timeline: [
      { id: 1, type: 'created', title: 'Site Walk-in Entry', date: '29 Jul 2026, 01:15 PM' }
    ]
  }
];

export const CRM_SECTION_TILES = [
  {
    id: 'Leads',
    title: 'Leads Directory',
    description: 'Manage & track all prospective leads across channels',
    icon: 'Users',
    count: '42 New',
    targetModule: 'crm',
    targetSubmodule: 'Leads'
  },
  {
    id: 'Follow Ups',
    title: 'Follow Ups Hub',
    description: 'Track daily follow-up activities & automated reminders',
    icon: 'Calendar',
    count: '8 Due Today',
    targetModule: 'crm',
    targetSubmodule: 'Follow Ups'
  },
  {
    id: 'Site Visits',
    title: 'Site Visits',
    description: 'Schedule, log ratings & manage property walkthroughs',
    icon: 'Compass',
    count: '5 Scheduled',
    targetModule: 'crm',
    targetSubmodule: 'Site Visits'
  },
  {
    id: 'Call Recording',
    title: 'Call Recording',
    description: 'Telephony call logs, notes & audio recordings',
    icon: 'Headphones',
    count: '18 Calls',
    targetModule: 'crm',
    targetSubmodule: 'Call Recording'
  },
  {
    id: 'Sales Pipeline',
    title: 'Sales Pipeline',
    description: 'Kanban view of leads moving across deal stages',
    icon: 'TrendingUp',
    count: '₹14.5Cr Pipeline',
    targetModule: 'crm',
    targetSubmodule: 'Sales Pipeline'
  },
  {
    id: 'Sales Targets',
    title: 'Sales Targets',
    description: 'Set & track team targets vs actual realizations',
    icon: 'Target',
    count: '84% Met',
    targetModule: 'crm',
    targetSubmodule: 'Sales Targets'
  },
  {
    id: 'Customer Conversion',
    title: 'Customer Conversion',
    description: 'Convert qualified leads directly into active buyers',
    icon: 'UserCheck',
    count: '54 Converted',
    targetModule: 'crm',
    targetSubmodule: 'Customer Conversion'
  }
];

// Sales Datasets
export const SALES_KPIS = {
  totalBookings: {
    id: 'totalBookings',
    title: 'Total Bookings',
    value: 184,
    formattedValue: '184 Units',
    trend: '↑ 18% this month',
    trendType: 'positive',
    icon: 'Building2',
    color: '#2563eb',
    targetSubmodule: 'Bookings',
    subtext: 'Across all active sites'
  },
  totalSales: {
    id: 'totalSales',
    title: 'Total Sales (₹)',
    value: 1425000000,
    formattedValue: '₹ 142.50 Cr',
    trend: '↑ 22% this month',
    trendType: 'positive',
    icon: 'TrendingUp',
    color: '#16a34a',
    targetSubmodule: 'Bookings',
    subtext: 'Agreement value sum'
  },
  totalReceipts: {
    id: 'totalReceipts',
    title: 'Total Receipts (₹)',
    value: 883200000,
    formattedValue: '₹ 88.32 Cr',
    trend: '↑ 15% this month',
    trendType: 'positive',
    icon: 'Receipt',
    color: '#06b6d4',
    targetSubmodule: 'Receipts',
    subtext: 'Realized escrow collections'
  },
  outstandingDues: {
    id: 'outstandingDues',
    title: 'Outstanding (₹)',
    value: 241800000,
    formattedValue: '₹ 24.18 Cr',
    trend: 'Due from 98 customers',
    trendType: 'warning',
    icon: 'AlertCircle',
    color: '#f97316',
    targetSubmodule: 'Installments',
    subtext: 'Overdue & upcoming dues'
  },
  monthBookings: {
    id: 'monthBookings',
    title: 'Bookings This Month',
    value: 18,
    formattedValue: '18 Bookings',
    trend: '↑ 20% vs last mo',
    trendType: 'positive',
    icon: 'CalendarCheck',
    color: '#8b5cf6',
    targetSubmodule: 'Bookings',
    subtext: 'August 2026 velocity'
  }
};

export const SALES_TREND_SERIES = {
  'This Year': {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    values: [14.2, 18.5, 22.1, 26.8, 31.4, 29.5, 34.2, 38.0]
  },
  '6M': {
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    values: [22.1, 26.8, 31.4, 29.5, 34.2, 38.0]
  },
  'Quarter': {
    months: ['Jun', 'Jul', 'Aug'],
    values: [29.5, 34.2, 38.0]
  },
  '12M': {
    months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    values: [10.5, 11.8, 12.4, 13.9, 14.2, 18.5, 22.1, 26.8, 31.4, 29.5, 34.2, 38.0]
  }
};

export const BOOKINGS_BY_PROJECT_DATA = {
  totalBookings: 184,
  projects: [
    { name: 'Green Heights', count: 74, pct: 40, color: '#2563eb' },
    { name: 'Prime Residency', count: 46, pct: 25, color: '#16a34a' },
    { name: 'Sunshine Towers', count: 37, pct: 20, color: '#f59e0b' },
    { name: 'City Center Plaza', count: 18, pct: 10, color: '#06b6d4' },
    { name: 'Others', count: 9, pct: 5, color: '#8b5cf6' }
  ]
};

export const COLLECTION_VS_OUTSTANDING_DATA = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  collection: [5.2, 6.8, 7.5, 8.1, 9.4, 8.8, 10.2, 11.5],
  outstanding: [1.8, 2.1, 2.4, 1.9, 2.2, 1.6, 2.8, 3.1]
};

export const FULL_SALES_BOOKINGS_LIST = [
  {
    id: 'BKG-2026-081',
    customerName: 'Rajesh Kumar',
    initials: 'RK',
    mobile: '+91 98765 43210',
    email: 'rajesh.k@example.com',
    project: 'Green Heights',
    unit: 'Flat 101, Tower A',
    bookingDate: '01 Aug 2026',
    salesAmount: '₹ 1.25 Cr',
    rawSalesValue: 12500000,
    bookingAmount: '₹ 10.00 L',
    status: 'Confirmed',
    paymentPlan: 'Construction-Linked Plan (CLP)',
    executive: 'Anjali Sharma'
  },
  {
    id: 'BKG-2026-080',
    customerName: 'Priya Sharma',
    initials: 'PS',
    mobile: '+91 99887 11223',
    email: 'priya.s@example.com',
    project: 'Azure Sky',
    unit: 'Villa 08, Block C',
    bookingDate: '31 Jul 2026',
    salesAmount: '₹ 2.85 Cr',
    rawSalesValue: 28500000,
    bookingAmount: '₹ 25.00 L',
    status: 'Agreement',
    paymentPlan: 'Down Payment Plan (10:90)',
    executive: 'Vikram Malhotra'
  },
  {
    id: 'BKG-2026-079',
    customerName: 'Anand Verma',
    initials: 'AV',
    mobile: '+91 97112 55667',
    email: 'anand.v@example.com',
    project: 'Prime Residency',
    unit: 'Flat 405, Tower B',
    bookingDate: '30 Jul 2026',
    salesAmount: '₹ 95.00 L',
    rawSalesValue: 9500000,
    bookingAmount: '₹ 5.00 L',
    status: 'In Progress',
    paymentPlan: 'Flexi Payment Plan (30:70)',
    executive: 'Priya Verma'
  },
  {
    id: 'BKG-2026-078',
    customerName: 'Sunita Reddy',
    initials: 'SR',
    mobile: '+91 98441 22334',
    email: 'sunita.r@example.com',
    project: 'Sunshine Towers',
    unit: 'Flat 802, Tower 1',
    bookingDate: '28 Jul 2026',
    salesAmount: '₹ 1.10 Cr',
    rawSalesValue: 11000000,
    bookingAmount: '₹ 10.00 L',
    status: 'Overdue',
    paymentPlan: 'Milestone CLP',
    executive: 'Anjali Sharma'
  },
  {
    id: 'BKG-2026-077',
    customerName: 'Vikram Mehta',
    initials: 'VM',
    mobile: '+91 98200 99887',
    email: 'vikram.m@example.com',
    project: 'Green Heights',
    unit: 'Flat 203, Tower C',
    bookingDate: '26 Jul 2026',
    salesAmount: '₹ 1.35 Cr',
    rawSalesValue: 13500000,
    bookingAmount: '₹ 15.00 L',
    status: 'Confirmed',
    paymentPlan: 'Construction-Linked Plan',
    executive: 'Vikram Malhotra'
  },
  {
    id: 'BKG-2026-076',
    customerName: 'Meenakshi Iyer',
    initials: 'MI',
    mobile: '+91 99100 44556',
    email: 'meenakshi.i@example.com',
    project: 'City Center Plaza',
    unit: 'Shop 12, Ground Floor',
    bookingDate: '24 Jul 2026',
    salesAmount: '₹ 75.00 L',
    rawSalesValue: 7500000,
    bookingAmount: '₹ 7.50 L',
    status: 'Completed',
    paymentPlan: 'Full Payment',
    executive: 'Priya Verma'
  }
];

export const SALES_SECTION_TILES = [
  {
    id: 'Bookings',
    title: 'Bookings',
    description: 'Create & manage unit property bookings',
    icon: 'Building2',
    count: '184 Total',
    targetSubmodule: 'Bookings'
  },
  {
    id: 'Agreements',
    title: 'Agreements',
    description: 'Generate & track customer sale agreements',
    icon: 'FileText',
    count: '142 Signed',
    targetSubmodule: 'Agreements'
  },
  {
    id: 'Payment Plans',
    title: 'Payment Plans',
    description: 'Setup milestone & flexi payment schedules',
    icon: 'Layers',
    count: '12 Templates',
    targetSubmodule: 'Payment Plans'
  },
  {
    id: 'Installments',
    title: 'Installments',
    description: 'Track due dates & upcoming installment demands',
    icon: 'Clock',
    count: '48 Active Dues',
    targetSubmodule: 'Installments'
  },
  {
    id: 'Receipts',
    title: 'Receipts',
    description: 'Record & reconcile online/offline payments',
    icon: 'Receipt',
    count: '₹88.32Cr Realized',
    targetSubmodule: 'Receipts'
  },
  {
    id: 'Demand Letters',
    title: 'Demand Letters',
    description: 'Auto-generate & issue formal payment notices',
    icon: 'Send',
    count: '14 Issued',
    targetSubmodule: 'Demand Letters'
  },
  {
    id: 'Possession',
    title: 'Possession',
    description: 'Manage unit handover & NOC certificates',
    icon: 'Key',
    count: '32 Handed Over',
    targetSubmodule: 'Possession'
  },
  {
    id: 'Cancellation-Refund',
    title: 'Refund / Cancellation',
    description: 'Process booking cancellations & escrow refunds',
    icon: 'RotateCcw',
    count: '3 Pending Refunds',
    targetSubmodule: 'Cancellation-Refund'
  }
];

export const UPCOMING_INSTALLMENTS_LIST = [
  {
    id: 'INS-901',
    installmentNo: 'Inst #04 (Slab 5)',
    customerName: 'Rajesh Kumar',
    unit: 'Flat 101, Green Heights',
    dueDate: '05 Aug 2026',
    amount: '₹ 8.50 L',
    daysRemaining: 4,
    urgent: true
  },
  {
    id: 'INS-902',
    installmentNo: 'Inst #02 (Foundation)',
    customerName: 'Priya Sharma',
    unit: 'Villa 08, Azure Sky',
    dueDate: '09 Aug 2026',
    amount: '₹ 18.00 L',
    daysRemaining: 8,
    urgent: false
  },
  {
    id: 'INS-903',
    installmentNo: 'Inst #06 (Plastering)',
    customerName: 'Anand Verma',
    unit: 'Flat 405, Prime Residency',
    dueDate: '14 Aug 2026',
    amount: '₹ 6.20 L',
    daysRemaining: 13,
    urgent: false
  }
];

export const RECENT_RECEIPTS_LIST = [
  {
    id: 'RCP-4081',
    receiptNo: 'RCP-2026-081',
    customerName: 'Meenakshi Iyer',
    unit: 'Shop 12, City Center',
    date: '01 Aug 2026',
    amount: '₹ 15.00 L',
    mode: 'NEFT / Escrow'
  },
  {
    id: 'RCP-4080',
    receiptNo: 'RCP-2026-080',
    customerName: 'Vikram Mehta',
    unit: 'Flat 203, Green Heights',
    date: '31 Jul 2026',
    amount: '₹ 10.00 L',
    mode: 'Cheque (#40129)'
  },
  {
    id: 'RCP-4079',
    receiptNo: 'RCP-2026-079',
    customerName: 'Rajesh Kumar',
    unit: 'Flat 101, Green Heights',
    date: '30 Jul 2026',
    amount: '₹ 10.00 L',
    mode: 'UPI / Online'
  }
];

export const OVERDUE_INSTALLMENTS_LIST = [
  {
    id: 'OVR-101',
    installmentNo: 'Inst #03 (Column Pour)',
    customerName: 'Sunita Reddy',
    unit: 'Flat 802, Sunshine Towers',
    daysOverdue: 28,
    amount: '₹ 8.50 L',
    dueDate: '03 Jul 2026',
    severe: true
  },
  {
    id: 'OVR-102',
    installmentNo: 'Inst #05 (Masonry)',
    customerName: 'Suresh Menon',
    unit: 'Flat 302, Green Heights',
    daysOverdue: 18,
    amount: '₹ 6.40 L',
    dueDate: '13 Jul 2026',
    severe: true
  },
  {
    id: 'OVR-103',
    installmentNo: 'Inst #02 (Agreement Fee)',
    customerName: 'Kavita Patel',
    unit: 'Flat 604, Sunshine Towers',
    daysOverdue: 12,
    amount: '₹ 4.20 L',
    dueDate: '19 Jul 2026',
    severe: false
  }
];

// Master Data 13 Categories Datasets
export const MASTER_DATA_CATEGORIES = [
  {
    id: 'company',
    name: 'Company',
    group: 'hierarchy',
    icon: 'Building',
    description: 'Registered company entity, GSTIN & legal branch details',
    count: 3,
    activeCount: 3,
    inactiveCount: 0,
    fields: [
      { key: 'code', label: 'Company Code', required: true, unique: true },
      { key: 'name', label: 'Company Name', required: true },
      { key: 'gstin', label: 'GSTIN Number', required: true },
      { key: 'city', label: 'Registered City', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
    ]
  },
  {
    id: 'projects',
    name: 'Projects',
    group: 'hierarchy',
    icon: 'Building2',
    description: 'Active & upcoming real estate project developments',
    count: 5,
    activeCount: 5,
    inactiveCount: 0,
    fields: [
      { key: 'code', label: 'Project Code', required: true, unique: true },
      { key: 'name', label: 'Project Name', required: true },
      { key: 'location', label: 'Location / City', required: true },
      { key: 'startDate', label: 'Start Date', type: 'date', required: true },
      { key: 'endDate', label: 'Target Completion', type: 'date', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
    ]
  },
  {
    id: 'buildings',
    name: 'Buildings',
    group: 'hierarchy',
    icon: 'Layers',
    description: 'Physical building blocks across project sites',
    count: 12,
    activeCount: 12,
    inactiveCount: 0,
    fields: [
      { key: 'code', label: 'Building Code', required: true, unique: true },
      { key: 'name', label: 'Building Name', required: true },
      { key: 'project', label: 'Parent Project', type: 'select', options: ['Green Heights', 'Prime Residency', 'Sunshine Towers', 'River View', 'Azure Sky'] },
      { key: 'floorsCount', label: 'Total Floors', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
    ]
  },
  {
    id: 'towers',
    name: 'Towers',
    group: 'hierarchy',
    icon: 'Compass',
    description: 'Tower structures & wing divisions within buildings',
    count: 18,
    activeCount: 18,
    inactiveCount: 0,
    fields: [
      { key: 'code', label: 'Tower Code', required: true, unique: true },
      { key: 'name', label: 'Tower Name', required: true },
      { key: 'building', label: 'Building Block', required: true },
      { key: 'totalUnits', label: 'Total Units', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
    ]
  },
  {
    id: 'floors',
    name: 'Floors',
    group: 'hierarchy',
    icon: 'Grid',
    description: 'Floor levels across towers and basements',
    count: 72,
    activeCount: 72,
    inactiveCount: 0,
    fields: [
      { key: 'code', label: 'Floor Code', required: true, unique: true },
      { key: 'name', label: 'Floor Level', required: true },
      { key: 'tower', label: 'Parent Tower', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
    ]
  },
  {
    id: 'units',
    name: 'Flats / Shops / Offices',
    group: 'hierarchy',
    icon: 'Home',
    description: 'All unit inventory (Flats, Commercial Shops, Villas)',
    count: 351,
    activeCount: 351,
    inactiveCount: 0,
    fields: [
      { key: 'code', label: 'Unit Code / Number', required: true, unique: true },
      { key: 'project', label: 'Project', required: true },
      { key: 'unitType', label: 'Unit Type', type: 'select', options: ['1BHK', '2BHK', '3BHK', 'Villa', 'Commercial Shop'] },
      { key: 'superArea', label: 'Super Area (sq.ft)', required: true },
      { key: 'basePrice', label: 'Base Price (₹)', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Available', 'Booked', 'Sold', 'Blocked'] }
    ]
  },
  {
    id: 'flatTypes',
    name: 'Flat Types',
    group: 'hierarchy',
    icon: 'Maximize2',
    description: 'Unit type floorplan configurations & specifications',
    count: 6,
    activeCount: 6,
    inactiveCount: 0,
    fields: [
      { key: 'code', label: 'Type Code', required: true, unique: true },
      { key: 'name', label: 'Type Name (e.g. 2BHK Premium)', required: true },
      { key: 'carpetArea', label: 'Carpet Area (sq.ft)', required: true },
      { key: 'balconies', label: 'Balcony Count', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
    ]
  },
  {
    id: 'vendors',
    name: 'Vendors',
    group: 'reference',
    icon: 'Truck',
    description: 'Material suppliers, contractors & service providers',
    count: 24,
    activeCount: 22,
    inactiveCount: 2,
    fields: [
      { key: 'code', label: 'Vendor Code', required: true, unique: true },
      { key: 'name', label: 'Vendor Company Name', required: true },
      { key: 'category', label: 'Supply Category', required: true },
      { key: 'gstin', label: 'GSTIN', required: true },
      { key: 'mobile', label: 'Contact Phone', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
    ]
  },
  {
    id: 'dealers',
    name: 'Dealers',
    group: 'reference',
    icon: 'Users',
    description: 'Channel partners, brokers & real estate agents',
    count: 15,
    activeCount: 14,
    inactiveCount: 1,
    fields: [
      { key: 'code', label: 'Dealer RERA ID', required: true, unique: true },
      { key: 'name', label: 'Agency / Agent Name', required: true },
      { key: 'commissionPct', label: 'Commission Rate (%)', required: true },
      { key: 'city', label: 'Operating City', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
    ]
  },
  {
    id: 'employees',
    name: 'Employees',
    group: 'reference',
    icon: 'UserCheck',
    description: 'Internal workforce, project engineers & sales staff',
    count: 48,
    activeCount: 46,
    inactiveCount: 2,
    fields: [
      { key: 'code', label: 'Employee ID', required: true, unique: true },
      { key: 'name', label: 'Full Name', required: true },
      { key: 'department', label: 'Department', required: true },
      { key: 'role', label: 'Designation', required: true },
      { key: 'email', label: 'Work Email', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
    ]
  },
  {
    id: 'banks',
    name: 'Banks',
    group: 'reference',
    icon: 'CreditCard',
    description: 'Escrow bank accounts & project financing branches',
    count: 8,
    activeCount: 8,
    inactiveCount: 0,
    fields: [
      { key: 'code', label: 'Bank Code / IFSC', required: true, unique: true },
      { key: 'name', label: 'Bank Name', required: true },
      { key: 'accountNo', label: 'Escrow Account No.', required: true },
      { key: 'branch', label: 'Branch Location', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
    ]
  },
  {
    id: 'taxSettings',
    name: 'Tax Settings',
    group: 'reference',
    icon: 'Shield',
    description: 'GST, TDS & TCS tax rates for real estate transactions',
    count: 4,
    activeCount: 4,
    inactiveCount: 0,
    fields: [
      { key: 'code', label: 'Tax Rule Code', required: true, unique: true },
      { key: 'name', label: 'Tax Name (e.g. GST Construction 5%)', required: true },
      { key: 'ratePct', label: 'Rate Percentage (%)', required: true },
      { key: 'appliesTo', label: 'Applicable On', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
    ]
  },
  {
    id: 'paymentModes',
    name: 'Payment Modes',
    group: 'reference',
    icon: 'Receipt',
    description: 'Accepted collection modes (NEFT, Cheque, UPI, Escrow)',
    count: 5,
    activeCount: 5,
    inactiveCount: 0,
    fields: [
      { key: 'code', label: 'Mode Code', required: true, unique: true },
      { key: 'name', label: 'Mode Title', required: true },
      { key: 'type', label: 'Category', type: 'select', options: ['Online Escrow', 'Bank Transfer', 'Cheque', 'Cash'] },
      { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
    ]
  },
  {
    id: 'complaintCategories',
    name: 'Complaint Categories',
    group: 'reference',
    icon: 'Headphones',
    description: 'Helpdesk classification (Civil, Plumbing, Electrical, Handover)',
    count: 6,
    activeCount: 6,
    inactiveCount: 0,
    fields: [
      { key: 'code', label: 'Category Code', required: true, unique: true },
      { key: 'name', label: 'Category Name', required: true },
      { key: 'slaHours', label: 'Target SLA (Hours)', required: true },
      { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
    ]
  }
];

export const INITIAL_MASTER_DATA_RECORDS = {
  company: [
    { id: 'M-CMP-01', code: 'CMP-001', name: 'Apex Structural Engineering Pvt Ltd', gstin: '36AABCA1234F1Z5', city: 'Hyderabad', status: 'Active', createdBy: 'Super Admin', createdOn: '2025-01-10', updatedBy: 'Admin', updatedOn: '2026-06-15' },
    { id: 'M-CMP-02', code: 'CMP-002', name: 'Apex Prime Infra Projects LLP', gstin: '29AABCP5678E1Z2', city: 'Bengaluru', status: 'Active', createdBy: 'Super Admin', createdOn: '2025-03-12', updatedBy: 'Admin', updatedOn: '2026-05-20' },
    { id: 'M-CMP-03', code: 'CMP-003', name: 'Apex Sunshine Developers India', gstin: '27AABCD9012D1Z9', city: 'Pune', status: 'Active', createdBy: 'Super Admin', createdOn: '2025-06-01', updatedBy: 'Admin', updatedOn: '2026-07-01' }
  ],
  projects: [
    { id: 'M-PRJ-01', code: 'PRJ-001', name: 'Green Heights', location: 'Gachibowli, Hyderabad', startDate: '2024-06-01', endDate: '2027-12-31', status: 'Active', createdBy: 'Admin', createdOn: '2024-06-01', updatedBy: 'Admin', updatedOn: '2026-07-10' },
    { id: 'M-PRJ-02', code: 'PRJ-002', name: 'Prime Residency', location: 'Whitefield, Bengaluru', startDate: '2024-08-15', endDate: '2026-11-30', status: 'Active', createdBy: 'Admin', createdOn: '2024-08-15', updatedBy: 'Admin', updatedOn: '2026-07-15' },
    { id: 'M-PRJ-03', code: 'PRJ-003', name: 'Sunshine Towers', location: 'Baner, Pune', startDate: '2025-01-10', endDate: '2028-03-31', status: 'Active', createdBy: 'Admin', createdOn: '2025-01-10', updatedBy: 'Admin', updatedOn: '2026-06-25' },
    { id: 'M-PRJ-04', code: 'PRJ-004', name: 'River View Residency', location: 'OMR, Chennai', startDate: '2025-04-01', endDate: '2028-09-30', status: 'Active', createdBy: 'Admin', createdOn: '2025-04-01', updatedBy: 'Admin', updatedOn: '2026-07-02' },
    { id: 'M-PRJ-05', code: 'PRJ-005', name: 'Azure Sky Luxury Villas', location: 'Jubilee Hills, Hyderabad', startDate: '2025-09-01', endDate: '2027-06-30', status: 'Active', createdBy: 'Admin', createdOn: '2025-09-01', updatedBy: 'Admin', updatedOn: '2026-07-20' }
  ],
  buildings: [
    { id: 'M-BLD-01', code: 'BLD-GH-A', name: 'Tower A (Green Heights)', project: 'Green Heights', floorsCount: 14, status: 'Active', createdBy: 'Admin', createdOn: '2024-06-05', updatedBy: 'Admin', updatedOn: '2026-05-10' },
    { id: 'M-BLD-02', code: 'BLD-GH-B', name: 'Tower B (Green Heights)', project: 'Green Heights', floorsCount: 14, status: 'Active', createdBy: 'Admin', createdOn: '2024-06-05', updatedBy: 'Admin', updatedOn: '2026-05-10' },
    { id: 'M-BLD-03', code: 'BLD-PR-T1', name: 'Block 1 (Prime Residency)', project: 'Prime Residency', floorsCount: 10, status: 'Active', createdBy: 'Admin', createdOn: '2024-08-20', updatedBy: 'Admin', updatedOn: '2026-04-12' }
  ],
  towers: [
    { id: 'M-TWR-01', code: 'TWR-GH-A', name: 'Wing A1', building: 'Tower A (Green Heights)', totalUnits: 60, status: 'Active', createdBy: 'Admin', createdOn: '2024-06-10', updatedBy: 'Admin', updatedOn: '2026-03-01' },
    { id: 'M-TWR-02', code: 'TWR-GH-B', name: 'Wing B1', building: 'Tower B (Green Heights)', totalUnits: 60, status: 'Active', createdBy: 'Admin', createdOn: '2024-06-10', updatedBy: 'Admin', updatedOn: '2026-03-01' }
  ],
  floors: [
    { id: 'M-FLR-01', code: 'FLR-GH-01', name: '1st Floor', tower: 'Wing A1', status: 'Active', createdBy: 'Admin', createdOn: '2024-06-15', updatedBy: 'Admin', updatedOn: '2026-01-10' },
    { id: 'M-FLR-02', code: 'FLR-GH-02', name: '2nd Floor', tower: 'Wing A1', status: 'Active', createdBy: 'Admin', createdOn: '2024-06-15', updatedBy: 'Admin', updatedOn: '2026-01-10' }
  ],
  units: [
    { id: 'M-UNT-01', code: 'Flat 101', project: 'Green Heights', unitType: '2BHK', superArea: '1250', basePrice: '7500000', status: 'Booked', createdBy: 'Admin', createdOn: '2024-07-01', updatedBy: 'Admin', updatedOn: '2026-07-28' },
    { id: 'M-UNT-02', code: 'Flat 102', project: 'Green Heights', unitType: '3BHK', superArea: '1650', basePrice: '11000000', status: 'Available', createdBy: 'Admin', createdOn: '2024-07-01', updatedBy: 'Admin', updatedOn: '2026-07-28' }
  ],
  flatTypes: [
    { id: 'M-FTP-01', code: '2BHK-P', name: '2 BHK Premium', carpetArea: '950', balconies: 2, status: 'Active', createdBy: 'Admin', createdOn: '2024-05-10', updatedBy: 'Admin', updatedOn: '2026-02-15' },
    { id: 'M-FTP-02', code: '3BHK-L', name: '3 BHK Luxury', carpetArea: '1350', balconies: 3, status: 'Active', createdBy: 'Admin', createdOn: '2024-05-10', updatedBy: 'Admin', updatedOn: '2026-02-15' }
  ],
  vendors: [
    { id: 'M-VND-01', code: 'VND-STL-01', name: 'Tata Steel Infrastructure', category: 'Steel & Structural TMT', gstin: '36AAACT1234H1Z1', mobile: '+91 98111 22334', status: 'Active', createdBy: 'Admin', createdOn: '2024-04-10', updatedBy: 'Admin', updatedOn: '2026-06-20' },
    { id: 'M-VND-02', code: 'VND-CMT-01', name: 'UltraTech Cement Ltd', category: 'Cement & Ready Mix', gstin: '29AAACU5678J1Z8', mobile: '+91 98222 33445', status: 'Active', createdBy: 'Admin', createdOn: '2024-04-12', updatedBy: 'Admin', updatedOn: '2026-06-22' }
  ],
  dealers: [
    { id: 'M-DLR-01', code: 'RERA-HYD-901', name: 'Square Yards Realty', commissionPct: '2.5', city: 'Hyderabad', status: 'Active', createdBy: 'Admin', createdOn: '2024-05-01', updatedBy: 'Admin', updatedOn: '2026-07-01' },
    { id: 'M-DLR-02', code: 'RERA-BLR-402', name: 'Anarock Property Consultants', commissionPct: '2.0', city: 'Bengaluru', status: 'Active', createdBy: 'Admin', createdOn: '2024-05-05', updatedBy: 'Admin', updatedOn: '2026-07-05' }
  ],
  employees: [
    { id: 'M-EMP-01', code: 'EMP-1001', name: 'Anjali Sharma', department: 'Sales & CRM', role: 'Sales Executive', email: 'anjali.s@apexerp.com', status: 'Active', createdBy: 'Admin', createdOn: '2024-01-15', updatedBy: 'Admin', updatedOn: '2026-06-10' },
    { id: 'M-EMP-02', code: 'EMP-1002', name: 'Vikram Malhotra', department: 'Sales & CRM', role: 'Senior Sales Manager', email: 'vikram.m@apexerp.com', status: 'Active', createdBy: 'Admin', createdOn: '2024-01-15', updatedBy: 'Admin', updatedOn: '2026-06-10' }
  ],
  banks: [
    { id: 'M-BNK-01', code: 'HDFC0000240', name: 'HDFC Bank Escrow Account', accountNo: '50200048912345', branch: 'Gachibowli Main, Hyderabad', status: 'Active', createdBy: 'Admin', createdOn: '2024-03-01', updatedBy: 'Admin', updatedOn: '2026-07-10' },
    { id: 'M-BNK-02', code: 'ICIC0001004', name: 'ICICI Bank Escrow Account', accountNo: '000405018922', branch: 'Whitefield, Bengaluru', status: 'Active', createdBy: 'Admin', createdOn: '2024-03-01', updatedBy: 'Admin', updatedOn: '2026-07-12' }
  ],
  taxSettings: [
    { id: 'M-TAX-01', code: 'GST-CONST-05', name: 'GST Under Construction (5%)', ratePct: '5.0', appliesTo: 'Residential Units', status: 'Active', createdBy: 'Admin', createdOn: '2024-02-01', updatedBy: 'Admin', updatedOn: '2026-05-01' },
    { id: 'M-TAX-02', code: 'GST-COMM-12', name: 'GST Commercial Space (12%)', ratePct: '12.0', appliesTo: 'Shops & Office Spaces', status: 'Active', createdBy: 'Admin', createdOn: '2024-02-01', updatedBy: 'Admin', updatedOn: '2026-05-01' }
  ],
  paymentModes: [
    { id: 'M-PMD-01', code: 'MODE-NEFT', name: 'NEFT / RTGS Escrow Direct', type: 'Online Escrow', status: 'Active', createdBy: 'Admin', createdOn: '2024-01-01', updatedBy: 'Admin', updatedOn: '2026-06-01' },
    { id: 'M-PMD-02', code: 'MODE-CHEQUE', name: 'Bank Cheque / Pay Order', type: 'Cheque', status: 'Active', createdBy: 'Admin', createdOn: '2024-01-01', updatedBy: 'Admin', updatedOn: '2026-06-01' },
    { id: 'M-PMD-03', code: 'MODE-UPI', name: 'UPI Gateway Payment', type: 'Online Escrow', status: 'Active', createdBy: 'Admin', createdOn: '2024-01-01', updatedBy: 'Admin', updatedOn: '2026-06-01' }
  ],
  complaintCategories: [
    { id: 'M-CMP-01', code: 'CAT-PLUMB', name: 'Plumbing & Drainage', slaHours: '24', status: 'Active', createdBy: 'Admin', createdOn: '2024-02-15', updatedBy: 'Admin', updatedOn: '2026-04-10' },
    { id: 'M-CMP-02', code: 'CAT-ELEC', name: 'Electrical & Power Supply', slaHours: '12', status: 'Active', createdBy: 'Admin', createdOn: '2024-02-15', updatedBy: 'Admin', updatedOn: '2026-04-10' }
  ]
};

// Finance & Accounts Datasets
export const FINANCE_KPIS = {
  totalCollections: {
    id: 'totalCollections',
    title: 'Total Collections (₹)',
    value: 883200000,
    formattedValue: '₹ 88.32 Cr',
    trend: '↑ 15% this month',
    trendType: 'positive',
    icon: 'Receipt',
    color: '#16a34a',
    subtext: 'Escrow realization rate 62%'
  },
  totalReceivables: {
    id: 'totalReceivables',
    title: 'Total Receivables (₹)',
    value: 241800000,
    formattedValue: '₹ 24.18 Cr',
    trend: '98 Accounts Overdue',
    trendType: 'warning',
    icon: 'AlertCircle',
    color: '#f97316',
    subtext: 'Includes milestone dues'
  },
  generalLedgerBalance: {
    id: 'generalLedgerBalance',
    title: 'Escrow Liquidity (₹)',
    value: 425000000,
    formattedValue: '₹ 42.50 Cr',
    trend: 'Verified HDFC Escrow',
    trendType: 'positive',
    icon: 'CreditCard',
    color: '#2563eb',
    subtext: '4 Project escrow accounts'
  },
  gstLiability: {
    id: 'gstLiability',
    title: 'GST Liability (Q2)',
    value: 44160000,
    formattedValue: '₹ 4.41 Cr',
    trend: 'Due 20 Aug 2026',
    trendType: 'neutral',
    icon: 'Shield',
    color: '#8b5cf6',
    subtext: '5% Construction GST'
  }
};

// Customer Management PRD Datasets
export const CUSTOMER_KPIS = {
  totalCustomers: {
    id: 'totalCustomers',
    title: 'Total Customers',
    value: 324,
    formattedValue: '324 Total',
    trend: '↑ 12% this month',
    trendType: 'positive',
    icon: 'Users',
    color: '#2563eb',
    targetSubmodule: 'Customers Directory',
    subtext: 'Scoped across active branches'
  },
  activeCustomers: {
    id: 'activeCustomers',
    title: 'Active Customers',
    value: 286,
    formattedValue: '286 Active',
    trend: '↑ 15% this month',
    trendType: 'positive',
    icon: 'UserCheck',
    color: '#16a34a',
    targetSubmodule: 'Customers Directory',
    subtext: 'Account status = Active'
  },
  newCustomersMonth: {
    id: 'newCustomersMonth',
    title: 'New This Month',
    value: 28,
    formattedValue: '28 New',
    trend: '↑ 8% this month',
    trendType: 'positive',
    icon: 'UserPlus',
    color: '#06b6d4',
    targetSubmodule: 'Customers Directory',
    subtext: 'Created in August 2026'
  },
  kycVerified: {
    id: 'kycVerified',
    title: 'KYC Verified',
    value: 298,
    formattedValue: '298 Verified',
    trend: '92% of total',
    trendType: 'positive',
    icon: 'ShieldCheck',
    color: '#8b5cf6',
    targetSubmodule: 'KYC Documents',
    subtext: 'Aadhaar / PAN validated'
  },
  linkedBookings: {
    id: 'linkedBookings',
    title: 'Linked Bookings',
    value: 185,
    formattedValue: '185 Linked',
    trend: '57% of customers',
    trendType: 'positive',
    icon: 'Building2',
    color: '#f59e0b',
    targetSubmodule: 'Customers Directory',
    subtext: 'With ≥1 property booking'
  }
};

export const CUSTOMER_OVERVIEW_SERIES = {
  '6M': {
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    newCustomers: [18, 22, 25, 20, 24, 28],
    activeCustomers: [210, 228, 245, 258, 272, 286]
  },
  '3M': {
    months: ['Jun', 'Jul', 'Aug'],
    newCustomers: [20, 24, 28],
    activeCustomers: [258, 272, 286]
  },
  '12M': {
    months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    newCustomers: [12, 14, 15, 16, 18, 19, 18, 22, 25, 20, 24, 28],
    activeCustomers: [140, 152, 165, 178, 190, 202, 210, 228, 245, 258, 272, 286]
  }
};

export const CUSTOMERS_BY_TYPE_DATA = {
  totalCount: 324,
  types: [
    { label: 'Owners', count: 178, pct: 55, color: '#2563eb' },
    { label: 'Tenants', count: 81, pct: 25, color: '#16a34a' },
    { label: 'Investors', count: 32, pct: 10, color: '#f59e0b' },
    { label: 'Channel Partners', count: 16, pct: 5, color: '#06b6d4' },
    { label: 'Others', count: 17, pct: 5, color: '#8b5cf6' }
  ]
};

export const FULL_CUSTOMERS_LIST = [
  {
    id: 'CUST-2026-081',
    name: 'Rajesh Kumar',
    initials: 'RK',
    type: 'Owner',
    mobile: '+91 98765 43210',
    email: 'rajesh.k@example.com',
    city: 'Noida',
    linkedBooking: 'BKG-2026-081',
    kycStatus: 'Verified',
    status: 'Active',
    joinedDate: '01 Aug 2026',
    kycExpiryDate: '2028-12-31',
    nominee: { name: 'Sunita Kumar', relation: 'Spouse', mobile: '+91 98765 43211' },
    kycDocuments: [
      { type: 'Aadhaar Card', number: 'XXXX-XXXX-8912', status: 'Verified', verifiedOn: '2026-08-01' },
      { type: 'PAN Card', number: 'ABCDE1234F', status: 'Verified', verifiedOn: '2026-08-01' }
    ],
    communicationHistory: [
      { id: 1, type: 'call', note: 'Welcome call completed by Anjali. Sent booking confirmation kit.', date: '01 Aug 2026' }
    ]
  },
  {
    id: 'CUST-2026-080',
    name: 'Priya Sharma',
    initials: 'PS',
    type: 'Owner',
    mobile: '+91 99887 11223',
    email: 'priya.s@example.com',
    city: 'Gurgaon',
    linkedBooking: 'BKG-2026-080',
    kycStatus: 'Verified',
    status: 'Active',
    joinedDate: '31 Jul 2026',
    kycExpiryDate: '2027-10-15',
    nominee: { name: 'Amit Sharma', relation: 'Brother', mobile: '+91 99887 11224' },
    kycDocuments: [
      { type: 'Aadhaar Card', number: 'XXXX-XXXX-4512', status: 'Verified', verifiedOn: '2026-07-31' },
      { type: 'PAN Card', number: 'XYZPK5678G', status: 'Verified', verifiedOn: '2026-07-31' }
    ],
    communicationHistory: [
      { id: 1, type: 'email', note: 'Dispatched draft sale agreement copy via email.', date: '31 Jul 2026' }
    ]
  },
  {
    id: 'CUST-2026-079',
    name: 'Anand Verma',
    initials: 'AV',
    type: 'Investor',
    mobile: '+91 97112 55667',
    email: 'anand.v@example.com',
    city: 'Delhi',
    linkedBooking: 'BKG-2026-079',
    kycStatus: 'Pending',
    status: 'Active',
    joinedDate: '30 Jul 2026',
    kycExpiryDate: '2026-08-08',
    nominee: { name: 'Ritu Verma', relation: 'Spouse', mobile: '+91 97112 55668' },
    kycDocuments: [
      { type: 'Aadhaar Card', number: 'XXXX-XXXX-9012', status: 'Pending', verifiedOn: '--' },
      { type: 'PAN Card', number: 'APVPR9012K', status: 'Verified', verifiedOn: '2026-07-30' }
    ],
    communicationHistory: [
      { id: 1, type: 'call', note: 'Requested updated address proof document.', date: '30 Jul 2026' }
    ]
  },
  {
    id: 'CUST-2026-078',
    name: 'Sunita Reddy',
    initials: 'SR',
    type: 'Owner',
    mobile: '+91 98441 22334',
    email: 'sunita.r@example.com',
    city: 'Bengaluru',
    linkedBooking: 'BKG-2026-078',
    kycStatus: 'Expired',
    status: 'Active',
    joinedDate: '28 Jul 2026',
    kycExpiryDate: '2026-08-05',
    nominee: { name: 'Kiran Reddy', relation: 'Son', mobile: '+91 98441 22335' },
    kycDocuments: [
      { type: 'Passport', number: 'Z9012345', status: 'Expired', verifiedOn: '2023-08-01' }
    ],
    communicationHistory: [
      { id: 1, type: 'call', note: 'Sent KYC renewal reminder for passport re-verification.', date: '29 Jul 2026' }
    ]
  },
  {
    id: 'CUST-2026-077',
    name: 'Vikram Mehta',
    initials: 'VM',
    type: 'Tenant',
    mobile: '+91 98200 99887',
    email: 'vikram.m@example.com',
    city: 'Hyderabad',
    linkedBooking: 'BKG-2026-077',
    kycStatus: 'Verified',
    status: 'Active',
    joinedDate: '26 Jul 2026',
    kycExpiryDate: '2028-05-20',
    nominee: { name: 'Sanjay Mehta', relation: 'Father', mobile: '+91 98200 99888' },
    kycDocuments: [
      { type: 'Aadhaar Card', number: 'XXXX-XXXX-3344', status: 'Verified', verifiedOn: '2026-07-26' }
    ],
    communicationHistory: [
      { id: 1, type: 'visit', note: 'Completed lease agreement verification at site office.', date: '26 Jul 2026' }
    ]
  }
];

export const CUSTOMER_SECTION_TILES = [
  {
    id: 'Customers',
    title: 'Customers Directory',
    description: 'Browse, search & manage full 360° customer profiles',
    icon: 'Users',
    count: '324 Total',
    targetSubmodule: 'Customers Directory'
  },
  {
    id: 'Add Customer',
    title: 'Add Customer',
    description: 'Create & onboard new customer profile records',
    icon: 'UserPlus',
    count: '+ Add New',
    targetSubmodule: 'Customers Directory'
  },
  {
    id: 'KYC Documents',
    title: 'KYC Documents',
    description: 'Track document verification, PAN/Aadhaar & expiry alerts',
    icon: 'ShieldCheck',
    count: '298 Verified',
    targetSubmodule: 'KYC Documents'
  },
  {
    id: 'Nominees',
    title: 'Nominees Registry',
    description: 'Manage legal nominees & primary beneficiary contacts',
    icon: 'Heart',
    count: '240 Registered',
    targetSubmodule: 'Nominees Registry'
  },
  {
    id: 'Communication',
    title: 'Communication History',
    description: 'Call logs, email dispatches & interaction timelines',
    icon: 'MessageSquare',
    count: '1.2k Logs',
    targetSubmodule: 'Communication History'
  },
  {
    id: 'Export Customers',
    title: 'Export Customers',
    description: 'Export filtered customer data to Excel / CSV format',
    icon: 'Download',
    count: 'CSV / Excel',
    targetSubmodule: 'Customers Directory'
  }
];

export const TOP_CITIES_DATA = [
  { rank: 1, city: 'Noida', count: 85, pct: 26 },
  { rank: 2, city: 'Gurgaon', count: 62, pct: 19 },
  { rank: 3, city: 'Delhi', count: 48, pct: 15 },
  { rank: 4, city: 'Bengaluru', count: 36, pct: 11 },
  { rank: 5, city: 'Hyderabad', count: 28, pct: 9 }
];

export const UPCOMING_KYC_EXPIRY_LIST = [
  {
    id: 'KYC-EXP-01',
    customerId: 'CUST-2026-078',
    customerName: 'Sunita Reddy',
    documentType: 'Passport Verification',
    expiryDate: '05 Aug 2026',
    daysRemaining: 4,
    urgent: true
  },
  {
    id: 'KYC-EXP-02',
    customerId: 'CUST-2026-079',
    customerName: 'Anand Verma',
    documentType: 'Aadhaar Address Proof',
    expiryDate: '08 Aug 2026',
    daysRemaining: 7,
    urgent: true
  },
  {
    id: 'KYC-EXP-03',
    customerId: 'CUST-2026-042',
    customerName: 'Vikas Yadav',
    documentType: 'PAN Card Re-Validation',
    expiryDate: '14 Aug 2026',
    daysRemaining: 13,
    urgent: false
  }
];

// Rental Management PRD Datasets
export const RENTAL_KPIS = {
  totalUnits: {
    id: 'totalUnits',
    title: 'Total Units (Leasable)',
    value: 482,
    formattedValue: '482 Units',
    trend: '100% baseline',
    trendType: 'positive',
    icon: 'Building2',
    color: '#2563eb',
    targetSubmodule: 'Vacancies Catalog',
    subtext: 'Across all managed properties'
  },
  occupiedUnits: {
    id: 'occupiedUnits',
    title: 'Occupied Units',
    value: 398,
    formattedValue: '398 Occupied',
    trend: '82.57% of total',
    trendType: 'positive',
    icon: 'CheckCircle2',
    color: '#16a34a',
    targetSubmodule: 'Tenant Allocation',
    subtext: 'Active tenant lease agreements'
  },
  vacantUnits: {
    id: 'vacantUnits',
    title: 'Vacant Units',
    value: 84,
    formattedValue: '84 Vacant',
    trend: '17.43% of total',
    trendType: 'warning',
    icon: 'Key',
    color: '#f97316',
    targetSubmodule: 'Vacancies Catalog',
    subtext: 'Ready for lease allocation'
  },
  monthlyRentExpected: {
    id: 'monthlyRentExpected',
    title: 'Monthly Rent Expected',
    value: 3542000,
    formattedValue: '₹ 35.42 L',
    trend: 'Baseline expected rent',
    trendType: 'positive',
    icon: 'Receipt',
    color: '#06b6d4',
    targetSubmodule: 'Rent Collection',
    subtext: 'Sum of rent due for Aug 2026'
  },
  monthlyRentCollected: {
    id: 'monthlyRentCollected',
    title: 'Monthly Rent Collected',
    value: 2876000,
    formattedValue: '₹ 28.76 L',
    trend: '81.18% of expected',
    trendType: 'positive',
    icon: 'CheckCircle2',
    color: '#16a34a',
    targetSubmodule: 'Rent Collection',
    subtext: 'Realized rent payments'
  },
  overdueAmount: {
    id: 'overdueAmount',
    title: 'Overdue Amount',
    value: 666000,
    formattedValue: '₹ 6.66 L',
    trend: '18.82% of expected',
    trendType: 'danger',
    icon: 'AlertCircle',
    color: '#dc2626',
    targetSubmodule: 'Rent Collection',
    subtext: 'Overdue unpaid rent'
  }
};

export const OCCUPANCY_SPLIT_DATA = {
  totalCount: 482,
  occupiedCount: 398,
  vacantCount: 84,
  occupancyPct: 82.57,
  segments: [
    { label: 'Occupied Units', count: 398, pct: 82.57, color: '#16a34a' },
    { label: 'Vacant Units', count: 84, pct: 17.43, color: '#64748b' }
  ]
};

export const RENT_COLLECTION_TREND_SERIES = {
  '6M': {
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    expectedRentL: [32.0, 33.5, 34.0, 34.8, 35.0, 35.42],
    collectedRentL: [26.5, 28.1, 29.2, 28.8, 29.5, 28.76]
  },
  '3M': {
    months: ['Jun', 'Jul', 'Aug'],
    expectedRentL: [34.8, 35.0, 35.42],
    collectedRentL: [28.8, 29.5, 28.76]
  },
  '12M': {
    months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    expectedRentL: [28.0, 29.0, 29.5, 30.2, 31.0, 31.5, 32.0, 33.5, 34.0, 34.8, 35.0, 35.42],
    collectedRentL: [23.1, 24.2, 25.0, 25.8, 26.2, 25.9, 26.5, 28.1, 29.2, 28.8, 29.5, 28.76]
  }
};

export const RENT_COLLECTION_STATUS_DATA = {
  totalExpected: 35.42,
  collectionPct: 81.18,
  segments: [
    { label: 'Collected Rent', amountL: 28.76, color: '#16a34a' },
    { label: 'Overdue Amount', amountL: 6.66, color: '#dc2626' }
  ]
};

export const FULL_RENT_COLLECTIONS_LIST = [
  {
    id: 'RNT-2026-081',
    receiptNo: 'RCP-RNT-081',
    tenantName: 'Rajesh Kumar',
    unit: 'Flat 101, Tower A',
    project: 'Green Heights',
    rentMonth: 'August 2026',
    amount: '₹ 35,000',
    rawAmount: 35000,
    paidDate: '01 Aug 2026',
    mode: 'NEFT / Direct',
    status: 'Paid'
  },
  {
    id: 'RNT-2026-080',
    receiptNo: 'RCP-RNT-080',
    tenantName: 'Priya Sharma',
    unit: 'Villa 08, Block C',
    project: 'Azure Sky',
    rentMonth: 'August 2026',
    amount: '₹ 85,000',
    rawAmount: 85000,
    paidDate: '31 Jul 2026',
    mode: 'Cheque (#90124)',
    status: 'Paid'
  },
  {
    id: 'RNT-2026-079',
    receiptNo: 'RCP-RNT-079',
    tenantName: 'Anand Verma',
    unit: 'Flat 405, Tower B',
    project: 'Prime Residency',
    rentMonth: 'August 2026',
    amount: '₹ 28,000',
    rawAmount: 28000,
    paidDate: '30 Jul 2026',
    mode: 'UPI Online',
    status: 'Paid'
  },
  {
    id: 'RNT-2026-078',
    receiptNo: 'RCP-RNT-078',
    tenantName: 'Sunita Reddy',
    unit: 'Flat 802, Tower 1',
    project: 'Sunshine Towers',
    rentMonth: 'August 2026',
    amount: '₹ 42,000',
    rawAmount: 42000,
    paidDate: '28 Jul 2026',
    mode: 'NEFT',
    status: 'Partial'
  },
  {
    id: 'RNT-2026-077',
    receiptNo: 'RCP-RNT-077',
    tenantName: 'Vikram Mehta',
    unit: 'Flat 203, Tower C',
    project: 'Green Heights',
    rentMonth: 'July 2026',
    amount: '₹ 38,000',
    rawAmount: 38000,
    paidDate: '26 Jul 2026',
    mode: 'Cheque',
    status: 'Overdue'
  }
];

export const RENTAL_SECTION_TILES = [
  {
    id: 'Owners',
    title: 'Owners Directory',
    description: 'Manage property owners, bank details & legal power of attorney',
    icon: 'UserCheck',
    count: '142 Owners',
    targetSubmodule: 'Owners Directory'
  },
  {
    id: 'Tenant Allocation',
    title: 'Tenant Allocation',
    description: 'Allocate tenants to vacant units & process onboarding',
    icon: 'Users',
    count: '398 Active',
    targetSubmodule: 'Tenant Allocation'
  },
  {
    id: 'Rental Agreements',
    title: 'Rental Agreements',
    description: 'Draft, execute & store registered lease agreements',
    icon: 'FileText',
    count: '398 Agreements',
    targetSubmodule: 'Rental Agreements'
  },
  {
    id: 'Rent Collection',
    title: 'Rent Collection',
    description: 'Record rent payments online/offline & issue receipts',
    icon: 'Receipt',
    count: '₹28.76L Collected',
    targetSubmodule: 'Rent Collection'
  },
  {
    id: 'Security Deposits',
    title: 'Security Deposits',
    description: 'Manage security deposits held in escrow & tenant refunds',
    icon: 'Shield',
    count: '₹1.15Cr Deposits',
    targetSubmodule: 'Security Deposits'
  },
  {
    id: 'Owner Settlement',
    title: 'Owner Settlement',
    description: 'Calculate net rental payout to owners after maintenance fee',
    icon: 'IndianRupee',
    count: 'Monthly Payouts',
    targetSubmodule: 'Owner Settlement'
  },
  {
    id: 'Renewals',
    title: 'Lease Renewals',
    description: 'Manage agreement renewal notices & rent revision escalations',
    icon: 'Clock',
    count: '14 Renewals Due',
    targetSubmodule: 'Lease Renewals'
  },
  {
    id: 'Vacancies',
    title: 'Vacancies Catalog',
    description: 'View vacant units ready for leasing & site walkthroughs',
    icon: 'Key',
    count: '84 Vacant',
    targetSubmodule: 'Vacancies Catalog'
  },
  {
    id: 'Reports',
    title: 'Rental Reports',
    description: 'Occupancy, Collection, Overdue, Owner-wise & Unit-wise MIS',
    icon: 'BarChart3',
    count: 'MIS Reports',
    targetSubmodule: 'Rental Reports'
  }
];

export const UPCOMING_LEASE_RENEWALS_LIST = [
  {
    id: 'RNW-2026-01',
    tenantName: 'Rahul Mehta',
    unit: 'Flat 304, Tower B',
    project: 'Green Heights',
    endDate: '15 Aug 2026',
    daysLeft: 14,
    urgent: true
  },
  {
    id: 'RNW-2026-02',
    tenantName: 'Deepak Verma',
    unit: 'Flat 102, Tower 1',
    project: 'Sunshine Towers',
    endDate: '21 Aug 2026',
    daysLeft: 20,
    urgent: false
  },
  {
    id: 'RNW-2026-03',
    tenantName: 'Sanjay Kapoor',
    unit: 'Villa 04, Block A',
    project: 'Azure Sky',
    endDate: '26 Aug 2026',
    daysLeft: 25,
    urgent: false
  }
];

export const VACANT_UNITS_LIST = [
  {
    id: 'VAC-101',
    unit: 'Flat 402, Tower A',
    project: 'Green Heights',
    type: '2BHK Apartment',
    areaSqFt: '1,250 sq.ft',
    rentAmount: '₹ 32,000 / mo'
  },
  {
    id: 'VAC-102',
    unit: 'Flat 605, Block 1',
    project: 'Prime Residency',
    type: '3BHK Luxury',
    areaSqFt: '1,650 sq.ft',
    rentAmount: '₹ 45,000 / mo'
  },
  {
    id: 'VAC-103',
    unit: 'Shop 08, Ground Floor',
    project: 'City Center Plaza',
    type: 'Commercial Shop',
    areaSqFt: '850 sq.ft',
    rentAmount: '₹ 65,000 / mo'
  }
];

// Maintenance Management PRD Datasets
export const MAINTENANCE_KPIS = {
  totalComplaints: {
    id: 'totalComplaints',
    title: 'Total Complaints',
    value: 215,
    formattedValue: '215 Total',
    trend: '↑ 16% this month',
    trendType: 'positive',
    icon: 'Wrench',
    color: '#2563eb',
    targetSubmodule: 'Complaints Register',
    subtext: 'Logged in August 2026'
  },
  openComplaints: {
    id: 'openComplaints',
    title: 'Open Complaints',
    value: 42,
    formattedValue: '42 Open',
    trend: '↑ 12% this month',
    trendType: 'warning',
    icon: 'AlertCircle',
    color: '#06b6d4',
    targetSubmodule: 'Complaints Register',
    subtext: 'New unassigned tickets'
  },
  inProgressComplaints: {
    id: 'inProgressComplaints',
    title: 'In Progress',
    value: 36,
    formattedValue: '36 Active',
    trend: '↑ 8% this month',
    trendType: 'warning',
    icon: 'Clock',
    color: '#f97316',
    targetSubmodule: 'Vendor Assignments',
    subtext: 'Assigned to technicians'
  },
  resolvedComplaints: {
    id: 'resolvedComplaints',
    title: 'Resolved Complaints',
    value: 128,
    formattedValue: '128 Resolved',
    trend: '↑ 22% this month',
    trendType: 'positive',
    icon: 'CheckCircle2',
    color: '#16a34a',
    targetSubmodule: 'Work Completion',
    subtext: 'Successfully closed'
  },
  avgResolutionTime: {
    id: 'avgResolutionTime',
    title: 'Avg. Resolution Time',
    value: 2.4,
    formattedValue: '2.4 Days',
    trend: '↓ 10% faster (improving)',
    trendType: 'positive',
    icon: 'Timer',
    color: '#8b5cf6',
    targetSubmodule: 'SLA / TAT Report',
    subtext: 'Average SLA TAT'
  }
};

export const COMPLAINTS_STATUS_SPLIT_DATA = {
  totalCount: 215,
  segments: [
    { label: 'Open', count: 42, pct: 19.5, color: '#06b6d4' },
    { label: 'In Progress', count: 36, pct: 16.7, color: '#f97316' },
    { label: 'Resolved', count: 128, pct: 59.5, color: '#16a34a' },
    { label: 'Closed', count: 9, pct: 4.3, color: '#64748b' }
  ]
};

export const COMPLAINTS_BY_CATEGORY_DATA = [
  { category: 'Plumbing', count: 62, color: '#2563eb' },
  { category: 'Electrical', count: 48, color: '#f59e0b' },
  { category: 'Civil Work', count: 41, color: '#16a34a' },
  { category: 'Lift / Elevator', count: 28, color: '#8b5cf6' },
  { category: 'Cleaning', count: 18, color: '#06b6d4' },
  { category: 'Others', count: 18, color: '#64748b' }
];

export const COMPLAINTS_BY_PRIORITY_DATA = {
  totalCount: 215,
  segments: [
    { label: 'High Priority', count: 32, pct: 15, color: '#dc2626' },
    { label: 'Medium Priority', count: 124, pct: 58, color: '#f59e0b' },
    { label: 'Low Priority', count: 59, pct: 27, color: '#16a34a' }
  ]
};

export const FULL_MAINTENANCE_COMPLAINTS_LIST = [
  {
    id: 'CMP-2026-081',
    unitLocation: 'Flat 304, Green Heights',
    category: 'Plumbing',
    reportedBy: 'Mahesh Nair',
    priority: 'High',
    status: 'Open',
    assignedTo: 'Unassigned',
    reportedOn: '01 Aug 2026',
    description: 'Plumbing leakage in Master Bathroom shower fitting causing water accumulation.',
    slaDeadline: '24 Hours (Due Tomorrow)'
  },
  {
    id: 'CMP-2026-080',
    unitLocation: 'Flat 102, Prime Residency',
    category: 'Electrical',
    reportedBy: 'Swati Deshmukh',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'Shree Electricals',
    reportedOn: '31 Jul 2026',
    description: 'Electrical DB breaker tripping frequently under load in living room.',
    slaDeadline: '12 Hours (In Progress)'
  },
  {
    id: 'CMP-2026-079',
    unitLocation: 'Flat 505, Sunshine Towers',
    category: 'Civil Work',
    reportedBy: 'Pankaj Roy',
    priority: 'Medium',
    status: 'Assigned',
    assignedTo: 'Krishna Plumbing & Civil',
    reportedOn: '30 Jul 2026',
    description: 'Balcony sliding door roller alignment issue and frame gap.',
    slaDeadline: '48 Hours'
  },
  {
    id: 'CMP-2026-078',
    unitLocation: 'Tower A Elevator #2',
    category: 'Lift / Elevator',
    reportedBy: 'Facility Manager',
    priority: 'High',
    status: 'On Hold',
    assignedTo: 'Otis Elevators AMC',
    reportedOn: '29 Jul 2026',
    description: 'Door sensor obstruction error on 6th floor landing.',
    slaDeadline: 'Parts Awaited'
  },
  {
    id: 'CMP-2026-077',
    unitLocation: 'Villa 02, Azure Sky',
    category: 'Civil Work',
    reportedBy: 'Neha Agarwal',
    priority: 'Low',
    status: 'Resolved',
    assignedTo: 'ABC Facility Services',
    reportedOn: '28 Jul 2026',
    description: 'Water seepage near dining room window frame sealed with silicone coat.',
    slaDeadline: 'Resolved in 1.8 Days'
  }
];

export const MAINTENANCE_QUICK_ACTIONS = [
  {
    id: 'Add Complaint',
    title: 'Raise New Complaint',
    description: 'Log customer or facility maintenance issues',
    icon: 'Wrench',
    actionText: '+ Add',
    targetSubmodule: 'Complaints Register'
  },
  {
    id: 'Service Requests',
    title: 'Service Requests',
    description: 'Create scheduled maintenance service requests',
    icon: 'PlusCircle',
    actionText: '+ Create',
    targetSubmodule: 'Service Requests'
  },
  {
    id: 'Vendor Assignments',
    title: 'Vendor Assignments',
    description: 'Assign maintenance jobs to registered vendors',
    icon: 'UserPlus',
    actionText: '+ Assign',
    targetSubmodule: 'Vendor Assignments'
  },
  {
    id: 'Work Completion',
    title: 'Work Completion',
    description: 'Mark work done & attach completion proof',
    icon: 'CheckSquare',
    actionText: '+ Complete',
    targetSubmodule: 'Work Completion'
  },
  {
    id: 'Maintenance Bills',
    title: 'Maintenance Bills',
    description: 'Create & approve vendor maintenance invoices',
    icon: 'Receipt',
    actionText: '+ Create',
    targetSubmodule: 'Maintenance Bills'
  },
  {
    id: 'SLA/TAT Report',
    title: 'SLA / TAT Report',
    description: 'View resolution performance against SLA targets',
    icon: 'BarChart3',
    actionText: 'View Report',
    targetSubmodule: 'SLA / TAT Report'
  }
];

export const TOP_CATEGORIES_DATA = [
  { category: 'Plumbing', total: 62, resolved: 38, pending: 24, slaMetPct: 88 },
  { category: 'Electrical', total: 48, resolved: 30, pending: 18, slaMetPct: 85 },
  { category: 'Civil Work', total: 41, resolved: 22, pending: 19, slaMetPct: 82 },
  { category: 'Lift / Elevator', total: 28, resolved: 18, pending: 10, slaMetPct: 92 },
  { category: 'Cleaning', total: 18, resolved: 12, pending: 6, slaMetPct: 94 },
  { category: 'Others', total: 18, resolved: 8, pending: 10, slaMetPct: 78 }
];

export const SLA_PERFORMANCE_DATA = {
  slaMetPct: 86,
  targetPct: 90,
  withinSla: 110,
  breachedSla: 18,
  totalEvaluated: 128
};

export const VENDOR_PERFORMANCE_LIST = [
  {
    id: 'VND-PERF-01',
    name: 'ABC Facility Services',
    jobsAssigned: 18,
    jobsCompleted: 16,
    rating: 5,
    stars: '★★★★★'
  },
  {
    id: 'VND-PERF-02',
    name: 'Om Sai Enterprises',
    jobsAssigned: 15,
    jobsCompleted: 13,
    rating: 5,
    stars: '★★★★★'
  },
  {
    id: 'VND-PERF-03',
    name: 'Shree Electricals',
    jobsAssigned: 12,
    jobsCompleted: 10,
    rating: 4,
    stars: '★★★★☆'
  },
  {
    id: 'VND-PERF-04',
    name: 'Krishna Plumbing',
    jobsAssigned: 10,
    jobsCompleted: 8,
    rating: 3,
    stars: '★★★☆☆'
  }
];

// Inventory Management PRD Datasets
export const INVENTORY_KPIS = {
  totalItems: {
    id: 'totalItems',
    title: 'Total Items (SKUs)',
    value: 523,
    formattedValue: '523 SKUs',
    trend: '↑ 12% this month',
    trendType: 'positive',
    icon: 'Boxes',
    color: '#2563eb',
    targetSubmodule: 'Materials Catalog',
    subtext: 'Across central & site stores'
  },
  totalStockValue: {
    id: 'totalStockValue',
    title: 'Total Stock Value',
    value: 18400000,
    formattedValue: '₹ 1.84 Cr',
    trend: '↑ 18% this month',
    trendType: 'positive',
    icon: 'TrendingUp',
    color: '#16a34a',
    targetSubmodule: 'Reports & Valuation',
    subtext: 'FIFO Valuation method'
  },
  lowStockItems: {
    id: 'lowStockItems',
    title: 'Low Stock Items',
    value: 23,
    formattedValue: '23 Items',
    trend: '↓ 5% this month (improving)',
    trendType: 'positive',
    icon: 'AlertCircle',
    color: '#f97316',
    targetSubmodule: 'Materials Catalog',
    subtext: 'At or below reorder level'
  },
  outOfStockItems: {
    id: 'outOfStockItems',
    title: 'Out of Stock',
    value: 7,
    formattedValue: '7 Items',
    trend: '↑ 2% this month',
    trendType: 'danger',
    icon: 'AlertTriangle',
    color: '#dc2626',
    targetSubmodule: 'Materials Catalog',
    subtext: 'Zero available quantity'
  },
  grnThisMonth: {
    id: 'grnThisMonth',
    title: 'GRN Received (Month)',
    value: 48,
    formattedValue: '48 GRNs',
    trend: '↑ 22% this month',
    trendType: 'positive',
    icon: 'Truck',
    color: '#06b6d4',
    targetSubmodule: 'GRN (Goods Receipt)',
    subtext: 'Inbound material receipts'
  },
  issuesThisMonth: {
    id: 'issuesThisMonth',
    title: 'Material Issues (Month)',
    value: 142,
    formattedValue: '142 Issues',
    trend: '↑ 15% this month',
    trendType: 'positive',
    icon: 'Send',
    color: '#8b5cf6',
    targetSubmodule: 'Stock Issue',
    subtext: 'Outbound site requisitions'
  }
};

export const STOCK_VALUE_TREND_SERIES = {
  '6M': {
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    valuesCr: [1.25, 1.40, 1.55, 1.62, 1.75, 1.84]
  },
  '3M': {
    months: ['Jun', 'Jul', 'Aug'],
    valuesCr: [1.62, 1.75, 1.84]
  },
  '12M': {
    months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    valuesCr: [0.95, 1.05, 1.10, 1.18, 1.20, 1.22, 1.25, 1.40, 1.55, 1.62, 1.75, 1.84]
  }
};

export const STOCK_BY_CATEGORY_DATA = {
  totalCount: 523,
  categories: [
    { label: 'Cement & Concrete', pct: 30, color: '#2563eb' },
    { label: 'Steel & TMT Bars', pct: 25, color: '#16a34a' },
    { label: 'Bricks & Blocks', pct: 15, color: '#f59e0b' },
    { label: 'Electrical Fittings', pct: 10, color: '#8b5cf6' },
    { label: 'Plumbing & Pipes', pct: 8, color: '#06b6d4' },
    { label: 'Others & Hardware', pct: 12, color: '#64748b' }
  ]
};

export const STOCK_STATUS_SPLIT_DATA = {
  totalCount: 523,
  segments: [
    { label: 'In Stock', count: 372, pct: 71, color: '#16a34a' },
    { label: 'Low Stock', count: 23, pct: 11, color: '#f59e0b' },
    { label: 'Out of Stock', count: 7, pct: 11, color: '#dc2626' },
    { label: 'Not Tracked', count: 121, pct: 17, color: '#64748b' }
  ]
};

export const FULL_INVENTORY_TRANSACTIONS_LIST = [
  {
    id: 'TXN-2026-081',
    date: '01 Aug 2026',
    type: 'GRN',
    refNo: 'GRN-2026-048',
    item: 'UltraTech Cement 53 Grade',
    qty: '+ 500 Bags',
    unit: 'Bags',
    warehouseSite: 'Central Store Noida',
    remarks: 'Received via PO #8012 from UltraTech Cement',
    user: 'Ramesh Singh (Store Keeper)'
  },
  {
    id: 'TXN-2026-080',
    date: '31 Jul 2026',
    type: 'ISSUE',
    refNo: 'ISS-2026-142',
    item: 'TMT Steel Bar 12mm (Fe-550)',
    qty: '- 4.5 MT',
    unit: 'MT',
    warehouseSite: 'Green Heights Tower A',
    remarks: 'Issued for Slab 6 Pouring Requisition',
    user: 'Suresh Menon (Site Engineer)'
  },
  {
    id: 'TXN-2026-079',
    date: '30 Jul 2026',
    type: 'TRANSFER',
    refNo: 'TRN-2026-024',
    item: 'Red Bricks Class-1',
    qty: '⇄ 2,000 Pcs',
    unit: 'Pcs',
    warehouseSite: 'Store A -> Prime Residency',
    remarks: 'Inter-site stock transfer for masonry work',
    user: 'Ramesh Singh (Store Keeper)'
  },
  {
    id: 'TXN-2026-078',
    date: '28 Jul 2026',
    type: 'CONSUMPTION',
    refNo: 'CNS-2026-094',
    item: 'CPVC Water Pipe 1 Inch',
    qty: '- 150 Mtr',
    unit: 'Mtr',
    warehouseSite: 'Sunshine Towers Block 2',
    remarks: 'Plumbing rough-in work consumption',
    user: 'Pankaj Roy (Technician)'
  },
  {
    id: 'TXN-2026-077',
    date: '26 Jul 2026',
    type: 'ADJUSTMENT',
    refNo: 'ADJ-2026-012',
    item: 'Tile Adhesive Chemical 20kg',
    qty: '- 5 Bags',
    unit: 'Bags',
    warehouseSite: 'Central Store Noida',
    remarks: 'Damaged packaging write-off during audit',
    user: 'John Doe (Admin)'
  }
];

export const LOW_STOCK_ALERTS_LIST = [
  {
    id: 'LS-01',
    item: 'TMT Steel Bar 12mm (Fe-550)',
    available: 120,
    reorderLevel: 300,
    unit: 'MT',
    warehouseSite: 'Green Heights Site Store',
    deficit: '180 MT Shortfall',
    urgent: true
  },
  {
    id: 'LS-02',
    item: 'UltraTech Cement 53 Grade',
    available: 150,
    reorderLevel: 400,
    unit: 'Bags',
    warehouseSite: 'Central Store Noida',
    deficit: '250 Bags Shortfall',
    urgent: true
  },
  {
    id: 'LS-03',
    item: 'Red Bricks Class-1',
    available: 1200,
    reorderLevel: 3000,
    unit: 'Pcs',
    warehouseSite: 'Prime Residency Site',
    deficit: '1800 Pcs Shortfall',
    urgent: false
  }
];

export const TOP_STOCK_VALUE_LIST = [
  {
    rank: 1,
    item: 'TMT Steel Bar 12mm (Fe-550)',
    stockValue: '₹ 28,50,000',
    availableQty: '450 MT',
    unit: 'MT'
  },
  {
    rank: 2,
    item: 'UltraTech Cement 53 Grade',
    stockValue: '₹ 22,30,000',
    availableQty: '5,800 Bags',
    unit: 'Bags'
  },
  {
    rank: 3,
    item: 'Plywood Waterproof 18mm',
    stockValue: '₹ 15,60,000',
    availableQty: '1,200 Sheets',
    unit: 'Sheets'
  },
  {
    rank: 4,
    item: 'Red Bricks Class-1',
    stockValue: '₹ 10,80,000',
    availableQty: '1,20,000 Pcs',
    unit: 'Pcs'
  },
  {
    rank: 5,
    item: 'River Sand Coarse',
    stockValue: '₹ 8,70,000',
    availableQty: '2,900 Cu.Ft',
    unit: 'Cu.Ft'
  }
];

export const INVENTORY_QUICK_ACTIONS = [
  {
    id: 'Add Material',
    title: 'Add Material SKU',
    description: 'Onboard new material SKU item specifications',
    icon: 'Boxes',
    actionText: '+ Add',
    targetSubmodule: 'Materials Catalog'
  },
  {
    id: 'Add Supplier',
    title: 'Add Supplier',
    description: 'Register vendor & material supplier details',
    icon: 'UserPlus',
    actionText: '+ Add',
    targetSubmodule: 'Suppliers Directory'
  },
  {
    id: 'Create PO',
    title: 'Create Purchase Order',
    description: 'Draft & issue material purchase order',
    icon: 'FileText',
    actionText: '+ Create',
    targetSubmodule: 'Purchase Orders'
  },
  {
    id: 'GRN Entry',
    title: 'GRN Goods Receipt',
    description: 'Receive inbound material delivery at store',
    icon: 'Truck',
    actionText: '+ Receive',
    targetSubmodule: 'GRN (Goods Receipt)'
  },
  {
    id: 'Issue Material',
    title: 'Issue Material',
    description: 'Deduct & issue stock to project site',
    icon: 'Send',
    actionText: '+ Issue',
    targetSubmodule: 'Stock Issue'
  },
  {
    id: 'Stock Transfer',
    title: 'Stock Transfer',
    description: 'Transfer material between stores or sites',
    icon: 'ArrowRightLeft',
    actionText: '+ Transfer',
    targetSubmodule: 'Stock Transfer'
  },
  {
    id: 'Stock Adjustment',
    title: 'Stock Adjustment',
    description: 'Adjust physical audit count differences',
    icon: 'Sliders',
    actionText: '+ Adjust',
    targetSubmodule: 'Stock Adjustment'
  },
  {
    id: 'Stock Report',
    title: 'Stock Valuation Report',
    description: 'View stock summary, aging & FIFO valuation',
    icon: 'BarChart3',
    actionText: '+ View',
    targetSubmodule: 'Reports & Valuation'
  }
];

// ----------------------------------------------------------------------
// Finance Management PRD Datasets
// ----------------------------------------------------------------------

export const FINANCE_PRD_KPIS = {
  totalIncome: {
    id: 'totalIncome',
    title: 'Total Income (₹)',
    value: 1425000000,
    formattedValue: '₹ 142.50 Cr',
    trend: '↑ 18% this month',
    trendType: 'positive',
    icon: 'TrendingUp',
    color: '#16a34a',
    targetSubmodule: 'Income Management',
    subtext: 'Sales receipts & rent realization'
  },
  totalExpenses: {
    id: 'totalExpenses',
    title: 'Total Expenses (₹)',
    value: 854000000,
    formattedValue: '₹ 85.40 Cr',
    trend: '↑ 12% this month',
    trendType: 'warning',
    icon: 'Receipt',
    color: '#f97316',
    targetSubmodule: 'Expenses Management',
    subtext: 'Site ops & material vendor bills'
  },
  netProfit: {
    id: 'netProfit',
    title: 'Net Profit (₹)',
    value: 571000000,
    formattedValue: '₹ 57.10 Cr',
    trend: '↑ 22% this month',
    trendType: 'positive',
    icon: 'IndianRupee',
    color: '#2563eb',
    targetSubmodule: 'Financial Reports',
    subtext: 'Gross operating margin'
  },
  receivables: {
    id: 'receivables',
    title: 'Total Receivables (₹)',
    value: 241800000,
    formattedValue: '₹ 24.18 Cr',
    trend: '↑ 12% this month',
    trendType: 'warning',
    icon: 'AlertCircle',
    color: '#06b6d4',
    targetSubmodule: 'Income Management',
    subtext: 'Customer milestone dues'
  },
  payables: {
    id: 'payables',
    title: 'Total Payables (₹)',
    value: 128000000,
    formattedValue: '₹ 12.80 Cr',
    trend: '↓ 5% this month (less owed)',
    trendType: 'positive',
    icon: 'CreditCard',
    color: '#8b5cf6',
    targetSubmodule: 'Expenses Management',
    subtext: 'Vendor & contractor bills'
  }
};

export const CASH_FLOW_SERIES = {
  '6M': {
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    inflowL: [68.5, 74.2, 82.0, 78.5, 88.0, 95.4],
    outflowL: [42.0, 48.5, 52.0, 50.2, 54.0, 58.2],
    netFlowL: [26.5, 25.7, 30.0, 28.3, 34.0, 37.2]
  },
  '3M': {
    months: ['Jun', 'Jul', 'Aug'],
    inflowL: [78.5, 88.0, 95.4],
    outflowL: [50.2, 54.0, 58.2],
    netFlowL: [28.3, 34.0, 37.2]
  },
  '12M': {
    months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    inflowL: [45.0, 52.0, 58.0, 62.0, 64.0, 66.0, 68.5, 74.2, 82.0, 78.5, 88.0, 95.4],
    outflowL: [30.0, 35.0, 38.0, 40.0, 41.0, 41.5, 42.0, 48.5, 52.0, 50.2, 54.0, 58.2],
    netFlowL: [15.0, 17.0, 20.0, 22.0, 23.0, 24.5, 26.5, 25.7, 30.0, 28.3, 34.0, 37.2]
  }
};

export const INCOME_VS_EXPENSE_SERIES = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  incomeL: [64.0, 66.0, 68.5, 74.2, 82.0, 78.5, 88.0, 95.4],
  expenseL: [41.0, 41.5, 42.0, 48.5, 52.0, 50.2, 54.0, 58.2]
};

export const EXPENSE_BY_CATEGORY_DATA = {
  totalExpenseL: 85.40,
  categories: [
    { label: 'Project Construction Cost', pct: 40, amountL: 34.16, color: '#2563eb' },
    { label: 'Material Purchase', pct: 20, amountL: 17.08, color: '#16a34a' },
    { label: 'Admin & Operating', pct: 15, amountL: 12.81, color: '#f59e0b' },
    { label: 'Payroll & Site Labour', pct: 10, amountL: 8.54, color: '#8b5cf6' },
    { label: 'Other Overheads', pct: 15, amountL: 12.81, color: '#06b6d4' }
  ]
};

export const FULL_FINANCE_TRANSACTIONS_LIST = [
  {
    id: 'FTX-2026-081',
    date: '01 Aug 2026',
    type: 'Receipt',
    voucherNo: 'RCP-2026-081',
    description: 'Flat 101 Booking Milestone Realization',
    ledgerParty: 'Rajesh Kumar (Customer)',
    project: 'Green Heights',
    amount: '₹ 15,00,000',
    rawAmount: 1500000,
    status: 'Received'
  },
  {
    id: 'FTX-2026-080',
    date: '31 Jul 2026',
    type: 'Payment',
    voucherNo: 'PMT-2026-142',
    description: 'Steel TMT Supply Invoice #PO-8012 Settlement',
    ledgerParty: 'Tata Steel Infrastructure',
    project: 'Green Heights',
    amount: '₹ 28,50,000',
    rawAmount: 2850000,
    status: 'Paid'
  },
  {
    id: 'FTX-2026-079',
    date: '30 Jul 2026',
    type: 'Journal',
    voucherNo: 'JRN-2026-024',
    description: 'GST TDS Provision Entry Q2',
    ledgerParty: 'GST Tax Authorities',
    project: 'Corporate Office',
    amount: '₹ 4,41,000',
    rawAmount: 441000,
    status: 'Posted'
  },
  {
    id: 'FTX-2026-078',
    date: '28 Jul 2026',
    type: 'Payment',
    voucherNo: 'PMT-2026-140',
    description: 'Ready-Mix Cement Supply Bill Payment',
    ledgerParty: 'UltraTech Cement Ltd',
    project: 'Prime Residency',
    amount: '₹ 12,20,000',
    rawAmount: 1220000,
    status: 'Paid'
  },
  {
    id: 'FTX-2026-077',
    date: '26 Jul 2026',
    type: 'Receipt',
    voucherNo: 'RCP-2026-078',
    description: 'Shop 12 Commercial Lease Advance Receipt',
    ledgerParty: 'Meenakshi Iyer',
    project: 'City Center Plaza',
    amount: '₹ 7,50,000',
    rawAmount: 750000,
    status: 'Received'
  }
];

export const REGISTERED_BANK_ACCOUNTS_LIST = [
  {
    id: 'BNK-01',
    name: 'HDFC Bank Escrow Account',
    accountNo: '50200048912345',
    type: 'RERA Escrow Account',
    branch: 'Gachibowli Main, Hyderabad',
    balance: '₹ 42,50,00,000',
    rawBalance: 425000000,
    status: 'Active'
  },
  {
    id: 'BNK-02',
    name: 'ICICI Bank Escrow Account',
    accountNo: '000405018922',
    type: 'RERA Escrow Account',
    branch: 'Whitefield, Bengaluru',
    balance: '₹ 18,20,00,000',
    rawBalance: 182000000,
    status: 'Active'
  },
  {
    id: 'BNK-03',
    name: 'State Bank of India (SBI)',
    accountNo: '309100481239',
    type: 'Current Operating Account',
    branch: 'Connaught Place, New Delhi',
    balance: '₹ 8,40,00,000',
    rawBalance: 84000000,
    status: 'Active'
  }
];

export const OUTSTANDING_FINANCE_METRICS = {
  customerReceivables: {
    amount: '₹ 24.18 Cr',
    countText: '23 Invoices',
    subtext: 'Pending customer dues'
  },
  vendorPayables: {
    amount: '₹ 12.80 Cr',
    countText: '17 Bills',
    subtext: 'Pending vendor invoices'
  },
  overdueReceivables: {
    amount: '₹ 4.85 Cr',
    countText: '5 Invoices',
    subtext: 'Overdue >30 days'
  },
  overduePayables: {
    amount: '₹ 2.40 Cr',
    countText: '4 Bills',
    subtext: 'Overdue vendor bills'
  }
};

export const FINANCE_QUICK_ACTIONS = [
  {
    id: 'Add Income',
    title: 'Record Income',
    description: 'Log customer receipts & non-sales income',
    icon: 'TrendingUp',
    actionText: '+ Add',
    targetSubmodule: 'Income Management'
  },
  {
    id: 'Add Expense',
    title: 'Record Expense',
    description: 'Record vendor bills & site operating costs',
    icon: 'Receipt',
    actionText: '+ Add',
    targetSubmodule: 'Expenses Management'
  },
  {
    id: 'Create Invoice',
    title: 'Create Invoice',
    description: 'Generate customer demand invoice or GST bill',
    icon: 'FileText',
    actionText: '+ Create',
    targetSubmodule: 'Income Management'
  },
  {
    id: 'Make Payment',
    title: 'Make Payment',
    description: 'Process vendor, contractor & staff payouts',
    icon: 'CreditCard',
    actionText: '+ Pay',
    targetSubmodule: 'Expenses Management'
  },
  {
    id: 'Bank Entry',
    title: 'Bank Transaction',
    description: 'Record bank deposits, interest & bank charges',
    icon: 'Building',
    actionText: '+ Entry',
    targetSubmodule: 'Banking & Reconciliation'
  },
  {
    id: 'Transfer Entry',
    title: 'Bank / Cash Transfer',
    description: 'Inter-account escrow & cash float transfer',
    icon: 'ArrowRightLeft',
    actionText: '+ Transfer',
    targetSubmodule: 'Banking & Reconciliation'
  },
  {
    id: 'Budget Entry',
    title: 'Project Budgeting',
    description: 'Set project budget targets & track variance',
    icon: 'PieChart',
    actionText: '+ Budget',
    targetSubmodule: 'Budgeting & Forecasting'
  },
  {
    id: 'Financial Reports',
    title: 'Financial Reports',
    description: 'View P&L, Cash Flow, Balance Sheet & Tax MIS',
    icon: 'BarChart3',
    actionText: '+ Reports',
    targetSubmodule: 'Financial Reports'
  }
];

// ----------------------------------------------------------------------
// HR Management PRD Datasets
// ----------------------------------------------------------------------

export const HR_KPIS = {
  totalEmployees: {
    id: 'totalEmployees',
    title: 'Total Employees',
    value: 186,
    formattedValue: '186 Active',
    trend: '↑ 12% this month',
    trendType: 'positive',
    icon: 'Users',
    color: '#2563eb',
    targetSubmodule: 'Employees Directory',
    subtext: 'Active workforce headcount'
  },
  presentToday: {
    id: 'presentToday',
    title: 'Present Today',
    value: 142,
    formattedValue: '142 Present',
    trend: '76% of total',
    trendType: 'positive',
    icon: 'UserCheck',
    color: '#16a34a',
    targetSubmodule: 'Attendance & Shifts',
    subtext: 'Today\'s biometric check-in'
  },
  onLeaveToday: {
    id: 'onLeaveToday',
    title: 'On Leave Today',
    value: 18,
    formattedValue: '18 On Leave',
    trend: '10% of total',
    trendType: 'warning',
    icon: 'Calendar',
    color: '#06b6d4',
    targetSubmodule: 'Leave Management',
    subtext: 'Approved leave requests'
  },
  newJoinees: {
    id: 'newJoinees',
    title: 'New Joinees (Month)',
    value: 9,
    formattedValue: '9 New',
    trend: '↑ 29% this month',
    trendType: 'positive',
    icon: 'UserPlus',
    color: '#8b5cf6',
    targetSubmodule: 'Employees Directory',
    subtext: 'Onboarded in August 2026'
  },
  upcomingBirthdays: {
    id: 'upcomingBirthdays',
    title: 'Upcoming Birthdays',
    value: 7,
    formattedValue: '7 Birthdays',
    trend: 'Next 7 days window',
    trendType: 'neutral',
    icon: 'Gift',
    color: '#f59e0b',
    targetSubmodule: 'Employees Directory',
    subtext: 'Team birthday celebrations'
  }
};

export const HEADCOUNT_TREND_SERIES = {
  '6M': {
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    counts: [145, 152, 160, 168, 175, 186]
  },
  '3M': {
    months: ['Jun', 'Jul', 'Aug'],
    counts: [168, 175, 186]
  },
  '12M': {
    months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    counts: [120, 125, 130, 134, 138, 140, 145, 152, 160, 168, 175, 186]
  }
};

export const DEPARTMENT_DISTRIBUTION_DATA = {
  totalCount: 186,
  departments: [
    { label: 'Site / Project Ops', count: 48, pct: 26, color: '#2563eb' },
    { label: 'Engineering & Arch', count: 42, pct: 23, color: '#16a34a' },
    { label: 'Finance & Accounts', count: 24, pct: 13, color: '#f59e0b' },
    { label: 'HR & Admin', count: 18, pct: 10, color: '#8b5cf6' },
    { label: 'Procurement & Store', count: 16, pct: 9, color: '#06b6d4' },
    { label: 'Others & Support', count: 38, pct: 20, color: '#64748b' }
  ]
};

export const ATTENDANCE_OVERVIEW_DATA = {
  totalCount: 186,
  segments: [
    { label: 'Present', count: 142, pct: 76, color: '#16a34a' },
    { label: 'Absent', count: 18, pct: 10, color: '#dc2626' },
    { label: 'Half Day', count: 12, pct: 6, color: '#f59e0b' },
    { label: 'Leave', count: 14, pct: 8, color: '#2563eb' }
  ]
};

export const FULL_EMPLOYEES_LIST = [
  {
    id: 'EMP-1001',
    empCode: 'EMP-1001',
    name: 'Rohit Sharma',
    initials: 'RS',
    department: 'HR & Admin',
    designation: 'HR Manager',
    mobile: '+91 98111 22334',
    email: 'rohit.sharma@apexerp.com',
    joiningDate: '15 Jan 2024',
    status: 'Active',
    baseSalary: '₹ 1,20,000 / mo',
    employmentType: 'Full-Time Permanent'
  },
  {
    id: 'EMP-1002',
    empCode: 'EMP-1002',
    name: 'Anjali Verma',
    initials: 'AV',
    department: 'Engineering & Arch',
    designation: 'Senior Structural Engineer',
    mobile: '+91 98222 33445',
    email: 'anjali.v@apexerp.com',
    joiningDate: '01 Mar 2024',
    status: 'Active',
    baseSalary: '₹ 1,45,000 / mo',
    employmentType: 'Full-Time Permanent'
  },
  {
    id: 'EMP-1003',
    empCode: 'EMP-1003',
    name: 'Suresh Menon',
    initials: 'SM',
    department: 'Site / Project Ops',
    designation: 'Project Site Engineer',
    mobile: '+91 97112 44556',
    email: 'suresh.m@apexerp.com',
    joiningDate: '10 Jun 2024',
    status: 'On Leave',
    baseSalary: '₹ 95,000 / mo',
    employmentType: 'Full-Time Permanent'
  },
  {
    id: 'EMP-1004',
    empCode: 'EMP-1004',
    name: 'Vikram Malhotra',
    initials: 'VM',
    department: 'Finance & Accounts',
    designation: 'Senior Accountant',
    mobile: '+91 99887 55667',
    email: 'vikram.m@apexerp.com',
    joiningDate: '01 Aug 2026',
    status: 'Probation',
    baseSalary: '₹ 85,000 / mo',
    employmentType: 'Probationary'
  },
  {
    id: 'EMP-1005',
    empCode: 'EMP-1005',
    name: 'Pooja Agarwal',
    initials: 'PA',
    department: 'Procurement & Store',
    designation: 'Store Manager',
    mobile: '+91 98765 11223',
    email: 'pooja.a@apexerp.com',
    joiningDate: '15 Jul 2025',
    status: 'Active',
    baseSalary: '₹ 75,000 / mo',
    employmentType: 'Full-Time Permanent'
  }
];

export const LEAVE_SUMMARY_DATA = [
  { type: 'Casual Leave', used: 56, allocated: 120, pct: 46, color: '#2563eb' },
  { type: 'Sick Leave', used: 24, allocated: 60, pct: 40, color: '#16a34a' },
  { type: 'Privilege Leave', used: 18, allocated: 30, pct: 60, color: '#f59e0b' },
  { type: 'Earned Leave', used: 40, allocated: 100, pct: 40, color: '#06b6d4' }
];

export const UPCOMING_BIRTHDAYS_LIST = [
  { name: 'Rohit Sharma', date: '03 Aug', department: 'HR & Admin', initial: 'RS' },
  { name: 'Anjali Verma', date: '05 Aug', department: 'Engineering', initial: 'AV' },
  { name: 'Kiran Reddy', date: '08 Aug', department: 'Finance', initial: 'KR' }
];

export const UPCOMING_ANNIVERSARIES_LIST = [
  { name: 'Suresh Menon', tenure: '3 Years', date: '10 Aug', department: 'Site Ops' },
  { name: 'Vikram Malhotra', tenure: '5 Years', date: '14 Aug', department: 'Finance' },
  { name: 'Pooja Agarwal', tenure: '1 Year', date: '18 Aug', department: 'Store' }
];

export const HR_QUICK_ACCESS_TILES = [
  {
    id: 'Add Employee',
    title: 'Add Employee',
    description: 'Onboard & register new employee profile',
    icon: 'UserPlus',
    actionText: '+ Add',
    targetSubmodule: 'Employees Directory'
  },
  {
    id: 'Attendance',
    title: 'Attendance & Shifts',
    description: 'Mark daily attendance & biometric logs',
    icon: 'UserCheck',
    actionText: 'Open',
    targetSubmodule: 'Attendance & Shifts'
  },
  {
    id: 'Leave Management',
    title: 'Leave Management',
    description: 'Review, approve & reject leave applications',
    icon: 'Calendar',
    actionText: 'Open',
    targetSubmodule: 'Leave Management'
  },
  {
    id: 'Payroll',
    title: 'Payroll Processing',
    description: 'Process monthly salaries & generate payslips',
    icon: 'IndianRupee',
    actionText: 'Open',
    targetSubmodule: 'Payroll Processing'
  },
  {
    id: 'Performance',
    title: 'Performance Reviews',
    description: 'Conduct appraisal cycles & evaluations',
    icon: 'Award',
    actionText: 'Open',
    targetSubmodule: 'Performance Reviews'
  },
  {
    id: 'Documents',
    title: 'Documents Vault',
    description: 'Upload & store employment contracts & IDs',
    icon: 'FileText',
    actionText: 'Open',
    targetSubmodule: 'Documents Vault'
  }
];

// ----------------------------------------------------------------------
// Reports & Analytics PRD Datasets
// ----------------------------------------------------------------------

export const REPORTS_KPIS = {
  totalRevenue: {
    id: 'totalRevenue',
    title: 'Total Revenue (₹)',
    value: 124500000,
    formattedValue: '₹ 12.45 Cr',
    trend: '↑ 18.6% vs last month',
    trendType: 'positive',
    icon: 'TrendingUp',
    color: '#16a34a',
    targetSubmodule: 'Sales Reports',
    subtext: 'Realized sales revenue'
  },
  totalReceivables: {
    id: 'totalReceivables',
    title: 'Total Receivables (₹)',
    value: 32100000,
    formattedValue: '₹ 3.21 Cr',
    trend: '↑ 12.3% vs last month',
    trendType: 'warning',
    icon: 'AlertCircle',
    color: '#f97316',
    targetSubmodule: 'Finance Reports',
    subtext: 'Pending customer dues'
  },
  totalCollections: {
    id: 'totalCollections',
    title: 'Total Collections (₹)',
    value: 92400000,
    formattedValue: '₹ 9.24 Cr',
    trend: '↑ 15.7% vs last month',
    trendType: 'positive',
    icon: 'IndianRupee',
    color: '#2563eb',
    targetSubmodule: 'Finance Reports',
    subtext: 'Realized bank receipts'
  },
  totalExpenses: {
    id: 'totalExpenses',
    title: 'Total Expenses (₹)',
    value: 23100000,
    formattedValue: '₹ 2.31 Cr',
    trend: '↓ 4.8% vs last month (positive)',
    trendType: 'positive',
    icon: 'Receipt',
    color: '#8b5cf6',
    targetSubmodule: 'Finance Reports',
    subtext: 'Site & vendor payables'
  },
  grossProfit: {
    id: 'grossProfit',
    title: 'Gross Profit (₹)',
    value: 38400000,
    formattedValue: '₹ 3.84 Cr',
    trend: '↑ 21.4% vs last month',
    trendType: 'positive',
    icon: 'PieChart',
    color: '#06b6d4',
    targetSubmodule: 'Finance Reports',
    subtext: 'Gross operating margin'
  }
};

export const REVENUE_TREND_SERIES = {
  '6M': {
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    valuesCr: [8.20, 9.10, 10.40, 11.20, 11.85, 12.45]
  },
  '3M': {
    months: ['Jun', 'Jul', 'Aug'],
    valuesCr: [11.20, 11.85, 12.45]
  },
  '12M': {
    months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    valuesCr: [6.50, 7.10, 7.80, 8.00, 8.10, 8.15, 8.20, 9.10, 10.40, 11.20, 11.85, 12.45]
  }
};

export const SALES_BY_PROJECT_DATA = {
  totalAmount: 124500000,
  formattedTotal: '₹ 12.45 Cr',
  segments: [
    { project: 'Green Heights', amount: '₹ 4.35 Cr', pct: 35, color: '#2563eb' },
    { project: 'Prime Residency', amount: '₹ 3.48 Cr', pct: 28, color: '#16a34a' },
    { project: 'Sunshine Towers', amount: '₹ 2.49 Cr', pct: 20, color: '#f59e0b' },
    { project: 'City Center Plaza', amount: '₹ 1.49 Cr', pct: 12, color: '#8b5cf6' },
    { project: 'Others & Ancillary', amount: '₹ 0.64 Cr', pct: 5, color: '#64748b' }
  ]
};

export const RECEIVABLES_AGING_DATA = {
  totalAmount: 32100000,
  formattedTotal: '₹ 3.21 Cr',
  buckets: [
    { range: '0-30 Days', amount: '₹ 1.44 Cr', pct: 45, color: '#16a34a' },
    { range: '31-60 Days', amount: '₹ 0.80 Cr', pct: 25, color: '#2563eb' },
    { range: '61-90 Days', amount: '₹ 0.48 Cr', pct: 15, color: '#f59e0b' },
    { range: '90+ Days (Overdue)', amount: '₹ 0.48 Cr', pct: 15, color: '#dc2626', urgent: true }
  ]
};

export const POPULAR_REPORTS_LIST = [
  {
    id: 'REP-01',
    name: 'Sales Summary Report',
    category: 'Sales Reports',
    module: 'Sales',
    description: 'Booking performance, inventory realization & revenue summary',
    icon: 'TrendingUp',
    viewCount: 1420
  },
  {
    id: 'REP-02',
    name: 'Receivables Aging Report',
    category: 'Finance Reports',
    module: 'Finance',
    description: 'Customer milestone dues aged 30, 60, 90+ days',
    icon: 'AlertCircle',
    viewCount: 1280
  },
  {
    id: 'REP-03',
    name: 'Collection Report',
    category: 'Finance Reports',
    module: 'Finance',
    description: 'Realized bank receipts & payment mode breakup',
    icon: 'IndianRupee',
    viewCount: 1150
  },
  {
    id: 'REP-04',
    name: 'Income Statement (P&L)',
    category: 'Finance Reports',
    module: 'Finance',
    description: 'Profitability analysis, gross margin & net income',
    icon: 'PieChart',
    viewCount: 980
  },
  {
    id: 'REP-05',
    name: 'Cash Flow Statement',
    category: 'Finance Reports',
    module: 'Finance',
    description: 'Operating cash inflow, outflow & net cash flow',
    icon: 'FileText',
    viewCount: 890
  },
  {
    id: 'REP-06',
    name: 'Inventory Valuation Report',
    category: 'Inventory Reports',
    module: 'Inventory',
    description: 'Material stock valuation, FIFO audit & reorder alert log',
    icon: 'Boxes',
    viewCount: 760
  },
  {
    id: 'REP-07',
    name: 'Operating Expense Breakdown',
    category: 'Finance Reports',
    module: 'Finance',
    description: 'Vendor bills, material cost & admin expense analysis',
    icon: 'Receipt',
    viewCount: 650
  },
  {
    id: 'REP-08',
    name: 'Employee Attendance & Payroll Summary',
    category: 'HR Reports',
    module: 'HR',
    description: 'Headcount distribution, attendance logs & payroll payout summary',
    icon: 'Users',
    viewCount: 540
  }
];

export const RECENT_GENERATED_REPORTS_LIST = [
  {
    id: 'GEN-2026-081',
    name: 'Q2 Financial P&L & Cash Flow Report',
    module: 'Finance',
    generatedBy: 'John Doe (Admin)',
    dateTime: '01 Aug 2026, 10:15 AM',
    format: 'PDF',
    size: '1.8 MB'
  },
  {
    id: 'GEN-2026-080',
    name: 'July Inventory Valuation & FIFO Summary',
    module: 'Inventory',
    generatedBy: 'Pooja Agarwal (Store)',
    dateTime: '31 Jul 2026, 05:45 PM',
    format: 'Excel',
    size: '840 KB'
  },
  {
    id: 'GEN-2026-079',
    name: 'Green Heights Sales Booking Realization',
    module: 'Sales',
    generatedBy: 'Rohit Sharma (HR)',
    dateTime: '30 Jul 2026, 02:30 PM',
    format: 'CSV',
    size: '320 KB'
  },
  {
    id: 'GEN-2026-078',
    name: 'Monthly Employee Payroll Payout Report',
    module: 'HR',
    generatedBy: 'Rohit Sharma (HR)',
    dateTime: '28 Jul 2026, 11:00 AM',
    format: 'PDF',
    size: '2.1 MB'
  },
  {
    id: 'GEN-2026-077',
    name: 'Customer Receivables & Overdue Aging Breakdown',
    module: 'Finance',
    generatedBy: 'John Doe (Admin)',
    dateTime: '26 Jul 2026, 04:15 PM',
    format: 'Excel',
    size: '1.2 MB'
  }
];

// ----------------------------------------------------------------------
// Notifications Centre PRD Datasets
// ----------------------------------------------------------------------

export const NOTIFICATIONS_KPIS = {
  totalNotifications: {
    id: 'totalNotifications',
    title: 'Total Notifications',
    value: 56,
    formattedValue: '56 Total',
    trend: '↑ 18% this week',
    trendType: 'positive',
    icon: 'Bell',
    color: '#2563eb',
    targetSubmodule: 'All Notifications',
    subtext: 'Across all modules'
  },
  unread: {
    id: 'unread',
    title: 'Unread Alerts',
    value: 23,
    formattedValue: '23 Unread',
    trend: 'Pending review',
    trendType: 'warning',
    icon: 'AlertCircle',
    color: '#dc2626',
    targetSubmodule: 'Unread Alerts',
    subtext: 'Requires user attention'
  },
  important: {
    id: 'important',
    title: 'Important / High Priority',
    value: 14,
    formattedValue: '14 High Priority',
    trend: 'Urgent action required',
    trendType: 'danger',
    icon: 'ShieldAlert',
    color: '#f97316',
    targetSubmodule: 'Important',
    subtext: 'High-priority triggers'
  },
  reminders: {
    id: 'reminders',
    title: 'Reminders & Tasks',
    value: 11,
    formattedValue: '11 Reminders',
    trend: 'Due date alerts',
    trendType: 'positive',
    icon: 'Clock',
    color: '#8b5cf6',
    targetSubmodule: 'Reminders',
    subtext: 'Milestones & schedules'
  },
  systemAlerts: {
    id: 'systemAlerts',
    title: 'System Alerts',
    value: 8,
    formattedValue: '8 System Alerts',
    trend: 'Automated events',
    trendType: 'neutral',
    icon: 'Compass',
    color: '#06b6d4',
    targetSubmodule: 'System Alerts',
    subtext: 'Backups & system events'
  }
};

export const UNREAD_BREAKDOWN_DATA = {
  totalUnread: 23,
  breakdown: [
    { priority: 'high', label: 'High Priority', count: 14, color: '#dc2626' },
    { priority: 'medium_reminder', label: 'Reminders', count: 6, color: '#f59e0b' },
    { priority: 'system_alert', label: 'System Alerts', count: 3, color: '#2563eb' }
  ]
};

export const FULL_NOTIFICATIONS_LIST = [
  {
    id: 'ntf-8891',
    title: 'Payment Due Reminder',
    body: 'Invoice INV-2024-125 for ₹ 4,85,000 is due tomorrow for Green Heights.',
    module: 'Finance',
    priority: 'high',
    category: 'reminder',
    is_read: false,
    is_important: true,
    is_snoozed: false,
    dateGroup: 'Today',
    time: '10:30 AM',
    related_record: { type: 'invoice', id: 'INV-2024-125', url: 'finance' },
    amount: '₹ 4,85,000',
    dueDate: 'Tomorrow',
    created_at: '2026-08-01T10:30:00Z'
  },
  {
    id: 'ntf-8892',
    title: 'Material Approval Pending',
    body: 'Requisition #REQ-2026-048 for UltraTech Cement (500 Bags) requires approval.',
    module: 'Inventory',
    priority: 'high',
    category: 'important',
    is_read: false,
    is_important: true,
    is_snoozed: false,
    dateGroup: 'Today',
    time: '09:15 AM',
    related_record: { type: 'requisition', id: 'REQ-2026-048', url: 'inventory' },
    amount: '500 Bags',
    dueDate: 'Today',
    created_at: '2026-08-01T09:15:00Z'
  },
  {
    id: 'ntf-8893',
    title: 'Site Visit Scheduled',
    body: 'New site visit scheduled with customer Rajesh Kumar at Green Heights Tower B.',
    module: 'CRM',
    priority: 'medium',
    category: 'reminder',
    is_read: false,
    is_important: false,
    is_snoozed: false,
    dateGroup: 'Today',
    time: '08:45 AM',
    related_record: { type: 'lead', id: 'LEAD-9012', url: 'crm' },
    amount: 'Site Visit',
    dueDate: '02 Aug 2026',
    created_at: '2026-08-01T08:45:00Z'
  },
  {
    id: 'ntf-8894',
    title: 'Document Expiry Alert',
    body: 'Safety Certificate SC-2024 for Prime Residency expires in 5 days.',
    module: 'Document Management',
    priority: 'high',
    category: 'system_alert',
    is_read: false,
    is_important: true,
    is_snoozed: false,
    dateGroup: 'Yesterday',
    time: '05:20 PM',
    related_record: { type: 'document', id: 'DOC-5012', url: 'doc-mgmt' },
    amount: 'Expiry Alert',
    dueDate: '06 Aug 2026',
    created_at: '2026-07-31T17:20:00Z'
  },
  {
    id: 'ntf-8895',
    title: 'Leave Request Submitted',
    body: 'Suresh Menon submitted a Medical Leave application for 3 days.',
    module: 'HR',
    priority: 'low',
    category: 'reminder',
    is_read: true,
    is_important: false,
    is_snoozed: false,
    dateGroup: 'Yesterday',
    time: '02:10 PM',
    related_record: { type: 'leave', id: 'LR-1003', url: 'hr' },
    amount: '3 Days Leave',
    dueDate: 'Immediate',
    created_at: '2026-07-31T14:10:00Z'
  },
  {
    id: 'ntf-8896',
    title: 'System Backup Completed',
    body: 'Automated nightly database backup completed successfully (Size: 4.2 GB).',
    module: 'System',
    priority: 'low',
    category: 'system_alert',
    is_read: true,
    is_important: false,
    is_snoozed: false,
    dateGroup: 'Earlier',
    time: '28 Jul 2026',
    related_record: { type: 'system', id: 'SYS-BK-991', url: 'settings-audit' },
    amount: '4.2 GB',
    dueDate: 'N/A',
    created_at: '2026-07-28T02:00:00Z'
  }
];

export const NOTIFICATION_PREFERENCES_DATA = {
  channels: {
    email: true,
    sms: false,
    in_app: true,
    reminder_alerts: true,
    system_alerts: true
  },
  quiet_hours: {
    enabled: true,
    start: '22:00',
    end: '07:00',
    timezone: 'Asia/Kolkata'
  },
  digest_mode: {
    enabled: false,
    frequency: 'daily',
    time: '09:00'
  }
};

// ----------------------------------------------------------------------
// User Management & RBAC PRD Datasets
// ----------------------------------------------------------------------

export const USER_MGMT_KPIS = {
  totalUsers: {
    id: 'totalUsers',
    title: 'Total Users',
    value: 128,
    formattedValue: '128 Users',
    trend: '↑ 12% this month',
    trendType: 'positive',
    icon: 'Users',
    color: '#2563eb',
    targetSubmodule: 'Users Directory',
    subtext: 'System user accounts'
  },
  activeUsers: {
    id: 'activeUsers',
    title: 'Active Users',
    value: 96,
    formattedValue: '96 Active',
    trend: '↑ 8% this month',
    trendType: 'positive',
    icon: 'UserCheck',
    color: '#16a34a',
    targetSubmodule: 'Users Directory',
    subtext: 'Active & enabled logins'
  },
  inactiveUsers: {
    id: 'inactiveUsers',
    title: 'Inactive Users',
    value: 18,
    formattedValue: '18 Inactive',
    trend: '↓ 5% this month',
    trendType: 'neutral',
    icon: 'Clock',
    color: '#f59e0b',
    targetSubmodule: 'Users Directory',
    subtext: 'Temporarily disabled'
  },
  lockedUsers: {
    id: 'lockedUsers',
    title: 'Locked Users',
    value: 14,
    formattedValue: '14 Locked',
    trend: '↓ 2% this month',
    trendType: 'danger',
    icon: 'Lock',
    color: '#dc2626',
    targetSubmodule: 'Users Directory',
    subtext: 'Failed attempt lockouts'
  },
  userRoles: {
    id: 'userRoles',
    title: 'Defined User Roles',
    value: 8,
    formattedValue: '8 Defined Roles',
    trend: 'View all roles',
    trendType: 'positive',
    icon: 'ShieldCheck',
    color: '#8b5cf6',
    targetSubmodule: 'Roles & Hierarchy',
    subtext: 'Configured RBAC roles'
  }
};

export const ROLE_DISTRIBUTION_DATA = {
  totalCount: 128,
  segments: [
    { role: 'Admin / Super Admin', count: 2, pct: 8, color: '#dc2626' },
    { role: 'Manager / Dept Head', count: 6, pct: 25, color: '#2563eb' },
    { role: 'Site Engineer', count: 32, pct: 25, color: '#16a34a' },
    { role: 'Accountant', count: 16, pct: 14, color: '#8b5cf6' },
    { role: 'HR Executive', count: 12, pct: 8, color: '#f59e0b' },
    { role: 'Store Incharge', count: 10, pct: 8, color: '#06b6d4' },
    { role: 'Others & Staff', count: 48, pct: 12, color: '#64748b' }
  ]
};

export const USERS_BY_DEPARTMENT_DATA = [
  { department: 'Projects & Site', count: 32, pct: 25, color: '#2563eb' },
  { department: 'Engineering & Arch', count: 28, pct: 22, color: '#16a34a' },
  { department: 'Sales & Marketing', count: 22, pct: 17, color: '#f59e0b' },
  { department: 'IT & Infrastructure', count: 18, pct: 14, color: '#8b5cf6' },
  { department: 'Inventory & Store', count: 16, pct: 12, color: '#06b6d4' },
  { department: 'Finance & Accounts', count: 12, pct: 10, color: '#64748b' }
];

export const FULL_USERS_LIST = [
  {
    id: 'USR-1001',
    name: 'Rohit Sharma',
    initials: 'RS',
    email: 'rohit.sharma@apexerp.com',
    role: 'Admin / Super Admin',
    department: 'IT & Admin',
    status: 'Active',
    lastLogin: '10 mins ago',
    mobile: '+91 98111 22334',
    jobTitle: 'Chief System Administrator'
  },
  {
    id: 'USR-1002',
    name: 'Anjali Verma',
    initials: 'AV',
    email: 'anjali.v@apexerp.com',
    role: 'Site Engineer',
    department: 'Projects & Site',
    status: 'Active',
    lastLogin: '1 hour ago',
    mobile: '+91 98222 33445',
    jobTitle: 'Senior Structural Engineer'
  },
  {
    id: 'USR-1003',
    name: 'Suresh Menon',
    initials: 'SM',
    email: 'suresh.m@apexerp.com',
    role: 'Manager / Dept Head',
    department: 'Projects & Site',
    status: 'Inactive',
    lastLogin: '2 days ago',
    mobile: '+91 97112 44556',
    jobTitle: 'Project Site Manager'
  },
  {
    id: 'USR-1004',
    name: 'Vikram Malhotra',
    initials: 'VM',
    email: 'vikram.m@apexerp.com',
    role: 'Accountant',
    department: 'Finance & Accounts',
    status: 'Locked',
    lastLogin: 'Failed 3x (Locked)',
    mobile: '+91 99887 55667',
    jobTitle: 'Senior Accountant'
  },
  {
    id: 'USR-1005',
    name: 'Pooja Agarwal',
    initials: 'PA',
    email: 'pooja.a@apexerp.com',
    role: 'Store Incharge',
    department: 'Inventory & Store',
    status: 'Active',
    lastLogin: 'Yesterday',
    mobile: '+91 98765 11223',
    jobTitle: 'Central Store Manager'
  }
];

export const RECENT_LOGIN_ACTIVITY_LIST = [
  {
    id: 'LOG-8801',
    user: 'Rohit Sharma',
    email: 'rohit.sharma@apexerp.com',
    role: 'Admin',
    ip: '103.21.124.89',
    location: 'Hyderabad, IN',
    device: 'Chrome 122 (macOS)',
    time: '10 mins ago',
    status: 'Success'
  },
  {
    id: 'LOG-8802',
    user: 'Anjali Verma',
    email: 'anjali.v@apexerp.com',
    role: 'Site Engineer',
    ip: '182.73.19.45',
    location: 'Bengaluru, IN',
    device: 'Safari 17 (iOS Mobile)',
    time: '1 hour ago',
    status: 'Success'
  },
  {
    id: 'LOG-8803',
    user: 'Vikram Malhotra',
    email: 'vikram.m@apexerp.com',
    role: 'Accountant',
    ip: '49.207.18.99',
    location: 'New Delhi, IN',
    device: 'Edge 121 (Windows)',
    time: '3 hours ago',
    status: 'Failed (Locked)'
  }
];

export const ACTIVE_SESSIONS_LIST = [
  {
    sessionId: 'SES-9901',
    user: 'Rohit Sharma (Admin)',
    ip: '103.21.124.89',
    location: 'Hyderabad, IN',
    device: 'Chrome 122 on macOS',
    started: 'Today 09:30 AM',
    lastActive: 'Just now'
  },
  {
    sessionId: 'SES-9902',
    user: 'Anjali Verma (Site Engineer)',
    ip: '182.73.19.45',
    location: 'Bengaluru, IN',
    device: 'Safari 17 on iOS',
    started: 'Today 10:15 AM',
    lastActive: '5 mins ago'
  }
];

export const USER_MGMT_QUICK_ACTIONS = [
  {
    id: 'Add New User',
    title: 'Add New User',
    description: 'Onboard & invite new system user account',
    icon: 'UserPlus',
    actionText: '+ Add',
    targetSubmodule: 'Users Directory'
  },
  {
    id: 'Create Role',
    title: 'Define RBAC Role',
    description: 'Create custom role & permission hierarchy',
    icon: 'ShieldCheck',
    actionText: '+ Create',
    targetSubmodule: 'Roles & Hierarchy'
  },
  {
    id: 'Assign Permissions',
    title: 'Assign Permissions',
    description: 'Configure module & field-level access matrix',
    icon: 'Key',
    actionText: 'Manage',
    targetSubmodule: 'Permission Matrix'
  },
  {
    id: 'User Groups',
    title: 'Manage User Groups',
    description: 'Organize users into functional permission groups',
    icon: 'Users',
    actionText: 'Manage',
    targetSubmodule: 'User Groups'
  },
  {
    id: 'Access Requests',
    title: 'Access Requests',
    description: 'Review & approve pending permission requests',
    icon: 'CheckSquare',
    actionText: 'Review',
    targetSubmodule: 'Access Requests'
  },
  {
    id: 'Login Activity',
    title: 'Login Activity & Audit',
    description: 'Inspect live active sessions & geo IP logs',
    icon: 'Activity',
    actionText: 'View',
    targetSubmodule: 'Login Activity & Audit'
  },
  {
    id: 'Reset Password',
    title: 'Reset Password / Unlock',
    description: 'Search user & send password reset or clear lockout',
    icon: 'Lock',
    actionText: 'Reset',
    targetSubmodule: 'Users Directory'
  }
];

// ----------------------------------------------------------------------
// System Settings & Audit PRD Datasets
// ----------------------------------------------------------------------

export const SETTINGS_KPIS = {
  totalSettings: {
    id: 'totalSettings',
    title: 'Total Settings',
    value: 128,
    formattedValue: '128 Configs',
    trend: 'All configurations',
    trendType: 'positive',
    icon: 'Settings',
    color: '#2563eb',
    targetSubmodule: 'General & Company',
    subtext: 'Configured parameters'
  },
  activeIntegrations: {
    id: 'activeIntegrations',
    title: 'Active Integrations',
    value: 12,
    formattedValue: '12 Connected',
    trend: '12 active APIs',
    trendType: 'positive',
    icon: 'Zap',
    color: '#16a34a',
    targetSubmodule: 'Integrations & Webhooks',
    subtext: 'Email, SMS, Payment & Gateways'
  },
  systemStatus: {
    id: 'systemStatus',
    title: 'System Health Status',
    value: 'Healthy',
    formattedValue: 'Healthy / 100%',
    trend: 'All systems normal',
    trendType: 'positive',
    icon: 'Activity',
    color: '#16a34a',
    targetSubmodule: 'System & Security',
    subtext: 'DB, Queue & Cache Liveness'
  },
  lastBackup: {
    id: 'lastBackup',
    title: 'Last Backup',
    value: '01 Aug 02:30 AM',
    formattedValue: '01 Aug 02:30 AM',
    trend: 'Snapshot completed',
    trendType: 'neutral',
    icon: 'Database',
    color: '#8b5cf6',
    targetSubmodule: 'Backup & Restore',
    subtext: 'Size: 4.2 GB (Automated)'
  },
  systemVersion: {
    id: 'systemVersion',
    title: 'Deployed Version',
    value: 'v2.4.1',
    formattedValue: 'v2.4.1 (Latest)',
    trend: 'Up to date',
    trendType: 'positive',
    icon: 'ShieldCheck',
    color: '#06b6d4',
    targetSubmodule: 'Settings Dashboard',
    subtext: 'Build #2026.08.01'
  }
};

export const SETTINGS_CATEGORIES_DATA = [
  {
    key: 'general',
    name: 'General Settings',
    description: 'System preferences, Language (EN/HI), Date/Time, Units & Appearance',
    settingCount: 18,
    icon: 'Sliders',
    status: 'Active'
  },
  {
    key: 'company',
    name: 'Company Settings',
    description: 'Company Profile, Business Details, GSTIN/PAN, Branding & Addresses',
    settingCount: 14,
    icon: 'Building2',
    status: 'Active'
  },
  {
    key: 'financial',
    name: 'Financial Settings',
    description: 'Base Currency (INR), Tax Rates (GST 18%), Payment Terms & FY Start',
    settingCount: 16,
    icon: 'CreditCard',
    status: 'Active'
  },
  {
    key: 'project',
    name: 'Project Defaults',
    description: 'Custom project status enums, Priority levels, Types & Templates',
    settingCount: 12,
    icon: 'FolderKanban',
    status: 'Active'
  },
  {
    key: 'notification',
    name: 'Notification Baseline',
    description: 'Org-wide baseline notification rules, Quiet hours & Channel defaults',
    settingCount: 15,
    icon: 'Bell',
    status: 'Active'
  },
  {
    key: 'approval',
    name: 'Approval Workflows',
    description: 'Multi-step approval chains (PO > ₹1L), Limits & Delegation rules',
    settingCount: 14,
    icon: 'CheckSquare',
    status: 'Active'
  },
  {
    key: 'system',
    name: 'System & Security',
    description: 'Password policy (8+ chars), Session timeouts, MFA & Retention rules',
    settingCount: 13,
    icon: 'Shield',
    status: 'Active'
  },
  {
    key: 'backup',
    name: 'Backup & Restore',
    description: 'Manual DB snapshots, Scheduled daily backups & Restore verifications',
    settingCount: 11,
    icon: 'Database',
    status: 'Active'
  },
  {
    key: 'integrations',
    name: 'Integrations & Webhooks',
    description: 'Email (SendGrid), SMS (Twilio), Payment (Razorpay) & Outbound Webhooks',
    settingCount: 15,
    icon: 'Zap',
    status: 'Active'
  }
];

export const SETTINGS_CHANGE_HISTORY_LIST = [
  {
    id: 'CHG-9901',
    settingName: 'Tax Configuration (GST Rate)',
    category: 'Financial Settings',
    changedBy: 'Rohit Sharma (Admin)',
    dateTime: '01 Aug 2026, 11:30 AM',
    action: 'Updated',
    oldValue: '18% GST',
    newValue: '18% GST (Standard HSN)'
  },
  {
    id: 'CHG-9902',
    settingName: 'Quiet Hours Baseline',
    category: 'Notification Baseline',
    changedBy: 'Rohit Sharma (Admin)',
    dateTime: '31 Jul 2026, 04:15 PM',
    action: 'Updated',
    oldValue: '23:00 - 06:00',
    newValue: '22:00 - 07:00'
  },
  {
    id: 'CHG-9903',
    settingName: 'Razorpay Payment Gateway API Key',
    category: 'Integrations & Webhooks',
    changedBy: 'John Doe (Admin)',
    dateTime: '30 Jul 2026, 02:00 PM',
    action: 'Updated',
    oldValue: 'rzp_live_••••1102',
    newValue: 'rzp_live_••••9948'
  },
  {
    id: 'CHG-9904',
    settingName: 'Purchase Order Approval Limit',
    category: 'Approval Workflows',
    changedBy: 'Rohit Sharma (Admin)',
    dateTime: '28 Jul 2026, 10:00 AM',
    action: 'Updated',
    oldValue: '₹ 50,000 Auto-Approve',
    newValue: '₹ 1,00,000 Auto-Approve'
  }
];

export const SYSTEM_HEALTH_DIAGNOSTICS_DATA = [
  { component: 'PostgreSQL Database', status: 'Optimal', latency: '4ms', details: 'Connection pool 82/100 active' },
  { component: 'Redis Cache Layer', status: 'Optimal', latency: '1ms', details: 'Cache hit ratio 99.4%' },
  { component: 'BullMQ Async Queue Worker', status: 'Optimal', latency: '12ms', details: '0 jobs failed, 14 pending' },
  { component: 'S3 Storage Quota', status: 'Normal', latency: '45ms', details: '245.6 GB / 500 GB used (49%)' },
  { component: 'SendGrid Email Gateway', status: 'Connected', latency: '120ms', details: 'API key valid, rate limit OK' },
  { component: 'Twilio SMS Gateway', status: 'Connected', latency: '95ms', details: 'Balance ₹ 4,250 available' }
];

export const SYSTEM_INFO_DATA = {
  dbVersion: 'PostgreSQL 16.2 on x86_64',
  serverTime: '01 Aug 2026, 15:58:44 IST',
  timezone: 'Asia/Kolkata (UTC+05:30)',
  storageUsed: '245.6 GB / 500 GB (49%)',
  activeUsersCount: 42,
  deployedBuild: 'Apex Structural ERP v2.4.1-PROD'
};

// ----------------------------------------------------------------------
// Dedicated Audit & Compliance PRD Datasets
// ----------------------------------------------------------------------

export const AUDIT_KPIS = {
  totalActivities: {
    id: 'totalActivities',
    title: 'Total Activities',
    value: 12458,
    formattedValue: '12,458 Events',
    trend: '↑ 18.6% vs last month',
    trendType: 'positive',
    icon: 'Activity',
    color: '#2563eb',
    targetSubmodule: 'All Audit Logs',
    subtext: 'Tamper-evident audit trail'
  },
  successfulLogins: {
    id: 'successfulLogins',
    title: 'Successful Logins',
    value: 2548,
    formattedValue: '2,548 Logins',
    trend: '↑ 12.3% vs last month',
    trendType: 'positive',
    icon: 'UserCheck',
    color: '#16a34a',
    targetSubmodule: 'Login History',
    subtext: 'Verified user authentications'
  },
  failedLogins: {
    id: 'failedLogins',
    title: 'Failed Logins',
    value: 186,
    formattedValue: '186 Failed',
    trend: '↓ 8.4% vs last month',
    trendType: 'positive',
    icon: 'ShieldAlert',
    color: '#f59e0b',
    targetSubmodule: 'Login History',
    subtext: 'Failed attempts & lockouts'
  },
  dataChanges: {
    id: 'dataChanges',
    title: 'Data Record Changes',
    value: 3245,
    formattedValue: '3,245 Changes',
    trend: '↑ 16.1% vs last month',
    trendType: 'positive',
    icon: 'Edit3',
    color: '#8b5cf6',
    targetSubmodule: 'Data Changes Diff',
    subtext: 'Field-level old vs new diffs'
  },
  criticalActions: {
    id: 'criticalActions',
    title: 'Critical Actions',
    value: 320,
    formattedValue: '320 Critical',
    trend: '↓ 5.2% vs last month',
    trendType: 'positive',
    icon: 'AlertOctagon',
    color: '#dc2626',
    targetSubmodule: 'Critical Security Actions',
    subtext: 'High-risk security events'
  }
};

export const ACTIVITIES_BY_MODULE_DATA = {
  totalCount: 12458,
  segments: [
    { module: 'Finance & Accounts', count: 3488, pct: 28, color: '#2563eb' },
    { module: 'Inventory & Store', count: 2741, pct: 22, color: '#16a34a' },
    { module: 'Sales & Bookings', count: 2242, pct: 18, color: '#f59e0b' },
    { module: 'HR & Payroll', count: 1495, pct: 12, color: '#8b5cf6' },
    { module: 'User Management', count: 997, pct: 8, color: '#dc2626' },
    { module: 'Others & System', count: 1495, pct: 12, color: '#64748b' }
  ]
};

export const TOP_USERS_BY_ACTIVITY_DATA = [
  { user: 'Rohit Sharma (Admin)', count: 1245, pct: 10, color: '#2563eb' },
  { user: 'Neha Verma (Finance)', count: 1024, pct: 8, color: '#16a34a' },
  { user: 'Amit Kumar (Inventory)', count: 876, pct: 7, color: '#f59e0b' },
  { user: 'Vikram Singh (Site Eng)', count: 754, pct: 6, color: '#8b5cf6' },
  { user: 'Priya Mehta (HR)', count: 652, pct: 5, color: '#06b6d4' }
];

export const FULL_AUDIT_LOGS_LIST = [
  {
    id: 'AUD-9911',
    timestamp: '01 Aug 2026, 09:58 AM',
    user: 'Amit Kumar (Inventory)',
    userEmail: 'amit.k@apexerp.com',
    action: 'Bulk Delete Inventory Items',
    module: 'Inventory',
    recordType: 'inventory_item',
    recordId: 'INV-BLK-042',
    details: 'Bulk delete of 25 material items in Central Warehouse',
    ipAddress: '182.73.19.45',
    location: 'Bengaluru, IN',
    device: 'Chrome 122 on Windows',
    status: 'Success',
    severity: 'critical',
    category: 'critical_action',
    reviewed: false,
    beforeState: { itemCount: 25, warehouse: 'Central' },
    afterState: { itemCount: 0, status: 'Deleted' }
  },
  {
    id: 'AUD-9905',
    timestamp: '01 Aug 2026, 09:45 AM',
    user: 'Rohit Sharma (Admin)',
    userEmail: 'rohit.sharma@apexerp.com',
    action: 'Change Payment Terms Policy',
    module: 'Finance',
    recordType: 'financial_setting',
    recordId: 'SET-FIN-008',
    details: 'Updated global payment terms from NET 30 to NET 15',
    ipAddress: '103.21.124.89',
    location: 'Hyderabad, IN',
    device: 'Safari 17 on macOS',
    status: 'Success',
    severity: 'high',
    category: 'data_change',
    reviewed: true,
    beforeState: { paymentTerms: 'NET 30' },
    afterState: { paymentTerms: 'NET 15' }
  },
  {
    id: 'AUD-9890',
    timestamp: '01 Aug 2026, 09:30 AM',
    user: 'Rohit Sharma (Admin)',
    userEmail: 'rohit.sharma@apexerp.com',
    action: 'User Role Escalation',
    module: 'User Management',
    recordType: 'user_role',
    recordId: 'USR-1002',
    details: 'Escalated Anjali Verma role from Site Engineer to Manager',
    ipAddress: '103.21.124.89',
    location: 'Hyderabad, IN',
    device: 'Safari 17 on macOS',
    status: 'Success',
    severity: 'critical',
    category: 'access_change',
    reviewed: false,
    beforeState: { role: 'Site Engineer' },
    afterState: { role: 'Manager' }
  },
  {
    id: 'AUD-9884',
    timestamp: '01 Aug 2026, 08:45 AM',
    user: 'Vikram Malhotra',
    userEmail: 'vikram.m@apexerp.com',
    action: 'User Login Attempt (Failed 3x)',
    module: 'Authentication',
    recordType: 'session',
    recordId: 'SES-FAILED-09',
    details: '3 consecutive invalid password attempts -> Account Locked',
    ipAddress: '49.207.18.99',
    location: 'New Delhi, IN',
    device: 'Edge 121 on Windows',
    status: 'Failed',
    severity: 'high',
    category: 'login',
    reviewed: false,
    beforeState: { lockouts: 0 },
    afterState: { lockouts: 3, status: 'Locked' }
  },
  {
    id: 'AUD-9870',
    timestamp: '31 Jul 2026, 05:20 PM',
    user: 'Pooja Agarwal (Store)',
    userEmail: 'pooja.a@apexerp.com',
    action: 'Created Purchase Requisition',
    module: 'Inventory',
    recordType: 'requisition',
    recordId: 'REQ-2026-048',
    details: 'Requested 500 Bags UltraTech Cement for Green Heights',
    ipAddress: '103.21.124.89',
    location: 'Hyderabad, IN',
    device: 'Chrome 122 on Windows',
    status: 'Success',
    severity: 'low',
    category: 'data_change',
    reviewed: true,
    beforeState: null,
    afterState: { id: 'REQ-2026-048', qty: 500 }
  }
];

export const RECENT_CRITICAL_ACTIVITIES = [
  { id: 'AUD-9911', description: 'Bulk delete of 25 records in Inventory', user: 'Amit Kumar', timestamp: '01 Aug 09:58 AM', severity: 'critical' },
  { id: 'AUD-9905', description: 'Change in Payment Terms - From NET 30 to NET 15', user: 'Rohit Sharma', timestamp: '01 Aug 09:45 AM', severity: 'high' },
  { id: 'AUD-9890', description: 'User role changed from Site Engineer to Manager', user: 'Rohit Sharma', timestamp: '01 Aug 09:30 AM', severity: 'critical' }
];






