export default [
  { class: 'firstName', label: 'First Name' },
  { class: 'lastName', label: 'Last Name' },
  { class: 'phoneNumber', label: 'Phone Number:', type: 'tel' },
  { class: 'email', label: 'Email Address:', type: 'email' },
  { class: 'address', label: 'Physical Address:' },
  {
    class: 'professionalSummary',
    label: 'Professional Summary:',
  },
  {
    class: 'professionalWebsites',
    label: 'Professional Websites (can leave blank):',
    multipleInputs: true,
  },
];
