import { useEffect } from 'react';

export const useDocumentMetadata = (title: string, faviconUrl: string) => {
    useEffect(() => {
        // Update Title
        document.title = title;

        // Update Favicon
        let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = faviconUrl;

        // Cleanup (optional: reset to default but usually navigating away handles this naturally or we want persistence)
        return () => {
            // Optional: document.title = 'Phishing App';
            // Optional: link.href = '/vite.svg';
        };
    }, [title, faviconUrl]);
};
