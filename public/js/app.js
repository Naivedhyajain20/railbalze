const API = '';

function statusBadge(status) {
  const map = {
    'on-time': 'badge-on-time',
    'delayed': 'badge-delayed',
    'cancelled': 'badge-cancelled',
    'confirmed': 'badge-confirmed',
    'running': 'badge-running',
    'scheduled': 'badge-scheduled',
    'arrived': 'badge-arrived',
  };
  const cls = map[status] || 'badge-scheduled';
  return `<span class="badge ${cls}">${status}</span>`;
}

function typeBadge(type) {
  const map = { 'express': 'badge-express', 'local': 'badge-local', 'freight': 'badge-freight' };
  return `<span class="badge ${map[type] || ''}">${type}</span>`;
}

async function loadStats() {
  try {
    const res = await fetch(`${API}/api/insights`);
    const json = await res.json();
    if (!json.success) return;
    const d = json.data;
    document.getElementById('statTotalTrains').textContent = d.totalTrains;
    document.getElementById('statTodaySchedules').textContent = d.todaySchedules;
    document.getElementById('statDelays').textContent = d.delayedSchedules;
    document.getElementById('statRoutes').textContent = d.totalRoutes;
  } catch (e) {
    console.error('Failed to load stats', e);
  }
}

async function loadTrainStatus() {
  const tbody = document.getElementById('trainTableBody');
  if (!tbody) return;
  try {
    const res = await fetch(`${API}/api/trains`);
    const json = await res.json();
    if (!json.success || !json.data.length) {
      tbody.innerHTML = '<tr><td colspan="5">No trains found.</td></tr>';
      return;
    }
    tbody.innerHTML = json.data.map(t => `
      <tr>
        <td><strong>${t.name}</strong></td>
        <td>${t.number}</td>
        <td>${typeBadge(t.type)}</td>
        <td>${statusBadge(t.status)}</td>
        <td>📍 ${t.currentLocation}</td>
      </tr>
    `).join('');
  } catch (e) {
    tbody.innerHTML = '<tr><td colspan="5" class="error-msg">Failed to load trains.</td></tr>';
  }
}

async function loadTodaySchedules() {
  const tbody = document.getElementById('scheduleTableBody');
  if (!tbody) return;
  try {
    const [schedRes, trainRes, routeRes] = await Promise.all([
      fetch(`${API}/api/schedules/today`),
      fetch(`${API}/api/trains`),
      fetch(`${API}/api/routes`)
    ]);
    const schedJson = await schedRes.json();
    const trainJson = await trainRes.json();
    const routeJson = await routeRes.json();

    const trainMap = {};
    (trainJson.data || []).forEach(t => trainMap[t.id] = t);
    const routeMap = {};
    (routeJson.data || []).forEach(r => routeMap[r.id] = r);

    if (!schedJson.data || !schedJson.data.length) {
      tbody.innerHTML = '<tr><td colspan="6">No schedules today.</td></tr>';
      return;
    }
    tbody.innerHTML = schedJson.data.map(s => {
      const train = trainMap[s.trainId] || {};
      const route = routeMap[s.routeId] || {};
      const delay = s.delayMinutes > 0 ? ` (+${s.delayMinutes}m)` : '';
      return `
        <tr>
          <td><strong>${train.name || s.trainId}</strong></td>
          <td>${route.source || '?'} → ${route.destination || '?'}</td>
          <td>${s.departureTime}${delay}</td>
          <td>${s.arrivalTime}</td>
          <td>${statusBadge(s.status)}</td>
          <td>${s.availableSeats}</td>
        </tr>
      `;
    }).join('');
  } catch (e) {
    tbody.innerHTML = '<tr><td colspan="6" class="error-msg">Failed to load schedules.</td></tr>';
  }
}

function setupRouteSearch() {
  const form = document.getElementById('routeSearchForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const from = document.getElementById('fromStation').value.trim();
    const to = document.getElementById('toStation').value.trim();
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '<p class="loading">Searching...</p>';
    try {
      const res = await fetch(`${API}/api/routes/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
      const json = await res.json();
      if (!json.data || !json.data.length) {
        resultsDiv.innerHTML = '<p class="error-msg">No routes found for this journey.</p>';
        return;
      }
      resultsDiv.innerHTML = json.data.map(r => `
        <div class="result-item">
          <h3>🛤️ ${r.name}</h3>
          <p>${r.source} → ${r.destination} | ${r.distance} km | ${Math.floor(r.duration/60)}h ${r.duration%60}m</p>
          <p>Stops: ${r.stops.map(s => s.name).join(' → ')}</p>
        </div>
      `).join('');
    } catch (e) {
      resultsDiv.innerHTML = '<p class="error-msg">Search failed. Please try again.</p>';
    }
  });
}

async function loadSchedulesForDropdown() {
  const sel = document.getElementById('scheduleSelect');
  if (!sel) return;
  try {
    const [schedRes, trainRes, routeRes] = await Promise.all([
      fetch(`${API}/api/schedules`),
      fetch(`${API}/api/trains`),
      fetch(`${API}/api/routes`)
    ]);
    const schedJson = await schedRes.json();
    const trainJson = await trainRes.json();
    const routeJson = await routeRes.json();

    const trainMap = {};
    (trainJson.data || []).forEach(t => trainMap[t.id] = t);
    const routeMap = {};
    (routeJson.data || []).forEach(r => routeMap[r.id] = r);

    (schedJson.data || []).filter(s => s.status !== 'cancelled' && s.availableSeats > 0).forEach(s => {
      const train = trainMap[s.trainId] || {};
      const route = routeMap[s.routeId] || {};
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = `${train.name || s.trainId} | ${route.source || '?'} → ${route.destination || '?'} | ${s.date} ${s.departureTime} (${s.availableSeats} seats)`;
      sel.appendChild(opt);
    });
  } catch (e) {
    console.error('Failed to load schedules for dropdown', e);
  }
}

async function loadBookings() {
  const tbody = document.getElementById('bookingsTableBody');
  if (!tbody) return;
  try {
    const res = await fetch(`${API}/api/bookings`);
    const json = await res.json();
    if (!json.data || !json.data.length) {
      tbody.innerHTML = '<tr><td colspan="7">No bookings found.</td></tr>';
      return;
    }
    tbody.innerHTML = json.data.map(b => `
      <tr>
        <td><code>${b.id}</code></td>
        <td>${b.passengerName}</td>
        <td><small>${b.scheduleId}</small></td>
        <td>${b.class}</td>
        <td>₹${b.price}</td>
        <td>${statusBadge(b.status)}</td>
        <td>
          ${b.status !== 'cancelled'
            ? `<button class="btn btn-danger btn-sm" onclick="cancelBooking('${b.id}')">Cancel</button>`
            : '—'}
        </td>
      </tr>
    `).join('');
  } catch (e) {
    tbody.innerHTML = '<tr><td colspan="7" class="error-msg">Failed to load bookings.</td></tr>';
  }
}

async function cancelBooking(id) {
  if (!confirm('Cancel this booking?')) return;
  try {
    const res = await fetch(`${API}/api/bookings/${id}/cancel`, { method: 'PUT' });
    const json = await res.json();
    if (json.success) {
      loadBookings();
      loadSchedulesForDropdown();
    } else {
      alert(json.message || 'Failed to cancel booking');
    }
  } catch (e) {
    alert('Error cancelling booking');
  }
}

function setupBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errDiv = document.getElementById('bookingError');
    errDiv.textContent = '';
    const body = {
      scheduleId: document.getElementById('scheduleSelect').value,
      userId: document.getElementById('userId').value.trim(),
      passengerName: document.getElementById('passengerName').value.trim(),
      seatNumber: document.getElementById('seatNumber').value.trim(),
      class: document.getElementById('seatClass').value,
      price: parseFloat(document.getElementById('price').value)
    };
    try {
      const res = await fetch(`${API}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (json.success) {
        form.reset();
        document.getElementById('scheduleSelect').innerHTML = '<option value="">Select a schedule...</option>';
        loadSchedulesForDropdown();
        loadBookings();
        alert(`Booking confirmed! ID: ${json.data.id}`);
      } else {
        errDiv.textContent = json.message || 'Booking failed';
      }
    } catch (e) {
      errDiv.textContent = 'Error creating booking';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const isBookingsPage = !!document.getElementById('bookingsTableBody');

  if (isBookingsPage) {
    loadSchedulesForDropdown();
    loadBookings();
    setupBookingForm();
  } else {
    loadStats();
    loadTrainStatus();
    loadTodaySchedules();
    setupRouteSearch();
    setInterval(loadTrainStatus, 30000);
  }
});
