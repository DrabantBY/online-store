import { useClipboard } from 'use-clipboard-copy';
import './copy.scss';

export const CopyUrl = () => {
  const clipboard = useClipboard({
    copiedTimeout: 1000,
  });

  return (
    <button className='button-copy-url' onClick={() => clipboard.copy(window.location.href)}>
      {clipboard.copied ? <span>Link Copied!!!</span>: <span>Copy Link</span>}
    </button>
  );
};
