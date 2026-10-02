import { useEffect, useState } from 'react';
import { roleQuestions } from '../data/editorial';
type Role = keyof typeof roleQuestions;
export default function ReflectionQuestions() {
  const [role, setRole] = useState<Role>('neutral');
  useEffect(() => {
    const select = document.querySelector<HTMLSelectElement>('#global-role');
    const read = () => {
      const value = select?.value ?? 'neutral';
      setRole(value in roleQuestions ? (value as Role) : 'neutral');
    };
    read();
    window.addEventListener('kraau-role-change', read);
    return () => window.removeEventListener('kraau-role-change', read);
  }, []);
  return (
    <>
      <p className="small">
        {role === 'mentor'
          ? 'Otázky pro společný rozhovor'
          : role === 'educator'
            ? 'Otázky pro propojení kurzu a praxe'
            : role === 'student'
              ? 'Otázky pro studujícího'
              : 'Pro vlastní reflexi nebo společný rozhovor'}
      </p>
      <ol className="reflection-list">
        {roleQuestions[role].map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ol>
    </>
  );
}
