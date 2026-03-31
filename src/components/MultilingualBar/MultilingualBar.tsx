export function MultilingualBar() {
  const names = [
    'San Thiago',
    'サンシアゴ',
    'Сан Тхиаго',
    '산티아고',
  ];

  // Duplicate for seamless loop
  const doubled = [...names, ...names, ...names, ...names];

  return (
    <div className="multilingual" id="multilingual-bar">
      <div className="multilingual__track">
        {doubled.map((name, i) => (
          <span className="multilingual__item" key={i}>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
