import {
  Activity,
  ArrowRight,
  Check,
  Dumbbell,
  HeartPulse,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";
import { subscriptionPlans } from "../data/subscriptionPlans";
import gymMirrorImage from "../assets/WhatsApp Image 2026-10-13 at 2.45.43 PM.jpeg";
import gymMirrorCloseImage from "../assets/WhatsApp Image 2026-10-13 at 2.45.43 PM (1).jpeg";
import gymInteriorImage from "../assets/WhatsApp Image 2026-10-13 at 1.51.41 PM (1).jpeg";
import gymPortraitImage from "../assets/WhatsApp Image 2026-10-13 at 1.51.41 PM.jpeg";
import latestCardImage from "../assets/latest-card.jpeg";

type FZFitnessHomepageProps = {
  location: string;
  onJoin: () => void;
  onMembershipPlans: () => void;
};

const highlights = [
  {
    label: "Modern Equipment",
    detail: "Built for your routine",
    Icon: Dumbbell,
  },
  { label: "Cardio & Strength", detail: "Train your way", Icon: Activity },
  { label: "Free Weights", detail: "Room to build strength", Icon: UsersRound },
  { label: "Convenient Location", Icon: MapPin },
];

const pricingCards = subscriptionPlans.map((plan) => ({
  name: plan.name,
  price: `₹${plan.price.toLocaleString("en-IN")}`,
  tag:
    plan.id === "quarterly"
      ? "Most Popular"
      : plan.id === "annual"
        ? "Best Value"
        : "",
  description:
    plan.id === "monthly"
      ? "Flexible access for your daily routine"
      : plan.id === "quarterly"
        ? "Balanced commitment for steady progress"
        : plan.id === "half_yearly"
          ? "Ideal for serious transformation"
          : "Maximum value with full-year support",
  perks: plan.benefits.slice(0, 4),
  accent:
    plan.id === "quarterly"
      ? "border-[#F51E2B]/60 bg-[#F51E2B]/10"
      : "border-white/10 bg-white/5",
  featured: plan.id === "quarterly",
}));

const heroImage = "/gym/bodybuilder-hero.jpg";
const heroBackgroundImage = heroImage;

const valuePillars = [
  {
    label: "Modern Equipment",
    detail:
      "State-of-the-art machines and free weights for every fitness level.",
    Icon: Dumbbell,
  },
  {
    label: "Expert Trainers",
    detail:
      "Certified professionals to guide and motivate you throughout your journey.",
    Icon: ShieldCheck,
  },
  {
    label: "Personalized Training",
    detail: "Custom workout plans designed around your goals and schedule.",
    Icon: Sparkles,
  },
  {
    label: "Motivating Environment",
    detail: "A clean, safe, and friendly gym space that keeps you consistent.",
    Icon: HeartPulse,
  },
];

const trainers = [
  {
    name: "Coach Performance",
    specialty: "Strength & muscle building",
    image: latestCardImage,
    tags: ["Strength", "Bulking"],
  },
  {
    name: "Sarah Khan",
    specialty: "Dumbbell strength + fruit nutrition",
    image:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=900&q=80",
    tags: ["Fat Loss", "Dumbbell Flow"],
  },
  {
    name: "Marcus Hale",
    specialty: "Elite strength coaching",
    image: heroImage,
    tags: ["Bodybuilding", "Performance"],
  },
  {
    name: "Nutrition & Recovery",
    specialty: "Fuel your performance",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    tags: ["Meal Plans", "Recovery"],
  },
];

const testimonials = [
  {
    quote:
      "FZ Fitness has completely changed my routine. The training is focused, the environment is motivating, and I feel stronger every week.",
    name: "Priya Mehta",
    role: "Member since 2023",
    image: gymMirrorCloseImage,
  },
  {
    quote:
      "The equipment, facilities, and coaching are top-notch. I have seen real progress in both strength and energy levels.",
    name: "Rahul Sharma",
    role: "Member since 2023",
    image: heroImage,
  },
  {
    quote:
      "A great place to train, meet goals, and stay consistent. Highly recommend FZ Fitness.",
    name: "Anjali Verma",
    role: "Member since 2024",
    image: gymInteriorImage,
  },
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
        className="home-hero-section relative isolate overflow-hidden bg-[#0B0B0D]"
      >
        <div className="absolute inset-0 -z-20">
          <img
            src={heroBackgroundImage}
            alt="Athlete training with dumbbells in a Gym"
            className="h-full w-full object-cover object-[center_right] scale-[1.06]"
            fetchPriority="high"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,7,9,0.9)_0%,rgba(10,10,12,0.82)_26%,rgba(15,15,18,0.65)_42%,rgba(10,10,12,0.35)_70%,rgba(10,10,12,0.14)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_30%,rgba(245,30,43,0.08),transparent_18%)]" />

        <div
          id="about"
          className="mx-auto flex min-h-[520px] w-full max-w-7xl items-center px-5 py-14 sm:px-8 lg:min-h-[620px] lg:px-10"
        >
          <div className="max-w-[620px] rounded-[28px] border border-white/30 bg-white/8 p-3 shadow-[0_0_22px_rgba(0,0,0,0.18)] backdrop-blur-[2px] sm:p-5 lg:p-6">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#F51E2B] sm:text-xs">
              Your fitness. Your future.
            </p>
            <h1
              id="home-heading"
              className="max-w-[560px] text-[2rem] font-extrabold uppercase leading-[0.9] tracking-[-0.06em] text-white sm:text-[2.7rem] md:text-[3.4rem] lg:text-[4.8rem] lg:font-black"
            >
              <span className="block">Train</span>
              <span className="block text-white">
                smarter. <span className="text-[#F51E2B]">Live</span>
              </span>
              <span className="block text-[#F51E2B]">healthier.</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-6 text-white/80 sm:text-base">
              Build strength, boost energy, and stay consistent with expert
              coaching and a gym designed around your goals.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onJoin}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#F51E2B] px-6 py-3 text-sm font-bold text-white shadow-[0_15px_30px_rgba(245,30,43,0.4)] transition-colors hover:bg-[#D91421] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Join Now <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#pricing"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/75 bg-white/0 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore Plans
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Gym highlights"
        className="border-b border-[#E5E5E7] bg-white"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-4 py-4 sm:px-8 md:grid-cols-4 lg:px-10">
          {highlights.map(({ label, detail, Icon }, index) => (
            <div
              key={label}
              className={`flex min-h-[76px] items-center gap-3 rounded-md px-2 py-3 sm:px-4 ${
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
        id="pricing"
        aria-labelledby="pricing-heading"
        className="home-pricing-section bg-[#090A0D] py-12 text-white sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-8 text-center sm:mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F51E2B]">
              Membership plans
            </p>
            <h2
              id="pricing-heading"
              className="mt-3 text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl"
            >
              Flexible plans{" "}
              <span className="text-[#F51E2B]">for your goals</span>
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {pricingCards.map((plan) => (
              <div
                key={plan.name}
                className={`pricing-card relative overflow-hidden rounded-[20px] border p-5 shadow-[0_20px_40px_rgba(0,0,0,0.2)] sm:p-6 ${
                  plan.featured
                    ? "is-featured border-[#F51E2B]/50 bg-[#1A1D22] ring-1 ring-[#F51E2B]/40"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {plan.tag ? (
                  <div className="absolute right-4 top-4 rounded-full bg-[#F51E2B] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                    {plan.tag}
                  </div>
                ) : null}

                <div className="pt-6">
                  <p className="text-sm uppercase tracking-[0.18em] text-white/70">
                    {plan.name}
                  </p>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                      {plan.price}
                    </span>
                    <span className="pb-1 text-sm text-white/70">/ month</span>
                  </div>
                  <p className="mt-3 text-sm text-white/75">
                    {plan.description}
                  </p>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-3 text-sm text-white/80"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F51E2B]/20 text-[#F51E2B]">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={plan.featured ? onJoin : onMembershipPlans}
                  className={`mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm px-4 py-3 text-sm font-bold transition-colors ${
                    plan.featured
                      ? "bg-[#F51E2B] text-white hover:bg-[#D91421]"
                      : "border border-white/20 bg-transparent text-white hover:border-white hover:bg-white/5"
                  }`}
                >
                  {plan.featured ? "Join Now" : "Get Started"}{" "}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="value-heading"
        className="bg-[#F5F5F5] py-12 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-8 max-w-xl sm:mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F51E2B]">
              Why choose FZ Fitness
            </p>
            <h2
              id="value-heading"
              className="mt-3 text-3xl font-black uppercase leading-[1.05] tracking-tight text-[#0B0B0D] sm:text-5xl"
            >
              Train smarter{" "}
              <span className="text-[#F51E2B]">live healthier</span>
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#55555B] sm:text-base">
              We provide a premium fitness environment with everything you need
              to reach your goals.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {valuePillars.map(({ label, detail, Icon }) => (
              <div
                key={label}
                className="rounded-[18px] border border-[#E6E6E8] bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F51E2B]/10 text-[#F51E2B]">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-[#0B0B0D]">{label}</h3>
                <p className="mt-3 text-sm leading-6 text-[#55555B]">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="trainers-heading"
        className="home-trainers-section bg-[#0B0B0D] py-12 text-white sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-8 max-w-xl sm:mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F51E2B]">
              Meet our trainers
            </p>
            <h2
              id="trainers-heading"
              className="mt-3 text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl"
            >
              Experts who{" "}
              <span className="text-[#F51E2B]">support your journey</span>
            </h2>
            <p className="mt-4 text-sm leading-6 text-white/70 sm:text-base">
              Our certified trainers are here to guide, motivate, and help you
              reach your fitness goals.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {trainers.map((trainer) => (
              <article
                key={trainer.name}
                className="trainer-card group overflow-hidden rounded-[26px] border border-white/10 bg-[#14161A] shadow-[0_25px_55px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-[#F51E2B]/40"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/15 to-transparent" />
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#F51E2B] text-white shadow-[0_12px_30px_rgba(245,30,43,0.35)]">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                    Certified coach
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {trainer.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#F51E2B]">
                    {trainer.specialty}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {trainer.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-white/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="testimonials-heading"
        className="bg-[#F5F5F5] py-12 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-8 max-w-xl sm:mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F51E2B]">
              Member testimonials
            </p>
            <h2
              id="testimonials-heading"
              className="mt-3 text-3xl font-black uppercase leading-[1.05] tracking-tight text-[#0B0B0D] sm:text-5xl"
            >
              Real people <span className="text-[#F51E2B]">real results</span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="rounded-[20px] border border-[#E6E6E8] bg-white p-5 shadow-sm"
              >
                <div
                  className="mb-4 flex gap-1 text-[#F51E2B]"
                  aria-label="five star review"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={`${item.name}-${index}`}
                      className="h-4 w-4 fill-current"
                    />
                  ))}
                </div>
                <p className="text-sm leading-6 text-[#55555B]">
                  “{item.quote}”
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-[#0B0B0D]">{item.name}</p>
                    <p className="text-xs text-[#676C72]">{item.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
            <button
              type="button"
              onClick={onJoin}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-sm bg-[#F51E2B] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#D91421] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B0B0D]"
            >
              Join the Gym <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div id="facilities-cards" className="grid gap-3 sm:grid-cols-3">
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
        className="home-membership-section scroll-mt-20 bg-[#0B0B0D] text-white"
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
                Flexible plans for{" "}
                <span className="text-[#F51E2B]">your goals</span>
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
    <footer id="contact" className="home-footer scroll-mt-20 bg-[#0B0B0D] text-white">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#14161A] shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
          <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)] lg:p-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="sm:col-span-2 lg:col-span-1">
                <a href="/home" className="inline-flex items-center gap-2.5">
                  <img
                    src="/brand/fz-gym-logo.png"
                    alt="FZ Fitness logo"
                    className="h-11 w-11 object-contain"
                  />
                  <span className="text-base font-black tracking-tight">
                    FZ{" "}
                    <span className="font-semibold text-white/80">FITNESS</span>
                  </span>
                </a>
                <p className="mt-4 max-w-xs text-xs leading-5 text-white/65">
                  A focused place to train, build strength, and work toward your
                  fitness goals.
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-white/80">
                  Quick Links
                </h2>
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
                <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-white/80">
                  Facilities
                </h2>
                <ul className="grid gap-2.5 text-xs text-white/65">
                  {facilities.map((facility) => (
                    <li key={facility.title}>{facility.title}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative min-h-[220px] overflow-hidden rounded-[20px] border border-white/10 bg-[#0B0B0D]">
              <img
                src="/gym/fz-fitness-storefront.jpeg"
                alt="FZ Fitness storefront"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-[center_28%]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-black/25 to-black/10" />
              <div className="absolute inset-x-3 top-3 z-10 sm:inset-x-4 sm:top-4">
                <div className="footer-brand-badge w-full rounded-md border border-[#F51E2B]/35 bg-[#0B0B0D]/75 px-2 py-2 shadow-[0_12px_28px_rgba(245,30,43,0.14)] backdrop-blur-[2px] sm:px-3">
                  <div className="flex items-center justify-center gap-2 text-center sm:gap-3">
                    <span className="text-2xl font-black leading-none tracking-[-0.08em] text-white sm:text-4xl">
                      FZ
                    </span>
                    <span
                      className="h-8 w-[2px] bg-[#F51E2B] sm:h-10"
                      aria-hidden="true"
                    />
                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white sm:text-base">
                      FITNESS
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative flex h-full flex-col justify-end p-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F51E2B]">
                  Visit us
                </p>
                <p className="flex items-start gap-2 text-sm leading-6 text-white/75">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#F51E2B]" />
                  {location}
                </p>
                <button
                  type="button"
                  onClick={onJoin}
                  className="footer-cta mt-4 inline-flex w-fit items-center gap-2 rounded-sm bg-[#F51E2B] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#D91421]"
                >
                  Join the Gym <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 text-[11px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} FZ Fitness. All rights reserved.
          </span>
          <span>Train with purpose.</span>
        </div>
      </div>
    </footer>
  );
}
