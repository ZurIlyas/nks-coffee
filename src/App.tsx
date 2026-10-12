import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PrismaHero, WordsPullUp, WordsPullUpMultiStyle } from '@/components/ui/prisma-hero'
import { MENU, TABS, type Cat } from './menu'

const IG = 'https://www.instagram.com/nks24space/'
const EASE = [0.16, 1, 0.3, 1] as const
const SHOTS = [
  ['facade', 'Вход в NKS space вечером, у входа стоит классический кабриолет', 'Вход'],
  ['wall', 'Стена с рамами: мотоциклы и теннисная ракетка', 'Стена'],
  ['porsche', 'Модель Porsche в раме на стене', '911 в раме'],
  ['table', 'Стол-витрина с моделями машин и мячами', 'Стол-витрина'],
] as const

function Aura() {
  return <div className="aura" aria-hidden="true"><i /><i /><i /><i /><i /><b /><b /></div>
}

function Pill({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  const ext = href.startsWith('http')
  return (
    <a
      href={href}
      {...(ext ? { target: '_blank', rel: 'noopener' } : {})}
      className={`group inline-flex items-center gap-2 self-start rounded-full py-1 pl-5 pr-1 text-sm font-medium transition-all hover:gap-3 sm:text-base ${dark ? 'bg-ink text-primary' : 'bg-primary text-black'}`}
    >
      {children}
      <span className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:scale-110 sm:h-10 sm:w-10 ${dark ? 'bg-primary text-ink' : 'bg-black text-primary'}`}>
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </a>
  )
}

function Card({ cat, index }: { cat: Cat; index: number }) {
  const hot = !!cat.hot
  return (
    <motion.section
      id={cat.id}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`scroll-mt-6 rounded-2xl p-5 sm:p-7 md:rounded-[2rem] md:p-9 ${hot ? 'bg-red text-primary' : 'bg-coal'}`}
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-4xl font-medium leading-[0.9] tracking-[-0.05em] sm:text-5xl md:text-6xl">
          {cat.title[0]}{' '}
          <span className={hot ? 'text-ink' : 'text-red'}>{cat.title[1]}</span>
        </h2>
        <span className={`mt-1 rounded-full px-3 py-1 text-xs ${hot ? 'bg-ink text-primary' : 'bg-primary/10 text-primary/70'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <p className={`mt-3 text-sm ${hot ? 'text-primary/80' : 'text-primary/50'}`}>{cat.note}</p>

      <ul className="mt-6">
        {cat.items.map(([name, desc, vol, price, tag]) => (
          <li key={name} className={`group flex items-baseline gap-4 border-t py-4 ${hot ? 'border-primary/30' : 'border-primary/10'}`}>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 text-lg font-medium tracking-[-0.02em] sm:text-xl">
                <span className="transition-transform duration-300 group-hover:translate-x-1">{name}</span>
                {tag && (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${tag === 'hit' ? (hot ? 'bg-ink text-primary' : 'bg-red text-primary') : 'bg-primary text-ink'}`}>
                    {tag === 'hit' ? 'хит' : 'new'}
                  </span>
                )}
              </div>
              <div className={`mt-0.5 text-sm ${hot ? 'text-primary/75' : 'text-primary/45'}`}>
                {desc}{vol && <span className="whitespace-nowrap"> · {vol}</span>}
              </div>
            </div>
            <div className="whitespace-nowrap text-lg font-medium tracking-[-0.02em] sm:text-xl">{price} ₽</div>
          </li>
        ))}
      </ul>
    </motion.section>
  )
}

export default function App() {
  const [filter, setFilter] = useState<string>('all')
  const cats = filter === 'all' ? MENU : MENU.filter((c) => c.id === filter)
  const pick = (id: string) => setFilter(id)

  return (
    <div className="p-2 sm:p-3">
      <PrismaHero
        title="Меню"
        description="NKS space — кофейня, где на стене висит Porsche в раме, а на столе лежат мячи и модели болидов. Здесь наше меню: кофе, авторские напитки, холодное и выпечка."
        nav={[
          { label: 'Кофе', href: '#menu' },
          { label: 'Авторские', href: '#menu' },
          { label: 'Холодное', href: '#menu' },
          { label: 'Внутри', href: '#place' },
          { label: 'Instagram', href: '#contacts' },
        ]}
        cta={{ label: 'Смотреть меню', href: '#menu' }}
        background={<Aura />}
        footnote="демо-версия: позиции и цены стоят для примера"
      />

      {/* манифест */}
      <section className="mx-auto max-w-6xl px-4 py-24 text-center sm:py-32">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-primary/45">NKS space · coffee · pit stop</p>
        <WordsPullUpMultiStyle
          className="text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-7xl"
          segments={[
            { text: 'Заезжай на кофе.' },
            { text: 'Останься', className: 'text-primary/40' },
            { text: 'ради места.', className: 'text-red' },
          ]}
        />
      </section>

      {/* меню */}
      <section id="menu" className="scroll-mt-4">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4 px-2 sm:px-4">
          <h2 className="text-6xl font-medium leading-[0.85] tracking-[-0.05em] sm:text-8xl">
            <WordsPullUp text="Что берём" />
          </h2>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Разделы меню">
            {[['all', 'Всё'] as const, ...MENU.map((c) => [c.id, TABS[c.id]] as const)].map(([id, label]) => (
              <button
                key={id}
                role="tab"
                aria-selected={filter === id}
                onClick={() => pick(id)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === id ? 'text-ink' : 'text-primary/70 hover:text-primary'}`}
              >
                {filter === id && (
                  <motion.span layoutId="tab" className="absolute inset-0 rounded-full bg-primary" transition={{ duration: 0.45, ease: EASE }} />
                )}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-2 sm:gap-3 lg:grid-cols-2">
          {cats.map((c) => <Card key={`${filter}-${c.id}`} cat={c} index={MENU.indexOf(c)} />)}
        </div>
      </section>

      {/* место */}
      <section id="place" className="scroll-mt-4 pt-24 sm:pt-32">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4 px-2 sm:px-4">
          <h2 className="text-6xl font-medium leading-[0.85] tracking-[-0.05em] sm:text-8xl">
            <WordsPullUp text="Как внутри" />
          </h2>
          <p className="max-w-xs text-sm text-primary/50" style={{ lineHeight: 1.25 }}>
            Машины, мячи, часы и книги: всё это можно рассматривать, пока готовится кофе.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {SHOTS.map(([file, alt, cap], i) => (
            <motion.figure
              key={file}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="group relative m-0 overflow-hidden rounded-2xl md:rounded-[2rem]"
            >
              <img src={`./assets/${file}.jpg`} alt={alt} loading="lazy" className="aspect-[7/9] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
              <figcaption className="absolute bottom-3 left-4 text-sm font-medium sm:bottom-5 sm:left-6 sm:text-base">{cap}</figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* контакты */}
      <footer id="contacts" className="mt-2 scroll-mt-4 overflow-hidden rounded-2xl bg-primary p-5 text-ink sm:mt-3 sm:p-8 md:rounded-[2rem] md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src="./assets/logo.png" alt="" width={72} height={72} className="h-16 w-16 sm:h-[72px] sm:w-[72px]" />
            <p className="max-w-xs text-sm text-ink/70 sm:text-base" style={{ lineHeight: 1.2 }}>
              Новости, новинки меню и жизнь кофейни — в Instagram.
            </p>
          </div>
          <Pill href={IG} dark>@nks24space</Pill>
        </div>
        <div className="mt-10 font-medium leading-[0.8] tracking-[-0.05em] text-[22vw] lg:text-[17vw]">
          <WordsPullUp text="NKS space" />
        </div>
        <p className="mt-6 text-xs text-ink/50">© 2026 NKS space. Состав и наличие позиций уточняйте у бариста.</p>
      </footer>
    </div>
  )
}
