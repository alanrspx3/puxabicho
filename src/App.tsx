import { useState, ReactNode, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { ANIMALS, MOCK_RESULTS } from './constants';
import { Menu, Search, Calendar, ChevronRight, Share2, Info, Home, List, Grid, ArrowLeft, Zap, Sparkles, RefreshCw, X, Facebook, Instagram, MessageCircle, BarChart3, BookOpen, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Canonical Tag Manager ---
function CanonicalTag() {
  const location = useLocation();
  const baseUrl = process.env.APP_URL || window.location.origin;
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const canonicalUrl = `${cleanBaseUrl}${location.pathname}`;

  useEffect(() => {
    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);
  }, [canonicalUrl]);

  return null;
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
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] md:hidden"
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-[280px] bg-white z-[70] shadow-2xl flex flex-col md:hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-emerald-600 text-white">
              <div className="flex items-center gap-2 font-bold text-lg">
                <div className="w-8 h-8 bg-white text-emerald-600 rounded-lg flex items-center justify-center">B</div>
                Menu
              </div>
              <button onClick={onClose} className="p-2 hover:bg-emerald-500 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto py-4">
              <div className="px-4 mb-6">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Navegação Principal</h4>
                <div className="space-y-1">
                  <Link to="/" onClick={onClose} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors">
                    <Home size={20} className="text-emerald-500" /> Início
                  </Link>
                  <Link to="/puxadas" onClick={onClose} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors">
                    <Zap size={20} className="text-emerald-500" /> Guia de Puxadas
                  </Link>
                  <Link to="/palpites" onClick={onClose} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors">
                    <Sparkles size={20} className="text-emerald-500" /> Palpites do Dia
                  </Link>
                </div>
              </div>

              <div className="px-4 mb-6">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Ferramentas</h4>
                <div className="space-y-1">
                  <a href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors">
                    <BarChart3 size={20} className="text-blue-500" /> Estatísticas
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors">
                    <BookOpen size={20} className="text-purple-500" /> Como Jogar
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors">
                    <HelpCircle size={20} className="text-amber-500" /> Dúvidas Frequentes
                  </a>
                </div>
              </div>

              <div className="px-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Redes Sociais</h4>
                <div className="flex gap-2 px-2">
                  <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 transition-all">
                    <Facebook size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 transition-all">
                    <Instagram size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 transition-all">
                    <MessageCircle size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <p className="text-[10px] text-slate-400 leading-tight">
                © 2026 Puxadas do Bicho. Informações rápidas e precisas para você.
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
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <CanonicalTag />
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
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className={`transition-colors ${isActive('/') ? 'text-white' : 'text-emerald-100 hover:text-white'}`}>Resultados</Link>
            <Link to="/puxadas" className={`transition-colors ${isActive('/puxadas') ? 'text-white' : 'text-emerald-100 hover:text-white'}`}>Puxadas</Link>
            <Link to="/palpites" className={`transition-colors ${isActive('/palpites') ? 'text-white' : 'text-emerald-100 hover:text-white'}`}>Palpites</Link>
            <a href="#" className="hover:text-emerald-100 transition-colors">Estatísticas</a>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-emerald-500 rounded-full transition-colors hidden md:block">
              <Search size={20} />
            </button>
            <button 
              onClick={() => setIsDrawerOpen(true)}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
                <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center text-xs">B</div>
                Puxadas do Bicho
              </div>
              <p className="text-sm leading-relaxed">
                O portal mais completo para conferir os resultados do Jogo do Bicho em tempo real. 
                Informação rápida e precisa para você.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Links Úteis</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-emerald-400 transition-colors">Resultados</Link></li>
                <li><Link to="/puxadas" className="hover:text-emerald-400 transition-colors">Guia de Puxadas</Link></li>
                <li><Link to="/palpites" className="hover:text-emerald-400 transition-colors">Palpites do Dia</Link></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Aviso Legal</h4>
              <p className="text-xs leading-relaxed opacity-60">
                Este site é meramente informativo. Não realizamos apostas e não temos vínculo com quem as realiza. 
                Os resultados são coletados de fontes públicas.
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-xs">
            &copy; 2026 Puxadas do Bicho - Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Robust Bottom Tab Bar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 px-2 py-2 flex justify-around items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-1 px-4 py-1 rounded-2xl transition-all ${isActive('/') ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Home size={22} strokeWidth={isActive('/') ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-tight">Início</span>
        </Link>
        <Link 
          to="/puxadas" 
          className={`flex flex-col items-center gap-1 px-4 py-1 rounded-2xl transition-all ${location.pathname.startsWith('/puxadas') ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Zap size={22} strokeWidth={location.pathname.startsWith('/puxadas') ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-tight">Puxadas</span>
        </Link>
        <Link 
          to="/palpites" 
          className={`flex flex-col items-center gap-1 px-4 py-1 rounded-2xl transition-all ${isActive('/palpites') ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Sparkles size={22} strokeWidth={isActive('/palpites') ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-tight">Palpites</span>
        </Link>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex flex-col items-center gap-1 px-4 py-1 rounded-2xl text-slate-400 hover:text-slate-600 transition-all"
        >
          <div className="relative">
            <Menu size={22} />
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
              to={`/puxadas/${animal.name.toLowerCase()}`} 
              key={animal.id}
              className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all text-center flex flex-col items-center"
            >
              <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center">
                <div className="text-6xl mb-4 drop-shadow-sm group-hover:drop-shadow-md transition-all">
                  {animal.emoji}
                </div>
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
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Guia de Puxadas</h2>
        <p className="text-slate-500">Clique em um animal para ver quais bichos ele "puxa" e conhecer sua história.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {ANIMALS.map((animal) => (
          <Link 
            to={`/puxadas/${animal.name.toLowerCase()}`} 
            key={animal.id}
            className="group bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all text-center"
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <div className="text-4xl mb-3">{animal.emoji}</div>
              <div className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{animal.name}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">Grupo {animal.id.toString().padStart(2, '0')}</div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// --- Animal Detail Page ---
function AnimalDetailPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const animal = ANIMALS.find(a => a.name.toLowerCase() === name?.toLowerCase());

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
        <div className="bg-emerald-600 p-8 text-center text-white">
          <div className="text-7xl mb-4 drop-shadow-lg">{animal.emoji}</div>
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
                    to={`/puxadas/${puxadaName.toLowerCase()}`}
                    key={puxadaName}
                    className="p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 transition-all text-center group"
                  >
                    <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">{puxadaAnimal?.emoji}</div>
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
                    to={`/puxadas/${recAnimal.name.toLowerCase()}`}
                    key={recAnimal.name}
                    className="flex-shrink-0 w-36 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 transition-all text-center group shadow-sm hover:shadow-md"
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{recAnimal.emoji}</div>
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
                to={`/puxadas/${animal.name.toLowerCase()}`}
                key={animal.id} 
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all group"
              >
                <div className="text-5xl group-hover:scale-110 transition-transform">{animal.emoji}</div>
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

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/puxadas" element={<PuxadasPage />} />
          <Route path="/puxadas/:name" element={<AnimalDetailPage />} />
          <Route path="/palpites" element={<PalpitesPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
