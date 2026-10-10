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
      color: state.isSpiking ? '#ef4444' : (state.gpuAccel ? '#38bdf8' : '#a855f7'),
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
      gradient.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
      gradient.addColorStop(0.5, state.isSpiking ? 'rgba(239, 68, 68, 0.4)' : 'rgba(129, 140, 248, 0.4)');
      gradient.addColorStop(1, 'rgba(52, 211, 153, 0.25)');
      
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
      topCtx.shadowBlur = 8;
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
      topCtx.fillStyle = node.type === 'edge' ? 'rgba(56, 189, 248, 0.2)' :
                         node.type === 'mesh' ? 'rgba(129, 140, 248, 0.25)' : 'rgba(52, 211, 153, 0.2)';
      topCtx.beginPath();
      topCtx.arc(nx, ny, 16, 0, Math.PI * 2);
      topCtx.fill();

      // Node core
      topCtx.fillStyle = node.type === 'edge' ? '#38bdf8' :
                         node.type === 'mesh' ? '#818cf8' : '#34d399';
      topCtx.beginPath();
      topCtx.arc(nx, ny, 6, 0, Math.PI * 2);
      topCtx.fill();

      // Node label
      topCtx.fillStyle = '#94a3b8';
      topCtx.font = '10px "JetBrains Mono", monospace';
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
    telCtx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
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

    // Draw Throughput Series (Cyan)
    const cyanGrad = telCtx.createLinearGradient(0, 0, 0, h);
    cyanGrad.addColorStop(0, 'rgba(56, 189, 248, 0.2)');
    cyanGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
    drawSeries(state.history.throughput, '#38bdf8', cyanGrad, 12000000);

    // Draw GPU Load Series (Green)
    const greenGrad = telCtx.createLinearGradient(0, 0, 0, h);
    greenGrad.addColorStop(0, 'rgba(52, 211, 153, 0.15)');
    greenGrad.addColorStop(1, 'rgba(52, 211, 153, 0)');
    drawSeries(state.history.gpuLoad, '#34d399', greenGrad, 100);

    // Draw Graph Legends & Real-time Labels
    telCtx.fillStyle = '#64748b';
    telCtx.font = '10px "JetBrains Mono", monospace';
    telCtx.textAlign = 'left';
    telCtx.fillText('THROUGHPUT (EVENTS/S)', 12, 18);
    telCtx.fillStyle = '#38bdf8';
    telCtx.fillRect(145, 11, 8, 8);

    telCtx.fillStyle = '#64748b';
    telCtx.fillText('GPU COMPUTE (%)', 170, 18);
    telCtx.fillStyle = '#34d399';
    telCtx.fillRect(270, 11, 8, 8);

    requestAnimationFrame(renderTelemetryGraph);
  }

  // Live Terminal Log Generator
  const logMessages = [
    { tag: 'ingest', text: (tp) => `Ingested ${(tp/1000).toFixed(0)}k telemetry events from 32 edge cluster gateways.` },
    { tag: 'swarm', text: (sw) => `Agent Swarm #${Math.floor(Math.random()*sw + 1)} balanced cross-shard edge state in ${(Math.random()*0.4 + 0.2).toFixed(2)}ms.` },
    { tag: 'gpu', text: (gp) => `TensorRT-LLM FP8 inference executed across 8x H100 SXM5 (${gp.toFixed(1)}% load).` },
    { tag: 'vault', text: () => `Zero-trust payload verified with AES-256-GCM enclave token 0x${Math.random().toString(16).substr(2, 8)}.` },
    { tag: 'ingest', text: () => `Sub-millisecond gRPC multiplexer maintained 0 packet drop rate.` }
  ];

  function pushTerminalLog(customTag, customMsg) {
    if (!terminalBody) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(Math.floor(now.getMilliseconds()/10)).padStart(2, '0')}`;
    
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


