
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { ListingCard } from './components/ListingCard';
import { BottomNav } from './components/BottomNav';
import { IslamicPattern } from './components/Pattern';
import { LandingPage } from './components/LandingPage';
import { SAMPLE_DATA } from './constants';
import { Search } from 'lucide-react';

const SUPPORTED_CITIES = ['Chennai', 'Bangalore', 'Hyderabad', 'Mumbai'];

export default function App() {
  // State to control View Mode: 'landing' or 'app'
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('Chennai');

  // Filter Logic
  // useMemo ensures this calculation only runs when variables in the dependency array change.
  const filteredData = useMemo(() => {
    // 1. Filter by City First
    let data = SAMPLE_DATA.filter(item => item.city === selectedCity);

    // 2. Filter by Search Term
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      data = data.filter((item) => 
        item.name.toLowerCase().includes(lowerTerm) ||
        item.area.toLowerCase().includes(lowerTerm) ||
        item.features.some(f => f.toLowerCase().includes(lowerTerm)) ||
        item.specialNotes.toLowerCase().includes(lowerTerm) ||
        (item.zone && item.zone.toLowerCase().includes(lowerTerm))
      );
    }
    
    // 3. Filter by Area Selection
    if (selectedArea) {
      data = data.filter(item => item.area === selectedArea);
    }

    return data;
  }, [searchTerm, selectedArea, selectedCity]); // DEPENDENCY ARRAY: Logic re-runs ONLY if these change.

  // Calculate unique areas available for the CURRENT selected city to populate the dropdown
  const cityAreas = useMemo(() => {
    const citySpots = SAMPLE_DATA.filter(item => item.city === selectedCity);
    const uniqueAreas = Array.from(new Set(citySpots.map(d => d.area))).sort();
    return uniqueAreas;
  }, [selectedCity]);

  // Handle empty state
  const hasResults = filteredData.length > 0;

  // Reset Area when City changes
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedArea(null); // Clear area filter when switching cities
  };

  // --- RENDER LANDING PAGE ---
  if (viewMode === 'landing') {
    return <LandingPage onEnterApp={() => setViewMode('app')} />;
  }

  // --- RENDER MAIN APP ---
  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans relative animate-fade-in">
      {/* Global Background Pattern - Distinct Hexagonal Style - Increased Opacity */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <IslamicPattern opacity={0.06} variant="hexagonal" className="text-primary-dark" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <Hero 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm}
        />
        
        <FilterBar 
          selectedArea={selectedArea}
          onSelectArea={setSelectedArea}
          selectedCity={selectedCity}
          onSelectCity={handleCityChange}
          totalSpots={filteredData.length}
          areas={cityAreas}
        />

        <main className="flex-1 container mx-auto px-4 py-8 max-w-[1440px]">
          {!hasResults ? (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
                {!SUPPORTED_CITIES.includes(selectedCity)
                  ? `No spots in ${selectedCity} yet` 
                  : 'No Sehri spots found'}
              </h3>
              <p className="text-gray-500 max-w-xs mx-auto">
                {!SUPPORTED_CITIES.includes(selectedCity)
                  ? `We are currently live only in Chennai, Bangalore, Hyderabad and Mumbai. Coming soon to ${selectedCity}!` 
                  : "Try adjusting your filters or searching for a different area."}
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedArea(null);
                  if (!SUPPORTED_CITIES.includes(selectedCity)) setSelectedCity('Chennai');
                }}
                className="mt-6 text-primary font-bold hover:underline"
              >
                {!SUPPORTED_CITIES.includes(selectedCity) ? 'Switch to Chennai' : 'Clear All Filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in pb-24">
               {/* Grid View */}
               {filteredData.map(spot => (
                  <ListingCard key={spot.id} data={spot} />
               ))}
            </div>
          )}
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
