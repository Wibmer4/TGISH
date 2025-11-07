import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TraceabilitySearch = () => {
  const [searchType, setSearchType] = useState('patient');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchTypes = [
    { value: 'patient', label: 'Patient ID' },
    { value: 'sterile-pack', label: 'Sterile Pack Lot' },
    { value: 'cycle', label: 'Sterilization Cycle' },
    { value: 'procedure', label: 'Procedure Date' },
    { value: 'equipment', label: 'Equipment ID' }
  ];

  const mockSearchResults = {
    patient: [
      {
        id: 'PAT-2025-001234',
        patientName: 'John Smith',
        procedure: 'Cardiac Bypass Surgery',
        date: '2025-11-06',
        operatingRoom: 'OR-02',
        surgeon: 'Dr. Sarah Smith',
        sterilePacks: ['SP-2025-001234', 'SP-2025-001235'],
        status: 'Complete'
      }
    ],
    'sterile-pack': [
      {
        id: 'SP-2025-001234',
        lotNumber: 'LOT-CS-240156',
        packType: 'Cardiac Surgery Kit',
        sterilizationCycle: 'CYC-2025-0456',
        sterilizationDate: '2025-11-05',
        usedInProcedures: [
          { patientId: 'PAT-2025-001234', procedure: 'Cardiac Bypass', date: '2025-11-06' }
        ],
        status: 'Used'
      }
    ],
    cycle: [
      {
        id: 'CYC-2025-0456',
        autoclave: 'AC-001',
        date: '2025-11-05',
        operator: 'Tech-003',
        temperature: '134°C',
        pressure: '2.1 bar',
        duration: '15 min',
        sterilePacks: ['SP-2025-001234', 'SP-2025-001235', 'SP-2025-001236'],
        affectedPatients: 3,
        status: 'Valid'
      }
    ]
  };

  const handleSearch = () => {
    if (!searchQuery?.trim()) return;
    
    setIsSearching(true);
    setTimeout(() => {
      const results = mockSearchResults?.[searchType] || [];
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setDateRange({ from: '', to: '' });
  };

  const renderSearchResult = (result) => {
    switch (searchType) {
      case 'patient':
        return (
          <div key={result?.id} className="p-4 border border-border rounded-lg bg-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground">{result?.patientName}</h4>
                <p className="text-sm text-muted-foreground">ID: {result?.id}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                result?.status === 'Complete' 
                  ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
              }`}>
                {result?.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Procedure:</span>
                <p className="font-medium">{result?.procedure}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Date:</span>
                <p className="font-medium">{result?.date}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Operating Room:</span>
                <p className="font-medium">{result?.operatingRoom}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Surgeon:</span>
                <p className="font-medium">{result?.surgeon}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <span className="text-sm text-muted-foreground">Sterile Packs Used:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {result?.sterilePacks?.map((pack, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                    {pack}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'sterile-pack':
        return (
          <div key={result?.id} className="p-4 border border-border rounded-lg bg-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground">{result?.packType}</h4>
                <p className="text-sm text-muted-foreground">Lot: {result?.lotNumber}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                result?.status === 'Used' ?'bg-success/10 text-success' 
                  : result?.status === 'Available' ?'bg-primary/10 text-primary' :'bg-error/10 text-error'
              }`}>
                {result?.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
              <div>
                <span className="text-muted-foreground">Sterilization Cycle:</span>
                <p className="font-medium">{result?.sterilizationCycle}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Sterilization Date:</span>
                <p className="font-medium">{result?.sterilizationDate}</p>
              </div>
            </div>
            {result?.usedInProcedures?.length > 0 && (
              <div className="pt-3 border-t border-border">
                <span className="text-sm text-muted-foreground">Used in Procedures:</span>
                <div className="mt-1 space-y-1">
                  {result?.usedInProcedures?.map((proc, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{proc?.patientId}</span> - {proc?.procedure} ({proc?.date})
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'cycle':
        return (
          <div key={result?.id} className="p-4 border border-border rounded-lg bg-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground">Cycle {result?.id}</h4>
                <p className="text-sm text-muted-foreground">Autoclave: {result?.autoclave}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                result?.status === 'Valid' ?'bg-success/10 text-success' :'bg-error/10 text-error'
              }`}>
                {result?.status}
              </span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
              <div>
                <span className="text-muted-foreground">Date:</span>
                <p className="font-medium">{result?.date}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Operator:</span>
                <p className="font-medium">{result?.operator}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Temperature:</span>
                <p className="font-medium">{result?.temperature}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Duration:</span>
                <p className="font-medium">{result?.duration}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Sterile Packs: {result?.sterilePacks?.length}
                </span>
                <span className="text-muted-foreground">
                  Affected Patients: {result?.affectedPatients}
                </span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Search" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Traceability Search</h3>
            <p className="text-sm text-muted-foreground">Search and trace sterilization records</p>
          </div>
        </div>
      </div>
      {/* Search Interface */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Search Type"
            options={searchTypes}
            value={searchType}
            onChange={setSearchType}
          />
          
          <Input
            label="Search Query"
            type="text"
            placeholder={`Enter ${searchTypes?.find(t => t?.value === searchType)?.label?.toLowerCase()}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
          />
          
          <div className="flex items-end">
            <Button
              variant="default"
              iconName="Search"
              iconPosition="left"
              onClick={handleSearch}
              loading={isSearching}
              disabled={!searchQuery?.trim()}
              fullWidth
            >
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="From Date"
            type="date"
            value={dateRange?.from}
            onChange={(e) => setDateRange(prev => ({ ...prev, from: e?.target?.value }))}
          />
          <Input
            label="To Date"
            type="date"
            value={dateRange?.to}
            onChange={(e) => setDateRange(prev => ({ ...prev, to: e?.target?.value }))}
          />
        </div>
      </div>
      {/* Search Results */}
      {searchResults?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">
              Search Results ({searchResults?.length})
            </h4>
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={handleClearSearch}
            >
              Clear
            </Button>
          </div>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {searchResults?.map(renderSearchResult)}
          </div>
        </div>
      )}
      {/* No Results */}
      {searchResults?.length === 0 && searchQuery && !isSearching && (
        <div className="text-center py-8">
          <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default TraceabilitySearch;