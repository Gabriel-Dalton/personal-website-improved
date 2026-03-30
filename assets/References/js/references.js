const recommendationItems = [
    { id: "noosh-baratpour", title: "Letter of Recommendation", person: "Noosh Baratpour", role: "Co-founder & CMO, Formaloo", url: "/assets/References/Gabriel_Dalton_Letter_of_Recommendation_Formaloo_CMO.pdf" },
    { id: "adrien-de-malherbe", title: "Letter of Recommendation", person: "Adrien de Malherbe", role: "Co-Founder, Refoorest", url: "/assets/References/Gabriel_Dalton_Letter_of_Recommendation_Adrien_de_Malherbe.pdf" },
    { id: "farooq-khan", title: "Letter of Recommendation", person: "Farooq Khan", role: "President, Denman Place Mall", url: "/assets/References/Gabriel_Dalton_Letter_of_Recommendation_Farooq_Khan.pdf" },
    { id: "jordan-mittler", title: "Letter of Recommendation", person: "Jordan Mittler", role: "Founder & CEO, Mittler Senior Technology", url: "/assets/References/Gabriel_Dalton_Letter_of_Recommendation_Jordan_Mittler.pdf" },
    { id: "jack-wood", title: "Letter of Recommendation", person: "Jack Wood", role: "Financial Assistant, St. Paul's Anglican Church", url: "/assets/References/Gabriel_Dalton_Letter_of_Recommendation_Jack_Wood.pdf" },
    { id: "sara-ciantar", title: "Letter of Recommendation", person: "Sara Ciantar", role: "Office Administrator & Program Director, St. Paul's", url: "/assets/References/Gabriel_Dalton_Letter_of_Recommendation_Sara_Ciantar.pdf" },
    { id: "michael-andersen", title: "Letter of Recommendation", person: "Michael Andersen", role: "Sustainable WWW", url: "/assets/References/Gabriel_Dalton_Letter_of_Recommendation_Michael_Andersen_Sustainable_WWW.pdf" },
  ];

  const recognitionItems = [
    { id: "patty-hajdu", title: "Letter of Recognition", person: "Patty Hajdu", role: "Minister of Jobs and Families", url: "/assets/References/Gabriel_Dalton_Letter_of_Recognition_Patty_Hajdu.pdf" },
    { id: "spencer-chandra-hebert", title: "Letter of Recognition", person: "Spencer Chandra Herbert, MLA", role: "Vancouver West End & Coal Harbour", url: "/assets/References/Gabriel_Dalton_Letter_of_Recognition_Spencer_Chandra_Hebert.pdf" },
    { id: "spes-cert", title: "Certificate of Appreciation", person: "Stanley Park Ecology Society", role: "Tricia Collingham, Executive Director", url: "/assets/References/Gabriel_Dalton_Certificate_of_Appreciation_SPES.pdf" },
  ];

  const projectItems = [
    { id: "denman-place-mall", title: "Denman Place Mall", role: "Digital communications", quote: "Developed clear public notices and streamlined web information flow to improve community engagement." },
    { id: "mittler-senior-tech", title: "Mittler Senior Technology", role: "Website & content", quote: "Enhanced website accessibility and simplified content to better support seniors learning technology." },
    { id: "refoorest-proj", title: "Refoorest", role: "Ambassador & partner pages", quote: "Collaborated with global partners to plant trees and promote sustainable digital practices." },
    { id: "st-pauls", title: "St. Paul's Anglican Church", role: "Website redesign & optimization", quote: "Redesigned and optimized the church website for faster performance, improved accessibility, and ease of use." },
    { id: "spes", title: "Stanley Park Ecology Society", role: "Web support & sustainability", quote: "Provided ongoing web support and implemented sustainable design practices to reduce digital footprint." },
    { id: "king-george-times", title: "The King George Times", role: "Digital strategy", quote: "Launched a new website and executed SEO strategy to grow readership and online presence." },
  ];

  const state = { search: '' };
  const recommendationsGrid = document.getElementById('recommendationsGrid');
  const recognitionGrid = document.getElementById('recognitionGrid');
  const projectsGrid = document.getElementById('projectsGrid');
  const searchInput = document.getElementById('searchInput');

  function normalize(str){ return (str || '').toLowerCase(); }

  function cardTemplate(item){
    const subtitle = [item.person, item.role].filter(Boolean).join(' • '); 
    return `
    <article class="card rounded-2xl border border-slate-200 bg-white p-5 hover:-translate-y-0.5 hover:shadow-lg transition">
      <header class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <h4 class="text-lg font-semibold leading-snug truncate">${item.title}</h4>
          <p class="mt-1 text-sm text-slate-600 truncate">${subtitle}</p>
        </div>
        ${item.url ? `<button data-open="${item.id}" class="shrink-0 rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-medium hover:bg-slate-50">Open</button>` : ''}
      </header>
      ${item.quote ? `<p class="mt-3 text-sm text-slate-700">${item.quote}</p>` : ''}
    </article>`;
  }

  function applyFilters(items){
    const q = normalize(state.search);
    return items.filter(item => {
      if (!q) return true;
      const blob = normalize([item.title, item.person, item.role].join(' '));
      return blob.includes(q);
    });
  }

  function render(){
    const recs = applyFilters(recommendationItems);
    recommendationsGrid.innerHTML = recs.map(cardTemplate).join('');
    const recogs = applyFilters(recognitionItems);
    recognitionGrid.innerHTML = recogs.map(cardTemplate).join('');
    const projs = applyFilters(projectItems);
    projectsGrid.innerHTML = projs.map(cardTemplate).join('');
  }

  searchInput.addEventListener('input', (e)=>{ state.search = e.target.value; render(); });

  function openModal(item){
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalSubtitle').textContent = [item.person, item.role].filter(Boolean).join(' • ');
    const link = document.getElementById('modalDownload');
    link.href = item.url;
    document.getElementById('pdfFrame').src = item.url;
    document.getElementById('modal').classList.remove('hidden');
    document.body.classList.add('modal-open');
  }

  function closeModal(){
    document.getElementById('modal').classList.add('hidden');
    document.getElementById('pdfFrame').src = '';
    document.body.classList.remove('modal-open');
  }

  document.addEventListener('click', (e)=>{
    const openId = e.target.closest('[data-open]')?.getAttribute('data-open');
    if(openId){
      const item = [...recommendationItems, ...recognitionItems].find(i=>i.id===openId);
      if(item) openModal(item);
    }
    
    if(e.target.matches('[data-close]') || e.target.id === 'overlay'){
      closeModal();
    }
  });

  document.addEventListener('keydown', (e)=>{
    const isOpen = !document.getElementById('modal').classList.contains('hidden');
    if(!isOpen) return;
    if(e.key === 'Escape' || e.key === 'Enter'){
      e.preventDefault();
      closeModal();
    }
  });

  render();
  document.getElementById('year').textContent = new Date().getFullYear();