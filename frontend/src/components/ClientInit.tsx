'use client';
import { useEffect } from 'react';

export default function ClientInit() {
  useEffect(() => {
    // Wait for hydration to complete before making any DOM mutations
    const setClientOnlyProperties = () => {
      try {
        const hostname = window.location?.hostname || '';
        if (hostname) {
          // Option 1: Set on body instead of html to avoid hydration mismatch
          document.body.style.setProperty('--vsc-domain', `"${hostname}"`);
          
          // Option 2: Alternatively, use data attributes
          // document.body.dataset.vscDomain = hostname;
          
          // Option 3: Or add a class that you can target in CSS
          // document.body.classList.add(`domain-${hostname.replace(/\./g, '-')}`);
        }
      } catch (e) {
        console.warn('Failed to set client-only properties:', e);
      }
    };

    // Defer execution to avoid hydration mismatch
    const timeoutId = setTimeout(setClientOnlyProperties, 0);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}