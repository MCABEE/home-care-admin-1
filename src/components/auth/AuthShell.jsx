import BrandHeader from "./BrandHeader";
import LoginForm from "./LoginForm";

export default function AuthShell() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#faf9f6] text-[#1a1c1a]">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-[#faf9f6]/80 backdrop-blur-sm" />
      </div>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-[28px] border border-[#c0c9c3] bg-white/85 p-8 shadow-[0_18px_60px_-16px_rgba(93,46,29,0.18)] backdrop-blur-md sm:p-10">
          <div className="border-t-2 border-[#D4AF37] pt-2" />
          <BrandHeader />
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
