// Generate endpoints
const generateEndpoints = (
  parent: string,
  endpoints: Record<string, string | Record<string, any>>,
): Record<string, string | Record<string, any>> => {
  const generatedEndpoints: Record<string, string | Record<string, any>> = {}
  Object.keys(endpoints).forEach(key => {
    if (typeof endpoints[key] === 'string') {
      generatedEndpoints[key] = `${parent}/${endpoints[key]}`
    } else if (typeof endpoints[key] === 'object') {
      generatedEndpoints[key] = generateEndpoints(
        `${parent}/${key}`,
        endpoints[key],
      )
    }
  })
  return generatedEndpoints
}

export const ENDPOINTS = {
  CATALOGS: generateEndpoints('catalogs', {
    ACTIVITY_TYPE: 'activity-type',
    BUYER_INFLUENCE: 'buyer-influence',
    CASE_TYPE: 'case-type',
    CHANNEL: 'channel',
    CALL_TYPE: 'call-type',
    CLIENT_CATEGORY: 'client-category',
    CLIENT_SUB_CATEGORY: 'client-sub-category',
    CN_RANGE: 'cn-range',
    COMPANY_CATEGORY: 'company-category',
    COMPANY_SECTOR: 'company-sector',
    COMPANY_TYPE: 'company-type',
    COUNTRY: 'country',
    HONORIFICS: 'honorifics',
    HOTEL: 'hotel',
    OPPORTUNITY_AREA: 'opportunity-area',
    PERSON_TYPE: 'person-type',
    POSITION_VS_COMPETITION: 'position-vs-competition',
    POSITION: 'position',
    PRIORITY: 'priority',
    PROSPECT_SRC: 'prospect-source',
    REGION: 'region',
    SEGMENT: 'segment',
    STRENGTH: 'strength',
    SUB_SEGMENT: 'sub-segment',
    SUBSEGMENT: 'sub-segment',
    USERS: 'users',
    CANCEL_REASON: 'cancel-reason',
  }),
  CATALOGS_FOR_INPUTS: generateEndpoints('catalogs', {
    ACTIVITY_TYPE: 'activity-type-catalog',
    BUYER_INFLUENCE: 'buyer-influence-catalog',
    CALL_TYPE: 'call-type-catalog',
    CASE_TYPE: 'case-type-catalog',
    CHANNEL: 'channel-catalog',
    CLIENT_CATEGORY: 'client-category-catalog',
    CLIENT_SUB_CATEGORY: 'client-sub-category-catalog',
    CN_RANGE: 'cn-range-catalog',
    COMPANY_CATEGORY: 'company-category-catalog',
    COMPANY_SECTOR: 'company-sector-catalog',
    COMPANY_TYPE: 'company-type-catalog',
    COUNTRY: 'country-catalog',
    HONORIFICS: 'honorifics-catalog',
    HOTEL: 'hotel-catalog',
    OPPORTUNITY_AREA: 'opportunity-area-catalog',
    PERSON_TYPE: 'person-type-catalog',
    POSITION_VS_COMPETITION: 'position-vs-competition-catalog',
    POSITION: 'position-catalog',
    PRIORITY: 'priority-catalog',
    PROSPECT_SRC: 'prospect-source-catalog',
    REGION: 'region-catalog',
    SEGMENT: 'segment-catalog',
    STRENGTH: 'strength-catalog',
    SUB_SEGMENT: 'sub-segment-catalog',
    SUBSEGMENT: 'sub-segment-catalog',
    USERS: 'users-catalog',
    EXECUTIVE: 'executive-catalog',
    CANCEL_REASON: 'cancel-reason-catalog',

    EXECUTIVE_BY_PERMISSION_LAZY: 'excetuve-by-permission-lazy',
  }),
  PROFILES: generateEndpoints('profiles', {
    ASSIGN_HOTEL_USER: 'assign-hotel-user',
    ASSIGN_REGION_USER: 'assign-region-user',
    ASSING_CATALOG_PERMISSION: 'assign-catalog-permission',
    ASSING_PERMISSION: 'assing-permission',
    ENTITY: 'entity',
    PERMISSIONS: 'permission',
    ROLES: 'roles',
    USERS: 'users',
    USER_PERMISSIONS: 'user-permissions',
    USER_PERMISSION: 'user-permission',
  }),
  PROSPECTION: generateEndpoints('prospection', {
    PROSPECT_ACTIVITIES_CONTACTS: 'prospect-activity-contact',
    PROSPECT_ACTIVITIES: 'prospect-activity',
    PROSPECT_CONTACT: 'prospect-contact',
    PROSPECT_CONTACTS: 'prospects-contacts',
    PROSPECT_OPPORTUNITY_AREA: 'prospect-opportunity-area',
    PROSPECT_STRENGTH: 'prospect-strength',
    PROSPECTS_CONTACTS: 'prospects-contacts',
    PROSPECTS_EXCLUDING_CLIENTS: 'prospects-excluding-clients',
    PROSPECTS_HOTELS: 'prospects-hotels',
    PROSPECTS: 'prospects',
    PROSPECTS_ACTIVITIES: 'prospect-activities',
    PROSPECT_CONTACT_LAZY: 'prospect-contact-lazy',
  }),
  RATE: generateEndpoints('rates', {
    RATE: 'rate',
    RATE_CATALOG: 'rate-catalog',
    RATE_REQUEST: 'rate-request',
    CLIENT_RATE: 'client-rates',
    CLIENT_RATE_CATALOG: 'client-rates-catalog',
  }),
  CLIENTS: generateEndpoints('clients', {
    CLIENT: 'client',
    CLIENT_REPORT: 'client-report',
    COLUMN_DEFS: 'client-column-defs',
    CLIENT_VIEWS_ADMIN: 'client-view-admin',
    CLIENT_VIEW_CATALOG: 'client-view-catalog',
    CLIENT_VIEW: 'client-view',
    CLIENT_VIEW_SHARE: 'shared-client-view',
    PERMISSIONS_VIEW: 'client-view-permissions',
    BOOKING_HISTORY: 'booking-history',
    CLIENT_LAZY: 'clients-lazy',
    CLIENT_LAZY_FULL: 'clients-lazy-full',
  }),
  CUSTOMER_SERVICE: generateEndpoints('customer-service', {
    CASE: 'customer-service',
    NOTE: 'customer-service-note',
    REPORT: 'customer-service-report',
  }),
  CONNECTION: generateEndpoints('connections', {
    BOOKING_HISTORY: 'booking-history',
  }),
  CONTROL_PANEL: generateEndpoints('controlPanel', {
    TENANT: 'tenant',
    VERSION: 'version',
  }),
  // MASSIVE_LOAD: generateEndpoints('massive-load', {
  MASSIVE_LOAD: generateEndpoints('carga-masiva', {
    EXCEL: 'excel',
    // Ejemplo  /carga-masiva/download-file?key=1723583896417_Privacy-Policy-Free-Template_PDF-2.pdf
    DOWNLOAD: 'download-file',
    UPLOAD_FILE: 'upload-file',
    CLIENT_VIEW: 'client-view',
  }),
  REPORT: generateEndpoints('carga-masiva', {
    AGREEMENT: 'report-agreement',
    ACTIVITY: 'report-activity',
    LEADS: 'report-leads',
    NIGHT_ROOMS: 'report-night-rooms',
    CASES: 'report-cases',
    PRODUCTIVITY_CASES: 'report-productivity-cases',
    PRODUCTIVITY_TIME: 'report-productivity-time',
  }),

  REPORT_KPI: generateEndpoints('dashboard-op', {
    EARNED_LEADS: 'earned-leads',
    CN_BY_CONCEPT: 'cn-by-concept',
    BATTING_PERCENTAGE: 'batting-percentage',
    COMPANIES_WITHOUT_ANNUAL_CN: 'companies-without-annual-cn',
    COMPANIES_WITH_THE_MOST_ANNUAL_CN: 'companies-with-the-most-annual-cn',
    COMPANIES_QUARTERLY_CN: 'companies-quarterly-cn',
    AVERAGE_CN_BY_AGREEMENT: 'average-cn-by-agreement',
    CUSTOMER_SERVICE: 'customer-service',
  }),
  CAMPAIGN: generateEndpoints('campaign', {
    CAMPAIGN_TYPE_CATALOG: 'campaign-type-catalog',
    CAMPAIGN: 'campaign',
    CAMPAIGN_REPORT: 'campaign-report',
    CALENDAR_CAMPAIGN: 'calendar-campaign',
    CONTACT: 'contact',
  }),
}
