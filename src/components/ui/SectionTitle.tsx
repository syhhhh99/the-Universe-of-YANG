interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
}
export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <header>
      {eyebrow && <p>{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  );
}
