import React from 'react';
    import { companyInfo } from './productsData';
    
    const Header = () => {
      return (
        <header className="fixed top-0 w-full z-50 glass-card border-b border-muted">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center font-bold text-background">D</div>
              <span className="text-xl font-bold tracking-tighter silver-gradient italic">
                {companyInfo.companyName.toUpperCase()}
              </span>
            </div>
            <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-widest text-primary/70">
              <a href="#products" className="hover:text-accent transition-colors">INSTRUMENTS</a>
              <a href="#equipment" className="hover:text-accent transition-colors">EQUIPMENT</a>
              <a href="#contact" className="hover:text-accent transition-colors">SUPPORT</a>
            </nav>
            <div className="text-xs font-mono text-primary/50">
              {companyInfo.phone}
            </div>
          </div>
        </header>
      );
    };
    export default Header;
