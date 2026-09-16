/* ==========================================================================
   FOLIO SPACE - NOTEBOOK CANVAS & CREATIVE EDITOR
   ========================================================================== */

export class NotebookEditorService {
  constructor() {
    this.modal = null;
    this.canvas = null;
    this.ctx = null;
    this.isDrawing = false;
    this.currentTool = 'pen'; // 'pencil', 'pen', 'text', 'eraser', 'shapes', 'highlighter'
    this.currentColor = '#ffffff';
    this.lineWidth = 2;
    this.history = [];
    this.historyStep = -1;
  }

  openNotebook(title = 'Founder video script — Episode 04', textContent = '') {
    // Check if modal already exists
    let modal = document.getElementById('notebookModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'notebookModal';
      modal.className = 'notebook-modal-overlay hidden';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="notebook-modal-container">
        <!-- Header & Toolbar -->
        <div class="notebook-top-toolbar">
          <div class="nb-title-group">
            <span class="nb-icon">📓</span>
            <input type="text" class="nb-title-input" value="${escapeHtml(title)}" placeholder="Untitled Notebook..." />
          </div>

          <!-- Creative Toolbar -->
          <div class="nb-tools-strip">
            <button class="nb-tool-btn active" data-tool="pen" title="Pen (🖊️)">🖊️ Pen</button>
            <button class="nb-tool-btn" data-tool="pencil" title="Pencil (✏️)">✏️ Pencil</button>
            <button class="nb-tool-btn" data-tool="highlighter" title="Highlighter (🖍️)">🖍️ Highlight</button>
            <button class="nb-tool-btn" data-tool="text" title="Text (T)">T Text</button>
            <button class="nb-tool-btn" data-tool="eraser" title="Eraser (⌫)">⌫ Eraser</button>
            
            <div class="nb-tool-divider"></div>
            
            <input type="color" class="nb-color-picker" id="nbColorPicker" value="#ffffff" title="Color (🎨)" />
            
            <button class="nb-tool-btn" id="nbUndoBtn" title="Undo (↶)">↶ Undo</button>
            <button class="nb-tool-btn" id="nbClearBtn" title="Clear Canvas">🗑️ Clear</button>
          </div>

          <button class="btn btn-ghost btn-sm" id="btnCloseNotebook">✕ Close</button>
        </div>

        <!-- Notebook Sheet Workspace -->
        <div class="notebook-sheet-surface">
          <!-- Text Writing Area -->
          <textarea class="notebook-text-editor" placeholder="Start typing video scripts, content outlines, project planning, meeting notes, research, ideas...">${escapeHtml(textContent || 'Most founders think personal branding is about posting every day, but real authority comes from cinematic storytelling and concise narrative architecture...\n\n@Rahul Video Script Outline:\n1. Hook: 3-second result statement.\n2. Context: The problem statement.\n3. Solution: Product walkthrough.\n4. Call to Action.')}</textarea>
          
          <!-- Drawing Canvas Layer -->
          <canvas id="notebookCanvas" class="notebook-canvas-layer"></canvas>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    this.initCanvas(modal);

    // Close button
    modal.querySelector('#btnCloseNotebook').addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  initCanvas(modal) {
    this.canvas = modal.querySelector('#notebookCanvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    const surface = modal.querySelector('.notebook-sheet-surface');

    // Resize canvas
    this.canvas.width = surface.clientWidth;
    this.canvas.height = surface.clientHeight;

    // Tool switching
    modal.querySelectorAll('.nb-tool-btn[data-tool]').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.nb-tool-btn[data-tool]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTool = btn.getAttribute('data-tool');
      });
    });

    // Color picker
    const colorPicker = modal.querySelector('#nbColorPicker');
    if (colorPicker) {
      colorPicker.addEventListener('input', (e) => {
        this.currentColor = e.target.value;
      });
    }

    // Drawing Listeners
    const startDraw = (e) => {
      if (this.currentTool === 'text') return;
      this.isDrawing = true;
      this.ctx.beginPath();
      const rect = this.canvas.getBoundingClientRect();
      this.ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    const draw = (e) => {
      if (!this.isDrawing) return;
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (this.currentTool === 'eraser') {
        this.ctx.clearRect(x - 10, y - 10, 20, 20);
      } else {
        this.ctx.strokeStyle = this.currentTool === 'highlighter' ? 'rgba(254, 240, 138, 0.4)' : this.currentColor;
        this.ctx.lineWidth = this.currentTool === 'highlighter' ? 16 : (this.currentTool === 'pencil' ? 1.5 : 3);
        this.ctx.lineCap = 'round';
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
      }
    };

    const stopDraw = () => {
      if (this.isDrawing) {
        this.isDrawing = false;
        this.ctx.closePath();
      }
    };

    this.canvas.addEventListener('mousedown', startDraw);
    this.canvas.addEventListener('mousemove', draw);
    this.canvas.addEventListener('mouseup', stopDraw);
    this.canvas.addEventListener('mouseleave', stopDraw);

    // Clear Canvas
    const clearBtn = modal.querySelector('#nbClearBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      });
    }
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
