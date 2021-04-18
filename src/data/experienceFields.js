export default [
  { class: 'jobTitle', label: 'Job Title:' },
  { class: 'company', label: 'Company:' },
  { class: 'startOfEmployment', label: 'Employment start (Format: MM/YYYY):' },
  {
    class: 'endOfEmployment',
    label: 'End of employment (Format: MM/YYYY, can use Present):',
  },
  { class: 'oneLineSummary', label: 'One line sumary:' },
  {
    class: 'responsibilities',
    label: 'Responsibilities/Achievements (3-5 reccomended):',
    multipleInputs: true,
  },
];
