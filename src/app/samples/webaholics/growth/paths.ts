export const growthPaths = {
  leads: {
    label: "Websites & lead generation", goal: "Generate more leads", audience: "For law firms & service businesses", headline: "More of the right inquiries. A clearer path to becoming a client.",
    intro: "Our team connects your website, SEO and paid advertising to the calls, consultations and onboarding that grow your business.",
    problem: "Traffic is only useful when it reaches the right people and helps them take the next step. We look at the full journey from search to signed client.",
    steps: ["Website & landing pages", "GA4 & Search Console", "SEO & Google Ads", "Inquiry & consultation", "Client onboarding"],
    work: [["Attract the right prospects", "Search strategy, useful content and focused campaigns built around your services and audience."],["Make the next step easier", "Clear pages, stronger calls to action, intuitive forms and a smoother booking process."],["Connect marketing to the outcome", "Track qualified inquiries, follow-up and onboarding so decisions reflect more than traffic."]],
    measures: ["Qualified inquiries", "Booked consultations", "Cost per qualified lead", "Inquiry-to-client conversion"],
    cta: "Review my lead-generation process", examples: "Law firms · Professional services · Local service businesses"
  },
  ecommerce: {
    label: "Ecommerce growth", goal: "Grow online sales", audience: "For brands, retailers & distributors", headline: "Bring in more shoppers. Give them more reasons to buy again.",
    intro: "Our team combines SEO, paid media and ecommerce development to improve discovery, conversion and the experience after checkout.",
    problem: "Growth can stall anywhere between finding a product and receiving it. We connect acquisition, the shopping experience and the operation behind each order.",
    steps: ["SEO & paid media", "Product discovery", "Cart & checkout", "Orders & shipping", "Service & repeat sales"],
    work: [["Acquire customers with intent", "Product-led SEO and paid campaigns evaluated against conversion, acquisition cost and margin."],["Improve the shopping experience", "Clear categories, product information, mobile navigation and checkout flows that help customers buy."],["Deliver on the purchase", "Connect orders, fulfillment, shipping updates, live chat and customer service around the same journey."]],
    measures: ["Conversion rate", "Acquisition cost", "Contribution profit", "Repeat purchase rate"],
    cta: "Review my ecommerce growth", examples: "Consumer brands · Online retailers · Multi-channel commerce"
  },
  applications: {
    label: "Custom applications", goal: "Build a custom application", audience: "For businesses with a specific software need", headline: "Your idea. Your requirements. A team to bring it to life.",
    intro: "We design and build custom software for the way your business works—or the online service you want to launch.",
    problem: "When your requirements do not fit an off-the-shelf product, start with the people using the software and the work it needs to do. We turn that into a focused, testable first release.",
    steps: ["Requirements & discovery", "User experience", "Focused first release", "Integrations & launch", "Measure & improve"],
    work: [["Define what matters first", "Map users, permissions, workflows and requirements. Agree on the smallest release that proves the idea."],["Build around your business", "Custom interfaces and integrations for learning platforms, finance workflows, legal processes or subscription services."],["Launch with a path forward", "Test the critical journeys, establish ownership and improve from user feedback and actual usage."]],
    measures: ["User adoption", "Workflow completion", "Time saved", "Subscription revenue, where relevant"],
    cta: "Discuss my application", examples: "LMS · Finance workflows · Subscription services · Legal applications"
  }
} as const;
