import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
        title: 'SpaceX API - Home'
    },
    {
        path: 'crew',
        loadComponent: () => import('./pages/crew/crew.component').then(c => c.CrewComponent),
        title: 'SpaceX API - Crew'
    },
    {
        path: 'rockets',
        loadComponent: () => import('./pages/rockets/rockets.component').then(c => c.RocketsComponent),
        title: 'SpaceX API - Rockets'
    },
    {
        path: 'launchpads',
        loadComponent: () => import('./pages/launchpads/launchpads.component').then(c => c.LaunchpadsComponent),
        title: 'SpaceX API - Launch pads',
    },
    {
        path: 'launchpad/:id',
        loadComponent: () => import('./pages/launchpads/launchpad/launchpad.component').then(c => c.LaunchpadComponent),
        title: 'SpaceX API - Launch pad',
    },
    {
        path: 'landpads',
        loadComponent: () => import('./pages/landpads/landpads.component').then(c => c.LandpadsComponent),
        title: 'SpaceX API - Land pads'
    },
    {
        path: 'launches',
        loadComponent: () => import('./pages/launches/launches.component').then(c => c.LaunchesComponent),
        title: 'SpaceX API - Launches'
    },
    { path: '**', redirectTo: 'home' }
];
