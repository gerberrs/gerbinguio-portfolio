import type { Place } from '../types'

/**
 * Sample Metro Manila places, used when Nominatim is unreachable or
 * VITE_USE_MOCK_PLACES=true. Coordinates are approximate.
 */
export const MOCK_PLACES: Place[] = [
  { id: 'mock:1', name: 'Rizal Park', address: 'Ermita, Manila', category: 'park', lat: 14.5831, lon: 120.9794 },
  { id: 'mock:2', name: 'Fort Santiago', address: 'Intramuros, Manila', category: 'museum', lat: 14.595, lon: 120.9703 },
  { id: 'mock:3', name: 'National Museum of Fine Arts', address: 'Padre Burgos Ave, Manila', category: 'museum', lat: 14.5869, lon: 120.9812 },
  { id: 'mock:4', name: 'Manila Ocean Park', address: 'Ermita, Manila', category: 'activity', lat: 14.5794, lon: 120.9725 },
  { id: 'mock:5', name: 'Binondo Food Crawl', address: 'Ongpin St, Binondo, Manila', category: 'restaurant', lat: 14.6, lon: 120.974 },
  { id: 'mock:6', name: 'Ayala Triangle Gardens', address: 'Ayala Ave, Makati', category: 'park', lat: 14.5571, lon: 121.0244 },
  { id: 'mock:7', name: 'Greenbelt', address: 'Ayala Center, Makati', category: 'mall', lat: 14.5524, lon: 121.0213 },
  { id: 'mock:8', name: 'Ayala Museum', address: 'Makati Ave, Makati', category: 'museum', lat: 14.5534, lon: 121.0236 },
  { id: 'mock:9', name: 'Legazpi Sunday Market', address: 'Legazpi Village, Makati', category: 'restaurant', lat: 14.5545, lon: 121.0167 },
  { id: 'mock:10', name: 'Salcedo Saturday Market', address: 'Salcedo Village, Makati', category: 'restaurant', lat: 14.5603, lon: 121.0237 },
  { id: 'mock:11', name: 'Poblacion Bar Strip', address: 'Poblacion, Makati', category: 'bar', lat: 14.565, lon: 121.03 },
  { id: 'mock:12', name: 'Yardstick Coffee', address: 'Legazpi Village, Makati', category: 'cafe', lat: 14.556, lon: 121.017 },
  { id: 'mock:13', name: 'Toby’s Estate Salcedo', address: 'Salcedo Village, Makati', category: 'cafe', lat: 14.5605, lon: 121.0225 },
  { id: 'mock:14', name: 'The Curator Coffee and Cocktails', address: 'Legazpi Village, Makati', category: 'bar', lat: 14.5555, lon: 121.016 },
  { id: 'mock:15', name: 'Power Plant Mall', address: 'Rockwell, Makati', category: 'mall', lat: 14.565, lon: 121.0365 },
  { id: 'mock:16', name: 'Bonifacio High Street', address: 'BGC, Taguig', category: 'mall', lat: 14.5508, lon: 121.0509 },
  { id: 'mock:17', name: 'The Mind Museum', address: 'BGC, Taguig', category: 'museum', lat: 14.553, lon: 121.0469 },
  { id: 'mock:18', name: 'Burgos Circle', address: 'Forbestown, BGC, Taguig', category: 'park', lat: 14.5536, lon: 121.0441 },
  { id: 'mock:19', name: 'Wildflour Cafe + Bakery', address: 'BGC, Taguig', category: 'dessert', lat: 14.551, lon: 121.0485 },
  { id: 'mock:20', name: 'Venice Grand Canal Mall', address: 'McKinley Hill, Taguig', category: 'mall', lat: 14.5355, lon: 121.051 },
  { id: 'mock:21', name: 'SM Mall of Asia', address: 'Pasay', category: 'mall', lat: 14.5352, lon: 120.9822 },
  { id: 'mock:22', name: 'MOA Seaside Boulevard', address: 'Manila Bay, Pasay', category: 'park', lat: 14.5367, lon: 120.979 },
  { id: 'mock:23', name: 'Maginhawa Food Strip', address: 'Teachers Village, Quezon City', category: 'restaurant', lat: 14.644, lon: 121.059 },
  { id: 'mock:24', name: 'UP Diliman Academic Oval', address: 'Diliman, Quezon City', category: 'park', lat: 14.6538, lon: 121.0685 },
  { id: 'mock:25', name: 'Quezon Memorial Circle', address: 'Diliman, Quezon City', category: 'park', lat: 14.6514, lon: 121.0494 },
  { id: 'mock:26', name: 'Kapitolyo Food Strip', address: 'Kapitolyo, Pasig', category: 'restaurant', lat: 14.5703, lon: 121.0606 },
  { id: 'mock:27', name: 'Estancia Mall', address: 'Capitol Commons, Pasig', category: 'mall', lat: 14.577, lon: 121.063 },
  { id: 'mock:28', name: 'Greenhills Shopping Center', address: 'San Juan', category: 'mall', lat: 14.602, lon: 121.049 },
  { id: 'mock:29', name: 'Cinema at Greenbelt 3', address: 'Ayala Center, Makati', category: 'activity', lat: 14.5517, lon: 121.0221 },
  { id: 'mock:30', name: 'Ice cream at Rockwell', address: 'Rockwell, Makati', category: 'dessert', lat: 14.5646, lon: 121.036 },
]
