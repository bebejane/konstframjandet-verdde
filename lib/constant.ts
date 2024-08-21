export const pageSize = 10;
export const breakpoints = {
  mobile: 320,
  tablet: 740,
  desktop: 980,
  wide: 1600,
  navBreak: 1100
}
export const PROJECT_NAME = 'Verdde'
export const PROJECT_ABBR = 'VD'

export const categories = [{
  id: 'participants',
  title: 'Utövare',
  slug: 'utovare',
  _apiKey: 'participant',
  __typename: 'ParticipantRecord'
}, {
  id: 'programs',
  title: 'Aktivitet',
  slug: 'aktiviteter',
  _apiKey: 'program',
  __typename: 'ProgramRecord'
}, {
  id: 'partners',
  title: 'Samverkan',
  slug: 'samverkan',
  _apiKey: 'partner',
  __typename: 'PartnerRecord'
}]