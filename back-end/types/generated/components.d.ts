import type { Struct, Schema } from '@strapi/strapi';

export interface ProjectsProjects extends Struct.ComponentSchema {
  collectionName: 'components_projects_projects';
  info: {
    displayName: 'Projects';
    icon: 'archive';
    description: '';
  };
  attributes: {
    projectName: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    github_repo: Schema.Attribute.String;
    live_demo: Schema.Attribute.String;
    techStack: Schema.Attribute.Text;
  };
}

export interface ExperienceExperience extends Struct.ComponentSchema {
  collectionName: 'components_experience_experiences';
  info: {
    displayName: 'experience';
    icon: 'star';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String;
    companyName: Schema.Attribute.String;
    city: Schema.Attribute.String;
    state: Schema.Attribute.String;
    startDate: Schema.Attribute.String;
    endDate: Schema.Attribute.String;
    currentlyWorking: Schema.Attribute.Boolean;
    workSummery: Schema.Attribute.RichText;
  };
}

export interface EducationEducation extends Struct.ComponentSchema {
  collectionName: 'components_education_educations';
  info: {
    displayName: 'education';
    icon: 'book';
    description: '';
  };
  attributes: {
    universityName: Schema.Attribute.String;
    degree: Schema.Attribute.String;
    major: Schema.Attribute.String;
    startDate: Schema.Attribute.String;
    endDate: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    currentlyStudy: Schema.Attribute.Boolean;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'projects.projects': ProjectsProjects;
      'experience.experience': ExperienceExperience;
      'education.education': EducationEducation;
    }
  }
}
