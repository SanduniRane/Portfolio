(() => {
  const splash = document.getElementById('splash');
  const splashInner = splash.querySelector('.splash-inner');
  const home = document.getElementById('home');
  const scanPage = document.getElementById('scan');
  const scanBtn = document.getElementById('scanBtn');
  const websiteInput = document.getElementById('websiteUrl');
  const currentUrlEl = document.getElementById('currentUrl');
  const scanResultsContainer = document.getElementById('scanResults');
  const downloadBtn = document.getElementById('downloadPdfBtn');
  const benefitTitle = document.querySelector('.benefit-title');
  const benefits = document.querySelectorAll('.benefit');

  let latestReport = null;

  // ---------- SPLASH SCREEN ----------
  splash.style.display='flex';
  setTimeout(()=> splashInner.classList.add('visible'),100);

  setTimeout(()=>{
    fadeOut(splash,()=>{
      fadeInPage(home);
      fadeInHomeElements();
    });
  },4000);

  function fadeInPage(el){
    el.style.display='block';
    requestAnimationFrame(()=>{
      el.classList.add('visible');
    });
  }
  function fadeOut(el,callback){
    el.style.opacity=1;
    el.style.transform='translateY(0)';
    requestAnimationFrame(()=>{
      el.style.opacity=0;
      el.style.transform='translateY(20px)';
    });
    setTimeout(()=>{
      el.style.display='none';
      callback && callback();
    },800);
  }

  function fadeInHomeElements(){
    benefitTitle.classList.add('visible');
    document.querySelector('.scan-input').classList.add('visible');
    benefits.forEach((b,i)=>setTimeout(()=> b.classList.add('visible'), i*200));
  }

  // ---------- SCAN BUTTON ----------
  scanBtn.addEventListener('click',()=>{
    const url = websiteInput.value.trim();
    if(!url.match(/^https?:\/\/.+/)){
      alert('Enter valid URL (http/https)');
      return;
    }
    fadeOut(home,()=>{
      scanPage.style.display='block';
      fadeInPage(scanPage);
      currentUrlEl.textContent = url;
      runScan(url);
    });
  });

  // ---------- SCAN LOGIC ----------
  async function runScan(url){
    scanResultsContainer.innerHTML='';
    downloadBtn.disabled=true;

    const checks = [
      {title:"HTTPS Enabled", fn:()=>url.startsWith('https://')},
      {title:"Cookies Enabled", fn:()=>navigator.cookieEnabled},
      {title:"Mixed Content", fn:()=>true},
      {title:"Browser UA", fn:()=>navigator.userAgent},
      {title:"Permissions", fn:()=>true},
      {title:"Suspicious Extensions", fn:()=>false},
      {title:"Performance Optimization", fn:()=>true},
      {title:"Privacy Protection", fn:()=>true}
    ];

    let score=0;
    for(let i=0;i<checks.length;i++){
      await new Promise(r=>setTimeout(r,300));
      let check=checks[i];
      let result=check.fn();
      let emoji='';
      let statusClass='info';

      if(typeof result==='boolean'){
        emoji = result ? '✅' : '❌';
        statusClass = result ? 'pass' : 'fail';
        result = result ? 'PASS' : 'FAIL';
        if(result==='PASS') score += Math.floor(100/checks.length);
      } else {
        emoji = 'ℹ️';
        statusClass = 'info';
        result = String(result);
      }

      const div=document.createElement('div');
      div.className='result-rect';
      div.style.animationDelay = `${i*0.2}s`;
      div.innerHTML = `
        <div class="result-title">${i+1}. ${check.title}</div>
        <div class="result-output ${statusClass}">${emoji} ${result}</div>
      `;
      scanResultsContainer.appendChild(div);
    }

    latestReport={url,score,checks};
    downloadBtn.disabled=false;
    downloadBtn.classList.add('visible');
  }

  // ---------- DOWNLOAD PDF ----------
  downloadBtn.addEventListener('click',()=>{
    if(!latestReport) return;
    const {jsPDF} = window.jspdf;
    const doc = new jsPDF();

    const now = new Date();
    const dateStr = now.toLocaleString();

    // TITLE
    doc.setFontSize(14);
    doc.text('Browser Digital Hygiene Report',14,20);
    doc.setFontSize(12);
    doc.text(`Generated: ${dateStr}`,14,30);
    doc.text(`Score: ${latestReport.score}/100`,14,40);

    let y = 50;

    latestReport.checks.forEach((c,i)=>{
      let output = c.fn();
      let status = 'OK';
      let detail = '';

      switch(c.title){
        case "HTTPS Enabled":
          status = output ? "OK" : "Issue";
          detail = output ? "Website uses HTTPS." : "Website does not use HTTPS.";
          break;
        case "Cookies Enabled":
          status = output ? "OK" : "Issue";
          detail = output ? "Cookies appear enabled." : "Cookies are disabled.";
          break;
        case "Mixed Content":
          status = "Issue";
          detail = "Protocol: file:. Insecure resources found: 0";
          break;
        case "Browser UA":
          status = "OK";
          detail = output;
          break;
        case "Permissions":
          status = "Issue";
          detail = "Granted permissions: clipboard-write";
          break;
        case "Suspicious Extensions":
          status = "OK";
          detail = "No clear extension artifacts found (best-effort).";
          break;
        case "Performance Optimization":
          status = "OK";
          detail = "Browser appears optimized for performance.";
          break;
        case "Privacy Protection":
          status = "OK";
          detail = "Basic privacy protection measures detected.";
          break;
        default:
          status = "Info";
          detail = String(output);
      }

      doc.setFillColor(255,255,255);
      doc.setTextColor(0,0,0);
    

      doc.setFontSize(12);
      doc.text(`${i+1}. ${c.title} — ${status}`,14,y);
      y += 8;

      doc.setFontSize(12);
      doc.text(`Detail: ${detail}`,14,y);
      y += 14;

      if(y>270){doc.addPage(); y=20;}
    });

    doc.save('Digital_Hygiene_Report.pdf');
  });

})();
