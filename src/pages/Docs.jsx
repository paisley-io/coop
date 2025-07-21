// src/pages/Docs.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function Docs() {
  const { slug = 'Coop/intro' } = useParams();
  const [content, setContent] = useState('Loading...');

  useEffect(() => {
    fetch(`/docs/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then(setContent)
      .catch(() =>
        setContent('## Document not found.\n\nPlease check the URL or pick another topic from the sidebar.')
      );
  }, [slug]);

  return (
    <div className="flex">
      <aside className="w-64 p-4 border-r">
        <h2 className="text-lg font-bold mb-4">Docs Navigation</h2>
        <ul className="space-y-1 text-sm">
          <li><Link to="/docs/Coop/intro">Welcome to Paisley</Link></li>
          <li><Link to="/docs/Coop/membership">Membership</Link></li>
          <li><Link to="/docs/Coop/governance">Governance</Link></li>

          <li className="mt-3 font-semibold">Time Tokens</li>
          <li><Link to="/docs/Time-Tokens/overview">What is a Time Token?</Link></li>
          <li><Link to="/docs/Time-Tokens/minting">Minting</Link></li>
          <li><Link to="/docs/Time-Tokens/uses">Uses</Link></li>

          <li className="mt-3 font-semibold">Getting Paid</li>
          <li><Link to="/docs/Getting-Paid/invoicing">Invoicing</Link></li>
          <li><Link to="/docs/Getting-Paid/wallet-setup">Wallet Setup</Link></li>
          <li><Link to="/docs/Getting-Paid/withdrawals">Withdrawals</Link></li>
        </ul>
      </aside>

      <main className="p-8 prose max-w-4xl">
        <ReactMarkdown>{content}</ReactMarkdown>
        <div className="mt-6 text-sm text-gray-500">
          <a
            href={`https://github.com/paisley-io/coop/blob/main/public/docs/${slug}.md`}
            target="_blank"
            rel="noreferrer"
          >
            Edit this doc on GitHub
          </a>
        </div>
      </main>
    </div>
  );
}
