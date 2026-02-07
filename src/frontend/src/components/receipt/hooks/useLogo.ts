import { useState, useCallback } from 'react';

const DEFAULT_LOGO = '/assets/generated/ather-logo.dim_900x240.png';

export function useLogo() {
  const [logoUrl, setLogoUrl] = useState(DEFAULT_LOGO);
  const [isCustomLogo, setIsCustomLogo] = useState(false);

  const uploadLogo = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setLogoUrl(result);
      setIsCustomLogo(true);
    };
    reader.readAsDataURL(file);
  }, []);

  const resetLogo = useCallback(() => {
    setLogoUrl(DEFAULT_LOGO);
    setIsCustomLogo(false);
  }, []);

  return {
    logoUrl,
    uploadLogo,
    resetLogo,
    isCustomLogo,
  };
}
