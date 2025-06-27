export interface SportModule {
  id: string;
  name: string;
  playersTable: string;
  coachesTable: string;
  facilitiesTable: string;
}

export const sportsConfig: SportModule[] = [
  {
    id: 'football',
    name: 'football',
    playersTable: 'football_players',
    coachesTable: 'football_coaches',
    facilitiesTable: 'fields'
  },
  {
    id: 'swimming',
    name: 'swimming',
    playersTable: 'swimmers',
    coachesTable: 'swimming_coaches',
    facilitiesTable: 'pools'
  }
];
