export const Loader = () => (
  <div className='h-screen w-full bg-background flex items-center justify-center'>
    <div className='flex flex-col items-center space-y-8'>
      <div className='transition-all duration-1000 ease-out opacity-100 scale-100 translate-y-0'>
        <h1 className='text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse relative'>
          ELA
          <span className='absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-[4px] opacity-40 animate-pulse -z-10'>
            ELA
          </span>
          <span className='absolute inset-0 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent blur-[8px] opacity-30 animate-pulse -z-20 dark:opacity-40'>
            ELA
          </span>
        </h1>
      </div>
    </div>
  </div>
);
