import { Remarkable } from 'remarkable';

const md = new Remarkable();

interface MarkdownPreviewProps {
  markdown: string;
}

export default function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  return (
    <div
      className="content"
      dangerouslySetInnerHTML={{ __html: md.render(markdown) }}
    />
  );
}
