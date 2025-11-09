import React, { useState, useEffect } from 'react';
// French translations for CSSD Traceability System
// Traductions françaises pour le système de traçabilité CSSD

export const frTranslations = {
  // Common/Global
  common: {
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    warning: 'Attention',
    info: 'Information',
    confirm: 'Confirmer',
    cancel: 'Annuler',
    save: 'Enregistrer',
    delete: 'Supprimer',
    edit: 'Modifier',
    view: 'Voir',
    continue: 'Continuer',
    refresh: 'Actualiser',
    help: 'Aide',
    settings: 'Paramètres',
    search: 'Rechercher',
    scan: 'Scanner',
    more: 'Plus',
    yes: 'Oui',
    no: 'Non',
    ok: 'OK'
  },

  // Header Navigation
  header: {
    title: 'Traçabilité CSSD',
    subtitle: 'Système de gestion de stérilisation',
    dashboard: 'Tableau de bord',
    processing: 'Traitement',
    qualityControl: 'Contrôle qualité',
    traceability: 'Traçabilité',
    cycleManagement: 'Gestion des cycles',
    dashboardDesc: 'Centre de commande central',
    processingDesc: 'Flux de stérilisation',
    qualityControlDesc: 'Processus de validation',
    traceabilityDesc: 'Suivi de sécurité patient',
    cycleManagementDesc: 'Cycles de stérilisation',
    systemsOnline: 'Systèmes en ligne',
    activateScanner: 'Activer le scanner de codes-barres',
    cssdTechnician: 'Technicien CSSD',
    isoCompliant: 'Conforme ISO 8402',
    lastAudit: 'Dernier audit : Nov 2025 | Prochain : Fév 2026',
    session: 'Session : 08:30 - 16:30',
    shift: 'Équipe A'
  },
  // Top-level navigation labels (additional)
  nav: {
    inventory: 'Gestion des Stocks Stériles',
    equipment: 'Gestion des Équipements',
    compliance: 'Rapports de Conformité'
  },

  // Dashboard Page
  dashboard: {
    title: 'Tableau de bord SteriliTrack',
    quickActions: {
      title: 'Actions Rapides',
      subtitle: 'Département Central de Stérilisation - Surveillance des processus en temps réel',
      liveUpdates: 'Mises à jour en direct',
      activeAlerts: 'Alertes actives',
      activeWorkflows: 'Flux de travail actifs',
      equipmentStatus: 'État de l\'équipement',
      validationQueue: 'File d\'attente de validation',
      processNavigation: 'Navigation des processus',
      newWorkflow: 'Nouveau flux',
    },

    // Statistics
    stats: {
      activeWorkflows: 'Flux actifs',
      completedToday: 'Complétés aujourd\'hui',
      pendingValidation: 'Validation en attente',
      equipmentOnline: 'Équipement en ligne'
    },

    // Quick Actions
    quickActions: {
      scanBasket: 'Scanner panier',
      scanBasketDesc: 'Enregistrer articles contaminés',
      startScan: 'Démarrer scan',
      startCleaning: 'Commencer nettoyage',
      startCleaningDesc: 'Démarrer cycle de lavage',
      startCycle: 'Démarrer cycle',
      packageSets: 'Emballer sets',
      packageSetsDesc: 'Créer paquets stériles',
      package: 'Emballer',
      loadAutoclave: 'Charger autoclave',
      loadAutoclaveDesc: 'Commencer stérilisation',
      load: 'Charger'
    },

    // Navigation Links
    navigation: {
      preDisinfection: 'Flux pré-désinfection',
      preDisinfectionDesc: 'Enregistrer articles contaminés',
      sterilizationCycles: 'Cycles de stérilisation',
      sterilizationCyclesDesc: 'Gérer opérations autoclave',
      qualityControl: 'Contrôle qualité',
      qualityControlDesc: 'Validation et libération',
      patientTraceability: 'Traçabilité patient',
      patientTraceabilityDesc: 'Suivi utilisation paquets stériles',
      staffLogin: 'Connexion personnel',
      staffLoginDesc: 'Accès authentification système'
    }
  },

  // Workflow Card
  workflow: {
    currentStage: 'Étape actuelle :',
    operator: 'Opérateur :',
    elapsedTime: 'Temps écoulé :',
    itemsCount: 'Nombre d\'articles :',
    nextAction: 'Action suivante :',
    priority: 'Priorité',

    // Priority levels
    priorities: {
      high: 'ÉLEVÉE',
      medium: 'MOYENNE',
      low: 'FAIBLE'
    },

    // Stages
    stages: {
      preDisinfection: 'PRÉ-DÉSINFECTION',
      cleaning: 'NETTOYAGE',
      packaging: 'EMBALLAGE',
      sterilization: 'STÉRILISATION',
      validation: 'VALIDATION',
      completed: 'TERMINÉ'
    },

    // Instrument types
    types: {
      surgicalInstruments: 'Instruments chirurgicaux',
      orthopedicSet: 'Set orthopédique',
      laparoscopyKit: 'Kit laparoscopie',
      generalSurgery: 'Chirurgie générale',
      cardiovascularSet: 'Set cardiovasculaire',
      neurosurgeryKit: 'Kit neurochirurgie'
    },

    // Actions
    actions: {
      soakingTimeComplete: 'Terminer temps de trempage (15 min restantes) puis transférer au laveur-désinfecteur',
      washerInProgress: 'Cycle de lavage en cours - 12 minutes restantes',
      inspectionComplete: 'Inspection visuelle terminée - prêt pour emballage et étiquetage',
      autoclaveInProgress: 'Cycle autoclave AC-001 en cours - 45 minutes restantes',
      awaitingValidation: 'En attente de validation du contrôle qualité par personnel autorisé',
      readyForDistribution: 'Prêt pour distribution au bloc 3 pour intervention programmée'
    }
  },

  // Staff Login
  login: {
    title: 'Authentification du personnel',
    subtitle: 'Accès sécurisé au système de traçabilité CSSD',
    barcodeScanner: 'Scanner code-barres',
    manualEntry: 'Saisie manuelle',
    processingScan: 'Traitement du scan...',
    authenticating: 'Authentification...',
    employeeNotFound: 'ID employé introuvable. Veuillez vérifier vos identifiants.',
    invalidPassword: 'Mot de passe invalide. Veuillez réessayer.',
    needHelp: 'Besoin d\'aide ? Contactez le support IT au poste 8888',
    scannerSettings: 'Paramètres scanner',
    sessionTimeout: 'Délai de session : 8 heures',
    autoLogout: 'Déconnexion auto : Activée',
    
    // Form fields
    employeeId: 'ID Employé',
    password: 'Mot de passe',
    login: 'Se connecter',
    
    // Scanner
    scannerActive: 'Scanner actif - Présentez votre badge',
    scannerInactive: 'Scanner inactif - Cliquez pour activer',
    activateScanner: 'Activer scanner'
  },

  // Equipment Status
  equipment: {
    autoclave: 'Autoclave',
    washerDisinfector: 'Laveur-désinfecteur',
    dryingCabinet: 'Armoire de séchage',
    
    // Status
    inUse: 'En cours d\'utilisation',
    online: 'En ligne',
    offline: 'Hors ligne',
    maintenance: 'Maintenance',
    
    // Equipment names
    autoclaveUnit1: 'Unité Autoclave 1',
    autoclaveUnit2: 'Unité Autoclave 2',
    washerDisinfector1: 'Laveur-Désinfecteur 1',
    washerDisinfector2: 'Laveur-Désinfecteur 2',
    dryingCabinet1: 'Armoire de Séchage 1',
    dryingCabinet2: 'Armoire de Séchage 2',
    
    cyclesToday: 'Cycles aujourd\'hui :',
    totalCycles: 'Total cycles :',
    nextMaintenance: 'Prochaine maintenance :',
    progress: 'Progression :'
  },

  // Alerts
  alerts: {
    soakingTimeAlert: 'Alerte temps de trempage',
    equipmentMaintenance: 'Maintenance équipement',
    cycleComplete: 'Cycle terminé',
    
    soakingTimeMessage: 'BSK-2025-007 a dépassé le temps de trempage recommandé de 15 minutes',
    equipmentMaintenanceMessage: 'Le Laveur-Désinfecteur WD-002 nécessite une attention de maintenance immédiate',
    cycleCompleteMessage: 'Le cycle autoclave AC-001-CYC-08 s\'est terminé avec succès avec tous les indicateurs validés',
    
    timeStamps: {
      minAgo: 'il y a 2 min',
      fiveMinAgo: 'il y a 5 min',
      eightMinAgo: 'il y a 8 min'
    }
  },

  // Validation Queue
  validation: {
    urgent: 'Urgent',
    high: 'Élevé',
    normal: 'Normal',
    low: 'Faible'
  },

  // Time formats
  time: {
    hours: 'h',
    minutes: 'm',
    seconds: 's',
    ago: 'il y a'
  },

  // Hospital/Compliance
  compliance: {
    hospitalName: 'Hôpital Central Universitaire',
    location: 'Oujda, Maroc',
    sterilizationDept: 'Département de Stérilisation Centrale',
    certifiedFacility: 'Installation Certifiée',
    iso13485: 'ISO 13485:2016',
    iso14155: 'ISO 14155:2020',
    ce: 'Marquage CE',
    fda: 'Approuvé FDA'
  },

  // Form labels and placeholders
  form: {
    required: 'Requis',
    optional: 'Optionnel',
    pleaseSelect: 'Veuillez sélectionner...',
    enterValue: 'Saisissez une valeur...',
    searchPlaceholder: 'Rechercher...'
  }
  ,
  // Patient Traceability
  patientTraceability: {
    title: 'Système de Traçabilité Patient',
    subtitle: 'Sécurité patient et gestion de la traçabilité des paquets stériles',
    tabs: {
      registration: 'Enregistrement Patient',
      search: 'Recherche de Traçabilité',
      reports: 'Rapports',
      alerts: 'Alertes'
    },
    stats: {
      activePatients: 'Patients actifs',
      tracedProcedures: 'Procédures tracées',
      activeAlerts: 'Alertes actives',
      complianceRate: 'Taux de conformité'
    },
    quickActions: {
      emergencyScan: 'Scan d\'urgence',
      reportIssue: 'Signaler un problème',
      generateReport: 'Générer rapport',
      contactSupport: 'Contacter le support'
    },
    export: {
      exportData: 'Exporter les données'
    },
    footer: {
      version: 'Version',
      lastUpdated: 'Dernière mise à jour'
    }
  },

  // Sterile Inventory
  inventory: {
    title: 'Gestion des Stocks Stériles',
    subtitle: 'Surveillance des niveaux, péremptions et mouvements',
    details: 'Détails du Stock',
    movementLog: 'Journal des mouvements',
    trackingLog: 'Journal de suivi',
    issue: 'Émettre',
    flag: 'Marquer',
    addStock: 'Ajouter Stock',
    noMovements: 'Aucun mouvement enregistré',
    noTracking: 'Aucun lot marqué'
  },

  // Generic UI and QC strings
  ui: {
    noLoadSelected: 'Aucune charge sélectionnée',
    loadSummary: 'Résumé de la charge',
    selectLoad: 'Sélectionnez une charge pour commencer le processus de validation',
    inspectorComments: 'Commentaires de l\'inspecteur',
    pass: 'Réussi',
    fail: 'Échec',
    rejectLoad: 'Rejeter la charge',
    reject: 'Rejeter',
    approveAndRelease: 'Approuver et libérer',
    saveProgress: 'Enregistrer la progression',
    cancel: 'Annuler',
    confirmRejection: 'Confirmer le rejet',
    generatingReport: 'Génération du rapport...',
    generateReports: 'Générer des rapports',
    sessionLabel: 'Session :'
  },

  qualityControl: {
    title: 'Contrôle Qualité - Validation',
    subtitle: 'Examiner, approuver et libérer les charges stérilisées',
    validationRequired: 'Validation requise',
    inspectionChecklist: 'Liste de contrôle d\'inspection',
    loadLabels: {
      autoclave: 'Autoclave :',
      cycle: 'Cycle :',
      items: 'Articles :',
      completed: 'Terminé :'
    },
    inspectionItems: {
      packagingIntegrity: {
        label: 'Intégrité de l\'emballage',
        description: 'Vérifier les déchirures, perforations ou joints compromis'
      },
      labelQuality: {
        label: 'Qualité de l\'étiquette',
        description: 'Vérifier la lisibilité du code-barres et la qualité d\'impression'
      },
      sterileBarrier: {
        label: 'Barrière stérile',
        description: 'Confirmer l\'intégrité du système de barrière stérile'
      },
      visualInspection: {
        label: 'Inspection visuelle',
        description: 'Apparence générale et évaluation de propreté'
      }
    },
    tabs: {
      parameters: 'Paramètres du cycle',
      indicators: 'Indicateurs',
      charts: 'Température/Pression',
      photos: 'Preuves visuelles'
    },
    parameterLabels: {
      temperature: 'Température',
      pressure: 'Pression',
      holdTime: 'Temps de maintien'
    },
    cyclePhases: 'Phases du cycle',
    physicalIndicatorsLabel: 'Indicateurs physiques',
    chemicalIndicatorsLabel: 'Indicateurs chimiques',
    biologicalIndicatorsLabel: 'Indicateurs biologiques',
    tempPressureCurves: 'Courbes Température/Pression',
  cycleDocumentation: 'Documentation du cycle',
    exportPdf: 'Exporter en PDF',
    photoCaptured: 'Capturé :',
    photoInspector: 'Inspecteur :',
  rejectionReasonLabel: 'Raison du rejet *',
  commentsPlaceholder: 'Saisissez des notes d\'inspection détaillées...',
  commentsRequired: 'Requis : Fournir des commentaires détaillés sur l\'inspection',
  rejectionPlaceholder: 'Fournissez une explication détaillée du rejet...',
  rejectionDescription: 'Requis : Expliquez les problèmes spécifiques trouvés',
    rejectionReasons: [
      'Intégrité de l\'emballage compromise',
      'Qualité de l\'étiquette insuffisante',
      'Défaillance de la barrière stérile',
      'Échec indicateur - Physique',
      'Échec indicateur - Chimique',
      'Échec indicateur - Biologique',
      'Écart de température',
      'Écart de pression',
      'Écart de durée du cycle',
      'Dysfonctionnement de l\'équipement',
      'Autre (préciser dans les commentaires)'
    ],
    validationSystemOnline: 'Système de validation en ligne'
  }
};

// Language detection and management
export class LanguageManager {
  constructor() {
    this.currentLanguage = localStorage.getItem('cssd_language') || 'fr';
    this.translations = {
      fr: frTranslations
    };
  }

  // Get translated text
  t(key, fallback = '') {
    const keys = key?.split('.');
    let value = this.translations?.[this.currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value?.[k];
      } else {
        return fallback || key;
      }
    }
    
    return value || fallback || key;
  }

  // Set language
  setLanguage(lang) {
    this.currentLanguage = lang;
    localStorage.setItem('cssd_language', lang);
    // Trigger re-render by dispatching custom event
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  }

  // Get current language
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // Check if translation exists
  hasTranslation(key) {
    const keys = key?.split('.');
    let value = this.translations?.[this.currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value?.[k];
      } else {
        return false;
      }
    }
    
    return value !== undefined;
  }
}

// Export singleton instance
export const languageManager = new LanguageManager();

// React hook for translations
export const useTranslation = () => {
  const [currentLang, setCurrentLang] = React.useState(languageManager?.getCurrentLanguage());
  
  React.useEffect(() => {
    const handleLanguageChange = (event) => {
      setCurrentLang(event?.detail);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);
  
  return {
    t: (key, fallback) => languageManager?.t(key, fallback),
    setLanguage: (lang) => languageManager?.setLanguage(lang),
    currentLanguage: currentLang
  };
};

export default languageManager;