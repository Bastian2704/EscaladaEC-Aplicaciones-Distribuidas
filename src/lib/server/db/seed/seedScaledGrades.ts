import { db } from '$lib/server/db';
import { climbingLevelNoRope, climbingLevelSport, climbingLevelTrad } from '$lib/server/db/schema';

export async function seedScaledGrades() {

  await db.insert(climbingLevelSport).values([
    { scaledValue: 1,  frenchValue: '1',       ydsValue: '2nd class' },
    { scaledValue: 2,  frenchValue: '2',       ydsValue: '3rd class' },
    { scaledValue: 3,  frenchValue: '3',       ydsValue: '4th class' },
    { scaledValue: 4,  frenchValue: '4a',      ydsValue: '5.0-5.4' },
    { scaledValue: 5,  frenchValue: '4b',      ydsValue: '5.5' },
    { scaledValue: 6,  frenchValue: '4c',      ydsValue: '5.6' },
    { scaledValue: 7,  frenchValue: '5a',      ydsValue: '5.7' },
    { scaledValue: 8,  frenchValue: '5b',      ydsValue: '5.8' },
    { scaledValue: 9,  frenchValue: '5c',      ydsValue: '5.9' },
    { scaledValue: 10, frenchValue: '6a',      ydsValue: '5.10a' },
    { scaledValue: 11, frenchValue: '6a+',     ydsValue: '5.10b' },
    { scaledValue: 12, frenchValue: '6b',      ydsValue: '5.10c' },
    { scaledValue: 13, frenchValue: '6b+',     ydsValue: '5.10d' },
    { scaledValue: 14, frenchValue: '6c',      ydsValue: '5.11a' },
    { scaledValue: 15, frenchValue: '6c/c+',   ydsValue: '5.11b' },
    { scaledValue: 16, frenchValue: '6c+',     ydsValue: '5.11c' },
    { scaledValue: 17, frenchValue: '7a',      ydsValue: '5.11d' },
    { scaledValue: 18, frenchValue: '7a+',     ydsValue: '5.12a' },
    { scaledValue: 19, frenchValue: '7b',      ydsValue: '5.12b' },
    { scaledValue: 20, frenchValue: '7b+',     ydsValue: '5.12c' },
    { scaledValue: 21, frenchValue: '7c',      ydsValue: '5.12d' },
    { scaledValue: 22, frenchValue: '7c+',     ydsValue: '5.13a' },
    { scaledValue: 23, frenchValue: '8a',      ydsValue: '5.13b' },
    { scaledValue: 24, frenchValue: '8a+',     ydsValue: '5.13c' },
    { scaledValue: 25, frenchValue: '8b',      ydsValue: '5.13d' },
    { scaledValue: 26, frenchValue: '8b+',     ydsValue: '5.14a' },
    { scaledValue: 27, frenchValue: '8c',      ydsValue: '5.14b' },
    { scaledValue: 28, frenchValue: '8c+',     ydsValue: '5.14c' },
    { scaledValue: 29, frenchValue: '9a',      ydsValue: '5.14d' },
    { scaledValue: 30, frenchValue: '9a+',     ydsValue: '5.15a' },
    { scaledValue: 31, frenchValue: '9b',      ydsValue: '5.15b' },
    { scaledValue: 32, frenchValue: '9b+',     ydsValue: '5.15c' },
    { scaledValue: 33, frenchValue: '9c',      ydsValue: '5.15d' },
  ]);

    await db.insert(climbingLevelNoRope).values([
    { scaledValue: 1,  vScale: 'V1',    fontainebleau: '5' },
    { scaledValue: 2,  vScale: 'V2',    fontainebleau: '5+' },
    { scaledValue: 3,  vScale: 'V3',    fontainebleau: '6A' },
    { scaledValue: 4,  vScale: 'V3/4',  fontainebleau: '6A+' },
    { scaledValue: 5,  vScale: 'V4',    fontainebleau: '6B' },
    { scaledValue: 6,  vScale: 'V4/5',  fontainebleau: '6B+' },
    { scaledValue: 7,  vScale: 'V5',    fontainebleau: '6C' },
    { scaledValue: 8,  vScale: 'V5/6',  fontainebleau: '6C+' },
    { scaledValue: 9,  vScale: 'V6',    fontainebleau: '7A' },
    { scaledValue: 10, vScale: 'V7',    fontainebleau: '7A+' },
    { scaledValue: 11, vScale: 'V8',    fontainebleau: '7B' },
    { scaledValue: 12, vScale: 'V8/9',  fontainebleau: '7B+' },
    { scaledValue: 13, vScale: 'V9',    fontainebleau: '7C' },
    { scaledValue: 14, vScale: 'V10',   fontainebleau: '7C+' },
    { scaledValue: 15, vScale: 'V11',   fontainebleau: '8A' },
    { scaledValue: 16, vScale: 'V12',   fontainebleau: '8A+' },
    { scaledValue: 17, vScale: 'V13',   fontainebleau: '8B' },
    { scaledValue: 18, vScale: 'V14',   fontainebleau: '8B+' },
    { scaledValue: 19, vScale: 'V15',   fontainebleau: '8C' },
    { scaledValue: 20, vScale: 'V16',   fontainebleau: '8C+' },
    { scaledValue: 21, vScale: 'V17',   fontainebleau: '9A' }
  ]);

  await db.insert(climbingLevelTrad).values([
    { scaledValue: 1,  british: 'Mod' },
    { scaledValue: 2,  british: 'Diff' },
    { scaledValue: 3,  british: 'VDiff' },
    { scaledValue: 4,  british: 'HVD' },
    { scaledValue: 5,  british: 'Sev' },
    { scaledValue: 6,  british: 'HS' },
    { scaledValue: 7,  british: 'VS' },
    { scaledValue: 8,  british: 'HVS' },
    { scaledValue: 9,  british: 'E1 5a' },
    { scaledValue: 10, british: 'E2 5b' },
    { scaledValue: 11, british: 'E3 5c' },
    { scaledValue: 12, british: 'E4 6a' },
    { scaledValue: 13, british: 'E5 6b' },
    { scaledValue: 14, british: 'E6 6b' },
    { scaledValue: 15, british: 'E7 6c' },
    { scaledValue: 16, british: 'E8 6c' },
    { scaledValue: 17, british: 'E9 7a' },
    { scaledValue: 18, british: 'E10 7b' },
    { scaledValue: 19, british: 'E11 7c' }
  ]);
}
seedScaledGrades();