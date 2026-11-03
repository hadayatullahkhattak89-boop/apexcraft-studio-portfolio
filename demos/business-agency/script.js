/**
 * Vanguard Solutions - Enterprise SaaS Demo Engine
 * Production-ready Vanilla JavaScript
 */

// ==========================================
// 1. DATASETS FOR ANALYTICS DASHBOARD
// ==========================================
const DASHBOARD_DATA = {
  '7d': {
    mrr: '$284,500',
    mrrPct: '+18.4%',
    users: '1,420',
    usersPct: '+9.2%',
    churn: '0.82%',
    churnPct: '-0.35%',
    latency: '18ms',
    charts: {
      revenue: [42, 55, 68, 62, 84, 91, 100],
      traffic: [30, 45, 60, 50, 75, 88, 95],
      performance: [24, 21, 19, 18, 17, 18, 18]
    },
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  '30d': {
    mrr: '$312,800',
    mrrPct: '+24.1%',
    users: '1,890',
    usersPct: '+14.6%',
    churn: '0.74%',
    churnPct: '-0.42%',
    latency: '17ms',
    charts: {
      revenue: [30, 42, 50, 65, 78, 85, 110],
      traffic: [40, 52, 65, 70, 85, 92, 105],
      performance: [28, 24, 22, 19, 18, 17, 17]
    },
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']
  },
  '90d': {
    mrr: '$450,200',
    mrrPct: '+42.8%',
    users: '2,640',
    usersPct: '+28.5%',
    churn: '0.68%',
    churnPct: '-0.51%',
    latency: '16ms',
    charts: {
      revenue: [25, 38, 55, 72, 90, 115, 140],
      traffic: [35, 48, 68, 82, 100, 120, 145],
      performance: [32, 28, 24, 20, 18, 16, 16]
    },
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7']
  },
  'all': {
    mrr: '$890,000',
    mrrPct: '+180%',
    users: '5,100',
    usersPct: '+112%',
    churn: '0.55%',
    churnPct: '-0.80%',
    latency: '15ms',
    charts: {
      revenue: [15, 30, 60, 95, 130, 180, 240],
      traffic: [20, 45, 80, 110, 150, 200, 260],
      performance: [45, 35, 26, 20, 17, 15, 15]
    },
    labels: ['2023', '2024 Q1', '2024 Q3', '2025 Q1', '2025 Q3', '2026 Q1', '2026 Q3']
  }
};

let activeTimeframe = '7d';
let activeChartType = 'revenue';

// ==========================================
// 2. FEATURE TABS DEFINITIONS
// ==========================================
const FEATURES_DATA = {
  automation: {
    tag: "Workflow Automation",
    title: "Trigger complex actions across multi-cloud clusters in milliseconds",
    desc: "Automate routine data transformation, error fallback, and incident escalation with Vanguard's drag-and-drop orchestration builder.",
    checklist: [
      "Sub-10ms event triggers with guaranteed at-least-once delivery",
      "Visual node graph editor with live breakpoint inspection",
      "Native Webhook and GraphQL endpoints out of the box"
    ],
    code: `import { VanguardPipeline, EventBus } from '@vanguard/sdk';

export const streamPipeline = new VanguardPipeline({
  source: 'stripe_webhooks',
  transform: async (event) => {
    const fraudScore = await VanguardAI.evaluate(event);
    return fraudScore < 0.15 ? 'APPROVE' : 'REQUIRE_MFA';
  },
  slaTargetMs: 25
});`
  },
  analytics: {
    tag: "Predictive Analytics",
    title: "Forecast customer revenue and retention curves with machine learning",
    desc: "Built-in time-series anomaly detection flags unusual churn indicators weeks before clients submit cancellation tickets.",
    checklist: [
      "Real-time Monte Carlo revenue simulation under volatile markets",
      "Cohort behavioral segmentation with zero manual SQL coding",
      "Instant export to Snowflake, BigQuery, and Databricks"
    ],
    code: `import { VanguardModel, ForecastEngine } from '@vanguard/ml';

const forecast = await ForecastEngine.predictMRR({
  timeHorizonMonths: 12,
  includeSeasonality: true,
  confidenceInterval: 0.95
});

console.log('Projected Q4 MRR:', forecast.projectedTarget);`
  },
  security: {
    tag: "Zero-Trust Security",
    title: "Cryptographically verified audit trails and automated role policies",
    desc: "Ensure complete defense-in-depth across your distributed architecture with immutable ledger audit logs and granular SAML/Okta permissions.",
    checklist: [
      "Customer-Managed Encryption Keys (CMEK) via AWS KMS & GCP Vault",
      "Automated PII scrubbing and anonymization in all log streams",
      "Role-Based Access Control (RBAC) synchronized via SCIM"
    ],
    code: `import { SecurityPolicy, AccessController } from '@vanguard/auth';

export const enclaveGuard = new AccessController({
  requireMFA: true,
  allowedIPRanges: ['10.0.0.0/8'],
  complianceStandards: ['SOC2_TYPE_2', 'HIPAA_COMPLIANT']
});`
  },
  integrations: {
    tag: "Cloud Connectors",
    title: "One-click bidirectional sync with your existing data stack",
    desc: "Seamlessly ingest, synchronize, and dispatch payload notifications to over 100+ native developer services and messaging queues.",
    checklist: [
      "Pre-built verified connectors for Stripe, AWS, Slack, GitHub & Salesforce",
      "High-throughput Apache Kafka and RabbitMQ streaming connectors",
      "Automatic payload schema validation with instant retry logic"
    ],
    code: `import { VanguardConnector } from '@vanguard/integrations';

VanguardConnector.bind({
  target: 'slack_incident_channel',
  triggerOn: 'ANOMALY_DETECTED',
  format: 'RICH_BLOCKS'
});`
  }
};

// ==========================================
// 3. CHART SVG RENDERER
// ==========================================
function renderChart() {
  const container = document.getElementById('chart-container');
  if (!container) return;

  const dataset = DASHBOARD_DATA[activeTimeframe];
  const points = dataset.charts[activeChartType];
  const labels = dataset.labels;

  const maxVal = Math.max(...points) * 1.25;
  const width = 800;
  const height = 220;
  const paddingX = 40;
  const paddingY = 20;

  // Calculate coordinates
  const stepX = (width - paddingX * 2) / (points.length - 1);
  const coords = points.map((val, index) => {
    const x = paddingX + index * stepX;
    const y = height - paddingY - (val / maxVal) * (height - paddingY * 2);
    return { x, y, val };
  });

  // Build SVG path
  let pathD = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 1; i < coords.length; i++) {
    // Smooth bezier curve
    const prev = coords[i - 1];
    const curr = coords[i];
    const midX = (prev.x + curr.x) / 2;
    pathD += ` C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y}`;
  }

  // Area under path
  const areaD = `${pathD} L ${coords[coords.length - 1].x} ${height - paddingY} L ${coords[0].x} ${height - paddingY} Z`;

  // Determine line color
  const strokeColor = activeChartType === 'revenue' ? '#06b6d4' : activeChartType === 'traffic' ? '#8b5cf6' : '#10b981';

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" style="width: 100%; height: 100%; overflow: visible;">
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${strokeColor}" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="${strokeColor}" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      
      <!-- Grid lines -->
      <line x1="${paddingX}" y1="${height - paddingY}" x2="${width - paddingX}" y2="${height - paddingY}" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      <line x1="${paddingX}" y1="${height / 2}" x2="${width - paddingX}" y2="${height / 2}" stroke="rgba(255,255,255,0.05)" stroke-dasharray="4" stroke-width="1"/>

      <!-- Area fill -->
      <path d="${areaD}" fill="url(#chartGradient)"/>

      <!-- Main Line -->
      <path d="${pathD}" fill="none" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round"/>

      <!-- Data Dots -->
      ${coords.map((c, i) => `
        <circle cx="${c.x}" cy="${c.y}" r="5" fill="#0c1329" stroke="${strokeColor}" stroke-width="2.5"/>
        <text x="${c.x}" y="${height - 2}" text-anchor="middle" font-size="11" fill="#8493ad" font-family="Plus Jakarta Sans">${labels[i]}</text>
      `).join('')}
    </svg>
  `;
}

function updateMetrics() {
  const data = DASHBOARD_DATA[activeTimeframe];
  document.getElementById('mrr-val').textContent = data.mrr;
  document.getElementById('mrr-pct').textContent = data.mrrPct;
  document.getElementById('users-val').textContent = data.users;
  document.getElementById('users-pct').textContent = data.usersPct;
  document.getElementById('churn-val').textContent = data.churn;
  document.getElementById('churn-pct').textContent = data.churnPct;
  document.getElementById('latency-val').textContent = data.latency;
  renderChart();
}

// ==========================================
// 4. PRICING TOGGLE (MONTHLY / ANNUAL)
// ==========================================
let isAnnual = false;

function initPricingToggle() {
  const switchBtn = document.getElementById('billing-switch');
  const lblMonthly = document.getElementById('lbl-monthly');
  const lblAnnual = document.getElementById('lbl-annual');
  const priceAmounts = document.querySelectorAll('.plan-amount');
  const annualNotes = document.querySelectorAll('.annual-note');

  if (!switchBtn) return;

  switchBtn.addEventListener('click', () => {
    isAnnual = !isAnnual;
    switchBtn.classList.toggle('annual', isAnnual);
    lblMonthly?.classList.toggle('active', !isAnnual);
    lblAnnual?.classList.toggle('active', isAnnual);

    priceAmounts.forEach(el => {
      const monthly = el.getAttribute('data-monthly');
      const annual = el.getAttribute('data-annual');
      el.textContent = isAnnual ? annual : monthly;
    });

    annualNotes.forEach(el => {
      el.style.display = isAnnual ? 'block' : 'none';
    });
  });
}

// ==========================================
// 5. TRIAL MODAL & TOAST
// ==========================================
function openTrialModal(planName = 'Professional') {
  document.getElementById('modal-plan-name').textContent = planName;
  document.getElementById('trial-modal')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeTrialModal() {
  document.getElementById('trial-modal')?.classList.remove('open');
  document.body.style.overflow = '';
}

function showSaasToast(msg) {
  const toast = document.getElementById('saas-toast');
  if (!toast) return;

  toast.innerHTML = `<i class="fas fa-circle-check" style="color: var(--cyan); margin-right: 0.5rem;"></i> ${msg}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function quickTrialSubmit() {
  const emailInput = document.getElementById('quick-trial-email');
  if (emailInput && emailInput.value.includes('@')) {
    showSaasToast(`Trial invite dispatched to ${emailInput.value}!`);
    emailInput.value = '';
  } else {
    showSaasToast("Please enter a valid work email.");
  }
}

// ==========================================
// 6. DOM READY INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  updateMetrics();
  initPricingToggle();

  // Timeframe Buttons
  const timeButtons = document.querySelectorAll('.time-btn');
  timeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      timeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTimeframe = btn.getAttribute('data-time');
      updateMetrics();
    });
  });

  // Chart Tabs
  const chartButtons = document.querySelectorAll('.chart-tab');
  chartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      chartButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeChartType = btn.getAttribute('data-chart');
      renderChart();
    });
  });

  // Feature Tabs
  const featureButtons = document.querySelectorAll('.f-tab');
  featureButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      featureButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const featureKey = btn.getAttribute('data-feature');
      const data = FEATURES_DATA[featureKey];
      if (!data) return;

      document.getElementById('f-tag').textContent = data.tag;
      document.getElementById('f-title').textContent = data.title;
      document.getElementById('f-desc').textContent = data.desc;
      document.getElementById('code-content').querySelector('code').textContent = data.code;

      const checklistContainer = document.getElementById('f-checklist');
      checklistContainer.innerHTML = data.checklist.map(item => `
        <li><i class="fas fa-circle-check"></i> ${item}</li>
      `).join('');
    });
  });

  // Trial Modal Triggers & Form
  document.getElementById('trial-close-btn')?.addEventListener('click', closeTrialModal);
  document.getElementById('trial-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'trial-modal') closeTrialModal();
  });

  const trialForm = document.getElementById('trial-form');
  trialForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = trialForm.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Provisioning Cluster...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = orig;
      btn.disabled = false;
      closeTrialModal();
      showSaasToast("Workspace provisioned! Temporary API key sent to your email.");
      trialForm.reset();
    }, 1200);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeTrialModal();
  });
});
