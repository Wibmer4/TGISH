import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const mockEquipment = [
  { id: 'EQ-AC-001', name: 'Autoclave AC-001', type: 'autoclave', lastRun: '2025-11-06T22:45:00Z', cyclesCount: 3, totalCycles: 1234, status: 'online', nextMaintenance: '2026-02-15' },
  { id: 'EQ-WD-002', name: 'Washer WD-002', type: 'washer', lastRun: '2025-11-06T21:10:00Z', cyclesCount: 2, totalCycles: 847, status: 'maintenance', nextMaintenance: '2025-11-12' }
];

const EquipmentManagement = () => {
  const [equipment] = useState(mockEquipment);
  const [maintenanceLog, setMaintenanceLog] = useState([]);
  const [downtimeLog, setDowntimeLog] = useState([]);

  const addMaintenance = (eqId) => {
    const entry = { id: `${Date.now()}`, eqId, type: 'Calibration', date: new Date().toISOString(), technician: 'Tech-01', summary: 'Routine calibration', nextDate: '2026-02-15' };
    setMaintenanceLog((m) => [entry, ...m]);
    alert('Maintenance recorded');
  };

  const recordDowntime = (eqId) => {
    const entry = { id: `${Date.now()}`, eqId, start: new Date().toISOString(), end: null };
    setDowntimeLog((d) => [entry, ...d]);
    alert('Downtime started (finish by editing entry)');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Gestion de l'Équipement</h1>
                <p className="text-muted-foreground">Maintenance, étalonnage et disponibilité des équipements</p>
              </div>
            </div>
            <div>
              <Button variant="default" iconName="Plus">Ajouter Équipement</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Liste des équipements</h3>
              <div className="space-y-3">
                {equipment?.map(eq => (
                  <div key={eq.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{eq.name} <span className="text-xs text-muted-foreground">({eq.id})</span></div>
                      <div className="text-xs text-muted-foreground">Last Run: {new Date(eq.lastRun).toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">Next Maintenance: <span className="font-medium">{eq.nextMaintenance}</span></div>
                      <div className="mt-2 flex space-x-2 justify-end">
                        <Button size="sm" variant="outline" onClick={() => addMaintenance(eq.id)}>Add Maintenance</Button>
                        <Button size="sm" variant="ghost" onClick={() => recordDowntime(eq.id)}>Downtime</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Maintenance & Calibration Log</h3>
                <div className="text-sm text-muted-foreground max-h-48 overflow-y-auto">
                  {maintenanceLog?.length === 0 && <div>Aucune maintenance enregistrée</div>}
                  {maintenanceLog?.map(m => (
                    <div key={m.id} className="py-2 border-b last:border-b-0">
                      <div className="font-medium">{m.type} • {m.eqId}</div>
                      <div className="text-xs text-muted-foreground">{m.technician} • {new Date(m.date).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Downtime Tracking</h3>
                <div className="text-sm text-muted-foreground max-h-48 overflow-y-auto">
                  {downtimeLog?.length === 0 && <div>Aucun temps d'arrêt enregistré</div>}
                  {downtimeLog?.map(d => (
                    <div key={d.id} className="py-2 border-b last:border-b-0">
                      <div className="font-medium">{d.eqId}</div>
                      <div className="text-xs text-muted-foreground">Start: {new Date(d.start).toLocaleString()} • End: {d.end ? new Date(d.end).toLocaleString() : 'In Progress'}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EquipmentManagement;
