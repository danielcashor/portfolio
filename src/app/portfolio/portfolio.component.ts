import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';

interface Skill {
  name: string;
  level: string;
}

interface SkillCategory {
  frontend: string[];
  backend: string[];
  databases: string[];
  tools: string[];
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, UpperCasePipe],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  scrollY: number = 0;
  activeSection: string = 'home';

  skills: SkillCategory = {
    frontend: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular'],
    backend: ['PHP', 'Laravel', 'Java'],
    databases: ['MySQL'],
    tools: ['Git', 'cPanel', 'Linux', 'Windows']
  };

  sections = ['home', 'about', 'experience', 'skills', 'education', 'contact'];

  ngOnInit(): void {
    this.updateActiveSection();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.updateActiveSection();
  }

  updateActiveSection(): void {
    for (const section of this.sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  getSkillLevel(skill: string): string {
    const levels: { [key: string]: string } = {
      'Angular': '85%',
      'TypeScript': '80%',
      'HTML': '90%',
      'CSS': '90%',
      'JavaScript': '90%',
      'PHP': '85%',
      'Laravel': '75%',
      'Java': '70%',
      'MySQL': '85%'
    };
    return levels[skill] || '75%';
  }

  getAnimationDelay(index: number): string {
    return `${index * 0.1}s`;
  }
}
