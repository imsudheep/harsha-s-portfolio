/* ==========================================================================
   FOLIO SPACE - SPACE CALENDAR (GOOGLE CALENDAR STYLE)
   ========================================================================== */

import { stateManager } from '../state.js';

export function renderCalendarView() {
  const state = stateManager.get();
  
  // Sample Google Calendar events mapped to August 2026 days
  const events = state.calendarEvents || [
    {
      id: 'cal-1',
      title: '30 Min Video Strategy w/ Rahul',
      date: '2026-08-20',
      time: '10:30 AM',
      contactName: 'Rahul Sharma',
      company: 'ABC Media',
      type: 'Meeting',
      color: '#3b82f6',
      meetUrl: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: 'cal-2',
      title: 'Q4 Launch Review w/ Sarah',
      date: '2026-08-22',
      time: '02:00 PM',
      contactName: 'Sarah Chen',
      company: 'Venture Labs',
      type: 'Deadline',
      color: '#10b981',
      meetUrl: 'https://meet.google.com/xyz-uvwx-rst'
    },
    {
      id: 'cal-3',
      title: 'DevCorp Master Files Delivery',
      date: '2026-08-18',
      time: '04:00 PM',
      contactName: 'DevCorp Operations',
      company: 'DevCorp Inc',
      type: 'Delivery',
      color: '#8b5cf6',
      meetUrl: 'https://meet.google.com/dev-corp-123'
    }
  ];

  // Helper to get events on a specific day number in Aug 2026
  const getEventsForDay = (dayNum) => {
    const dayStr = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    const dateQuery = `2026-08-${dayStr}`;
    return events.filter(e => e.date === dateQuery);
  };

  return `
    <div class="space-calendar-app">
      
      <!-- 1. SPACE CALENDAR HEADER BAR (GOOGLE CALENDAR STYLE) -->
      <div class="space-cal-header">
        <div class="cal-header-left">
          <div class="cal-logo-badge">
            <i data-lucide="calendar" style="width: 20px; height: 20px;"></i>
            <h1 class="space-cal-title">Space Calendar</h1>
          </div>

          <div class="cal-nav-controls">
            <button class="btn btn-secondary btn-sm" id="calTodayBtn">Today</button>
            <button class="icon-btn-sm" id="calPrevBtn">‹</button>
            <button class="icon-btn-sm" id="calNextBtn">›</button>
            <span class="cal-current-month">August 2026</span>
          </div>
        </div>

        <div class="cal-header-right">
          <div class="cal-view-switcher">
            <button class="view-switch-btn active" data-view="month">Month</button>
            <button class="view-switch-btn" data-view="week">Week</button>
            <button class="view-switch-btn" data-view="day">Day</button>
            <button class="view-switch-btn" data-view="agenda">Schedule</button>
          </div>

          <button class="btn btn-primary" id="btnCreateSpaceEvent">
            <i data-lucide="plus" style="width: 15px; height: 15px;"></i> Create Event
          </button>
        </div>
      </div>

      <!-- 2. MAIN LAYOUT: LEFT MINI SIDEBAR + RIGHT GOOGLE CALENDAR GRID -->
      <div class="space-cal-body">
        
        <!-- Left Sidebar: Quick Mini Calendar & Calendars List -->
        <aside class="space-cal-sidebar">
          
          <!-- Mini Calendar Widget -->
          <div class="mini-cal-card">
            <div class="mini-cal-month">August 2026</div>
            <div class="mini-cal-days-hdr">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div class="mini-cal-grid">
              <span class="muted">26</span><span class="muted">27</span><span class="muted">28</span><span class="muted">29</span><span class="muted">30</span><span class="muted">31</span><span>1</span>
              <span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
              <span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span>
              <span>16</span><span>17</span><span class="today">18</span><span>19</span><span class="has-evt">20</span><span>21</span><span class="has-evt">22</span>
              <span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span>
              <span>30</span><span>31</span>
            </div>
          </div>

          <!-- My Calendars Filter List -->
          <div class="space-calendars-list">
            <div class="sidebar-section-hdr">MY SPACE CALENDARS</div>
            <label class="cal-chk-row"><input type="checkbox" checked /> <span class="chk-dot" style="background:#3b82f6;"></span> Client Meetings</label>
            <label class="cal-chk-row"><input type="checkbox" checked /> <span class="chk-dot" style="background:#10b981;"></span> Work Deadlines</label>
            <label class="cal-chk-row"><input type="checkbox" checked /> <span class="chk-dot" style="background:#8b5cf6;"></span> Deliveries & Masters</label>
            <label class="cal-chk-row"><input type="checkbox" checked /> <span class="chk-dot" style="background:#f59e0b;"></span> Payment Reminders</label>
          </div>

        </aside>

        <!-- Right Main: Full Google Calendar Monthly Grid -->
        <main class="space-cal-grid-container">
          
          <!-- Day Name Headers -->
          <div class="gcal-grid-hdr">
            <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
          </div>

          <!-- 35 Cell Monthly Grid (August 2026) -->
          <div class="gcal-month-grid">
            <!-- Row 1: July 26 to Aug 1 -->
            <div class="gcal-cell out-month"><span class="cell-num">26</span></div>
            <div class="gcal-cell out-month"><span class="cell-num">27</span></div>
            <div class="gcal-cell out-month"><span class="cell-num">28</span></div>
            <div class="gcal-cell out-month"><span class="cell-num">29</span></div>
            <div class="gcal-cell out-month"><span class="cell-num">30</span></div>
            <div class="gcal-cell out-month"><span class="cell-num">31</span></div>
            <div class="gcal-cell" data-day="1"><span class="cell-num">1</span></div>

            <!-- Row 2: Aug 2 to Aug 8 -->
            <div class="gcal-cell" data-day="2"><span class="cell-num">2</span></div>
            <div class="gcal-cell" data-day="3"><span class="cell-num">3</span></div>
            <div class="gcal-cell" data-day="4"><span class="cell-num">4</span></div>
            <div class="gcal-cell" data-day="5"><span class="cell-num">5</span></div>
            <div class="gcal-cell" data-day="6"><span class="cell-num">6</span></div>
            <div class="gcal-cell" data-day="7"><span class="cell-num">7</span></div>
            <div class="gcal-cell" data-day="8"><span class="cell-num">8</span></div>

            <!-- Row 3: Aug 9 to Aug 15 -->
            <div class="gcal-cell" data-day="9"><span class="cell-num">9</span></div>
            <div class="gcal-cell" data-day="10"><span class="cell-num">10</span></div>
            <div class="gcal-cell" data-day="11"><span class="cell-num">11</span></div>
            <div class="gcal-cell" data-day="12"><span class="cell-num">12</span></div>
            <div class="gcal-cell" data-day="13"><span class="cell-num">13</span></div>
            <div class="gcal-cell" data-day="14"><span class="cell-num">14</span></div>
            <div class="gcal-cell" data-day="15"><span class="cell-num">15</span></div>

            <!-- Row 4: Aug 16 to Aug 22 -->
            <div class="gcal-cell" data-day="16"><span class="cell-num">16</span></div>
            <div class="gcal-cell" data-day="17"><span class="cell-num">17</span></div>
            
            <!-- Aug 18 (Today) -->
            <div class="gcal-cell today-cell" data-day="18">
              <span class="cell-num today-num">18</span>
              ${renderDayEventChips(getEventsForDay(18))}
            </div>
            
            <div class="gcal-cell" data-day="19"><span class="cell-num">19</span></div>
            
            <!-- Aug 20 -->
            <div class="gcal-cell" data-day="20">
              <span class="cell-num">20</span>
              ${renderDayEventChips(getEventsForDay(20))}
            </div>
            
            <div class="gcal-cell" data-day="21"><span class="cell-num">21</span></div>
            
            <!-- Aug 22 -->
            <div class="gcal-cell" data-day="22">
              <span class="cell-num">22</span>
              ${renderDayEventChips(getEventsForDay(22))}
            </div>

            <!-- Row 5: Aug 23 to Aug 29 -->
            <div class="gcal-cell" data-day="23"><span class="cell-num">23</span></div>
            <div class="gcal-cell" data-day="24"><span class="cell-num">24</span></div>
            <div class="gcal-cell" data-day="25"><span class="cell-num">25</span></div>
            <div class="gcal-cell" data-day="26"><span class="cell-num">26</span></div>
            <div class="gcal-cell" data-day="27"><span class="cell-num">27</span></div>
            <div class="gcal-cell" data-day="28"><span class="cell-num">28</span></div>
            <div class="gcal-cell" data-day="29"><span class="cell-num">29</span></div>

            <!-- Row 6: Aug 30 to Sep 5 -->
            <div class="gcal-cell" data-day="30"><span class="cell-num">30</span></div>
            <div class="gcal-cell" data-day="31"><span class="cell-num">31</span></div>
            <div class="gcal-cell out-month"><span class="cell-num">1</span></div>
            <div class="gcal-cell out-month"><span class="cell-num">2</span></div>
            <div class="gcal-cell out-month"><span class="cell-num">3</span></div>
            <div class="gcal-cell out-month"><span class="cell-num">4</span></div>
            <div class="gcal-cell out-month"><span class="cell-num">5</span></div>
          </div>

        </main>

      </div>
    </div>
  `;
}

function renderDayEventChips(dayEvents) {
  if (!dayEvents || dayEvents.length === 0) return '';
  return dayEvents.map(evt => `
    <div class="gcal-event-chip" style="background: ${evt.color || '#3b82f6'};" data-id="${evt.id}">
      <span class="chip-time">${evt.time}</span>
      <span class="chip-title">${escapeHtml(evt.title)}</span>
    </div>
  `).join('');
}

export function attachCalendarEvents(container, showToast, openModal) {
  // Create Event Button
  const btnCreate = container.querySelector('#btnCreateSpaceEvent');
  if (btnCreate) {
    btnCreate.addEventListener('click', () => {
      const title = prompt('Enter Event Title:', '30 Min Client Call');
      if (!title) return;
      const day = prompt('Enter day in August (e.g. 20):', '20');

      const dayStr = parseInt(day) < 10 ? `0${parseInt(day)}` : `${parseInt(day)}`;
      const newEvent = {
        id: 'cal-' + Date.now(),
        title,
        date: `2026-08-${dayStr}`,
        time: '11:00 AM',
        type: 'Meeting',
        color: '#3b82f6',
        meetUrl: 'https://meet.google.com/space-' + Math.floor(Math.random()*1000)
      };

      stateManager.update(s => {
        if (!s.calendarEvents) s.calendarEvents = [];
        s.calendarEvents.push(newEvent);
      });

      showToast(`📅 Event "${title}" created on Space Calendar!`);

      // Refresh view
      const contentBody = document.getElementById('contentBody');
      contentBody.innerHTML = renderCalendarView();
      attachCalendarEvents(contentBody, showToast, openModal);
    });
  }

  // Click cell to add event
  container.querySelectorAll('.gcal-cell[data-day]').forEach(cell => {
    cell.addEventListener('click', (e) => {
      if (e.target.closest('.gcal-event-chip')) return; // handled separately
      const day = cell.getAttribute('data-day');
      const title = prompt(`Add Event for August ${day}, 2026:`, 'Client Meeting / Review');
      if (!title) return;

      const dayStr = parseInt(day) < 10 ? `0${parseInt(day)}` : `${parseInt(day)}`;
      const newEvent = {
        id: 'cal-' + Date.now(),
        title,
        date: `2026-08-${dayStr}`,
        time: '02:00 PM',
        type: 'Task',
        color: '#10b981'
      };

      stateManager.update(s => {
        if (!s.calendarEvents) s.calendarEvents = [];
        s.calendarEvents.push(newEvent);
      });

      showToast(`Added event to August ${day}!`);

      const contentBody = document.getElementById('contentBody');
      contentBody.innerHTML = renderCalendarView();
      attachCalendarEvents(contentBody, showToast, openModal);
    });
  });

  // Click Event Chip for details / Google Meet link
  container.querySelectorAll('.gcal-event-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = chip.getAttribute('data-id');
      const evt = stateManager.get().calendarEvents.find(e => e.id === id);
      if (evt) {
        alert(`🗓️ Event Details:\n\nTitle: ${evt.title}\nDate: ${evt.date} at ${evt.time}\nClient: ${evt.contactName || 'N/A'}\nGoogle Meet: ${evt.meetUrl || 'Generated'}`);
      }
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
