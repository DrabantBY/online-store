import { useClipboard } from 'use-clipboard-copy';

export const CopyUrl = () => {
  const clipboard = useClipboard({
    copiedTimeout: 1000,
  });

  return (
    <button onClick={() => clipboard.copy(window.location.href)}>
      {clipboard.copied ? 'Link Copied!!!' : 'Copy Link'}
    </button>
  );
};
