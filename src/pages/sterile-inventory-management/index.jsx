import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const mockStock = [
  { batchId: 'BATCH-001', kitName: 'Cardiac Set', location: 'Storage A', quantity: 5, sterilizationDate: '2025-10-01', expirationDate: '2026-04-01', status: 'Available' },
  { batchId: 'BATCH-002', kitName: 'Orthopedic Set', location: 'Storage B', quantity: 1, sterilizationDate: '2025-09-20', expirationDate: '2025-11-15', status: 'Reserved' },
  { batchId: 'BATCH-003', kitName: 'Laparoscopy Kit', location: 'OR Prep', quantity: 0, sterilizationDate: '2025-10-28', expirationDate: '2025-12-05', status: 'Issued' }
];

const SterileInventoryManagement = () => {
  const [stock] = useState(mockStock);
  const [movementLog, setMovementLog] = useState([]);
  const [trackingLog, setTrackingLog] = useState([]);

  const recordMovement = (batchId, action) => {
    const entry = { id: `${Date.now()}`, batchId, action, staffId: 'STF-001', timestamp: new Date().toISOString() };
    setMovementLog((m) => [entry, ...m]);
    alert('Mouvement enregistré');
  };

  const flagBatch = (batchId, disposition) => {
    const entry = { id: `${Date.now()}`, batchId, disposition, reason: 'Manual flag', timestamp: new Date().toISOString() };
    setTrackingLog((t) => [entry, ...t]);
    alert(`Batch ${batchId} marqué pour ${disposition}`);
  };

  const getExpiryClass = (expDate) => {
    const days = (new Date(expDate) - new Date()) / (1000 * 60 * 60 * 24);
    if (days < 0) return 'text-error';
    if (days < 30) return 'text-warning';
    return 'text-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Box" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Gestion des Stocks Stériles</h1>
                <p className="text-muted-foreground">Surveillance des niveaux de stock, péremption et mouvements</p>
              </div>
            </div>
            <div>
              <Button variant="default" iconName="Plus">Ajouter Stock</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Détails du Stock</h3>
              <div className="space-y-3">
                {stock?.map(item => (
                  <div key={item.batchId} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{item.kitName} <span className="text-xs text-muted-foreground">({item.batchId})</span></div>
                      <div className="text-xs text-muted-foreground">{item.location} • Quantité: {item.quantity}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm ${getExpiryClass(item.expirationDate)}`}>Exp: {item.expirationDate}</div>
                      <div className="mt-2 flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => recordMovement(item.batchId, 'issue')}>Issue</Button>
                        <Button variant="ghost" size="sm" onClick={() => flagBatch(item.batchId, 'Re-Sterilize')}>Flag</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Movement Log</h3>
                <div className="text-sm text-muted-foreground max-h-48 overflow-y-auto">
                  {movementLog?.length === 0 && <div>Aucun mouvement enregistré</div>}
                  {movementLog?.map(m => (
                    <div key={m.id} className="py-2 border-b last:border-b-0">
                      <div className="font-medium">{m.batchId} • {m.action}</div>
                      <div className="text-xs text-muted-foreground">{m.staffId} • {new Date(m.timestamp).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Tracking Log (Re-Sterilize / Destruction)</h3>
                <div className="text-sm text-muted-foreground max-h-48 overflow-y-auto">
                  {trackingLog?.length === 0 && <div>Aucun lot marqué</div>}
                  {trackingLog?.map(t => (
                    <div key={t.id} className="py-2 border-b last:border-b-0">
                      <div className="font-medium">{t.batchId} • {t.disposition}</div>
                      <div className="text-xs text-muted-foreground">{t.reason} • {new Date(t.timestamp).toLocaleString()}</div>
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

export default SterileInventoryManagement;
