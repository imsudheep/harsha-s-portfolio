(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();const V="DOTSPACE_WORKSPACE_STATE_V1",B={theme:"dark",activeView:"home",subscription:{plan:"free",docsCreatedThisMonth:3,maxFreeDocs:5},brandProfile:{name:"Harsha Vardhan",company:"Dotspace Studio",title:"Structural Video Engineer & Brand Architect",email:"harsha@dotspace.office",phone:"+1 (555) 019-2831",website:"https://harshavardhan.design",address:`100 Innovation Way, Suite 400
San Francisco, CA 94105`,logoUrl:"",signatureText:"Harsha Vardhan",signatureDataUrl:"",paymentDetails:`Bank: Silicon Valley Bank
Account: XXXX-XXXX-4819
Swift/BIC: SVBKUS6S
UPI/PayPal: harsha@paypal.me`,taxId:"EIN 84-2910381",accentFont:"Inter",layoutSpacing:"standard"},contacts:[{id:"cnt-1",name:"Rahul Sharma",company:"ABC Media",role:"Founder & CEO",email:"rahul@abcmedia.com",phone:"+1 (555) 234-5678",website:"https://abcmedia.com",socialUrl:"https://linkedin.com/in/rahulsharma",serviceDiscussed:"Personal Brand Video Editing & Strategy",lastContacted:"2026-08-15",nextFollowUp:"2026-08-20",notes:"Sent portfolio and initial welcome note. Waiting for video asset uploads."},{id:"cnt-2",name:"Arjun Rao",company:"Studio Minimal",role:"Design Director",email:"arjun@studiominimal.io",phone:"+1 (555) 876-5432",website:"https://studiominimal.io",socialUrl:"https://twitter.com/arjunrao",serviceDiscussed:"Design Architecture & Master Services Agreement",lastContacted:"2026-08-14",nextFollowUp:"2026-08-22",notes:"Agreement signed. Kickoff scheduled for next Tuesday."},{id:"cnt-3",name:"Sarah Chen",company:"Venture Labs",role:"Marketing Lead",email:"sarah@venturelabs.io",phone:"+1 (555) 345-6789",website:"https://venturelabs.io",socialUrl:"https://linkedin.com/in/sarahchen",serviceDiscussed:"Q4 Product Launch Video Campaign",lastContacted:"2026-08-12",nextFollowUp:"2026-08-19",notes:"Sent proposal quotation for $6,500. Needs board signoff."}],documents:[{id:"doc-1",docNumber:"DOC-2026-001",type:"Welcome Note",title:"Welcome Note - Rahul Sharma",contactId:"cnt-1",contactName:"Rahul Sharma",contactCompany:"ABC Media",contactEmail:"rahul@abcmedia.com",date:"2026-08-15",dueDate:"",status:"Sent",content:`Dear Rahul,

We are thrilled to welcome you to Harsha Creative Studio! We are excited to collaborate with you on your Personal Brand Video Campaign.

Our team is dedicated to producing high-impact, refined visual narratives tailored to your audience. We will walk you through each phase of production with total clarity.

Thank you for trusting us with your vision.`,items:[],signatureIncluded:!0,customFont:"Inter",customSpacing:"standard"},{id:"doc-2",docNumber:"DOC-2026-002",type:"Invoice",title:"Invoice - ABC Media",contactId:"cnt-1",contactName:"Rahul Sharma",contactCompany:"ABC Media",contactEmail:"rahul@abcmedia.com",date:"2026-08-15",dueDate:"2026-08-30",status:"Paid",content:"Payment terms: Net 15. Please remit payment via bank transfer or PayPal details below.",items:[{description:"Personal Brand Video Editing (4 Episodes)",qty:4,rate:850,amount:3400},{description:"Motion Design & Sound Engineering",qty:1,rate:1100,amount:1100}],signatureIncluded:!0,customFont:"Inter",customSpacing:"standard"},{id:"doc-3",docNumber:"DOC-2026-003",type:"Agreement",title:"Master Services Agreement - Arjun Rao",contactId:"cnt-2",contactName:"Arjun Rao",contactCompany:"Studio Minimal",contactEmail:"arjun@studiominimal.io",date:"2026-08-14",dueDate:"",status:"Signed",content:`1. SERVICES & SCOPE
Harsha Creative Studio agrees to provide structural branding and video production services as specified in Project Orders.

2. INTELLECTUAL PROPERTY
Upon receipt of full payment, all work product created under this Agreement shall belong exclusively to Studio Minimal.

3. CONFIDENTIALITY
Both parties agree to protect proprietary information disclosed during the engagement.`,items:[],signatureIncluded:!0,digitallySigned:!0,signedTimestamp:"2026-08-14 16:42 UTC",signedAuditHash:"a7f92b49c08e1d3e2a",customFont:"Inter",customSpacing:"standard"}],workCards:[{id:"wrk-1",title:"Personal Brand Video",contactId:"cnt-1",contactName:"Rahul Sharma",company:"ABC Media",service:"Video Editing & Motion Graphics",status:"WORKING",workingOn:"Episode 04 — Final Edit",why:"Founder personal-brand content",currentTask:"Final color correction and subtitles",lastActivity:"Today",nextAction:"Send first review",deadline:"20 August",lastContacted:"2026-08-15",nextFollowUp:"2026-08-20",url:"https://frame.io/project-123",notes:"Working on Episode 04 rough cut. Need high-res logos from Rahul."},{id:"wrk-2",title:"Founder Interview",contactId:"cnt-3",contactName:"Sarah Chen",company:"Venture Labs",service:"Q4 Launch Video",status:"WORKING",workingOn:"Final Cut & Audio Master",why:"Series A Launch Campaign",currentTask:"Final edit & sound design",lastActivity:"Today",nextAction:"Deliver 4K master file",deadline:"22 August",lastContacted:"2026-08-12",nextFollowUp:"2026-08-19",url:"https://venturelabs.io/video",notes:"Proposal submitted ($6,500). Finalizing 4K export."},{id:"wrk-3",title:"Maya Lin - Portfolio Reel",contactId:"",contactName:"Maya Lin",company:"Architectural Digest",service:"Showreel Production",status:"TO CONTACT",workingOn:"Outreach & Proposal",why:"Architectural documentary showcase",currentTask:"Initial email pitch",lastActivity:"2 days ago",nextAction:"Follow up email",deadline:"25 August",lastContacted:"2026-08-01",nextFollowUp:"2026-08-18",url:"https://mayalin.design",notes:"Initial outreach for new architectural documentary showcase."},{id:"wrk-4",title:"DevCorp Rebrand Production",contactId:"",contactName:"DevCorp Operations",company:"DevCorp Inc",service:"Corporate Rebrand Video Suite",status:"COMPLETED",workingOn:"Delivered",why:"Brand identity refresh",currentTask:"All masters delivered",lastActivity:"1 week ago",nextAction:"Project closed",deadline:"10 August",lastContacted:"2026-08-10",nextFollowUp:"",url:"https://devcorp.com/brand",notes:"Delivered final 4K masters and signed off."}],history:[{id:"hist-1",date:"Today",contactName:"Rahul Sharma",category:"Documents",action:"Created invoice for Rahul"},{id:"hist-2",date:"Today",contactName:"Sarah Chen",category:"Projects",action:"Moved ABC Media / Sarah project to Working"},{id:"hist-3",date:"Yesterday",contactName:"Arjun Rao",category:"Agreements",action:"Agreement signed"},{id:"hist-4",date:"Yesterday",contactName:"Rahul Sharma",category:"Documents",action:"Created Welcome Note"}],calendarEvents:[{id:"cal-1",title:"Follow up with Rahul (ABC Media)",date:"2026-08-20",contactName:"Rahul Sharma",type:"Follow-up",completed:!1}],todos:[{id:"todo-1",text:"@Rahul Send invoice",done:!1,date:"Today"},{id:"todo-2",text:"Finish subtitle correction",done:!1,date:"Today"},{id:"todo-3",text:"Call ABC Media",done:!1,date:"Today"},{id:"todo-4",text:"Send portfolio",done:!0,date:"Yesterday"},{id:"todo-5",text:"Review script",done:!1,date:"Today"},{id:"todo-6",text:"Buy hard drive",done:!1,date:"Aug 19"}],notes:[{id:"note-1",title:"VIDEO IDEA",color:"yellow",text:"Try opening the video with the result."},{id:"note-2",title:"CLIENT IDEA",color:"pink",text:"Ask @Rahul if he wants the vertical version."},{id:"note-3",title:"PORTFOLIO",color:"blue",text:"Change homepage headline."}],journals:[{id:"j-1",title:"Founder video script — Episode 04",updatedAt:"Updated 2 hours ago",preview:"Most founders think personal branding is about posting every day, but real authority comes from cinematic storytelling and concise narrative architecture...",content:"Most founders think personal branding is about posting every day, but real authority comes from cinematic storytelling and concise narrative architecture. In this episode with @Rahul, we open on a 3-second hook establishing the core vision before transitioning to the product demo."}],reminders:[{id:"rem-1",time:"Today 10:30 AM",text:"Follow up with @Rahul",contact:"Rahul Sharma",completed:!1},{id:"rem-2",time:"Thursday 09:00 AM",text:"Send ABC Media proposal",contact:"Sarah Chen",completed:!1},{id:"rem-3",time:"Friday 02:00 PM",text:"Submit final project masters",contact:"DevCorp Operations",completed:!1}]};class et{constructor(){this.listeners=[],this.data=this.loadState()}loadState(){try{const t=localStorage.getItem(V);if(t)return{...B,...JSON.parse(t)}}catch(t){console.warn("Could not read state from localStorage",t)}return JSON.parse(JSON.stringify(B))}saveState(){try{localStorage.setItem(V,JSON.stringify(this.data))}catch(t){console.error("Could not save state to localStorage",t)}this.notify()}subscribe(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(n=>n!==t)}}notify(){this.listeners.forEach(t=>t(this.data))}get(){return this.data}update(t){t(this.data),this.saveState()}addHistory(t,n="",s="Documents"){const i=new Date().toISOString().split("T")[0],a={id:"hist-"+Date.now(),date:i,contactName:n,category:s,action:t};this.data.history.unshift(a),this.saveState()}canCreateDocument(){return this.data.subscription.plan==="premium"?!0:this.data.subscription.docsCreatedThisMonth<this.data.subscription.maxFreeDocs}incrementDocCount(){this.data.subscription.plan==="free"&&(this.data.subscription.docsCreatedThisMonth++,this.saveState())}resetToDefault(){this.data=JSON.parse(JSON.stringify(B)),this.saveState()}}const r=new et;class at{constructor(){this.modal=null,this.canvas=null,this.ctx=null,this.isDrawing=!1,this.currentTool="pen",this.currentColor="#ffffff",this.lineWidth=2,this.history=[],this.historyStep=-1}openNotebook(t="Founder video script — Episode 04",n=""){let s=document.getElementById("notebookModal");s||(s=document.createElement("div"),s.id="notebookModal",s.className="notebook-modal-overlay hidden",document.body.appendChild(s)),s.innerHTML=`
      <div class="notebook-modal-container">
        <!-- Header & Toolbar -->
        <div class="notebook-top-toolbar">
          <div class="nb-title-group">
            <span class="nb-icon">📓</span>
            <input type="text" class="nb-title-input" value="${z(t)}" placeholder="Untitled Notebook..." />
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
          <textarea class="notebook-text-editor" placeholder="Start typing video scripts, content outlines, project planning, meeting notes, research, ideas...">${z(n||`Most founders think personal branding is about posting every day, but real authority comes from cinematic storytelling and concise narrative architecture...

@Rahul Video Script Outline:
1. Hook: 3-second result statement.
2. Context: The problem statement.
3. Solution: Product walkthrough.
4. Call to Action.`)}</textarea>
          
          <!-- Drawing Canvas Layer -->
          <canvas id="notebookCanvas" class="notebook-canvas-layer"></canvas>
        </div>
      </div>
    `,s.classList.remove("hidden"),this.initCanvas(s),s.querySelector("#btnCloseNotebook").addEventListener("click",()=>{s.classList.add("hidden")})}initCanvas(t){if(this.canvas=t.querySelector("#notebookCanvas"),!this.canvas)return;this.ctx=this.canvas.getContext("2d");const n=t.querySelector(".notebook-sheet-surface");this.canvas.width=n.clientWidth,this.canvas.height=n.clientHeight,t.querySelectorAll(".nb-tool-btn[data-tool]").forEach(c=>{c.addEventListener("click",()=>{t.querySelectorAll(".nb-tool-btn[data-tool]").forEach(p=>p.classList.remove("active")),c.classList.add("active"),this.currentTool=c.getAttribute("data-tool")})});const s=t.querySelector("#nbColorPicker");s&&s.addEventListener("input",c=>{this.currentColor=c.target.value});const i=c=>{if(this.currentTool==="text")return;this.isDrawing=!0,this.ctx.beginPath();const p=this.canvas.getBoundingClientRect();this.ctx.moveTo(c.clientX-p.left,c.clientY-p.top)},a=c=>{if(!this.isDrawing)return;const p=this.canvas.getBoundingClientRect(),u=c.clientX-p.left,l=c.clientY-p.top;this.currentTool==="eraser"?this.ctx.clearRect(u-10,l-10,20,20):(this.ctx.strokeStyle=this.currentTool==="highlighter"?"rgba(254, 240, 138, 0.4)":this.currentColor,this.ctx.lineWidth=this.currentTool==="highlighter"?16:this.currentTool==="pencil"?1.5:3,this.ctx.lineCap="round",this.ctx.lineTo(u,l),this.ctx.stroke())},o=()=>{this.isDrawing&&(this.isDrawing=!1,this.ctx.closePath())};this.canvas.addEventListener("mousedown",i),this.canvas.addEventListener("mousemove",a),this.canvas.addEventListener("mouseup",o),this.canvas.addEventListener("mouseleave",o);const d=t.querySelector("#nbClearBtn");d&&d.addEventListener("click",()=>{this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)})}}function z(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}function I(){const e=r.get(),t=e.brandProfile.name?e.brandProfile.name.split(" ")[0]:"Harsha",n=e.workCards.filter(l=>l.status==="WORKING"),s=n.length>0?n:[{id:"wrk-1",title:"Personal Brand Video",contactName:"Rahul Sharma",company:"ABC Media",workingOn:"Episode 04 — Final Edit",why:"Founder personal-brand content",currentTask:"Final color correction and subtitles",lastActivity:"Today",nextAction:"Send first review",deadline:"20 August",notes:"Working on Episode 04 rough cut. Need high-res logos from Rahul."},{id:"wrk-2",title:"Founder Interview",contactName:"Sarah Chen",company:"Venture Labs",workingOn:"Q4 Launch Video",why:"Series A Launch Campaign",currentTask:"Final edit & sound design",lastActivity:"Today",nextAction:"Deliver 4K master file",deadline:"22 August",notes:"Proposal submitted ($6,500). Finalizing 4K export."}],i={toContact:e.workCards.filter(l=>l.status==="TO CONTACT").length||8,contacted:e.workCards.filter(l=>l.status==="CONTACTED").length||5,next:e.workCards.filter(l=>l.status==="WAITING"||l.status==="NEXT").length||3,completed:e.workCards.filter(l=>l.status==="COMPLETED").length||14,blocked:e.workCards.filter(l=>l.status==="BLOCKED").length||2},a=e.todos||[{id:"t1",text:"@Rahul Send invoice",done:!1},{id:"t2",text:"Finish subtitle correction",done:!1},{id:"t3",text:"Call ABC Media",done:!1},{id:"t4",text:"Send portfolio",done:!0},{id:"t5",text:"Review script",done:!1}],o=e.notes||[{id:"n1",title:"VIDEO IDEA",color:"yellow",text:"Try opening the video with the result."},{id:"n2",title:"CLIENT IDEA",color:"pink",text:"Ask @Rahul if he wants the vertical version."},{id:"n3",title:"PORTFOLIO",color:"blue",text:"Change homepage headline."}],d=e.journals&&e.journals[0]||{title:"Founder video script — Episode 04",updatedAt:"Updated 2 hours ago",preview:"Most founders think personal branding is about posting every day, but real authority comes from cinematic storytelling and concise narrative architecture. In this episode with @Rahul..."},c=e.reminders||[{id:"r1",time:"Tomorrow — 10:30 AM",text:"Follow up with @Rahul",contact:"Rahul Sharma"},{id:"r2",time:"Thursday — 9:00 AM",text:"Send proposal",contact:"Sarah Chen"},{id:"r3",time:"Friday — 2:00 PM",text:"Review final edit",contact:"DevCorp Operations"}],p=(e.history||[]).slice(0,4),u=new Date().toLocaleDateString("en-US",{weekday:"long",day:"numeric",month:"long",year:"numeric"});return`
    <div class="spacious-desk-container">
      
      <!-- 1. HEADER (ULTRA MINIMAL & SPACIOUS) -->
      <header class="spacious-header">
        <div class="header-main-title">
          <h1 class="spacious-greeting">Good morning, ${x(t)}.</h1>
          <p class="spacious-subline">Here's what you're working on.</p>
        </div>

        <div class="spacious-header-meta">
          <span class="spacious-date-pill">${u}</span>
          <button class="spacious-icon-btn" id="deskReminderBell" title="Reminders">
            <i data-lucide="bell" style="width: 16px; height: 16px;"></i>
          </button>
          <div class="spacious-user-pill" id="deskProfileBtn">
            <div class="spacious-avatar">${t.charAt(0)}</div>
            <span class="user-pill-name">${x(t)}</span>
          </div>
        </div>
      </header>


      <!-- 2. WORKING ON (EXPANSIVE HERO WORKSPACE) -->
      <section class="spacious-section working-on-hero-section">
        <div class="spacious-section-hdr">
          <div class="spacious-section-title">
            <span class="hairline-dot"></span>
            <span>WORKING ON</span>
          </div>
          <span class="spacious-section-sub">Active primary workspace</span>
        </div>

        <div class="spacious-working-grid">
          ${s.map(l=>`
            <div class="spacious-working-card">
              <div class="spacious-card-top">
                <div class="client-company-tag">${x(l.contactName||"Client")} • ${x(l.company||"Company")}</div>
                <span class="hairline-badge">ACTIVE</span>
              </div>

              <h2 class="spacious-project-title">${x(l.title)}</h2>

              <div class="spacious-detail-table">
                <div class="detail-row">
                  <span class="detail-key">Working on</span>
                  <span class="detail-value highlight">${x(l.workingOn||l.service||"Episode 04 — Final Edit")}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-key">Why</span>
                  <span class="detail-value">${x(l.why||"Founder personal-brand content")}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-key">Current task</span>
                  <span class="detail-value task-pill">${x(l.currentTask||l.notes)}</span>
                </div>
              </div>

              <div class="spacious-card-foot">
                <div class="foot-meta-trio">
                  <div><span class="meta-label">Last activity:</span> <span class="meta-data">${l.lastActivity||"Today"}</span></div>
                  <div><span class="meta-label">Next action:</span> <span class="meta-data action-link">${l.nextAction||"Send review"}</span></div>
                  <div><span class="meta-label">Deadline:</span> <span class="meta-data">${l.deadline||"20 August"}</span></div>
                </div>

                <div class="spacious-card-actions">
                  <button class="btn-hairline btn-open-doc" data-id="${l.id}">Invoice / Doc</button>
                  <button class="btn-hairline-primary btn-open-work" data-id="${l.id}">
                    Open Project <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
                  </button>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </section>


      <!-- 3. SMALL WORK STATUS CELLS -->
      <section class="spacious-section status-section">
        <div class="spacious-section-hdr">
          <span class="spacious-section-title">WORK STATUS OVERVIEW</span>
          <a class="spacious-link" data-nav="work">View Work Section →</a>
        </div>

        <div class="spacious-status-row">
          <div class="hairline-status-cell status-to-contact" data-nav="work">
            <span class="status-cell-name">TO CONTACT</span>
            <span class="status-cell-num">${i.toContact}</span>
          </div>
          <div class="hairline-status-cell status-contacted" data-nav="work">
            <span class="status-cell-name">CONTACTED</span>
            <span class="status-cell-num">${i.contacted}</span>
          </div>
          <div class="hairline-status-cell status-next" data-nav="work">
            <span class="status-cell-name">NEXT / QUEUE</span>
            <span class="status-cell-num">${i.next}</span>
          </div>
          <div class="hairline-status-cell status-completed" data-nav="work">
            <span class="status-cell-name">COMPLETED</span>
            <span class="status-cell-num">${i.completed}</span>
          </div>
          <div class="hairline-status-cell status-blocked" data-nav="work">
            <span class="status-cell-name">BLOCKED</span>
            <span class="status-cell-num">${i.blocked}</span>
          </div>
        </div>
      </section>


      <!-- 4 & 5. TWO-COLUMN GRID (TO-DO & NOTES) -->
      <div class="spacious-two-col-grid">
        
        <!-- 4. TO-DO (FAST TASK LIST) -->
        <section class="spacious-section todo-section">
          <div class="spacious-section-hdr">
            <div class="spacious-section-title">
              <i data-lucide="check-square" style="width: 15px; height: 15px;"></i>
              <span>TO-DO</span>
            </div>
            <span class="spacious-section-sub">Type → Press Enter</span>
          </div>

          <form id="deskAddTodoForm" class="hairline-input-wrapper">
            <input type="text" id="deskTodoInput" class="hairline-todo-input" placeholder="+ Add a task... (Use @Name to connect)" autocomplete="off" />
          </form>

          <div class="spacious-todo-list">
            ${a.length===0?`
              <div class="spacious-empty">Nothing waiting for you.</div>
            `:a.map((l,v)=>`
              <div class="spacious-todo-item">
                <input type="checkbox" class="hairline-chk" data-idx="${v}" ${l.done?"checked":""} />
                <span class="todo-text ${l.done?"done":""}">${K(l.text)}</span>
              </div>
            `).join("")}
          </div>
        </section>

        <!-- 5. NOTES (DIGITAL STICKY NOTES) -->
        <section class="spacious-section notes-section">
          <div class="spacious-section-hdr">
            <div class="spacious-section-title">
              <i data-lucide="sticky-note" style="width: 15px; height: 15px;"></i>
              <span>NOTES</span>
            </div>
            <button class="spacious-btn-text" id="btnAddDeskNote">+ New Note</button>
          </div>

          <div class="spacious-notes-grid">
            ${o.length===0?`
              <div class="spacious-empty">Capture something before you forget it.</div>
            `:o.map((l,v)=>`
              <div class="hairline-note-card note-color-${l.color||"white"}">
                <div class="note-card-hdr">
                  <span class="note-card-title">${x(l.title||"NOTE")}</span>
                  <span class="note-pin">📌</span>
                </div>
                <textarea class="hairline-note-textarea" data-idx="${v}">${x(l.text)}</textarea>
              </div>
            `).join("")}
          </div>
        </section>

      </div>


      <!-- 6. NOTEBOOK (LARGE CREATIVE WRITING SURFACE PREVIEW) -->
      <section class="spacious-section notebook-section">
        <div class="spacious-section-hdr">
          <div class="spacious-section-title">
            <i data-lucide="book-open" style="width: 15px; height: 15px;"></i>
            <span>NOTEBOOK</span>
          </div>
          <span class="spacious-section-sub">${x(d.updatedAt||"Updated recently")}</span>
        </div>

        <div class="spacious-notebook-surface" id="btnOpenNotebookArea">
          <div class="nb-surface-hdr">
            <h3 class="nb-surface-title">"${x(d.title||"Founder video script — Episode 04")}"</h3>
            <span class="nb-surface-tag">Blank Creative Sheet</span>
          </div>
          <p class="nb-surface-snippet">"${x(d.preview||d.content)}"</p>

          <div class="nb-surface-foot">
            <span class="nb-surface-hint">✏️ Pencil • 🖊️ Pen • T Text • 🖍️ Highlight • 🎨 Color Sketches</span>
            <button class="btn-hairline-primary" id="btnOpenNotebook">
              Open Notebook <i data-lucide="edit-3" style="width: 14px; height: 14px;"></i>
            </button>
          </div>
        </div>
      </section>


      <!-- 7 & 8. TWO-COLUMN GRID (REMINDERS & RECENT ACTIVITY) -->
      <div class="spacious-two-col-grid">
        
        <!-- 7. REMINDERS -->
        <section class="spacious-section reminders-section">
          <div class="spacious-section-hdr">
            <div class="spacious-section-title">
              <i data-lucide="bell" style="width: 15px; height: 15px;"></i>
              <span>REMINDERS</span>
            </div>
            <button class="spacious-btn-text" id="btnAddReminderBtn">+ Add reminder</button>
          </div>

          <div class="spacious-reminder-list">
            ${c.length===0?`
              <div class="spacious-empty">No reminders.</div>
            `:c.map((l,v)=>`
              <div class="hairline-reminder-item">
                <span class="reminder-time-tag">${x(l.time)}</span>
                <span class="reminder-body-text">${K(l.text)}</span>
                <button class="spacious-icon-btn-xs btn-email-alert" data-idx="${v}" title="Email notification enabled">
                  <i data-lucide="mail" style="width: 13px; height: 13px;"></i>
                </button>
              </div>
            `).join("")}
          </div>
        </section>

        <!-- 8. RECENT ACTIVITY -->
        <section class="spacious-section activity-section">
          <div class="spacious-section-hdr">
            <div class="spacious-section-title">
              <i data-lucide="clock" style="width: 15px; height: 15px;"></i>
              <span>RECENT ACTIVITY</span>
            </div>
            <a class="spacious-link" data-nav="history">View History →</a>
          </div>

          <div class="spacious-activity-list">
            ${p.length===0?`
              <div class="spacious-empty">No recent activity.</div>
            `:p.map(l=>`
              <div class="hairline-activity-row">
                <span class="activity-pip"></span>
                <div class="activity-meta">
                  <span class="activity-action-name">${x(l.action)}</span>
                  <span class="activity-date-tag">${x(l.date)}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </section>

      </div>

    </div>
  `}function $(e,t,n,s){const i=new at;e.querySelectorAll("[data-nav]").forEach(l=>{l.addEventListener("click",v=>{v.preventDefault(),t(l.getAttribute("data-nav"))})}),e.querySelectorAll(".btn-open-work").forEach(l=>{l.addEventListener("click",()=>t("work"))}),e.querySelectorAll(".btn-open-doc").forEach(l=>{l.addEventListener("click",()=>t("documents"))});const a=e.querySelector("#btnOpenNotebook")||e.querySelector("#btnOpenNotebookArea");a&&a.addEventListener("click",()=>{i.openNotebook()});const o=e.querySelector("#deskProfileBtn");o&&o.addEventListener("click",()=>t("profile"));const d=e.querySelector("#deskAddTodoForm"),c=e.querySelector("#deskTodoInput");d&&c&&d.addEventListener("submit",l=>{l.preventDefault();const v=c.value.trim();if(!v)return;const b={id:"todo-"+Date.now(),text:v,done:!1,date:"Today"};r.update(m=>{m.todos||(m.todos=[]),m.todos.unshift(b)}),c.value="";const h=document.getElementById("contentBody");h.innerHTML=I(),$(h,t)}),e.querySelectorAll(".hairline-chk").forEach(l=>{l.addEventListener("change",v=>{const b=l.getAttribute("data-idx");r.update(m=>{m.todos&&m.todos[b]&&(m.todos[b].done=v.target.checked)});const h=l.nextElementSibling;h&&(v.target.checked?h.classList.add("done"):h.classList.remove("done"))})});const p=e.querySelector("#btnAddDeskNote");p&&p.addEventListener("click",()=>{const l=prompt("Enter note title (e.g. VIDEO IDEA, CLIENT IDEA):","NOTE IDEA");if(!l)return;const v=prompt("Enter note content:");if(!v)return;const b=prompt("Choose color (yellow, pink, blue, green, orange, white):","yellow");r.update(m=>{m.notes||(m.notes=[]),m.notes.unshift({id:"note-"+Date.now(),title:l,text:v,color:b||"yellow"})});const h=document.getElementById("contentBody");h.innerHTML=I(),$(h,t)}),e.querySelectorAll(".hairline-note-textarea").forEach(l=>{l.addEventListener("change",v=>{const b=l.getAttribute("data-idx");r.update(h=>{h.notes&&h.notes[b]&&(h.notes[b].text=v.target.value)})})});const u=e.querySelector("#btnAddReminderBtn");u&&u.addEventListener("click",()=>{const l=prompt("Enter reminder (e.g. Follow up with @Rahul):");if(!l)return;const v=prompt("Enter time (e.g. Tomorrow — 10:30 AM):","Tomorrow — 10:30 AM");r.update(h=>{h.reminders||(h.reminders=[]),h.reminders.unshift({id:"rem-"+Date.now(),time:v||"Tomorrow",text:l,completed:!1})});const b=document.getElementById("contentBody");b.innerHTML=I(),$(b,t)}),e.querySelectorAll(".btn-email-alert").forEach(l=>{l.addEventListener("click",()=>{r.get().brandProfile.email})})}function K(e){return e?x(e).replace(/@([A-Za-z0-9_]+)/g,'<span class="hairline-ref-badge">@$1</span>'):""}function x(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}async function nt(e,t="document.pdf"){const n=document.getElementById(e);if(!n)return console.error("PDF export target element not found:",e),!1;if(window.html2pdf){const s={margin:[.4,.4,.4,.4],filename:t,image:{type:"jpeg",quality:.98},html2canvas:{scale:2,useCORS:!0,letterRendering:!0},jsPDF:{unit:"in",format:"a4",orientation:"portrait"}};try{return await window.html2pdf().set(s).from(n).save(),!0}catch(i){console.warn("html2pdf failed, falling back to window.print()",i)}}return window.print(),!0}function it(e,t){if(!e||!e.trim())return e;const n=e.trim();switch(t){case"fix_grammar":return L(n);case"make_professional":return _(n);case"make_clearer":return st(n);case"shorten":return ot(n);case"expand":return lt(n);case"rewrite":return dt(n);default:return n}}function L(e){let t=e.replace(/\bi\b/g,"I").replace(/\b(im|i'm)\b/gi,"I'm").replace(/\b(cant|can't)\b/gi,"can't").replace(/\b(dont|don't)\b/gi,"don't").replace(/\b(wont|won't)\b/gi,"won't").replace(/\s+/g," ");return t.charAt(0).toUpperCase()+t.slice(1)}function _(e){let t=L(e);return t=t.replace(/thanks/gi,"Thank you"),t=t.replace(/hey|hi/gi,"Dear"),t=t.replace(/stuff|things/gi,"deliverables"),t=t.replace(/cool|great/gi,"exceptional"),t=t.replace(/got it|sure/gi,"We confirm receipt and acknowledge"),t}function st(e){let t=L(e);return t=t.replace(/\b(in order to)\b/gi,"to"),t=t.replace(/\b(at this point in time)\b/gi,"currently"),t=t.replace(/\b(due to the fact that)\b/gi,"because"),t=t.replace(/\b(with regard to)\b/gi,"regarding"),t}function ot(e){const t=e.split(new RegExp("(?<=[.!?])\\s+"));return t.length<=1?e:t.slice(0,Math.ceil(t.length/2)).join(" ")}function lt(e){let t=L(e);return t.endsWith(".")||(t+="."),t+" Please do not hesitate to reach out if you have any questions or require further clarification regarding these details."}function dt(e){return`Please review the following details:

${_(e)}

We remain committed to delivering the highest standard of execution for your project.`}class ct{constructor(t){this.canvas=t,this.ctx=t.getContext("2d"),this.isDrawing=!1,this.hasSignature=!1,this.initCanvas(),this.attachEvents()}initCanvas(){const t=this.canvas.getBoundingClientRect();this.canvas.width=t.width||400,this.canvas.height=t.height||140,this.ctx.lineWidth=2.5,this.ctx.lineCap="round",this.ctx.lineJoin="round",this.ctx.strokeStyle="#000000",this.clear()}attachEvents(){const t=i=>{this.isDrawing=!0;const a=this.getPos(i);this.ctx.beginPath(),this.ctx.moveTo(a.x,a.y)},n=i=>{if(!this.isDrawing)return;const a=this.getPos(i);this.ctx.lineTo(a.x,a.y),this.ctx.stroke(),this.hasSignature=!0},s=()=>{this.isDrawing=!1};this.canvas.addEventListener("mousedown",t),this.canvas.addEventListener("mousemove",n),this.canvas.addEventListener("mouseup",s),this.canvas.addEventListener("mouseleave",s),this.canvas.addEventListener("touchstart",i=>{i.preventDefault(),t(i.touches[0])}),this.canvas.addEventListener("touchmove",i=>{i.preventDefault(),n(i.touches[0])}),this.canvas.addEventListener("touchend",s)}getPos(t){const n=this.canvas.getBoundingClientRect();return{x:t.clientX-n.left,y:t.clientY-n.top}}clear(){this.ctx.fillStyle="#ffffff",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.hasSignature=!1}toDataURL(){return this.hasSignature?this.canvas.toDataURL("image/png"):null}}function rt(e){const t=new Date().toISOString().replace("T"," ").substring(0,16)+" UTC",n=Math.random().toString(36).substring(2,10)+Math.random().toString(36).substring(2,10);return{signer:e,timestamp:t,hash:`DOTSPACE-SIG-${n.toUpperCase()}`,ipVerification:"Verified via Private Digital Workspace"}}function pt(e={},t,n,s){var c,p;const i=r.get();let a=null;e.docId&&(a=i.documents.find(u=>u.id===e.docId)),a||(a=i.documents[0]||R(i));const o=i.brandProfile,d=i.contacts;return`
    <div class="view-header" style="margin-bottom: 16px;">
      <div class="view-title-group">
        <h1 class="view-title">Document Generator</h1>
        <p class="view-subtitle">Write it. We make it professional.</p>
      </div>

      <div style="display: flex; align-items: center; gap: 10px;">
        <button class="btn btn-secondary btn-sm" id="btnNewBlankDoc">
          <i data-lucide="plus"></i> New Document
        </button>
        <button class="btn btn-secondary btn-sm" id="btnCustomizationToggle">
          <i data-lucide="sliders"></i> Style Options
        </button>
        <button class="btn btn-primary" id="btnDownloadPDF">
          <i data-lucide="download"></i> Download PDF
        </button>
      </div>
    </div>

    <!-- Document Types Selector Tabs -->
    <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 16px; border-bottom: 1px solid var(--border-subtle);">
      ${["Welcome Note","Proposal","Quotation","Invoice","Agreement","Contract","Receipt","Project Delivery Note","Thank You Note","Custom Document"].map(u=>`
        <button class="btn btn-sm ${a.type===u?"btn-primary":"btn-ghost"} doc-type-tab" data-type="${u}">
          ${u}
        </button>
      `).join("")}
    </div>

    <!-- Editor Split Pane Layout -->
    <div class="doc-editor-wrapper">
      <!-- Left Pane: Professional Editor -->
      <div class="editor-pane">
        <div class="editor-toolbar">
          <div class="toolbar-group">
            <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--text-muted);">Editor</span>
          </div>

          <div class="toolbar-group">
            <!-- Optional Assist Dropdown -->
            <button class="btn btn-secondary btn-sm" id="btnAiAssist" title="Optional Writing Assistance">
              <i data-lucide="sparkles" style="width: 14px; height: 14px;"></i> Assist
            </button>

            <!-- Digital Signature Action -->
            <button class="btn btn-secondary btn-sm" id="btnSignDocument">
              <i data-lucide="file-signature" style="width: 14px; height: 14px;"></i> ${a.digitallySigned?"Signed Audit":"Add Signature"}
            </button>
          </div>
        </div>

        <div class="editor-form-scroll">
          <!-- Document General Details -->
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Document Title</label>
              <input type="text" class="form-input" id="fieldDocTitle" value="${f(a.title||"")}" placeholder="e.g. Welcome Note - Rahul" />
            </div>
            <div class="form-group">
              <label class="form-label">Document #</label>
              <input type="text" class="form-input" id="fieldDocNumber" value="${f(a.docNumber||"DOC-2026-001")}" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Select Contact / Client</label>
              <select class="form-select" id="fieldContactSelect">
                <option value="">-- Choose Existing Contact --</option>
                ${d.map(u=>`
                  <option value="${u.id}" ${a.contactId===u.id?"selected":""}>
                    ${f(u.name)} (${f(u.company||"Individual")})
                  </option>
                `).join("")}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Client Name</label>
              <input type="text" class="form-input" id="fieldClientName" value="${f(a.contactName||"")}" placeholder="Rahul Sharma" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Client Company</label>
              <input type="text" class="form-input" id="fieldClientCompany" value="${f(a.contactCompany||"")}" placeholder="ABC Media" />
            </div>
            <div class="form-group">
              <label class="form-label">Client Email</label>
              <input type="email" class="form-input" id="fieldClientEmail" value="${f(a.contactEmail||"")}" placeholder="rahul@abcmedia.com" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Issue Date</label>
              <input type="date" class="form-input" id="fieldDate" value="${a.date||new Date().toISOString().split("T")[0]}" />
            </div>
            <div class="form-group">
              <label class="form-label">Due Date / Valid Until (Optional)</label>
              <input type="date" class="form-input" id="fieldDueDate" value="${a.dueDate||""}" />
            </div>
          </div>

          <!-- Document Content Body -->
          <div class="form-group">
            <label class="form-label">Document Content / Terms</label>
            <textarea class="form-textarea" id="fieldContent" rows="8" placeholder="Type your document content here...">${f(a.content||"")}</textarea>
          </div>

          <!-- Line Items Table (For Invoice, Quotation, Proposal, Receipt) -->
          ${N(a.type)?`
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label class="form-label">Line Items & Pricing</label>
                <button class="btn btn-ghost btn-sm" id="btnAddLineItem">+ Add Item</button>
              </div>
              <table class="line-items-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th style="width: 60px;">Qty</th>
                    <th style="width: 100px;">Rate ($)</th>
                    <th style="width: 90px; text-align: right;">Amount</th>
                    <th style="width: 40px;"></th>
                  </tr>
                </thead>
                <tbody id="lineItemsTbody">
                  ${(a.items&&a.items.length>0?a.items:[{description:"Professional Services",qty:1,rate:500,amount:500}]).map((u,l)=>`
                    <tr class="line-item-row">
                      <td><input type="text" class="form-input item-desc" value="${f(u.description)}" style="padding: 6px 8px;" /></td>
                      <td><input type="number" class="form-input item-qty" value="${u.qty}" style="padding: 6px 8px;" min="1" /></td>
                      <td><input type="number" class="form-input item-rate" value="${u.rate}" style="padding: 6px 8px;" /></td>
                      <td style="text-align: right; font-weight: 600; font-size: 12.5px;" class="item-amount">$${(u.qty*u.rate).toLocaleString()}</td>
                      <td><button class="btn btn-ghost btn-sm btn-delete-item" style="color: #ef4444; padding: 4px;">✕</button></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `:""}

          <!-- Status & Signature Toggles -->
          <div class="form-row" style="margin-top: 10px;">
            <div class="form-group">
              <label class="form-label">Document Status</label>
              <select class="form-select" id="fieldStatus">
                <option value="Draft" ${a.status==="Draft"?"selected":""}>Draft</option>
                <option value="Sent" ${a.status==="Sent"?"selected":""}>Sent to Client</option>
                <option value="Signed" ${a.status==="Signed"?"selected":""}>Signed</option>
                <option value="Paid" ${a.status==="Paid"?"selected":""}>Paid</option>
                <option value="Completed" ${a.status==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>
            <div class="form-group" style="justify-content: flex-end;">
              <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                <input type="checkbox" id="fieldIncludeSignature" ${a.signatureIncluded?"checked":""} />
                Include Brand Signature
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Pane: Real-time Live PDF Preview -->
      <div class="preview-pane">
        <div class="preview-toolbar">
          <div style="font-size: 12px; font-weight: 600; color: var(--text-secondary); display: flex; align-items: center; gap: 8px;">
            <i data-lucide="eye" style="width: 15px; height: 15px;"></i> Live Professional Preview
          </div>
          <span class="badge" id="previewDocStatusBadge"><span class="badge-dot"></span>${a.status}</span>
        </div>

        <div class="preview-scroll">
          <div class="document-paper" id="documentPaper">
            <!-- Brand Header -->
            <div class="doc-header-block">
              <div>
                ${o.logoUrl?`<img src="${o.logoUrl}" style="max-height: 44px; margin-bottom: 8px;" />`:""}
                <div class="doc-brand-title" id="pBrandName">${f(o.company||o.name||"Harsha Creative Studio")}</div>
                <div class="doc-brand-sub" id="pBrandTitle">${f(o.title||"Freelance Workspace")}</div>
                <div class="doc-brand-sub" id="pBrandContact">${f(o.email)} • ${f(o.phone)}</div>
              </div>
              <div>
                <div class="doc-type-badge" id="pDocType">${f(a.type).toUpperCase()}</div>
                <div class="doc-meta-info" id="pDocNum">${f(a.docNumber||"DOC-2026-001")}</div>
                <div class="doc-meta-info" id="pDocDate">Date: ${a.date||""}</div>
                ${a.dueDate?`<div class="doc-meta-info" id="pDocDueDate">Due: ${a.dueDate}</div>`:""}
              </div>
            </div>

            <!-- Recipient Information -->
            <div class="doc-recipient-section">
              <div class="doc-address-box">
                <h4>Prepared For</h4>
                <strong id="pClientName" style="font-size: 14px; color: #000;">${f(a.contactName||"Valued Client")}</strong><br/>
                <span id="pClientCompany">${f(a.contactCompany||"")}</span><br/>
                <span id="pClientEmail">${f(a.contactEmail||"")}</span>
              </div>
              <div class="doc-address-box" style="text-align: right;">
                <h4>Prepared By</h4>
                <strong style="color: #000;">${f(o.name)}</strong><br/>
                <span>${f(o.address?o.address.split(`
`)[0]:"")}</span><br/>
                <span>${f(o.website||"")}</span>
              </div>
            </div>

            <!-- Content Body -->
            <div class="doc-content-body" id="pDocContent">
              ${X(a.content)}
            </div>

            <!-- Financial Table (If Applicable) -->
            ${N(a.type)?J(a.items):""}

            <!-- Digital Signature & Stamp Block -->
            <div class="doc-signature-block">
              <div>
                ${o.paymentDetails&&N(a.type)?`
                  <div style="font-size: 10px; color: #666; max-width: 280px;">
                    <strong>Payment Details:</strong><br/>
                    ${f(o.paymentDetails).replace(/\n/g,"<br/>")}
                  </div>
                `:""}
              </div>

              ${a.signatureIncluded!==!1?`
                <div style="text-align: right;">
                  ${o.signatureDataUrl?`<img src="${o.signatureDataUrl}" class="signature-img" />`:`<div style="font-family: 'Playfair Display', serif; font-size: 20px; font-style: italic; margin-bottom: 4px;">${f(o.signatureText||o.name)}</div>`}
                  <div class="signature-line">
                    Authorized Signature<br/>
                    <strong>${f(o.name)}</strong>
                  </div>
                </div>
              `:""}
            </div>

            ${a.digitallySigned?`
              <div style="margin-top: 24px; padding: 10px 14px; border: 1px dashed #333; background: #fafafa; border-radius: 4px; font-size: 10px; color: #444;">
                <div style="font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;">✓ Digitally Signed & Verified</div>
                <div>Signed By: ${f(((c=a.signedAuditStamp)==null?void 0:c.signer)||o.name)} | Time: ${a.signedTimestamp||"2026-08-16 UTC"}</div>
                <div style="font-family: monospace; font-size: 9px; color: #777;">Audit Hash: ${((p=a.signedAuditStamp)==null?void 0:p.hash)||"DOTSPACE-VERIFIED-2026"}</div>
              </div>
            `:""}

            <!-- Document Footer -->
            <div class="doc-footer">
              <span>dotspace Private Workspace</span>
              <span>Page 1 of 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function ut(e,t,n,s){const i=r.get();let a=i.documents[0]||R(i);e.querySelectorAll(".doc-type-tab").forEach(m=>{m.addEventListener("click",()=>{const w=m.getAttribute("data-type");a.type=w,a.content=Q(w,a.contactName),r.saveState(),s("documents",{docId:a.id})})});const o=e.querySelector("#btnNewBlankDoc");o&&o.addEventListener("click",()=>{if(!r.canCreateDocument()){n("upgradeModal"),t("Document limit reached on Free plan.");return}const m=R(i);r.update(w=>w.documents.unshift(m)),r.incrementDocCount(),r.addHistory(`Created new ${m.type}`,m.contactName,"Documents"),s("documents",{docId:m.id}),t("New document created.")});const d=(m,w,g,y)=>{const C=e.querySelector(m);C&&C.addEventListener("input",T=>{let S=T.target.value;if(a[w]=S,r.saveState(),g){const D=e.querySelector(g);D&&(D.innerHTML=y?y(S):f(S))}})};d("#fieldDocTitle","title"),d("#fieldDocNumber","docNumber","#pDocNum"),d("#fieldClientName","contactName","#pClientName"),d("#fieldClientCompany","contactCompany","#pClientCompany"),d("#fieldClientEmail","contactEmail","#pClientEmail"),d("#fieldDate","date","#pDocDate",m=>`Date: ${m}`),d("#fieldDueDate","dueDate","#pDocDueDate",m=>m?`Due: ${m}`:""),d("#fieldContent","content","#pDocContent",X);const c=e.querySelector("#fieldContactSelect");c&&c.addEventListener("change",m=>{const w=m.target.value,g=i.contacts.find(y=>y.id===w);g&&(a.contactId=g.id,a.contactName=g.name,a.contactCompany=g.company,a.contactEmail=g.email,r.saveState(),s("documents",{docId:a.id}))});const p=e.querySelector("#fieldStatus");p&&p.addEventListener("change",m=>{a.status=m.target.value,r.saveState();const w=e.querySelector("#previewDocStatusBadge");w&&(w.innerHTML=`<span class="badge-dot"></span>${a.status}`)});const u=e.querySelector("#fieldIncludeSignature");u&&u.addEventListener("change",m=>{a.signatureIncluded=m.target.checked,r.saveState(),s("documents",{docId:a.id})});const l=e.querySelector("#lineItemsTbody");if(l){const m=()=>{const g=[];l.querySelectorAll(".line-item-row").forEach(C=>{const T=C.querySelector(".item-desc").value,S=parseFloat(C.querySelector(".item-qty").value)||0,D=parseFloat(C.querySelector(".item-rate").value)||0,j=S*D;C.querySelector(".item-amount").textContent=`$${j.toLocaleString()}`,g.push({description:T,qty:S,rate:D,amount:j})}),a.items=g,r.saveState();const y=e.querySelector("#previewFinancialTable");y&&(y.outerHTML=J(g))};l.addEventListener("input",m),l.querySelectorAll(".btn-delete-item").forEach((g,y)=>{g.addEventListener("click",C=>{C.preventDefault(),l.querySelectorAll(".line-item-row").length>1&&(g.closest(".line-item-row").remove(),m())})});const w=e.querySelector("#btnAddLineItem");w&&w.addEventListener("click",g=>{g.preventDefault();const y=document.createElement("tr");y.className="line-item-row",y.innerHTML=`
          <td><input type="text" class="form-input item-desc" value="New Service" style="padding: 6px 8px;" /></td>
          <td><input type="number" class="form-input item-qty" value="1" style="padding: 6px 8px;" min="1" /></td>
          <td><input type="number" class="form-input item-rate" value="250" style="padding: 6px 8px;" /></td>
          <td style="text-align: right; font-weight: 600; font-size: 12.5px;" class="item-amount">$250</td>
          <td><button class="btn btn-ghost btn-sm btn-delete-item" style="color: #ef4444; padding: 4px;">✕</button></td>
        `,l.appendChild(y),m()})}const v=e.querySelector("#btnAiAssist");v&&v.addEventListener("click",()=>{n("aiAssistModal",{currentText:a.content,onApply:m=>{a.content=m,r.saveState(),s("documents",{docId:a.id}),t("Text updated via Assist.")}})});const b=e.querySelector("#btnSignDocument");b&&b.addEventListener("click",()=>{const m=rt(i.brandProfile.name);a.digitallySigned=!0,a.signedTimestamp=m.timestamp,a.signedAuditStamp=m,a.status="Signed",r.saveState(),r.addHistory(`Digitally signed ${a.title}`,a.contactName,"Agreements"),s("documents",{docId:a.id}),t("Document digitally signed & verified.")});const h=e.querySelector("#btnDownloadPDF");h&&h.addEventListener("click",async()=>{h.disabled=!0,h.innerHTML='<i data-lucide="loader" style="animation: spin 1s linear infinite;"></i> Generating PDF...',t("Generating high-resolution document PDF...");const m=`${a.title.replace(/[^a-z0-9]/gi,"_")}.pdf`;await nt("documentPaper",m),h.disabled=!1,h.innerHTML='<i data-lucide="download"></i> Download PDF',t("PDF Downloaded successfully!")})}function R(e){const t=e.documents.length+1,n=String(t).padStart(3,"0");return{id:"doc-"+Date.now(),docNumber:`DOC-2026-${n}`,type:"Welcome Note",title:`New Welcome Note #${n}`,contactId:"",contactName:"",contactCompany:"",contactEmail:"",date:new Date().toISOString().split("T")[0],dueDate:"",status:"Draft",content:Q("Welcome Note","Valued Client"),items:[],signatureIncluded:!0}}function N(e){return["Invoice","Quotation","Proposal","Receipt"].includes(e)}function Q(e,t){const n=t||"Valued Client";switch(e){case"Welcome Note":return`Welcome ${n},

We are excited to work with you on your upcoming project. Our goal is to ensure a smooth, professional, and transparent experience from day one.

Please review the attached orientation details and feel free to reach out with any questions.`;case"Proposal":return`PROJECT PROPOSAL FOR ${n.toUpperCase()}

1. OBJECTIVE & SCOPE
Deliver a high-impact, professional media and engineering solution tailored to your target deliverables.

2. TIMELINE & MILESTONES
- Phase 1: Discovery & Strategy (Week 1)
- Phase 2: Execution & Production (Week 2-3)
- Phase 3: Final Delivery (Week 4)`;case"Quotation":return`ESTIMATE & QUOTATION

Below is the broken-down fee structure for your requested scope. This quotation remains valid for 30 days from the date of issue.`;case"Invoice":return`Thank you for your business! Please find the detailed itemized invoice for professional services rendered below.

Payment terms: Net 15 days.`;case"Agreement":return`MASTER SERVICES AGREEMENT

This Agreement is entered into by and between the Service Provider and ${n}.

1. SCOPE OF SERVICES: Provider agrees to perform deliverables in accordance with agreed specifications.
2. PAYMENT: Client agrees to pay invoices within 15 days of issue date.
3. CONFIDENTIALITY: Both parties agree to protect proprietary knowledge.`;case"Contract":return`INDEPENDENT CONTRACTOR AGREEMENT

1. ENGAGEMENT: Client engages Contractor to render creative and technical services.
2. OWNERSHIP: Work product transfers to Client upon complete payment satisfaction.`;case"Receipt":return`OFFICIAL PAYMENT RECEIPT

This document confirms full receipt of payment for invoice services rendered. Account balance is fully settled.`;case"Project Delivery Note":return`PROJECT DELIVERY NOTE

All final assets, 4K masters, and project files have been delivered and uploaded to your workspace repository. Please verify signoff.`;case"Thank You Note":return`Dear ${n},

Thank you for working with us! It has been an absolute pleasure collaborating on this project. We look forward to working together again soon.`;default:return"Type custom document notes and terms here..."}}function X(e){return e?f(e).replace(/\n/g,"<br/>"):""}function J(e){if(!e||e.length===0)return"";const t=e.reduce((n,s)=>n+s.qty*s.rate,0);return`
    <div id="previewFinancialTable">
      <table class="doc-table">
        <thead>
          <tr>
            <th>Description</th>
            <th style="width: 50px; text-align: center;">Qty</th>
            <th style="width: 90px; text-align: right;">Rate</th>
            <th style="width: 90px; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${e.map(n=>`
            <tr>
              <td>${f(n.description)}</td>
              <td style="text-align: center;">${n.qty}</td>
              <td style="text-align: right;">$${n.rate.toLocaleString()}</td>
              <td style="text-align: right; font-weight: 600;">$${(n.qty*n.rate).toLocaleString()}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="doc-totals">
        <div class="doc-totals-row">
          <span>Subtotal:</span>
          <span>$${t.toLocaleString()}</span>
        </div>
        <div class="doc-totals-row">
          <span>Tax (0%):</span>
          <span>$0.00</span>
        </div>
        <div class="doc-totals-row final">
          <span>Total Amount Due:</span>
          <span>$${t.toLocaleString()}</span>
        </div>
      </div>
    </div>
  `}function f(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}const mt=["TO CONTACT","CONTACTED","WAITING","WORKING","COMPLETED"];function Z(){const t=r.get().workCards;return`
    <div class="view-header">
      <div class="view-title-group">
        <h1 class="view-title">Work Board</h1>
        <p class="view-subtitle">Track contacts, ongoing work, and project status at a glance.</p>
      </div>
      <div>
        <button class="btn btn-primary" id="btnNewWorkCard">
          <i data-lucide="plus"></i> Add Work Card
        </button>
      </div>
    </div>

    <!-- Kanban Columns Grid -->
    <div class="work-board" id="kanbanBoard">
      ${mt.map(n=>{const s=t.filter(i=>i.status===n);return`
          <div class="kanban-col" data-col="${n}">
            <div class="kanban-col-header">
              <span>${n}</span>
              <span class="badge" style="font-size: 10px;">${s.length}</span>
            </div>

            <div class="kanban-card-list" data-col="${n}">
              ${s.length===0?`
                <div style="padding: 20px 10px; text-align: center; color: var(--text-muted); font-size: 11px; border: 1px dashed var(--border-subtle); border-radius: var(--radius-md);">
                  Drop card here
                </div>
              `:s.map(i=>`
                <div class="kanban-card" draggable="true" data-id="${i.id}">
                  <div class="kanban-card-title">${A(i.title)}</div>
                  <div class="kanban-card-sub">${A(i.company||i.contactName||"General")} • ${A(i.service||"Service")}</div>
                  ${i.notes?`<div style="font-size: 11px; color: var(--text-secondary); max-height: 40px; overflow: hidden; text-overflow: ellipsis;">${A(i.notes)}</div>`:""}
                  
                  <div class="kanban-card-meta">
                    <span>${i.nextFollowUp?`Next: ${i.nextFollowUp}`:"No follow-up"}</span>
                    <button class="btn btn-ghost btn-sm btn-edit-card" data-id="${i.id}" style="padding: 2px 6px; font-size: 10px;">Edit</button>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `}).join("")}
    </div>
  `}function tt(e,t,n){const s=e.querySelector("#btnNewWorkCard");s&&s.addEventListener("click",()=>n("addWorkCard")),e.querySelectorAll(".btn-edit-card").forEach(a=>{a.addEventListener("click",o=>{o.stopPropagation();const d=a.getAttribute("data-id");n("editWorkCard",{cardId:d})})});let i=null;e.querySelectorAll(".kanban-card").forEach(a=>{a.addEventListener("dragstart",o=>{i=a.getAttribute("data-id"),a.classList.add("dragging"),o.dataTransfer.setData("text/plain",i)}),a.addEventListener("dragend",()=>{a.classList.remove("dragging")})}),e.querySelectorAll(".kanban-col-header, .kanban-card-list").forEach(a=>{a.addEventListener("dragover",o=>{o.preventDefault()}),a.addEventListener("drop",o=>{o.preventDefault();const d=a.closest(".kanban-col");if(!d||!i)return;const c=d.getAttribute("data-col"),u=r.get().workCards.find(l=>l.id===i);if(u&&u.status!==c){u.status=c,r.saveState(),r.addHistory(`Moved "${u.title}" to ${c}`,u.contactName,"Projects"),t(`Work card moved to ${c}`);const l=document.getElementById("contentBody");l.innerHTML=Z(),tt(l,t,n)}})})}function A(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}function vt(){const t=r.get().contacts;return`
    <div class="view-header">
      <div class="view-title-group">
        <h1 class="view-title">Contacts Directory</h1>
        <p class="view-subtitle">Private record of clients, collaborators, and leads.</p>
      </div>
      <div>
        <button class="btn btn-primary" id="btnNewContact">
          <i data-lucide="user-plus"></i> Add Contact
        </button>
      </div>
    </div>

    ${t.length===0?`
      <div class="empty-state">
        <div class="empty-state-title">No contacts yet</div>
        <div class="empty-state-sub">Keep the people you work with in one private, organized place.</div>
        <button class="btn btn-secondary btn-sm" id="emptyAddContactBtn">Add First Contact</button>
      </div>
    `:`
      <div class="contacts-grid">
        ${t.map(n=>`
          <div class="contact-card">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div class="contact-avatar">${gt(n.name)}</div>
              <div class="contact-info">
                <div class="contact-name">${k(n.name)}</div>
                <div class="contact-role">${k(n.role||"Client")} • ${k(n.company||"Independent")}</div>
              </div>
            </div>

            <div style="font-size: 12px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
              <div><strong>Email:</strong> ${k(n.email||"None")}</div>
              <div><strong>Phone:</strong> ${k(n.phone||"None")}</div>
              <div><strong>Interested In:</strong> ${k(n.serviceDiscussed||"General Freelance")}</div>
              <div><strong>Last Contacted:</strong> ${n.lastContacted||"N/A"}</div>
              <div><strong>Next Follow-up:</strong> ${n.nextFollowUp?`<span class="badge">${n.nextFollowUp}</span>`:"None"}</div>
            </div>

            ${n.notes?`
              <div style="font-size: 11.5px; color: var(--text-muted); background: var(--bg-surface-hover); padding: 8px 10px; border-radius: var(--radius-sm);">
                "${k(n.notes)}"
              </div>
            `:""}

            <div style="display: flex; gap: 8px; margin-top: auto; padding-top: 12px; border-top: 1px solid var(--border-subtle);">
              <button class="btn btn-secondary btn-sm contact-doc-btn" data-id="${n.id}" style="flex: 1;">
                <i data-lucide="file-plus" style="width: 13px; height: 13px;"></i> Create Doc
              </button>
              <button class="btn btn-ghost btn-sm contact-edit-btn" data-id="${n.id}">
                Edit
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `}
  `}function ht(e,t,n,s){const i=e.querySelector("#btnNewContact")||e.querySelector("#emptyAddContactBtn");i&&i.addEventListener("click",()=>n("addContact")),e.querySelectorAll(".contact-edit-btn").forEach(a=>{a.addEventListener("click",()=>{const o=a.getAttribute("data-id");n("editContact",{contactId:o})})}),e.querySelectorAll(".contact-doc-btn").forEach(a=>{a.addEventListener("click",()=>{const o=a.getAttribute("data-id"),d=r.get(),c=d.contacts.find(p=>p.id===o);if(c){const p=d.documents.length+1,u=String(p).padStart(3,"0"),l={id:"doc-"+Date.now(),docNumber:`DOC-2026-${u}`,type:"Welcome Note",title:`Welcome Note - ${c.name}`,contactId:c.id,contactName:c.name,contactCompany:c.company,contactEmail:c.email,date:new Date().toISOString().split("T")[0],dueDate:"",status:"Draft",content:`Welcome ${c.name},

We are excited to collaborate with you on your upcoming project.`,items:[],signatureIncluded:!0};r.update(v=>v.documents.unshift(l)),r.incrementDocCount(),s("documents",{docId:l.id}),t(`Started new document for ${c.name}`)}})})}function gt(e){if(!e)return"C";const t=e.split(" ");return t.length>=2?(t[0][0]+t[1][0]).toUpperCase():e.substring(0,2).toUpperCase()}function k(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}function F(e="All",t=""){let s=[...r.get().history];if(e!=="All"&&(s=s.filter(o=>o.category===e)),t.trim()){const o=t.toLowerCase();s=s.filter(d=>d.contactName&&d.contactName.toLowerCase().includes(o)||d.action&&d.action.toLowerCase().includes(o))}const i={};s.forEach(o=>{const d=o.date||"Earlier";i[d]||(i[d]=[]),i[d].push(o)});const a=Object.keys(i).sort((o,d)=>new Date(d)-new Date(o));return`
    <div class="view-header">
      <div class="view-title-group">
        <h1 class="view-title">Activity History</h1>
        <p class="view-subtitle">Your digital professional memory timeline.</p>
      </div>

      <div style="display: flex; gap: 12px; align-items: center;">
        <input type="text" class="form-input" id="historyClientSearch" value="${P(t)}" placeholder="Search client name..." style="width: 220px;" />
      </div>
    </div>

    <!-- Category Filter Tabs -->
    <div style="display: flex; gap: 8px; margin-bottom: 24px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
      ${["All","Documents","Contacts","Projects","Payments","Agreements"].map(o=>`
        <button class="btn btn-sm ${e===o?"btn-primary":"btn-ghost"} history-filter-btn" data-cat="${o}">
          ${o}
        </button>
      `).join("")}
    </div>

    <!-- History Timeline Group -->
    ${a.length===0?`
      <div class="empty-state">
        <div class="empty-state-title">No history records found</div>
        <div class="empty-state-sub">Your activity log will record documents created, agreements signed, and project updates.</div>
      </div>
    `:`
      <div class="history-timeline">
        ${a.map(o=>`
          <div class="history-date-group">
            <div class="history-date-label">${ft(o)}</div>
            <div class="list-group">
              ${i[o].map(d=>`
                <div class="list-item">
                  <div class="list-item-main">
                    <div class="list-item-icon">
                      <i data-lucide="${bt(d.category)}" style="width: 17px; height: 17px;"></i>
                    </div>
                    <div>
                      <div class="list-item-title">${P(d.action)}</div>
                      <div class="list-item-subtitle">${d.contactName?`Client: ${P(d.contactName)} • `:""}${d.category}</div>
                    </div>
                  </div>
                  <span class="badge">${d.category}</span>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `}
  `}function W(e,t,n,s){e.querySelectorAll(".history-filter-btn").forEach(a=>{a.addEventListener("click",()=>{const o=a.getAttribute("data-cat"),d=e.querySelector("#historyClientSearch"),c=d?d.value:"",p=document.getElementById("contentBody");p.innerHTML=F(o,c),W(p)})});const i=e.querySelector("#historyClientSearch");i&&i.addEventListener("input",a=>{const o=a.target.value,d=e.querySelector(".history-filter-btn.btn-primary"),c=d?d.getAttribute("data-cat"):"All",p=document.getElementById("contentBody");p.innerHTML=F(c,o),W(p)})}function bt(e){switch(e){case"Documents":return"file-text";case"Contacts":return"user";case"Projects":return"kanban";case"Payments":return"credit-card";case"Agreements":return"file-signature";default:return"activity"}}function ft(e){if(!e||e==="Earlier")return"Earlier Activity";try{return new Date(e).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}catch{return e}}function P(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}function q(){const t=r.get().calendarEvents||[{id:"cal-1",title:"30 Min Video Strategy w/ Rahul",date:"2026-08-20",time:"10:30 AM",contactName:"Rahul Sharma",company:"ABC Media",type:"Meeting",color:"#3b82f6",meetUrl:"https://meet.google.com/abc-defg-hij"},{id:"cal-2",title:"Q4 Launch Review w/ Sarah",date:"2026-08-22",time:"02:00 PM",contactName:"Sarah Chen",company:"Venture Labs",type:"Deadline",color:"#10b981",meetUrl:"https://meet.google.com/xyz-uvwx-rst"},{id:"cal-3",title:"DevCorp Master Files Delivery",date:"2026-08-18",time:"04:00 PM",contactName:"DevCorp Operations",company:"DevCorp Inc",type:"Delivery",color:"#8b5cf6",meetUrl:"https://meet.google.com/dev-corp-123"}],n=s=>{const a=`2026-08-${s<10?`0${s}`:`${s}`}`;return t.filter(o=>o.date===a)};return`
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
              ${M(n(18))}
            </div>
            
            <div class="gcal-cell" data-day="19"><span class="cell-num">19</span></div>
            
            <!-- Aug 20 -->
            <div class="gcal-cell" data-day="20">
              <span class="cell-num">20</span>
              ${M(n(20))}
            </div>
            
            <div class="gcal-cell" data-day="21"><span class="cell-num">21</span></div>
            
            <!-- Aug 22 -->
            <div class="gcal-cell" data-day="22">
              <span class="cell-num">22</span>
              ${M(n(22))}
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
  `}function M(e){return!e||e.length===0?"":e.map(t=>`
    <div class="gcal-event-chip" style="background: ${t.color||"#3b82f6"};" data-id="${t.id}">
      <span class="chip-time">${t.time}</span>
      <span class="chip-title">${yt(t.title)}</span>
    </div>
  `).join("")}function U(e,t,n){const s=e.querySelector("#btnCreateSpaceEvent");s&&s.addEventListener("click",()=>{const i=prompt("Enter Event Title:","30 Min Client Call");if(!i)return;const a=prompt("Enter day in August (e.g. 20):","20"),o=parseInt(a)<10?`0${parseInt(a)}`:`${parseInt(a)}`,d={id:"cal-"+Date.now(),title:i,date:`2026-08-${o}`,time:"11:00 AM",type:"Meeting",color:"#3b82f6",meetUrl:"https://meet.google.com/space-"+Math.floor(Math.random()*1e3)};r.update(p=>{p.calendarEvents||(p.calendarEvents=[]),p.calendarEvents.push(d)}),t(`📅 Event "${i}" created on Space Calendar!`);const c=document.getElementById("contentBody");c.innerHTML=q(),U(c,t)}),e.querySelectorAll(".gcal-cell[data-day]").forEach(i=>{i.addEventListener("click",a=>{if(a.target.closest(".gcal-event-chip"))return;const o=i.getAttribute("data-day"),d=prompt(`Add Event for August ${o}, 2026:`,"Client Meeting / Review");if(!d)return;const c=parseInt(o)<10?`0${parseInt(o)}`:`${parseInt(o)}`,p={id:"cal-"+Date.now(),title:d,date:`2026-08-${c}`,time:"02:00 PM",type:"Task",color:"#10b981"};r.update(l=>{l.calendarEvents||(l.calendarEvents=[]),l.calendarEvents.push(p)}),t(`Added event to August ${o}!`);const u=document.getElementById("contentBody");u.innerHTML=q(),U(u,t)})}),e.querySelectorAll(".gcal-event-chip").forEach(i=>{i.addEventListener("click",a=>{a.stopPropagation();const o=i.getAttribute("data-id"),d=r.get().calendarEvents.find(c=>c.id===o);d&&alert(`🗓️ Event Details:

Title: ${d.title}
Date: ${d.date} at ${d.time}
Client: ${d.contactName||"N/A"}
Google Meet: ${d.meetUrl||"Generated"}`)})})}function yt(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}function wt(){const t=r.get().brandProfile;return`
    <div class="view-header">
      <div class="view-title-group">
        <h1 class="view-title">Brand & Professional Profile</h1>
        <p class="view-subtitle">Set up your professional identity once. Auto-populated on all generated documents.</p>
      </div>
      <div>
        <button class="btn btn-primary" id="btnSaveProfile">
          <i data-lucide="check"></i> Save Brand Profile
        </button>
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- Left Column: Primary Identity Fields -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">
            <i data-lucide="user" style="width: 16px; height: 16px;"></i>
            Freelancer & Business Identity
          </div>
        </div>

        <form id="profileForm" style="display: flex; flex-direction: column; gap: 16px;">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-input" id="profName" value="${E(t.name)}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Business / Studio Name</label>
              <input type="text" class="form-input" id="profCompany" value="${E(t.company)}" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Professional Title / Role</label>
              <input type="text" class="form-input" id="profTitle" value="${E(t.title)}" />
            </div>
            <div class="form-group">
              <label class="form-label">Tax ID / Business Reg</label>
              <input type="text" class="form-input" id="profTaxId" value="${E(t.taxId)}" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-input" id="profEmail" value="${E(t.email)}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <input type="text" class="form-input" id="profPhone" value="${E(t.phone)}" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Website URL</label>
            <input type="url" class="form-input" id="profWebsite" value="${E(t.website)}" />
          </div>

          <div class="form-group">
            <label class="form-label">Business Address</label>
            <textarea class="form-textarea" id="profAddress" rows="3">${E(t.address)}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Payment & Bank Information (Appears on Invoices)</label>
            <textarea class="form-textarea" id="profPaymentDetails" rows="4">${E(t.paymentDetails)}</textarea>
          </div>
        </form>
      </div>

      <!-- Right Column: Logo & Digital Signature Pad -->
      <div class="grid-stack">
        <!-- Logo Setup -->
        <div class="panel">
          <div class="panel-header">
            <div class="panel-title">
              <i data-lucide="image" style="width: 16px; height: 16px;"></i>
              Brand Logo
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Logo Image URL</label>
            <input type="url" class="form-input" id="profLogoUrl" value="${E(t.logoUrl)}" placeholder="https://example.com/logo.png" />
            <span style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Leave blank to use elegant typographic brand header.</span>
          </div>
        </div>

        <!-- Digital Signature Setup -->
        <div class="panel">
          <div class="panel-header">
            <div class="panel-title">
              <i data-lucide="pen-tool" style="width: 16px; height: 16px;"></i>
              Digital Signature
            </div>
            <button class="btn btn-ghost btn-sm" id="btnClearSig">Clear Canvas</button>
          </div>

          <div class="form-group">
            <label class="form-label">Draw Signature below</label>
            <canvas class="signature-canvas" id="profileSigCanvas"></canvas>
          </div>

          <div class="form-group" style="margin-top: 10px;">
            <label class="form-label">Or Formal Typed Signature Text</label>
            <input type="text" class="form-input" id="profSigText" value="${E(t.signatureText)}" />
          </div>
        </div>
      </div>
    </div>
  `}function xt(e,t){const n=e.querySelector("#profileSigCanvas");let s=null;if(n){s=new ct(n);const a=e.querySelector("#btnClearSig");a&&a.addEventListener("click",o=>{o.preventDefault(),s.clear()})}const i=e.querySelector("#btnSaveProfile");i&&i.addEventListener("click",a=>{a.preventDefault(),r.update(o=>{const d=o.brandProfile;d.name=e.querySelector("#profName").value,d.company=e.querySelector("#profCompany").value,d.title=e.querySelector("#profTitle").value,d.taxId=e.querySelector("#profTaxId").value,d.email=e.querySelector("#profEmail").value,d.phone=e.querySelector("#profPhone").value,d.website=e.querySelector("#profWebsite").value,d.address=e.querySelector("#profAddress").value,d.paymentDetails=e.querySelector("#profPaymentDetails").value,d.logoUrl=e.querySelector("#profLogoUrl").value,d.signatureText=e.querySelector("#profSigText").value,s&&s.hasSignature&&(d.signatureDataUrl=s.toDataURL())}),t("Brand profile updated successfully!")})}function E(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}function H(){const t=r.get().subscription.plan;return`
    <div class="view-header" style="text-align: center; display: block; margin-bottom: 40px;">
      <h1 class="view-title" style="font-size: 32px; margin-bottom: 8px;">Private Workspace Subscription</h1>
      <p class="view-subtitle" style="font-size: 15px;">Simple, honest pricing for independent professionals. No ads. No client portals.</p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; max-width: 900px; margin: 0 auto;">
      <!-- Free Tier Card -->
      <div class="panel" style="display: flex; flex-direction: column; justify-content: space-between; border-color: ${t==="free"?"var(--text-primary)":"var(--border-subtle)"}">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 14px; font-weight: 700; uppercase; letter-spacing: 1px;">FREE TIER</span>
            ${t==="free"?'<span class="badge">Current Plan</span>':""}
          </div>
          <div style="font-size: 36px; font-weight: 800; color: var(--text-primary); margin-bottom: 16px;">$0 <span style="font-size: 14px; color: var(--text-muted); font-weight: 400;">/ month forever</span></div>
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 24px;">Essential tools for starting freelancers creating occasional business documents.</p>

          <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px; color: var(--text-primary);">
            <div>✓ Single Brand Profile setup</div>
            <div>✓ Standard professional document formats</div>
            <div>✓ Maximum 5 document creations / month</div>
            <div>✓ High-resolution PDF exports</div>
            <div>✓ Basic private workspace</div>
          </div>
        </div>

        <div style="margin-top: 32px;">
          <button class="btn btn-secondary" style="width: 100%;" ${t==="free"?"disabled":""} id="btnSelectFree">
            ${t==="free"?"Active Plan":"Downgrade to Free"}
          </button>
        </div>
      </div>

      <!-- Premium Tier Card -->
      <div class="panel" style="display: flex; flex-direction: column; justify-content: space-between; background: var(--bg-surface-hover); border: 2px solid var(--text-primary);">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 14px; font-weight: 700; uppercase; letter-spacing: 1px;">DOTSPACE PRO</span>
            ${t==="premium"?'<span class="badge">Current Plan</span>':'<span class="badge" style="background: var(--text-primary); color: var(--bg-app);">Recommended</span>'}
          </div>
          <div style="font-size: 36px; font-weight: 800; color: var(--text-primary); margin-bottom: 16px;">$19 <span style="font-size: 14px; color: var(--text-muted); font-weight: 400;">/ month</span></div>
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 24px;">Complete private digital office for active independent professionals.</p>

          <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px; color: var(--text-primary);">
            <div>✓ <strong>Unlimited document creations</strong></div>
            <div>✓ Full chronological activity history timeline</div>
            <div>✓ Contacts CRM directory & history linkage</div>
            <div>✓ Kanban Work Board tracking</div>
            <div>✓ Follow-up reminders & deadline calendar</div>
            <div>✓ Verified Digital Signatures & audit stamp</div>
            <div>✓ Document style & font customization</div>
            <div>✓ Advanced document types</div>
          </div>
        </div>

        <div style="margin-top: 32px;">
          <button class="btn btn-primary" style="width: 100%; font-size: 14px; padding: 12px;" id="btnSelectPremium">
            ${t==="premium"?"Current Pro Member":"Upgrade to Pro — $19/mo"}
          </button>
        </div>
      </div>
    </div>
  `}function G(e,t){const n=e.querySelector("#btnSelectPremium");n&&n.addEventListener("click",()=>{r.update(a=>{a.subscription.plan="premium"}),t("🎉 Upgraded to dotspace Pro! Unlimited features unlocked.");const i=document.getElementById("contentBody");i.innerHTML=H(),G(i,t)});const s=e.querySelector("#btnSelectFree");s&&s.addEventListener("click",()=>{r.update(a=>{a.subscription.plan="free"}),t("Switched to Free plan.");const i=document.getElementById("contentBody");i.innerHTML=H(),G(i,t)})}class Ct{constructor(t){this.app=t,this.init()}init(){window.google&&window.google.accounts?this.initGoogleIdSDK():window.addEventListener("load",()=>{window.google&&window.google.accounts&&this.initGoogleIdSDK()})}initGoogleIdSDK(){try{window.google.accounts.id.initialize({client_id:"108283921829-dotspace.apps.googleusercontent.com",callback:t=>this.handleCredentialResponse(t),auto_select:!1})}catch(t){console.warn("Google Identity SDK init note:",t)}}handleCredentialResponse(t){if(!(!t||!t.credential))try{const s=t.credential.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),i=decodeURIComponent(atob(s).split("").map(o=>"%"+("00"+o.charCodeAt(0).toString(16)).slice(-2)).join("")),a=JSON.parse(i);this.loginWithGoogleUser({name:a.name||a.given_name||"Google User",email:a.email,picture:a.picture})}catch(n){console.error("Failed to parse Google JWT payload:",n)}}loginWithGoogleUser(t){const n=r.get().brandProfile;r.updateBrandProfile({...n,name:t.name||n.name,email:t.email||n.email,company:t.name?`${t.name.split(" ")[0]} Studio`:n.company});const s=document.getElementById("authOverlay");s&&s.classList.add("hidden"),(t.name||"User").split(" ")[0],this.app&&this.app.showToast&&this.app.showToast(`Signed in with Google as ${t.email}. Welcome!`),this.app&&this.app.navigateTo&&this.app.navigateTo(r.get().activeView||"home")}promptGoogleSignIn(){window.google&&window.google.accounts&&window.google.accounts.id?window.google.accounts.id.prompt(t=>{(t.isNotDisplayed()||t.isSkippedMoment())&&this.openGoogleAccountModal()}):this.openGoogleAccountModal()}openGoogleAccountModal(){const t=r.get(),n=t.brandProfile.email||"harsha@gmail.com",s=t.brandProfile.name||"Harsha Vardhan",i=`
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <svg width="24" height="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.616z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          <h2 class="modal-title">Sign in with Google</h2>
        </div>
        <button class="modal-close" id="closeGoogleModal">✕</button>
      </div>

      <div class="modal-body">
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">
          Choose a Google Account to continue to <strong>dotspace</strong>.
        </p>

        <!-- Quick Google Account Card 1 -->
        <div class="google-account-item" id="googleAccountItem1" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); background: var(--bg-surface); cursor: pointer; margin-bottom: 10px; transition: all 0.2s;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: #4285f4; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px;">
            ${s.charAt(0)}
          </div>
          <div style="flex: 1; text-align: left;">
            <div style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${O(s)}</div>
            <div style="font-size: 11px; color: var(--text-muted);">${O(n)}</div>
          </div>
          <span class="badge" style="font-size: 10px;">Google</span>
        </div>

        <form id="googleCustomLoginForm" style="display: flex; flex-direction: column; gap: 12px; margin-top: 16px; text-align: left;">
          <div class="form-group">
            <label class="form-label" style="font-size: 11px;">Or enter any Google Mail address</label>
            <input type="email" class="form-input" id="googleCustomEmail" placeholder="yourname@gmail.com" value="${O(n)}" required />
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; font-size: 13px; padding: 12px;">
            Sign In with this Google Account
          </button>
        </form>
      </div>
    `;if(this.app&&this.app.openCustomModal){this.app.openCustomModal(i);const a=document.getElementById("closeGoogleModal");a&&a.addEventListener("click",()=>this.app.closeModal());const o=document.getElementById("googleAccountItem1");o&&o.addEventListener("click",()=>{this.app.closeModal(),this.loginWithGoogleUser({name:s,email:n})});const d=document.getElementById("googleCustomLoginForm");d&&d.addEventListener("submit",c=>{c.preventDefault();const p=document.getElementById("googleCustomEmail").value;if(!p)return;const u=p.split("@")[0].replace(/[._]/g," "),l=u.charAt(0).toUpperCase()+u.slice(1);this.app.closeModal(),this.loginWithGoogleUser({name:l,email:p})})}}}function O(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}class Et{constructor(){this.contentBody=document.getElementById("contentBody"),this.pageTitle=document.getElementById("pageTitle"),this.modalBackdrop=document.getElementById("modalBackdrop"),this.modalContainer=document.getElementById("modalContainer"),this.toastContainer=document.getElementById("toastContainer"),this.sidebar=document.getElementById("appSidebar"),this.sidebarBackdrop=document.getElementById("sidebarBackdrop"),this.currentView="home",this.viewParams={},this.init()}init(){const t=r.get();document.documentElement.setAttribute("data-theme",t.theme||"dark"),this.updateThemeButton(),r.subscribe(g=>{this.updateSidebarTierWidget(g)}),this.updateSidebarTierWidget(t);const n=document.getElementById("mobileMenuToggle"),s=document.getElementById("mobileMenuClose");n&&n.addEventListener("click",()=>this.toggleMobileMenu()),s&&s.addEventListener("click",()=>this.closeMobileMenu()),this.sidebarBackdrop&&this.sidebarBackdrop.addEventListener("click",()=>this.closeMobileMenu()),document.querySelectorAll(".nav-item").forEach(g=>{g.addEventListener("click",y=>{y.preventDefault();const C=g.getAttribute("data-view");this.navigateTo(C),this.closeMobileMenu()})});const i=document.getElementById("quickNewDocBtn");i&&i.addEventListener("click",()=>{if(!r.canCreateDocument()){this.openModal("upgradeModal"),this.showToast("Document limit reached on Free plan.");return}const y=r.get().documents.length+1,C=String(y).padStart(3,"0"),T={id:"doc-"+Date.now(),docNumber:`DOC-2026-${C}`,type:"Welcome Note",title:`New Welcome Note #${C}`,contactId:"",contactName:"",contactCompany:"",contactEmail:"",date:new Date().toISOString().split("T")[0],dueDate:"",status:"Draft",content:"Type your document content here...",items:[],signatureIncluded:!0};r.update(S=>S.documents.unshift(T)),r.incrementDocCount(),this.navigateTo("documents",{docId:T.id}),this.showToast("New document initialized.")});const a=document.getElementById("upgradeBtn");a&&a.addEventListener("click",()=>this.navigateTo("pricing"));const o=document.getElementById("themeToggleBtn");o&&o.addEventListener("click",()=>{const y=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",y),r.update(C=>C.theme=y),this.updateThemeButton(),this.showToast(`Switched to ${y==="dark"?"Dark":"Light"} Mode`)});const d=document.getElementById("globalSearchInput");d&&d.addEventListener("input",g=>{const y=g.target.value;y.trim()&&this.navigateTo("history",{searchQuery:y})}),this.authOverlay=document.getElementById("authOverlay"),this.authOverlay&&this.authOverlay.classList.add("hidden");const c=document.getElementById("authLoginForm"),p=document.getElementById("btnLockOffice"),u=t.brandProfile.name||"Harsha Vardhan",l=t.brandProfile.email||"harsha@dotspace.office",v=u.split(" ").map(g=>g[0]).join("").substring(0,2).toUpperCase(),b=document.getElementById("authUserName"),h=document.getElementById("authUserEmail"),m=document.getElementById("authAvatar");b&&(b.textContent=u),h&&(h.textContent=l),m&&(m.textContent=v),this.googleAuth=new Ct(this);const w=document.getElementById("btnGoogleSignIn");w&&w.addEventListener("click",()=>{this.googleAuth.promptGoogleSignIn()}),c&&c.addEventListener("submit",g=>{g.preventDefault(),this.authOverlay&&this.authOverlay.classList.add("hidden"),this.showToast(`Welcome back, ${u.split(" ")[0]}! Office Unlocked.`)}),p&&p.addEventListener("click",()=>{this.authOverlay&&this.authOverlay.classList.remove("hidden"),this.showToast("Workspace Locked.")}),this.modalBackdrop.addEventListener("click",g=>{g.target===this.modalBackdrop&&this.closeModal()}),this.navigateTo("home")}toggleMobileMenu(){this.sidebar&&this.sidebar.classList.toggle("mobile-open"),this.sidebarBackdrop&&this.sidebarBackdrop.classList.toggle("mobile-open")}closeMobileMenu(){this.sidebar&&this.sidebar.classList.remove("mobile-open"),this.sidebarBackdrop&&this.sidebarBackdrop.classList.remove("mobile-open")}updateThemeButton(){const t=document.documentElement.getAttribute("data-theme"),n=document.getElementById("themeLabel"),s=document.getElementById("themeIcon");n&&(n.textContent=t==="dark"?"Dark Mode":"Light Mode"),s&&s.setAttribute("data-lucide",t==="dark"?"moon":"sun"),window.lucide&&window.lucide.createIcons()}updateSidebarTierWidget(t){const n=t.subscription,s=document.getElementById("tierBadge"),i=document.getElementById("docCountText"),a=document.getElementById("tierProgressFill");if(n.plan==="premium")s&&(s.textContent="PREMIUM PLAN"),i&&(i.textContent="UNLIMITED"),a&&(a.style.width="100%");else{s&&(s.textContent="FREE PLAN"),i&&(i.textContent=`${n.docsCreatedThisMonth}/${n.maxFreeDocs} DOCS`);const o=Math.min(100,Math.round(n.docsCreatedThisMonth/n.maxFreeDocs*100));a&&(a.style.width=`${o}%`)}}navigateTo(t,n={}){switch(this.currentView=t,this.viewParams=n,document.querySelectorAll(".nav-item").forEach(s=>{s.getAttribute("data-view")===t?s.classList.add("active"):s.classList.remove("active")}),t){case"home":this.pageTitle.textContent="Home Workspace",this.contentBody.innerHTML=I(),$(this.contentBody,s=>this.navigateTo(s));break;case"documents":this.pageTitle.textContent="Document Generator",this.contentBody.innerHTML=pt(n),ut(this.contentBody,s=>this.showToast(s),(s,i)=>this.openModal(s,i),(s,i)=>this.navigateTo(s,i));break;case"work":this.pageTitle.textContent="Work Board",this.contentBody.innerHTML=Z(),tt(this.contentBody,s=>this.showToast(s),(s,i)=>this.openModal(s,i));break;case"contacts":this.pageTitle.textContent="Contacts Directory",this.contentBody.innerHTML=vt(),ht(this.contentBody,s=>this.showToast(s),(s,i)=>this.openModal(s,i),(s,i)=>this.navigateTo(s,i));break;case"history":this.pageTitle.textContent="Activity History",this.contentBody.innerHTML=F("All",n.searchQuery||""),W(this.contentBody);break;case"calendar":this.pageTitle.textContent="Follow-ups & Calendar",this.contentBody.innerHTML=q(),U(this.contentBody,s=>this.showToast(s));break;case"profile":this.pageTitle.textContent="Brand Profile",this.contentBody.innerHTML=wt(),xt(this.contentBody,s=>this.showToast(s));break;case"pricing":this.pageTitle.textContent="Subscription Tiers",this.contentBody.innerHTML=H(),G(this.contentBody,s=>this.showToast(s));break;default:this.navigateTo("home");return}window.lucide&&window.lucide.createIcons()}showToast(t){const n=document.createElement("div");n.className="toast",n.innerHTML=`<i data-lucide="check-circle" style="width: 16px; height: 16px;"></i> ${Y(t)}`,this.toastContainer.appendChild(n),window.lucide&&window.lucide.createIcons(),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateY(10px)",n.style.transition="all 0.3s ease",setTimeout(()=>n.remove(),300)},3200)}openModal(t,n={}){!this.modalContainer||!this.modalBackdrop||(this.modalContainer.innerHTML=this.renderModalContent(t,n),this.modalBackdrop.classList.add("active"),window.lucide&&window.lucide.createIcons(),this.attachModalEvents(t,n))}openCustomModal(t){!this.modalContainer||!this.modalBackdrop||(this.modalContainer.innerHTML=t,this.modalBackdrop.classList.add("active"),window.lucide&&window.lucide.createIcons())}closeModal(){this.modalBackdrop&&(this.modalBackdrop.classList.remove("active"),setTimeout(()=>{this.modalContainer.innerHTML=""},200))}renderModalContent(t,n){switch(r.get(),t){case"addContact":return`
          <div class="modal-header">
            <h3 class="modal-title">Add New Contact</h3>
            <button class="btn btn-ghost btn-sm" id="modalClose">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-input" id="mCntName" placeholder="Rahul Sharma" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Company</label>
                <input type="text" class="form-input" id="mCntCompany" placeholder="ABC Media" />
              </div>
              <div class="form-group">
                <label class="form-label">Role</label>
                <input type="text" class="form-input" id="mCntRole" placeholder="Founder" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" id="mCntEmail" placeholder="rahul@abcmedia.com" />
              </div>
              <div class="form-group">
                <label class="form-label">Phone</label>
                <input type="text" class="form-input" id="mCntPhone" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Service / Project Discussed</label>
              <input type="text" class="form-input" id="mCntService" placeholder="Personal Brand Video" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Last Contacted Date</label>
                <input type="date" class="form-input" id="mCntLast" value="${new Date().toISOString().split("T")[0]}" />
              </div>
              <div class="form-group">
                <label class="form-label">Next Follow-up Date</label>
                <input type="date" class="form-input" id="mCntNext" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Notes</label>
              <textarea class="form-textarea" id="mCntNotes" rows="3" placeholder="Sent portfolio. Waiting for response."></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="modalCancel">Cancel</button>
            <button class="btn btn-primary" id="mSaveContactBtn">Save Contact</button>
          </div>
        `;case"addWorkCard":return`
          <div class="modal-header">
            <h3 class="modal-title">Track Work Item</h3>
            <button class="btn btn-ghost btn-sm" id="modalClose">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Project / Work Title</label>
              <input type="text" class="form-input" id="mWrkTitle" placeholder="Rahul - Personal Brand Video" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Company / Client</label>
                <input type="text" class="form-input" id="mWrkCompany" placeholder="ABC Media" />
              </div>
              <div class="form-group">
                <label class="form-label">Service Type</label>
                <input type="text" class="form-input" id="mWrkService" placeholder="Video Editing" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Initial Status</label>
                <select class="form-select" id="mWrkStatus">
                  <option value="TO CONTACT">TO CONTACT</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="WAITING">WAITING</option>
                  <option value="WORKING" selected>WORKING</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Next Follow-up</label>
                <input type="date" class="form-input" id="mWrkFollowUp" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Project Notes & Details</label>
              <textarea class="form-textarea" id="mWrkNotes" rows="3" placeholder="What was discussed or sent..."></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="modalCancel">Cancel</button>
            <button class="btn btn-primary" id="mSaveWorkBtn">Add to Work Board</button>
          </div>
        `;case"addCalendarTask":return`
          <div class="modal-header">
            <h3 class="modal-title">Schedule Follow-up Reminder</h3>
            <button class="btn btn-ghost btn-sm" id="modalClose">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Reminder Title</label>
              <input type="text" class="form-input" id="mCalTitle" placeholder="Follow up with Rahul (ABC Media)" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Date</label>
                <input type="date" class="form-input" id="mCalDate" value="${new Date().toISOString().split("T")[0]}" />
              </div>
              <div class="form-group">
                <label class="form-label">Type</label>
                <select class="form-select" id="mCalType">
                  <option value="Follow-up">Follow-up</option>
                  <option value="Deadline">Deadline</option>
                  <option value="Payment">Payment Due</option>
                  <option value="Meeting">Meeting</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="modalCancel">Cancel</button>
            <button class="btn btn-primary" id="mSaveCalBtn">Set Reminder</button>
          </div>
        `;case"aiAssistModal":return`
          <div class="modal-header">
            <h3 class="modal-title" style="display: flex; align-items: center; gap: 8px;">
              <i data-lucide="sparkles" style="width: 18px; height: 18px;"></i> Writing Assistance (Assist)
            </h3>
            <button class="btn btn-ghost btn-sm" id="modalClose">✕</button>
          </div>
          <div class="modal-body">
            <p style="font-size: 12px; color: var(--text-muted);">Select an explicit improvement action to refine your document text. Your content is never automatically modified without your approval.</p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 12px 0;">
              <button class="btn btn-secondary btn-sm assist-action-btn" data-action="fix_grammar">Fix Grammar</button>
              <button class="btn btn-secondary btn-sm assist-action-btn" data-action="make_professional">Make Professional</button>
              <button class="btn btn-secondary btn-sm assist-action-btn" data-action="make_clearer">Make Clearer</button>
              <button class="btn btn-secondary btn-sm assist-action-btn" data-action="shorten">Shorten</button>
              <button class="btn btn-secondary btn-sm assist-action-btn" data-action="expand">Expand</button>
              <button class="btn btn-secondary btn-sm assist-action-btn" data-action="rewrite">Full Rewrite</button>
            </div>

            <div class="form-group">
              <label class="form-label">Preview Refined Text</label>
              <textarea class="form-textarea" id="assistPreviewText" rows="6">${Y(n.currentText||"")}</textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="modalCancel">Discard</button>
            <button class="btn btn-primary" id="mApplyAssistBtn">Apply to Document</button>
          </div>
        `;case"upgradeModal":return`
          <div class="modal-header">
            <h3 class="modal-title">Upgrade to dotspace Pro</h3>
            <button class="btn btn-ghost btn-sm" id="modalClose">✕</button>
          </div>
          <div class="modal-body" style="text-align: center; padding: 32px 24px;">
            <i data-lucide="sparkles" style="width: 48px; height: 48px; margin-bottom: 16px;"></i>
            <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Unlock Unlimited Private Office Features</h2>
            <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 24px; max-width: 400px; margin-left: auto; margin-right: auto;">
              You have reached your 5 free document limit this month. Upgrade to Premium for $19/mo for unlimited documents, CRM contacts, work board, and verified digital signatures.
            </p>
          </div>
          <div class="modal-footer" style="justify-content: center;">
            <button class="btn btn-secondary" id="modalCancel">Maybe Later</button>
            <button class="btn btn-primary" id="mGoToPricingBtn">View Subscription Plans</button>
          </div>
        `;default:return""}}attachModalEvents(t,n){const s=document.getElementById("modalClose"),i=document.getElementById("modalCancel");switch(s&&s.addEventListener("click",()=>this.closeModal()),i&&i.addEventListener("click",()=>this.closeModal()),t){case"addContact":const a=document.getElementById("mSaveContactBtn");a&&a.addEventListener("click",()=>{const v=document.getElementById("mCntName").value;if(!v)return;const b={id:"cnt-"+Date.now(),name:v,company:document.getElementById("mCntCompany").value,role:document.getElementById("mCntRole").value,email:document.getElementById("mCntEmail").value,phone:document.getElementById("mCntPhone").value,serviceDiscussed:document.getElementById("mCntService").value,lastContacted:document.getElementById("mCntLast").value,nextFollowUp:document.getElementById("mCntNext").value,notes:document.getElementById("mCntNotes").value};r.update(h=>h.contacts.unshift(b)),r.addHistory(`Added new contact ${v} (${b.company})`,v,"Contacts"),this.closeModal(),this.showToast(`Saved contact ${v}`),this.navigateTo("contacts")});break;case"addWorkCard":const o=document.getElementById("mSaveWorkBtn");o&&o.addEventListener("click",()=>{const v=document.getElementById("mWrkTitle").value;if(!v)return;const b={id:"wrk-"+Date.now(),title:v,company:document.getElementById("mWrkCompany").value,service:document.getElementById("mWrkService").value,status:document.getElementById("mWrkStatus").value,nextFollowUp:document.getElementById("mWrkFollowUp").value,notes:document.getElementById("mWrkNotes").value};r.update(h=>h.workCards.unshift(b)),r.addHistory(`Added work card "${v}"`,b.company,"Projects"),this.closeModal(),this.showToast("Added card to Work Board"),this.navigateTo("work")});break;case"addCalendarTask":const d=document.getElementById("mSaveCalBtn");d&&d.addEventListener("click",()=>{const v=document.getElementById("mCalTitle").value;if(!v)return;const b={id:"cal-"+Date.now(),title:v,date:document.getElementById("mCalDate").value,type:document.getElementById("mCalType").value,completed:!1};r.update(h=>h.calendarEvents.unshift(b)),this.closeModal(),this.showToast(`Reminder scheduled for ${b.date}`),this.navigateTo("calendar")});break;case"aiAssistModal":let c=n.currentText||"";const p=document.getElementById("assistPreviewText");document.querySelectorAll(".assist-action-btn").forEach(v=>{v.addEventListener("click",()=>{const b=v.getAttribute("data-action");c=it(c,b),p&&(p.value=c)})});const u=document.getElementById("mApplyAssistBtn");u&&u.addEventListener("click",()=>{n.onApply&&n.onApply(p?p.value:c),this.closeModal()});break;case"upgradeModal":const l=document.getElementById("mGoToPricingBtn");l&&l.addEventListener("click",()=>{this.closeModal(),this.navigateTo("pricing")});break}}}function Y(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}window.addEventListener("DOMContentLoaded",()=>{window.folioApp=new Et});
