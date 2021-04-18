import React, { Component } from 'react';

export default class CvPreview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { personalInfo, education, experience } = this.props.values;
    const {
      firstName,
      lastName,
      address,
      phoneNumber,
      email,
      professionalSummary,
      professionalWebsites,
    } = personalInfo[0];

    let professionalWebsitesElements = professionalWebsites.map(
      (website, i) => {
        let lastDot;
        for (let i = website.length - 1; i >= 0; i--)
          if (website[i] == '.') {
            lastDot = i;
            i = 0;
          }

        let websiteShredded = website.slice(
          Math.max(
            0,
            website.indexOf('http://') == -1 ? -1 : 7,
            website.indexOf('https://') == -1 ? -1 : 8
          ),
          lastDot
        );

        websiteShredded =
          websiteShredded.slice(0, 1).toUpperCase() + websiteShredded.slice(1);

        return (
          <li key={i}>
            <a
              href={
                website.indexOf('http') == 0 ? website : 'https://' + website
              }
            >
              {websiteShredded}
            </a>
          </li>
        );
      }
    );

    let educationElements = education.map((education, i) => {
      return (
        <div key={i} className='singularEducation'>
          <p className='schoolName'>{education.school}</p>
          <p className='date'>
            {education.startOfEducation
              ? education.startOfEducation + ' - ' + education.endOfEducation
              : undefined}
          </p>
          <p className='degree'>{education.degree}</p>
          <p className='fieldOfStudy'>{education.fieldOfStudy}</p>
        </div>
      );
    });

    let experienceElements = experience.map((experience, i) => {
      const responsibilities = experience.responsibilities.map(
        (responsibility, i) => (
          <li key={i} className='responsibility'>
            {responsibility}
          </li>
        )
      );

      return (
        <div key={i} className='singularExperience'>
          <p className='jobTitle'>{experience.jobTitle}</p>
          <p className='company'>{experience.company}</p>
          <p className='datesOfEmployment'>
            {experience.startOfEmployment
              ? experience.startOfEmployment +
                ' - ' +
                experience.endOfEmployment
              : undefined}
          </p>
          <p className='oneLineSummary'>{experience.oneLineSummary}</p>
          <ul className='responsibilities'>{responsibilities}</ul>
        </div>
      );
    });

    return (
      <div className='cvPreview' ref={this.props.refForPrinting}>
        <div className='container'>
          <p
            className='name'
            key={firstName + lastName}
          >{`${firstName} ${lastName}`}</p>
          <div className='professionalSummaryPreview'>
            <p>{professionalSummary}</p>
          </div>
          <div className='contactInfoPreview'>
            <a className='emailPreview' href={'mailto:' + email}>
              {email}
            </a>
            <p className='phoneNumberPreview'>{phoneNumber}</p>
            <p className='addressPreview'>{address}</p>
            {professionalWebsites.length > 0 &&
            professionalWebsites[0] != '' ? (
              <ul className='professionalWebsitesPreview'>
                {professionalWebsitesElements}
              </ul>
            ) : undefined}
          </div>
          <div className='educationPreview'>
            <p className='educationName'>
              {educationElements.length > 0 ? 'Education' : ''}
            </p>
            {educationElements}
          </div>
          <div className='workExperiencePreview'>
            <p className='experienceName'>
              {experienceElements.length > 0 ? 'Work Experience' : ''}
            </p>
            {experienceElements}
          </div>
        </div>
      </div>
    );
  }
}
