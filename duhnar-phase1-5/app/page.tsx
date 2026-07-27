export default function VerificationPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center gap-8 px-6 py-16 text-center">
      <p className="text-sm font-medium tracking-widest text-gold">
        المرحلة الأولى — التحقق من الأساس
      </p>

      <h1 className="text-4xl font-bold text-primary">دهنار</h1>

      <p className="max-w-md text-base leading-relaxed text-text-muted">
        هذه صفحة تحقّق مؤقتة للتأكد من عمل الاتجاه من اليمين إلى اليسار، والخط
        العربي، ونظام الألوان الخاص بالعلامة التجارية.
      </p>

      {/* Token swatches — visually confirms the design system is wired. */}
      <section className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
        <Swatch label="أساسي" className="bg-primary text-surface" />
        <Swatch label="ذهبي" className="bg-gold text-primary" />
        <Swatch label="سطح" className="bg-surface-soft text-text" />
        <Swatch
          label="حدود"
          className="border border-border bg-surface text-text"
        />
      </section>

      <button
        className="rounded-button bg-primary px-6 py-3 text-surface transition-colors hover:bg-primary-hover"
        style={{ borderRadius: "var(--duhnar-radius-button)" }}
      >
        زر تجريبي
      </button>
    </main>
  );
}

function Swatch({ label, className }: { label: string; className: string }) {
  return (
    <div
      className={`flex h-20 items-center justify-center rounded-card text-sm font-medium ${className}`}
      style={{ borderRadius: "var(--duhnar-radius-card)" }}
    >
      {label}
    </div>
  );
}
