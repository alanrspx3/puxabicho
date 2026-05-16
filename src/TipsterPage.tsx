import React, { useEffect, useMemo } from 'react';
import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Zap } from 'lucide-react';
import { TIPSTERS } from './tipsters';
import { ANIMALS } from './constants';

function SEO({ title, description, schema }: { title: string; description?: string; schema?: any }) {
  useEffect(() => {
    document.title = title;
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }

    if (schema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [title, description, schema]);

  return null;
}

export default function TipsterPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  
  const tipster = useMemo(() => {
    return TIPSTERS.find(t => t.slug === slug);
  }, [slug]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!tipster) {
    return <Navigate to="/puxadas" replace />;
  }

  const faqData = [
    {
      question: `Como funciona a tabela de puxadas do ${tipster.name}?`,
      answer: `A tabela de puxadas do ${tipster.name} é baseada em sua experiência e análise de padrões de sorte. Quando um animal sai em uma extração, o ${tipster.name} indica quais são os bichos com maior probabilidade de "puxarem" o próximo resultado.`
    },
    {
      question: `Quais são as puxadas favoritas do ${tipster.name}?`,
      answer: `O ${tipster.name} é especialista em ${tipster.specialty}. Seus animais favoritos para palpites incluem ${tipster.favoritos.map(f => f.charAt(0).toUpperCase() + f.slice(1)).join(', ')}.`
    },
    {
      question: `Posso confiar nos palpites do ${tipster.name}?`,
      answer: `O jogo do bicho é uma atividade baseada em sorte. O ${tipster.name} utiliza sua expertise para sugerir tendências, mas não há garantias de ganho. Use as tabelas como guia para suas próprias escolhas.`
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://puxabicho.com/${tipster.slug}`,
        "url": `https://puxabicho.com/${tipster.slug}`,
        "name": tipster.pageTitle,
        "description": tipster.metaDescription,
        "breadcrumb": { "@id": `https://puxabicho.com/${tipster.slug}#breadcrumb` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://puxabicho.com/${tipster.slug}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Início",
            "item": "https://puxabicho.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Puxadas",
            "item": "https://puxabicho.com/puxadas"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": tipster.displayName
          }
        ]
      },
      {
        "@type": "Person",
        "name": tipster.name,
        "description": tipster.bio,
        "jobTitle": "Especialista em Jogos de Sorte",
        "url": `https://puxabicho.com/${tipster.slug}`
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqData.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SEO 
        title={tipster.pageTitle}
        description={tipster.metaDescription}
        schema={jsonLd}
      />

      <Link
        to="/puxadas"
        className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm mb-6 hover:underline"
      >
        <ArrowLeft size={16} />
        Voltar para Puxadas
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3 leading-tight">
        {tipster.displayName} — Tabela Completa do Jogo do Bicho
      </h1>
      <p className="text-slate-500 mb-10 max-w-2xl leading-relaxed">
        {tipster.bio}
      </p>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-lg font-bold text-emerald-600 mb-6">
          <Zap size={20} />
          Tabela de Puxadas do {tipster.name} Atualizada
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ANIMALS.map((animal, idx) => {
            const puxadas = tipster.puxadas[animal.slug] ?? animal.puxadas ?? [];
            return (
              <motion.div
                key={animal.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02, duration: 0.3 }}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-3xl shrink-0 border border-slate-100">
                  {animal.emoji}
                </div>
                
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/puxadas/${animal.slug}`}
                    className="font-bold text-slate-800 hover:text-emerald-600 transition-colors"
                  >
                    {animal.name}
                  </Link>
                  
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 mb-3">
                    GRUPO {animal.id.toString().padStart(2, '0')}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {puxadas.map((p) => (
                      <span
                        key={p}
                        className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-700 font-medium hover:border-emerald-300 transition-colors"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <div className="py-12 text-center text-slate-400 text-xs font-medium max-w-2xl mx-auto px-4 mt-8">
        As informações nesta página são fornecidas apenas para fins de entretenimento. 
        O site puxabicho.com não incentiva apostas e não possui vínculo com sorteios ou bancas.
      </div>
    </div>
  );
}
