import { Component } from '@angular/core';

import { PROJECTS_SLIDES } from '../main/components/main-projects/constants/projects.const';

@Component({
  selector: 'visla-projects',
  imports: [],
  templateUrl: './projects-component.html',
  styleUrl: './projects-component.scss',
})
export class ProjectsComponent {
  protected readonly slides = PROJECTS_SLIDES;
}
