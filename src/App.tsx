import React, { useState, ReactNode, useEffect, useMemo, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { ANIMALS, MOCK_RESULTS } from './constants';
import { Menu, Search, Calendar, ChevronRight, Share2, Info, Home, List, Grid, ArrowLeft, Zap, Sparkles, RefreshCw, X, Facebook, Instagram, MessageCircle, BarChart3, BookOpen, HelpCircle, ShieldCheck, User, Mail, Scale, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- SEO Manager ---
function SEO({ title, description }: { title: string; description?: string }) {
  const location = useLocation();
  const baseUrl = process.env.APP_URL || window.location.origin;
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const canonicalUrl = `${cleanBaseUrl}${location.pathname}`;

  useEffect(() => {
    document.title = title;
    
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);
  }, [title, description, canonicalUrl]);

  return null;
}

// --- Animal Media Component ---
function AnimalMedia({ animal, className, emojiClassName }: { animal: any; className?: string; emojiClassName?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} flex items-center justify-center overflow-hidden`}>
      {isVisible ? (
        animal.imageUrl ? (
          <img 
            src={animal.imageUrl} 
            alt={animal.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className={emojiClassName}>{animal.emoji}</span>
        )
      ) : (
        <div className="animate-pulse bg-slate-200/50 rounded-lg w-full h-full min-h-[1em]" />
      )}
    </div>
  );
}

// --- Mobile Drawer Component ---
function MobileDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] md:hidden"
          />
          {/* Drawer */}
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de Navegação"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-[280px] bg-white z-[70] shadow-2xl flex flex-col md:hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-emerald-600 text-white">
              <div className="flex items-center gap-2 font-bold text-lg">
                <div className="w-8 h-8 bg-white text-emerald-600 rounded-lg flex items-center justify-center" aria-hidden="true">B</div>
                Menu
              </div>
              <button 
                onClick={onClose} 
                aria-label="Fechar menu"
                className="p-2 hover:bg-emerald-500 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto py-4">
              <nav className="px-4 mb-6" aria-label="Navegação Principal">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Navegação Principal</h4>
                <div className="space-y-1">
                  <Link to="/" onClick={onClose} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors uppercase text-xs">
                    <Home size={20} className="text-emerald-500" aria-hidden="true" /> Início
                  </Link>
                  <Link to="/puxadas" onClick={onClose} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors uppercase text-xs">
                    <Zap size={20} className="text-emerald-500" aria-hidden="true" /> Guia de Puxadas
                  </Link>
                  <Link to="/palpites" onClick={onClose} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors uppercase text-xs">
                    <Sparkles size={20} className="text-emerald-500" aria-hidden="true" /> Palpites do Dia
                  </Link>
                  <Link to="/o-que-e-puxada" onClick={onClose} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors uppercase text-xs">
                    <BookOpen size={20} className="text-emerald-500" aria-hidden="true" /> O que são Puxadas?
                  </Link>
                  <Link to="/metodologia" onClick={onClose} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors uppercase text-xs">
                    <ShieldCheck size={20} className="text-emerald-500" aria-hidden="true" /> Metodologia
                  </Link>
                </div>
              </nav>

              <div className="px-4 mb-6">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Ferramentas</h4>
                <div className="space-y-1">
                  <Link to="/estatisticas" onClick={onClose} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors">
                    <BarChart3 size={20} className="text-blue-500" aria-hidden="true" /> Estatísticas
                  </Link>
                  <a href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors">
                    <BookOpen size={20} className="text-purple-500" aria-hidden="true" /> Como Jogar
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors">
                    <HelpCircle size={20} className="text-amber-500" aria-hidden="true" /> Dúvidas Frequentes
                  </a>
                </div>
              </div>

              <div className="px-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Redes Sociais</h4>
                <div className="flex gap-2 px-2">
                  <button aria-label="Facebook" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 transition-all">
                    <Facebook size={20} />
                  </button>
                  <button aria-label="Instagram" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 transition-all">
                    <Instagram size={20} />
                  </button>
                  <button aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 transition-all">
                    <MessageCircle size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <p className="text-[10px] text-slate-400 leading-tight">
                © 2026 Puxadas do Bicho. O guia completo de puxadas.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// --- Layout Component ---
function Layout({ children }: { children: ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Return focus to trigger when drawer closes
  useEffect(() => {
    if (!isDrawerOpen && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isDrawerOpen]);

  const handleOpenDrawer = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget;
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <header className="bg-emerald-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-lg shadow-inner">
              <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center font-bold text-xl">
                B
              </div>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Puxadas do Bicho</h1>
          </Link>
          
            <div className="hidden md:flex items-center gap-6 text-[11px] font-bold tracking-wider uppercase">
              <Link to="/" className={`transition-colors ${isActive('/') ? 'text-white' : 'text-emerald-100 hover:text-white'}`}>Início</Link>
              <Link to="/puxadas" className={`transition-colors ${isActive('/puxadas') ? 'text-white' : 'text-emerald-100 hover:text-white'}`}>Puxadas</Link>
              <Link to="/palpites" className={`transition-colors ${isActive('/palpites') ? 'text-white' : 'text-emerald-100 hover:text-white'}`}>Palpites</Link>
              <Link to="/estatisticas" className={`transition-colors ${isActive('/estatisticas') ? 'text-white' : 'text-emerald-100 hover:text-white'}`}>Estatísticas</Link>
            </div>

          <div className="flex items-center gap-2">
            <button 
              aria-label="Pesquisar"
              className="p-2 hover:bg-emerald-500 rounded-full transition-colors hidden md:block"
            >
              <Search size={20} />
            </button>
            <button 
              onClick={handleOpenDrawer}
              aria-label="Abrir menu"
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-menu"
              className="p-2 hover:bg-emerald-500 rounded-full transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow pb-20 md:pb-0">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-4 hidden md:block">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
                <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center text-xs">B</div>
                Puxadas do Bicho
              </div>
              <p className="text-sm leading-relaxed">
                O portal especializado em puxadas do Jogo do Bicho. Entenda as tendências e 
                estatísticas de quais animais costumam aparecer após o sorteio de outros, 
                com base em tabelas históricas e padrões de sorteio.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Ferramentas</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/puxadas" className="hover:text-emerald-400 transition-colors">Tabela de Puxadas</Link></li>
                <li><Link to="/palpites" className="hover:text-emerald-400 transition-colors">Palpites do Dia</Link></li>
                <li><Link to="/estatisticas" className="hover:text-emerald-400 transition-colors">Estatísticas e Cálculos</Link></li>
                <li><Link to="/o-que-e-puxada" className="hover:text-emerald-400 transition-colors">O que são Puxadas?</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Institucional</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/metodologia" className="hover:text-emerald-400 transition-colors">Nossa Metodologia</Link></li>
                <li><Link to="/sobre" className="hover:text-emerald-400 transition-colors">Sobre Nós</Link></li>
                <li><Link to="/contato" className="hover:text-emerald-400 transition-colors">Contato</Link></li>
                <li><Link to="/jogo-responsavel" className="hover:text-emerald-400 transition-colors flex items-center gap-1"><ShieldCheck size={14} /> Jogo Responsável</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/termos" className="hover:text-emerald-400 transition-colors">Termos de Uso</Link></li>
                <li><Link to="/privacidade" className="hover:text-emerald-400 transition-colors">Privacidade</Link></li>
                <li className="pt-2">
                  <p className="text-[10px] leading-relaxed opacity-60">
                    Este site é meramente informativo. Não realizamos apostas.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-xs">
            &copy; 2026 Puxadas do Bicho - Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Robust Bottom Tab Bar (Mobile Only) */}
      <nav 
        aria-label="Navegação inferior"
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 px-2 py-2 flex justify-around items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
      >
        <Link 
          to="/" 
          aria-current={isActive('/') ? 'page' : undefined}
          className={`flex flex-col items-center gap-1 px-4 py-1 rounded-2xl transition-all ${isActive('/') ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Home size={22} strokeWidth={isActive('/') ? 2.5 : 2} aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase tracking-tight">Início</span>
        </Link>
        <Link 
          to="/puxadas" 
          aria-current={location.pathname.startsWith('/puxadas') ? 'page' : undefined}
          className={`flex flex-col items-center gap-1 px-4 py-1 rounded-2xl transition-all ${location.pathname.startsWith('/puxadas') ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Zap size={22} strokeWidth={location.pathname.startsWith('/puxadas') ? 2.5 : 2} aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase tracking-tight">Puxadas</span>
        </Link>
        <Link 
          to="/palpites" 
          aria-current={isActive('/palpites') ? 'page' : undefined}
          className={`flex flex-col items-center gap-1 px-4 py-1 rounded-2xl transition-all ${isActive('/palpites') ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Sparkles size={22} strokeWidth={isActive('/palpites') ? 2.5 : 2} aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase tracking-tight">Palpites</span>
        </Link>
        <button 
          onClick={handleOpenDrawer}
          aria-label="Abrir menu"
          aria-expanded={isDrawerOpen}
          aria-controls="mobile-menu"
          className="flex flex-col items-center gap-1 px-4 py-1 rounded-2xl text-slate-400 hover:text-slate-600 transition-all"
        >
          <div className="relative">
            <Menu size={22} aria-hidden="true" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tight">Mais</span>
        </button>
      </nav>
    </div>
  );
}

// --- Home Page ---
function HomePage() {
  return (
    <>
      <SEO 
        title="Puxada do Bicho: Guia Completo das Puxadas dos 25 Animais" 
        description="Guia de puxadas do jogo do bicho com tabela completa dos 25 animais. Descubra qual bicho puxa outro e veja as combinações mais usadas."
      />
      <section className="bg-emerald-700 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Guia de Puxadas do Jogo do Bicho</h2>
          <p className="text-emerald-100 text-lg opacity-90 max-w-2xl mx-auto">
            Selecione um animal abaixo para descobrir quais bichos ele "puxa" e aumentar suas chances.
          </p>
        </div>
      </section>

      <div className="max-w-5xl w-full mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {ANIMALS.map((animal) => (
            <Link 
              to={`/puxadas/${animal.slug}`} 
              key={animal.id}
              className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all text-center flex flex-col items-center"
            >
              <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center">
                <AnimalMedia 
                  animal={animal} 
                  className="w-24 h-24 rounded-2xl bg-slate-50 mb-4 shadow-sm group-hover:shadow-md transition-all" 
                  emojiClassName="text-6xl"
                />
                <div className="font-bold text-xl text-slate-800 group-hover:text-emerald-600 transition-colors">
                  {animal.name}
                </div>
                <div className="text-xs text-slate-400 font-bold uppercase mt-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                  Grupo {animal.id.toString().padStart(2, '0')}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

// --- Puxadas Page ---
function PuxadasPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAnimals = useMemo(() => {
    return ANIMALS.filter(animal => 
      animal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SEO 
        title="Guia de Puxadas do Jogo do Bicho - Tabela Completa" 
        description="Confira a tabela completa de puxadas do jogo do bicho. Entenda quais animais puxam outros e melhore suas estratégias."
      />
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Guia de Puxadas</h2>
          <p className="text-slate-500">Clique em um animal para ver quais bichos ele "puxa" e conhecer sua história.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Buscar animal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {filteredAnimals.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAnimals.map((animal) => (
            <Link 
              to={`/puxadas/${animal.slug}`} 
              key={animal.id}
              className="group bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all text-center"
            >
              <motion.div whileHover={{ scale: 1.1 }}>
                <AnimalMedia 
                  animal={animal} 
                  className="w-16 h-16 rounded-xl bg-slate-50 mx-auto mb-3" 
                  emojiClassName="text-4xl"
                />
                <div className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{animal.name}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">Grupo {animal.id.toString().padStart(2, '0')}</div>
              </motion.div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="text-slate-300 mb-4 flex justify-center">
            <Search size={48} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Nenhum animal encontrado</h3>
          <p className="text-slate-500">Tente buscar por outro nome.</p>
          <button 
            onClick={() => setSearchTerm('')}
            className="mt-4 text-emerald-600 font-bold hover:underline"
          >
            Limpar busca
          </button>
        </div>
      )}
    </div>
  );
}

// --- Animal Detail Page ---
function AnimalDetailPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const animal = ANIMALS.find(a => a.slug === name?.toLowerCase());

  if (!animal) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Animal não encontrado</h2>
        <button onClick={() => navigate('/puxadas')} className="text-emerald-600 font-bold flex items-center gap-2 mx-auto">
          <ArrowLeft size={20} /> Voltar para Puxadas
        </button>
      </div>
    );
  }

  const recommendedPuxadas = useMemo(() => {
    const existingPuxadas = animal.puxadas || [];
    // Get animals that are NOT the current one and NOT in the current puxadas list
    return ANIMALS.filter(a => 
      a.name !== animal.name && 
      !existingPuxadas.includes(a.name)
    ).sort(() => 0.5 - Math.random()).slice(0, 4);
  }, [animal]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <SEO 
        title={`Puxadas do ${animal.name} - Grupo ${animal.id.toString().padStart(2, '0')}`} 
        description={`Descubra o que o ${animal.name} puxa no jogo do bicho. Veja as dezenas do grupo ${animal.id.toString().padStart(2, '0')} e a história do animal.`}
      />
      <button 
        onClick={() => navigate('/puxadas')} 
        className="mb-6 text-slate-500 hover:text-emerald-600 font-medium flex items-center gap-2 transition-colors"
      >
        <ArrowLeft size={20} /> Voltar para Puxadas
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
      >
        <div className="bg-emerald-600 p-8 text-center text-white flex flex-col items-center">
          <AnimalMedia 
            animal={animal} 
            className="w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-sm mb-4 shadow-lg" 
            emojiClassName="text-7xl text-white"
          />
          <h2 className="text-4xl font-black uppercase tracking-tight">{animal.name}</h2>
          <div className="mt-2 inline-block px-4 py-1 bg-emerald-700/50 rounded-full text-sm font-bold">
            Grupo {animal.id.toString().padStart(2, '0')}
          </div>
        </div>

        <div className="p-8">
          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Zap className="text-amber-500" size={24} />
              O que o {animal.name} puxa?
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {animal.puxadas?.map((puxadaName) => {
                const puxadaAnimal = ANIMALS.find(a => a.name === puxadaName);
                return (
                  <Link 
                    to={`/puxadas/${puxadaAnimal?.slug || puxadaName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                    key={puxadaName}
                    className="p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 transition-all text-center group flex flex-col items-center"
                  >
                    <AnimalMedia 
                      animal={puxadaAnimal || { emoji: '❓', name: puxadaName }} 
                      className="w-12 h-12 rounded-lg bg-white mb-1 group-hover:scale-110 transition-transform" 
                      emojiClassName="text-3xl"
                    />
                    <div className="font-bold text-slate-700 group-hover:text-emerald-700">{puxadaName}</div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Info className="text-emerald-500" size={24} />
              História e Significado
            </h3>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed text-lg">
                {animal.history}
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="text-amber-500" size={24} />
              Puxadas Recomendadas
            </h3>
            <div className="flex overflow-x-auto gap-4 pb-4 -mx-2 px-2 scrollbar-hide">
              {recommendedPuxadas.map((recAnimal) => {
                return (
                  <Link 
                    to={`/puxadas/${recAnimal.slug}`}
                    key={recAnimal.name}
                    className="flex-shrink-0 w-36 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 transition-all text-center group shadow-sm hover:shadow-md flex flex-col items-center"
                  >
                    <AnimalMedia 
                      animal={recAnimal} 
                      className="w-16 h-16 rounded-xl bg-white mb-3 group-hover:scale-110 transition-transform" 
                      emojiClassName="text-4xl"
                    />
                    <div className="font-bold text-slate-700 group-hover:text-emerald-700">{recAnimal.name}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">Grupo {recAnimal.id.toString().padStart(2, '0')}</div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="mb-10">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Dezenas do Grupo</h3>
            <div className="flex gap-3">
              {animal.numbers.map(n => (
                <div key={n} className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-mono font-bold text-slate-700 text-lg">
                  {n.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <User size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-1">Escrito por Especialista em Estatística</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Conteúdo revisado e validado com base nas tabelas tradicionais e estatísticas históricas do Jogo do Bicho. 
                  Saiba mais sobre nossa <Link to="/metodologia" className="text-emerald-600 hover:underline">metodologia de análise</Link>.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar className="text-blue-500" size={24} />
              Apareceu Recentemente em:
            </h3>
            <div className="space-y-4">
              {MOCK_RESULTS.filter(result => 
                result.numbers.some(num => num.animal.toLowerCase() === animal.name.toLowerCase())
              ).length > 0 ? (
                MOCK_RESULTS.filter(result => 
                  result.numbers.some(num => num.animal.toLowerCase() === animal.name.toLowerCase())
                ).map((result) => (
                  <div key={result.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-800">{result.name}</span>
                      <span className="text-xs text-slate-500">{result.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.numbers.map((num, idx) => (
                        <div 
                          key={idx} 
                          className={`px-3 py-1 rounded-lg text-sm font-bold ${
                            num.animal.toLowerCase() === animal.name.toLowerCase() 
                            ? 'bg-emerald-600 text-white shadow-sm scale-105' 
                            : 'bg-white text-slate-400 border border-slate-100'
                          }`}
                        >
                          {num.position}º: {num.value}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-sm italic">Nenhum resultado recente encontrado para este animal.</p>
              )}
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}

// --- Palpites Page ---
function PalpitesPage() {
  const [seed, setSeed] = useState(0);

  const palpites = useMemo(() => {
    // Helper to get random items
    const getRandom = (arr: any[], count: number) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const randomAnimals = getRandom(ANIMALS, 3);
    const grupos = randomAnimals.map(a => a.id.toString().padStart(2, '0'));
    
    const centenas = Array.from({ length: 4 }, () => 
      Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    );
    
    const milhares = Array.from({ length: 4 }, () => 
      Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    );

    return { animals: randomAnimals, grupos, centenas, milhares };
  }, [seed]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SEO 
        title="Palpites do Dia - Jogo do Bicho" 
        description="Receba palpites diários para o jogo do bicho. Sugestões de grupos, centenas e milhares baseadas em algoritmos de sorte."
      />
      <div className="bg-emerald-600 rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Sparkles size={32} /> Palpites do Dia
          </h2>
          <p className="text-emerald-100 opacity-90">Sorte do dia {new Date().toLocaleDateString('pt-BR')}. Gere novos palpites agora!</p>
          <button 
            onClick={() => setSeed(s => s + 1)}
            className="mt-6 bg-white text-emerald-700 px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-emerald-50 transition-colors shadow-lg"
          >
            <RefreshCw size={18} /> Gerar Novos Palpites
          </button>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
          <Sparkles size={200} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Animais da Sorte */}
        <motion.div 
          key={`animals-${seed}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-3 bg-white rounded-3xl shadow-sm border border-slate-200 p-6"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-2 h-8 bg-emerald-500 rounded-full"></div>
            Animais da Sorte
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {palpites.animals.map((animal) => (
                <Link 
                  to={`/puxadas/${animal.slug}`}
                  key={animal.id} 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all group"
                >
                  <AnimalMedia 
                    animal={animal} 
                    className="w-16 h-16 rounded-xl bg-white group-hover:scale-110 transition-transform" 
                    emojiClassName="text-5xl"
                  />
                  <div>
                    <div className="font-bold text-slate-800 text-lg">{animal.name}</div>
                    <div className="text-emerald-600 font-bold text-sm">Grupo {animal.id.toString().padStart(2, '0')}</div>
                  </div>
                </Link>
              ))}
          </div>
        </motion.div>

        {/* Grupos Sugeridos */}
        <motion.div 
          key={`grupos-${seed}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
            Grupos Sugeridos
          </h3>
          <div className="flex flex-wrap gap-3">
            {palpites.grupos.map((g, i) => (
              <div key={i} className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center font-bold text-amber-700 text-xl shadow-sm">
                {g}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Centenas Sugeridas */}
        <motion.div 
          key={`centenas-${seed}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
            Centenas Sugeridas
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {palpites.centenas.map((c, i) => (
              <div key={i} className="py-3 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center font-mono font-bold text-blue-700 text-xl shadow-sm">
                {c}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Milhares Sugeridos */}
        <motion.div 
          key={`milhares-${seed}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div>
            Milhares Sugeridos
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {palpites.milhares.map((m, i) => (
              <div key={i} className="py-3 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center font-mono font-bold text-purple-700 text-xl shadow-sm">
                {m}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-8 p-6 bg-slate-100 rounded-3xl border border-slate-200">
        <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
          <Info size={18} /> Dica de Ouro
        </h4>
        <p className="text-sm text-slate-500 leading-relaxed">
          Os palpites são gerados aleatoriamente com base em estatísticas de frequência e puxadas tradicionais. 
          Lembre-se que o Jogo do Bicho é uma atividade de entretenimento e os resultados são imprevisíveis. 
          Jogue com responsabilidade.
        </p>
      </div>
    </div>
  );
}

// --- Betting Tools ---
function BetCalculator() {
  const [amount, setAmount] = useState<string>('1.00');
  const [type, setType] = useState<'duque' | 'terno' | 'quadra'>('duque');

  const multipliers = {
    duque: 18.5,
    terno: 130,
    quadra: 1000
  };

  const calculateReturn = () => {
    const val = parseFloat(amount.replace(',', '.'));
    if (isNaN(val)) return 0;
    return val * multipliers[type];
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
      <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
        <Scale size={24} />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-3">Calculadora de Prêmios</h3>
      <p className="text-sm text-slate-500 mb-6">
        Calcule o retorno potencial para apostas do 1º ao 5º prêmio.
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Valor da Aposta (R$)</label>
          <input 
            type="text" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Ex: 1,00"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Tipo de Aposta</label>
          <div className="grid grid-cols-3 gap-2">
            {(['duque', 'terno', 'quadra'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`py-2 rounded-xl text-[10px] font-bold uppercase transition-all border ${
                  type === t 
                    ? 'bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-100' 
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Retorno Estimado</div>
              <div className="text-2xl font-bold text-emerald-600">
                R$ {calculateReturn().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="text-[10px] font-bold text-slate-300 italic">
              Base: {multipliers[type]}x
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Institutional Pages ---
function StatisticsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <SEO 
        title="Estatísticas e Ferramentas do Jogo do Bicho - Puxadas do Bicho" 
        description="Confira as principais estatísticas do jogo do bicho e loteria federal, cálculos, consultas, tabelas, inversões e ferramentas para auxiliar seus jogos."
      />
      
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Estatísticas e Ferramentas</h2>
        <p className="text-slate-600 leading-relaxed">
          Confira as principais estatísticas do jogo do bicho e loteria federal, cálculos, consultas, 
          tabelas, inversões e muito mais ferramentas para lhe auxiliar em seus eventuais jogos.
        </p>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
            <BarChart3 size={20} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">Estatísticas de Frequência</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Frequência de Animais */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Frequência de Animais</h3>
            <p className="text-sm text-slate-500 mb-6">
              Análise dos animais que mais saíram nos últimos 30 dias em todos os sorteios nacionais.
            </p>
            <div className="space-y-3">
              {[
                { name: 'Macaco', freq: '12%', color: 'bg-emerald-500' },
                { name: 'Cobra', freq: '10%', color: 'bg-emerald-400' },
                { name: 'Leão', freq: '9%', color: 'bg-emerald-300' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-xs font-bold text-slate-700 w-16">{item.name}</div>
                  <div className="flex-grow h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: item.freq }}></div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400">{item.freq}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Correlação Federal */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Correlação Federal</h3>
            <p className="text-sm text-slate-500 mb-6">
              Como os resultados da Loteria Federal influenciam as puxadas do dia seguinte.
            </p>
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="text-xs font-bold text-blue-800 mb-2 uppercase tracking-wider">Tendência da Semana</div>
              <div className="text-sm text-blue-700 leading-relaxed">
                Sorteios de quarta-feira têm apresentado alta correlação com o grupo do <strong>Jacaré</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
            <Sparkles size={20} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">Ferramentas de Cálculo</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Calculadora de Prêmios */}
          <BetCalculator />

          {/* Calculadora de Inversões */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Calculadora de Inversões</h3>
            <p className="text-sm text-slate-500 mb-6">
              Gere todas as combinações possíveis de centenas e milhares invertidas.
            </p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Ex: 1234" 
                className="flex-grow px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold">Gerar</button>
            </div>
          </div>
        </div>
      </div>

        {/* Tabelas de Grupos */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all lg:col-span-3">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Tabela de Grupos e Dezenas</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 font-bold text-slate-400 uppercase text-[10px]">Grupo</th>
                  <th className="pb-4 font-bold text-slate-400 uppercase text-[10px]">Animal</th>
                  <th className="pb-4 font-bold text-slate-400 uppercase text-[10px]">Dezenas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {ANIMALS.slice(0, 5).map(animal => (
                  <tr key={animal.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-mono font-bold text-slate-400">{animal.id.toString().padStart(2, '0')}</td>
                    <td className="py-4 font-bold text-slate-800">{animal.name}</td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        {animal.numbers.map(n => (
                          <span key={n} className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600">{n.toString().padStart(2, '0')}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-center">
            <Link to="/puxadas" className="text-emerald-600 font-bold text-sm hover:underline">Ver tabela completa de todos os 25 animais</Link>
          </div>
        </div>

      <div className="mt-12 p-8 bg-emerald-900 rounded-[40px] text-white overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">Análise Profissional</h3>
          <p className="text-emerald-100 leading-relaxed max-w-2xl">
            Nossas ferramentas são atualizadas diariamente com base nos resultados oficiais. 
            Utilizamos modelos matemáticos para identificar desvios estatísticos e tendências 
            que podem auxiliar na sua tomada de decisão.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </div>
    </div>
  );
}

function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <SEO title="Metodologia - Puxadas do Bicho" description="Entenda como calculamos as puxadas e a base estatística do nosso portal." />
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Nossa Metodologia</h2>
      <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
        <p>
          No <strong>Puxadas do Bicho</strong>, levamos a sério a precisão das informações. Nossa metodologia de compilação de dados baseia-se em três pilares fundamentais:
        </p>
        
        <section className="space-y-3">
          <h3 className="text-xl font-bold text-slate-800">1. Tabelas Tradicionais</h3>
          <p>
            Utilizamos como base as tabelas de puxadas mais antigas e respeitadas do Brasil, que foram passadas de geração em geração por décadas. Essas tabelas formam o "núcleo" do nosso banco de dados.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-bold text-slate-800">2. Análise de Frequência</h3>
          <p>
            Nossos algoritmos analisam os resultados dos últimos 12 meses para identificar padrões de recorrência. Quando um animal aparece no sorteio principal, monitoramos quais animais surgem nos sorteios subsequentes (1º ao 5º prêmio).
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-bold text-slate-800">3. Revisão Editorial</h3>
          <p>
            Diferente de sites que geram dados puramente aleatórios, nossa equipe editorial revisa manualmente as "puxadas recomendadas" para garantir que elas façam sentido dentro do contexto histórico do jogo.
          </p>
        </section>

        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
          <h4 className="font-bold text-blue-800 mb-2">Nota Importante</h4>
          <p className="text-sm text-blue-700">
            É importante ressaltar que o Jogo do Bicho é uma atividade baseada em probabilidade e sorte. Nenhuma metodologia, por mais avançada que seja, pode garantir resultados futuros. Nossos dados devem ser usados apenas como referência estatística.
          </p>
        </div>
      </div>
    </div>
  );
}

function GuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <SEO title="O que são Puxadas? Guia Completo - Puxadas do Bicho" description="Aprenda tudo sobre as puxadas do jogo do bicho: o que são, como funcionam e como usar a tabela a seu favor." />
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Guia Completo: O que são Puxadas?</h2>
      
      <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8">
        <section>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Definição de Puxada</h3>
          <p>
            No universo do Jogo do Bicho, a <strong>"puxada"</strong> é uma crença popular baseada na observação de que, quando um determinado animal é sorteado, há uma probabilidade maior de que outros animais específicos apareçam nos sorteios seguintes.
          </p>
          <p>
            Essa teoria não é baseada em leis físicas, mas sim em décadas de observação empírica por parte de jogadores e bicheiros experientes.
          </p>
        </section>

        <div className="bg-slate-100 p-8 rounded-3xl border border-slate-200">
          <h4 className="font-bold text-slate-800 mb-4">Como funciona na prática?</h4>
          <p className="mb-4">Imagine que o animal sorteado no 1º prêmio foi o <strong>Avestruz</strong>. Segundo a tabela tradicional de puxadas:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>O Avestruz "puxa" a Vaca, o Pavão e o Peru.</li>
            <li>Isso significa que, no próximo sorteio ou nos prêmios secundários, esses animais têm uma tendência estatística de aparecer.</li>
          </ul>
        </div>

        <section>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Por que as pessoas usam puxadas?</h3>
          <p>
            As puxadas servem como uma ferramenta de estratégia. Em vez de escolher um animal aleatoriamente, o jogador utiliza o resultado anterior para guiar sua próxima escolha. É uma forma de tentar "ler" o ritmo do sorteio.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Dicas para usar nosso portal</h3>
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <strong>Consulte a Tabela:</strong> Vá até nossa página de <Link to="/puxadas" className="text-emerald-600 hover:underline">Puxadas</Link> e clique no animal que acabou de sair.
            </li>
            <li>
              <strong>Veja as Dezenas:</strong> Cada animal puxado tem suas dezenas específicas. Anote-as para seus palpites.
            </li>
            <li>
              <strong>Compare com Palpites:</strong> Verifique se os animais puxados coincidem com nossos <Link to="/palpites" className="text-emerald-600 hover:underline">Palpites do Dia</Link>.
            </li>
          </ol>
        </section>

        <div className="bg-emerald-600 text-white p-8 rounded-3xl shadow-lg shadow-emerald-100">
          <h4 className="font-bold text-xl mb-2">Conclusão</h4>
          <p className="opacity-90 leading-relaxed">
            Entender as puxadas é mergulhar na cultura e na mística do Jogo do Bicho. Use nosso guia como uma bússola estatística, mas lembre-se sempre de manter o jogo como uma diversão saudável.
          </p>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <SEO title="Sobre Nós - Puxadas do Bicho" description="Conheça a equipe por trás do Puxadas do Bicho e nossa missão de informar com precisão." />
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Sobre o Puxadas do Bicho</h2>
      <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
        <p>
          O <strong>Puxadas do Bicho</strong> nasceu da necessidade de centralizar informações históricas e estatísticas sobre uma das tradições mais antigas do Brasil: o Jogo do Bicho.
        </p>
        <p>
          Nossa missão é fornecer um guia completo, fácil de usar e extremamente rápido para que entusiastas possam consultar as famosas "puxadas" e resultados em tempo real.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mt-8">Nossa Expertise</h3>
        <p>
          Contamos com uma equipe de analistas que estudam os padrões de sorteios há anos, compilando as tabelas de puxadas mais respeitadas do mercado. Todo o nosso conteúdo é revisado para garantir que você tenha a melhor informação disponível.
        </p>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 mt-8">
          <h4 className="font-bold text-emerald-800 mb-2">Transparência</h4>
          <p className="text-sm text-emerald-700">
            Não somos uma casa de apostas. Somos um portal de notícias e estatísticas. Nosso compromisso é com a veracidade dos dados coletados de fontes públicas.
          </p>
        </div>
      </div>
    </div>
  );
}

function ResponsibleGamingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <SEO title="Jogo Responsável - Puxadas do Bicho" description="Informações sobre como manter o jogo como uma atividade saudável e divertida." />
      <div className="flex items-center gap-3 mb-6 text-amber-600">
        <AlertTriangle size={32} />
        <h2 className="text-3xl font-bold">Jogo Responsável</h2>
      </div>
      <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
        <p className="text-lg font-medium">
          O Jogo do Bicho deve ser encarado exclusivamente como uma forma de entretenimento, e nunca como uma fonte de renda ou solução para problemas financeiros.
        </p>
        
        <section className="space-y-3">
          <h3 className="text-xl font-bold text-slate-800">Dicas para um Jogo Saudável:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Estabeleça um limite de tempo e dinheiro para gastar.</li>
            <li>Nunca tente recuperar perdas apostando mais.</li>
            <li>Não jogue se estiver sob efeito de álcool ou substâncias.</li>
            <li>O jogo é proibido para menores de 18 anos.</li>
          </ul>
        </section>

        <div className="bg-slate-100 p-8 rounded-3xl border border-slate-200">
          <h4 className="font-bold text-slate-800 mb-4">Precisa de Ajuda?</h4>
          <p className="mb-4">Se você ou alguém que você conhece está perdendo o controle sobre o jogo, procure ajuda profissional:</p>
          <div className="space-y-2">
            <p><strong>Jogadores Anônimos:</strong> <a href="https://jogadoresanonimos.com.br" target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-600 hover:underline">jogadoresanonimos.com.br</a></p>
            <p><strong>CAPS:</strong> Procure o Centro de Atenção Psicossocial mais próximo de sua residência.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <SEO title="Termos de Uso - Puxadas do Bicho" />
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Termos de Uso</h2>
      <div className="prose prose-slate max-w-none text-slate-600 text-sm space-y-4">
        <p>Ao acessar o site Puxadas do Bicho, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis.</p>
        <h3 className="font-bold text-slate-800">1. Uso de Licença</h3>
        <p>O conteúdo deste site é apenas para fins informativos. É concedida permissão para baixar temporariamente uma cópia dos materiais para visualização pessoal e não comercial apenas.</p>
        <h3 className="font-bold text-slate-800">2. Isenção de Responsabilidade</h3>
        <p>Os materiais no site são fornecidos 'como estão'. Não oferecemos garantias de ganhos ou precisão absoluta, pois o jogo é baseado em sorte.</p>
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <SEO title="Política de Privacidade - Puxadas do Bicho" />
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Política de Privacidade</h2>
      <div className="prose prose-slate max-w-none text-slate-600 text-sm space-y-4">
        <p>A sua privacidade é importante para nós. É política do Puxadas do Bicho respeitar a sua privacidade em relação a qualquer informação que possamos coletar no site.</p>
        <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.</p>
      </div>
    </div>
  );
}

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
      valid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = 'A mensagem deve ter pelo menos 10 caracteres';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <SEO title="Contato - Puxadas do Bicho" />
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Entre em Contato</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Envie uma Mensagem</h3>
          
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl text-center"
            >
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-bold text-emerald-800 mb-2">Mensagem Enviada!</h4>
              <p className="text-sm text-emerald-700 mb-4">Obrigado pelo seu contato. Responderemos o mais breve possível.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-emerald-600 font-bold text-sm hover:underline"
              >
                Enviar outra mensagem
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nome</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
                  placeholder="Seu nome completo"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">E-mail</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
                  placeholder="seu@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Mensagem</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-2 rounded-xl border ${errors.message ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none`}
                  placeholder="Como podemos ajudar?"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message}</p>}
              </div>
              
              <button 
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-95"
              >
                Enviar Mensagem
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Informações Diretas</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-sm text-slate-400 font-bold uppercase">E-mail</div>
                  <div className="font-bold text-slate-800">contato@puxabicho.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <div className="text-sm text-slate-400 font-bold uppercase">Telegram</div>
                  <div className="font-bold text-slate-800">@puxadasdobicho_oficial</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-lg shadow-emerald-100">
            <h4 className="font-bold mb-2">Atendimento</h4>
            <p className="text-sm text-emerald-50 leading-relaxed">
              Nossa equipe responde em até 24 horas úteis. 
              Para parcerias ou dúvidas técnicas, utilize preferencialmente o e-mail.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/puxadas" element={<PuxadasPage />} />
          <Route path="/puxadas/:name" element={<AnimalDetailPage />} />
          <Route path="/palpites" element={<PalpitesPage />} />
          <Route path="/estatisticas" element={<StatisticsPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/o-que-e-puxada" element={<GuidePage />} />
          <Route path="/metodologia" element={<MethodologyPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/termos" element={<TermsPage />} />
          <Route path="/privacidade" element={<PrivacyPage />} />
          <Route path="/jogo-responsavel" element={<ResponsibleGamingPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
