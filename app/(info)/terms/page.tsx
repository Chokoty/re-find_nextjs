'use client';

import React from 'react';

import { renderTextWithLinks } from '@/app/(info)/lib/renderTextWithLinks';
import { TERMS } from '@/constants/terms';

const TermsPage = () => {
  return (
    <div className="mx-auto max-w-4xl rounded-lg p-8 shadow-lg">
      <h1 className="mb-6 text-3xl font-bold">{TERMS.title}</h1>
      <p className="mb-8 text-sm">마지막 개정: {TERMS.lastUpdated}</p>

      {TERMS.sections.map((section, index) => (
        <section key={index} className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">{section.title}</h2>
          {section.content ? (
            <p className="text-gray-400">
              {renderTextWithLinks(section.content)}
            </p>
          ) : section.items ? (
            <ol className="list-decimal space-y-2 pl-6 text-gray-400">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {typeof item === 'string' ? (
                    renderTextWithLinks(item)
                  ) : (
                    <>
                      {renderTextWithLinks(item.text)}
                      {item.subitems && (
                        <ul className="mt-2 list-disc space-y-1 pl-6">
                          {item.subitems.map((subitem, subIndex) => (
                            <li key={subIndex}>
                              {renderTextWithLinks(subitem)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ol>
          ) : null}
        </section>
      ))}
    </div>
  );
};

export default TermsPage;
