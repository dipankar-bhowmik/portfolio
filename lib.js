/**
 * Dipankar Bhowmik — Sysadmin & DevOps Control Room
 * Core Engine & Ground Truth Data Library (lib.js)
 * Zero external dependencies | Vanilla ES6+
 */

const GROUND_TRUTH_DATA = {
  profile: {
    name: "Dipankar Bhowmik",
    title: "IT Support Engineer | Linux & Network Administration",
    targetRoles: "Targeting Technical Support, IT Infrastructure, and DevOps roles",
    location: "Kolkata, West Bengal",
    relocation: "Open to Relocation (Bangalore / PAN India)",
    availability: "Immediate Joiner",
    statusBadge: "Immediate Joiner • Open to Bangalore / PAN India",
    phone: "+91 6296319143",
    email: "dkbhowmik0@gmail.com",
    linkedin: "https://linkedin.com/in/dipankarbhowmik",
    linkedinDisplay: "linkedin.com/in/dipankarbhowmik",
    github: "https://github.com/Annoymous1524",
    githubDisplay: "github.com/Annoymous1524",
    flaskRepo: "https://github.com/Annoymous1524/flask-k8s-devops",
    flaskRepoDisplay: "github.com/Annoymous1524/flask-k8s-devops",
    objective:
      "Motivated and hands-on IT Support professional with nearly 1 year of enterprise experience in desktop/laptop troubleshooting, Windows/Linux administration, network issue resolution, Active Directory management, and endpoint security. Adept at supporting large user bases, resolving tickets end-to-end, and maintaining reliable IT operations. Seeking a Technical Support Engineer or IT Infrastructure role with a clear growth path toward DevOps and cloud engineering.",
    languages: [
      { language: "Bengali", proficiency: "Native" },
      { language: "English", proficiency: "Professional" },
      { language: "Hindi", proficiency: "Conversational" }
    ]
  },

  experience: [
    {
      id: "arc-doc-solutions",
      role: "Network / IT Support Intern",
      company: "ARC Document Solutions India Pvt. Ltd.",
      location: "Kolkata, West Bengal",
      dates: "July 2025 – June 2026",
      usersSupported: 300,
      highlights: [
        "Provided day-to-day technical support for ~300 enterprise users across Windows 10/11 and Ubuntu Linux environments.",
        "Troubleshot desktop/laptop hardware, OS, Ubuntu Linux, Office 365, Outlook, MS Teams, Zoom, printers, and login/network issues.",
        "Installed and configured Windows OS, required drivers, printers, Office 365, Zoom, and business software across multiple endpoints.",
        "Managed Active Directory domain joins, user/computer objects, local admin rights, group/user troubleshooting, and basic GPO troubleshooting.",
        "Deployed and maintained endpoint security: CrowdStrike Falcon, BitLocker encryption, and ScreenConnect remote support.",
        "Assisted with Linux server installation, apt/yum patching, kernel updates, repository management, systemctl services, LVM, and SSH administration.",
        "Executed network diagnostics: TCP/IP, DNS, DHCP, gateway, subnetting, VPN, NAT, static IP, ping, tracert, ipconfig, and basic firewall rules.",
        "Operated virtualization platforms: Hyper-V, Proxmox, and VMware Workstation (VM provisioning, disk management, troubleshooting).",
        "Authored SOP documentation, maintained ticket records, and structured escalation handoff notes to senior engineers."
      ]
    }
  ],

  education: {
    degree: "B.Sc. (Hons.) in Advanced Networking & Cyber Security",
    institution: "Brainware University, Barasat, Kolkata",
    dates: "2022 – 2025"
  },

  certifications: [
    { name: "Networking Essentials", issuer: "Cisco" },
    { name: "AWS Cloud Practitioner Essentials", issuer: "Amazon Web Services" },
    { name: "Advanced Cyber Security: An Application Approach", issuer: "TCS iON Industry Honour Course" },
    { name: "Certification in Ethical Hacking", issuer: "Indian School of Ethical Hacking" },
    { name: "Linux Administration Basics", issuer: "Verified Coursework" },
    { name: "Cloud & DevOps Fundamentals", issuer: "Verified Coursework" }
  ],

  projects: [
    {
      id: "patch-automation",
      title: "Linux Patch Management Automation & Observability Stack",
      badge: "Flagship Project 1",
      stack: ["Ansible", "Shell Scripting", "Ubuntu/RHEL Linux", "Custom Patch-Log Exporter", "Prometheus", "Grafana"],
      summary:
        "End-to-end automated Linux server patching pipeline with pre-flight safety gates, wave-based execution, reboot-required detection, structured JSON/CSV reporting, and Prometheus/Grafana observability.",
      architectureFlow: [
        "Pre-flight safety role (checks /var disk headroom, held dpkg/apt locks, NTP clock drift, and SSH reachability)",
        "Rolling wave-based patching across Ubuntu & RHEL hosts",
        "Kernel/reboot-required detection (/var/run/reboot-required & needs-restarting)",
        "Structured JSON/CSV host reports capturing hostname, OS, kernel, updates, and reboot flags",
        "Prometheus textfile/exporter metrics (patch_run_duration_seconds, patch_pending_updates, patch_reboot_required, patch_preflight_status)",
        "Grafana observability dashboard for fleet-wide compliance visibility"
      ]
    },
    {
      id: "infra-security-stack",
      title: "Additional Infrastructure & Security Work",
      badge: "Secondary Project 2",
      stack: ["ELK Stack (Elasticsearch, Logstash, Kibana, Filebeat)", "Nginx", "ModSecurity WAF", "Flask", "Kubernetes"],
      repo: "https://github.com/Annoymous1524/flask-k8s-devops",
      repoLabel: "github.com/Annoymous1524/flask-k8s-devops",
      summary:
        "Centralized log shipping and analysis pipeline using Filebeat and ELK Stack, reverse-proxy hardening via Nginx with ModSecurity WAF rules, and containerized Flask/Kubernetes deployment workflows."
    }
  ],

  fieldNotes: [
    {
      id: "fn-dpkg-locks",
      number: "01",
      title: "Handling Stale dpkg/apt Locks Safely in Ansible Pre-Flight",
      tag: "Ansible • Ubuntu/Debian • Package Safety",
      problem:
        "Unattended upgrades or interrupted apt sessions leave /var/lib/dpkg/lock-frontend or /var/lib/apt/lists/lock held on Ubuntu nodes, causing automated Ansible patch runs to fail mid-wave or risk partial package states.",
      rootCause:
        "Blindly deleting lock files (rm -f /var/lib/dpkg/lock*) while an active apt/dpkg process is writing to the package database corrupts /var/lib/dpkg/status and breaks host package integrity.",
      fix:
        "Implemented a pre-flight check using fuser/lsof against /var/lib/dpkg/lock-frontend and pgrep for apt/dpkg processes. If a live PID holds the lock, Ansible marks patch_preflight_status=0 and safely skips the host for review rather than force-killing or deleting locks.",
      snippet: `# Pre-flight lock verification task (non-destructive)
- name: Check active PID holding dpkg lock-frontend
  ansible.builtin.shell: |
    if fuser /var/lib/dpkg/lock-frontend >/dev/null 2>&1; then
      echo "LOCKED_ACTIVE_PID"
      exit 1
    fi
    echo "CLEAN"
  register: dpkg_lock_check
  changed_when: false
  failed_when: dpkg_lock_check.rc != 0`
    },
    {
      id: "fn-prometheus-metrics",
      number: "02",
      title: "Converting Unstructured Ansible Play Recaps into Deterministic Prometheus Metrics",
      tag: "Prometheus • Custom Exporter • Observability",
      problem:
        "Standard Ansible stdout logs and PLAY RECAP blocks are human-readable text streams that cannot be scraped directly by Prometheus for alerting on failed pre-flights or pending security updates.",
      rootCause:
        "Relying on fragile regex scraping of raw terminal logs breaks whenever output formatting changes and fails to preserve per-host dimensional labels (os, env, kernel).",
      fix:
        "Created an Ansible post-task template that writes a structured JSON host report and atomically outputs OpenMetrics-compliant gauge lines to /var/lib/node_exporter/textfile_collector/patch_metrics.prom via a temporary file rename.",
      snippet: `# Deterministic Prometheus textfile exposition output
# HELP patch_preflight_status Pre-flight check result (1=pass, 0=blocked)
# TYPE patch_preflight_status gauge
patch_preflight_status{host="prd-ubuntu-web01",os="Ubuntu 22.04",env="prod"} 1
# HELP patch_pending_updates Remaining unapplied package updates
# TYPE patch_pending_updates gauge
patch_pending_updates{host="prd-ubuntu-web01",os="Ubuntu 22.04"} 0
# HELP patch_reboot_required Kernel/system reboot required flag (1=yes, 0=no)
# TYPE patch_reboot_required gauge
patch_reboot_required{host="prd-ubuntu-web01",kernel="5.15.0-113-generic"} 1`
    },
    {
      id: "fn-reboot-detection",
      number: "03",
      title: "Enforcing Reboot-Required Checks Cleanly Across Mixed Ubuntu & RHEL Fleets",
      tag: "Ubuntu • RHEL/CentOS • Kernel Maintenance",
      problem:
        "Mixed Linux fleets use completely different mechanisms to signal that a kernel or core library (glibc/openssl) update requires a system reboot to take effect.",
      rootCause:
        "Ubuntu/Debian writes /var/run/reboot-required via update-notifier-common, whereas RHEL/CentOS does not create that file and instead relies on needs-restarting -r from yum-utils/dnf-utils.",
      fix:
        "Built a unified OS-family conditional task in Ansible: checks stat on /var/run/reboot-required when ansible_os_family == 'Debian', and executes needs-restarting -r (exit code 1 = reboot needed) when ansible_os_family == 'RedHat', normalizing both into a single patch_reboot_required boolean.",
      snippet: `# Unified cross-distro reboot detection logic
- name: Check reboot flag on Debian/Ubuntu
  ansible.builtin.stat:
    path: /var/run/reboot-required
  register: deb_reboot
  when: ansible_os_family == "Debian"

- name: Check needs-restarting on RHEL/CentOS
  ansible.builtin.command: needs-restarting -r
  register: rhel_reboot
  failed_when: false
  changed_when: false
  when: ansible_os_family == "RedHat"`
    }
  ],

  skillsMatrix: [
    {
      skill: "Ubuntu Linux & RHEL/CentOS Administration",
      category: "linux",
      categoryLabel: "Linux & OS",
      details: "User management, SSH hardening, apt/yum patching, kernel maintenance, systemctl services, LVM, file permissions, log analysis",
      proofType: "work",
      proofBadge: "[Work: ARC Document Solutions]",
      proofSecondary: "[Project: Ansible Patch Lab]",
      targetSection: "lab-ansible"
    },
    {
      skill: "Ansible Automation & Shell Scripting",
      category: "devops",
      categoryLabel: "Automation & Monitoring",
      details: "Playbooks, ad-hoc commands, pre-flight safety roles, wave patching, JSON/CSV patch reporting, Prometheus metric exporters",
      proofType: "project",
      proofBadge: "[Project: Ansible Patch Lab]",
      proofSecondary: "[Academic: B.Sc. Networking & Cyber Security]",
      targetSection: "lab-ansible"
    },
    {
      skill: "Enterprise Networking & Diagnostics",
      category: "networking",
      categoryLabel: "Networking",
      details: "TCP/IP, DNS, DHCP, IP addressing, CIDR subnetting, LAN/WAN troubleshooting, VPN, NAT, static IP, ping, tracert, ipconfig, basic firewall",
      proofType: "work",
      proofBadge: "[Work: ARC Document Solutions]",
      proofSecondary: "[Academic: B.Sc. Networking & Cyber Security]",
      targetSection: "lab-triage"
    },
    {
      skill: "Active Directory & Windows 10/11 / Server",
      category: "sysadmin",
      categoryLabel: "Identity & Endpoints",
      details: "Domain join, user/computer object management, local admin rights, group troubleshooting, basic GPO, Windows OS & driver deployment",
      proofType: "work",
      proofBadge: "[Work: ARC Document Solutions]",
      proofSecondary: "",
      targetSection: "lab-triage"
    },
    {
      skill: "Endpoint Security & Remote Support",
      category: "security",
      categoryLabel: "Security & Support",
      details: "CrowdStrike Falcon endpoint protection, BitLocker disk encryption, ScreenConnect remote support, Remote Desktop, antivirus management",
      proofType: "work",
      proofBadge: "[Work: ARC Document Solutions]",
      proofSecondary: "[Academic: B.Sc. Networking & Cyber Security]",
      targetSection: "lab-triage"
    },
    {
      skill: "Virtualization (Hyper-V, Proxmox, VMware)",
      category: "sysadmin",
      categoryLabel: "Virtualization",
      details: "VM provisioning, virtual disk management, snapshot workflows, and host/guest troubleshooting across Hyper-V, Proxmox VE, and VMware Workstation",
      proofType: "work",
      proofBadge: "[Work: ARC Document Solutions]",
      proofSecondary: "",
      targetSection: "hero-section"
    },
    {
      skill: "Observability & Web Security (Prometheus, Grafana, ELK, WAF)",
      category: "devops",
      categoryLabel: "Automation & Monitoring",
      details: "Prometheus metrics exposition, Grafana dashboards, ELK Stack (Elasticsearch, Logstash, Kibana, Filebeat), Nginx reverse proxy, ModSecurity WAF, Flask/K8s",
      proofType: "project",
      proofBadge: "[Project: Ansible Patch Lab]",
      proofSecondary: "[Academic: B.Sc. Networking & Cyber Security]",
      targetSection: "field-notes"
    },
    {
      skill: "Enterprise Application & Hardware Triage (~300 Users)",
      category: "sysadmin",
      categoryLabel: "Identity & Endpoints",
      details: "Microsoft Office 365, Outlook, MS Teams, Zoom, network printers/scanners, laptop/desktop hardware diagnostics, SOP authoring & escalation notes",
      proofType: "work",
      proofBadge: "[Work: ARC Document Solutions]",
      proofSecondary: "",
      targetSection: "lab-triage"
    }
  ]
};

/**
 * Initial 6-Host Fleet Configuration for Centerpiece Lab 1
 */
const INITIAL_FLEET_HOSTS = [
  {
    id: "prd-ubuntu-web01",
    hostname: "prd-ubuntu-web01",
    ip: "10.20.1.10",
    os: "Ubuntu 22.04 LTS",
    osFamily: "Debian",
    pkgMgr: "apt",
    env: "prod",
    wave: 1,
    kernelBefore: "5.15.0-107-generic",
    kernelAfter: "5.15.0-113-generic",
    baseDiskPct: 64,
    pendingUpdates: 14,
    securityUpdates: 5,
    needsKernelReboot: true,
    baseDurationSec: 18.4,
    faults: {
      diskFull: false,
      dpkgLock: false,
      ntpDrift: false,
      unreachable: false
    }
  },
  {
    id: "prd-ubuntu-app02",
    hostname: "prd-ubuntu-app02",
    ip: "10.20.1.11",
    os: "Ubuntu 22.04 LTS",
    osFamily: "Debian",
    pkgMgr: "apt",
    env: "prod",
    wave: 1,
    kernelBefore: "5.15.0-112-generic",
    kernelAfter: "5.15.0-112-generic",
    baseDiskPct: 58,
    pendingUpdates: 8,
    securityUpdates: 2,
    needsKernelReboot: false,
    baseDurationSec: 12.1,
    faults: {
      diskFull: false,
      dpkgLock: false,
      ntpDrift: false,
      unreachable: false
    }
  },
  {
    id: "prd-rhel-db01",
    hostname: "prd-rhel-db01",
    ip: "10.20.1.20",
    os: "RHEL 9.3",
    osFamily: "RedHat",
    pkgMgr: "yum/dnf",
    env: "prod",
    wave: 2,
    kernelBefore: "5.14.0-362.18.1.el9_3",
    kernelAfter: "5.14.0-362.24.1.el9_3",
    baseDiskPct: 71,
    pendingUpdates: 19,
    securityUpdates: 7,
    needsKernelReboot: true,
    baseDurationSec: 26.8,
    faults: {
      diskFull: false,
      dpkgLock: false,
      ntpDrift: false,
      unreachable: false
    }
  },
  {
    id: "prd-rhel-MON01",
    hostname: "prd-rhel-mon01",
    ip: "10.20.1.21",
    os: "RHEL 8.9",
    osFamily: "RedHat",
    pkgMgr: "yum",
    env: "prod",
    wave: 2,
    kernelBefore: "4.18.0-513.18.1.el8_9",
    kernelAfter: "4.18.0-513.18.1.el8_9",
    baseDiskPct: 49,
    pendingUpdates: 6,
    securityUpdates: 1,
    needsKernelReboot: false,
    baseDurationSec: 11.5,
    faults: {
      diskFull: false,
      dpkgLock: false,
      ntpDrift: false,
      unreachable: false
    }
  },
  {
    id: "stg-ubuntu-ci01",
    hostname: "stg-ubuntu-ci01",
    ip: "10.20.2.15",
    os: "Ubuntu 24.04 LTS",
    osFamily: "Debian",
    pkgMgr: "apt",
    env: "staging",
    wave: 1,
    kernelBefore: "6.8.0-31-generic",
    kernelAfter: "6.8.0-35-generic",
    baseDiskPct: 77,
    pendingUpdates: 22,
    securityUpdates: 6,
    needsKernelReboot: true,
    baseDurationSec: 21.3,
    faults: {
      diskFull: false,
      dpkgLock: false,
      ntpDrift: false,
      unreachable: false
    }
  },
  {
    id: "stg-rhel-proxy01",
    hostname: "stg-rhel-proxy01",
    ip: "10.20.2.25",
    os: "RHEL 9.3",
    osFamily: "RedHat",
    pkgMgr: "yum/dnf",
    env: "staging",
    wave: 2,
    kernelBefore: "5.14.0-362.24.1.el9_3",
    kernelAfter: "5.14.0-362.24.1.el9_3",
    baseDiskPct: 42,
    pendingUpdates: 11,
    securityUpdates: 3,
    needsKernelReboot: false,
    baseDurationSec: 14.9,
    faults: {
      diskFull: false,
      dpkgLock: false,
      ntpDrift: false,
      unreachable: false
    }
  }
];

/**
 * Simulates an Ansible Patch Management Pipeline run across the 6-host fleet
 * based on currently injected faults.
 */
function evaluateFleetSimulation(fleetHosts) {
  const timestamp = new Date().toISOString();
  const hostResults = [];
  const logLines = [];

  logLines.push({
    type: "header",
    text: `PLAY [Linux Fleet Patch Automation & Pre-Flight Gate] **********************************`
  });
  logLines.push({
    type: "info",
    text: `# Inventory: 6 hosts (Ubuntu 22.04/24.04 & RHEL 8.9/9.3) | Strategy: Rolling Wave`
  });

  // Stage 1: Gathering Facts / SSH Reachability
  logLines.push({
    type: "task",
    text: `TASK [Gathering Facts & Verifying SSH Control Path] ************************************`
  });

  fleetHosts.forEach((h) => {
    if (h.faults.unreachable) {
      logLines.push({
        type: "unreachable",
        text: `fatal: [${h.hostname}]: UNREACHABLE! => {"changed": false, "msg": "Failed to connect to the host via ssh: ssh: connect to host ${h.ip} port 22: No route to host", "unreachable": true}`
      });
    } else {
      logLines.push({
        type: "ok",
        text: `ok: [${h.hostname}] => (ip=${h.ip}, os="${h.os}", kernel="${h.kernelBefore}")`
      });
    }
  });

  // Stage 2: Pre-Flight Safety Role
  logLines.push({
    type: "task",
    text: `TASK [preflight_safety : Check /var disk headroom (<85%), package locks, and NTP drift] **`
  });

  fleetHosts.forEach((h) => {
    const varDiskPct = h.faults.diskFull ? 96 : h.baseDiskPct;
    const lockHeld = h.faults.dpkgLock;
    const ntpOffsetSec = h.faults.ntpDrift ? 42.0 : 0.003;
    const sshReachable = !h.faults.unreachable;

    let preflightStatus = "PASS"; // PASS, WARN, BLOCK
    const blockReasons = [];
    const warnReasons = [];

    if (!sshReachable) {
      preflightStatus = "BLOCK";
      blockReasons.push("SSH Unreachable (port 22 timeout)");
    } else {
      if (varDiskPct >= 90) {
        preflightStatus = "BLOCK";
        blockReasons.push(`/var disk at ${varDiskPct}% (exceeds 85% safety threshold)`);
      }
      if (lockHeld) {
        preflightStatus = "BLOCK";
        const lockPath =
          h.osFamily === "Debian" ? "/var/lib/dpkg/lock-frontend" : "/var/run/yum.pid";
        blockReasons.push(`Active package lock held (${lockPath})`);
      }
      if (h.faults.ntpDrift) {
        if (preflightStatus !== "BLOCK") {
          preflightStatus = "WARN";
        }
        warnReasons.push(`NTP clock drift +${ntpOffsetSec}s detected (chronyd resync triggered)`);
      }
    }

    if (sshReachable) {
      if (preflightStatus === "BLOCK") {
        logLines.push({
          type: "failed",
          text: `failed: [${h.hostname}] => {"changed": false, "preflight": "BLOCKED", "reasons": ${JSON.stringify(
            blockReasons
          )}}`
        });
      } else if (preflightStatus === "WARN") {
        logLines.push({
          type: "changed",
          text: `changed: [${h.hostname}] => {"preflight": "WARN_AUTO_SYNC", "ntp_offset": "+42s -> synced via chronyc makestep"}`
        });
      } else {
        logLines.push({
          type: "ok",
          text: `ok: [${h.hostname}] => {"var_used_pct": ${varDiskPct}, "pkg_lock": "clean", "ntp_drift_s": 0.003}`
        });
      }
    }

    const blocked = preflightStatus === "BLOCK";
    const updatesApplied = blocked ? 0 : h.pendingUpdates;
    const updatesRemaining = blocked ? h.pendingUpdates : 0;
    const rebootRequired = blocked ? false : h.needsKernelReboot;
    const kernelCurrent = blocked ? h.kernelBefore : h.kernelAfter;
    const durationSec = !sshReachable
      ? 5.0
      : blocked
      ? 3.2
      : Number((h.baseDurationSec + (h.faults.ntpDrift ? 2.4 : 0)).toFixed(1));

    hostResults.push({
      id: h.id,
      hostname: h.hostname,
      ip: h.ip,
      os: h.os,
      osFamily: h.osFamily,
      pkgMgr: h.pkgMgr,
      env: h.env,
      wave: h.wave,
      sshReachable,
      varDiskPct,
      lockHeld,
      ntpOffsetSec,
      preflightStatus,
      preflightNumeric: blocked ? 0 : 1,
      blockReasons,
      warnReasons,
      updatesApplied,
      updatesRemaining,
      initialPending: h.pendingUpdates,
      securityUpdates: h.securityUpdates,
      rebootRequired,
      rebootNumeric: rebootRequired ? 1 : 0,
      kernelBefore: h.kernelBefore,
      kernelCurrent,
      durationSec
    });
  });

  // Stage 3: Wave Patching Execution
  logLines.push({
    type: "task",
    text: `TASK [wave_patching : Execute OS package updates (apt-get dist-upgrade / dnf upgrade)] **`
  });

  hostResults.forEach((hr) => {
    if (!hr.sshReachable) {
      return;
    }
    if (hr.preflightStatus === "BLOCK") {
      logLines.push({
        type: "skipped",
        text: `skipping: [${hr.hostname}] => {"reason": "Skipped wave patching due to Pre-Flight safety gate block"}`
      });
    } else {
      logLines.push({
        type: "changed",
        text: `changed: [${hr.hostname}] => {"wave": ${hr.wave}, "mgr": "${hr.pkgMgr}", "packages_upgraded": ${hr.updatesApplied}, "security_errata": ${hr.securityUpdates}}`
      });
    }
  });

  // Stage 4: Reboot Detection & Exporter Generation
  logLines.push({
    type: "task",
    text: `TASK [post_audit : Detect reboot-required & write JSON/Prometheus textfile metrics] ****`
  });

  hostResults.forEach((hr) => {
    if (!hr.sshReachable || hr.preflightStatus === "BLOCK") {
      return;
    }
    const checkMethod =
      hr.osFamily === "Debian" ? "/var/run/reboot-required" : "needs-restarting -r";
    logLines.push({
      type: "ok",
      text: `ok: [${hr.hostname}] => {"check": "${checkMethod}", "reboot_required": ${hr.rebootRequired}, "exporter": "/var/lib/node_exporter/textfile_collector/patch.prom"}`
    });
  });

  // Stage 5: PLAY RECAP
  logLines.push({
    type: "header",
    text: `PLAY RECAP *****************************************************************************`
  });

  hostResults.forEach((hr) => {
    if (!hr.sshReachable) {
      logLines.push({
        type: "unreachable",
        text: `${hr.hostname.padEnd(20)} : ok=0    changed=0    unreachable=1    failed=0    skipped=0`
      });
    } else if (hr.preflightStatus === "BLOCK") {
      logLines.push({
        type: "failed",
        text: `${hr.hostname.padEnd(20)} : ok=1    changed=0    unreachable=0    failed=1    skipped=1`
      });
    } else if (hr.preflightStatus === "WARN") {
      logLines.push({
        type: "changed",
        text: `${hr.hostname.padEnd(20)} : ok=3    changed=2    unreachable=0    failed=0    skipped=0`
      });
    } else {
      logLines.push({
        type: "ok",
        text: `${hr.hostname.padEnd(20)} : ok=3    changed=1    unreachable=0    failed=0    skipped=0`
      });
    }
  });

  // Generate Prometheus Exposition Text
  const promLines = [
    `# HELP patch_preflight_status Pre-flight safety status (1 = pass/warn, 0 = blocked/unreachable)`,
    `# TYPE patch_preflight_status gauge`,
    ...hostResults.map(
      (hr) =>
        `patch_preflight_status{host="${hr.hostname}",ip="${hr.ip}",os="${hr.os}",env="${hr.env}"} ${hr.preflightNumeric}`
    ),
    ``,
    `# HELP patch_pending_updates Number of pending package updates remaining on host`,
    `# TYPE patch_pending_updates gauge`,
    ...hostResults.map(
      (hr) =>
        `patch_pending_updates{host="${hr.hostname}",os="${hr.os}",env="${hr.env}"} ${hr.updatesRemaining}`
    ),
    ``,
    `# HELP patch_applied_updates_total Number of packages updated in latest run`,
    `# TYPE patch_applied_updates_total gauge`,
    ...hostResults.map(
      (hr) =>
        `patch_applied_updates_total{host="${hr.hostname}",os="${hr.os}",env="${hr.env}"} ${hr.updatesApplied}`
    ),
    ``,
    `# HELP patch_reboot_required Kernel or core library reboot required (1 = required, 0 = no)`,
    `# TYPE patch_reboot_required gauge`,
    ...hostResults.map(
      (hr) =>
        `patch_reboot_required{host="${hr.hostname}",kernel="${hr.kernelCurrent}",env="${hr.env}"} ${hr.rebootNumeric}`
    ),
    ``,
    `# HELP patch_run_duration_seconds Execution duration of host patch cycle in seconds`,
    `# TYPE patch_run_duration_seconds gauge`,
    ...hostResults.map(
      (hr) =>
        `patch_run_duration_seconds{host="${hr.hostname}",wave="${hr.wave}",env="${hr.env}"} ${hr.durationSec}`
    )
  ];

  // Generate CSV Content
  const csvHeader =
    "hostname,ip,env,os,kernel_before,kernel_current,preflight_status,var_disk_pct,updates_applied,updates_pending,reboot_required,duration_seconds";
  const csvRows = hostResults.map(
    (hr) =>
      `${hr.hostname},${hr.ip},${hr.env},"${hr.os}",${hr.kernelBefore},${hr.kernelCurrent},${hr.preflightStatus},${hr.varDiskPct},${hr.updatesApplied},${hr.updatesRemaining},${hr.rebootRequired},${hr.durationSec}`
  );
  const csvContent = [csvHeader, ...csvRows].join("\n");

  // Summary KPIs
  const compliantCount = hostResults.filter((hr) => hr.preflightNumeric === 1).length;
  const totalApplied = hostResults.reduce((acc, hr) => acc + hr.updatesApplied, 0);
  const totalPending = hostResults.reduce((acc, hr) => acc + hr.updatesRemaining, 0);
  const rebootCount = hostResults.filter((hr) => hr.rebootRequired).length;
  const avgDuration = Number(
    (
      hostResults.reduce((acc, hr) => acc + hr.durationSec, 0) / hostResults.length
    ).toFixed(1)
  );

  const jsonReport = {
    report_metadata: {
      generated_by: "Dipankar Bhowmik — Ansible Patch Automation Pipeline",
      timestamp,
      fleet_size: hostResults.length,
      compliant_hosts: compliantCount,
      blocked_hosts: hostResults.length - compliantCount
    },
    hosts: hostResults.map((hr) => ({
      hostname: hr.hostname,
      ip: hr.ip,
      os: hr.os,
      env: hr.env,
      kernel_version: hr.kernelCurrent,
      preflight_status: hr.preflightStatus,
      updates_applied: hr.updatesApplied,
      updates_pending: hr.updatesRemaining,
      reboot_required: hr.rebootRequired,
      run_duration_seconds: hr.durationSec
    }))
  };

  return {
    timestamp,
    hostResults,
    logLines,
    prometheusText: promLines.join("\n"),
    jsonReportText: JSON.stringify(jsonReport, null, 2),
    csvContent,
    kpis: {
      compliantCount,
      totalHosts: hostResults.length,
      compliancePct: Math.round((compliantCount / hostResults.length) * 100),
      totalApplied,
      totalPending,
      rebootCount,
      avgDuration
    }
  };
}

/**
 * Centerpiece Lab 2 — 3 Interactive Enterprise Helpdesk Triage Tickets
 * Inspired by supporting ~300 users at ARC Document Solutions India Pvt. Ltd.
 */
const HELPDESK_TICKETS = {
  "1042": {
    id: "1042",
    number: "INC-1042",
    category: "Networking • Windows 11 Endpoint",
    severity: "P2 — High",
    title: "Workstation Stuck on 169.254.x.x APIPA Address (Floor 2 CAD Pod)",
    reporter: "Finance & CAD Workstation User (ARC Kolkata Floor 2)",
    environment: "Windows 11 Pro • Dell OptiPlex 7090 • Access Switch SW-KOL-FL2-04 Gi0/18",
    symptom:
      "User reports loss of intranet share access, Active Directory login slowness, and inability to reach internal DNS or internet after desk port patching.",
    rootCauseSummary:
      "Access switchport Gi0/18 was left on default VLAN 1 (no DHCP helper) instead of Corp Workstation VLAN 20, while the secondary DHCP scope on VLAN 20 had stale reservation leases.",
    diagnostics: [
      {
        id: "ipconfig",
        label: "Run ipconfig /all",
        cmd: "C:\\Users\\arc.user> ipconfig /all",
        clue: "Confirms Automatic Private IP Addressing (169.254.88.142/16) with empty Default Gateway and DHCP Server.",
        output: `Windows IP Configuration

   Host Name . . . . . . . . . . . . : ARC-KOL-WKS084
   Primary Dns Suffix  . . . . . . . : corp.e-arc.local
   Node Type . . . . . . . . . . . . : Hybrid

Ethernet adapter Ethernet 2:
   Connection-specific DNS Suffix  . :
   Description . . . . . . . . . . . : Intel(R) Ethernet Connection (14) I219-LM
   Physical Address. . . . . . . . . : D4-5D-64-8A-2C-19
   DHCP Enabled. . . . . . . . . . . : Yes
   Autoconfiguration Enabled . . . . : Yes
   Autoconfiguration IPv4 Address. . : 169.254.88.142(Preferred)
   Subnet Mask . . . . . . . . . . . : 255.255.0.0
   Default Gateway . . . . . . . . . :
   DNS Servers . . . . . . . . . . . : fec0:0:0:ffff::1%1
   NetBIOS over Tcpip. . . . . . . . : Enabled`
      },
      {
        id: "ping",
        label: "Run ping & arp check",
        cmd: "C:\\Users\\arc.user> ping 10.20.20.1 & arp -a",
        clue: "Gateway 10.20.20.1 is unreachable at Layer 3; link-local broadcast traffic never reaches the VLAN 20 SVI.",
        output: `Pinging 10.20.20.1 with 32 bytes of data:
PING: transmit failed. General failure.
PING: transmit failed. General failure.

Interface: 169.254.88.142 --- 0xc
  Internet Address      Physical Address      Type
  169.254.255.255       ff-ff-ff-ff-ff-ff     static
  224.0.0.22            01-00-5e-00-00-16     static`
      },
      {
        id: "vlan_dhcp",
        label: "Inspect Switchport VLAN & DHCP Scope",
        cmd: "SW-KOL-FL2-04# show interface Gi0/18 switchport & check DHCP helper",
        clue: "Root Cause Found: Port Gi0/18 is untagged on default VLAN 1 (no ip helper-address) instead of VLAN 20 (Corp_Workstations), and 14 expired leases were holding the /24 pool at 99%.",
        output: `Name: Gi0/18
Switchport: Enabled
Administrative Mode: static access
Operational Mode: static access
Access Mode VLAN: 1 (default)          <-- MISMATCH (Expected: VLAN 20 Corp_Workstations)
Voice VLAN: none

[DHCP Server 10.20.0.5 Scope 10.20.20.0/24 Status]
Pool Range      : 10.20.20.20 - 10.20.20.240
Active Leases   : 206 / 220 (14 stale BAD_ADDRESS entries cleared)
IP Helper SVI   : Configured on Vlan20 (ip helper-address 10.20.0.5)`
      }
    ],
    remediationOptions: [
      {
        id: "fix-correct",
        label: "Assign switchport Gi0/18 to access VLAN 20, purge stale DHCP leases, and run ipconfig /release && ipconfig /renew",
        isCorrect: true,
        feedback:
          "RESOLVED: Port Gi0/18 moved to VLAN 20 (switchport access vlan 20). Endpoint received 10.20.20.144/24, gateway 10.20.20.1, DNS 10.20.0.5. Active Directory Kerberos ticket and SMB shares verified.",
        verificationOutput: `C:\\Users\\arc.user> ipconfig /renew

Ethernet adapter Ethernet 2:
   Connection-specific DNS Suffix  . : corp.e-arc.local
   IPv4 Address. . . . . . . . . . . : 10.20.20.144(Preferred)
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 10.20.20.1
   DHCP Server . . . . . . . . . . . : 10.20.0.5
   DNS Servers . . . . . . . . . . . : 10.20.0.5, 10.20.0.6
[STATUS: TICKET #1042 CLOSED — SLA MET]`
      },
      {
        id: "fix-wrong-static",
        label: "Hardcode a random static IP 192.168.1.50/24 on the workstation NIC",
        isCorrect: false,
        feedback:
          "INCORRECT: Assigning an unrouted 192.168.1.x address on an untagged VLAN 1 port still cannot reach the 10.20.20.0/24 corporate gateway or AD DNS servers."
      },
      {
        id: "fix-wrong-reinstall",
        label: "Format and reinstall Windows 11 OS on the workstation",
        isCorrect: false,
        feedback:
          "INCORRECT: APIPA 169.254.x.x indicates DHCP discovery timed out at Layer 2/3. Reimaging the OS wastes hours without fixing the switchport VLAN mismatch."
      }
    ]
  },

  "1089": {
    id: "1089",
    number: "INC-1089",
    category: "Linux Administration • SSH & Firewall",
    severity: "P1 — Critical",
    title: "Production Ubuntu Server Rejecting SSH Connections on Port 22",
    reporter: "DevOps / Internal Apps Team",
    environment: "Ubuntu 22.04 LTS • prd-ubuntu-web01 (10.20.1.10) • Proxmox VE Out-of-Band Console",
    symptom:
      "Ansible control node and admin jump-box fail to connect to 10.20.1.10 over port 22 with 'Connection refused / timed out' immediately after firewall hardening.",
    rootCauseSummary:
      "UFW firewall was enabled with a restrictive deny rule on 22/tcp while sshd_config had PermitRootLogin disabled and ListenAddress bound correctly, blocking management subnet 10.20.0.0/16.",
    diagnostics: [
      {
        id: "nc_check",
        label: "Run nc -zv 10.20.1.10 22 from jump-box",
        cmd: "dipankar@admin-jump:~$ nc -zv -w 3 10.20.1.10 22 && ping -c 2 10.20.1.10",
        clue: "ICMP ping succeeds (host is online in Proxmox), but TCP port 22 drops/rejects SYN packets.",
        output: `nc: connect to 10.20.1.10 port 22 (tcp) failed: Connection timed out
PING 10.20.1.10 (10.20.1.10) 56(84) bytes of data.
64 bytes from 10.20.1.10: icmp_seq=1 ttl=64 time=0.48 ms
64 bytes from 10.20.1.10: icmp_seq=2 ttl=64 time=0.41 ms
--- 10.20.1.10 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss`
      },
      {
        id: "systemctl_ssh",
        label: "Out-of-Band Console: systemctl status ssh",
        cmd: "root@prd-ubuntu-web01:~# systemctl status ssh --no-pager",
        clue: "OpenSSH daemon (sshd) is active and listening on 0.0.0.0:22, meaning the daemon itself has not crashed.",
        output: `● ssh.service - OpenBSD Secure Shell server
     Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)
     Active: active (running) since Thu 2026-10-29 09:14:22 IST; 2h 18min ago
       Docs: man:sshd(8)
             man:sshd_config(5)
   Main PID: 1142 (sshd)
      Tasks: 1 (limit: 9412)
     Memory: 5.4M
        CPU: 118ms
     CGroup: /system.slice/ssh.service
             └─1142 "sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups"
Oct 29 09:14:22 prd-ubuntu-web01 systemd[1]: Started OpenBSD Secure Shell server.
Oct 29 09:14:22 prd-ubuntu-web01 sshd[1142]: Server listening on 0.0.0.0 port 22.`
      },
      {
        id: "ufw_sshd",
        label: "Inspect ufw status numbered & sshd -T",
        cmd: "root@prd-ubuntu-web01:~# ufw status numbered && sshd -T | grep -E 'port|pubkey|password'",
        clue: "Root Cause Found: Rule [1] explicitly DENIES 22/tcp IN from Anywhere, overriding management access while ports 80/443 remain open.",
        output: `Status: active

     To                         Action      From
     --                         ------      ----
[ 1] 22/tcp                     DENY IN     Anywhere                   <-- BLOCKING SSH
[ 2] 80/tcp                     ALLOW IN    Anywhere
[ 3] 443/tcp                    ALLOW IN    Anywhere

port 22
pubkeyauthentication yes
passwordauthentication no`
      }
    ],
    remediationOptions: [
      {
        id: "fix-correct",
        label: "Delete UFW deny rule 1, allow 22/tcp from management subnet 10.20.0.0/16 with ufw reload, and verify SSH login",
        isCorrect: true,
        feedback:
          "RESOLVED: Removed UFW rule #1 and added scoped rule 'ufw allow from 10.20.0.0/16 to any port 22 proto tcp'. SSH key authentication from jump-box and Ansible control node restored without exposing port 22 to untrusted networks.",
        verificationOutput: `root@prd-ubuntu-web01:~# ufw delete 1 && ufw allow from 10.20.0.0/16 to any port 22 proto tcp && ufw reload
Rule deleted
Rule added
Firewall reloaded

dipankar@admin-jump:~$ ssh -i ~/.ssh/id_ed25519 ubuntu@10.20.1.10 "uptime"
 11:42:09 up 41 days,  3:19,  1 user,  load average: 0.12, 0.08, 0.05
[STATUS: TICKET #1089 CLOSED — SLA MET]`
      },
      {
        id: "fix-wrong-reboot",
        label: "Hard-reset the VM from Proxmox hypervisor without changing firewall rules",
        isCorrect: false,
        feedback:
          "INCORRECT: UFW rules persist across reboots (/etc/ufw/user.rules). Hard-resetting a production web server causes downtime and leaves port 22 blocked."
      },
      {
        id: "fix-wrong-disable-all",
        label: "Flush iptables and permanently disable all host firewalls & ModSecurity WAF",
        isCorrect: false,
        feedback:
          "INCORRECT: Disabling all host firewall protection violates least-privilege security policy when only a scoped allow rule for 10.20.0.0/16 on port 22 is needed."
      }
    ]
  },

  "1104": {
    id: "1104",
    number: "INC-1104",
    category: "Linux Storage • LVM & File Descriptors",
    severity: "P1 — Critical",
    title: "Application Failing Writes with 'No space left on device' on /var",
    reporter: "Prometheus Alertmanager / Internal App Team",
    environment: "Ubuntu 22.04 LTS • stg-ubuntu-ci01 (10.20.2.15) • /dev/mapper/vg0-lv_var (20G)",
    symptom:
      "Services and apt patching fail with ENOSPC ('No space left on device') on /var. Junior admin deleted a 9GB log file with rm, yet df -h still reports /var at 98% full!",
    rootCauseSummary:
      "Unrotated /var/log/nginx/error.log and /var/log/syslog consumed /var, and after a manual rm without reloading nginx, worker PIDs held open file descriptors (+L1) to the unlinked 9.4GB file.",
    diagnostics: [
      {
        id: "df_check",
        label: "Run df -h & df -i",
        cmd: "root@stg-ubuntu-ci01:~# df -h /var && df -i /var",
        clue: "/dev/mapper/vg0-lv_var is 98% full (19.6G used of 20G), while inode usage is normal (12%).",
        output: `Filesystem                Size  Used Avail Use% Mounted on
/dev/mapper/vg0-lv_var   20.0G 19.6G  412M  98% /var

Filesystem              Inodes  IUsed   IFree IUse% Mounted on
/dev/mapper/vg0-lv_var 1310720 154210 1156510   12% /var`
      },
      {
        id: "du_check",
        label: "Run du -sh /var/log/* | sort -hr",
        cmd: "root@stg-ubuntu-ci01:~# du -sh /var/log/* | sort -hr | head -n 5",
        clue: "Visible files in /var/log only account for ~7.2GB (syslog.1 is 5.8G), leaving ~9.4GB of 'phantom' disk usage unexplained by du!",
        output: `5.8G    /var/log/syslog.1
890M    /var/log/journal
340M    /var/log/nginx
120M    /var/log/apt
44M     /var/log/auth.log
# Total visible in /var/log: ~7.2G, but df -h shows 19.6G used!`
      },
      {
        id: "lsof_check",
        label: "Run lsof +L1 /var (Find deleted open files)",
        cmd: "root@stg-ubuntu-ci01:~# lsof +L1 /var",
        clue: "Root Cause Found: Nginx worker processes (PID 1842, 1843) still hold an open file descriptor to /var/log/nginx/access.log.old (deleted) totaling 9.4GB, preventing ext4 from reclaiming blocks.",
        output: `COMMAND  PID     USER   FD   TYPE DEVICE   SIZE/OFF NLINK   NODE NAME
nginx   1842 www-data    5w   REG  253,2 10093173145     0 131094 /var/log/nginx/access.log.old (deleted)
nginx   1843 www-data    5w   REG  253,2 10093173145     0 131094 /var/log/nginx/access.log.old (deleted)
rsyslog 1019   syslog    7w   REG  253,2  6227702579     1 131088 /var/log/syslog.1`
      }
    ],
    remediationOptions: [
      {
        id: "fix-correct",
        label: "Run logrotate -f /etc/logrotate.d/rsyslog, graceful reload nginx (systemctl reload nginx) to release deleted FDs, and verify df -h",
        isCorrect: true,
        feedback:
          "RESOLVED: Graceful reload closed the unlinked file descriptors, immediately freeing 9.4GB, and forced logrotate compressed /var/log/syslog.1. /var utilization dropped from 98% to 29% with zero service downtime.",
        verificationOutput: `root@stg-ubuntu-ci01:~# logrotate -f /etc/logrotate.d/rsyslog && systemctl reload nginx && df -h /var
Filesystem                Size  Used Avail Use% Mounted on
/dev/mapper/vg0-lv_var   20.0G  5.8G 14.2G  29% /var

root@stg-ubuntu-ci01:~# lsof +L1 /var
# (No unlinked open files remaining)
[STATUS: TICKET #1104 CLOSED — SLA MET]`
      },
      {
        id: "fix-wrong-rm-var",
        label: "Run rm -rf /var/log/* and kill -9 PID 1",
        isCorrect: false,
        feedback:
          "INCORRECT: Deleting the entire /var/log directory structure breaks package/audit directories (nginx, apt, journal) and kill -9 on init crashes the kernel."
      },
      {
        id: "fix-wrong-ignore",
        label: "Wait 30 days for the weekly cron job to clean up deleted inodes",
        isCorrect: false,
        feedback:
          "INCORRECT: Open file descriptors held by long-running daemon workers are never freed by cron until the process closes the FD or reloads."
      }
    ]
  }
};

/**
 * Interactive Hero Terminal Command Parser
 */
function executeTerminalCommand(rawInput, fleetState) {
  const cmd = (rawInput || "").trim();
  const lower = cmd.toLowerCase();

  if (!cmd) {
    return { action: "noop", output: "" };
  }

  if (lower === "clear" || lower === "cls") {
    return { action: "clear", output: "" };
  }

  if (lower === "help" || lower === "--help" || lower === "?") {
    return {
      action: "print",
      output: `Available Control Room CLI Commands:
  whoami              Display candidate identity, role, and relocation readiness
  neofetch            Render system & candidate infrastructure summary banner
  skills              List verified technical competencies (Linux, Network, AD, DevOps)
  ping 10.20.1.10     Test ICMP reachability to prd-ubuntu-web01 in simulated fleet
  uptime              Show control room session & experience metrics
  projects            Inspect flagship Ansible Patch & ELK/WAF/K8s projects
  sudo patch --check  Execute live pre-flight audit against the 6-host Linux fleet
  contact             Display direct phone, email, LinkedIn, and GitHub links
  clear               Clear terminal buffer`
    };
  }

  if (lower === "whoami" || lower === "id") {
    const p = GROUND_TRUTH_DATA.profile;
    return {
      action: "print",
      output: `uid=1000(dipankar) gid=1000(sysadmin) groups=1000(sysadmin),27(sudo),112(netadmin),118(ansible)
Name         : ${p.name}
Role         : ${p.title}
Current Exp  : Network / IT Support Intern @ ARC Document Solutions India Pvt. Ltd. (Jul 2025 – Jun 2026)
Education    : ${GROUND_TRUTH_DATA.education.degree} (${GROUND_TRUTH_DATA.education.institution})
Location     : ${p.location} | ${p.relocation} | ${p.availability}`
    };
  }

  if (lower === "neofetch") {
    const p = GROUND_TRUTH_DATA.profile;
    return {
      action: "print",
      output: `        .--.          dipankar@control-room
       |o_o |         ---------------------
       |:_/ |         OS: Ubuntu 22.04 LTS / RHEL 9.3 / Windows 11 Pro
      //   \\ \\        Role: ${p.title}
     (|     | )       Employer: ARC Document Solutions India Pvt. Ltd.
    /'\\_   _/\`\\       Scope: ~300 Enterprise Users (Windows & Ubuntu Linux)
    \\___)=(___/       Virtualization: Hyper-V, Proxmox VE, VMware Workstation
                      Security: CrowdStrike Falcon, BitLocker, ModSecurity WAF
                      Automation: Ansible, Shell, Prometheus, Grafana, ELK Stack
                      Status: ${p.statusBadge}`
    };
  }

  if (lower === "skills") {
    return {
      action: "print",
      output: `[VERIFIED TECHNICAL SKILLS — DIPANKAR BHOWMIK]
• Operating Systems  : Ubuntu Linux, RHEL/CentOS basics, Windows 10/11, Windows Server, macOS basics
• Linux Admin        : SSH, apt/yum patching, kernel updates, systemctl, LVM, file permissions, log analysis
• Networking         : TCP/IP, DNS, DHCP, CIDR subnetting, LAN/WAN, VPN, NAT, static IP, ping, tracert, firewall
• Active Directory   : Domain join, user/computer objects, local admin rights, group/GPO troubleshooting
• Endpoint Security  : CrowdStrike Falcon, BitLocker encryption, ScreenConnect remote support
• Virtualization     : Hyper-V, Proxmox, VMware Workstation (provisioning, disk management, troubleshooting)
• Automation & Obs   : Ansible (playbooks, ad-hoc), Shell scripting, Prometheus, Grafana, ELK Stack, Nginx + ModSecurity WAF`
    };
  }

  if (lower.startsWith("ping")) {
    const target = cmd.split(/\s+/)[1] || "10.20.1.10";
    const matchedHost = (fleetState || INITIAL_FLEET_HOSTS).find(
      (h) => h.ip === target || h.hostname.toLowerCase() === target.toLowerCase()
    );
    if (matchedHost && matchedHost.faults && matchedHost.faults.unreachable) {
      return {
        action: "print",
        output: `PING ${target} (${matchedHost.ip}) 56(84) bytes of data.
From 10.20.1.1 icmp_seq=1 Destination Host Unreachable
From 10.20.1.1 icmp_seq=2 Destination Host Unreachable
--- ${target} ping statistics ---
2 packets transmitted, 0 received, +2 errors, 100% packet loss (Fault Injected: Host Unreachable)`
      };
    }
    const resolvedIp = matchedHost ? matchedHost.ip : target;
    const hostLabel = matchedHost ? ` (${matchedHost.hostname} - ${matchedHost.os})` : "";
    return {
      action: "print",
      output: `PING ${target}${hostLabel} [${resolvedIp}] 56(84) bytes of data.
64 bytes from ${resolvedIp}: icmp_seq=1 ttl=64 time=0.42 ms
64 bytes from ${resolvedIp}: icmp_seq=2 ttl=64 time=0.38 ms
64 bytes from ${resolvedIp}: icmp_seq=3 ttl=64 time=0.41 ms
--- ${target} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2004ms
rtt min/avg/max/mdev = 0.380/0.403/0.420/0.017 ms`
    };
  }

  if (lower === "uptime") {
    return {
      action: "print",
      output: ` 23:38:13 up 365 days, 11:42, 1 active engineer, load average: 0.08, 0.04, 0.01
 • Enterprise Support Scope : ~300 endpoints at ARC Document Solutions (Jul 2025 – Jun 2026)
 • Degree Completed         : B.Sc. (Hons.) in Advanced Networking & Cyber Security (2022 – 2025)
 • Joining Notice Period    : 0 days (Immediate Joiner — Open to Bangalore / PAN India)`
    };
  }

  if (lower === "projects") {
    return {
      action: "print",
      output: `[1] Flagship: Linux Patch Management Automation & Observability Stack
    Stack : Ansible, Shell Scripting, Ubuntu/RHEL Linux, Custom Exporter, Prometheus, Grafana
    Flow  : Pre-flight safety role -> Rolling wave patching -> Reboot detection -> JSON/CSV + Prometheus metrics
[2] Secondary: Infrastructure & Security Stack
    Stack : ELK Stack (Elasticsearch, Logstash, Kibana, Filebeat), Nginx + ModSecurity WAF, Flask/Kubernetes
    Repo  : github.com/Annoymous1524/flask-k8s-devops`
    };
  }

  if (lower === "sudo patch --check" || lower === "patch --check") {
    const sim = evaluateFleetSimulation(fleetState || INITIAL_FLEET_HOSTS);
    const lines = sim.hostResults.map((hr) => {
      const badge =
        hr.preflightStatus === "PASS"
          ? "[PASS]"
          : hr.preflightStatus === "WARN"
          ? "[WARN]"
          : "[BLOCK]";
      return `  ${badge.padEnd(8)} ${hr.hostname.padEnd(18)} (${hr.ip}) | /var: ${
        hr.varDiskPct
      }% | pending: ${hr.initialPending} pkgs | reboot_req: ${hr.rebootRequired ? "yes" : "no"}`;
    });
    return {
      action: "print",
      output: `[sudo] pre-flight audit initiated for 6 managed Linux nodes:
${lines.join("\n")}
Summary: ${sim.kpis.compliantCount}/${sim.kpis.totalHosts} hosts ready (${sim.kpis.compliancePct}% compliance). Scroll to Lab 1 to inject faults or run full playbook.`
    };
  }

  if (lower === "contact") {
    const p = GROUND_TRUTH_DATA.profile;
    return {
      action: "print",
      output: `Direct Contact Channels — Dipankar Bhowmik:
  Phone    : ${p.phone}
  Email    : ${p.email}
  LinkedIn : ${p.linkedinDisplay}
  GitHub   : ${p.githubDisplay}
  Location : ${p.location} (${p.relocation})`
    };
  }

  return {
    action: "print",
    output: `bash: ${cmd.split(/\s+/)[0]}: command not found. Type 'help' for supported control room commands.`
  };
}

/**
 * Utility 1: IPv4 CIDR Subnet Calculator (Pure Bitwise Math)
 */
function calculateCIDRSubnet(ipString, cidrPrefix) {
  const cleanedIp = (ipString || "").trim();
  const prefix = Number(cidrPrefix);

  const octets = cleanedIp.split(".");
  if (octets.length !== 4 || isNaN(prefix) || prefix < 0 || prefix > 32) {
    return { valid: false, error: "Enter a valid IPv4 address (e.g. 10.20.1.10) and CIDR prefix (0–32)." };
  }

  const nums = [];
  for (let i = 0; i < 4; i++) {
    if (!/^\d+$/.test(octets[i])) {
      return { valid: false, error: "IPv4 octets must be numeric values between 0 and 255." };
    }
    const n = Number(octets[i]);
    if (n < 0 || n > 255) {
      return { valid: false, error: `Octet ${n} is out of range (0–255).` };
    }
    nums.push(n);
  }

  const ipInt =
    (((nums[0] << 24) >>> 0) |
      ((nums[1] << 16) >>> 0) |
      ((nums[2] << 8) >>> 0) |
      (nums[3] >>> 0)) >>>
    0;

  const maskInt = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const wildcardInt = (~maskInt) >>> 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;

  const intToIp = (val) =>
    [
      (val >>> 24) & 255,
      (val >>> 16) & 255,
      (val >>> 8) & 255,
      val & 255
    ].join(".");

  let firstUsable = "N/A";
  let lastUsable = "N/A";
  let usableHosts = 0;
  const totalAddresses = Math.pow(2, 32 - prefix);

  if (prefix === 32) {
    firstUsable = intToIp(networkInt);
    lastUsable = intToIp(networkInt);
    usableHosts = 1;
  } else if (prefix === 31) {
    firstUsable = intToIp(networkInt);
    lastUsable = intToIp(broadcastInt);
    usableHosts = 2;
  } else {
    firstUsable = intToIp((networkInt + 1) >>> 0);
    lastUsable = intToIp((broadcastInt - 1) >>> 0);
    usableHosts = Math.max(0, totalAddresses - 2);
  }

  return {
    valid: true,
    input: `${cleanedIp}/${prefix}`,
    netmask: intToIp(maskInt),
    wildcardMask: intToIp(wildcardInt),
    networkAddress: `${intToIp(networkInt)}/${prefix}`,
    broadcastAddress: intToIp(broadcastInt),
    usableRange: `${firstUsable} – ${lastUsable}`,
    totalHosts: totalAddresses.toLocaleString(),
    usableHosts: usableHosts.toLocaleString()
  };
}

/**
 * Utility 2: Linux chmod Permission Converter (Checkboxes <-> Octal <-> Symbolic)
 */
function computeChmodFromBits(bits) {
  // bits: { u: {r, w, x}, g: {r, w, x}, o: {r, w, x}, special: {setuid, setgid, sticky} }
  const calcDigit = (grp) => (grp.r ? 4 : 0) + (grp.w ? 2 : 0) + (grp.x ? 1 : 0);
  const sDigit =
    (bits.special && bits.special.setuid ? 4 : 0) +
    (bits.special && bits.special.setgid ? 2 : 0) +
    (bits.special && bits.special.sticky ? 1 : 0);

  const uDigit = calcDigit(bits.u);
  const gDigit = calcDigit(bits.g);
  const oDigit = calcDigit(bits.o);

  const octal = `${sDigit}${uDigit}${gDigit}${oDigit}`;

  const symGroup = (grp, specialBit, specialCharLower, specialCharUpper) => {
    const r = grp.r ? "r" : "-";
    const w = grp.w ? "w" : "-";
    let x = grp.x ? "x" : "-";
    if (specialBit) {
      x = grp.x ? specialCharLower : specialCharUpper;
    }
    return `${r}${w}${x}`;
  };

  const uSym = symGroup(bits.u, bits.special && bits.special.setuid, "s", "S");
  const gSym = symGroup(bits.g, bits.special && bits.special.setgid, "s", "S");
  const oSym = symGroup(bits.o, bits.special && bits.special.sticky, "t", "T");

  const symbolic = `-${uSym}${gSym}${oSym}`;
  return {
    octal,
    symbolic,
    command: `chmod ${octal} /srv/ansible/patch_runner.sh`
  };
}

function parseOctalToChmodBits(octalStr) {
  const cleaned = (octalStr || "").trim();
  if (!/^[0-7]{3,4}$/.test(cleaned)) {
    return null;
  }
  const padded = cleaned.length === 3 ? "0" + cleaned : cleaned;
  const s = parseInt(padded[0], 8);
  const u = parseInt(padded[1], 8);
  const g = parseInt(padded[2], 8);
  const o = parseInt(padded[3], 8);

  return {
    special: {
      setuid: Boolean(s & 4),
      setgid: Boolean(s & 2),
      sticky: Boolean(s & 1)
    },
    u: { r: Boolean(u & 4), w: Boolean(u & 2), x: Boolean(u & 1) },
    g: { r: Boolean(g & 4), w: Boolean(g & 2), x: Boolean(g & 1) },
    o: { r: Boolean(o & 4), w: Boolean(o & 2), x: Boolean(o & 1) }
  };
}

function parseSymbolicToChmodBits(symStr) {
  const cleaned = (symStr || "").trim();
  const raw = cleaned.length === 10 ? cleaned.slice(1) : cleaned;
  if (raw.length !== 9) {
    return null;
  }
  if (!/^[r-][w-][xsStT-][r-][w-][xsStT-][r-][w-][xtT-]$/.test(raw)) {
    return null;
  }

  return {
    special: {
      setuid: raw[2] === "s" || raw[2] === "S",
      setgid: raw[5] === "s" || raw[5] === "S",
      sticky: raw[8] === "t" || raw[8] === "T"
    },
    u: {
      r: raw[0] === "r",
      w: raw[1] === "w",
      x: raw[2] === "x" || raw[2] === "s"
    },
    g: {
      r: raw[3] === "r",
      w: raw[4] === "w",
      x: raw[5] === "x" || raw[5] === "s"
    },
    o: {
      r: raw[6] === "r",
      w: raw[7] === "w",
      x: raw[8] === "x" || raw[8] === "t"
    }
  };
}

// Export for Node verification and browser global scope
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    GROUND_TRUTH_DATA,
    INITIAL_FLEET_HOSTS,
    evaluateFleetSimulation,
    HELPDESK_TICKETS,
    executeTerminalCommand,
    calculateCIDRSubnet,
    computeChmodFromBits,
    parseOctalToChmodBits,
    parseSymbolicToChmodBits
  };
}
if (typeof window !== "undefined") {
  window.ControlRoomLib = {
    GROUND_TRUTH_DATA,
    INITIAL_FLEET_HOSTS,
    evaluateFleetSimulation,
    HELPDESK_TICKETS,
    executeTerminalCommand,
    calculateCIDRSubnet,
    computeChmodFromBits,
    parseOctalToChmodBits,
    parseSymbolicToChmodBits
  };
}
