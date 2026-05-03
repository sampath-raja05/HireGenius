const BentoCard = ({ icon, title, desc, children, className = "" }) => {
  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#121214] px-8 py-8 transition duration-300 hover:border-emerald-400/20 ${className}`}
    >
      <span className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-400/10 text-base text-emerald-300">
        {icon}
      </span>
      <h3 className="mb-3 font-serif text-[1.9rem] leading-tight tracking-tight text-[#f0ece4]">
        {title}
      </h3>
      <p className="max-w-xl text-[0.97rem] leading-8 text-[#9a948d]">
        {desc}
      </p>
      {children ? <div className="mt-auto pt-6">{children}</div> : null}
    </div>
  );
};

export default BentoCard 
