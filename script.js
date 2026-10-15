/* ==========================================================================
   ZEVIONIX TECHNOLOGIES - CLIENT JAVASCRIPT
   Interactive Behaviors, Tab Switchers, Forms & Telemetry
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  }

  // 1b. Desktop More Navigation Button Click Toggle
  const navMoreItem = document.querySelector('.nav-more-item');
  const navMoreBtn = document.querySelector('.nav-more-btn');
  if (navMoreBtn && navMoreItem) {
    navMoreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navMoreItem.classList.toggle('open');
      navMoreBtn.setAttribute('aria-expanded', navMoreItem.classList.contains('open'));
    });

    document.addEventListener('click', (e) => {
      if (!navMoreItem.contains(e.target)) {
        navMoreItem.classList.remove('open');
        navMoreBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Active Link Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      const parentDropdown = link.closest('.nav-item');
      if (parentDropdown) {
        const topLink = parentDropdown.querySelector('.nav-link');
        if (topLink) topLink.classList.add('active');
      }
    }
  });

  // 3. Tab Switchers (e.g. on Index / AURA pages)
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      const parentContainer = btn.closest('section') || document;

      // Deactivate siblings
      parentContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      parentContainer.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

      // Activate clicked
      btn.classList.add('active');
      const targetPanel = parentContainer.querySelector(`#${targetId}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // 4. Accordion Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const parentItem = q.closest('.faq-item');
      if (parentItem) {
        const isOpen = parentItem.classList.contains('active');

        // Optional: close other accordions in the same list
        const accordionList = parentItem.closest('.faq-list');
        if (accordionList) {
          accordionList.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
        }

        if (!isOpen) {
          parentItem.classList.add('active');
        }
      }
    });
  });

  // 5. Animated Number Counters
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
          const suffix = counter.getAttribute('data-suffix') || '';
          const prefix = counter.getAttribute('data-prefix') || '';
          let count = 0;
          const speed = target / 50;

          const updateCount = () => {
            count += speed;
            if (count < target) {
              counter.innerText = prefix + Math.ceil(count) + suffix;
              requestAnimationFrame(updateCount);
            } else {
              counter.innerText = prefix + target + suffix;
            }
          };
          updateCount();
          obs.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  // 6. Interactive Contact Form Submission Simulation
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting Encrypted Payload...';

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Inquiry Dispatched to Engineering Team!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        const formResponse = document.createElement('div');
        formResponse.className = 'form-success-banner';
        formResponse.style.cssText = 'background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #34d399; padding: 16px 20px; border-radius: 12px; margin-top: 20px; text-align: center; font-weight: 500;';
        formResponse.innerHTML = '<strong>Request Logged:</strong> A Senior Solutions Architect will connect within 4 business hours.';

        if (!contactForm.querySelector('.form-success-banner')) {
          contactForm.appendChild(formResponse);
        }

        contactForm.reset();
      }, 1200);
    });
  }

  // 7. Header Scroll Shadow Effect
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  // 8. Case Study TOC Active Scroll Spy
  const tocLinks = document.querySelectorAll('.cs-toc-link');
  const sections = document.querySelectorAll('.cs-section');
  if (tocLinks.length > 0 && sections.length > 0) {
    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;
        if (window.scrollY >= sectionTop) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (currentSectionId) {
        tocLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ==========================================================================
  // 9. AURA LIVE TELEMETRY & EDGE-TO-CLOUD MESH SIMULATOR ENGINE
  // ==========================================================================
  initAuraTelemetrySimulator();

  // ==========================================================================
  // 10. DEVELOPER PORTAL & INTERACTIVE API PLAYGROUND ENGINE
  // ==========================================================================
  initDocsAndApiPlayground();

  // ==========================================================================
  // 11. SMART TECHNICAL QUALIFICATION WIZARD
  // ==========================================================================
  initTechnicalConsultationWizard();

  // ==========================================================================
  // 12. PORTFOLIO & CASE STUDIES FILTERING ENGINE
  // ==========================================================================
  initPortfolioFilters();

  // ==========================================================================
  // 13. INDUSTRY SOLUTIONS INTERACTIVE ENGINE & SIZING CALCULATOR
  // ==========================================================================
  initIndustrySolutionsEngine();

  // ==========================================================================
  // 14. ENGINEERING INSIGHTS & BLOG ENGINE
  // ==========================================================================
  initEngineeringInsightsEngine();

  // ==========================================================================
  // 15. INTERACTIVE AI NEURAL MESH & PARTICLE CANVAS
  // ==========================================================================
  initNeuralCanvas();

  // ==========================================================================
  // 16. LIVE AURA COMPUTER VISION FEED HUD ENGINE
  // ==========================================================================
  initAuraHudMockup();

  // ==========================================================================
  // 17. GLOBAL SPOTLIGHT SEARCH ENGINE (Ctrl+K / Cmd+K Command Palette)
  // ==========================================================================
  initSpotlightSearch();
});

function initAuraTelemetrySimulator() {
  const simWrapper = document.getElementById('auraTelemetrySim');
  if (!simWrapper) return;

  // Simulator State
  const state = {
    throughput: 2500000, // msgs/sec
    latencyOpt: true, // Sub-ms Quantized vs TCP
    agentSwarms: 32, // Swarms
    gpuAccel: true, // GPU TensorRT vs CPU
    isPaused: false,
    isSpiking: false,
    activePreset: 'vision',
    history: {
      throughput: [],
      latency: [],
      gpuLoad: [],
      maxPoints: 30
    }
  };

  // UI Elements
  const elThroughputVal = simWrapper.querySelector('#simThroughputVal');
  const elThroughputRange = simWrapper.querySelector('#simThroughputRange');
  const elLatencyToggle = simWrapper.querySelector('#simLatencyToggle');
  const elLatencyStatus = simWrapper.querySelector('#simLatencyStatus');
  const elGpuToggle = simWrapper.querySelector('#simGpuToggle');
  const elGpuStatus = simWrapper.querySelector('#simGpuStatus');
  const elSwarmRange = simWrapper.querySelector('#simSwarmRange');
  const elSwarmVal = simWrapper.querySelector('#simSwarmVal');
  const elSpikeBtn = simWrapper.querySelector('#simSpikeBtn');
  const elPauseBtn = simWrapper.querySelector('#simPauseBtn');
  const elPresetBtns = simWrapper.querySelectorAll('.preset-chip');

  // KPI Display Elements
  const kpiLatency = simWrapper.querySelector('#kpiLatency');
  const kpiLatencyPill = simWrapper.querySelector('#kpiLatencyPill');
  const kpiSwarms = simWrapper.querySelector('#kpiSwarms');
  const kpiAgentsCount = simWrapper.querySelector('#kpiAgentsCount');
  const kpiGpuSat = simWrapper.querySelector('#kpiGpuSat');
  const kpiGpuModel = simWrapper.querySelector('#kpiGpuModel');
  const kpiThroughput = simWrapper.querySelector('#kpiThroughput');
  const kpiEventsSec = simWrapper.querySelector('#kpiEventsSec');
  const terminalBody = simWrapper.querySelector('#simTerminalLogs');
  const statusBeacon = simWrapper.querySelector('#simStatusBeacon');

  // Canvases
  const topologyCanvas = simWrapper.querySelector('#topologyCanvas');
  const telemetryCanvas = simWrapper.querySelector('#telemetryCanvas');
  const topCtx = topologyCanvas ? topologyCanvas.getContext('2d') : null;
  const telCtx = telemetryCanvas ? telemetryCanvas.getContext('2d') : null;

  // Setup HiDPI Canvas
  function setupCanvas(canvas, ctx) {
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
  }

  function resizeCanvases() {
    if (topologyCanvas && topCtx) setupCanvas(topologyCanvas, topCtx);
    if (telemetryCanvas && telCtx) setupCanvas(telemetryCanvas, telCtx);
  }

  window.addEventListener('resize', resizeCanvases);
  resizeCanvases();

  // Topology Particles & Network Nodes
  const particles = [];
  const nodes = [
    { id: 'edge1', name: 'Edge Camera 01', x: 0.12, y: 0.25, type: 'edge' },
    { id: 'edge2', name: 'IoT Gateway 04', x: 0.12, y: 0.50, type: 'edge' },
    { id: 'edge3', name: 'Drone Node 09', x: 0.12, y: 0.75, type: 'edge' },
    { id: 'meshCore', name: 'AURA Swarm Router', x: 0.50, y: 0.50, type: 'mesh' },
    { id: 'cloud1', name: 'Central Vector Core', x: 0.88, y: 0.35, type: 'cloud' },
    { id: 'cloud2', name: 'DGX H100 Cluster', x: 0.88, y: 0.65, type: 'cloud' }
  ];

  function createParticle() {
    if (state.isPaused) return;
    const edgeIdx = Math.floor(Math.random() * 3);
    const startNode = nodes[edgeIdx];
    const midNode = nodes[3];
    const destNode = Math.random() > 0.5 ? nodes[4] : nodes[5];

    // Spawn particle edge -> mesh -> cloud
    particles.push({
      startX: startNode.x,
      startY: startNode.y,
      midX: midNode.x,
      midY: midNode.y,
      endX: destNode.x,
      endY: destNode.y,
      progress: 0,
      speed: (state.latencyOpt ? 0.016 : 0.007) * (0.8 + Math.random() * 0.4),
      color: state.isSpiking ? '#ef4444' : (state.gpuAccel ? '#0284c7' : '#7c3aed'),
      size: 2.5 + Math.random() * 2
    });
  }

  // Animation Loop for Topology
  function renderTopology() {
    if (!topologyCanvas || !topCtx) return;
    const w = topologyCanvas.getBoundingClientRect().width;
    const h = topologyCanvas.getBoundingClientRect().height;

    topCtx.clearRect(0, 0, w, h);

    // Draw Links
    const links = [
      [nodes[0], nodes[3]],
      [nodes[1], nodes[3]],
      [nodes[2], nodes[3]],
      [nodes[3], nodes[4]],
      [nodes[3], nodes[5]],
      [nodes[4], nodes[5]]
    ];

    topCtx.lineWidth = 1.5;
    links.forEach(([n1, n2]) => {
      const gradient = topCtx.createLinearGradient(n1.x * w, n1.y * h, n2.x * w, n2.y * h);
      gradient.addColorStop(0, 'rgba(2, 132, 199, 0.35)');
      gradient.addColorStop(0.5, state.isSpiking ? 'rgba(239, 68, 68, 0.5)' : 'rgba(124, 58, 237, 0.35)');
      gradient.addColorStop(1, 'rgba(5, 150, 105, 0.35)');

      topCtx.strokeStyle = gradient;
      topCtx.beginPath();
      topCtx.moveTo(n1.x * w, n1.y * h);
      topCtx.lineTo(n2.x * w, n2.y * h);
      topCtx.stroke();
    });

    // Spawn Particles based on throughput
    const spawnChance = Math.min(0.85, (state.throughput / 10000000) * 1.2 + 0.15);
    if (Math.random() < spawnChance) {
      createParticle();
    }

    // Render & Update Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      if (!state.isPaused) {
        p.progress += p.speed;
      }

      let curX, curY;
      if (p.progress < 0.5) {
        const t = p.progress * 2;
        curX = (p.startX + (p.midX - p.startX) * t) * w;
        curY = (p.startY + (p.midY - p.startY) * t) * h;
      } else {
        const t = (p.progress - 0.5) * 2;
        curX = (p.midX + (p.endX - p.midX) * t) * w;
        curY = (p.midY + (p.endY - p.midY) * t) * h;
      }

      topCtx.fillStyle = p.color;
      topCtx.shadowColor = p.color;
      topCtx.shadowBlur = 6;
      topCtx.beginPath();
      topCtx.arc(curX, curY, p.size, 0, Math.PI * 2);
      topCtx.fill();
      topCtx.shadowBlur = 0;

      if (p.progress >= 1) {
        particles.splice(i, 1);
      }
    }

    // Render Nodes
    nodes.forEach(node => {
      const nx = node.x * w;
      const ny = node.y * h;

      // Outer glow pulse
      topCtx.fillStyle = node.type === 'edge' ? 'rgba(2, 132, 199, 0.15)' :
        node.type === 'mesh' ? 'rgba(124, 58, 237, 0.15)' : 'rgba(5, 150, 105, 0.15)';
      topCtx.beginPath();
      topCtx.arc(nx, ny, 16, 0, Math.PI * 2);
      topCtx.fill();

      // Node core
      topCtx.fillStyle = node.type === 'edge' ? '#0284c7' :
        node.type === 'mesh' ? '#7c3aed' : '#059669';
      topCtx.beginPath();
      topCtx.arc(nx, ny, 6, 0, Math.PI * 2);
      topCtx.fill();

      // Node label
      topCtx.fillStyle = '#475569';
      topCtx.font = '600 10px "JetBrains Mono", monospace';
      topCtx.textAlign = 'center';
      topCtx.fillText(node.name, nx, ny + 26);
    });

    requestAnimationFrame(renderTopology);
  }

  // Animation Loop for Rolling Telemetry Graph
  function renderTelemetryGraph() {
    if (!telemetryCanvas || !telCtx) return;
    const w = telemetryCanvas.getBoundingClientRect().width;
    const h = telemetryCanvas.getBoundingClientRect().height;

    telCtx.clearRect(0, 0, w, h);

    // Draw Subtle Grid
    telCtx.strokeStyle = 'rgba(15, 23, 42, 0.08)';
    telCtx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      const y = (h / 5) * i;
      telCtx.beginPath();
      telCtx.moveTo(0, y);
      telCtx.lineTo(w, y);
      telCtx.stroke();
    }

    const dataLen = state.history.throughput.length;
    if (dataLen < 2) {
      requestAnimationFrame(renderTelemetryGraph);
      return;
    }

    // Helper to draw smooth series
    function drawSeries(data, color, fillGradient, maxVal) {
      telCtx.beginPath();
      const step = w / (state.history.maxPoints - 1);
      const startOffset = (state.history.maxPoints - dataLen) * step;

      data.forEach((val, i) => {
        const x = startOffset + i * step;
        const normalized = Math.min(1, Math.max(0, val / maxVal));
        const y = h - 20 - normalized * (h - 40);
        if (i === 0) telCtx.moveTo(x, y);
        else telCtx.lineTo(x, y);
      });

      telCtx.strokeStyle = color;
      telCtx.lineWidth = 2;
      telCtx.stroke();

      // Fill area under curve
      if (fillGradient) {
        telCtx.lineTo(w, h - 10);
        telCtx.lineTo(startOffset, h - 10);
        telCtx.closePath();
        telCtx.fillStyle = fillGradient;
        telCtx.fill();
      }
    }

    // Draw Throughput Series (Cyan/Blue)
    const cyanGrad = telCtx.createLinearGradient(0, 0, 0, h);
    cyanGrad.addColorStop(0, 'rgba(2, 132, 199, 0.22)');
    cyanGrad.addColorStop(1, 'rgba(2, 132, 199, 0.02)');
    drawSeries(state.history.throughput, '#0284c7', cyanGrad, 12000000);

    // Draw GPU Load Series (Green)
    const greenGrad = telCtx.createLinearGradient(0, 0, 0, h);
    greenGrad.addColorStop(0, 'rgba(5, 150, 105, 0.2)');
    greenGrad.addColorStop(1, 'rgba(5, 150, 105, 0.02)');
    drawSeries(state.history.gpuLoad, '#059669', greenGrad, 100);

    // Draw Graph Legends & Real-time Labels
    telCtx.fillStyle = '#475569';
    telCtx.font = '600 10px "JetBrains Mono", monospace';
    telCtx.textAlign = 'left';
    telCtx.fillText('THROUGHPUT (EVENTS/S)', 12, 18);
    telCtx.fillStyle = '#0284c7';
    telCtx.fillRect(150, 11, 8, 8);

    telCtx.fillStyle = '#475569';
    telCtx.fillText('GPU COMPUTE (%)', 178, 18);
    telCtx.fillStyle = '#059669';
    telCtx.fillRect(285, 11, 8, 8);

    requestAnimationFrame(renderTelemetryGraph);
  }

  // Live Terminal Log Generator
  const logMessages = [
    { tag: 'ingest', text: (tp) => `Ingested ${(tp / 1000).toFixed(0)}k telemetry events from 32 edge cluster gateways.` },
    { tag: 'swarm', text: (sw) => `Agent Swarm #${Math.floor(Math.random() * sw + 1)} balanced cross-shard edge state in ${(Math.random() * 0.4 + 0.2).toFixed(2)}ms.` },
    { tag: 'gpu', text: (gp) => `TensorRT-LLM FP8 inference executed across 8x H100 SXM5 (${gp.toFixed(1)}% load).` },
    { tag: 'vault', text: () => `Zero-trust payload verified with AES-256-GCM enclave token 0x${Math.random().toString(16).substr(2, 8)}.` },
    { tag: 'ingest', text: () => `Sub-millisecond gRPC multiplexer maintained 0 packet drop rate.` }
  ];

  function pushTerminalLog(customTag, customMsg) {
    if (!terminalBody) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0')}`;

    let tag = customTag;
    let msg = customMsg;

    if (!tag) {
      const template = logMessages[Math.floor(Math.random() * logMessages.length)];
      tag = template.tag;
      msg = template.text(state.throughput, state.agentSwarms, state.gpuAccel ? 88.4 : 6.2);
    }

    const logRow = document.createElement('div');
    logRow.className = 'log-entry';
    logRow.innerHTML = `
      <span class="log-time">[${timeStr}]</span>
      <span class="log-tag ${tag}">[${tag.toUpperCase()}]</span>
      <span class="log-msg">${msg}</span>
    `;

    terminalBody.prepend(logRow);

    // Keep max 25 rows
    while (terminalBody.children.length > 25) {
      terminalBody.removeChild(terminalBody.lastChild);
    }
  }

  // State Calculation & UI Refresh Cycle
  function updateTelemetryMetrics() {
    if (state.isPaused) return;

    // Calculate Dynamic Values
    let jitter = (Math.random() - 0.5) * 0.08;
    let latencyVal;
    if (state.latencyOpt) {
      latencyVal = state.gpuAccel ? (0.42 + jitter) : (2.15 + jitter * 3);
    } else {
      latencyVal = state.gpuAccel ? (14.2 + jitter * 10) : (28.6 + jitter * 12);
    }

    if (state.isSpiking) {
      latencyVal *= 1.8;
    }

    let gpuSat;
    if (state.gpuAccel) {
      gpuSat = Math.min(99.4, 75 + (state.throughput / 10000000) * 20 + (Math.random() * 4));
    } else {
      gpuSat = 4.2 + Math.random() * 3.5;
    }

    let gbThroughput = ((state.throughput * 0.0000012) * (state.isSpiking ? 2.4 : 1)).toFixed(2);
    let totalAgents = state.agentSwarms * 4;

    // Update KPI Card text
    if (kpiLatency) kpiLatency.textContent = latencyVal.toFixed(2);
    if (kpiLatencyPill) {
      if (latencyVal < 1.0) {
        kpiLatencyPill.textContent = 'Sub-Millisecond Edge';
        kpiLatencyPill.className = 'sim-kpi-pill';
      } else {
        kpiLatencyPill.textContent = 'Standard Network Mesh';
        kpiLatencyPill.className = 'sim-kpi-pill badge-orange';
      }
    }

    if (kpiSwarms) kpiSwarms.textContent = state.agentSwarms;
    if (kpiAgentsCount) kpiAgentsCount.textContent = `${totalAgents} Reasoning Nodes`;

    if (kpiGpuSat) kpiGpuSat.textContent = `${gpuSat.toFixed(1)}%`;
    if (kpiGpuModel) kpiGpuModel.textContent = state.gpuAccel ? 'NVIDIA TensorRT-LLM (CUDA FP8)' : 'CPU Fallback Threadpool';

    if (kpiThroughput) kpiThroughput.textContent = `${gbThroughput} GB/s`;
    if (kpiEventsSec) kpiEventsSec.textContent = `${(state.throughput / 1000000).toFixed(2)}M Events / Sec`;

    // Record History for Graph
    state.history.throughput.push(state.throughput * (state.isSpiking ? 2.2 : 1) * (0.95 + Math.random() * 0.1));
    state.history.latency.push(latencyVal);
    state.history.gpuLoad.push(gpuSat);

    if (state.history.throughput.length > state.history.maxPoints) {
      state.history.throughput.shift();
      state.history.latency.shift();
      state.history.gpuLoad.shift();
    }
  }

  // Event Handlers for Controls
  if (elThroughputRange) {
    elThroughputRange.addEventListener('input', (e) => {
      state.throughput = parseInt(e.target.value, 10);
      if (elThroughputVal) {
        elThroughputVal.textContent = `${(state.throughput / 1000000).toFixed(1)}M/s`;
      }
      pushTerminalLog('ingest', `Throughput ingestion rate adjusted to ${(state.throughput / 1000000).toFixed(1)}M telemetry events/sec.`);
    });
  }

  if (elLatencyToggle) {
    elLatencyToggle.addEventListener('change', (e) => {
      state.latencyOpt = e.target.checked;
      if (elLatencyStatus) {
        elLatencyStatus.textContent = state.latencyOpt ? 'Sub-ms (QUIC/gRPC)' : 'Standard (TCP/TLS)';
        elLatencyStatus.className = `sim-status-text ${state.latencyOpt ? '' : 'off'}`;
      }
      pushTerminalLog('ingest', `Telemetry transport protocol switched to: ${state.latencyOpt ? 'gRPC/QUIC Sub-Millisecond Tunnel' : 'Standard TCP Socket Mesh'}`);
    });
  }

  if (elGpuToggle) {
    elGpuToggle.addEventListener('change', (e) => {
      state.gpuAccel = e.target.checked;
      if (elGpuStatus) {
        elGpuStatus.textContent = state.gpuAccel ? 'NVIDIA TensorRT (Active)' : 'CPU Fallback Mode';
        elGpuStatus.className = `sim-status-text ${state.gpuAccel ? '' : 'off'}`;
      }
      pushTerminalLog('gpu', `Compute accelerator state: ${state.gpuAccel ? 'NVIDIA TensorRT FP8 Kernels Enabled' : 'CPU Software Emulation Engine'}`);
    });
  }

  if (elSwarmRange) {
    elSwarmRange.addEventListener('input', (e) => {
      state.agentSwarms = parseInt(e.target.value, 10);
      if (elSwarmVal) {
        elSwarmVal.textContent = `${state.agentSwarms} Swarms`;
      }
      pushTerminalLog('swarm', `Orchestrating ${state.agentSwarms} autonomous agent swarms (${state.agentSwarms * 4} reasoning threads).`);
    });
  }

  // Presets Switching
  const presetsData = {
    vision: { tp: 3200000, swarms: 48, gpu: true, lat: true, name: 'Factory Vision Grid' },
    fintech: { tp: 10000000, swarms: 128, gpu: true, lat: true, name: 'FinTech High-Throughput Pulse' },
    drone: { tp: 1500000, swarms: 32, gpu: true, lat: true, name: 'Autonomous Drone Mesh' },
    enclave: { tp: 650000, swarms: 16, gpu: true, lat: true, name: 'Air-Gapped Sovereign Enclave' }
  };

  elPresetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      elPresetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const presetKey = btn.getAttribute('data-preset');
      const p = presetsData[presetKey];
      if (!p) return;

      state.throughput = p.tp;
      state.agentSwarms = p.swarms;
      state.gpuAccel = p.gpu;
      state.latencyOpt = p.lat;

      if (elThroughputRange) elThroughputRange.value = p.tp;
      if (elThroughputVal) elThroughputVal.textContent = `${(p.tp / 1000000).toFixed(1)}M/s`;
      if (elSwarmRange) elSwarmRange.value = p.swarms;
      if (elSwarmVal) elSwarmVal.textContent = `${p.swarms} Swarms`;
      if (elLatencyToggle) elLatencyToggle.checked = p.lat;
      if (elGpuToggle) elGpuToggle.checked = p.gpu;

      if (elLatencyStatus) elLatencyStatus.textContent = p.lat ? 'Sub-ms (QUIC/gRPC)' : 'Standard (TCP/TLS)';
      if (elGpuStatus) elGpuStatus.textContent = p.gpu ? 'NVIDIA TensorRT (Active)' : 'CPU Fallback Mode';

      pushTerminalLog('vault', `Applied Architecture Preset: [${p.name}] - Topology reconfigured.`);
    });
  });

  // Chaos Spike Test Button
  if (elSpikeBtn) {
    elSpikeBtn.addEventListener('click', () => {
      if (state.isSpiking) return;
      state.isSpiking = true;
      elSpikeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Surge Active...';
      elSpikeBtn.style.background = 'rgba(239, 68, 68, 0.4)';
      if (statusBeacon) {
        statusBeacon.className = 'sim-pulse-dot danger';
      }

      pushTerminalLog('alert', '⚡ SIMULATION WARNING: 400% Ingestion Surge Injected! Edge failover protocol initiated.');

      setTimeout(() => {
        pushTerminalLog('swarm', 'Autonomous AgentMesh self-healed: 64 fallback workers auto-provisioned.');
      }, 1500);

      setTimeout(() => {
        state.isSpiking = false;
        elSpikeBtn.innerHTML = '<i class="fas fa-bolt"></i> Simulate Traffic Surge';
        elSpikeBtn.style.background = '';
        if (statusBeacon) {
          statusBeacon.className = 'sim-pulse-dot';
        }
        pushTerminalLog('vault', 'Traffic surge stabilized. P99 latency normalized to sub-millisecond baseline.');
      }, 4000);
    });
  }

  // Pause Button
  if (elPauseBtn) {
    elPauseBtn.addEventListener('click', () => {
      state.isPaused = !state.isPaused;
      if (state.isPaused) {
        elPauseBtn.innerHTML = '<i class="fas fa-play"></i> Resume Feed';
        if (statusBeacon) statusBeacon.className = 'sim-pulse-dot warning';
        pushTerminalLog('alert', 'Live telemetry feed PAUSED by operator.');
      } else {
        elPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Feed';
        if (statusBeacon) statusBeacon.className = 'sim-pulse-dot';
        pushTerminalLog('ingest', 'Live telemetry feed RESUMED.');
      }
    });
  }

  // Initial Fill of History
  for (let i = 0; i < state.history.maxPoints; i++) {
    state.history.throughput.push(state.throughput * (0.9 + Math.random() * 0.2));
    state.history.latency.push(0.45 + (Math.random() - 0.5) * 0.08);
    state.history.gpuLoad.push(85 + Math.random() * 8);
  }

  // Start Animation Loops & Intervals
  renderTopology();
  renderTelemetryGraph();

  setInterval(updateTelemetryMetrics, 600);
  setInterval(() => {
    if (!state.isPaused && Math.random() < 0.75) {
      pushTerminalLog();
    }
  }, 1400);

  // Initial welcome log
  pushTerminalLog('ingest', 'AURA StreamPulse Engine v3.4 initialized. Telemetry cluster online.');
}

function initDocsAndApiPlayground() {
  // 1. Code Tabs Switching
  const codeBoxes = document.querySelectorAll('.code-box');
  codeBoxes.forEach(box => {
    const tabBtns = box.querySelectorAll('.code-tab-btn');
    const contentBlocks = box.querySelectorAll('.code-content-block');
    const copyBtn = box.querySelector('.code-copy-btn');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-lang');
        tabBtns.forEach(b => b.classList.remove('active'));
        contentBlocks.forEach(cb => {
          cb.style.display = (cb.getAttribute('data-lang') === targetTab) ? 'block' : 'none';
        });
        btn.classList.add('active');
      });
    });

    // 2. One-click Copy to Clipboard
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const visibleBlock = box.querySelector('.code-content-block:not([style*="display: none"])');
        if (visibleBlock) {
          const textToCopy = visibleBlock.innerText;
          navigator.clipboard.writeText(textToCopy).then(() => {
            const origHtml = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check" style="color: #34d399;"></i> Copied!';
            setTimeout(() => {
              copyBtn.innerHTML = origHtml;
            }, 1800);
          }).catch(() => {
            copyBtn.innerText = 'Copied!';
          });
        }
      });
    }
  });

  // 3. Interactive API Playground
  const apiPlayground = document.getElementById('apiPlayground');
  if (!apiPlayground) return;

  const endpointSelect = apiPlayground.querySelector('#apiEndpointSelect');
  const endpointUrlInput = apiPlayground.querySelector('#apiEndpointUrl');
  const methodSelect = apiPlayground.querySelector('#apiMethodSelect');
  const payloadEditor = apiPlayground.querySelector('#apiPayloadEditor');
  const responseViewer = apiPlayground.querySelector('#apiResponseViewer');
  const responseStatusPill = apiPlayground.querySelector('#apiResponseStatus');
  const sendBtn = apiPlayground.querySelector('#apiSendBtn');

  // Pre-configured Endpoints & Schemas
  const endpointsData = {
    telemetry: {
      method: 'POST',
      url: 'https://api.zevionix.ai/v1/telemetry/ingest',
      payload: JSON.stringify({
        clusterId: "us-east-dgx-h100-node04",
        edgeGatewayId: "camera-yolo-edge-99",
        timestamp: new Date().toISOString(),
        metrics: {
          fps: 120,
          detectedObjects: ["person", "defect_crankshaft", "forklift"],
          quantizedConfidence: 0.9942,
          p99LatencyMs: 0.42
        },
        encryptionEnclave: "AES-256-GCM"
      }, null, 2),
      response: (req) => ({
        status: "SUCCESS",
        code: 200,
        transactionHash: "0x8f2d" + Math.random().toString(16).substr(2, 10),
        latencyMs: 0.38,
        swarmStatus: "HEALTHY",
        vectorShardCommitted: true,
        clusterEcho: req.clusterId || "us-east-dgx-h100-node04"
      })
    },
    mesh: {
      method: 'GET',
      url: 'https://api.zevionix.ai/v1/mesh/agents',
      payload: JSON.stringify({
        filterRegion: "us-east",
        minConfidence: 0.95,
        maxResponseTimeMs: 1.0
      }, null, 2),
      response: () => ({
        activeSwarmClusters: 48,
        totalReasoningAgents: 192,
        orchestrationProtocol: "gRPC/QUIC",
        autonomousRemediations24h: 14209,
        meshHealthIndex: 0.99999
      })
    },
    vision: {
      method: 'POST',
      url: 'https://api.zevionix.ai/v1/vision/inference/yolo-stream',
      payload: JSON.stringify({
        streamProtocol: "RTSP",
        frameResolution: "3840x2160",
        gpuAcceleration: "nvidia-tensorrt-fp8",
        modelCheckpoint: "yolov10-enterprise-quantized-v2"
      }, null, 2),
      response: () => ({
        streamId: "stream_live_" + Math.random().toString(36).substr(2, 8),
        inferenceStatus: "BOUNDING_ACTIVE",
        fpsAchieved: 124.8,
        tensorCoreSaturation: "89.2%",
        boundingBoxLatencyMs: 0.29
      })
    },
    finops: {
      method: 'POST',
      url: 'https://api.zevionix.ai/v1/finops/optimize',
      payload: JSON.stringify({
        clusterTarget: "kubernetes-baremetal-dgx",
        enableSpotHarvesting: true,
        targetSlaUptime: 0.99999
      }, null, 2),
      response: () => ({
        projectedMonthlySavingsUsd: 270000,
        podPackingEfficiency: "94.6%",
        zeroDisruptionGuaranteed: true,
        actionPlan: "Dynamic Bin-Packing Active Across 140 Nodes"
      })
    }
  };

  if (endpointSelect) {
    endpointSelect.addEventListener('change', (e) => {
      const selectedKey = e.target.value;
      const data = endpointsData[selectedKey];
      if (!data) return;

      if (methodSelect) methodSelect.value = data.method;
      if (endpointUrlInput) endpointUrlInput.value = data.url;
      if (payloadEditor) payloadEditor.value = data.payload;
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      sendBtn.disabled = true;
      sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Dispatching Payload...';

      if (responseStatusPill) {
        responseStatusPill.textContent = 'CONNECTING...';
        responseStatusPill.style.color = '#fbbf24';
      }

      setTimeout(() => {
        let parsedPayload = {};
        try {
          parsedPayload = JSON.parse(payloadEditor.value);
        } catch {
          parsedPayload = { raw: payloadEditor.value };
        }

        const selectedKey = endpointSelect ? endpointSelect.value : 'telemetry';
        const endpointConfig = endpointsData[selectedKey] || endpointsData.telemetry;
        const resObj = endpointConfig.response(parsedPayload);

        if (responseViewer) {
          responseViewer.textContent = JSON.stringify(resObj, null, 2);
        }

        if (responseStatusPill) {
          responseStatusPill.textContent = '200 OK (0.38ms)';
          responseStatusPill.style.color = '#34d399';
        }

        sendBtn.disabled = false;
        sendBtn.innerHTML = '<i class="fas fa-play"></i> Execute Query';
      }, 350);
    });
  }
}

function initTechnicalConsultationWizard() {
  const wizardContainer = document.getElementById('consultationWizard');
  if (!wizardContainer) return;

  const state = {
    step: 1,
    challenge: 'vision',
    challengeName: 'AI & Real-Time Computer Vision',
    stack: new Set(['AWS (EKS/EC2)', 'NVIDIA TensorRT', 'Kubernetes / K3s']),
    scale: '50M - 500M Events / Day',
    sla: 'Sub-millisecond (< 1.0ms)',
    timeline: 'Immediate (0 - 4 Weeks)'
  };

  const leadRoutingMap = {
    vision: {
      name: "Dr. Elena Rostova",
      role: "Principal Deep Tech Architect — Vision & TensorRT-LLM",
      team: "AURA Perception Division",
      sla: "1-on-1 Deep Dive in < 4 Hours"
    },
    cloud: {
      name: "Marcus Vance",
      role: "VP of Cloud Infrastructure & eBPF Distributed Mesh",
      team: "Platform & Kubernetes Engineering",
      sla: "Architecture Review in < 4 Hours"
    },
    datamesh: {
      name: "Soren Lindqvist",
      role: "Lead Systems Architect — Zero-Copy Streaming & Kafka",
      team: "StreamPulse Data Engineering",
      sla: "Technical Scoping in < 4 Hours"
    },
    swarms: {
      name: "Devon Thorne",
      role: "Lead Cognitive Architect — Autonomous AgentMesh",
      team: "Autonomous Reasoning Division",
      sla: "Swarm Blueprint in < 4 Hours"
    },
    finops: {
      name: "Kavita Iyer",
      role: "Director of Enterprise FinOps & GPU Cluster Optimization",
      team: "FinOps & Compute Efficiency",
      sla: "CapEx Audit Briefing in < 4 Hours"
    },
    enclave: {
      name: "Alistair Sterling",
      role: "Chief Information Security Officer & Enclave Vault Lead",
      team: "Zero-Trust Confidential Computing",
      sla: "Air-Gapped Briefing in < 2 Hours"
    }
  };

  // Elements
  const progressFill = wizardContainer.querySelector('#wizardProgressFill');
  const stepNodes = wizardContainer.querySelectorAll('.wizard-step-node');
  const stepPanes = wizardContainer.querySelectorAll('.wizard-pane');
  const prevBtn = wizardContainer.querySelector('#wizardPrevBtn');
  const nextBtn = wizardContainer.querySelector('#wizardNextBtn');
  const challengeCards = wizardContainer.querySelectorAll('.challenge-card');
  const techChips = wizardContainer.querySelectorAll('.tech-chip');
  const scaleBoxes = wizardContainer.querySelectorAll('.scale-option-box[data-scale]');
  const slaBoxes = wizardContainer.querySelectorAll('.scale-option-box[data-sla]');
  const timelineBoxes = wizardContainer.querySelectorAll('.scale-option-box[data-timeline]');

  // Routing Preview Elements
  const routingLeadName = wizardContainer.querySelector('#routingLeadName');
  const routingLeadTeam = wizardContainer.querySelector('#routingLeadTeam');
  const routingSlaTag = wizardContainer.querySelector('#routingSlaTag');
  const consultationForm = wizardContainer.querySelector('#wizardFinalForm');

  function updateWizardUI() {
    // 1. Update Progress Bar & Steps
    const progressPct = ((state.step - 1) / 3) * 100;
    if (progressFill) progressFill.style.width = `${progressPct}%`;

    stepNodes.forEach((node, idx) => {
      const nodeStep = idx + 1;
      node.classList.remove('active', 'completed');
      if (nodeStep === state.step) {
        node.classList.add('active');
      } else if (nodeStep < state.step) {
        node.classList.add('completed');
      }
    });

    // 2. Show Active Pane
    stepPanes.forEach(pane => {
      const paneStep = parseInt(pane.getAttribute('data-step'), 10);
      if (paneStep === state.step) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // 3. Update Nav Buttons
    if (prevBtn) {
      prevBtn.style.visibility = (state.step === 1) ? 'hidden' : 'visible';
    }

    if (nextBtn) {
      if (state.step === 4) {
        nextBtn.style.display = 'none';
      } else {
        nextBtn.style.display = 'inline-flex';
        nextBtn.innerHTML = `Continue to Step ${state.step + 1} <i class="fas fa-arrow-right" style="margin-left: 6px;"></i>`;
      }
    }

    // 4. Update Smart Routing Lead Info (Step 4)
    if (state.step === 4) {
      const routeInfo = leadRoutingMap[state.challenge] || leadRoutingMap.vision;
      if (routingLeadName) routingLeadName.textContent = routeInfo.name;
      if (routingLeadTeam) routingLeadTeam.textContent = `${routeInfo.role} (${routeInfo.team})`;
      if (routingSlaTag) routingSlaTag.innerHTML = `<i class="fas fa-bolt"></i> ${routeInfo.sla}`;
    }
  }

  // Step 1: Challenge Selection
  challengeCards.forEach(card => {
    card.addEventListener('click', () => {
      challengeCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.challenge = card.getAttribute('data-challenge');
      state.challengeName = card.querySelector('h4').textContent;
    });
  });

  // Step 2: Tech Stack Multi-select Chips
  techChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      const val = chip.textContent.trim();
      if (chip.classList.contains('active')) {
        state.stack.add(val);
      } else {
        state.stack.delete(val);
      }
    });
  });

  // Step 2: Event Scale Selection
  scaleBoxes.forEach(box => {
    box.addEventListener('click', () => {
      scaleBoxes.forEach(b => b.classList.remove('selected'));
      box.classList.add('selected');
      state.scale = box.getAttribute('data-scale');
    });
  });

  // Step 3: SLA Selection
  slaBoxes.forEach(box => {
    box.addEventListener('click', () => {
      slaBoxes.forEach(b => b.classList.remove('selected'));
      box.classList.add('selected');
      state.sla = box.getAttribute('data-sla');
    });
  });

  // Step 3: Timeline Selection
  timelineBoxes.forEach(box => {
    box.addEventListener('click', () => {
      timelineBoxes.forEach(b => b.classList.remove('selected'));
      box.classList.add('selected');
      state.timeline = box.getAttribute('data-timeline');
    });
  });

  // Next / Prev Actions
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (state.step < 4) {
        state.step++;
        updateWizardUI();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (state.step > 1) {
        state.step--;
        updateWizardUI();
      }
    });
  }

  // Allow clicking on previous completed steps
  stepNodes.forEach((node, idx) => {
    node.addEventListener('click', () => {
      const targetStep = idx + 1;
      if (targetStep < state.step) {
        state.step = targetStep;
        updateWizardUI();
      }
    });
  });

  // Form Submission
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = consultationForm.querySelector('#wizardSubmitBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Encrypting & Routing to Lead Architect...';
      }

      const routeInfo = leadRoutingMap[state.challenge] || leadRoutingMap.vision;
      const userName = consultationForm.querySelector('#leadFullName').value || 'Executive';
      const userEmail = consultationForm.querySelector('#leadWorkEmail').value;
      const companyName = consultationForm.querySelector('#leadCompanyName').value || 'Enterprise Client';

      setTimeout(() => {
        const wizardBody = wizardContainer.querySelector('.wizard-card');
        wizardBody.innerHTML = `
          <div style="text-align: center; padding: 40px 20px;">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: rgba(16, 185, 129, 0.15); border: 2px solid #10b981; color: #10b981; font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
              <i class="fas fa-check"></i>
            </div>
            <div class="badge-pill" style="background: rgba(16, 185, 129, 0.15); color: #059669; border-color: #a7f3d0; margin-bottom: 12px;">
              Direct Dispatch Confirmed
            </div>
            <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--text-main); margin-bottom: 10px;">
              Consultation Routing Activated!
            </h2>
            <p style="color: var(--text-body); max-width: 600px; margin: 0 auto 24px; font-size: 0.96rem; line-height: 1.6;">
              Thank you, <strong>${userName}</strong>. Your technical dossier for <strong>${companyName}</strong> regarding <strong>${state.challengeName}</strong> has been assigned to:
            </p>

            <div style="background: #0f172a; border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 12px; max-width: 580px; margin: 0 auto 28px; padding: 20px; text-align: left; color: #fff;">
              <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <div style="width: 48px; height: 48px; border-radius: 50%; background: #1e293b; border: 2px solid #38bdf8; display: flex; align-items: center; justify-content: center; color: #38bdf8; font-size: 1.2rem;">
                  <i class="fas fa-user-tie"></i>
                </div>
                <div>
                  <div style="font-size: 1.05rem; font-weight: 700;">${routeInfo.name}</div>
                  <div style="font-size: 0.82rem; color: #38bdf8; font-family: 'JetBrains Mono', monospace;">${routeInfo.role}</div>
                </div>
              </div>
              <div style="font-size: 0.84rem; color: #cbd5e1; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <div>Target SLA: <span style="color: #34d399; font-weight: 600;">${state.sla}</span></div>
                <div>Timeline: <span style="color: #38bdf8; font-weight: 600;">${state.timeline}</span></div>
                <div>Volume Scale: <span style="color: #cbd5e1; font-weight: 600;">${state.scale}</span></div>
                <div>Security: <span style="color: #fbbf24; font-weight: 600;">Mutual NDA Prepared</span></div>
              </div>
            </div>

            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 24px;">
              A calendar briefing invite and pre-scoping architecture checklist have been dispatched to <strong>${userEmail}</strong>.
            </p>

            <a href="index.html" class="btn btn-primary btn-lg">Return to Homepage <i class="fas fa-arrow-right"></i></a>
          </div>
        `;
      }, 1200);
    });
  }

  updateWizardUI();
}

function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const caseCards = document.querySelectorAll('.portfolio-case-card');

  if (filterBtns.length === 0 || caseCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedFilter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      caseCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedFilter === 'all' || cardCategory === selectedFilter) {
          card.style.display = 'grid';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initIndustrySolutionsEngine() {
  const calcContainer = document.getElementById('solutionsSizingCalc');
  const sectorNavBtns = document.querySelectorAll('.solutions-nav-btn');

  // Sector quick navigation active indicator on scroll
  if (sectorNavBtns.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 180;
      sectorNavBtns.forEach(btn => {
        const targetId = btn.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            const top = targetEl.offsetTop;
            const height = targetEl.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              sectorNavBtns.forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
            }
          }
        }
      });
    });
  }

  if (!calcContainer) return;

  const sectorPills = calcContainer.querySelectorAll('.calc-sector-pill');
  const scaleSlider = calcContainer.querySelector('#calcScaleSlider');
  const scaleValLabel = calcContainer.querySelector('#calcScaleValLabel');
  const scaleUnitLabel = calcContainer.querySelector('#calcScaleUnitLabel');
  const outThroughput = calcContainer.querySelector('#calcOutThroughput');
  const outLatencyRed = calcContainer.querySelector('#calcOutLatencyRed');
  const outBlueprintTitle = calcContainer.querySelector('#calcOutBlueprintTitle');
  const outBlueprintStack = calcContainer.querySelector('#calcOutBlueprintStack');
  const outCompliance = calcContainer.querySelector('#calcOutCompliance');
  const outCtaBtn = calcContainer.querySelector('#calcOutCtaBtn');

  const sectorConfigs = {
    higherEd: {
      name: "Higher Education & Institutional Analytics",
      min: 5000,
      max: 100000,
      step: 5000,
      default: 25000,
      unit: "Enrolled Students & Faculty",
      throughputMultiplier: 32,
      latencyPct: "74%",
      blueprint: "AURA Campus Spatial Perception + Apache Iceberg Unified Lakehouse",
      stack: "Ray Clusters, PyTorch, Canvas/Banner API Mesh, FERPA Vault",
      compliance: "FERPA, SOC2 Type II, HEVCAT Tier 1 Ready",
      challengeParam: "higher-ed"
    },
    logistics: {
      name: "Enterprise Logistics & Real-Time Monitoring",
      min: 10000,
      max: 2000000,
      step: 50000,
      default: 250000,
      unit: "Daily Scanned Parcels / Telemetry Feeds",
      throughputMultiplier: 45,
      latencyPct: "88%",
      blueprint: "High-Speed YOLOv10-FP8 Edge Ingest + Flink Stream Mesh",
      stack: "NVIDIA Jetson AGX, Apache Kafka, RocksDB, Rust Edge Daemons",
      compliance: "ISO 27001, Industrial TAPA A, High-Availability SLA",
      challengeParam: "logistics"
    },
    ecommerce: {
      name: "Scalable E-Commerce & High-Concurrency Platforms",
      min: 50000,
      max: 5000000,
      step: 100000,
      default: 750000,
      unit: "Monthly Active Shoppers / Concurrency Peak",
      throughputMultiplier: 18,
      latencyPct: "73%",
      blueprint: "Distributed Go Order Queue + Qdrant Vector Embeddings Mesh",
      stack: "Golang Microservices, Redis Cluster, KEDA Autoscalers, EKS",
      compliance: "PCI-DSS Level 1, GDPR Compliant, 99.999% Checkout SLA",
      challengeParam: "ecommerce"
    }
  };

  let activeSector = 'higherEd';

  function updateCalculator() {
    const cfg = sectorConfigs[activeSector];
    if (!cfg || !scaleSlider) return;
    const val = parseInt(scaleSlider.value, 10);

    if (scaleValLabel) scaleValLabel.textContent = Number(val).toLocaleString();
    if (scaleUnitLabel) scaleUnitLabel.textContent = cfg.unit;

    // Real-time calculated metrics
    const totalThroughput = Math.round((val * cfg.throughputMultiplier) / 60);
    if (outThroughput) outThroughput.textContent = `${Number(totalThroughput).toLocaleString()} msg/sec`;
    if (outLatencyRed) outLatencyRed.textContent = `-${cfg.latencyPct}`;
    if (outBlueprintTitle) outBlueprintTitle.textContent = cfg.blueprint;
    if (outBlueprintStack) outBlueprintStack.textContent = cfg.stack;
    if (outCompliance) outCompliance.textContent = cfg.compliance;

    if (outCtaBtn) {
      outCtaBtn.setAttribute('href', `contact.html?challenge=${cfg.challengeParam}`);
      outCtaBtn.innerHTML = `Request Custom Blueprint for ${cfg.name.split('&')[0].trim()} <i class="fas fa-arrow-right" style="margin-left: 8px;"></i>`;
    }
  }

  sectorPills.forEach(pill => {
    pill.addEventListener('click', () => {
      sectorPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeSector = pill.getAttribute('data-sector');
      const cfg = sectorConfigs[activeSector];
      if (cfg && scaleSlider) {
        scaleSlider.min = cfg.min;
        scaleSlider.max = cfg.max;
        scaleSlider.step = cfg.step;
        scaleSlider.value = cfg.default;
        updateCalculator();
      }
    });
  });

  if (scaleSlider) {
    scaleSlider.addEventListener('input', updateCalculator);
  }

  updateCalculator();
}

// ==========================================================================
// 14. ENGINEERING INSIGHTS & BLOG ENGINE IMPLEMENTATION
// ==========================================================================
function initEngineeringInsightsEngine() {
  const searchInput = document.getElementById('insightsSearchInput');
  const filterBtns = document.querySelectorAll('.insights-filter-pills .filter-btn');
  const cards = document.querySelectorAll('.insight-card');
  const emptyState = document.getElementById('insightsEmptyState');
  const modalBackdrop = document.getElementById('insightModalBackdrop');
  const modalClose = document.getElementById('insightModalClose');
  const modalTitle = document.getElementById('insightModalTitle');
  const modalCategory = document.getElementById('insightModalCategory');
  const modalBody = document.getElementById('insightModalBody');
  const readDiveBtns = document.querySelectorAll('.btn-read-dive');

  if (cards.length === 0) return;

  const articleDetails = {
    'tensorrt-vit': {
      title: 'Optimizing Vision Transformers on Edge Hardware with NVIDIA TensorRT',
      category: 'Computer Vision & Edge AI',
      readTime: '7 min read',
      author: 'Dr. Marcus Vance',
      authorRole: 'Lead Computer Vision Architect',
      date: 'October 2026',
      content: `
        <h4>1. Executive Summary & Challenge</h4>
        <p>Deploying high-parameter Vision Transformers (ViTs such as ViT-Base and Swin-Transformer) to edge embedded hardware like the NVIDIA Jetson Orin has traditionally been hindered by quadratically scaling multi-head self-attention (MHSA) memory requirements and high FP32 memory bandwidth consumption. Conventional mobile inference frameworks exhibit severe thermal throttling and fail to maintain 30 FPS across multi-stream 4K camera feeds.</p>

        <h4>2. Optimization Architecture & Kernel Fusion</h4>
        <p>Our engineering pipeline implements custom CUDA kernels that fuse the Query-Key-Value (QKV) projection, scaled dot-product attention, and softmax operations into a single continuous GPU execution block. Furthermore, we leverage INT8 Post-Training Quantization (PTQ) using entropy calibration over representative edge industrial datasets.</p>

        <div class="code-terminal-block">
          <div class="code-terminal-header">
            <span><i class="fas fa-terminal"></i> tensorrt_vit_quantizer.py</span>
            <span>Python 3.12 / TensorRT 10.4</span>
          </div>
          <pre><code>import tensorrt as trt

def build_quantized_vit_engine(onnx_path, calib_dataset):
    logger = trt.Logger(trt.Logger.INFO)
    builder = trt.Builder(logger)
    config = builder.create_builder_config()
    
    # Enable INT8 and FP16 fallback precision modes
    config.set_flag(trt.BuilderFlag.INT8)
    config.set_flag(trt.BuilderFlag.FP16)
    
    # Configure custom entropy calibrator for attention matrices
    config.int8_calibrator = ViTEntropyCalibrator(calib_dataset)
    config.set_memory_pool_limit(trt.MemoryPoolType.WORKSPACE, 2 << 30) # 2GB
    
    # Fuse multi-head self-attention kernels into single memory-resident ops
    parser = trt.OnnxParser(builder.create_network(), logger)
    parser.parse_from_file(onnx_path)
    
    return builder.build_serialized_network(parser.network, config)</code></pre>
        </div>

        <h4>3. Benchmark Empirical Results (Jetson AGX Orin 64GB)</h4>
        <div style="overflow-x: auto; margin-top: 14px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-light); background: var(--bg-subtle);">
                <th style="padding: 10px;">Pipeline Configuration</th>
                <th style="padding: 10px;">Precision</th>
                <th style="padding: 10px;">Throughput (FPS)</th>
                <th style="padding: 10px;">P99 Latency</th>
                <th style="padding: 10px;">Top-1 Accuracy</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border-light);">
                <td style="padding: 10px;">PyTorch Native Baseline</td>
                <td style="padding: 10px;">FP32</td>
                <td style="padding: 10px;">16.4 FPS</td>
                <td style="padding: 10px;">61.2 ms</td>
                <td style="padding: 10px;">82.1%</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-light);">
                <td style="padding: 10px;">TensorRT Standard ONNX</td>
                <td style="padding: 10px;">FP16</td>
                <td style="padding: 10px;">39.8 FPS</td>
                <td style="padding: 10px;">25.1 ms</td>
                <td style="padding: 10px;">82.0%</td>
              </tr>
              <tr style="background: rgba(37, 99, 235, 0.05); font-weight: 700; color: var(--primary);">
                <td style="padding: 10px;">Zevionix TensorRT Engine + MHSA Fusion</td>
                <td style="padding: 10px;">INT8</td>
                <td style="padding: 10px;">68.5 FPS (4.2×)</td>
                <td style="padding: 10px;">14.6 ms</td>
                <td style="padding: 10px;">81.9% (-0.2%)</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    'clean-architecture': {
      title: 'Clean Architecture Patterns in High-Throughput Microservices',
      category: 'Distributed Systems & Architecture',
      readTime: '9 min read',
      author: 'Elena Rostova',
      authorRole: 'Principal Distributed Systems Architect',
      date: 'September 2026',
      content: `
        <h4>1. Architecture Dilemma: Purity vs. Raw Throughput</h4>
        <p>Architects frequently believe that strict Clean Architecture (Hexagonal / Ports and Adapters) causes unacceptable garbage collection pauses and CPU allocation overhead due to extensive interface indirection and domain-model cloning. When designing microservices handling 150,000+ requests per second, microsecond penalties accumulate rapidly into SLA violations.</p>

        <h4>2. Zero-Copy Hexagonal Implementation in Go</h4>
        <p>We present a zero-copy adapter pattern in Go that maintains strict boundary separation while avoiding object allocations in the hot path. By employing sync.Pool buffers, value-receiver domain interfaces, and memory-aligned struct layouts, our services achieve sub-millisecond serialization across gRPC and database persistence tiers.</p>

        <div class="code-terminal-block">
          <div class="code-terminal-header">
            <span><i class="fas fa-terminal"></i> domain_port.go</span>
            <span>Go 1.23 / High-Throughput Core</span>
          </div>
          <pre><code>package core

import "context"

// OrderProcessor enforces pure business logic without depending on transport or persistence
type OrderProcessor interface {
    Process(ctx context.Context, cmd IngestCommand) (*TransactionResult, error)
}

type OrderService struct {
    ledgerPort LedgerPort
    eventBus   EventPublisher
}

func (s *OrderService) Process(ctx context.Context, cmd IngestCommand) (*TransactionResult, error) {
    if err := cmd.Validate(); err != nil {
        return nil, ErrInvalidPayload
    }
    // Pure Domain execution with zero heap allocations on hot path
    result := AcquireTransactionResult()
    result.Execute(cmd)
    
    return result, s.ledgerPort.Commit(ctx, result)
}</code></pre>
        </div>

        <h4>3. Stress Test Benchmarks (k6 Cluster / 150,000 RPS)</h4>
        <p>Under simulated traffic surges of 150K RPS across a 6-node Kubernetes cluster, our zero-allocation Clean Architecture service delivered a P99 response time of 3.8ms with zero OOM crashes and less than 1.2% CPU spent on Go runtime GC cycles.</p>
      `
    },
    'spark-kafka-pipeline': {
      title: 'Building Resilient Real-Time Data Pipelines with Apache Spark & Kafka',
      category: 'Data Engineering & Streaming',
      readTime: '8 min read',
      author: 'Kieran Zhao',
      authorRole: 'Chief Data Architect',
      date: 'September 2026',
      content: `
        <h4>1. Problem Context: Petabyte-Scale Stream Congestion</h4>
        <p>Modern IoT networks and financial transaction logs produce millions of streaming events per second. Common architectural pitfalls such as consumer group lag, state store disk thrashing, and uncoordinated partition rebalancing cause cascade failures during unexpected ingestion spikes.</p>

        <h4>2. Structured Streaming with RocksDB & Delta Lake</h4>
        <p>By replacing the default JVM heap state store with an off-heap RocksDB state provider and configuring partition-aligned Kafka topics, we eliminate stop-the-world JVM GC pauses. We enforce write-ahead log idempotency with Delta Lake to guarantee strict exactly-once delivery semantics even during worker node preemption.</p>

        <div class="code-terminal-block">
          <div class="code-terminal-header">
            <span><i class="fas fa-terminal"></i> stream_pipeline.py</span>
            <span>PySpark 3.5 / Apache Kafka 3.8</span>
          </div>
          <pre><code>from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col

spark = SparkSession.builder \\
    .appName("Zevionix-Kafka-Spark-Lakehouse") \\
    .config("spark.sql.streaming.stateStore.providerClass", 
            "org.apache.spark.sql.execution.streaming.state.RocksDBStateStoreProvider") \\
    .config("spark.sql.streaming.forceDeleteTempCheckpointLocation", "true") \\
    .getOrCreate()

# Stream ingestion with exactly-once checkpointing
df_kafka = spark.readStream.format("kafka") \\
    .option("kafka.bootstrap.servers", "mesh-kafka.internal:9092") \\
    .option("subscribe", "telemetry.v1.events") \\
    .option("maxOffsetsPerTrigger", "250000") \\
    .load()

# Write into Delta Lake with ACID transactional commits
query = df_kafka.writeStream \\
    .format("delta") \\
    .outputMode("append") \\
    .option("checkpointLocation", "s3a://lakehouse-checkpoints/telemetry/") \\
    .start("s3a://lakehouse-data/telemetry_gold/")</code></pre>
        </div>

        <h4>3. Operational Reliability Metrics</h4>
        <p>The resulting architecture consistently processes 45M+ events per second with sub-second end-to-end sync, handling a complete broker failover within 4.2 seconds without data loss or duplicate transactions.</p>
      `
    },
    'aura-mesh-agents': {
      title: 'The Future of Autonomous Enterprise Agents (AURA Mesh)',
      category: 'Autonomous Agents & Mesh',
      readTime: '11 min read',
      author: 'Dr. Aris Thorne',
      authorRole: 'Head of Autonomous Research (AURA Core)',
      date: 'October 2026',
      content: `
        <h4>1. Paradigm Shift: Beyond Monolithic Chatbots</h4>
        <p>Enterprise AI is rapidly shifting from centralized monolithic LLM prompting toward decentralized, self-healing swarms of goal-oriented autonomous micro-agents. Traditional single-model architectures suffer from catastrophic context window forgetting, hallucinated API arguments, and dangerous security escalation risks.</p>

        <h4>2. AURA Mesh Zero-Trust Protocol</h4>
        <p>The Zevionix AURA Mesh protocol provisions isolated, specialized agent runtimes equipped with cryptographic identity keys (SPIFFE/mTLS). Agent decisions are verified through a Byzantine-fault-tolerant consensus mechanism before any real-world external mutations (such as deploying code, provisioning cloud instances, or approving multi-million-dollar purchase orders) are authorized.</p>

        <div class="code-terminal-block">
          <div class="code-terminal-header">
            <span><i class="fas fa-terminal"></i> aura_agent_mesh.proto</span>
            <span>Protobuf v3 / gRPC Swarm Protocol</span>
          </div>
          <pre><code>syntax = "proto3";
package zevionix.aura.mesh.v1;

service AutonomousAgentService {
    rpc ProposeAction (ActionProposal) returns (ConsensusReceipt);
    rpc SyncAgentState (AgentStateVector) returns (StateSyncAck);
}

message ActionProposal {
    string agent_uuid = 1;
    string task_context_hash = 2;
    string proposed_tool = 3;
    bytes cryptographic_signature = 4;
    repeated ParameterVerification parameters = 5;
}

message ConsensusReceipt {
    enum Status { VERIFIED = 0; REJECTED = 1; ESCALATED = 2; }
    Status status = 1;
    string consensus_quorum_id = 2;
    int64 timestamp_utc = 3;
}</code></pre>
        </div>

        <h4>3. Real-World Enterprise Impact</h4>
        <p>Deployments across Tier-1 enterprise customers demonstrate a 94% reduction in manual IT triage times, zero unverified state mutations, and transparent mathematical audit trails suitable for SOC2 Type II and FedRAMP compliance.</p>
      `
    }
  };

  // Filter functionality
  function filterArticles() {
    const activeBtn = document.querySelector('.insights-filter-pills .filter-btn.active');
    const category = activeBtn ? activeBtn.getAttribute('data-category') : 'all';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    let visibleCount = 0;

    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const title = (card.querySelector('.insight-card-title') || {}).textContent || '';
      const abstract = (card.querySelector('.insight-card-abstract') || {}).textContent || '';
      const tags = (card.querySelector('.insight-tags-list') || {}).textContent || '';

      const matchesCategory = category === 'all' || cardCategory === category;
      const matchesSearch = query === '' ||
        title.toLowerCase().includes(query) ||
        abstract.toLowerCase().includes(query) ||
        tags.toLowerCase().includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterArticles();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterArticles);
  }

  // Modal Technical Deep Dive Handlers
  readDiveBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const articleId = btn.getAttribute('data-article-id');
      const data = articleDetails[articleId];
      if (data && modalBackdrop) {
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalCategory) modalCategory.textContent = `${data.category} • ${data.readTime}`;
        if (modalBody) modalBody.innerHTML = data.content;
        modalBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

// ==========================================================================
// 15. INTERACTIVE AI NEURAL MESH & PARTICLE CANVAS ENGINE
// ==========================================================================
function initNeuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const section = canvas.closest('.hero-section') || canvas.parentElement;
  const statusTag = document.getElementById('neuralMeshIndicator');

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrameId = null;
  let isVisible = true;

  // Responsive configurations
  const isMobile = () => window.innerWidth < 768;
  const getNodeCount = () => (isMobile() ? 28 : 52);
  const maxDistance = () => (isMobile() ? 105 : 145);
  const interactionRadius = 175;

  // Zevionix Enterprise Palette
  const colors = {
    blueCore: { fill: '#2563eb', glow: 'rgba(37, 99, 235, 0.55)', border: '#1d4ed8' },
    violetEdge: { fill: '#7c3aed', glow: 'rgba(124, 58, 237, 0.55)', border: '#6d28d9' },
    cyanData: { fill: '#0284c7', glow: 'rgba(2, 132, 199, 0.5)', border: '#0369a1' }
  };

  // Pointer state for gravitation, deflection, and shockwaves
  const pointer = {
    x: null,
    y: null,
    targetX: null,
    targetY: null,
    isActive: false,
    clickPulse: { x: 0, y: 0, radius: 0, maxRadius: 220, active: false }
  };

  let nodes = [];
  let packets = [];

  class NeuralNode {
    constructor(id) {
      this.id = id;
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * width : (Math.random() < 0.5 ? -10 : width + 10);
      this.y = initial ? Math.random() * height : Math.random() * height;

      const rand = Math.random();
      if (rand < 0.16) {
        this.type = 'core'; // AI Core Cluster
        this.baseRadius = 4.2;
        this.colorObj = colors.blueCore;
        this.hasHalo = true;
        this.speedMultiplier = 0.45;
      } else if (rand < 0.45) {
        this.type = 'edge'; // Edge Vision Node
        this.baseRadius = 3.2;
        this.colorObj = colors.violetEdge;
        this.hasHalo = false;
        this.speedMultiplier = 0.7;
      } else {
        this.type = 'data'; // Data Flow Signal
        this.baseRadius = 2.2;
        this.colorObj = colors.cyanData;
        this.hasHalo = false;
        this.speedMultiplier = 0.95;
      }

      this.radius = this.baseRadius;
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.35 + Math.random() * 0.45) * this.speedMultiplier;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.baseVx = this.vx;
      this.baseVy = this.vy;

      this.pulsePhase = Math.random() * Math.PI * 2;
      this.pulseSpeed = 0.025 + Math.random() * 0.02;
      this.proximityGlow = 0;
    }

    update() {
      this.pulsePhase += this.pulseSpeed;

      // Mouse Gravitation & Dynamic Deflection
      if (pointer.isActive && pointer.x !== null && pointer.y !== null) {
        const dx = pointer.x - this.x;
        const dy = pointer.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < interactionRadius && dist > 1) {
          const force = (1 - dist / interactionRadius);
          this.proximityGlow = Math.min(1, this.proximityGlow + 0.1);

          // Combination of radial attraction and lateral swirl
          const normalX = dx / dist;
          const normalY = dy / dist;
          const tangentX = -normalY;
          const tangentY = normalX;

          const pullStrength = force * 0.4;
          const swirlStrength = force * 0.3;

          this.vx += (normalX * pullStrength + tangentX * swirlStrength) * 0.22;
          this.vy += (normalY * pullStrength + tangentY * swirlStrength) * 0.22;
        } else {
          this.proximityGlow = Math.max(0, this.proximityGlow - 0.03);
        }
      } else {
        this.proximityGlow = Math.max(0, this.proximityGlow - 0.03);
      }

      // Click shockwave repulsion
      if (pointer.clickPulse.active) {
        const cdx = this.x - pointer.clickPulse.x;
        const cdy = this.y - pointer.clickPulse.y;
        const cdist = Math.hypot(cdx, cdy);
        const ringDiff = Math.abs(cdist - pointer.clickPulse.radius);

        if (ringDiff < 40 && cdist > 1) {
          const push = (1 - ringDiff / 40) * 2.4;
          this.vx += (cdx / cdist) * push;
          this.vy += (cdy / cdist) * push;
          this.proximityGlow = 1;
        }
      }

      // Smooth damping back toward natural baseline velocity
      this.vx = this.vx * 0.96 + this.baseVx * 0.04;
      this.vy = this.vy * 0.96 + this.baseVy * 0.04;

      this.x += this.vx;
      this.y += this.vy;

      // Screen boundary wrapping with soft margin
      const pad = 25;
      if (this.x < -pad) this.x = width + pad;
      else if (this.x > width + pad) this.x = -pad;
      if (this.y < -pad) this.y = height + pad;
      else if (this.y > height + pad) this.y = -pad;
    }

    draw(ctx) {
      const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5;
      const currentRadius = this.baseRadius + (this.proximityGlow * 1.2) + (this.type === 'core' ? pulse * 0.8 : 0);

      // Pulse ring for AI Core clusters
      if (this.hasHalo) {
        ctx.save();
        ctx.beginPath();
        const haloR = currentRadius + 5 + pulse * 7;
        ctx.arc(this.x, this.y, haloR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(37, 99, 235, ${0.12 + pulse * 0.22})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // Glowing core aura
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = this.colorObj.fill;
      ctx.shadowColor = this.colorObj.glow;
      ctx.shadowBlur = 8 + this.proximityGlow * 10;
      ctx.fill();

      // Specular highlight for deep-tech glass effect
      if (this.type === 'core' || this.proximityGlow > 0.4) {
        ctx.beginPath();
        ctx.arc(this.x - currentRadius * 0.3, this.y - currentRadius * 0.3, currentRadius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fill();
      }
      ctx.restore();
    }
  }

  class DataPacket {
    constructor(sourceNode, targetNode) {
      this.source = sourceNode;
      this.target = targetNode;
      this.progress = 0;
      this.speed = 0.016 + Math.random() * 0.02;
      this.color = sourceNode.type === 'core' ? '#38bdf8' : '#a78bfa';
    }

    update() {
      this.progress += this.speed;
      return this.progress < 1;
    }

    draw(ctx) {
      const currentX = this.source.x + (this.target.x - this.source.x) * this.progress;
      const currentY = this.source.y + (this.target.y - this.source.y) * this.progress;

      ctx.save();
      ctx.beginPath();
      ctx.arc(currentX, currentY, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }
  }

  function resize() {
    const rect = section.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
    ctx.scale(dpr, dpr);

    const targetCount = getNodeCount();
    nodes = [];
    for (let i = 0; i < targetCount; i++) {
      nodes.push(new NeuralNode(i));
    }
    packets = [];

    if (statusTag) {
      const textSpan = statusTag.querySelector('span:last-child');
      if (textSpan) {
        textSpan.textContent = `Interactive AI Mesh: ${targetCount} Active Nodes • Touch or hover to route`;
      }
    }
  }

  // Pointer Event Listeners
  section.addEventListener('pointermove', (e) => {
    const rect = section.getBoundingClientRect();
    pointer.targetX = e.clientX - rect.left;
    pointer.targetY = e.clientY - rect.top;
    if (!pointer.isActive) {
      pointer.x = pointer.targetX;
      pointer.y = pointer.targetY;
    }
    pointer.isActive = true;

    if (statusTag) {
      const textSpan = statusTag.querySelector('span:last-child');
      if (textSpan && !textSpan.getAttribute('data-hovering')) {
        textSpan.setAttribute('data-hovering', 'true');
        textSpan.textContent = `Neural Mesh Controller Engaged • Re-routing data streams`;
      }
    }
  });

  section.addEventListener('pointerleave', () => {
    pointer.isActive = false;
    if (statusTag) {
      const textSpan = statusTag.querySelector('span:last-child');
      if (textSpan) {
        textSpan.removeAttribute('data-hovering');
        textSpan.textContent = `Interactive AI Mesh: ${nodes.length} Active Nodes • Touch or hover to route`;
      }
    }
  });

  section.addEventListener('click', (e) => {
    const rect = section.getBoundingClientRect();
    pointer.clickPulse.x = e.clientX - rect.left;
    pointer.clickPulse.y = e.clientY - rect.top;
    pointer.clickPulse.radius = 5;
    pointer.clickPulse.active = true;

    // Burst packets across adjacent nodes
    nodes.forEach(n => {
      const d = Math.hypot(n.x - pointer.clickPulse.x, n.y - pointer.clickPulse.y);
      if (d < 180 && Math.random() < 0.6) {
        const neighbor = nodes.find(other => other !== n && Math.hypot(other.x - n.x, other.y - n.y) < maxDistance());
        if (neighbor && packets.length < 18) {
          packets.push(new DataPacket(n, neighbor));
        }
      }
    });
  });

  section.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      const rect = section.getBoundingClientRect();
      pointer.targetX = e.touches[0].clientX - rect.left;
      pointer.targetY = e.touches[0].clientY - rect.top;
      pointer.isActive = true;
    }
  }, { passive: true });

  section.addEventListener('touchend', () => {
    pointer.isActive = false;
  });

  let lastPacketSpawn = 0;

  function render(timestamp) {
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);

    // Smooth pointer interpolation
    if (pointer.isActive && pointer.targetX !== null) {
      pointer.x += (pointer.targetX - pointer.x) * 0.2;
      pointer.y += (pointer.targetY - pointer.y) * 0.2;
    }

    // Click Shockwave Pulse
    if (pointer.clickPulse.active) {
      pointer.clickPulse.radius += 5.5;
      const alpha = Math.max(0, 1 - pointer.clickPulse.radius / pointer.clickPulse.maxRadius);

      ctx.save();
      ctx.beginPath();
      ctx.arc(pointer.clickPulse.x, pointer.clickPulse.y, pointer.clickPulse.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(37, 99, 235, ${alpha * 0.35})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      if (pointer.clickPulse.radius >= pointer.clickPulse.maxRadius) {
        pointer.clickPulse.active = false;
      }
    }

    // Update Nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
    }

    // Connect Neural Inter-Node Lines
    const maxDist = maxDistance();
    const maxDistSq = maxDist * maxDist;

    for (let i = 0; i < nodes.length; i++) {
      const n1 = nodes[i];

      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / maxDist) * 0.32;

          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();

          // Spawn traveling data packets
          if (timestamp - lastPacketSpawn > 300 && packets.length < 12 && Math.random() < 0.009) {
            packets.push(new DataPacket(n1, n2));
            lastPacketSpawn = timestamp;
          }
        }
      }

      // Connect Neural Lines to Active User Pointer
      if (pointer.isActive && pointer.x !== null && pointer.y !== null) {
        const pdx = pointer.x - n1.x;
        const pdy = pointer.y - n1.y;
        const pDistSq = pdx * pdx + pdy * pdy;
        const pMaxSq = interactionRadius * interactionRadius;

        if (pDistSq < pMaxSq) {
          const pDist = Math.sqrt(pDistSq);
          const pAlpha = (1 - pDist / interactionRadius) * 0.65;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.strokeStyle = `rgba(124, 58, 237, ${pAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.shadowColor = 'rgba(124, 58, 237, 0.45)';
          ctx.shadowBlur = 6;
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    // Update & Draw Packets
    for (let k = packets.length - 1; k >= 0; k--) {
      const packet = packets[k];
      if (packet.update()) {
        packet.draw(ctx);
      } else {
        packets.splice(k, 1);
      }
    }

    // Draw Nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].draw(ctx);
    }

    // Draw Pointer Control Reticle when hovering
    if (pointer.isActive && pointer.x !== null && pointer.y !== null) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#2563eb';
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // Debounced Resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 150);
  });

  // IntersectionObserver for 0% CPU waste when scrolled past hero
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            animationFrameId = requestAnimationFrame(render);
          }
        } else {
          isVisible = false;
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      });
    }, { threshold: 0.05 });

    observer.observe(section);
  }

  // Start
  resize();
  animationFrameId = requestAnimationFrame(render);
}

// ==========================================================================
// 16. LIVE AURA COMPUTER VISION FEED HUD ENGINE
// ==========================================================================
function initAuraHudMockup() {
  const hudContainer = document.getElementById('auraHudContainer');
  if (!hudContainer) return;

  // Header & Telemetry Elements
  const clockEl = document.getElementById('hudLiveClock');
  const streamTitle = document.getElementById('hudStreamTitle');
  const hudProtocol = document.getElementById('hudProtocol');
  const hudSourceVal = document.getElementById('hudSourceVal');
  const fpsVal = document.getElementById('hudFpsVal');
  const latencyVal = document.getElementById('hudLatencyVal');
  const globalStatus = document.getElementById('hudGlobalStatus');

  // Video / Viewport Elements
  const hudViewport = document.getElementById('auraHudViewport');
  const staticImg = document.getElementById('hudStaticImg');
  const webcamVideo = document.getElementById('hudWebcamVideo');
  const webcamNotice = document.getElementById('hudWebcamNotice');
  const webcamNoticeText = document.getElementById('hudWebcamNoticeText');
  const hudNoticeIcon = document.getElementById('hudNoticeIcon');
  const hudNoticeClose = document.getElementById('hudNoticeClose');
  const faceMeshPoints = document.getElementById('faceMeshPoints');

  // Dual Screen Console Elements
  const auraInferenceViewport = document.getElementById('auraInferenceViewport');
  const inferenceStaticImg = document.getElementById('inferenceStaticImg');
  const auraTwinCanvas = document.getElementById('auraTwinCanvas');
  const cameraCleanBadge = document.getElementById('cameraCleanBadge');
  const twinTelemetryBadge = document.getElementById('twinTelemetryBadge');
  const cameraBoxPill = document.getElementById('cameraBoxPill');
  const perceptionBoxPill = document.getElementById('perceptionBoxPill');
  let twinCanvasCtx = null;

  // Live Motion Tracking Badges & Strips
  const hudMotionBadge = document.getElementById('hudMotionBadge');
  const hudMotionDot = document.getElementById('hudMotionDot');
  const hudMotionBadgeText = document.getElementById('hudMotionBadgeText');
  const hudMovementStrip = document.getElementById('hudMovementStrip');
  const hudMotionState = document.getElementById('hudMotionState');
  const hudMotionVelocity = document.getElementById('hudMotionVelocity');
  const hudMotionStability = document.getElementById('hudMotionStability');
  const btnGenMovementReport = document.getElementById('btnGenMovementReport');

  // Report Modal Elements
  const movementReportModalOverlay = document.getElementById('movementReportModalOverlay');
  const movementReportModalClose = document.getElementById('movementReportModalClose');
  const movementReportModalDismiss = document.getElementById('movementReportModalDismiss');
  const btnExportJsonReport = document.getElementById('btnExportJsonReport');
  const btnPrintReport = document.getElementById('btnPrintReport');
  const repKpiDuration = document.getElementById('repKpiDuration');
  const repKpiEvents = document.getElementById('repKpiEvents');
  const repKpiEventSub = document.getElementById('repKpiEventSub');
  const repKpiPeakVel = document.getElementById('repKpiPeakVel');
  const repKpiAvgVel = document.getElementById('repKpiAvgVel');
  const repKpiStability = document.getElementById('repKpiStability');
  const distSummaryText = document.getElementById('distSummaryText');
  const distBarStable = document.getElementById('distBarStable');
  const distBarLateral = document.getElementById('distBarLateral');
  const distBarAxial = document.getElementById('distBarAxial');
  const reportTableBody = document.getElementById('reportTableBody');
  const reportModalSubtitle = document.getElementById('reportModalSubtitle');

  // Bounding Boxes
  const bbox1 = document.getElementById('bbox1');
  const bbox1Text = document.getElementById('bbox1Text');
  const bbox1Sub = document.getElementById('bbox1Sub');

  const bbox2 = document.getElementById('bbox2');
  const bbox2Text = document.getElementById('bbox2Text');
  const bbox2Sub = document.getElementById('bbox2Sub');

  const bbox3 = document.getElementById('bbox3');
  const bbox3Text = document.getElementById('bbox3Text');
  const bbox3Sub = document.getElementById('bbox3Sub');

  // Control Buttons
  const btnCampus = document.getElementById('hudBtnCampus');
  const btnQa = document.getElementById('hudBtnQa');
  const btnAlert = document.getElementById('hudBtnAlert');
  const btnWebcam = document.getElementById('hudBtnWebcam');
  const allBtns = [btnCampus, btnQa, btnAlert, btnWebcam].filter(Boolean);

  // Privacy Modal Elements
  const privacyModalTrigger = document.getElementById('privacyModalTrigger');
  const privacyModalOverlay = document.getElementById('privacyModalOverlay');
  const privacyModalClose = document.getElementById('privacyModalClose');
  const privacyModalOk = document.getElementById('privacyModalOk');

  // Internal State & Motion Analytics Store
  let webcamStream = null;
  let perceptionAnimId = null;
  let noticeTimer = null;
  let alertTimer = null;
  let currentScenario = 'campus';
  let offscreenCanvas = null;
  let offscreenCtx = null;

  const motionTracker = {
    sessionStartTime: 0,
    events: [],
    prevLuminance: null,
    lastLogTimestamp: 0,
    peakVelocity: 0,
    velocities: [],
    counts: { stable: 1, lateral: 0, axial: 0 },
    currentVelocity: 0,
    currentDirection: 'STATIONARY FOCUS',
    lastCentroidX: 32,
    lastCentroidY: 18,
    sessionId: 'AURA-MV-' + Math.floor(1000 + Math.random() * 9000)
  };

  // Smoothing & Dynamic Physics Coordinates for Multi-Box Tracking
  const trackingState = {
    userX: 50,
    userY: 34,
    userTargetX: 50,
    userTargetY: 34,
    scale: 1.0,
    targetScale: 1.0,
    torsoW: 38,
    torsoH: 64,
    faceW: 18,
    faceH: 24,
    localW: 46,
    localH: 14,
    time: 0,
    lastAnalysis: 0
  };

  // 1. Live UTC Timecode Clock
  function updateLiveClock() {
    if (!clockEl) return;
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const yyyy = now.getUTCFullYear();
    const mm = pad(now.getUTCMonth() + 1);
    const dd = pad(now.getUTCDate());
    const hh = pad(now.getUTCHours());
    const min = pad(now.getUTCMinutes());
    const ss = pad(now.getUTCSeconds());
    clockEl.textContent = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss} UTC`;
  }
  setInterval(updateLiveClock, 1000);
  updateLiveClock();

  // 2. Dynamic Realistic Telemetry Jitter
  setInterval(() => {
    if (currentScenario === 'alert') return;

    // Dynamic FPS counter ~60 FPS
    if (fpsVal) {
      const baseFps = currentScenario === 'webcam' ? 60.0 : 59.9;
      const fps = (baseFps + (Math.random() - 0.45) * 0.5).toFixed(1);
      fpsVal.innerHTML = `<span class="hud-mini-dot"></span> ${fps}`;
    }

    // Sub-15ms inference latency on live webcam
    if (latencyVal) {
      if (currentScenario === 'webcam') {
        const lat = Math.floor(8 + Math.random() * 5); // 8ms to 12ms (sub-15ms)
        latencyVal.textContent = `${lat}ms`;
      } else if (currentScenario === 'campus') {
        const lat = Math.floor(13 + Math.random() * 2);
        latencyVal.textContent = `${lat}ms`;
      } else if (currentScenario === 'qa') {
        const lat = Math.floor(10 + Math.random() * 2);
        latencyVal.textContent = `${lat}ms`;
      }
    }

    // Micro confidence fluctuation
    if (bbox1Text && currentScenario === 'campus') {
      const conf = (98.2 + Math.random() * 0.5).toFixed(1);
      bbox1Text.textContent = `[OBJECT: PASSENGER | CONFIDENCE: ${conf}%]`;
    } else if (bbox1Text && currentScenario === 'webcam') {
      const conf = (99.2 + Math.random() * 0.5).toFixed(1);
      bbox1Text.textContent = `[OBJECT: OPERATOR | CONFIDENCE: ${conf}%]`;
    }
  }, 1600);

  // 3. Notice Banner Helper
  function showNotice(msg, isError = false, iconClass = 'fas fa-info-circle') {
    if (!webcamNotice) return;
    if (noticeTimer) clearTimeout(noticeTimer);
    webcamNotice.style.display = 'flex';
    if (webcamNoticeText) webcamNoticeText.textContent = msg;
    if (hudNoticeIcon) hudNoticeIcon.className = iconClass;
    webcamNotice.style.background = isError ? 'rgba(220, 38, 38, 0.95)' : 'rgba(15, 23, 42, 0.94)';
    noticeTimer = setTimeout(() => {
      if (webcamNotice) webcamNotice.style.display = 'none';
    }, isError ? 6500 : 4000);
  }

  if (hudNoticeClose) {
    hudNoticeClose.addEventListener('click', (e) => {
      e.stopPropagation();
      if (webcamNotice) webcamNotice.style.display = 'none';
      if (noticeTimer) clearTimeout(noticeTimer);
    });
  }

  // 4. Privacy Modal Dialog Controller
  function openPrivacyModal() {
    if (privacyModalOverlay) privacyModalOverlay.style.display = 'flex';
  }

  function closePrivacyModal() {
    if (privacyModalOverlay) privacyModalOverlay.style.display = 'none';
  }

  if (privacyModalTrigger) privacyModalTrigger.addEventListener('click', openPrivacyModal);
  if (privacyModalClose) privacyModalClose.addEventListener('click', closePrivacyModal);
  if (privacyModalOk) privacyModalOk.addEventListener('click', closePrivacyModal);
  if (privacyModalOverlay) {
    privacyModalOverlay.addEventListener('click', (e) => {
      if (e.target === privacyModalOverlay) closePrivacyModal();
    });
  }

  // 5. Movement Logging & Report Helpers
  function formatTrackingTime(ms) {
    const totalSec = Math.floor(Math.max(0, ms) / 1000);
    const min = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const sec = String(totalSec % 60).padStart(2, '0');
    return `${min}:${sec}`;
  }

  function logMotionEvent(classification, details, velStr, confStr) {
    const elapsed = motionTracker.sessionStartTime ? (Date.now() - motionTracker.sessionStartTime) : 0;
    const timeStr = formatTrackingTime(elapsed);
    const eventItem = {
      time: timeStr,
      classification: classification,
      details: details,
      velocity: velStr,
      confidence: confStr
    };
    motionTracker.events.unshift(eventItem);
    if (motionTracker.events.length > 50) {
      motionTracker.events.pop();
    }
  }

  function openMovementReportModal() {
    if (!movementReportModalOverlay) return;

    const elapsedMs = motionTracker.sessionStartTime ? (Date.now() - motionTracker.sessionStartTime) : 0;
    const durationStr = formatTrackingTime(elapsedMs);

    if (reportModalSubtitle) {
      reportModalSubtitle.textContent = `SESSION: ${motionTracker.sessionId} • TIME: ${new Date().toISOString().substring(11, 19)} UTC`;
    }

    if (repKpiDuration) repKpiDuration.textContent = durationStr;
    if (repKpiEvents) repKpiEvents.textContent = String(motionTracker.events.length);
    if (repKpiEventSub) repKpiEventSub.textContent = `${motionTracker.events.length} Spatial Actions`;
    if (repKpiPeakVel) repKpiPeakVel.textContent = `${motionTracker.peakVelocity.toFixed(2)} m/s`;

    // Compute average velocity
    const avgVel = motionTracker.velocities.length > 0 
      ? (motionTracker.velocities.reduce((a, b) => a + b, 0) / motionTracker.velocities.length) 
      : 0.12;
    if (repKpiAvgVel) repKpiAvgVel.textContent = `Mean: ${avgVel.toFixed(2)} m/s`;

    // Compute distribution percentages
    const totalSamples = motionTracker.counts.stable + motionTracker.counts.lateral + motionTracker.counts.axial;
    const stablePct = totalSamples > 0 ? Math.round((motionTracker.counts.stable / totalSamples) * 100) : 75;
    const lateralPct = totalSamples > 0 ? Math.round((motionTracker.counts.lateral / totalSamples) * 100) : 18;
    const axialPct = Math.max(0, 100 - stablePct - lateralPct);

    const stabilityScore = Math.max(88, Math.min(99.9, stablePct + 10));
    if (repKpiStability) repKpiStability.textContent = `${stabilityScore.toFixed(1)}%`;

    if (distSummaryText) distSummaryText.textContent = `${stablePct}% FOCUSED • ${lateralPct + axialPct}% DYNAMIC`;
    if (distBarStable) distBarStable.style.width = `${stablePct}%`;
    if (distBarLateral) distBarLateral.style.width = `${lateralPct}%`;
    if (distBarAxial) distBarAxial.style.width = `${axialPct}%`;

    // Render event table rows
    if (reportTableBody) {
      if (motionTracker.events.length === 0) {
        reportTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #94a3b8; padding: 16px;">No movement events logged yet.</td></tr>`;
      } else {
        reportTableBody.innerHTML = motionTracker.events.map(ev => {
          let badgeClass = 'stable';
          if (ev.classification.includes('LATERAL') || ev.classification.includes('SHIFT')) {
            badgeClass = 'lateral';
          } else if (ev.classification.includes('RAPID') || ev.classification.includes('ACCELERATION')) {
            badgeClass = 'rapid';
          }
          return `
            <tr>
              <td style="font-weight: 700; color: #0284c7;">${ev.time}</td>
              <td><span class="badge-log ${badgeClass}">${ev.classification}</span></td>
              <td style="color: #475569;">${ev.details}</td>
              <td style="font-weight: 600;">${ev.velocity}</td>
              <td style="color: #059669; font-weight: 700;">${ev.confidence}</td>
            </tr>
          `;
        }).join('');
      }
    }

    movementReportModalOverlay.style.display = 'flex';
  }

  function closeMovementReportModal() {
    if (movementReportModalOverlay) movementReportModalOverlay.style.display = 'none';
  }

  function exportJsonReport() {
    const elapsedMs = motionTracker.sessionStartTime ? (Date.now() - motionTracker.sessionStartTime) : 0;
    const avgVel = motionTracker.velocities.length > 0 
      ? (motionTracker.velocities.reduce((a, b) => a + b, 0) / motionTracker.velocities.length) 
      : 0.12;
    const totalSamples = motionTracker.counts.stable + motionTracker.counts.lateral + motionTracker.counts.axial;
    const stablePct = totalSamples > 0 ? Math.round((motionTracker.counts.stable / totalSamples) * 100) : 75;
    const lateralPct = totalSamples > 0 ? Math.round((motionTracker.counts.lateral / totalSamples) * 100) : 18;
    const axialPct = Math.max(0, 100 - stablePct - lateralPct);

    const reportData = {
      session_id: motionTracker.sessionId,
      system: "Zevionix AURA Autonomous Vision Perception Core",
      protocol: "Air-Gapped Local WebRTC Ingest",
      timestamp_utc: new Date().toISOString(),
      duration_seconds: Math.floor(elapsedMs / 1000),
      duration_formatted: formatTrackingTime(elapsedMs),
      kpi_metrics: {
        movement_events_count: motionTracker.events.length,
        peak_velocity_mps: Number(motionTracker.peakVelocity.toFixed(2)),
        mean_velocity_mps: Number(avgVel.toFixed(2)),
        operator_stability_score: `${(Math.max(88, Math.min(99.9, stablePct + 10))).toFixed(1)}%`
      },
      profile_distribution: {
        steady_fixation_pct: stablePct,
        lateral_repositioning_pct: lateralPct,
        proximity_axial_shift_pct: axialPct
      },
      audit_events: motionTracker.events
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aura-movement-audit-${motionTracker.sessionId.toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  if (btnGenMovementReport) btnGenMovementReport.addEventListener('click', openMovementReportModal);
  if (movementReportModalClose) movementReportModalClose.addEventListener('click', closeMovementReportModal);
  if (movementReportModalDismiss) movementReportModalDismiss.addEventListener('click', closeMovementReportModal);
  if (btnExportJsonReport) btnExportJsonReport.addEventListener('click', exportJsonReport);
  if (btnPrintReport) btnPrintReport.addEventListener('click', () => window.print());

  if (movementReportModalOverlay) {
    movementReportModalOverlay.addEventListener('click', (e) => {
      if (e.target === movementReportModalOverlay) closeMovementReportModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (privacyModalOverlay && privacyModalOverlay.style.display === 'flex') closePrivacyModal();
      if (movementReportModalOverlay && movementReportModalOverlay.style.display === 'flex') closeMovementReportModal();
    }
  });

  // 6. Gracefully Stop Webcam Tracks & Reset Viewport
  function stopWebcam() {
    if (hudViewport) {
      hudViewport.classList.remove('webcam-tracking-active');
      hudViewport.classList.remove('camera-clean-feed');
    }
    if (auraInferenceViewport) {
      auraInferenceViewport.classList.remove('webcam-tracking-active');
    }
    if (cameraCleanBadge) {
      cameraCleanBadge.style.display = 'none';
    }
    if (twinTelemetryBadge) {
      twinTelemetryBadge.style.display = 'none';
    }
    if (cameraBoxPill) {
      cameraBoxPill.innerHTML = '<i class="fas fa-eye-slash"></i> CLEAN FEED (UNCLUTTERED)';
    }
    if (perceptionBoxPill) {
      perceptionBoxPill.innerHTML = '<i class="fas fa-microchip"></i> REAL-TIME RESPONSE';
    }
    if (inferenceStaticImg) {
      inferenceStaticImg.style.display = 'block';
    }
    if (twinCanvasCtx && auraTwinCanvas) {
      twinCanvasCtx.clearRect(0, 0, auraTwinCanvas.width, auraTwinCanvas.height);
    }
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => {
        try { track.stop(); } catch (e) { console.warn(e); }
      });
      webcamStream = null;
    }
    if (webcamVideo) {
      try { webcamVideo.pause(); } catch (e) {}
      webcamVideo.srcObject = null;
      webcamVideo.style.display = 'none';
    }
    if (staticImg) {
      staticImg.style.display = 'block';
    }
    if (perceptionAnimId) {
      cancelAnimationFrame(perceptionAnimId);
      perceptionAnimId = null;
    }
    if (faceMeshPoints) {
      faceMeshPoints.style.display = 'none';
    }
    if (hudMotionBadge) {
      hudMotionBadge.style.display = 'none';
    }
    if (hudMovementStrip) {
      hudMovementStrip.style.display = 'none';
    }
    if (btnWebcam) {
      btnWebcam.classList.remove('active');
      btnWebcam.innerHTML = '<i class="fas fa-camera"></i> Live Webcam';
    }
  }

  // 7. Dynamic Real-Time Bounding Box & Motion Perception Engine
  function startPerceptionEngine() {
    if (perceptionAnimId) cancelAnimationFrame(perceptionAnimId);

    // Setup offscreen canvas for lightweight optical motion differencing & presence tracking
    const CV_WIDTH = 80;
    const CV_HEIGHT = 45;
    if (!offscreenCanvas) {
      offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = CV_WIDTH;
      offscreenCanvas.height = CV_HEIGHT;
      offscreenCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true });
    }

    // Setup Box 2 Digital Twin Canvas
    if (auraTwinCanvas) {
      auraTwinCanvas.width = 640;
      auraTwinCanvas.height = 360;
      twinCanvasCtx = auraTwinCanvas.getContext('2d');
    }

    trackingState.userX = 50;
    trackingState.userY = 34;
    trackingState.userTargetX = 50;
    trackingState.userTargetY = 34;
    trackingState.scale = 1.0;
    trackingState.targetScale = 1.0;
    trackingState.time = performance.now();
    trackingState.lastAnalysis = 0;
    motionTracker.prevLuminance = null;

    function renderPerception(now) {
      if (currentScenario !== 'webcam') return;

      const elapsed = now - trackingState.time;

      // Periodic optical sampling from video stream (~40ms intervals / 25 FPS motion analysis)
      if (now - trackingState.lastAnalysis > 40 && webcamVideo && webcamVideo.readyState >= 2) {
        trackingState.lastAnalysis = now;
        try {
          if (offscreenCtx) {
            offscreenCtx.drawImage(webcamVideo, 0, 0, CV_WIDTH, CV_HEIGHT);
            const imgData = offscreenCtx.getImageData(0, 0, CV_WIDTH, CV_HEIGHT).data;
            const currLuminance = new Uint8Array(CV_WIDTH * CV_HEIGHT);

            let movedPixelsCount = 0;
            let sumMovedX = 0;
            let sumMovedY = 0;

            let skinPixelsCount = 0;
            let sumSkinX = 0;
            let sumSkinY = 0;

            let sumSilhX = 0;
            let sumSilhY = 0;
            let totalSilhWeight = 0;

            for (let y = 0; y < CV_HEIGHT; y++) {
              for (let x = 0; x < CV_WIDTH; x++) {
                const idx = (y * CV_WIDTH + x) * 4;
                const r = imgData[idx];
                const g = imgData[idx + 1];
                const b = imgData[idx + 2];
                // Quick integer luminance
                const lum = (r * 77 + g * 150 + b * 29) >> 8;
                currLuminance[y * CV_WIDTH + x] = lum;

                // Frame-to-frame optical motion differencing
                if (motionTracker.prevLuminance) {
                  const diff = Math.abs(lum - motionTracker.prevLuminance[y * CV_WIDTH + x]);
                  if (diff > 14) {
                    movedPixelsCount++;
                    sumMovedX += x;
                    sumMovedY += y;
                  }
                }

                // Skin chrominance detection (robust across webcam lighting & skin tones)
                const isSkin = (r > 50 && g > 30 && b > 20 && r > g && r > b && (r - g) > 8 && (r - g) < 135 && (r - b) > 8);
                if (isSkin) {
                  skinPixelsCount++;
                  // Prioritize upper 75% for face/head
                  const weight = y < 32 ? 1.5 : 0.8;
                  sumSkinX += x * weight;
                  sumSkinY += y * weight;
                }

                // Silhouette centroid weighting (upper 75% of frame)
                if (y < 34 && x > 4 && x < CV_WIDTH - 4) {
                  const silhWeight = Math.abs(lum - 128) + 10;
                  sumSilhX += x * silhWeight;
                  sumSilhY += y * silhWeight;
                  totalSilhWeight += silhWeight;
                }
              }
            }

            // Real-time Motion Analysis & Classification
            if (motionTracker.prevLuminance) {
              const motionRatio = movedPixelsCount / (CV_WIDTH * CV_HEIGHT);

              if (movedPixelsCount > 18) {
                const motionCentroidX = sumMovedX / movedPixelsCount;
                const motionCentroidY = sumMovedY / movedPixelsCount;
                // Note: video is horizontally mirrored (scaleX(-1)), so deltaScreenX = -deltaRawX
                const deltaRawX = motionCentroidX - motionTracker.lastCentroidX;
                const deltaY = motionCentroidY - motionTracker.lastCentroidY;
                const deltaX = -deltaRawX; // User mirrored perspective

                motionTracker.lastCentroidX = motionCentroidX;
                motionTracker.lastCentroidY = motionCentroidY;

                const displacement = Math.hypot(deltaX, deltaY);
                const vel = Math.min(1.4, Math.max(0.06, (displacement * 0.09) + (motionRatio * 1.2)));
                motionTracker.currentVelocity = vel;
                if (vel > motionTracker.peakVelocity) motionTracker.peakVelocity = vel;
                motionTracker.velocities.push(vel);

                let direction = 'LATERAL MOTION';
                if (deltaX > 1.6) {
                  direction = 'LATERAL SHIFT (RIGHT)';
                  motionTracker.counts.lateral++;
                } else if (deltaX < -1.6) {
                  direction = 'LATERAL SHIFT (LEFT)';
                  motionTracker.counts.lateral++;
                } else if (deltaY < -1.4) {
                  direction = 'PROXIMITY ADVANCE (APPROACH)';
                  motionTracker.counts.axial++;
                } else if (deltaY > 1.4) {
                  direction = 'PROXIMITY RECEDE (BACK)';
                  motionTracker.counts.axial++;
                } else if (vel > 0.40) {
                  direction = 'RAPID REPOSITIONING';
                  motionTracker.counts.lateral++;
                } else {
                  direction = 'MICRO POSTURE SHIFT';
                  motionTracker.counts.stable++;
                }

                motionTracker.currentDirection = direction;

                // Log distinct movement events (debounced > 1.2s)
                if (vel > 0.16 && (now - motionTracker.lastLogTimestamp > 1200)) {
                  motionTracker.lastLogTimestamp = now;
                  logMotionEvent(direction, `Displacement dx: ${deltaX.toFixed(1)}px, dy: ${deltaY.toFixed(1)}px (Active area: ${(motionRatio * 100).toFixed(0)}%)`, `${vel.toFixed(2)} m/s`, '99.2%');
                }

                // Update HUD Motion Elements
                if (hudMotionState) hudMotionState.textContent = direction;
                if (hudMotionVelocity) hudMotionVelocity.textContent = `${vel.toFixed(2)} m/s`;
                if (hudMotionBadgeText) hudMotionBadgeText.textContent = `${direction} • ${vel.toFixed(2)} m/s`;
                if (hudMotionDot) hudMotionDot.classList.add('active-motion');
              } else {
                // Stationary Focus State
                const subtleVel = 0.02 + Math.random() * 0.02;
                motionTracker.currentVelocity = subtleVel;
                motionTracker.currentDirection = 'STATIONARY FOCUS';
                motionTracker.counts.stable++;

                if (hudMotionState) hudMotionState.textContent = 'STATIONARY FOCUS';
                if (hudMotionVelocity) hudMotionVelocity.textContent = `${subtleVel.toFixed(2)} m/s`;
                if (hudMotionBadgeText) hudMotionBadgeText.textContent = `STATIONARY FOCUS • ${subtleVel.toFixed(2)} m/s`;
                if (hudMotionDot) hudMotionDot.classList.remove('active-motion');
              }

              // Update Stability Gauge
              const totalSamples = motionTracker.counts.stable + motionTracker.counts.lateral + motionTracker.counts.axial;
              const stability = totalSamples > 0 ? ((motionTracker.counts.stable / totalSamples) * 100) : 98.4;
              if (hudMotionStability) hudMotionStability.textContent = `${(Math.max(88, Math.min(99.9, stability + 10))).toFixed(1)}%`;
            }

            // Real-Time Coordinate Targeting (All 3 Bounding Boxes Follow User Movement)
            let rawTargetX = CV_WIDTH / 2;
            let rawTargetY = CV_HEIGHT / 2.8;
            let hasDetection = false;

            if (movedPixelsCount > 20 && skinPixelsCount > 15) {
              const moveX = sumMovedX / movedPixelsCount;
              const moveY = sumMovedY / movedPixelsCount;
              const skinX = sumSkinX / (skinPixelsCount * 1.15);
              const skinY = sumSkinY / (skinPixelsCount * 1.15);
              rawTargetX = moveX * 0.65 + skinX * 0.35;
              rawTargetY = moveY * 0.55 + skinY * 0.45;
              hasDetection = true;
            } else if (movedPixelsCount > 22) {
              rawTargetX = sumMovedX / movedPixelsCount;
              rawTargetY = sumMovedY / movedPixelsCount;
              hasDetection = true;
            } else if (skinPixelsCount > 20) {
              rawTargetX = sumSkinX / (skinPixelsCount * 1.15);
              rawTargetY = sumSkinY / (skinPixelsCount * 1.15);
              hasDetection = true;
            } else if (totalSilhWeight > 0) {
              rawTargetX = sumSilhX / totalSilhWeight;
              rawTargetY = sumSilhY / totalSilhWeight;
              hasDetection = true;
            }

            if (hasDetection) {
              // Video is horizontally mirrored with CSS scaleX(-1), invert raw X for user screen
              const screenPercentX = (1 - (rawTargetX / CV_WIDTH)) * 100;
              const screenPercentY = (rawTargetY / CV_HEIGHT) * 100;

              // Responsive target bounds centered on user's actual body across viewport width
              trackingState.userTargetX = Math.max(18, Math.min(82, screenPercentX));
              trackingState.userTargetY = Math.max(16, Math.min(50, screenPercentY));

              // Distance / proximity scale
              const activeCount = Math.max(movedPixelsCount, skinPixelsCount);
              const areaRatio = activeCount / (CV_WIDTH * CV_HEIGHT);
              const targetScale = Math.max(0.85, Math.min(1.30, 0.90 + (areaRatio - 0.08) * 1.6));
              trackingState.targetScale = targetScale;
            }

            motionTracker.prevLuminance = currLuminance;
          }
        } catch (e) {
          // Graceful fallback
        }
      }

      // Organic micro-breathing harmonics for sub-millimeter realism
      const swayX = Math.sin(elapsed * 0.0018) * 0.6;
      const swayY = Math.cos(elapsed * 0.0024) * 0.4;

      // Real-Time 60FPS Linear Interpolation (Kinematic follow)
      const lerpSpeed = 0.14;
      trackingState.userX += (trackingState.userTargetX - trackingState.userX) * lerpSpeed;
      trackingState.userY += (trackingState.userTargetY - trackingState.userY) * lerpSpeed;
      trackingState.scale += (trackingState.targetScale - trackingState.scale) * 0.08;

      const curX = trackingState.userX + swayX;
      const curY = trackingState.userY + swayY;
      const s = trackingState.scale;

      // Render Dynamic Operator Digital Twin onto Box 2 Canvas
      if (twinCanvasCtx && auraTwinCanvas) {
        const cw = auraTwinCanvas.width;
        const ch = auraTwinCanvas.height;
        twinCanvasCtx.clearRect(0, 0, cw, ch);

        const cx = (curX / 100) * cw;
        const cy = (curY / 100) * ch;

        // 1. Concentric radar rings centered on operator
        twinCanvasCtx.save();
        twinCanvasCtx.strokeStyle = 'rgba(2, 132, 199, 0.25)';
        twinCanvasCtx.lineWidth = 1.5;
        twinCanvasCtx.setLineDash([4, 4]);
        twinCanvasCtx.beginPath();
        twinCanvasCtx.arc(cx, cy, 28 * s, 0, Math.PI * 2);
        twinCanvasCtx.stroke();
        twinCanvasCtx.beginPath();
        twinCanvasCtx.arc(cx, cy, 56 * s, 0, Math.PI * 2);
        twinCanvasCtx.stroke();
        twinCanvasCtx.restore();

        // 2. Crosshair coordinate lines through operator
        twinCanvasCtx.save();
        twinCanvasCtx.strokeStyle = 'rgba(2, 132, 199, 0.16)';
        twinCanvasCtx.lineWidth = 1;
        twinCanvasCtx.beginPath();
        twinCanvasCtx.moveTo(cx, 0);
        twinCanvasCtx.lineTo(cx, ch);
        twinCanvasCtx.moveTo(0, cy);
        twinCanvasCtx.lineTo(cw, cy);
        twinCanvasCtx.stroke();
        twinCanvasCtx.restore();

        // 3. Operator Avatar Wireframe (Head circle, spine, shoulders)
        twinCanvasCtx.save();
        const headRadius = 14 * s;
        const headY = cy - 12 * s;
        // Head circle
        twinCanvasCtx.fillStyle = 'rgba(2, 132, 199, 0.12)';
        twinCanvasCtx.strokeStyle = '#0284c7';
        twinCanvasCtx.lineWidth = 2;
        twinCanvasCtx.beginPath();
        twinCanvasCtx.arc(cx, headY, headRadius, 0, Math.PI * 2);
        twinCanvasCtx.fill();
        twinCanvasCtx.stroke();

        // Head landmarks (5 points)
        twinCanvasCtx.fillStyle = '#0284c7';
        twinCanvasCtx.beginPath();
        twinCanvasCtx.arc(cx - 5 * s, headY - 3 * s, 2, 0, Math.PI * 2); // left eye
        twinCanvasCtx.arc(cx + 5 * s, headY - 3 * s, 2, 0, Math.PI * 2); // right eye
        twinCanvasCtx.arc(cx, headY + 1 * s, 2, 0, Math.PI * 2); // nose
        twinCanvasCtx.arc(cx - 4 * s, headY + 6 * s, 1.8, 0, Math.PI * 2); // mouth l
        twinCanvasCtx.arc(cx + 4 * s, headY + 6 * s, 1.8, 0, Math.PI * 2); // mouth r
        twinCanvasCtx.fill();

        // Spine and shoulder bars
        twinCanvasCtx.strokeStyle = '#059669';
        twinCanvasCtx.lineWidth = 2.5;
        twinCanvasCtx.beginPath();
        twinCanvasCtx.moveTo(cx, headY + headRadius);
        twinCanvasCtx.lineTo(cx, cy + 32 * s);
        // Shoulder
        twinCanvasCtx.moveTo(cx - 22 * s, cy - 2 * s);
        twinCanvasCtx.lineTo(cx + 22 * s, cy - 2 * s);
        // Chest bar
        twinCanvasCtx.moveTo(cx - 18 * s, cy + 12 * s);
        twinCanvasCtx.lineTo(cx + 18 * s, cy + 12 * s);
        twinCanvasCtx.stroke();

        // Motion direction arrow if moving
        if (motionTracker.currentVelocity > 0.08) {
          twinCanvasCtx.strokeStyle = '#d97706';
          twinCanvasCtx.lineWidth = 2;
          const velAngle = motionTracker.currentDirection.includes('LEFT') ? Math.PI : (motionTracker.currentDirection.includes('RIGHT') ? 0 : (motionTracker.currentDirection.includes('APPROACH') ? -Math.PI / 2 : Math.PI / 2));
          const arrowLen = Math.min(42, motionTracker.currentVelocity * 32);
          const arrowEndX = cx + Math.cos(velAngle) * arrowLen;
          const arrowEndY = cy + Math.sin(velAngle) * arrowLen;
          twinCanvasCtx.beginPath();
          twinCanvasCtx.moveTo(cx, cy);
          twinCanvasCtx.lineTo(arrowEndX, arrowEndY);
          twinCanvasCtx.stroke();
        }
        twinCanvasCtx.restore();
      }

      if (twinTelemetryBadge) {
        twinTelemetryBadge.style.display = 'flex';
        twinTelemetryBadge.innerHTML = `<i class="fas fa-crosshairs"></i> SPATIAL MATRIX: [X: ${curX.toFixed(1)}%, Y: ${curY.toFixed(1)}%, Z: ${(1.0 / s).toFixed(2)}m] • VEL: ${motionTracker.currentVelocity.toFixed(2)}m/s`;
      }

      // 1. [OBJECT: OPERATOR] (#bbox1 in Box 2): Dynamically tracks operator upper body & torso
      const b1W = Math.max(30, Math.min(52, trackingState.torsoW * s));
      const b1H = Math.max(50, Math.min(76, trackingState.torsoH * s));
      const b1Left = Math.max(2, Math.min(98 - b1W, curX - b1W / 2));
      const b1Top = Math.max(4, Math.min(96 - b1H, curY - 8 * s));

      if (bbox1) {
        bbox1.style.left = `${b1Left.toFixed(2)}%`;
        bbox1.style.top = `${b1Top.toFixed(2)}%`;
        bbox1.style.width = `${b1W.toFixed(2)}%`;
        bbox1.style.height = `${b1H.toFixed(2)}%`;
      }
      if (bbox1Sub) {
        bbox1Sub.textContent = `VEL: ${motionTracker.currentVelocity.toFixed(2)}m/s • DIR: ${motionTracker.currentDirection}`;
      }

      // 2. [FACIAL MESH: 468 PTS] (#bbox2 in Box 2): Dynamically tracks operator face/head position
      const b2W = Math.max(14, Math.min(26, trackingState.faceW * s));
      const b2H = Math.max(18, Math.min(34, trackingState.faceH * s));
      const b2Left = Math.max(2, Math.min(98 - b2W, curX - b2W / 2));
      const b2Top = Math.max(2, Math.min(96 - b2H, curY - 14 * s));

      if (bbox2) {
        bbox2.style.left = `${b2Left.toFixed(2)}%`;
        bbox2.style.top = `${b2Top.toFixed(2)}%`;
        bbox2.style.width = `${b2W.toFixed(2)}%`;
        bbox2.style.height = `${b2H.toFixed(2)}%`;
      }
      if (bbox2Sub) {
        bbox2Sub.textContent = `LIVENESS: TRUE • 468 PTS • ATTENTION: FOCUSED`;
      }

      // 3. [LOCAL PERCEPTION: ZERO DATA TRANSMITTED] (#bbox3 in Box 2): Dynamically tracks operator operational envelope
      const b3W = Math.max(38, Math.min(62, trackingState.localW * s));
      const b3H = Math.max(12, Math.min(20, trackingState.localH * s));
      const b3Left = Math.max(2, Math.min(98 - b3W, curX - b3W / 2));
      const b3Top = Math.max(10, Math.min(98 - b3H, b1Top + b1H - 6 * s));

      if (bbox3) {
        bbox3.style.left = `${b3Left.toFixed(2)}%`;
        bbox3.style.top = `${b3Top.toFixed(2)}%`;
        bbox3.style.width = `${b3W.toFixed(2)}%`;
        bbox3.style.height = `${b3H.toFixed(2)}%`;
      }
      if (bbox3Sub) {
        bbox3Sub.textContent = `STATUS: EDGE LOCKED (X: ${curX.toFixed(0)}%, Y: ${curY.toFixed(0)}%) • MEMORY_RESIDENT`;
      }

      perceptionAnimId = requestAnimationFrame(renderPerception);
    }

    perceptionAnimId = requestAnimationFrame(renderPerception);
  }

  // 8. Request & Start Local Webcam Stream
  async function startWebcam() {
    const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.protocol === 'file:';
    const isHttps = location.protocol === 'https:';

    if (!isHttps && !isLocal && !navigator.mediaDevices) {
      showNotice('Webcam testing requires HTTPS security or localhost. Reverting to demo mode.', true, 'fas fa-shield-alt');
      setScenario('campus');
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showNotice('Camera MediaDevices API is not supported in this browser. Reverting to demo mode.', true, 'fas fa-exclamation-triangle');
      setScenario('campus');
      return;
    }

    showNotice('Requesting camera permission...', false, 'fas fa-video');

    try {
      let stream;
      try {
        // Request exact 1280x720 video as specified in requirements
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 }
        });
      } catch (constraintErr) {
        // Graceful fallback if exact 1280x720 constraint is rejected by hardware
        if (constraintErr.name === 'OverconstrainedError' || constraintErr.name === 'ConstraintNotSatisfiedError') {
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 }
            }
          });
        } else {
          throw constraintErr;
        }
      }

      webcamStream = stream;
      if (webcamVideo) {
        webcamVideo.srcObject = stream;
        webcamVideo.style.display = 'block';
        await webcamVideo.play().catch(e => console.warn('Video playback warning:', e));
      }
      if (staticImg) {
        staticImg.style.display = 'none';
      }
      if (webcamNotice) {
        webcamNotice.style.display = 'none';
      }

      // Initialize motion session
      motionTracker.sessionStartTime = Date.now();
      motionTracker.events = [];
      motionTracker.velocities = [];
      motionTracker.peakVelocity = 0;
      motionTracker.counts = { stable: 1, lateral: 0, axial: 0 };
      motionTracker.sessionId = 'AURA-MV-' + Math.floor(1000 + Math.random() * 9000);

      logMotionEvent('OPERATOR_LOCK', 'Operator aligned with sensor. Air-gapped biometric lock initialized.', '0.00 m/s', '99.4%');

      applyWebcamHUDState();
      startPerceptionEngine();
    } catch (err) {
      console.warn('Webcam initialization error:', err);
      stopWebcam();
      let errMsg = 'Camera access unavailable. Reverting to demo mode.';
      let icon = 'fas fa-exclamation-triangle';

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errMsg = 'Camera permission was denied. Please allow camera access in browser settings.';
        icon = 'fas fa-ban';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errMsg = 'No webcam hardware device detected on your system. Reverting to demo mode.';
        icon = 'fas fa-camera';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errMsg = 'Webcam is currently in use by another application. Reverting to demo mode.';
        icon = 'fas fa-lock';
      } else if (err.name === 'SecurityError') {
        errMsg = 'Webcam access blocked due to insecure origin. Requires HTTPS or localhost.';
        icon = 'fas fa-shield-alt';
      }

      showNotice(errMsg, true, icon);
      setScenario('campus');
    }
  }

  // 9. Apply Live Webcam HUD Overlays & Telemetry
  function applyWebcamHUDState() {
    if (hudViewport) {
      hudViewport.classList.add('camera-clean-feed');
    }
    if (auraInferenceViewport) {
      auraInferenceViewport.classList.add('webcam-tracking-active');
    }
    if (inferenceStaticImg) {
      inferenceStaticImg.style.display = 'none';
    }
    if (cameraCleanBadge) {
      cameraCleanBadge.style.display = 'flex';
    }
    if (twinTelemetryBadge) {
      twinTelemetryBadge.style.display = 'flex';
    }
    if (cameraBoxPill) {
      cameraBoxPill.innerHTML = '<i class="fas fa-eye-slash"></i> CLEAN WEBCAM (NO OVERLAYS)';
    }
    if (perceptionBoxPill) {
      perceptionBoxPill.innerHTML = '<i class="fas fa-brain"></i> LIVE INFERENCE RESPONSE';
    }

    if (btnWebcam) {
      btnWebcam.classList.add('active');
      btnWebcam.innerHTML = '<span class="webcam-live-indicator"></span> Live Webcam';
    }

    // Telemetry status bar updates
    if (hudSourceVal) hudSourceVal.textContent = 'LOCAL WEBCAM [BOX 1: RAW INGEST]';
    if (streamTitle) streamTitle.textContent = 'DUAL FEED // BOX 1: RAW INGEST + BOX 2: DIGITAL TWIN';
    if (hudProtocol) hudProtocol.textContent = 'WEBRTC • 720p@60FPS [AIR-GAPPED]';
    if (globalStatus) {
      globalStatus.textContent = 'OPERATOR DETECTED';
      globalStatus.className = 'telemetry-val text-emerald';
    }
    if (latencyVal) latencyVal.textContent = '8ms';

    // Show live motion badge in viewport and motion strip below controls
    if (hudMotionBadge) hudMotionBadge.style.display = 'flex';
    if (hudMovementStrip) hudMovementStrip.style.display = 'grid';

    // Bounding Box 1: Operator Upper-Body / Torso (In Box 2)
    if (bbox1) {
      bbox1.classList.remove('alert-pulse');
      bbox1.style.top = '20%';
      bbox1.style.left = '31%';
      bbox1.style.width = '38%';
      bbox1.style.height = '64%';
    }
    if (bbox1Text) bbox1Text.textContent = '[OBJECT: OPERATOR | CONFIDENCE: 99.4%]';
    if (bbox1Sub) bbox1Sub.textContent = 'TRACK_ID: #0001 • POSE: CALIBRATED • LIVENESS: PASS';

    // Bounding Box 2: Face Mesh with Micro-Landmark Reticles (In Box 2)
    if (bbox2) {
      bbox2.style.display = 'block';
      bbox2.style.top = '18%';
      bbox2.style.left = '41%';
      bbox2.style.width = '18%';
      bbox2.style.height = '24%';
    }
    if (bbox2Text) bbox2Text.textContent = '[FACIAL MESH: 468 PTS | 99.8%]';
    if (bbox2Sub) bbox2Sub.textContent = 'LIVENESS: TRUE • ATTENTION: FOCUSED';
    if (faceMeshPoints) {
      faceMeshPoints.style.display = 'block';
    }

    // Bounding Box 3: Local Memory / Zero-Trust Privacy Telemetry (In Box 2)
    if (bbox3) {
      bbox3.style.display = 'block';
      bbox3.style.top = '78%';
      bbox3.style.left = '27%';
      bbox3.style.width = '46%';
      bbox3.style.height = '14%';
    }
    if (bbox3Text) bbox3Text.textContent = '[LOCAL PERCEPTION: ZERO DATA TRANSMITTED]';
    if (bbox3Sub) bbox3Sub.textContent = 'MEMORY_RESIDENT ONLY • NO SERVER RECORDING';
  }

  // 10. Scenario Switcher Controller
  function setScenario(scenario) {
    if (alertTimer) {
      clearTimeout(alertTimer);
      alertTimer = null;
    }

    if (scenario === 'webcam') {
      if (currentScenario === 'webcam') {
        // Toggle off if already running and restore demo
        setScenario('campus');
        return;
      }
      currentScenario = 'webcam';
      allBtns.forEach(btn => btn.classList.remove('active'));
      startWebcam();
      return;
    }

    // Switching to preset scenario: gracefully stop all camera tracks
    stopWebcam();
    currentScenario = scenario;
    allBtns.forEach(btn => btn.classList.remove('active'));

    // Audio synthesizer chirp for sensory feedback
    function playScenarioChirp(type) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        if (ctx.state === 'suspended') ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        if (type === 'alert') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.18);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.24);
        } else if (type === 'qa') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1400, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.12);
          gain.gain.setValueAtTime(0.06, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.15);
        }
      } catch (e) {}
    }

    if (scenario === 'campus') {
      if (btnCampus) btnCampus.classList.add('active');
      if (staticImg) staticImg.src = 'assets/images/aura-cctv-feed.jpg';
      if (inferenceStaticImg) {
        inferenceStaticImg.src = 'assets/images/aura-cctv-feed.jpg';
        inferenceStaticImg.style.display = 'block';
      }
      if (cameraCleanBadge) cameraCleanBadge.style.display = 'none';
      if (twinTelemetryBadge) twinTelemetryBadge.style.display = 'none';
      if (cameraBoxPill) cameraBoxPill.innerHTML = '<i class="fas fa-eye-slash"></i> CLEAN FEED (UNCLUTTERED)';
      if (perceptionBoxPill) perceptionBoxPill.innerHTML = '<i class="fas fa-microchip"></i> REAL-TIME RESPONSE';
      if (hudSourceVal) hudSourceVal.textContent = 'RTSP // CAM-04';
      if (streamTitle) streamTitle.textContent = 'DUAL CONSOLE // BOX 1: RAW FEED + BOX 2: AI INGESTION';
      if (hudProtocol) hudProtocol.textContent = 'RTSP • 1080p@60FPS';
      if (globalStatus) {
        globalStatus.textContent = 'NOMINAL';
        globalStatus.className = 'telemetry-val text-emerald';
      }

      // Update telemetry strip for Campus mode
      const stripLabel1 = document.getElementById('hudStripLabel1');
      const stripLabel2 = document.getElementById('hudStripLabel2');
      const stripLabel3 = document.getElementById('hudStripLabel3');
      if (stripLabel1) stripLabel1.innerHTML = '<i class="fas fa-satellite-dish"></i> INGEST STATUS';
      if (hudMotionState) { hudMotionState.textContent = 'NOMINAL CCTV'; hudMotionState.className = 'm-strip-val text-emerald'; }
      if (stripLabel2) stripLabel2.innerHTML = '<i class="fas fa-gauge-high"></i> LATENCY / VEL';
      if (hudMotionVelocity) hudMotionVelocity.textContent = '14ms • 1.1m/s';
      if (stripLabel3) stripLabel3.innerHTML = '<i class="fas fa-bullseye"></i> ACCURACY';
      if (hudMotionStability) hudMotionStability.textContent = '99.8%';
      if (btnGenMovementReport) btnGenMovementReport.innerHTML = '<i class="fas fa-file-waveform"></i> Generate Report';

      if (bbox1) {
        bbox1.classList.remove('alert-pulse');
        bbox1.style.top = '45%';
        bbox1.style.left = '42%';
        bbox1.style.width = '18%';
        bbox1.style.height = '47%';
      }
      if (bbox1Text) bbox1Text.innerHTML = '<i class="fas fa-user-check"></i> [OBJECT: PASSENGER | CONFIDENCE: 98.4%]';
      if (bbox1Sub) bbox1Sub.textContent = 'TRACK_ID: #4092 • POSE: UPRIGHT';

      if (bbox2) {
        bbox2.style.display = 'block';
        bbox2.style.top = '41%';
        bbox2.style.left = '54.5%';
        bbox2.style.width = '14%';
        bbox2.style.height = '43%';
      }
      if (bbox2Text) bbox2Text.innerHTML = '<i class="fas fa-id-badge"></i> [OBJECT: PERSONNEL | CONFIDENCE: 96.1%]';
      if (bbox2Sub) bbox2Sub.textContent = 'BADGE: VERIFIED • VEL: 1.1m/s';

      if (bbox3) {
        bbox3.style.display = 'block';
        bbox3.style.top = '76%';
        bbox3.style.left = '36%';
        bbox3.style.width = '33%';
        bbox3.style.height = '18%';
      }
      if (bbox3Text) bbox3Text.innerHTML = '<i class="fas fa-shield-halved"></i> [HAZARD: NONE | 99.8% CLEAR]';
      if (bbox3Sub) bbox3Sub.textContent = 'TRAJECTORY CLEAR • RISK: 0.02%';

      if (latencyVal) latencyVal.textContent = '14ms';
    } else if (scenario === 'qa') {
      playScenarioChirp('qa');
      if (btnQa) btnQa.classList.add('active');
      if (staticImg) staticImg.src = 'assets/images/aura-qa-feed.jpg';
      if (inferenceStaticImg) {
        inferenceStaticImg.src = 'assets/images/aura-qa-feed.jpg';
        inferenceStaticImg.style.display = 'block';
      }
      if (cameraCleanBadge) cameraCleanBadge.style.display = 'none';
      if (twinTelemetryBadge) twinTelemetryBadge.style.display = 'none';
      if (cameraBoxPill) cameraBoxPill.innerHTML = '<i class="fas fa-eye-slash"></i> CLEAN CSI-2 (RAW OPTICAL)';
      if (perceptionBoxPill) perceptionBoxPill.innerHTML = '<i class="fas fa-microchip"></i> QA DEFECT INFERENCE';
      if (hudSourceVal) hudSourceVal.textContent = 'QA-LINE // CSI-2';
      if (streamTitle) streamTitle.textContent = 'DUAL CONSOLE // BOX 1: CSI-2 SENSOR + BOX 2: DEFECT QA INFERENCE';
      if (hudProtocol) hudProtocol.textContent = 'CSI-2 • 1080p@60FPS';
      if (globalStatus) {
        globalStatus.textContent = '1 DEFECT DETECTED';
        globalStatus.className = 'telemetry-val text-alert';
      }

      // Update telemetry strip for Defect QA
      const stripLabel1 = document.getElementById('hudStripLabel1');
      const stripLabel2 = document.getElementById('hudStripLabel2');
      const stripLabel3 = document.getElementById('hudStripLabel3');
      if (stripLabel1) stripLabel1.innerHTML = '<i class="fas fa-microchip"></i> QA STATUS';
      if (hudMotionState) { hudMotionState.textContent = '1 DEFECT FLAGGED'; hudMotionState.className = 'm-strip-val text-alert'; }
      if (stripLabel2) stripLabel2.innerHTML = '<i class="fas fa-ruler-combined"></i> TOLERANCE';
      if (hudMotionVelocity) hudMotionVelocity.textContent = '+/-0.01mm';
      if (stripLabel3) stripLabel3.innerHTML = '<i class="fas fa-chart-pie"></i> YIELD RATE';
      if (hudMotionStability) hudMotionStability.textContent = '99.2%';
      if (btnGenMovementReport) btnGenMovementReport.innerHTML = '<i class="fas fa-microchip"></i> Generate QA Report';

      // Bounding Box 1: Core BGA Processor Inspection
      if (bbox1) {
        bbox1.classList.remove('alert-pulse');
        bbox1.style.top = '36%';
        bbox1.style.left = '32%';
        bbox1.style.width = '22%';
        bbox1.style.height = '28%';
      }
      if (bbox1Text) bbox1Text.innerHTML = '<i class="fas fa-microchip"></i> [BGA_QA: NVIDIA AGX | 99.8% PASS]';
      if (bbox1Sub) bbox1Sub.textContent = 'SOLDER INTEGRITY: 100% • PIN_PITCH: 0.8mm';

      // Bounding Box 2: Defect Anomaly Flag (SMT Lead Bridge)
      if (bbox2) {
        bbox2.style.display = 'block';
        bbox2.style.top = '50%';
        bbox2.style.left = '58%';
        bbox2.style.width = '18%';
        bbox2.style.height = '24%';
      }
      if (bbox2Text) bbox2Text.innerHTML = '<i class="fas fa-triangle-exclamation"></i> [DEFECT FLAGGED: SMT LEAD BRIDGE #U14]';
      if (bbox2Sub) bbox2Sub.textContent = 'SEVERITY: HIGH • TOLERANCE DEVIATION: +0.03mm';

      // Bounding Box 3: Passive Component Array Validation
      if (bbox3) {
        bbox3.style.display = 'block';
        bbox3.style.top = '64%';
        bbox3.style.left = '42%';
        bbox3.style.width = '20%';
        bbox3.style.height = '18%';
      }
      if (bbox3Text) bbox3Text.innerHTML = '<i class="fas fa-check-circle"></i> [SMT_ARRAY: 12/12 PASS]';
      if (bbox3Sub) bbox3Sub.textContent = 'CAPACITANCE NOMINAL • BATCH: #ZX-8821';

      if (latencyVal) latencyVal.textContent = '7ms';
    } else if (scenario === 'alert') {
      playScenarioChirp('alert');
      if (btnAlert) btnAlert.classList.add('active');
      if (staticImg) staticImg.src = 'assets/images/aura-cctv-feed.jpg';
      if (inferenceStaticImg) {
        inferenceStaticImg.src = 'assets/images/aura-cctv-feed.jpg';
        inferenceStaticImg.style.display = 'block';
      }
      if (cameraCleanBadge) cameraCleanBadge.style.display = 'none';
      if (twinTelemetryBadge) twinTelemetryBadge.style.display = 'none';
      if (cameraBoxPill) cameraBoxPill.innerHTML = '<i class="fas fa-eye-slash"></i> CLEAN FEED (UNCLUTTERED)';
      if (perceptionBoxPill) perceptionBoxPill.innerHTML = '<i class="fas fa-triangle-exclamation"></i> THREAT RESPONSE LOCK';
      if (hudSourceVal) hudSourceVal.textContent = 'CAM-04 ALARM';
      if (streamTitle) streamTitle.textContent = '⚠️ INCIDENT DETECTED // BOX 1: CAM-04 + BOX 2: THREAT TRACKING';
      if (hudProtocol) hudProtocol.textContent = 'RTSP • 1080p@60FPS';
      if (globalStatus) {
        globalStatus.textContent = 'ALERT TRIGGERED';
        globalStatus.className = 'telemetry-val text-alert';
      }

      // Update telemetry strip for Incident Detection
      const stripLabel1 = document.getElementById('hudStripLabel1');
      const stripLabel2 = document.getElementById('hudStripLabel2');
      const stripLabel3 = document.getElementById('hudStripLabel3');
      if (stripLabel1) stripLabel1.innerHTML = '<i class="fas fa-triangle-exclamation"></i> INCIDENT STATUS';
      if (hudMotionState) { hudMotionState.textContent = 'CRITICAL ALERT'; hudMotionState.className = 'm-strip-val text-alert'; }
      if (stripLabel2) stripLabel2.innerHTML = '<i class="fas fa-truck-fast"></i> RESPONSE';
      if (hudMotionVelocity) hudMotionVelocity.textContent = 'UNIT-04 (ETA 45s)';
      if (stripLabel3) stripLabel3.innerHTML = '<i class="fas fa-shield"></i> PERIMETER';
      if (hudMotionStability) hudMotionStability.textContent = 'LOCKED (100%)';
      if (btnGenMovementReport) btnGenMovementReport.innerHTML = '<i class="fas fa-triangle-exclamation"></i> Generate Incident Report';

      // Bounding Box 1: Anomaly Fall Detection
      if (bbox1) {
        bbox1.classList.add('alert-pulse');
        bbox1.style.top = '45%';
        bbox1.style.left = '42%';
        bbox1.style.width = '18%';
        bbox1.style.height = '47%';
      }
      if (bbox1Text) bbox1Text.innerHTML = '<i class="fas fa-triangle-exclamation"></i> [⚠️ ANOMALY: FALL DETECTED | 94.2%]';
      if (bbox1Sub) bbox1Sub.textContent = 'DISPATCHING CORALGENZ PROTOCOL • T+0.4s';

      // Bounding Box 2: Automated Security Squad Dispatch
      if (bbox2) {
        bbox2.style.display = 'block';
        bbox2.style.top = '41%';
        bbox2.style.left = '54.5%';
        bbox2.style.width = '14%';
        bbox2.style.height = '43%';
      }
      if (bbox2Text) bbox2Text.innerHTML = '<i class="fas fa-shield-halved"></i> [RESPONDER: NEAREST SQUAD | 99.1%]';
      if (bbox2Sub) bbox2Sub.textContent = 'ETA: 45 SECONDS • DISPATCH CONFIRMED';

      // Bounding Box 3: Perimeter Lockdown
      if (bbox3) {
        bbox3.style.display = 'block';
        bbox3.style.top = '76%';
        bbox3.style.left = '36%';
        bbox3.style.width = '33%';
        bbox3.style.height = '18%';
      }
      if (bbox3Text) bbox3Text.innerHTML = '<i class="fas fa-lock"></i> [ZONE STATUS: CAUTION // INTERVENING]';
      if (bbox3Sub) bbox3Sub.textContent = 'CAMERA MESH LOCKED • VERIFYING AUDIT';

      if (latencyVal) latencyVal.textContent = '6ms';

      // Auto-revert after 8 seconds to demonstrate automated recovery
      alertTimer = setTimeout(() => {
        setScenario('campus');
      }, 8000);
    }
  }

  // Update openMovementReportModal to dynamically format reports for QA, Incident, or Campus
  const origOpenReport = openMovementReportModal;
  openMovementReportModal = function() {
    if (!movementReportModalOverlay) return;

    if (currentScenario === 'qa') {
      const repTitle = document.getElementById('movementReportModalTitle');
      if (repTitle) repTitle.textContent = 'AURA Industrial Defect QA — Optical Inspection Report';
      if (reportModalSubtitle) reportModalSubtitle.textContent = 'SESSION: AURA-QA-7721 • BATCH: #ZX-8821 • PROTOCOL: CSI-2 60FPS';
      if (repKpiDuration) repKpiDuration.textContent = '04:12';
      if (repKpiEvents) repKpiEvents.textContent = '1';
      if (repKpiEventSub) repKpiEventSub.textContent = 'Lead Bridge Flagged';
      if (repKpiPeakVel) repKpiPeakVel.textContent = '0.8mm Pitch';
      if (repKpiAvgVel) repKpiAvgVel.textContent = 'Dev: +0.03mm';
      if (repKpiStability) repKpiStability.textContent = '99.2%';
      if (distSummaryText) distSummaryText.textContent = '99.2% PASSING COMPONENTS • 0.8% FLAGGED';
      if (distBarStable) distBarStable.style.width = '99.2%';
      if (distBarLateral) distBarLateral.style.width = '0.8%';
      if (distBarAxial) distBarAxial.style.width = '0%';
      if (reportTableBody) {
        reportTableBody.innerHTML = `
          <tr>
            <td style="font-weight: 700; color: #0284c7;">00:01</td>
            <td><span class="badge-log stable">COMPONENT_QA</span></td>
            <td style="color: #475569;">NVIDIA AGX BGA Chip Alignment & Solder Inspection</td>
            <td style="font-weight: 600;">0.00mm Dev</td>
            <td style="color: #059669; font-weight: 700;">99.8% PASS</td>
          </tr>
          <tr>
            <td style="font-weight: 700; color: #dc2626;">00:03</td>
            <td><span class="badge-log rapid">DEFECT_FLAGGED</span></td>
            <td style="color: #dc2626; font-weight: 600;">SMT Lead Bridging detected on Pin #14 (Short-circuit hazard)</td>
            <td style="font-weight: 600; color: #dc2626;">+0.03mm Dev</td>
            <td style="color: #dc2626; font-weight: 700;">98.9% FLAGGED</td>
          </tr>
          <tr>
            <td style="font-weight: 700; color: #0284c7;">00:04</td>
            <td><span class="badge-log stable">COMPONENT_ARRAY</span></td>
            <td style="color: #475569;">Capacitor Bank C1-C12 Present and within ESR specs</td>
            <td style="font-weight: 600;">Nominal</td>
            <td style="color: #059669; font-weight: 700;">100.0% PASS</td>
          </tr>
          <tr>
            <td style="font-weight: 700; color: #0284c7;">00:07</td>
            <td><span class="badge-log stable">TRACE_INSPECT</span></td>
            <td style="color: #475569;">VCC Power trace impedance verification</td>
            <td style="font-weight: 600;">50.2 Ohm</td>
            <td style="color: #059669; font-weight: 700;">99.4% PASS</td>
          </tr>
        `;
      }
      movementReportModalOverlay.style.display = 'flex';
    } else if (currentScenario === 'alert') {
      const repTitle = document.getElementById('movementReportModalTitle');
      if (repTitle) repTitle.textContent = 'AURA Autonomous Security Incident & Anomaly Forensics Report';
      if (reportModalSubtitle) reportModalSubtitle.textContent = 'INCIDENT ID: #AURA-INC-9042 • CAM-04 // CORRIDOR NORTH';
      if (repKpiDuration) repKpiDuration.textContent = 'T+0.4s';
      if (repKpiEvents) repKpiEvents.textContent = '1';
      if (repKpiEventSub) repKpiEventSub.textContent = 'Critical Fall / Zone Breach';
      if (repKpiPeakVel) repKpiPeakVel.textContent = '4.2 m/s²';
      if (repKpiAvgVel) repKpiAvgVel.textContent = 'Vertical Drop Accel';
      if (repKpiStability) repKpiStability.textContent = 'LOCKED';
      if (distSummaryText) distSummaryText.textContent = '100% AIR-GAPPED ZERO-TRUST CONTAINMENT';
      if (distBarStable) distBarStable.style.width = '0%';
      if (distBarLateral) distBarLateral.style.width = '0%';
      if (distBarAxial) { distBarAxial.style.width = '100%'; distBarAxial.style.background = '#ef4444'; }
      if (reportTableBody) {
        reportTableBody.innerHTML = `
          <tr>
            <td style="font-weight: 700; color: #dc2626;">T+0.0s</td>
            <td><span class="badge-log rapid">ANOMALY_TRIGGER</span></td>
            <td style="color: #dc2626; font-weight: 600;">Sudden elevation drop detected in transit path (CAM-04)</td>
            <td style="font-weight: 600;">4.2 m/s²</td>
            <td style="color: #dc2626; font-weight: 700;">94.2% DETECTED</td>
          </tr>
          <tr>
            <td style="font-weight: 700; color: #0284c7;">T+0.2s</td>
            <td><span class="badge-log stable">CORALGENZ_PROTOCOL</span></td>
            <td style="color: #475569;">Zero-Trust incident payload encrypted & routed to mesh</td>
            <td style="font-weight: 600;">Sub-ms Sync</td>
            <td style="color: #059669; font-weight: 700;">99.9% VERIFIED</td>
          </tr>
          <tr>
            <td style="font-weight: 700; color: #0284c7;">T+0.4s</td>
            <td><span class="badge-log lateral">DISPATCH_SQUAD</span></td>
            <td style="color: #475569;">Automated dispatch signal transmitted to Nearest Squad #4</td>
            <td style="font-weight: 600;">ETA: 45s</td>
            <td style="color: #059669; font-weight: 700;">CONFIRMED</td>
          </tr>
          <tr>
            <td style="font-weight: 700; color: #0284c7;">T+0.8s</td>
            <td><span class="badge-log stable">PERIMETER_LOCK</span></td>
            <td style="color: #475569;">Zone access locked to prevent secondary hazard</td>
            <td style="font-weight: 600;">Zero-Leak</td>
            <td style="color: #059669; font-weight: 700;">LOCKED</td>
          </tr>
        `;
      }
      movementReportModalOverlay.style.display = 'flex';
    } else if (currentScenario === 'campus') {
      const repTitle = document.getElementById('movementReportModalTitle');
      if (repTitle) repTitle.textContent = 'AURA Real-Time Campus Corridor & Spatial Perception Audit';
      if (reportModalSubtitle) reportModalSubtitle.textContent = 'CAMERA: CAM-04 RTSP • 1080p@60FPS';
      if (repKpiDuration) repKpiDuration.textContent = '12:45';
      if (repKpiEvents) repKpiEvents.textContent = '2';
      if (repKpiEventSub) repKpiEventSub.textContent = 'Tracked Personnel & Passenger';
      if (repKpiPeakVel) repKpiPeakVel.textContent = '1.1 m/s';
      if (repKpiAvgVel) repKpiAvgVel.textContent = 'Transit Normal';
      if (repKpiStability) repKpiStability.textContent = '99.8%';
      if (distSummaryText) distSummaryText.textContent = '98% TRANSIT NORMAL • 2% CONVERGING';
      if (distBarStable) distBarStable.style.width = '98%';
      if (distBarLateral) distBarLateral.style.width = '2%';
      if (distBarAxial) distBarAxial.style.width = '0%';
      if (reportTableBody) {
        reportTableBody.innerHTML = `
          <tr>
            <td style="font-weight: 700; color: #0284c7;">10:32</td>
            <td><span class="badge-log stable">TRACK_OBJECT</span></td>
            <td style="color: #475569;">Passenger verified moving through corridor gate 4</td>
            <td style="font-weight: 600;">1.2 m/s</td>
            <td style="color: #059669; font-weight: 700;">98.4% PASS</td>
          </tr>
          <tr>
            <td style="font-weight: 700; color: #0284c7;">10:35</td>
            <td><span class="badge-log stable">BADGE_VERIFY</span></td>
            <td style="color: #475569;">Personnel ID Badge verified via air-gapped facial mesh</td>
            <td style="font-weight: 600;">1.1 m/s</td>
            <td style="color: #059669; font-weight: 700;">96.1% PASS</td>
          </tr>
          <tr>
            <td style="font-weight: 700; color: #0284c7;">10:38</td>
            <td><span class="badge-log stable">HAZARD_SCAN</span></td>
            <td style="color: #475569;">Corridor floor trajectory clear of obstacles</td>
            <td style="font-weight: 600;">0.02% Risk</td>
            <td style="color: #059669; font-weight: 700;">99.8% CLEAR</td>
          </tr>
        `;
      }
      movementReportModalOverlay.style.display = 'flex';
    } else {
      // Live Webcam session report
      origOpenReport();
    }
  };

  // Event Listeners for Controls
  if (btnCampus) btnCampus.addEventListener('click', () => setScenario('campus'));
  if (btnQa) btnQa.addEventListener('click', () => setScenario('qa'));
  if (btnAlert) btnAlert.addEventListener('click', () => setScenario('alert'));
  if (btnWebcam) btnWebcam.addEventListener('click', () => setScenario('webcam'));
}
/* ==========================================================================
   17. GLOBAL SPOTLIGHT SEARCH ENGINE (Site-Wide Command Palette & Navigation)
   ========================================================================== */
function initSpotlightSearch() {
  if (window.__zevionixSpotlightInitialized) return;
  window.__zevionixSpotlightInitialized = true;

  // Platform detection for Mac vs Windows/Linux
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/i.test(navigator.platform || navigator.userAgent);

  // 1. Comprehensive Search Index & Categories
  const searchCategories = {
    "action": {
        "name": "Quick Actions",
        "icon": "\u26a1"
    },
    "aura": {
        "name": "AURA Platform & Vision",
        "icon": "\ud83d\udc41\ufe0f"
    },
    "services": {
        "name": "Engineering Services",
        "icon": "\ud83d\udee0\ufe0f"
    },
    "solutions": {
        "name": "Industry Solutions",
        "icon": "\ud83c\udfe2"
    },
    "docs": {
        "name": "Developers & Documentation",
        "icon": "\ud83d\udcbb"
    },
    "tech": {
        "name": "120+ Technology Stacks",
        "icon": "\u26a1"
    },
    "insights": {
        "name": "Engineering Insights & Research",
        "icon": "\ud83d\udcd1"
    },
    "security": {
        "name": "Security & Trust Center",
        "icon": "\ud83d\udee1\ufe0f"
    },
    "company": {
        "name": "Case Studies & Company",
        "icon": "\ud83d\udcc4"
    }
};

  const searchIndex = [
    {
        "id": "qa-briefing",
        "title": "Schedule Technical Briefing",
        "desc": "Book an enterprise architectural consultation with Zevionix principal engineers",
        "category": "action",
        "url": "contact.html",
        "icon": "fas fa-calendar-check",
        "tag": "Action",
        "keywords": [
            "briefing",
            "schedule",
            "contact",
            "consultation",
            "talk",
            "architect",
            "book",
            "call",
            "meeting",
            "hire"
        ]
    },
    {
        "id": "qa-webcam",
        "title": "Test Live Camera Perception",
        "desc": "Activate webcam HUD simulator with real-time bounding boxes & telemetry",
        "category": "action",
        "url": "aura.html#auraLiveFeedConsole",
        "icon": "fas fa-video",
        "tag": "Live Demo",
        "keywords": [
            "webcam",
            "camera",
            "test",
            "perception",
            "live feed",
            "cctv",
            "facial mesh",
            "face tracking",
            "hud",
            "vision"
        ]
    },
    {
        "id": "qa-simulator",
        "title": "Launch Telemetry Simulator",
        "desc": "Interactive stress-test simulating 2.5M msgs/sec and sub-ms latency under GPU load",
        "category": "action",
        "url": "aura.html#auraTelemetrySim",
        "icon": "fas fa-gauge-high",
        "tag": "Benchmark",
        "keywords": [
            "telemetry",
            "simulator",
            "benchmark",
            "stress test",
            "throughput",
            "latency",
            "gpu",
            "fps",
            "tensorrt"
        ]
    },
    {
        "id": "qa-sizing",
        "title": "Calculate Solution Sizing",
        "desc": "Interactive calculator to estimate engineering scope, camera feeds, and deployment nodes",
        "category": "action",
        "url": "solutions.html#solutionsCalculator",
        "icon": "fas fa-calculator",
        "tag": "Tool",
        "keywords": [
            "calculator",
            "sizing",
            "cost",
            "estimate",
            "pricing",
            "nodes",
            "scale",
            "infrastructure"
        ]
    },
    {
        "id": "qa-api-playground",
        "title": "Launch Interactive API Sandbox",
        "desc": "Test live gRPC and REST endpoints with real-time execution response latency in browser",
        "category": "action",
        "url": "docs.html#live-playground",
        "icon": "fas fa-play",
        "tag": "Sandbox",
        "keywords": [
            "api playground",
            "sandbox",
            "test api",
            "grpc",
            "rest",
            "endpoints",
            "interactive",
            "developer"
        ]
    },
    {
        "id": "aura-overview",
        "title": "AURA Platform Overview",
        "desc": "Autonomous Reasoning Architecture uniting edge computer vision, swarms, and sovereign privacy",
        "category": "aura",
        "url": "aura.html",
        "icon": "fas fa-brain",
        "tag": "AURA Platform",
        "keywords": [
            "aura",
            "autonomous",
            "reasoning",
            "architecture",
            "overview",
            "edge",
            "vision",
            "platform",
            "ai"
        ]
    },
    {
        "id": "aura-webcam-console",
        "title": "AURA Live Webcam HUD & Perception Console",
        "desc": "Dual-feed vision simulator with operator tracking, air-gapped facial mesh, and velocity logs",
        "category": "aura",
        "url": "aura.html#auraLiveFeedConsole",
        "icon": "fas fa-camera",
        "tag": "Console",
        "keywords": [
            "aura",
            "live webcam",
            "hud",
            "perception",
            "console",
            "facial mesh",
            "tracking",
            "telemetry",
            "camera",
            "feed"
        ]
    },
    {
        "id": "aura-edge-ingest",
        "title": "AURA Edge Vision Ingest Pipeline",
        "desc": "Zero-drop RTSP & WebRTC multi-stream decoding with sub-millisecond hardware acceleration",
        "category": "aura",
        "url": "aura.html#edge-vision",
        "icon": "fas fa-microchip",
        "tag": "Module",
        "keywords": [
            "aura",
            "edge vision",
            "ingest",
            "rtsp",
            "webrtc",
            "pipeline",
            "tensorrt",
            "cuda",
            "streaming"
        ]
    },
    {
        "id": "aura-agentmesh",
        "title": "AURA AgentMesh Distributed Swarms",
        "desc": "Decentralized peer-to-peer AI agent coordination and distributed spatial intelligence",
        "category": "aura",
        "url": "aura.html#agentmesh",
        "icon": "fas fa-network-wired",
        "tag": "Module",
        "keywords": [
            "aura",
            "agentmesh",
            "agents",
            "swarm",
            "distributed",
            "consensus",
            "peer-to-peer",
            "coordination"
        ]
    },
    {
        "id": "aura-streampulse",
        "title": "AURA StreamPulse Event Streaming Backbone",
        "desc": "Ultra-low latency telemetry pipeline streaming 2.5M+ events/sec with sub-millisecond quantization",
        "category": "aura",
        "url": "aura.html#streampulse",
        "icon": "fas fa-bolt",
        "tag": "Module",
        "keywords": [
            "aura",
            "streampulse",
            "event",
            "streaming",
            "backbone",
            "telemetry",
            "throughput",
            "kafka",
            "latency"
        ]
    },
    {
        "id": "aura-shield",
        "title": "AURA Shield Enclaves Air-Gapped Security",
        "desc": "Hardware-rooted confidential computing enclaves with AES-256-GCM zero-knowledge verification",
        "category": "aura",
        "url": "aura.html#shield-enclaves",
        "icon": "fas fa-shield-halved",
        "tag": "Module",
        "keywords": [
            "aura",
            "shield enclaves",
            "air-gapped",
            "confidential computing",
            "encryption",
            "zero-knowledge",
            "privacy"
        ]
    },
    {
        "id": "aura-sim-module",
        "title": "AURA Telemetry Simulator Testbed",
        "desc": "Interactive live stress-test benchmarking throughput, latency, and GPU acceleration in real time",
        "category": "aura",
        "url": "aura.html#auraTelemetrySim",
        "icon": "fas fa-chart-line",
        "tag": "Module",
        "keywords": [
            "telemetry simulator",
            "stress test",
            "benchmark",
            "throughput",
            "latency",
            "gpu load",
            "aura"
        ]
    },
    {
        "id": "srv-overview",
        "title": "Engineering Services Portfolio",
        "desc": "End-to-end enterprise capabilities: Custom Software, AI & Vision, Cloud, Data, and Security",
        "category": "services",
        "url": "service.html",
        "icon": "fas fa-layer-group",
        "tag": "Overview",
        "keywords": [
            "services",
            "engineering",
            "offerings",
            "capabilities",
            "portfolio",
            "overview"
        ]
    },
    {
        "id": "srv-ai-vision",
        "title": "Artificial Intelligence & Computer Vision",
        "desc": "Custom vision models, sub-millimeter anomaly detection, object tracking, and neural networks",
        "category": "services",
        "url": "ai-computer-vision.html",
        "icon": "fas fa-eye",
        "tag": "Service",
        "keywords": [
            "ai",
            "artificial intelligence",
            "computer vision",
            "yolo",
            "detection",
            "neural",
            "deep learning"
        ]
    },
    {
        "id": "srv-software",
        "title": "Custom Software Engineering",
        "desc": "High-scale resilient backend systems, distributed microservices, and enterprise API design",
        "category": "services",
        "url": "software-development.html",
        "icon": "fas fa-code",
        "tag": "Service",
        "keywords": [
            "software development",
            "custom software",
            "backend",
            "architecture",
            "microservices",
            "engineering"
        ]
    },
    {
        "id": "srv-web-app",
        "title": "Web & Mobile Application Development",
        "desc": "High-performance interactive web portals, PWA applications, and cross-platform mobile apps",
        "category": "services",
        "url": "web-application-development.html",
        "icon": "fas fa-laptop-code",
        "tag": "Service",
        "keywords": [
            "web development",
            "mobile apps",
            "frontend",
            "ui",
            "ux",
            "responsive",
            "fullstack",
            "pwa"
        ]
    },
    {
        "id": "srv-cloud-devops",
        "title": "Cloud Architecture & DevOps Automation",
        "desc": "Multi-cloud Kubernetes infrastructure, GitOps pipelines, zero-downtime deployments, and FinOps",
        "category": "services",
        "url": "cloud-devops.html",
        "icon": "fas fa-cloud",
        "tag": "Service",
        "keywords": [
            "cloud",
            "devops",
            "kubernetes",
            "aws",
            "gcp",
            "azure",
            "docker",
            "ci/cd",
            "terraform",
            "gitops"
        ]
    },
    {
        "id": "srv-data-eng",
        "title": "Data Engineering & Real-Time Analytics",
        "desc": "Fault-tolerant data lakes, streaming ETL ingestion, modern data warehousing, and telemetry",
        "category": "services",
        "url": "data-engineering.html",
        "icon": "fas fa-database",
        "tag": "Service",
        "keywords": [
            "data engineering",
            "analytics",
            "etl",
            "data lake",
            "warehouse",
            "big data",
            "sql",
            "streaming"
        ]
    },
    {
        "id": "srv-cybersecurity",
        "title": "Cybersecurity & Compliance Governance",
        "desc": "Zero-trust perimeter architecture, proactive penetration testing, SOC 2, and ISO 27001 readiness",
        "category": "services",
        "url": "security.html",
        "icon": "fas fa-lock",
        "tag": "Service",
        "keywords": [
            "cybersecurity",
            "security",
            "compliance",
            "soc2",
            "iso 27001",
            "zero-trust",
            "audit",
            "penetration testing"
        ]
    },
    {
        "id": "srv-rnd-deeptech",
        "title": "Research & Product Development (Deep Tech)",
        "desc": "Applied R&D, proof-of-concept prototyping, neural hardware co-design, and patentable innovations",
        "category": "services",
        "url": "research-product-development.html",
        "icon": "fas fa-flask",
        "tag": "Service",
        "keywords": [
            "research",
            "rnd",
            "deep tech",
            "product development",
            "poc",
            "prototyping",
            "innovation",
            "hardware"
        ]
    },
    {
        "id": "sol-overview",
        "title": "Industry Solutions Directory",
        "desc": "Domain-tailored blueprints across manufacturing, defense, smart cities, and cloud infrastructure",
        "category": "solutions",
        "url": "solutions.html",
        "icon": "fas fa-building",
        "tag": "Directory",
        "keywords": [
            "solutions",
            "industries",
            "blueprints",
            "verticals",
            "enterprise solutions"
        ]
    },
    {
        "id": "sol-manufacturing",
        "title": "Industrial Manufacturing & Defect QA",
        "desc": "Sub-millimeter automated optical inspection (AOI) with 99.8% precision at production line speeds",
        "category": "solutions",
        "url": "solutions.html#manufacturing",
        "icon": "fas fa-industry",
        "tag": "Solution",
        "keywords": [
            "manufacturing",
            "defect",
            "qa",
            "aoi",
            "optical inspection",
            "quality control",
            "factory",
            "industrial"
        ]
    },
    {
        "id": "sol-smart-cities",
        "title": "Smart Cities & Intelligent Infrastructure",
        "desc": "Real-time municipal traffic flow optimization, edge surveillance, and urban anomaly response",
        "category": "solutions",
        "url": "solutions.html#smart-cities",
        "icon": "fas fa-city",
        "tag": "Solution",
        "keywords": [
            "smart cities",
            "infrastructure",
            "traffic",
            "urban",
            "surveillance",
            "municipal",
            "iot"
        ]
    },
    {
        "id": "sol-defense",
        "title": "Perimeter Defense & Critical Security",
        "desc": "Autonomous multi-camera intrusion alerts, thermal radar sensor fusion, and air-gapped threat logs",
        "category": "solutions",
        "url": "solutions.html#defense",
        "icon": "fas fa-shield-virus",
        "tag": "Solution",
        "keywords": [
            "perimeter",
            "defense",
            "security",
            "intrusion",
            "military",
            "border",
            "radar",
            "patrol",
            "surveillance"
        ]
    },
    {
        "id": "sol-cloud-modern",
        "title": "Enterprise Cloud Modernization",
        "desc": "Modernizing monolithic legacy systems into elastic, decoupled microservices with 99.99% SLA",
        "category": "solutions",
        "url": "solutions.html#cloud-modernization",
        "icon": "fas fa-server",
        "tag": "Solution",
        "keywords": [
            "cloud modernization",
            "legacy",
            "migration",
            "hybrid cloud",
            "serverless",
            "enterprise"
        ]
    },
    {
        "id": "sol-higher-ed",
        "title": "Higher Education & Institutional Analytics",
        "desc": "Predictive student retention models, institutional telemetry, and centralized campus portals",
        "category": "solutions",
        "url": "solutions.html#higher-ed",
        "icon": "fas fa-graduation-cap",
        "tag": "Solution",
        "keywords": [
            "higher ed",
            "education",
            "university",
            "analytics",
            "campus",
            "academic",
            "retention"
        ]
    },
    {
        "id": "sol-logistics",
        "title": "Logistics & Real-Time Fleet Tracking",
        "desc": "Autonomous route optimization, cross-dock computer vision telemetry, and predictive maintenance",
        "category": "solutions",
        "url": "solutions.html#logistics",
        "icon": "fas fa-truck-fast",
        "tag": "Solution",
        "keywords": [
            "logistics",
            "fleet",
            "supply chain",
            "warehouse",
            "freight",
            "transportation",
            "tracking"
        ]
    },
    {
        "id": "sol-ecommerce",
        "title": "High-Concurrency E-Commerce Systems",
        "desc": "Resilient checkout pipelines, personalized vector recommendation engines, and zero-downtime sales",
        "category": "solutions",
        "url": "solutions.html#ecommerce",
        "icon": "fas fa-cart-shopping",
        "tag": "Solution",
        "keywords": [
            "ecommerce",
            "e-commerce",
            "retail",
            "checkout",
            "payments",
            "shopping",
            "store"
        ]
    },
    {
        "id": "sol-matrix",
        "title": "Comparative Engineering Matrix",
        "desc": "Evaluate architectural capabilities, throughput standards, and latency benchmarks across industries",
        "category": "solutions",
        "url": "solutions.html#comparison-matrix",
        "icon": "fas fa-table-cells",
        "tag": "Matrix",
        "keywords": [
            "matrix",
            "comparison",
            "evaluation",
            "benchmarks",
            "criteria",
            "industry matrix"
        ]
    },
    {
        "id": "sol-faq",
        "title": "Solutions Architecture FAQ",
        "desc": "Common questions on deployment velocity, air-gapped enclaves, SLA tiers, and migration roadmaps",
        "category": "solutions",
        "url": "solutions.html#solutions-faq",
        "icon": "fas fa-question-circle",
        "tag": "FAQ",
        "keywords": [
            "faq",
            "questions",
            "answers",
            "support",
            "architecture faq",
            "help"
        ]
    },
    {
        "id": "docs-hub",
        "title": "Developer Documentation Hub",
        "desc": "Guides, SDK references, gRPC protocols, and hardware acceleration guides for engineers",
        "category": "docs",
        "url": "docs.html#overview",
        "icon": "fas fa-book",
        "tag": "Documentation",
        "keywords": [
            "docs",
            "developer",
            "documentation",
            "api",
            "sdk",
            "quickstart",
            "guide",
            "manual"
        ]
    },
    {
        "id": "docs-prereqs",
        "title": "Hardware & Enclave Prerequisites",
        "desc": "Confidential computing specs, NVIDIA GPU drivers, CUDA acceleration, and enclave verification keys",
        "category": "docs",
        "url": "docs.html#prerequisites",
        "icon": "fas fa-key",
        "tag": "Setup",
        "keywords": [
            "prerequisites",
            "hardware",
            "enclaves",
            "keys",
            "requirements",
            "cuda",
            "setup"
        ]
    },
    {
        "id": "docs-helm",
        "title": "Installing AURA Core via Helm",
        "desc": "Deploy enterprise AURA core clusters onto EKS, GKE, AKS, or bare-metal Kubernetes nodes",
        "category": "docs",
        "url": "docs.html#helm-install",
        "icon": "fas fa-dharmachakra",
        "tag": "Kubernetes",
        "keywords": [
            "helm",
            "install",
            "kubernetes",
            "k8s",
            "cluster",
            "deploy",
            "helm chart",
            "eks",
            "gke"
        ]
    },
    {
        "id": "docs-docker",
        "title": "Docker Compose Edge Mesh Deploy",
        "desc": "Single-node or edge appliance compose stack with TensorRT FP8 and TLS enclave integration",
        "category": "docs",
        "url": "docs.html#docker-install",
        "icon": "fab fa-docker",
        "tag": "Container",
        "keywords": [
            "docker",
            "compose",
            "container",
            "docker-compose",
            "image",
            "runtime"
        ]
    },
    {
        "id": "docs-rust",
        "title": "Rust & C++ Native Client SDK",
        "desc": "Zero-copy high-throughput telemetry ingestion with Tokio async and hardware enclave bindings",
        "category": "docs",
        "url": "docs.html#rust-sdk",
        "icon": "fab fa-rust",
        "tag": "SDK",
        "keywords": [
            "rust",
            "c++",
            "native",
            "sdk",
            "cargo",
            "tokio",
            "performance",
            "low latency"
        ]
    },
    {
        "id": "docs-python",
        "title": "Python Async Client SDK",
        "desc": "Lightweight Python client for transmitting 120 FPS YOLO spatial frames and agent interactions",
        "category": "docs",
        "url": "docs.html#python-sdk",
        "icon": "fab fa-python",
        "tag": "SDK",
        "keywords": [
            "python",
            "pip",
            "async",
            "sdk",
            "py",
            "client",
            "yolo frames",
            "telemetry client"
        ]
    },
    {
        "id": "docs-jetson",
        "title": "NVIDIA Jetson & DGX Edge Setup",
        "desc": "Deploy quantized models onto Jetson Orin Nano, AGX, and bare-metal edge appliances with JetPack",
        "category": "docs",
        "url": "docs.html#edge-quickstart",
        "icon": "fas fa-microchip",
        "tag": "Edge",
        "keywords": [
            "jetson",
            "nvidia",
            "orin",
            "dgx",
            "edge agent",
            "jetpack",
            "rtsp",
            "hardware"
        ]
    },
    {
        "id": "docs-k3s",
        "title": "K3s Lightweight Cluster Edge Node",
        "desc": "Join edge gateways to centralized control planes with lightweight K3s agent orchestration",
        "category": "docs",
        "url": "docs.html#k3s-edge",
        "icon": "fas fa-server",
        "tag": "Edge K8s",
        "keywords": [
            "k3s",
            "lightweight",
            "edge cluster",
            "node join",
            "agent",
            "edge k8s"
        ]
    },
    {
        "id": "docs-api-telemetry",
        "title": "Telemetry Ingest API Endpoint (POST)",
        "desc": "Sub-millisecond gRPC & REST endpoint streaming high-frequency sensor and perception frames",
        "category": "docs",
        "url": "docs.html#api-telemetry",
        "icon": "fas fa-satellite-dish",
        "tag": "API Endpoint",
        "keywords": [
            "api telemetry",
            "telemetry ingest",
            "post telemetry",
            "metrics",
            "grpc stream"
        ]
    },
    {
        "id": "docs-api-mesh",
        "title": "AgentMesh State API Endpoint (GET)",
        "desc": "Inspect active reasoning agents, swarm health index, and autonomous cluster remediations",
        "category": "docs",
        "url": "docs.html#api-mesh",
        "icon": "fas fa-network-wired",
        "tag": "API Endpoint",
        "keywords": [
            "api mesh",
            "agentmesh get",
            "agents status",
            "swarm health",
            "cluster state"
        ]
    },
    {
        "id": "docs-api-vision",
        "title": "Vision Stream Inference API (POST)",
        "desc": "Real-time video inference pipeline processing RTSP camera streams with YOLO spatial parsing",
        "category": "docs",
        "url": "docs.html#api-vision",
        "icon": "fas fa-video",
        "tag": "API Endpoint",
        "keywords": [
            "api vision",
            "yolo stream",
            "inference api",
            "bounding boxes",
            "video stream"
        ]
    },
    {
        "id": "docs-api-finops",
        "title": "FinOps Optimizer API (POST)",
        "desc": "Autonomous spot harvesting and GPU workload allocation to maximize compute cost savings",
        "category": "docs",
        "url": "docs.html#api-finops",
        "icon": "fas fa-coins",
        "tag": "API Endpoint",
        "keywords": [
            "api finops",
            "finops optimize",
            "cost reduction",
            "cloud savings",
            "spot harvesting"
        ]
    },
    {
        "id": "tech-directory",
        "title": "120+ Technology Stacks Directory",
        "desc": "Explore Zevionix enterprise stacks across programming languages, AI, cloud, and streaming",
        "category": "tech",
        "url": "technology.html",
        "icon": "fas fa-cubes",
        "tag": "Technology",
        "keywords": [
            "technology",
            "stacks",
            "tech stack",
            "ecosystem",
            "frameworks",
            "tools",
            "languages"
        ]
    },
    {
        "id": "tech-lang",
        "title": "Programming Languages (Rust, Python, Go, C++, CUDA)",
        "desc": "Polyglot systems development in Rust, C++, Go, Python, TypeScript, CUDA C++, and SQL",
        "category": "tech",
        "url": "technology.html#tech-languages",
        "icon": "fas fa-terminal",
        "tag": "Languages",
        "keywords": [
            "programming languages",
            "rust",
            "python",
            "go",
            "c++",
            "c#",
            "typescript",
            "cuda",
            "java",
            "sql"
        ]
    },
    {
        "id": "tech-ai",
        "title": "AI & Vision Frameworks (PyTorch, TensorRT, Triton)",
        "desc": "Deep learning tooling: TensorRT, PyTorch, YOLOv10, ONNX, OpenCV, Vision Transformers, and vLLM",
        "category": "tech",
        "url": "technology.html#tech-ai-vision",
        "icon": "fas fa-brain",
        "tag": "AI Frameworks",
        "keywords": [
            "pytorch",
            "tensorrt",
            "triton",
            "opencv",
            "onnx",
            "vit",
            "yolo",
            "deep learning",
            "hugging face"
        ]
    },
    {
        "id": "tech-web",
        "title": "Web & Interface Technologies (React, Next.js, Three.js)",
        "desc": "Frontend and WebAssembly architectures: React, Next.js, Vue, WebGL, Three.js, and Tailwind CSS",
        "category": "tech",
        "url": "technology.html#tech-web-ui",
        "icon": "fas fa-laptop-code",
        "tag": "Frontend",
        "keywords": [
            "react",
            "next.js",
            "vue",
            "svelte",
            "three.js",
            "webgl",
            "webassembly",
            "html5",
            "tailwind"
        ]
    },
    {
        "id": "tech-backend",
        "title": "Backend & Microservices (FastAPI, Actix, Axum, gRPC)",
        "desc": "High-throughput microservices: FastAPI, Actix-web, Axum, NestJS, Spring Boot, and gRPC",
        "category": "tech",
        "url": "technology.html#tech-backend-microservices",
        "icon": "fas fa-server",
        "tag": "Backend",
        "keywords": [
            "fastapi",
            "actix",
            "axum",
            "grpc",
            "graphql",
            "nestjs",
            "spring boot",
            "microservices",
            "django"
        ]
    },
    {
        "id": "tech-cloud",
        "title": "Cloud Infrastructure & DevOps (K8s, Terraform, Docker)",
        "desc": "Cloud-native tooling: AWS, GCP, Azure, Kubernetes, Terraform, ArgoCD, Prometheus, and Vault",
        "category": "tech",
        "url": "technology.html#tech-cloud-devops",
        "icon": "fas fa-cloud",
        "tag": "DevOps",
        "keywords": [
            "kubernetes",
            "docker",
            "terraform",
            "aws",
            "gcp",
            "azure",
            "argocd",
            "prometheus",
            "vault"
        ]
    },
    {
        "id": "tech-data",
        "title": "Databases & Streaming Fabrics (Kafka, Spark, ClickHouse)",
        "desc": "Streaming and data lakes: Apache Kafka, Spark, Flink, ClickHouse, Apache Iceberg, and Snowflake",
        "category": "tech",
        "url": "technology.html#tech-data-streaming",
        "icon": "fas fa-database",
        "tag": "Data Fabrics",
        "keywords": [
            "kafka",
            "spark",
            "clickhouse",
            "iceberg",
            "flink",
            "snowflake",
            "redis",
            "postgresql",
            "mongodb"
        ]
    },
    {
        "id": "tech-protocols",
        "title": "Data Formats & Wire Protocols (Protobuf, Arrow, MQTT)",
        "desc": "Serialization and wire specs: Protocol Buffers, FlatBuffers, Apache Arrow, Parquet, and MQTT",
        "category": "tech",
        "url": "technology.html#tech-protocols",
        "icon": "fas fa-file-code",
        "tag": "Protocols",
        "keywords": [
            "protobuf",
            "protocol buffers",
            "arrow",
            "parquet",
            "flatbuffers",
            "avro",
            "mqtt"
        ]
    },
    {
        "id": "ins-overview",
        "title": "Engineering Insights & Tech Articles",
        "desc": "Deep-dive architectural whitepapers, real-world case breakdowns, and computer vision tutorials",
        "category": "insights",
        "url": "insights.html",
        "icon": "fas fa-newspaper",
        "tag": "Publications",
        "keywords": [
            "insights",
            "blog",
            "articles",
            "whitepaper",
            "engineering",
            "research",
            "tutorials"
        ]
    },
    {
        "id": "ins-tensorrt",
        "title": "Optimizing Vision Transformers with TensorRT",
        "desc": "Benchmarking FP8 quantization and KV-cache optimizations for real-time edge ViT inferences",
        "category": "insights",
        "url": "insights.html#card-tensorrt-vit",
        "icon": "fas fa-bolt",
        "tag": "Research",
        "keywords": [
            "tensorrt vit",
            "vision transformers",
            "edge hardware",
            "fp8 quantization",
            "nvidia",
            "whitepaper"
        ]
    },
    {
        "id": "ins-spark-kafka",
        "title": "Resilient Real-Time Data Pipelines (Spark & Kafka)",
        "desc": "Architecting exactly-once processing semantics under multi-gigabyte backpressure loads",
        "category": "insights",
        "url": "insights.html#card-spark-kafka",
        "icon": "fas fa-database",
        "tag": "Whitepaper",
        "keywords": [
            "spark kafka",
            "real-time pipelines",
            "streaming data",
            "backpressure",
            "exactly-once",
            "data engineering"
        ]
    },
    {
        "id": "ins-aura-mesh",
        "title": "Autonomous Enterprise Agents & Swarm Consensus",
        "desc": "Decentralized peer-to-peer AI agent coordination and distributed spatial reasoning patterns",
        "category": "insights",
        "url": "insights.html#card-aura-mesh",
        "icon": "fas fa-robot",
        "tag": "Whitepaper",
        "keywords": [
            "aura mesh article",
            "autonomous agents",
            "swarm consensus",
            "peer-to-peer",
            "multi-agent systems"
        ]
    },
    {
        "id": "ins-clean-arch",
        "title": "Clean Architecture in High-Throughput Microservices",
        "desc": "Domain-Driven Design (DDD) decoupling business logic from I/O frameworks in production backends",
        "category": "insights",
        "url": "insights.html#card-clean-architecture",
        "icon": "fas fa-cubes-stacked",
        "tag": "Architecture",
        "keywords": [
            "clean architecture",
            "microservices",
            "domain driven design",
            "ddd",
            "backend design patterns"
        ]
    },
    {
        "id": "sec-overview",
        "title": "Security & Compliance Trust Center",
        "desc": "Zero-Trust security posture, regulatory compliance, hardware enclaves, and cryptographic auditing",
        "category": "security",
        "url": "security.html",
        "icon": "fas fa-shield-halved",
        "tag": "Trust Center",
        "keywords": [
            "security",
            "trust center",
            "compliance",
            "cybersecurity",
            "governance",
            "policies"
        ]
    },
    {
        "id": "sec-sdlc",
        "title": "Secure Development Lifecycle (SDLC)",
        "desc": "Automated SAST/DAST scanning, mandatory code sign-offs, and dependency supply-chain audits",
        "category": "security",
        "url": "security.html#sdlc",
        "icon": "fas fa-lock",
        "tag": "Security",
        "keywords": [
            "sdlc",
            "secure development",
            "sast",
            "dast",
            "code audit",
            "security pipeline"
        ]
    },
    {
        "id": "sec-crypto",
        "title": "Zero-Trust Cryptographic Vault Principles",
        "desc": "Hardware-enforced key isolation, AES-256-GCM envelope encryption, and ephemeral tokens",
        "category": "security",
        "url": "security.html#crypto-vault",
        "icon": "fas fa-key",
        "tag": "Cryptography",
        "keywords": [
            "crypto vault",
            "zero trust vault",
            "aes-256-gcm",
            "envelope encryption",
            "key isolation"
        ]
    },
    {
        "id": "sec-compliance",
        "title": "Compliance: SOC 2, ISO 27001, GDPR & HIPAA",
        "desc": "Rigorous adherence to international data privacy regulations and security certifications",
        "category": "security",
        "url": "security.html#compliance",
        "icon": "fas fa-certificate",
        "tag": "Compliance",
        "keywords": [
            "compliance",
            "soc2",
            "iso 27001",
            "gdpr",
            "hipaa",
            "certifications",
            "privacy",
            "audit"
        ]
    },
    {
        "id": "sec-api",
        "title": "Secure API Design & Zero-Day Threat Mitigation",
        "desc": "Mutual TLS, token rate-limiting, gRPC perimeter authorization, and DDoS protection",
        "category": "security",
        "url": "security.html#api-security",
        "icon": "fas fa-network-wired",
        "tag": "API Security",
        "keywords": [
            "api security",
            "mtls",
            "rate limit",
            "ddos",
            "perimeter protection",
            "zero day"
        ]
    },
    {
        "id": "sec-infra",
        "title": "Cloud Hardening & Disaster Recovery SLAs",
        "desc": "Multi-region redundancy, RPO under 1 minute, RTO under 5 minutes, and automated failover",
        "category": "security",
        "url": "security.html#infrastructure",
        "icon": "fas fa-server",
        "tag": "Hardening",
        "keywords": [
            "cloud hardening",
            "disaster recovery",
            "sla",
            "rpo",
            "rto",
            "failover",
            "redundancy"
        ]
    },
    {
        "id": "sec-disclosure",
        "title": "Incident Response & Severity SLA Matrix",
        "desc": "Transparent responsible disclosure guidelines and 24/7 incident escalation SLAs",
        "category": "security",
        "url": "security.html#disclosure",
        "icon": "fas fa-bell",
        "tag": "Disclosure",
        "keywords": [
            "incident response",
            "disclosure",
            "vulnerability",
            "severity matrix",
            "sla response",
            "bug bounty"
        ]
    },
    {
        "id": "cs-overview",
        "title": "Enterprise Case Studies Directory",
        "desc": "Proven production implementations with verifiable KPIs and quantifiable business outcomes",
        "category": "company",
        "url": "case-studies.html",
        "icon": "fas fa-clipboard-check",
        "tag": "Case Studies",
        "keywords": [
            "case studies",
            "track record",
            "portfolio",
            "production results",
            "customer stories",
            "roi"
        ]
    },
    {
        "id": "cs-electronics-qa",
        "title": "Tier-1 Electronics PCB Defect QA Case Study",
        "desc": "Achieved 99.8% defect detection rate across 450,000 units for Tier-1 PCB manufacturing",
        "category": "company",
        "url": "case-studies.html#electronics-qa",
        "icon": "fas fa-microchip",
        "tag": "Case Study",
        "keywords": [
            "case study",
            "electronics",
            "pcb",
            "qa inspection",
            "manufacturing",
            "defect detection"
        ]
    },
    {
        "id": "cs-campus-anomaly",
        "title": "Campus Anomaly Detection Case Study",
        "desc": "Sub-second perimeter breach alerts across 45 enterprise camera zones with zero false alarms",
        "category": "company",
        "url": "case-studies.html#campus-anomaly",
        "icon": "fas fa-building",
        "tag": "Case Study",
        "keywords": [
            "case study",
            "campus",
            "anomaly detection",
            "security",
            "camera zones",
            "perimeter breach"
        ]
    },
    {
        "id": "cs-fintech",
        "title": "Tier-1 FinTech Core Modernization Case Study",
        "desc": "Transitioning monolithic legacy transaction engines to decoupled event-driven microservices",
        "category": "company",
        "url": "case-study-template.html",
        "icon": "fas fa-money-bill-transfer",
        "tag": "FinTech Case",
        "keywords": [
            "fintech",
            "banking",
            "core modernization",
            "transactions",
            "case study",
            "microservices"
        ]
    },
    {
        "id": "co-about",
        "title": "About Zevionix Technologies",
        "desc": "Our engineering ethos, enterprise vision, mission, and foundational technology pillars",
        "category": "company",
        "url": "about.html",
        "icon": "fas fa-info-circle",
        "tag": "Company",
        "keywords": [
            "about",
            "about us",
            "company",
            "mission",
            "story",
            "vision",
            "zevionix",
            "values"
        ]
    },
    {
        "id": "co-team",
        "title": "Executive Leadership & Engineers",
        "desc": "Meet our principal architects, researchers, and engineers driving autonomous intelligence",
        "category": "company",
        "url": "team.html",
        "icon": "fas fa-users",
        "tag": "Leadership",
        "keywords": [
            "team",
            "leadership",
            "executives",
            "architects",
            "engineers",
            "board",
            "founders"
        ]
    },
    {
        "id": "co-team-ceo",
        "title": "Madhavan Balasubramani - Chief Executive Officer",
        "desc": "Leads strategic direction, corporate partnerships, business development, and enterprise growth",
        "category": "company",
        "url": "team.html#team-ceo",
        "icon": "fas fa-user-tie",
        "tag": "CEO",
        "keywords": [
            "madhavan",
            "balasubramani",
            "ceo",
            "chief executive officer",
            "founder",
            "leadership"
        ]
    },
    {
        "id": "co-team-cto",
        "title": "Praveen Kumar - Chief Technology Officer",
        "desc": "Guides engineering strategy, technical architecture, and deep tech scalable platforms",
        "category": "company",
        "url": "team.html#team-cto",
        "icon": "fas fa-user-gear",
        "tag": "CTO",
        "keywords": [
            "praveen",
            "kumar",
            "cto",
            "chief technology officer",
            "founder",
            "technology architect"
        ]
    },
    {
        "id": "co-coralgenz",
        "title": "Coralgenz Global Strategic Partnership",
        "desc": "Official technology alliance with Coralgenz Global accelerating global digital innovation",
        "category": "company",
        "url": "about.html#coralgenz",
        "icon": "fas fa-handshake",
        "tag": "Alliance",
        "keywords": [
            "coralgenz",
            "coralgenz global",
            "partner",
            "partnership",
            "alliance",
            "official partner"
        ]
    },
    {
        "id": "co-contact",
        "title": "Contact & Technical Briefings",
        "desc": "Connect with our solutions architects or schedule an in-depth technical consultation",
        "category": "company",
        "url": "contact.html",
        "icon": "fas fa-envelope",
        "tag": "Contact",
        "keywords": [
            "contact",
            "email",
            "office",
            "consultation",
            "talk",
            "support",
            "inquiry",
            "location",
            "coimbatore"
        ]
    }
];

  // 2. DOM Elements & Injection
  let modalOverlay = document.getElementById('spotlightModalOverlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'spotlightModalOverlay';
    modalOverlay.className = 'spotlight-modal-overlay';
    modalOverlay.setAttribute('role', 'dialog');
    modalOverlay.setAttribute('aria-modal', 'true');
    modalOverlay.setAttribute('aria-label', 'Global Spotlight Command Palette');
    modalOverlay.innerHTML = `
      <div class="spotlight-dialog" role="document">
        <div class="spotlight-header">
          <div class="spotlight-search-icon">
            <i class="fas fa-search"></i>
          </div>
          <input
            type="text"
            id="spotlightSearchInput"
            class="spotlight-input"
            placeholder="Search"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
            aria-label="Search"
            aria-autocomplete="list"
          />
          <div class="spotlight-actions">
            <button type="button" id="spotlightClearBtn" class="spotlight-clear-btn" aria-label="Clear search input" title="Clear">
              <i class="fas fa-times"></i>
            </button>
            <span id="spotlightEscBtn" class="spotlight-esc-pill" title="Close (Escape)">ESC</span>
          </div>
        </div>
        <div id="spotlightResults" class="spotlight-results" role="listbox" aria-label="Search results"></div>
        <div class="spotlight-footer">
          <div class="spotlight-footer-keys">
            <span class="spotlight-key-guide"><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
            <span class="spotlight-key-guide"><kbd>↵</kbd> select</span>
            <span class="spotlight-key-guide"><kbd>ESC</kbd> dismiss</span>
          </div>
          <span class="spotlight-footer-brand">ZEVIONIX SPOTLIGHT</span>
        </div>
      </div>
    `;
    document.body.appendChild(modalOverlay);
  }

  // 3. Navbar Trigger Button Setup / Injection
  let triggerBtn = document.getElementById('spotlightTriggerBtn');
  if (!triggerBtn) {
    const navActions = document.querySelector('.header-inner .nav-actions') || document.querySelector('.navbar .nav-actions');
    if (navActions) {
      triggerBtn = document.createElement('button');
      triggerBtn.id = 'spotlightTriggerBtn';
      triggerBtn.className = 'spotlight-nav-btn';
      triggerBtn.type = 'button';
      triggerBtn.setAttribute('aria-label', 'Search');
      triggerBtn.setAttribute('title', 'Search');
      triggerBtn.innerHTML = `
        <i class="fas fa-search"></i>
        <span class="spotlight-nav-text">Search</span>
      `;
      navActions.insertBefore(triggerBtn, navActions.firstChild);
    }
  } else {
    // If existing button has a kbd badge, remove it
    const kbd = triggerBtn.querySelector('.spotlight-kbd');
    if (kbd) kbd.remove();
    triggerBtn.setAttribute('title', 'Search');
    triggerBtn.setAttribute('aria-label', 'Search');
  }

  const searchInput = document.getElementById('spotlightSearchInput');
  const resultsContainer = document.getElementById('spotlightResults');
  const clearBtn = document.getElementById('spotlightClearBtn');
  const escBtn = document.getElementById('spotlightEscBtn');

  let selectedIndex = 0;
  let currentResultsList = [];
  let previousActiveElement = null;

  // 4. Modal Open/Close Controls
  function openSpotlight() {
    previousActiveElement = document.activeElement;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (searchInput) {
      searchInput.value = '';
      if (clearBtn) clearBtn.style.display = 'none';
      searchInput.focus();
      renderDefaultSuggestions();
    }
  }

  function closeSpotlight() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      try {
        previousActiveElement.focus();
      } catch (err) {}
    }
  }

  function isOpen() {
    return modalOverlay.classList.contains('active');
  }

  // Attach button click events
  if (triggerBtn) {
    triggerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openSpotlight();
    });
  }

  if (escBtn) {
    escBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeSpotlight();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (searchInput) {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        searchInput.focus();
        renderDefaultSuggestions();
      }
    });
  }

  // Backdrop click to close
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeSpotlight();
    }
  });

  // 5. Highlighting Helper Function
  function highlightMatches(text, queryTokens) {
    if (!queryTokens || queryTokens.length === 0 || !text) return text;
    const escapedTokens = queryTokens
      .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .filter(t => t.length > 0);
    if (escapedTokens.length === 0) return text;
    const regex = new RegExp(`(${escapedTokens.join('|')})`, 'gi');
    return text.replace(regex, '<mark class="spotlight-mark">$1</mark>');
  }

  // 6. Multi-term Search Algorithm
  function performSearch(query) {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      renderDefaultSuggestions();
      return;
    }

    const tokens = trimmed.split(/\s+/).filter(Boolean);

    // Score items
    const scored = [];
    searchIndex.forEach(item => {
      const titleLower = item.title.toLowerCase();
      const descLower = item.desc.toLowerCase();
      const tagLower = (item.tag || '').toLowerCase();
      const catMeta = searchCategories[item.category];
      const catName = catMeta ? catMeta.name.toLowerCase() : '';
      const catKey = (item.category || '').toLowerCase();
      const keywordsStr = (item.keywords || []).join(' ').toLowerCase();
      const urlLower = (item.url || '').toLowerCase();
      const allText = `${titleLower} ${descLower} ${tagLower} ${catName} ${catKey} ${keywordsStr} ${urlLower}`;

      // Check if all tokens match anywhere in allText
      const allMatch = tokens.every(token => allText.includes(token));
      if (!allMatch) return;

      let score = 0;
      // Exact full phrase bonus
      if (titleLower.includes(trimmed)) score += 35;
      if (descLower.includes(trimmed)) score += 15;
      if (titleLower.startsWith(trimmed)) score += 25;
      if (keywordsStr.includes(trimmed)) score += 20;

      // Token bonuses
      const itemKwList = (item.keywords || []).map(k => k.toLowerCase());
      tokens.forEach(token => {
        if (titleLower.startsWith(token)) score += 12;
        else if (titleLower.includes(token)) score += 6;
        if (itemKwList.includes(token)) score += 30;
        else if (keywordsStr.includes(token)) score += 6;
        if (tagLower === token) score += 25;
        if (descLower.includes(token)) score += 3;
        if (catName.includes(token) || catKey === token) score += 4;
        if (urlLower.includes(token)) score += 3;
      });

      // Boost Quick Actions
      if (item.category === 'action') score += 5;

      scored.push({ item, score, tokens });
    });

    scored.sort((a, b) => b.score - a.score);

    const matches = scored.map(s => s.item);
    renderResults(matches, tokens);
  }

  // 7. Render Default Suggestions (Top Quick Actions & Key Areas)
  function renderDefaultSuggestions() {
    const defaultItems = [
      searchIndex.find(i => i.id === 'qa-webcam'),
      searchIndex.find(i => i.id === 'qa-briefing'),
      searchIndex.find(i => i.id === 'docs-hub'),
      searchIndex.find(i => i.id === 'tech-directory'),
      searchIndex.find(i => i.id === 'sol-manufacturing'),
      searchIndex.find(i => i.id === 'cs-electronics-qa')
    ].filter(Boolean);

    renderResults(defaultItems, [], true);
  }

  // 8. Render Results grouped by category
  function renderResults(items, tokens = [], isDefault = false) {
    currentResultsList = items;
    selectedIndex = items.length > 0 ? 0 : -1;

    if (items.length === 0) {
      resultsContainer.innerHTML = `
        <div class="spotlight-empty">
          <div class="spotlight-empty-icon">
            <i class="fas fa-search"></i>
          </div>
          <div class="spotlight-empty-title">No direct matches found</div>
          <div class="spotlight-empty-desc">
            We couldn't locate systems matching that query. Try these popular areas:
          </div>
          <div class="spotlight-suggestions">
            <button type="button" class="spotlight-suggest-pill" data-query="AURA Vision">👁️ AURA Vision</button>
            <button type="button" class="spotlight-suggest-pill" data-query="Webcam HUD">📹 Webcam HUD</button>
            <button type="button" class="spotlight-suggest-pill" data-query="Manufacturing QA">🏭 Manufacturing QA</button>
            <button type="button" class="spotlight-suggest-pill" data-query="Coralgenz">🤝 Coralgenz</button>
            <button type="button" class="spotlight-suggest-pill" data-query="Cybersecurity">🛡️ Cybersecurity</button>
            <button type="button" class="spotlight-suggest-pill" data-query="Python SDK">🐍 Python SDK</button>
          </div>
        </div>
      `;

      // Attach click listeners to suggestion pills
      resultsContainer.querySelectorAll('.spotlight-suggest-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          const q = pill.getAttribute('data-query');
          if (searchInput) {
            searchInput.value = q;
            if (clearBtn) clearBtn.style.display = 'block';
            performSearch(q);
            searchInput.focus();
          }
        });
      });
      return;
    }

    // Group items by category in predefined order
    const categoryOrder = ['action', 'aura', 'services', 'solutions', 'docs', 'tech', 'insights', 'security', 'company'];
    const groups = {};
    categoryOrder.forEach(cat => {
      groups[cat] = [];
    });

    items.forEach(item => {
      if (groups[item.category]) {
        groups[item.category].push(item);
      } else {
        if (!groups['company']) groups['company'] = [];
        groups['company'].push(item);
      }
    });

    let html = '';
    let flatIndex = 0;

    categoryOrder.forEach(cat => {
      const catItems = groups[cat];
      if (catItems && catItems.length > 0) {
        const catMeta = searchCategories[cat] || { name: cat, icon: '📌' };
        const label = isDefault && cat === 'action' ? 'Suggested Quick Actions' : catMeta.name;
        html += `<div class="spotlight-group-title"><span>${catMeta.icon}</span> ${label}</div>`;

        catItems.forEach(item => {
          const isSelected = flatIndex === selectedIndex;
          const highlightedTitle = highlightMatches(item.title, tokens);
          const highlightedDesc = highlightMatches(item.desc, tokens);

          html += `
            <a
              href="${item.url}"
              class="spotlight-item ${isSelected ? 'selected' : ''}"
              data-index="${flatIndex}"
              data-url="${item.url}"
              role="option"
              aria-selected="${isSelected ? 'true' : 'false'}"
            >
              <div class="spotlight-item-icon">
                <i class="${item.icon}"></i>
              </div>
              <div class="spotlight-item-content">
                <div class="spotlight-item-title">
                  <span>${highlightedTitle}</span>
                  <span class="spotlight-item-tag">${item.tag || 'Page'}</span>
                </div>
                <div class="spotlight-item-desc">${highlightedDesc}</div>
              </div>
              <div class="spotlight-item-enter"><kbd>↵</kbd></div>
            </a>
          `;
          flatIndex++;
        });
      }
    });

    resultsContainer.innerHTML = html;

    // Attach item click and hover listeners
    const itemEls = resultsContainer.querySelectorAll('.spotlight-item');
    itemEls.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        updateSelection(idx, false);
      });
      el.addEventListener('click', (e) => {
        const url = el.getAttribute('data-url');
        closeSpotlight();
        handleItemNavigation(url, e);
      });
    });
  }

  // Helper to activate dynamic tabs and playground endpoints when navigating
  function activateDocsFeatures(hashId) {
    if (!hashId) return;

    // 1. Code tab switching in docs.html
    const langMap = {
      'helm-install': 'helm',
      'docker-install': 'docker',
      'rust-sdk': 'rust',
      'python-sdk': 'python'
    };
    if (langMap[hashId]) {
      const lang = langMap[hashId];
      const tabBtn = document.querySelector(`.code-tab-btn[data-lang="${lang}"]`);
      if (tabBtn) tabBtn.click();
    }

    // 2. API Playground endpoint switching in docs.html
    const epMap = {
      'api-telemetry': 'telemetry',
      'api-mesh': 'mesh',
      'api-vision': 'vision',
      'api-finops': 'finops'
    };
    if (epMap[hashId]) {
      const ep = epMap[hashId];
      const select = document.getElementById('apiEndpointSelect');
      if (select) {
        select.value = ep;
        select.dispatchEvent(new Event('change'));
      }
    }
  }

  // 9. Smooth Scroll to Target Element with Visual Highlight Pulse
  function scrollToTargetElement(targetEl) {
    if (!targetEl) return;
    const headerOffset = 85;
    const elementPosition = targetEl.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth'
    });

    // Add visual pulse highlight to show user the place where they searched
    targetEl.classList.remove('spotlight-target-pulse');
    void targetEl.offsetWidth; // Force reflow
    targetEl.classList.add('spotlight-target-pulse');

    setTimeout(() => {
      targetEl.classList.remove('spotlight-target-pulse');
    }, 2400);
  }

  // 10. Handle Item Navigation (smooth scroll + highlight to the searched place)
  function handleItemNavigation(url, event) {
    if (!url) return;
    const currentBase = window.location.pathname.split('/').pop() || 'index.html';
    const [targetPage, targetHash] = url.split('#');

    // If target is same page
    if (targetPage === currentBase || targetPage === '') {
      if (targetHash) {
        if (event) event.preventDefault();
        activateDocsFeatures(targetHash);
        const targetEl = document.getElementById(targetHash);
        if (targetEl) {
          window.history.pushState(null, '', '#' + targetHash);
          scrollToTargetElement(targetEl);
          return;
        }
      } else {
        if (event) event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    // Otherwise regular browser navigation to another page
    window.location.href = url;
  }

  // 11. Navigate to Top/Selected Result or Page Match on Search
  function navigateSearch() {
    const itemEls = resultsContainer.querySelectorAll('.spotlight-item');
    if (itemEls.length > 0) {
      const idx = selectedIndex >= 0 && selectedIndex < itemEls.length ? selectedIndex : 0;
      const selectedEl = itemEls[idx];
      const url = selectedEl.getAttribute('data-url');
      closeSpotlight();
      handleItemNavigation(url);
      return;
    }

    // If no indexed results match, search the current page elements
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    if (query) {
      const candidates = document.querySelectorAll('article, section, .tech-card, h2, h3, h4, h1, p');
      for (const el of candidates) {
        if (el.textContent && el.textContent.toLowerCase().includes(query)) {
          closeSpotlight();
          scrollToTargetElement(el);
          return;
        }
      }
    }
  }

  // 12. Update Active Selection
  function updateSelection(newIndex, scrollIntoView = true) {
    const itemEls = resultsContainer.querySelectorAll('.spotlight-item');
    if (itemEls.length === 0) return;

    if (newIndex < 0) newIndex = 0;
    if (newIndex >= itemEls.length) newIndex = itemEls.length - 1;

    selectedIndex = newIndex;

    itemEls.forEach((el, idx) => {
      const isSelected = idx === selectedIndex;
      el.classList.toggle('selected', isSelected);
      el.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      if (isSelected && scrollIntoView) {
        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });
  }

  // 13. Search Input Listeners (Input & Enter key)
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (clearBtn) {
        clearBtn.style.display = val.length > 0 ? 'block' : 'none';
      }
      performSearch(val);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        navigateSearch();
      }
    });
  }

  // 14. Global Keyboard Shortcuts & Navigation Controls
  document.addEventListener('keydown', (e) => {
    const key = e.key;

    // Optional shortcut triggers (Ctrl+K, Cmd+K, or '/')
    if ((e.ctrlKey || e.metaKey) && (key === 'k' || key === 'K')) {
      e.preventDefault();
      if (isOpen()) {
        closeSpotlight();
      } else {
        openSpotlight();
      }
      return;
    }

    if (key === '/' && !isOpen()) {
      const activeEl = document.activeElement;
      const isEditable = activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.tagName === 'SELECT' ||
        activeEl.isContentEditable
      );
      if (!isEditable) {
        e.preventDefault();
        openSpotlight();
        return;
      }
    }

    // Modal is Open Keyboard Controls
    if (isOpen()) {
      if (key === 'Escape') {
        e.preventDefault();
        closeSpotlight();
        return;
      }

      if (key === 'ArrowDown') {
        e.preventDefault();
        const itemEls = resultsContainer.querySelectorAll('.spotlight-item');
        if (itemEls.length > 0) {
          const nextIndex = (selectedIndex + 1) % itemEls.length;
          updateSelection(nextIndex, true);
        }
        return;
      }

      if (key === 'ArrowUp') {
        e.preventDefault();
        const itemEls = resultsContainer.querySelectorAll('.spotlight-item');
        if (itemEls.length > 0) {
          const prevIndex = (selectedIndex - 1 + itemEls.length) % itemEls.length;
          updateSelection(prevIndex, true);
        }
        return;
      }

      if (key === 'Enter') {
        e.preventDefault();
        navigateSearch();
        return;
      }

      if (key === 'Tab') {
        const focusable = [searchInput, clearBtn, escBtn].filter(el => el && el.offsetParent !== null);
        if (focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }
  });

  // 15. Auto-Scroll & Highlight on Hash Navigation (Page Load or Hashchange)
  function checkAndScrollToHash() {
    if (window.location.hash) {
      const hashId = window.location.hash.substring(1);
      activateDocsFeatures(hashId);
      const targetEl = document.getElementById(hashId);
      if (targetEl) {
        setTimeout(() => {
          scrollToTargetElement(targetEl);
        }, 200);
      }
    }
  }

  if (document.readyState === 'complete') {
    checkAndScrollToHash();
  } else {
    window.addEventListener('load', checkAndScrollToHash);
  }
  window.addEventListener('hashchange', checkAndScrollToHash);
}

// Initialize spotlight automatically on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSpotlightSearch);
} else {
  initSpotlightSearch();
}
