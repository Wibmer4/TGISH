import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const mockCycles = [
  { id: 'CY-001', status: 'failed', reason: 'Temperature deviation', equipment: 'AC-001', operator: 'OP-003' },
  { id: 'CY-002', status: 'validated', reason: null, equipment: 'AC-002', operator: 'OP-001' }
];

const mockPatientMap = [
  { patientId: 'PAT-001', batchId: 'BATCH-001', service: 'OR-1' },
  { patientId: 'PAT-002', batchId: 'BATCH-003', service: 'ICU' }
];

const ComplianceReporting = () => {
  const [kpis] = useState({ successRate: 99.2, nonConformities: 3, expiredRate: 0.4, downtimeHours: 12 });
  const [nonValidated, setNonValidated] = useState(mockCycles.filter(c => c.status !== 'validated'));
  const [patientSearch, setPatientSearch] = useState('');
  const [batchSearch, setBatchSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleGenerateReport = ({ type, query }) => {
    // simple search behavior
    if (type === 'ascending') {
      const res = mockPatientMap.filter(p => p.patientId === query || p.batchId === query);
      setSearchResults(res);
    } else {
      // descending: find affected patients by batch
      const res = mockPatientMap.filter(p => p.batchId === query || p.patientId === query);
      setSearchResults(res);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
                <Icon name="ShieldCheck" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Reporting & Conformité</h1>
                <p className="text-muted-foreground">Rapports réglementaires et outils de traçabilité</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-medium">Taux de réussite</h4>
              <div className="text-3xl font-bold text-foreground">{kpis.successRate}%</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-medium">Non-conformités</h4>
              <div className="text-3xl font-bold text-foreground">{kpis.nonConformities}</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-medium">Downtime (hrs)</h4>
              <div className="text-3xl font-bold text-foreground">{kpis.downtimeHours}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Report 1: Non-Validated Cycles</h3>
              <div className="space-y-3 text-sm">
                {nonValidated?.map(c => (
                  <div key={c.id} className="p-3 border rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-medium">{c.id}</div>
                      <div className="text-xs text-muted-foreground">{c.reason} • {c.equipment} • {c.operator}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => alert('Viewing cycle ' + c.id)}>View</Button>
                      <Button size="sm" variant="ghost" onClick={() => alert('Download log for ' + c.id)}>Download</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Report 2: Matériovigilance</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input className="p-2 border rounded" placeholder="Patient ID" value={patientSearch} onChange={(e) => setPatientSearch(e.target.value)} />
                  <button className="p-2 bg-primary text-white rounded" onClick={() => handleGenerateReport({ type: 'ascending', query: patientSearch })}>Générer Rapport</button>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input className="p-2 border rounded" placeholder="Batch ID" value={batchSearch} onChange={(e) => setBatchSearch(e.target.value)} />
                  <button className="p-2 bg-primary text-white rounded" onClick={() => handleGenerateReport({ type: 'descending', query: batchSearch })}>Générer Rapport</button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <div>Résultats de recherche:</div>
                  {searchResults?.length === 0 && <div>Aucun résultat</div>}
                  {searchResults?.map(r => (
                    <div key={r.patientId} className="py-2 border-b last:border-b-0">
                      <div className="font-medium">Patient: {r.patientId}</div>
                      <div className="text-xs text-muted-foreground">Batch: {r.batchId} • Service: {r.service}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 mt-6">
            <h3 className="font-semibold mb-4">Compliance Status</h3>
            <p className="text-sm text-muted-foreground">Dossier électronique de stérilisation archivé pour un minimum de 5 ans.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComplianceReporting;
