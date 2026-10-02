import { useEffect, useState } from 'react';
import { ArrowRight, MessagesSquare, NotebookPen } from 'lucide-react';
interface Props {
  base: string;
  exampleUrl?: string;
}
export default function NextActions({ base, exampleUrl }: Props) {
  const [role, setRole] = useState('neutral');
  useEffect(() => {
    const read = () =>
      setRole(document.querySelector<HTMLSelectElement>('#global-role')?.value ?? 'neutral');
    read();
    window.addEventListener('kraau-role-change', read);
    return () => window.removeEventListener('kraau-role-change', read);
  }, []);
  const path =
    role === 'mentor' ? 'zpetna-vazba' : role === 'educator' ? 'pozorovani' : 'vlastni-vyuka';
  return (
    <div className="next-actions">
      <a className="button" href={`${base}jak-pracovat/${path}/`}>
        {role === 'mentor' ? <MessagesSquare size={18} /> : <NotebookPen size={18} />}{' '}
        {role === 'mentor'
          ? 'Připravit rozhovor'
          : role === 'educator'
            ? 'Propojit pozorování s praxí'
            : 'Promyslet vlastní výuku'}
      </a>
      <a className="button secondary" href={`${base}jak-pracovat/dalsi-krok/`}>
        Zvolit další krok <ArrowRight size={18} />
      </a>
      {exampleUrl && (
        <a className="button secondary" href={exampleUrl}>
          Prozkoumat ukázku <ArrowRight size={18} />
        </a>
      )}
    </div>
  );
}
