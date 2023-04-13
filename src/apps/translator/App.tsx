import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/solid';
import Toast from 'react-hot-toast';

import OpenAiIcon from '@/components/icons/OpenAiIcon';

import Writing from './components/Writing';
import LanguageSelect from './components/LanguageSelect';
import TransTextarea from './components/TransTextarea';
import TransResult from './components/TransResult';
import TransActions from './components/TransActions';

export default function App() {
  const [detectFrom, setDetectFrom] = useState('zh-Hans');
  const [detectTo, setDetectTo] = useState('en');
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setOriginalText(originalText);

      const response = await fetch('/v1/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: originalText,
          from: detectFrom,
          to: detectTo,
        }),
      });
      const data = await response.json();
      const content = data.choices[0].message.content;

      try {
        setTranslatedText(JSON.parse(content));
      } catch {
        setTranslatedText(content);
      }
    } catch (ex) {
      Toast.error(`翻译失败：${(ex as Error).toString()}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // pass
  };

  const handleClear = () => {
    setOriginalText('');
    setTranslatedText('');
  };

  return (
    <div className="flex flex-col mx-auto max-h-full">
      <div className="flex flex-col flex-shrink md:flex-row md:justify-between md:items-center pt-6 pb-4 px-4 md:pt-4 space-y-3 md:space-y-0 border-b md:border md:rounded-t-md border-gray-200 bg-white">
        <div className="flex items-center gap-2 text-black font-bold text-md">
          <OpenAiIcon className="w-4 h-4"></OpenAiIcon>
          <span className="select-none">OpenAI 翻译</span>
        </div>
        <div className="flex items-center text-gray-400">
          <LanguageSelect value={detectFrom} onChange={setDetectFrom} />
          <div
            className="px-2 cursor-pointer"
            onClick={() => {
              setDetectFrom(detectTo);
              setDetectTo(detectFrom);
            }}
          >
            <ArrowsRightLeftIcon className="w-4 h-4" />
          </div>
          <LanguageSelect value={detectTo} onChange={setDetectTo} />
        </div>
      </div>
      <div className="p-2 md:p-4 md:border-x md:border-b border-gray-200 md:rounded-b-md">
        <div className="relative flex flex-col space-y-4 md:space-y-0 md:flex-row">
          {isLoading && <Writing />}
          <TransTextarea
            className="md:rounded-r-none"
            value={originalText}
            rows={isMobile ? 8 : 30}
            disabled={isLoading}
            onChange={setOriginalText}
            onSubmit={handleSubmit}
          />
          <TransActions
            loading={isLoading}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            onClear={handleClear}
          />
          <TransResult text={translatedText} />
        </div>
      </div>
    </div>
  );
}
