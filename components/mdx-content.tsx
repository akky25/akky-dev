"use client";

import * as runtime from "react/jsx-runtime";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return (
    <div
      className="prose prose-lg prose-gray dark:prose-invert max-w-none
      [&>p]:my-4 [&>p]:whitespace-pre-line
      [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:mt-0
      [&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:mb-4 [&>h2]:mt-8
      [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:mb-3 [&>h3]:mt-6
      [&>h4]:text-xl [&>h4]:font-semibold [&>h4]:mb-2 [&>h4]:mt-4
      [&>h5]:text-lg [&>h5]:font-semibold [&>h5]:mb-2 [&>h5]:mt-3
      [&>h6]:text-base [&>h6]:font-semibold [&>h6]:mb-2 [&>h6]:mt-3
      [&>ul]:my-6 [&>ul]:pl-6 [&>ul]:list-disc
      [&>ol]:my-6 [&>ol]:pl-6 [&>ol]:list-decimal
      [&_li]:my-2
      [&_ul]:list-disc [&_ul]:pl-6
      [&_ol]:list-decimal [&_ol]:pl-6
      [&_ul_ul]:mt-2
      [&_ol_ol]:mt-2
      [&>blockquote]:my-8
      [&>table]:my-8
      [&>hr]:my-8
      [&>figure]:my-8
      prose-headings:scroll-mt-20
      [&>p>a]:text-blue-600 [&>p>a]:underline [&>p>a]:font-normal [&>p>a]:decoration-blue-600/30
      [&>ul_a]:text-blue-600 [&>ul_a]:underline [&>ul_a]:font-normal [&>ul_a]:decoration-blue-600/30
      [&>ol_a]:text-blue-600 [&>ol_a]:underline [&>ol_a]:font-normal [&>ol_a]:decoration-blue-600/30
      dark:[&>p>a]:text-blue-400 dark:[&>p>a]:decoration-blue-400/30
      dark:[&>ul_a]:text-blue-400 dark:[&>ul_a]:decoration-blue-400/30
      dark:[&>ol_a]:text-blue-400 dark:[&>ol_a]:decoration-blue-400/30
      [&_sup_a]:text-blue-600 [&_sup_a]:no-underline [&_sup_a]:font-semibold
      dark:[&_sup_a]:text-blue-400
      prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:bg-gray-100 dark:prose-code:bg-gray-800
      prose-pre:bg-gray-100 prose-pre:dark:bg-gray-900
      [&_li_pre]:my-4 [&_blockquote_pre]:my-4
      [&_p>span>code]:!inline-grid [&_li>span>code]:!inline-grid
      [&_blockquote>p>span>code]:!inline-grid"
    >
      <Component />
    </div>
  );
}
