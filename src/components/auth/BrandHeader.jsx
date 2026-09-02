import Image from "next/image";

export default function BrandHeader() {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-16 w-full max-w-[220px] items-center justify-center">
        <Image
          src="/logo-header.png"
          alt="Marivia Nest"
          width={220}
          height={76}
          className="h-auto w-full object-contain"
          priority
        />
      </div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#6b3927]">
        Secure Access
      </p>
      <p className="text-sm font-medium text-[#404945]">
        Administrator Panel
      </p>
    </div>
  );
}
