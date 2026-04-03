/* ============================================================
   Sector page content — structured data for all 3 sector pages.
   Source: assets/files/playbook-wording-for-sector-pages.docx
   ============================================================ */

export interface RiskMitigation {
  risk: string
  mitigation: string
}

export interface SubSector {
  name: string
  image: string
  imageAlt: string
  image2: string
  image2Alt: string
  challenges: string[]
  position: string[]
  engagement?: string[]
  outcomes: string[]
  risks: RiskMitigation[]
  closingLine?: string
}

export interface SectorData {
  slug: string
  name: string
  metaTitle: string
  metaDescription: string
  heroImage: string
  heroImageAlt: string
  label: string
  headline: string
  intro: string
  pressureHeading: string
  pressureIntro?: string
  pressurePoints: string[]
  pressureClosing: string
  subSectors: SubSector[]
  supportHeading: string
  supportPoints: string[]
  supportOutcomes: string[]
  supportClosing: string
}

export const SECTORS: SectorData[] = [
  /* ──────────────────────────────────────────────
     1. PUBLIC SECTOR
     ────────────────────────────────────────────── */
  {
    slug: 'public-sector',
    name: 'Public sector',
    metaTitle: 'Public sector — Playbook Advisory Group',
    metaDescription:
      'Sponsor-side capital governance advisory for local authorities, NHS trusts, and education institutions. Clarity, control, and confidence across public capital programmes.',
    heroImage: '/images/sandbox/Students 1.jpg',
    heroImageAlt: 'Students in an institutional setting',
    label: 'Public sector',
    headline: 'Governance is often fragmented — while accountability remains absolute',
    intro:
      'Education and higher education institutions operate rolling capital programmes within constrained funding environments, live operational settings, and increasing regulatory expectations.',
    pressureHeading: 'Where pressure is being felt',
    pressureIntro:
      'Across Local Authorities, Healthcare, and Education estates, we consistently observe:',
    pressurePoints: [
      'Capital programmes approved on incomplete or optimistic assumptions',
      'Weak alignment between strategic intent and delivery structures',
      'Diffused accountability across boards, estates teams, and delivery partners',
      'Late visibility of cost, schedule, and scope deterioration',
      'Reactive assurance rather than embedded governance',
    ],
    pressureClosing:
      'This is not a capability issue — it is a system design issue. We do not step in when projects fail. We ensure the conditions for failure are designed out before delivery begins.',

    subSectors: [
      {
        name: 'Local authorities',
        image: '/images/sandbox/Town Centre 1.jpg',
        imageAlt: 'Town centre regeneration project',
        image2: '/images/sandbox/People 1.jpg',
        image2Alt: 'Advisory team in discussion',
        challenges: [
          'Delivering complex, place-based programmes under tightening financial constraints and increasing public scrutiny',
          'Managing diverse capital portfolios spanning housing, regeneration, civic infrastructure, and community assets',
          'Fragmented accountability across departments, stakeholders, and delivery partners',
          'Balancing political priorities, funding requirements, and long-term asset strategy',
          'Maintaining delivery momentum while navigating approvals, funding gateways, and stakeholder expectations',
        ],
        position: [
          'Structuring capital programmes around clear investment logic, funding pathways, and decision gateways',
          'Establishing governance frameworks that align stakeholders, roles, and accountability across portfolios',
          'Improving funding readiness through robust, evidence-led business cases and strategic alignment',
          'Providing independent challenge to ensure scope, risk, and delivery assumptions remain controlled',
        ],
        engagement: [
          'Strategic support across estate planning, regeneration strategy, and capital prioritisation',
          'Business case development and funding support aligned to HM Treasury and public sector requirements',
          'Governance, assurance, and oversight across complex, multi-project programmes',
          'Targeted intervention where programmes require clarity, coordination, or recovery',
        ],
        outcomes: [
          'Greater control across complex capital portfolios without increasing internal headcount',
          'Clear alignment between funding, policy objectives, and delivery outcomes',
          'Reduced delay across approvals and governance processes',
          'Increased confidence at the Cabinet, Board, and stakeholder level',
        ],
        risks: [
          { risk: 'Financial constraint and viability pressure', mitigation: 'Early-stage validation of scope, cost, and funding strategy' },
          { risk: 'Stakeholder misalignment', mitigation: 'Defined governance structures and clear accountability frameworks' },
          { risk: 'Approval and funding delays', mitigation: 'Structured gateway planning and business case readiness' },
          { risk: 'Delivery fragmentation', mitigation: 'Programme-level oversight and integrated governance across projects' },
        ],
        closingLine:
          'Local Authority programmes are not constrained by ambition. They are constrained by whether governance is structured to manage complexity, funding, and accountability in parallel.',
      },
      {
        name: 'Healthcare',
        image: '/images/sandbox/Hospital 1.jpg',
        imageAlt: 'Hospital building exterior',
        image2: '/images/sandbox/Health.jpg',
        image2Alt: 'Healthcare environment',
        challenges: [
          'Maintaining uninterrupted clinical operations while delivering capital investment within live healthcare environments',
          'Navigating complex, multi-layered approval pathways across Trust, ICS, and national funding structures',
          'Aligning estate investment with evolving clinical models, including the shift toward community-based and preventative care',
          'Managing legacy estate constraints alongside increasing requirements for digital infrastructure and sustainability',
        ],
        position: [
          'Structuring capital programmes in line with clinical strategy, funding requirements, and long-term service transformation',
          'Improving business case robustness and gateway readiness in line with HM Treasury and NHS expectations',
          'Clarifying governance architecture across Trusts, ICS/ICBs, and programme stakeholders',
          'Providing independent, evidence-led challenge to assumptions at key decision points',
        ],
        engagement: [
          'Strategic support across estate planning, capital prioritisation, and investment sequencing',
          'Business case development and funding readiness aligned to national policy and local system strategy',
          'Governance, assurance, and oversight across live capital and transformation programmes',
          'Targeted intervention where programmes require clarity, realignment, or recovery',
        ],
        outcomes: [
          'Clear alignment between capital investment, clinical strategy, and system-wide transformation objectives',
          'Improved confidence in funding submissions and approval processes',
          'Earlier identification and management of programme risk',
          'Strengthened Board and executive-level decision-making',
        ],
        risks: [
          { risk: 'Approval complexity', mitigation: 'Structured governance and gateway readiness' },
          { risk: 'Clinical misalignment', mitigation: 'Integration of service strategy with capital planning' },
          { risk: 'Operational disruption', mitigation: 'Phased delivery aligned to live healthcare environments' },
          { risk: 'Affordability pressure', mitigation: 'Early-stage validation of scope, cost, and investment logic' },
        ],
        closingLine:
          'The challenge is not defining the future of healthcare. It is ensuring that capital decisions made today are aligned, affordable, and deliverable within that future system.',
      },
      {
        name: 'Education',
        image: '/images/sandbox/education.jpg',
        imageAlt: 'Education campus building',
        image2: '/images/sandbox/Campus 2.webp',
        image2Alt: 'University campus',
        challenges: [
          'Safeguarding and maintaining operational continuity',
          'Complex funding structures with staged approvals',
          'Tension between estate ambition and financial constraints',
          'Increasing sustainability and digital infrastructure requirements',
        ],
        position: [
          'Supporting estate strategy and investment logic',
          'Improving funding readiness and business case robustness',
          'Clarifying governance structures and delegated authority',
          'Providing structured oversight across programme portfolios',
        ],
        engagement: [
          'Sponsor-side leadership across estate strategy',
          'Business case and funding support',
          'Governance and assurance across live programmes',
        ],
        outcomes: [
          'Improved alignment between funding, strategy, and delivery',
          'Reduced approval friction across governance gateways',
          'Greater confidence at board and stakeholder level',
        ],
        risks: [
          { risk: 'Funding complexity', mitigation: 'Structured bid and business case development' },
          { risk: 'Operational disruption', mitigation: 'Phased delivery and stakeholder planning' },
          { risk: 'Compliance exposure', mitigation: 'Governance aligned to sector and regulatory standards' },
        ],
      },
    ],

    supportHeading: 'How Playbook supports',
    supportPoints: [
      'Diagnose governance maturity across the capital lifecycle',
      'Identify systemic risks before they materialise financially or politically',
      'Strengthen decision-making frameworks at board and programme level',
      'Improve alignment between strategy, funding, and delivery structures',
      'Provide independent, evidence-led challenge',
    ],
    supportOutcomes: [
      'Greater certainty in capital investment decisions',
      'Earlier visibility of delivery risk',
      'Improved control without increasing bureaucracy',
      'Stronger board confidence and audit defensibility',
    ],
    supportClosing:
      'We do not replace delivery teams. We ensure the system within which they operate is fit for purpose, controlled, and accountable.',
  },

  /* ──────────────────────────────────────────────
     2. PRIVATE SECTOR
     ────────────────────────────────────────────── */
  {
    slug: 'private-sector',
    name: 'Private sector',
    metaTitle: 'Private sector — Playbook Advisory Group',
    metaDescription:
      'Sponsor-side capital governance advisory for developer-led schemes, regeneration, manufacturing, and commercial programmes. Strengthening early-stage decision quality.',
    heroImage: '/images/sandbox/Resi 1.jpg',
    heroImageAlt: 'Residential development',
    label: 'Private sector',
    headline: 'The critical point of failure is not delivery — it is early-stage decision quality',
    intro:
      'Private sector capital deployment is increasingly exposed to viability pressure, regulatory change, and delivery complexity — particularly in residential, mixed-use, and operationally constrained environments.',
    pressureHeading: 'Where value is won or lost',
    pressureIntro: 'Across developer-led and commercial programmes:',
    pressurePoints: [
      'Viability is often eroded before delivery begins',
      'Planning, regulatory, and safety requirements introduce hidden complexity',
      'Multi-phase schemes lack structured governance across decision gateways',
      'Commercial exposure increases due to fragmented sponsor oversight',
    ],
    pressureClosing:
      'The consequence is predictable: margin compression, delayed decisions, and reactive control.',

    subSectors: [
      {
        name: 'High-rise residential and developer-led schemes',
        image: '/images/sandbox/High rise buid.jpg',
        imageAlt: 'High-rise residential development',
        image2: '/images/sandbox/Resi 2.jpg',
        image2Alt: 'Residential scheme under construction',
        challenges: [
          'Viability erosion driven by scope movement and cost uncertainty',
          'Increasing regulatory and building safety requirements',
          'Coordination risk across multi-phase delivery strategies',
          'Misalignment between investors, developers, and delivery teams',
        ],
        position: [
          'Stress-testing viability assumptions before capital commitment',
          'Structuring phased governance and approval routes',
          'Integrating specialist advisers on behalf of the sponsor',
          'Preserving strategic intent across complex development cycles',
        ],
        outcomes: [
          'Protection of investor and sponsor confidence',
          'Improved certainty at planning and approval stages',
          'Reduced likelihood of late-stage commercial deterioration',
        ],
        risks: [
          { risk: 'Viability erosion', mitigation: 'Early-stage cost and risk assurance' },
          { risk: 'Regulatory burden', mitigation: 'Structured compliance pathways' },
          { risk: 'Stakeholder misalignment', mitigation: 'Clear leadership and governance frameworks' },
        ],
      },
      {
        name: 'Care homes and later living',
        image: '/images/sandbox/Hotel.jpg',
        imageAlt: 'Care home facility',
        image2: '/images/sandbox/Resi 3.jpg',
        image2Alt: 'Later living development',
        challenges: [
          'Aligning capital delivery with operational care models and long-term revenue performance',
          'Increasing regulatory and compliance requirements across healthcare, safety, and building standards',
          'Balancing development viability with quality of care and resident experience',
          'Integrating operator requirements, design, and delivery within constrained programmes',
          'Limited visibility of whole-life performance at early investment stages',
        ],
        position: [
          'Aligning development strategy with operational and revenue models from the outset',
          'Stress-testing viability against build cost, operational performance, and funding structures',
          'Structuring governance across development and operational interfaces',
          'Providing independent challenge to ensure long-term performance is not compromised by short-term decisions',
        ],
        engagement: [
          'Strategic alignment between operators, investors, and development teams',
          'Business case and investment support linked to operational outcomes',
          'Governance and oversight across development lifecycles',
          'Targeted intervention where schemes require realignment or risk mitigation',
        ],
        outcomes: [
          'Greater certainty between development outcomes and operational performance',
          'Reduced risk of misalignment between design, build, and care delivery',
          'Improved investor confidence in long-term asset performance',
          'Stronger control at key investment and delivery decision points',
        ],
        risks: [
          { risk: 'Operational misalignment', mitigation: 'Early integration of operator requirements and service models' },
          { risk: 'Regulatory complexity', mitigation: 'Structured compliance and governance pathways' },
          { risk: 'Viability pressure', mitigation: 'Whole-life cost and revenue assurance' },
          { risk: 'Delivery-performance disconnect', mitigation: 'Governance linking build outcomes to operational KPIs' },
        ],
        closingLine:
          'The risk is not in building care facilities. It is in whether those facilities are designed and governed to perform operationally over time.',
      },
      {
        name: 'Manufacturing',
        image: '/images/sandbox/Manufacturing 1.jpg',
        imageAlt: 'Manufacturing facility',
        image2: '/images/sandbox/Manufacturing 3.jpg',
        image2Alt: 'Industrial production environment',
        challenges: [
          'Balancing capital investment with live operational environments',
          'Complex integration of equipment, process, and build',
          'Programme compression driven by commercial timelines',
          'Limited internal capacity for structured capital governance',
        ],
        position: [
          'Structuring decision architecture for phased investment',
          'Strengthening executive-level visibility of risk and exposure',
          'Integrating engineering and delivery advisers within a sponsor-led model',
          'Maintaining control at critical commitment points',
        ],
        outcomes: [
          'Protection of operational continuity during capital works',
          'Improved control over programme risk and sequencing',
          'Stronger commercial discipline under time pressure',
        ],
        risks: [
          { risk: 'Operational disruption', mitigation: 'Detailed phasing and commissioning strategy' },
          { risk: 'Schedule risk', mitigation: 'Proactive programme control and recovery frameworks' },
          { risk: 'Health and safety exposure', mitigation: 'Embedded governance and assurance structures' },
        ],
      },
      {
        name: 'Commercial',
        image: '/images/sandbox/private sector.jpg',
        imageAlt: 'Commercial development',
        image2: '/images/sandbox/people 2.jpg',
        image2Alt: 'Commercial team discussion',
        challenges: [
          'Protecting commercial returns in volatile market and cost environments',
          'Aligning development strategy with occupier demand and leasing assumptions',
          'Managing capital deployment decisions under time and competitive pressure',
          'Inconsistent governance across portfolios and individual assets',
          'Over-reliance on delivery partners for cost, risk, and programme visibility',
        ],
        position: [
          'Structuring investment decisions around clear commercial and delivery logic',
          'Providing independent validation of cost, programme, and leasing assumptions',
          'Establishing consistent governance frameworks across assets and portfolios',
          'Ensuring disciplined decision-making at key commitment points',
        ],
        engagement: [
          'Strategic support across acquisition, development, and repositioning',
          'Governance and assurance across capital investment decisions',
          'Oversight of delivery structures to maintain commercial alignment',
          'Targeted intervention where value or control is at risk',
        ],
        outcomes: [
          'Improved predictability of commercial outcomes',
          'Reduced exposure to cost and programme volatility',
          'Stronger alignment between investment strategy and delivery execution',
          'Increased confidence for investors, lenders, and stakeholders',
        ],
        risks: [
          { risk: 'Market misalignment', mitigation: 'Validation of demand, leasing, and positioning assumptions' },
          { risk: 'Cost volatility', mitigation: 'Early-stage cost assurance and scenario testing' },
          { risk: 'Decision inconsistency', mitigation: 'Standardised governance across assets and portfolios' },
          { risk: 'Margin erosion', mitigation: 'Structured control at key commercial decision points' },
        ],
        closingLine:
          'Commercial performance is not determined at completion. It is determined by the quality of decisions made before capital is committed.',
      },
      {
        name: 'Regeneration',
        image: '/images/sandbox/Town Centre 2.jpg',
        imageAlt: 'Town centre regeneration',
        image2: '/images/sandbox/Resi 4.jpg',
        image2Alt: 'Regeneration neighbourhood',
        challenges: [
          'Coordinating multiple stakeholders across public and private sector interests',
          'Aligning funding, planning, and delivery strategies across long-term, phased programmes',
          'Managing political, community, and commercial expectations simultaneously',
          'Navigating planning complexity and evolving scope over extended timeframes',
          'Maintaining strategic intent across multiple phases and delivery cycles',
        ],
        position: [
          'Structuring programme-level governance across stakeholders, phases, and funding streams',
          'Aligning strategic objectives with delivery frameworks and decision gateways',
          'Providing independent oversight to maintain control and continuity over time',
          'Ensuring early-stage assumptions remain valid as programmes evolve',
        ],
        engagement: [
          'Strategic alignment across public-private partnerships and delivery models',
          'Governance and assurance across multi-phase regeneration programmes',
          'Support in funding strategy, business case development, and approvals',
          'Ongoing oversight to maintain programme integrity across delivery cycles',
        ],
        outcomes: [
          'Greater control across complex, multi-stakeholder environments',
          'Improved alignment between vision, funding, and delivery',
          'Reduced risk of fragmentation across phases and partners',
          'Sustained confidence from stakeholders, investors, and communities',
        ],
        risks: [
          { risk: 'Stakeholder misalignment', mitigation: 'Structured governance and clear accountability frameworks' },
          { risk: 'Phasing risk', mitigation: 'Programme-level oversight across all stages' },
          { risk: 'Planning and scope volatility', mitigation: 'Early-stage validation and continuous assurance' },
          { risk: 'Strategic drift', mitigation: 'Governance mechanisms that preserve long-term intent' },
        ],
        closingLine:
          'Regeneration does not fail at delivery. It fails when governance cannot hold alignment across time, stakeholders, and phases.',
      },
    ],

    supportHeading: 'How Playbook supports',
    supportPoints: [
      'Stress-testing viability assumptions before capital commitment',
      'Structuring phased governance and approval routes',
      'Integrating specialist advisers on behalf of the sponsor',
      'Preserving strategic intent across complex development cycles',
      'Providing independent challenge at key decision points',
    ],
    supportOutcomes: [
      'Protection of investor and sponsor confidence',
      'Improved certainty at planning and approval stages',
      'Reduced likelihood of late-stage commercial deterioration',
      'Stronger governance discipline across portfolios',
    ],
    supportClosing:
      'Playbook does not deliver private sector projects. It ensures the governance surrounding them is structured, controlled, and capable of protecting long-term value.',
  },

  /* ──────────────────────────────────────────────
     3. INFRASTRUCTURE
     ────────────────────────────────────────────── */
  {
    slug: 'infrastructure',
    name: 'Infrastructure',
    metaTitle: 'Infrastructure — Playbook Advisory Group',
    metaDescription:
      'Sponsor-side capital governance advisory for utilities, transport, logistics, and defence programmes. Strengthening governance across complex, long-duration infrastructure programmes.',
    heroImage: '/images/sandbox/Manufacturing 3.jpg',
    heroImageAlt: 'Large-scale infrastructure',
    label: 'Infrastructure',
    headline: 'Governance maturity often varies across programmes and sponsors',
    intro:
      'Infrastructure programmes operate at scale, with long time horizons and significant public and private scrutiny — yet governance maturity often varies across programmes and sponsors.',
    pressureHeading: 'Where pressure is being felt',
    pressureIntro: 'Across utilities, transport, and defence programmes:',
    pressurePoints: [
      'Complex stakeholder environments with unclear accountability',
      'Long-duration programmes with evolving scope and risk profiles',
      'Disconnect between strategic objectives and delivery controls',
      'Escalating cost and schedule pressure with late intervention',
      'Assurance processes that identify issues but do not resolve root causes',
    ],
    pressureClosing:
      'Playbook Advisory Group supports infrastructure clients in strengthening governance to improve control, resilience, and delivery confidence.',

    subSectors: [
      {
        name: 'Utilities',
        image: '/images/sandbox/water.jpg',
        imageAlt: 'Utility infrastructure',
        image2: '/images/sandbox/people 3.jpg',
        image2Alt: 'Engineering oversight team',
        challenges: [
          'Operating within highly regulated environments with strict compliance, reporting, and funding constraints',
          'Managing long-duration capital programmes with evolving scope, risk, and regulatory requirements',
          'Coordinating multiple delivery partners across complex technical interfaces',
          'Balancing cost control, resilience, and performance obligations',
          'Limited visibility of cumulative programme risk across portfolios',
        ],
        position: [
          'Structuring capital programmes around regulatory cycles, funding frameworks, and investment priorities',
          'Establishing clear governance aligned to accountability, assurance, and reporting requirements',
          'Improving visibility of programme-level risk, performance, and exposure',
          'Providing independent challenge to ensure assumptions remain valid over time',
        ],
        engagement: [
          'Strategic support across capital planning, prioritisation, and regulatory alignment',
          'Governance, assurance, and oversight across portfolios and major programmes',
          'Integration support across multiple delivery partners and technical interfaces',
          'Targeted intervention where control, clarity, or performance is at risk',
        ],
        outcomes: [
          'Greater control across complex, regulated capital programmes',
          'Improved alignment between regulatory expectations and delivery outcomes',
          'Earlier identification of systemic risks across portfolios',
          'Increased confidence at Board, regulator, and stakeholder level',
        ],
        risks: [
          { risk: 'Regulatory misalignment', mitigation: 'Governance structured around compliance and reporting cycles' },
          { risk: 'Programme complexity', mitigation: 'Portfolio-level oversight and integration frameworks' },
          { risk: 'Risk visibility gaps', mitigation: 'Structured reporting and assurance mechanisms' },
          { risk: 'Long-duration uncertainty', mitigation: 'Ongoing validation of assumptions and strategy' },
        ],
        closingLine:
          'In regulated environments, compliance is expected. Control is what differentiates successful programmes.',
      },
      {
        name: 'Highways and transport',
        image: '/images/sandbox/city.jpg',
        imageAlt: 'Urban transport infrastructure',
        image2: '/images/sandbox/Resi.jpg',
        image2Alt: 'Urban development corridor',
        challenges: [
          'Managing large-scale programmes with multiple interfaces across assets, systems, and stakeholders',
          'Coordinating delivery across contractors, operators, and public bodies',
          'Maintaining alignment between strategic objectives and delivery execution',
          'Limited real-time visibility of emerging risks across interconnected workstreams',
          'Pressure to maintain programme timelines under public and political scrutiny',
        ],
        position: [
          'Structuring oversight across interfaces, workstreams, and delivery partners',
          'Establishing clear accountability and decision-making frameworks',
          'Improving visibility of programme performance, risk, and interdependencies',
          'Providing independent challenge to ensure alignment is maintained throughout delivery',
        ],
        engagement: [
          'Programme-level governance and integration support',
          'Oversight across multi-contractor and multi-interface environments',
          'Assurance and reporting aligned to stakeholder and funding expectations',
          'Targeted intervention where misalignment or delivery risk emerges',
        ],
        outcomes: [
          'Improved coordination across complex infrastructure systems',
          'Earlier identification and resolution of interface risks',
          'Greater confidence in programme performance and delivery trajectory',
          'Stronger alignment between strategic intent and delivery outcomes',
        ],
        risks: [
          { risk: 'Interface failure', mitigation: 'Structured integration and governance across workstreams' },
          { risk: 'Delayed risk visibility', mitigation: 'Enhanced reporting and assurance frameworks' },
          { risk: 'Stakeholder complexity', mitigation: 'Clear accountability and decision structures' },
          { risk: 'Programme slippage', mitigation: 'Early intervention through governance and oversight' },
        ],
        closingLine:
          'Transport programmes do not fail due to scale. They fail when interfaces are not governed, aligned, and controlled.',
      },
      {
        name: 'Logistics',
        image: '/images/sandbox/Manufacturing 2.jpg',
        imageAlt: 'Logistics and warehousing facility',
        image2: '/images/sandbox/Leamington spa.jpg',
        image2Alt: 'Distribution and logistics setting',
        challenges: [
          'Delivering capital projects at speed to meet operational and market demands',
          'Aligning development timelines with occupier requirements and supply chain readiness',
          'Managing cost, programme, and specification under compressed delivery schedules',
          'Limited governance structures due to prioritisation of speed and execution',
          'Over-reliance on delivery partners for programme and risk visibility',
        ],
        position: [
          'Structuring decision-making frameworks aligned to accelerated programmes',
          'Providing independent validation of cost, programme, and delivery assumptions',
          'Establishing governance that supports speed while maintaining control',
          'Ensuring visibility of risk and exposure at sponsor level',
        ],
        engagement: [
          'Governance and assurance across fast-paced capital delivery environments',
          'Strategic alignment between development, operations, and commercial objectives',
          'Oversight of delivery partners to maintain control under time pressure',
          'Targeted intervention where delivery speed introduces risk',
        ],
        outcomes: [
          'Maintenance of delivery pace without loss of control',
          'Improved confidence in programme certainty and cost outcomes',
          'Stronger alignment between operational readiness and capital delivery',
          'Reduced exposure to late-stage disruption or rework',
        ],
        risks: [
          { risk: 'Speed-driven risk', mitigation: 'Governance frameworks aligned to accelerated delivery' },
          { risk: 'Operational misalignment', mitigation: 'Integration of occupier and operational requirements' },
          { risk: 'Cost and programme uncertainty', mitigation: 'Early validation and continuous oversight' },
          { risk: 'Control gaps', mitigation: 'Sponsor-level visibility and structured decision-making' },
        ],
        closingLine:
          'Speed delivers advantage. Control ensures that the advantage is not lost during delivery.',
      },
      {
        name: 'Defence',
        image: '/images/sandbox/city 2.jpg',
        imageAlt: 'Institutional infrastructure',
        image2: '/images/sandbox/People 4.png',
        image2Alt: 'Governance and oversight',
        challenges: [
          'Operating within highly controlled, security-sensitive environments with strict compliance requirements',
          'Managing complex approval processes and layered governance structures',
          'Balancing confidentiality, operational requirements, and delivery efficiency',
          'Coordinating multiple stakeholders across government, defence, and the supply chain',
          'Ensuring governance frameworks remain effective under evolving programme demands',
        ],
        position: [
          'Structuring governance frameworks that balance rigour with operational flexibility',
          'Clarifying roles, responsibilities, and decision-making authority across stakeholders',
          'Improving visibility of programme risk and control without compromising security',
          'Providing independent, evidence-led challenge within defined governance boundaries',
        ],
        engagement: [
          'Strategic support across capital planning and programme structuring',
          'Governance and assurance aligned to defence and government requirements',
          'Oversight across complex stakeholder and delivery environments',
          'Targeted intervention where clarity, control, or alignment is required',
        ],
        outcomes: [
          'Stronger control within complex and highly regulated environments',
          'Improved alignment between strategic objectives and delivery structures',
          'Increased confidence in governance without compromising operational requirements',
          'Enhanced ability to manage complexity within secure environments',
        ],
        risks: [
          { risk: 'Governance rigidity', mitigation: 'Flexible frameworks that maintain control while enabling delivery' },
          { risk: 'Stakeholder complexity', mitigation: 'Clear accountability and structured decision-making' },
          { risk: 'Limited risk visibility', mitigation: 'Controlled reporting and assurance mechanisms' },
          { risk: 'Approval delays', mitigation: 'Streamlined governance aligned to programme needs' },
        ],
        closingLine:
          'In defence, governance must be rigorous. Its effectiveness depends on whether it is also usable, clear, and aligned to delivery reality.',
      },
    ],

    supportHeading: 'How Playbook supports',
    supportPoints: [
      'Capital governance diagnostics across programme lifecycles',
      'Identification of systemic risks and control gaps',
      'Strengthening of oversight, assurance, and decision frameworks',
      'Alignment between strategic intent and delivery execution',
      'Board-level reporting and clarity',
    ],
    supportOutcomes: [
      'Greater control across complex, long-duration programmes',
      'Improved resilience to change and external pressure',
      'Earlier intervention on emerging risks',
      'Strengthened sponsor confidence and accountability',
    ],
    supportClosing:
      'We do not deliver infrastructure. We ensure the governance surrounding it is robust, transparent, and capable of supporting successful outcomes at scale.',
  },
]

export function getSectorBySlug(slug: string): SectorData | undefined {
  return SECTORS.find((s) => s.slug === slug)
}

export function getAllSectorSlugs(): string[] {
  return SECTORS.map((s) => s.slug)
}
