'use client';

export default function ViewToggle({ view, setView }: any) {
  return (
    <>
      <button onClick={() => setView('map')}>Map</button>
      <button onClick={() => setView('globe')}>Globe</button>
    </>
  );
}
