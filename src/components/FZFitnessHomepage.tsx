import {
  Activity,
  ArrowRight,
  Dumbbell,
  MapPin,
  UsersRound,
} from "lucide-react";

type FZFitnessHomepageProps = {
  location: string;
  onJoin: () => void;
  onMembershipPlans: () => void;
};

const highlights = [
  { label: "Modern Equipment", detail: "Built for your routine", Icon: Dumbbell },
  { label: "Cardio & Strength", detail: "Train your way", Icon: Activity },
  { label: "Free Weights", detail: "Room to build strength", Icon: UsersRound },
  { label: "Convenient Location", Icon: MapPin },
];

const facilities = [
  {
    title: "Cardio Zone",
    image: "/gym/dumbbell-1.jpg",
    alt: "Gym floor with free weights and cardio equipment",
  },
  {
    title: "Strength Training",
    image: "/gym/machine-1.jpg",
    alt: "Strength training session with coaching",
  },
  {
    title: "Free Weights",
    image: "/gym/strength-1.jpg",
    alt: "Athlete lifting a barbell in a gym",
  },
];

export function FZFitnessHomepage({
  location,
  onJoin,
  onMembershipPlans,
}: FZFitnessHomepageProps) {
  return (
    <>
      <section
        id="home"
        aria-labelledby="home-heading"
        className="relative isolate flex min-h-[430px] items-center overflow-hidden bg-[#0B0B0D] sm:min-h-[500px] lg:min-h-[540px]"
      >
        <img
          src="/gym/dumbbell-1.jpg"
          alt="Dumbbell rack and gym equipment"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,5,6,0.96)_0%,rgba(5,5,6,0.82)_40%,rgba(5,5,6,0.25)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-black/15" />

        <div
          id="about"
          className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10"
        >
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F51E2B] sm:text-sm">
              Your fitness. Your future.
            </p>
            <h1
              id="home-heading"
              className="max-w-xl text-4xl font-black uppercase leading-[0.98] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Build a stronger <span className="text-[#F51E2B]">you.</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-6 text-white/80 sm:text-base">
              Train with purpose in a focused space built around strength,
              movement, and your personal fitness goals.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onJoin}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#F51E2B] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#D91421] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Join the Gym <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#facilities"
                className="inline-flex min-h-11 items-center justify-center rounded-sm border border-white/70 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore Facilities
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Gym highlights"
        className="border-b border-[#E5E5E7] bg-white"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 py-4 sm:px-8 md:grid-cols-4 lg:px-10">
          {highlights.map(({ label, detail, Icon }, index) => (
            <div
              key={label}
              className={`flex min-h-[76px] items-center gap-3 px-2 py-3 sm:px-4 ${
                index > 0 ? "md:border-l md:border-[#E5E5E7]" : ""
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F51E2B]/[0.08] text-[#F51E2B]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold text-[#0B0B0D] sm:text-sm">
                  {label}
                </span>
                <span className="mt-1 block text-[11px] text-[#55555B]">
                  {detail ?? location}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section
        id="facilities"
        aria-labelledby="facilities-heading"
        className="scroll-mt-20 bg-[#F5F5F5]"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.85fr_2fr] lg:items-center lg:gap-10 lg:px-10 lg:py-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F51E2B]">
              Our facilities
            </p>
            <h2
              id="facilities-heading"
              className="mt-2 max-w-md text-3xl font-black uppercase leading-[1.05] tracking-tight text-[#0B0B0D] sm:text-4xl"
            >
              Everything you need under one roof
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#55555B]">
              From cardio and strength work to free weights, find the space and
              equipment to make every session count.
            </p>
            <a
              href="#facilities-cards"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-sm bg-[#F51E2B] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#D91421] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B0B0D]"
            >
              Explore All Facilities <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div
            id="facilities-cards"
            className="grid gap-3 sm:grid-cols-3"
          >
            {facilities.map((facility) => (
              <a
                key={facility.title}
                href="#membership"
                className="group relative min-h-[220px] overflow-hidden rounded-md bg-[#242428] shadow-sm sm:min-h-[250px]"
              >
                <img
                  src={facility.image}
                  alt={facility.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-white">
                  <span className="text-sm font-bold">{facility.title}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/70 transition-colors group-hover:border-[#F51E2B] group-hover:bg-[#F51E2B]">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        id="membership"
        aria-labelledby="membership-heading"
        className="scroll-mt-20 bg-[#0B0B0D] text-white"
      >
        <div className="mx-auto grid max-w-7xl lg:min-h-[320px] lg:grid-cols-2">
          <div className="relative min-h-[230px] overflow-hidden sm:min-h-[300px]">
            <img
              src="/gym/strength-1.jpg"
              alt="Strength training with a barbell"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-black/20" />
            <span
              aria-hidden="true"
              className="absolute inset-y-0 right-0 hidden w-14 bg-[#F51E2B] lg:block"
              style={{ clipPath: "polygon(60% 0, 100% 0, 40% 100%, 0 100%)" }}
            />
          </div>
          <div className="flex items-center px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F51E2B]">
                Membership plans
              </p>
              <h2
                id="membership-heading"
                className="mt-2 text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-4xl"
              >
                Flexible plans for <span className="text-[#F51E2B]">your goals</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white/70">
                Choose a membership that fits your routine and keep your
                training moving forward.
              </p>
              <button
                type="button"
                onClick={onMembershipPlans}
                className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-sm bg-[#F51E2B] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#D91421] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                View Membership Plans <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

type FZFitnessFooterProps = {
  location: string;
  onJoin: () => void;
};

export function FZFitnessFooter({ location, onJoin }: FZFitnessFooterProps) {
  const quickLinks = [
    { label: "Home", href: "/home" },
    { label: "About", href: "/home#about" },
    { label: "Facilities", href: "/home#facilities" },
    { label: "Membership", href: "/home#membership" },
    { label: "Contact", href: "/home#contact" },
  ];

  return (
    <footer
      id="contact"
      className="scroll-mt-20 bg-[#0B0B0D] text-white"
    >
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.72fr)]">
        <div className="grid gap-9 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-7 lg:px-10 lg:py-12">
          <div>
            <a href="/home" className="inline-flex items-center gap-2.5">
              <img
                src="/brand/fz-gym-logo.png"
                alt=""
                className="h-10 w-10 object-contain"
              />
              <span className="text-base font-black tracking-tight">
                FZ <span className="font-semibold">FITNESS</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-xs leading-5 text-white/65">
              A focused place to train, build strength, and work toward your
              fitness goals.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-bold">Quick Links</h2>
            <nav aria-label="Footer navigation" className="grid gap-2.5">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-fit text-xs text-white/65 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-bold">Our Facilities</h2>
            <ul className="grid gap-2.5 text-xs text-white/65">
              {facilities.map((facility) => (
                <li key={facility.title}>{facility.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-bold">Contact Us</h2>
            <p className="flex items-start gap-2 text-xs leading-5 text-white/65">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#F51E2B]" />
              {location}
            </p>
            <button
              type="button"
              onClick={onJoin}
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white transition-colors hover:text-[#F51E2B]"
            >
              Join the Gym <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="relative min-h-[220px] overflow-hidden lg:min-h-full">
          <img
            src="/gym/fz-fitness-storefront.jpeg"
            alt="FZ Fitness storefront with the gym interior visible through its glass facade"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-[center_28%]"
          />
          <span className="absolute inset-0 bg-black/15" />
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-10 bg-[#F51E2B] sm:w-12"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%, 58% 0)" }}
          />
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-4 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-[11px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} FZ Fitness. All rights reserved.</span>
          <span>Train with purpose.</span>
        </div>
      </div>
    </footer>
  );
}
