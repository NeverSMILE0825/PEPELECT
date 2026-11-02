(() => {
  const C=window.PEPELECTION_CONFIG||{};
  const A=id=>`assets/${{
  5:'05-chapter-01-election-day.webp',6:'06-chapter-02-the-ballot.webp',7:'07-chapter-03-the-count.webp',8:'08-chapter-04-election-night.webp',9:'09-chapter-05-the-results.webp',
  15:'15-gallery-uncle-pepe.webp',16:'16-gallery-newspaper.webp',17:'17-gallery-election-watcher.webp',18:'18-gallery-asleep.webp',19:'19-gallery-podium.webp',20:'20-gallery-celebration.webp'
  }[id]}`;
  const chapters=[
    {id:5,k:'CHAPTER 01',name:'Election Day',short:'The nation heads to the polls.',desc:'Autumn arrives. The town gathers. Our favorite old frog waits patiently as the 2026 U.S. midterm election begins.'},
    {id:6,k:'CHAPTER 02',name:'Cast the Vote',short:'A small mark. A big moment.',desc:'One ballot at a time, Pepe discovers the strange seriousness—and occasional comedy—of voting day.'},
    {id:7,k:'CHAPTER 03',name:'The Count',short:'Every number matters.',desc:'By lamplight, the stacks grow taller. Pepe faces the never-ending paperwork of election night.'},
    {id:8,k:'CHAPTER 04',name:'Election Night',short:'Coffee, television, suspense.',desc:'A room full of old television sets and an old frog who refuses to switch them off.'},
    {id:9,k:'CHAPTER 05',name:'The Results?',short:'And the answer is…',desc:'As results are reported, Pepe watches and waits. This artwork depicts an imagined scene, not an actual outcome.'}
  ];
  const gallery=[
    {id:15,k:'MEME 01',name:'Uncle Pepe',desc:'The classic recruitment-poster pose—Pepe points straight at the viewer.'},
    {id:16,k:'MEME 02',name:'The Morning Paper',desc:'Pepe reads every headline and drinks far too much coffee.'},
    {id:17,k:'MEME 03',name:'Election Watcher',desc:'From his rooftop lookout, Pepe watches the national drama unfold.'},
    {id:18,k:'MEME 04',name:'The Long Night',desc:'The polls may close, but Pepe’s eyelids also have plans.'},
    {id:19,k:'MEME 05',name:'The Podium',desc:'Somehow, they gave the old frog the microphone.'},
    {id:20,k:'MEME 06',name:'Town Celebration',desc:'A cheerful, fictional election-season street scene—no winner implied.'}
  ];
  document.querySelector('#chapters').innerHTML=chapters.map((x,i)=>`<button type="button" class="chapter-card" data-view="chapter" data-index="${i}" aria-label="View ${x.k}: ${x.name}"><span class="chapter-art-wrap"><img src="${A(x.id)}" alt="" loading="lazy" /></span><span class="chapter-number">${x.k}</span><span class="chapter-name">${x.name}</span><span class="chapter-short">${x.short}</span></button>`).join('');
  document.querySelector('#gallery-grid').innerHTML=gallery.map((x,i)=>`<button type="button" class="gallery-card" style="--rotate:${[-6,4,-3,6,-4,5][i]}deg" data-view="gallery" data-index="${i}" aria-label="View gallery artwork: ${x.name}"><img class="gallery-photo" src="${A(x.id)}" alt="" loading="lazy"/><strong>${x.name}</strong></button>`).join('');
  const nav=document.getElementById('primary-nav'),menu=document.getElementById('menu-toggle');
  menu.addEventListener('click',()=>{let open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
  nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
  for(let [selector,url] of [['.social-x',C.xUrl],['.social-tg',C.telegramUrl]]){
    document.querySelectorAll(selector).forEach(el=>{if(url && /^https:\/\//.test(url)){el.href=url;el.removeAttribute('aria-disabled');el.title='Open official community'}else{el.setAttribute('aria-disabled','true');el.title='Official community link coming soon';el.tabIndex=0;el.addEventListener('click',e=>{e.preventDefault();toast('Official community link coming soon')});el.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();toast('Official community link coming soon')}})}})
  }
  const addr=C.contractAddress||'Coming Soon..';document.getElementById('contract-address').textContent=addr;
  let toastTimer;function toast(msg){let el=document.getElementById('toast');el.textContent=msg;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),3000)}
  document.getElementById('copy-contract').addEventListener('click',async()=>{try{if(navigator.clipboard && window.isSecureContext){await navigator.clipboard.writeText(addr)}else{let ta=document.createElement('textarea');ta.value=addr;ta.style.position='fixed';ta.style.left='-1000px';document.body.appendChild(ta);ta.select();let ok=document.execCommand('copy');ta.remove();if(!ok)throw Error('failed')}toast(`Copied: ${addr}`)}catch{toast(`Contract status: ${addr}`)}});
  const modal=document.getElementById('art-modal');let activeType='chapter',activeIndex=0,oldFocus=null;
  function openModal(type,index){oldFocus=document.activeElement;activeType=type;activeIndex=index;renderModal();modal.classList.add('active');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';modal.querySelector('.modal-close').focus()}
  function renderModal(){let x=(activeType==='chapter'?chapters:gallery)[activeIndex];let im=document.getElementById('modal-image');im.src=A(x.id);im.alt=`${x.name}, vintage oil-painted PEPELECTION artwork`;document.getElementById('modal-eyebrow').textContent=x.k;document.getElementById('modal-title').textContent=x.name;document.getElementById('modal-description').textContent=x.desc}
  function closeModal(){modal.classList.remove('active');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';if(oldFocus)oldFocus.focus()}
  function moveModal(delta){let arr=(activeType==='chapter'?chapters:gallery);activeIndex=(activeIndex+delta+arr.length)%arr.length;renderModal()}
  document.addEventListener('click',e=>{let btn=e.target.closest('[data-view]');if(btn){openModal(btn.dataset.view,Number(btn.dataset.index))}else if(e.target.closest('[data-close]')){closeModal()}});
  document.getElementById('modal-prev').addEventListener('click',()=>moveModal(-1));document.getElementById('modal-next').addEventListener('click',()=>moveModal(1));
  document.addEventListener('keydown',e=>{if(!modal.classList.contains('active'))return;if(e.key==='Escape')closeModal();if(e.key==='ArrowRight')moveModal(1);if(e.key==='ArrowLeft')moveModal(-1)});
  const deadline=Date.parse(C.firstPollCloseTime||'2026-11-03T18:00:00-05:00');
  const countdown=document.getElementById('countdown');const status=document.getElementById('election-status');
  function updateClock(){const diff=deadline-Date.now();if(diff<=0){countdown.textContent='FOLLOW VERIFIED REPORTING';status.textContent='ELECTION NIGHT — AWAITING VERIFIED REPORTS';return}const days=Math.floor(diff/86400000),hrs=Math.floor(diff%86400000/3600000),mins=Math.floor(diff%3600000/60000),sec=Math.floor(diff%60000/1000);countdown.textContent=`${days?days+'D · ':''}${String(hrs).padStart(2,'0')}H : ${String(mins).padStart(2,'0')}M : ${String(sec).padStart(2,'0')}S`}
  updateClock();setInterval(updateClock,1000);document.getElementById('year').textContent=new Date().getFullYear();
})();
