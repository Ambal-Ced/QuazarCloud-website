
    // Helpers
    const $ = (s, root=document) => root.querySelector(s);
    const show = (el) => el.classList.remove('hidden');
    const hide = (el) => el.classList.add('hidden');

    // Footer year
    $('#year').textContent = new Date().getFullYear();

    // Smooth scroll to demo
    $('#scrollToDemo')?.addEventListener('click', () => {
      document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
    });

    // Modal controls
    const modal = $('#demoModal');
    const openModal = () => show(modal);
    const closeModal = () => hide(modal);
    $('#openDemo')?.addEventListener('click', openModal);
    $('#openDemo2')?.addEventListener('click', openModal);
    $('#closeModal')?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // Toast
    let toastTimer;
    function toast(msg) {
      clearTimeout(toastTimer);
      $('#toastText').textContent = msg;
      show($('#toast'));
      toastTimer = setTimeout(() => hide($('#toast')), 2200);
    }

    // Simple in-memory store with session fallback
    const Store = {
      key: 'citiserve-demo',
      read() {
        try {
          const raw = sessionStorage.getItem(this.key);
          return raw ? JSON.parse(raw) : {};
        } catch { return {}; }
      },
      write(data) {
        try { sessionStorage.setItem(this.key, JSON.stringify(data)); } catch {}
      },
      upsert(ref, obj) {
        const all = this.read();
        all[ref] = { ...(all[ref]||{}), ...obj };
        this.write(all);
      },
      get(ref) {
        return this.read()[ref];
      }
    };

    function genRef() {
      const n = Math.floor(10000 + Math.random()*89999);
      return `CT-${n}`;
    }

    function computeProgress(status) {
      const map = { 'Submitted': 0.2, 'Routed': 0.4, 'Verified': 0.6, 'Approved': 0.8, 'Delivered': 1.0 };
      return map[status] || 0.2;
    }

    function nextStatus(current) {
      const order = ['Submitted','Routed','Verified','Approved','Delivered'];
      const idx = order.indexOf(current);
      return order[Math.min(order.length-1, idx+1)];
    }

    // Form: New Request
    $('#requestForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target).entries());
      const ref = genRef();
      const created = new Date().toISOString();
      Store.upsert(ref, {
        ref, created,
        doctype: data.doctype || 'Document',
        priority: data.priority || 'Low',
        name: data.name || 'Guest',
        email: data.email || '',
        notes: data.notes || '',
        status: 'Submitted',
        etaDays: data.priority === 'High' ? 1 : data.priority === 'Medium' ? 2 : 3
      });
      $('#refOut').textContent = ref;
      show($('#successCard'));
      toast('Request submitted. Reference created.');
      e.target.reset();
    });

    // Tracker
    $('#trackForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const ref = $('#trackRef').value.trim().toUpperCase();
      const item = Store.get(ref);
      const result = $('#trackResult');
      if (!item) {
        hide(result);
        toast('Reference not found. Try submitting a sample.');
        return;
      }
      // Simulate progression over time (every view can advance once)
      const last = item.lastViewedAt ? new Date(item.lastViewedAt).getTime() : 0;
      const now = Date.now();
      if (now - last > 5000 && item.status !== 'Delivered') {
        item.status = nextStatus(item.status);
      }
      item.lastViewedAt = new Date().toISOString();
      Store.upsert(ref, item);

      $('#statusLabel').textContent = item.status;
      $('#etaLabel').textContent = `ETA: ${item.etaDays} day(s)`;
      const pct = computeProgress(item.status) * 100;
      $('#progressBar').style.width = pct + '%';
      $('#lastUpdate').textContent = `Ref ${ref} • ${item.doctype} • Priority: ${item.priority} • Updated just now`;
      show(result);
    });

    // Modal quick create
    $('#modalForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target).entries());
      const ref = genRef();
      Store.upsert(ref, {
        ref,
        created: new Date().toISOString(),
        doctype: data.doctype || 'Document',
        priority: data.priority || 'Low',
        email: data.email || '',
        status: 'Submitted',
        etaDays: data.priority === 'High' ? 1 : data.priority === 'Medium' ? 2 : 3
      });
      $('#modalRef').textContent = ref;
      show($('#modalSuccess'));
      toast('Reference created');
    });

    // Copy reference
    $('#copyRef')?.addEventListener('click', async () => {
      const text = $('#modalRef').textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        toast('Reference ID copied');
      } catch {
        toast('Copy not available here');
      }
    });
