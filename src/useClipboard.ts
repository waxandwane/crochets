import { useEvent } from '@lib';
import { useState } from 'react';

// polyfill for clipboard.writeText()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalAny: any = global;

if (typeof globalAny.navigator === 'undefined')
  globalAny.navigator = {
    clipboard: {
      writeText(content: string): void {
        const onForcedCopy = (e: ClipboardEvent): void => {
          (e.clipboardData as DataTransfer).setData('text/plain', content);
          e.preventDefault();
        };
        document.addEventListener('copy', onForcedCopy);
        document.execCommand('copy');
        document.removeEventListener('copy', onForcedCopy);
      },
    },
  };

export const useClipboard = (): (string | ((content: string) => void))[] => {
  const [content, setContent] = useState('');

  const writeToClipboard = (content: string): void => {
    if (typeof content === 'string') {
      globalAny.navigator.clipboard.writeText(content);
      setContent(content);
    }
  };

  const handleCopy = (): void => {
    const selection = window.getSelection() || '';
    const content = selection.toString();

    if (selection && typeof content === 'string') {
      setContent(content);
    }
  };

  useEvent('copy', handleCopy);
  useEvent('cut', handleCopy);

  return [content, writeToClipboard];
};
