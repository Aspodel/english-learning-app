import { Link } from '@tanstack/react-router';
import {
  BotIcon,
  BrainIcon,
  LandmarkIcon,
  WalletCardsIcon,
} from 'lucide-react';
import React, { useState } from 'react';

export const LandingPage: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (id: string) => (e?: React.MouseEvent) => {
    e?.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main
      className='min-h-screen bg-gray-50 text-slate-900 antialiased'
      aria-live='polite'
    >
      {/* HEADER */}
      <header className='sticky top-0 z-50 bg-white/70 backdrop-blur-sm border-b border-slate-200'>
        <div className='max-w-7xl mx-auto px-6 py-3 flex items-center justify-between'>
          <a
            href='#'
            onClick={scrollToSection('hero')}
            className='font-bold text-xl'
          >
            ELA
          </a>

          <nav className='hidden md:flex items-center gap-6'>
            <a
              href='#'
              onClick={scrollToSection('features')}
              className='text-slate-700 hover:text-indigo-600'
            >
              Features
            </a>
            <a
              href='#'
              onClick={scrollToSection('demo')}
              className='text-slate-700 hover:text-indigo-600'
            >
              Demo
            </a>
            <a
              href='#'
              onClick={scrollToSection('testimonials')}
              className='text-slate-700 hover:text-indigo-600'
            >
              Feedback
            </a>
            <a
              href='#signup'
              onClick={scrollToSection('signup')}
              className='text-slate-700 hover:text-indigo-600'
            >
              Pricing
            </a>
          </nav>

          <div className='hidden md:flex items-center gap-3'>
            <Link
              to='/app'
              className='px-4 py-2 rounded-md text-sm font-medium text-indigo-600 border border-indigo-100 hover:bg-indigo-50'
            >
              Sign In
            </Link>
            <a
              href='#demo'
              onClick={scrollToSection('demo')}
              className='px-4 py-2 rounded-md text-sm bg-indigo-600 text-white shadow-sm'
            >
              Explore
            </a>
          </div>

          <button
            className='md:hidden inline-flex items-center justify-center p-2 rounded-md'
            aria-label='Toggle menu'
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d={
                  mobileOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className='md:hidden border-t border-slate-100 bg-white/90'>
            <div className='px-6 py-4 flex flex-col gap-3'>
              <a
                href='#'
                onClick={scrollToSection('features')}
                className='py-2'
              >
                Features
              </a>
              <a
                href='#demo'
                onClick={scrollToSection('demo')}
                className='py-2'
              >
                Demo
              </a>
              <a
                href='#'
                onClick={scrollToSection('testimonials')}
                className='py-2'
              >
                Feedback
              </a>
              <a
                href='#signup'
                onClick={scrollToSection('signup')}
                className='py-2 font-medium text-indigo-600'
              >
                Sign Up
              </a>
            </div>
          </div>
        )}
      </header>
      {/* HERO */}
      <section
        id='hero'
        className='min-h-[calc(100vh-64px)] flex items-center'
        style={{ scrollMarginTop: '80px' }}
      >
        <div className='max-w-7xl mx-auto px-6 py-16 lg:py-24 w-full'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
            <div className='lg:col-span-6'>
              <p className='inline-block text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full'>
                New • AI-powered
              </p>
              <h1 className='mt-6 text-4xl sm:text-5xl font-extrabold leading-tight'>
                Learn Languages Your Way — With Guidance from AI
              </h1>
              <p className='mt-4 text-lg text-slate-600'>
                Personalized vocabulary, smart flashcards, and adaptive quizzes
                that turn daily practice into lasting progress.
              </p>

              <div className='mt-8 flex flex-col sm:flex-row gap-3'>
                <a
                  href='#signup'
                  className='inline-flex items-center justify-center rounded-lg bg-linear-to-r from-indigo-500 to-violet-500 text-white px-6 py-3 font-medium shadow-lg hover:scale-[.995] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300'
                  aria-label='Sign Up Now - Start free trial'
                  onClick={scrollToSection('signup')}
                >
                  Sign Up Now
                </a>

                <a
                  href='#demo'
                  className='inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-900 px-6 py-3 font-medium hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-200'
                  aria-label='Explore the App'
                  onClick={scrollToSection('demo')}
                >
                  Explore the App
                </a>
              </div>

              <p className='mt-4 text-sm text-slate-500'>
                Start free for 14 days — no credit card required.
              </p>
            </div>

            <div className='lg:col-span-6'>
              <div className='relative'>
                <div className='w-full h-72 sm:h-96 rounded-2xl bg-linear-to-tr from-indigo-100 to-violet-100 border border-white shadow-lg flex items-center justify-center'>
                  {/* Simple mockup placeholder */}
                  <div className='w-64 sm:w-72 md:w-80 bg-white rounded-xl shadow-md p-4'>
                    <div className='h-10 flex items-center justify-between'>
                      <div className='w-28 h-8 bg-slate-100 rounded-full' />
                      <div className='w-10 h-4 bg-slate-200 rounded' />
                    </div>
                    <div className='mt-3'>
                      <div className='h-36 bg-linear-to-b from-slate-50 to-white rounded-lg border p-3'>
                        <div className='flex items-center justify-between'>
                          <div>
                            <p className='text-xs text-slate-400'>Vocabulary</p>
                            <h3 className='mt-1 font-semibold'>
                              Travel — Spain
                            </h3>
                          </div>
                          <div className='text-xs text-slate-500'>274</div>
                        </div>
                        <ul className='mt-3 space-y-2 text-sm text-slate-600'>
                          <li>hola — hello</li>
                          <li>gracias — thank you</li>
                          <li>¿Dónde está...? — Where is...?</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='absolute -bottom-6 left-6 text-sm bg-white rounded-xl px-4 py-2 shadow'>
                  AI suggestions: +12
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id='features' className='bg-white py-24'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='mx-auto text-center max-w-2xl'>
            <h2 className='text-3xl font-bold'>
              Smart tools that actually speed up learning
            </h2>
            <p className='mt-2 text-slate-600'>
              Features built to make progress simple and measurable.
            </p>
          </div>

          <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            <article className='p-6 bg-gray-50 rounded-2xl shadow-sm'>
              <div className='w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center'>
                <LandmarkIcon className='w-6 h-6 text-indigo-600' />
              </div>
              <h3 className='mt-4 font-semibold'>
                Your Personal Vocabulary Bank
              </h3>
              <p className='mt-2 text-sm text-slate-600'>
                Save words, phrases, and example sentences — AI schedules
                reviews based on what you forget.
              </p>
            </article>

            <article className='p-6 bg-gray-50 rounded-2xl shadow-sm'>
              <div className='w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center'>
                <BotIcon className='w-6 h-6 text-purple-600' />
              </div>
              <h3 className='mt-4 font-semibold'>
                AI-Generated Vocabulary Sets
              </h3>
              <p className='mt-2 text-sm text-slate-600'>
                Tell the AI your purpose — travel, job interview, or daily chat
                — and get a ready-made set.
              </p>
            </article>

            <article className='p-6 bg-gray-50 rounded-2xl shadow-sm'>
              <div className='w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center'>
                <WalletCardsIcon className='w-6 h-6 text-emerald-600' />
              </div>
              <h3 className='mt-4 font-semibold'>Smart Flashcards</h3>
              <p className='mt-2 text-sm text-slate-600'>
                Bite-sized sessions with audio and spaced repetition to lock in
                long-term recall.
              </p>
            </article>

            <article className='p-6 bg-gray-50 rounded-2xl shadow-sm'>
              <div className='w-12 h-12 rounded-lg bg-rose-50 flex items-center justify-center'>
                <BrainIcon className='w-6 h-6 text-rose-600' />
              </div>
              <h3 className='mt-4 font-semibold'>Quizzes & AI Feedback</h3>
              <p className='mt-2 text-sm text-slate-600'>
                Adaptive quizzes and detailed AI feedback — generate full mock
                tests for exam practice.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* APP DEMO */}
      <section id='demo' className='py-16'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='mx-auto text-center max-w-2xl'>
            <h2 className='text-3xl font-bold'>See it in action</h2>
            <p className='mt-2 text-slate-600'>
              Short guided tour of the core flows.
            </p>
          </div>

          <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='p-6 bg-white rounded-2xl shadow'>
              <h4 className='font-semibold'>Add vocabulary</h4>
              <p className='mt-2 text-sm text-slate-600'>
                Type, scan, or speak — then tag and save with example sentences.
              </p>
            </div>

            <div className='p-6 bg-white rounded-2xl shadow'>
              <h4 className='font-semibold'>Use flashcards</h4>
              <p className='mt-2 text-sm text-slate-600'>
                Quick sessions with audio and spaced repetition for better
                retention.
              </p>
            </div>

            <div className='p-6 bg-white rounded-2xl shadow'>
              <h4 className='font-semibold'>Take quizzes & get feedback</h4>
              <p className='mt-2 text-sm text-slate-600'>
                Adaptive quizzes and AI explanations with a focused study plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (marquee) */}
      <section id='testimonials' className='bg-gray-50 py-12'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='mx-auto text-center max-w-2xl'>
            <h2 className='text-3xl font-bold'>Real learners. Real results.</h2>
            <p className='mt-2 text-slate-600'>
              Stories from learners who used AI to accelerate progress.
            </p>
          </div>

          {/* marquee container */}
          <div className='mt-8 overflow-hidden'>
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .marquee { will-change: transform; }
              @media (prefers-reduced-motion: reduce) {
                .marquee { animation: none !important; }
              }
            `}</style>

            <div className='relative'>
              <div className='flex marquee animate-[marquee_20s_linear_infinite] gap-6'>
                {/* repeat testimonials twice for continuous loop */}
                {[
                  {
                    name: 'Sofia Alvarez',
                    meta: 'Spain • TOEFL +8',
                    quote:
                      'The AI-made vocab lists saved me hours of research — I passed my TOEFL speaking section after 3 months of daily practice.',
                  },
                  {
                    name: 'James Lee',
                    meta: 'USA • Business vocab 420',
                    quote:
                      'Flashcards tailored to what I forget made learning feel effortless. I speak more confidently at work.',
                  },
                  {
                    name: 'Amina Khalid',
                    meta: 'UAE • Mock test 88%',
                    quote:
                      'Mock tests mirrored the real exam and the AI feedback fixed my recurring grammar mistakes.',
                  },
                ]
                  .concat([
                    {
                      name: 'Sofia Alvarez',
                      meta: 'Spain • TOEFL +8',
                      quote:
                        'The AI-made vocab lists saved me hours of research — I passed my TOEFL speaking section after 3 months of daily practice.',
                    },
                    {
                      name: 'James Lee',
                      meta: 'USA • Business vocab 420',
                      quote:
                        'Flashcards tailored to what I forget made learning feel effortless. I speak more confidently at work.',
                    },
                    {
                      name: 'Amina Khalid',
                      meta: 'UAE • Mock test 88%',
                      quote:
                        'Mock tests mirrored the real exam and the AI feedback fixed my recurring grammar mistakes.',
                    },
                  ])
                  .map((t, i) => (
                    <figure
                      key={`${t.name}-${i}`}
                      className='min-w-[280px] max-w-sm p-6 bg-white rounded-2xl shadow shrink-0'
                    >
                      <div className='flex items-center gap-3'>
                        <div
                          className='w-12 h-12 rounded-full bg-slate-200 shrink-0'
                          aria-hidden='true'
                        />
                        <div>
                          <p className='font-semibold'>{t.name}</p>
                          <p className='text-sm text-slate-500'>{t.meta}</p>
                        </div>
                      </div>
                      <blockquote className='mt-4 text-slate-600'>
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                    </figure>
                  ))}
              </div>

              {/* pause overlay for hover/focus (accessible) */}
              <div
                className='absolute inset-0 pointer-events-none'
                aria-hidden='true'
              />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id='signup' className='py-12'>
        <div className='max-w-4xl mx-auto px-6 text-center bg-linear-to-r from-indigo-600 to-violet-600 rounded-3xl text-white py-12 shadow-lg'>
          <h3 className='text-2xl font-bold'>
            Learn languages your way — start seeing results faster
          </h3>
          <p className='mt-2 text-indigo-100'>
            14-day free trial • Cancel anytime • Secure data & privacy
          </p>
          <div className='mt-6 flex justify-center gap-3'>
            <a
              href='#signup'
              className='inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold'
            >
              Start Learning Your Way!
            </a>
            <a
              href='#demo'
              className='inline-block border border-white text-white px-6 py-3 rounded-lg'
            >
              Explore the App
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className='bg-white border-border/10 border-t mt-8'>
        <div className='max-w-7xl mx-auto px-6 py-8'>
          <div className='flex flex-col md:flex-row md:justify-between gap-6'>
            <div>
              <h4 className='font-bold'>ELA</h4>
              <p className='text-sm text-slate-500 mt-2'>
                Learn languages with AI-guided practice.
              </p>
            </div>

            <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
              <div>
                <h5 className='font-medium'>Product</h5>
                <ul className='mt-2 text-sm text-slate-600 space-y-1'>
                  <li>
                    <a href='#'>Features</a>
                  </li>
                  <li>
                    <a href='#'>Pricing</a>
                  </li>
                  <li>
                    <a href='#'>Demo</a>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className='font-medium'>Company</h5>
                <ul className='mt-2 text-sm text-slate-600 space-y-1'>
                  <li>
                    <a href='#'>About</a>
                  </li>
                  <li>
                    <a href='#'>Blog</a>
                  </li>
                  <li>
                    <a href='#'>Careers</a>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className='font-medium'>Legal</h5>
                <ul className='mt-2 text-sm text-slate-600 space-y-1'>
                  <li>
                    <a href='#'>Terms</a>
                  </li>
                  <li>
                    <a href='#'>Privacy</a>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className='font-medium'>Support</h5>
                <ul className='mt-2 text-sm text-slate-600 space-y-1'>
                  <li>
                    <a href='#'>Help Center</a>
                  </li>
                  <li>
                    <a href='#'>Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='mt-8 text-sm text-slate-500 text-center'>
            © {new Date().getFullYear()} Aspodel. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
