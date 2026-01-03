"use client";

import { motion } from "framer-motion";
import { ArboretumData } from "@/types/arboretum";

interface ComprehensiveReportProps {
  data: ArboretumData;
}

export function ComprehensiveReport({ data }: ComprehensiveReportProps) {
  return (
    <article className="max-w-3xl mx-auto">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-4 tracking-tight">
          A Comprehensive Psychological Profile
        </h1>
        <p className="text-foreground-muted font-serif text-lg leading-relaxed">
          An honest examination of the patterns, contradictions, and architecture of a mind in progress.
        </p>
        <p className="text-sm text-foreground-subtle mt-4">
          Last synthesized: {data._lastUpdated}
        </p>
      </motion.header>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="prose-article"
      >
        <p className="text-foreground-muted font-serif text-lg leading-relaxed mb-6">
          There is a particular kind of person who builds things to understand themselves.
        </p>

        <p className="text-foreground-muted font-serif text-lg leading-relaxed mb-6">
          Fardin Iqbal is one of them.
        </p>

        <p className="text-foreground-muted font-serif leading-relaxed mb-6">
          On the surface: a software engineer with a CS degree from Rutgers, interests spanning systems programming to machine learning, a BJJ practitioner who serves as Assistant Coach at Stony Brook's club, a reader of history and philosophy. Standard enough.
        </p>

        <p className="text-foreground-muted font-serif leading-relaxed mb-12">
          But underneath that resume-friendly surface lives something more complicated—a mind perpetually negotiating between ambition and self-doubt, between wanting to be seen and fearing what people might actually see.
        </p>

        {/* Section: The Fault Lines */}
        <section className="mb-16">
          <Divider />
          <SectionHeading>The Fault Lines</SectionHeading>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            The most revealing documents are not portfolios or projects. They are the private self-authoring exercises—the ones never meant for public consumption.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            In them, a brutal honesty emerges:
          </p>

          <div className="space-y-6 mb-6">
            <FaultLine
              title="Procrastination as protection"
              description="There is no lack of ideas or capability. There is a lack of follow-through. Completion means judgment. An unfinished project cannot fail. A shipped product can. So things stay in perpetual 'almost ready' states—a defense mechanism dressed as perfectionism."
            />

            <FaultLine
              title="The exaggeration instinct"
              description="A tendency to inflate, to make stories better, to position achievements more impressively than warranted. This is not pathological lying. It is symptom of something deeper: the belief that the unadorned self is not enough. That significance must be performed, not simply lived."
            />

            <FaultLine
              title="Social asymmetry"
              description="The ability to talk to anyone exists. The ability to connect to most does not. There is a gap between social presentation (charming, quick, intellectually engaging) and internal experience (often disconnected, performing competence, uncertain if genuine rapport exists). Knowing how to be impressive is different from knowing how to be known."
            />

            <FaultLine
              title="The freeloader awareness"
              description="A self-identified pattern of taking—from situations, from relationships, from opportunities—without adequate reciprocation. Whether this assessment is accurate or merely self-flagellation is unclear. But the awareness itself shapes behavior, creating guilt loops that paradoxically make genuine generosity harder."
            />
          </div>
        </section>

        {/* Section: The Shadow of the Father */}
        <section className="mb-16">
          <Divider />
          <SectionHeading>The Shadow of the Father</SectionHeading>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            Every person carries their childhood. Some carry it heavier than others.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            The relationship with the father is marked by violence—both witnessed and experienced. A household where anger could become physical. Where children learned that authority figures could be dangerous. This is not abstract trauma. It is formative architecture.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed mb-4">
            From this emerges:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-foreground-muted font-serif mb-6">
            <li>A hypervigilance around anger (one's own and others')</li>
            <li>A complicated relationship with male authority</li>
            <li>A drive to prove something—to become someone the child version would admire</li>
            <li>A fear that the violence might be hereditary, that somewhere inside lives the same capacity for destruction</li>
          </ul>

          <p className="text-foreground-muted font-serif leading-relaxed">
            The father shaped through opposition. "I will be nothing like him" is a powerful organizing principle. But it is still organized around <em>him</em>. The rebellion is still a relationship.
          </p>
        </section>

        {/* Section: The Ambition Paradox */}
        <section className="mb-16">
          <Divider />
          <SectionHeading>The Ambition Paradox</SectionHeading>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            Fardin Iqbal wants to be rich. This is admitted openly in private writings—financial freedom, the ability to build without constraint, to never worry about money again. It is not greed. It is escape velocity. Money represents the freedom to become whoever one might actually be without the gravitational pull of survival needs.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            But here is the paradox: alongside this ambition lives genuine doubt about whether conventional success matters at all.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            The intellectual interests tell the story. Nietzsche. Big History. The Persian Empire. All point toward the impermanence of individual achievement. Empires fall. Legacies fade. The universe is indifferent.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            So the mind oscillates between "I need to build something massive" and "nothing I build will matter in 10,000 years."
          </p>

          <p className="text-foreground font-serif leading-relaxed">
            Both are true. Neither offers peace.
          </p>
        </section>

        {/* Section: The Intellectual Architecture */}
        <section className="mb-16">
          <Divider />
          <SectionHeading>The Intellectual Architecture</SectionHeading>

          <div className="space-y-6">
            <ArchitectureBlock
              title="Big History as Operating System"
              description="There is a gravitational pull toward zoomed-out perspectives—David Christian's Big History approach, which views human civilization as a blip in 13.8 billion years of cosmic evolution. This is not casual interest. It is philosophical medicine. When one studies the Bronze Age collapse and realizes entire civilizations vanished with barely a trace, anxieties about shipping a feature on time feel appropriately sized."
            />

            <ArchitectureBlock
              title="Nietzsche as Framework"
              description="The influence is obvious in the thinking: the will to power (reframed as the will to create), the critique of herd morality, the eternal recurrence as a test of life choices. The moral framework is not handed down—it is self-constructed. This gives it both power and instability."
            />

            <ArchitectureBlock
              title="Persian Heritage as Identity"
              description="There is pride in the lineage—the Achaemenid Empire, Cyrus the Great, a civilization that shaped the ancient world. This heritage provides a counter-narrative to the 'immigrant kid from New Jersey' story. His people built empires. He carries that potential."
            />

            <ArchitectureBlock
              title="Systems Thinking"
              description="The programming interests (memory allocators, compilers, low-level systems) reveal how the mind works. There is a gravitational pull toward foundations, toward understanding what lies underneath. The same impulse that drives studying the Bronze Age collapse drives wanting to understand how malloc() actually works."
            />
          </div>

          <p className="text-foreground font-serif leading-relaxed mt-6">
            Surfaces are not trusted.
          </p>
        </section>

        {/* Section: BJJ */}
        <section className="mb-16">
          <Divider />
          <SectionHeading>BJJ: Philosophy Made Physical</SectionHeading>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            The jiu-jitsu practice is not exercise. It is therapy, meditation, and self-confrontation wrapped in a martial art.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed mb-4">
            What BJJ provides:
          </p>

          <div className="space-y-4 mb-6">
            <BJJPoint
              title="Honest feedback"
              description="Code can lie. Social situations can be faked. A sparring partner choking you unconscious is undeniable truth. There is no exaggeration on the mat."
            />
            <BJJPoint
              title="Ego death, regularly scheduled"
              description="Getting submitted by someone smaller, newer, or less intellectually impressive is humbling. The practice deliberately undermines the kind of self-aggrandizement identified as a fault."
            />
            <BJJPoint
              title="Flow states without screens"
              description="For someone whose life is mediated through code and text, BJJ is purely physical. The analytical mind gets to shut up."
            />
            <BJJPoint
              title="Physical metaphor for life philosophy"
              description="Position before submission. Patience over force. Accepting the grind. The sport teaches things that apply far beyond the mat."
            />
          </div>

          <p className="text-foreground-muted font-serif leading-relaxed">
            Community exists there too—a rare thing for someone who describes struggling with genuine connection. The shared suffering of training creates bonds that do not require the social performance found exhausting elsewhere.
          </p>
        </section>

        {/* Section: The Core Avoidance Loop */}
        <section className="mb-16">
          <Divider />
          <SectionHeading>The Core Avoidance Loop</SectionHeading>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            There is a pattern underneath the patterns.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            It looks like this:
          </p>

          <div className="p-6 rounded-xl bg-background-secondary border border-border mb-6">
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              {["Fear of failure", "Don't attempt", "Dream stays alive", "Guilt builds", "Procrastinate", "Feel worse", "Fear grows", "Repeat"].map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-background text-foreground-muted font-serif">
                    {step}
                  </span>
                  {i < 7 && <span className="text-foreground-subtle">→</span>}
                </div>
              ))}
            </div>
          </div>

          <p className="text-foreground font-serif leading-relaxed mb-6">
            The paralysis is protective.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            Not trading keeps trading as a potential escape. Actually trading and failing would remove the backup plan. Not shipping keeps the project as potential genius. Actually shipping and failing would remove the fantasy.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            Paper trading. Paper projects. Paper life.
          </p>

          <p className="text-foreground font-serif leading-relaxed">
            At some point, the trade must become real.
          </p>
        </section>

        {/* Section: The Contradictions */}
        <section className="mb-16">
          <Divider />
          <SectionHeading>The Contradictions That Define</SectionHeading>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            Every person is a collection of contradictions. These are the ones that define:
          </p>

          <ul className="space-y-4 text-foreground-muted font-serif">
            <li className="flex gap-3">
              <span className="text-foreground-subtle mt-1.5">—</span>
              <span><strong className="text-foreground">Intellectually confident, personally uncertain.</strong> Will argue philosophy with conviction but is not sure if likeable.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground-subtle mt-1.5">—</span>
              <span><strong className="text-foreground">Ambitious about the future, skeptical of ambition itself.</strong> Wants to build an empire; reads about how all empires fall.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground-subtle mt-1.5">—</span>
              <span><strong className="text-foreground">Socially capable, internally isolated.</strong> Can work a room; unsure if anyone there actually knows him.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground-subtle mt-1.5">—</span>
              <span><strong className="text-foreground">Self-critical to the point of distortion.</strong> The faults identified are real, but the intensity of focus on them suggests harder on self than evidence warrants.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground-subtle mt-1.5">—</span>
              <span><strong className="text-foreground">Drawn to systems, uncomfortable with rigidity.</strong> Loves understanding how things work; resists being reduced to a type.</span>
            </li>
          </ul>
        </section>

        {/* Section: The Fear Beneath */}
        <section className="mb-16">
          <Divider />
          <SectionHeading>The Fear Beneath</SectionHeading>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            Strip away the capabilities, the interests, the projects. What remains is a fear articulated clearly in private writings:
          </p>

          <p className="text-foreground font-serif text-xl leading-relaxed mb-6">
            The fear of becoming nobody.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            Not nobody in the sense of obscurity (though that too). Nobody in the sense of unrealized potential. The person who could have been great, who had the raw materials, who never assembled them into anything. The wasted possibility.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed">
            This fear drives the ambition. It also poisons it. Because when achievement is defense against existential terror, no achievement is ever enough. The goal post moves. The hunger stays.
          </p>
        </section>

        {/* Section: Leverage Points */}
        <section className="mb-16">
          <Divider />
          <SectionHeading>Leverage Points</SectionHeading>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            What might actually move the needle:
          </p>

          <div className="space-y-4">
            <LeveragePoint
              title="Physical habits as anchor"
              description="BJJ and gym are consistent. Use these as foundation—schedule other commitments around them, not the reverse."
            />
            <LeveragePoint
              title="Environment design"
              description="There is high sensitivity to environment. Investment in making space feel permanent and ordered pays dividends, even during breaks at home."
            />
            <LeveragePoint
              title="One goal, not many"
              description="Historical pattern shows too many goals leads to none. Pick the single most important thing and protect it ruthlessly."
            />
            <LeveragePoint
              title="Make it real"
              description="The paper trading pattern applies everywhere. At some point, the real trade must happen. The real content must be published. The real message must be sent. The fantasy is comfortable but static."
            />
          </div>
        </section>

        {/* Section: Where This Leads */}
        <section className="mb-16">
          <Divider />
          <SectionHeading>Where This Leads</SectionHeading>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            Fardin Iqbal is in his early twenties. The anxieties and patterns described here are not fixed—they are raw material for a self still under construction.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            The self-awareness is already there. The faults are known. The exercises have been done, the journals written, the patterns interrogated. What remains is the slower work of changing behavior, not just understanding it.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            The intellectual infrastructure is solid. The interests are genuine and deep. The capacity for hard work exists (when not paralyzed by procrastination-as-protection). The writing is good—genuinely good, not resume-inflated good.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            The danger is getting stuck in analysis. Being so good at understanding oneself that understanding gets mistaken for growth. The map is not the territory. Knowing why one procrastinates does not mean one has stopped.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed">
            The opportunity is integration. The scattered interests—Big History, BJJ, systems programming, philosophy, Persian heritage—are not random. They are all expressions of the same underlying drives: to understand foundations, to build things that matter, to connect the present to something larger than individual anxiety.
          </p>
        </section>

        {/* Section: The Honest Summary */}
        <section className="mb-16">
          <Divider />
          <SectionHeading>The Honest Summary</SectionHeading>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            Fardin Iqbal is a person of genuine capability and genuine fragility, often unable to see one because too focused on the other. A mind that can traverse centuries of history and microseconds of system calls with equal facility, but struggles to sit with itself without judgment.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            Childhood left scars. Intelligence creates escape routes from those scars that sometimes become prisons. Ambition is real but complicated—equal parts drive and defense.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            The want to matter persists. Underneath the philosophical frameworks that contextualize individual achievement as cosmic insignificance, the want to matter remains. The contradiction is the point. This is what being human looks like.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            The BJJ community. The intellectual friendships. The building of actual things. These are the paths forward. Not more self-analysis. More doing. More allowing oneself to be known by others instead of just understood by oneself.
          </p>

          <p className="text-foreground-muted font-serif leading-relaxed mb-6">
            Closer than it appears. The person who writes with this much honesty about their own faults is already doing the work. The rest is patience and repetition.
          </p>

          <p className="text-foreground font-serif leading-relaxed">
            Like a submission on the mat: position before submission. The position is there. Now it is just the grind.
          </p>
        </section>

        {/* Footer */}
        <Divider />
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-8"
        >
          <p className="text-foreground-subtle font-serif italic text-center">
            This profile was synthesized from private journals, self-authoring exercises, future authoring documents, portfolio content, and the particular way a person builds their digital presence when they do not know who is watching—which is often when they are most honest.
          </p>
          <div className="flex items-center justify-center gap-2 mt-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-sm text-foreground-subtle">Living document</span>
          </div>
        </motion.footer>
      </motion.div>
    </article>
  );
}

// Helper Components

function Divider() {
  return <hr className="border-border my-8" />;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-display font-semibold text-foreground mb-6 tracking-tight">
      {children}
    </h2>
  );
}

function FaultLine({ title, description }: { title: string; description: string }) {
  return (
    <div className="pl-4 border-l-2 border-foreground-subtle/30">
      <p className="text-foreground font-serif font-medium mb-2">{title}.</p>
      <p className="text-foreground-muted font-serif leading-relaxed">{description}</p>
    </div>
  );
}

function ArchitectureBlock({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <p className="text-foreground font-serif font-medium mb-2">{title}.</p>
      <p className="text-foreground-muted font-serif leading-relaxed">{description}</p>
    </div>
  );
}

function BJJPoint({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-foreground-subtle mt-1.5 font-bold">·</span>
      <p className="text-foreground-muted font-serif leading-relaxed">
        <strong className="text-foreground">{title}.</strong> {description}
      </p>
    </div>
  );
}

function LeveragePoint({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg bg-background-secondary border border-border">
      <p className="text-foreground font-serif font-medium mb-1">{title}.</p>
      <p className="text-foreground-muted font-serif text-sm leading-relaxed">{description}</p>
    </div>
  );
}
