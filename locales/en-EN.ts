export const enEN = {
  common: {
    name: "Ruben van Gemeren",
    title: "Full Stack Developer",
    summary: "Recent graduate from KTH Royal Institute of Technology in Stockholm, Sweden. Specialized in Distributed Systems & Data Processing. Currently working as a Full Stack Developer at Spaux, building the first self-service portal for telecom management.",
    nav: {
      home: "Home",
      projects: "Projects",
      experience: "Experience",
      about: "About",
    },
    links: {
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Email",
    },
    present: "Present",
    ariaLabels: {
      selectLanguage: "Select language",
      selectTheme: "Select theme",
    },
    notFound: {
      title: "404",
      message: "Page not found",
      goHome: "Go Home",
    },
    metadata: {
      title: "Ruben van Gemeren - Software Engineer",
      description: "Portfolio of a software engineer specializing in distributed systems, large-scale data processing.",
    },
  },
  pages: {
    home: {
      featuredProjects: "Featured Projects",
      highlights: {
        highlight1: {
          title: "Distributed Stream Processing with CRDTs",
          description: "Developed Holon Streaming, a decentralized stream processing system that scales global aggregations using Windowed CRDTs to remove coordination bottlenecks.",
        },
        highlight2: {
          title: "ML Pipelines for weather forecasting & FPL predictions",
          description: "Developed ML systems with Hopsworks: a serverless air-quality predictor for PM2.5 levels and an FPL player performance model using Python and PyTorch for weekly point forecasts.",
        },
        highlight3: {
          title: "Real-time public transport tracking",
          description: "Developed a real-time public transport tracking system using European NeTEx format for boats in Rotterdam.",
        },
      },
    },
    about: {
      title: "About",
      background: {
        title: "Background",
        description: "I'm a KTH graduate originally from the Netherlands, with a master's in Distributed Systems and Data Processing. During my studies, I interned at RISE and contributed to ongoing research now turning into a paper. I have around two to three years of experience, and currently I'm working as a full-stack developer at Spaux, building a multi-tenant self-service portal in Laravel from the ground up.",
      },
      values: {
        title: "Values & Approach",
        handsOn: {
          label: "Hands-on Engineering:",
          text: "I believe in truly understanding the code I write. My best work comes from getting my hands dirty and diving into the implementation details.",
        },
        functionOverForm: {
          label: "Function Over Form:",
          text: "Clean code matters, but over-optimizing the codebase can slow progress and hurt product quality. The real priority is delivering new, well-functioning features, clean solutions naturally follow when built with intent and responsibility.",
        },
        fullStack: {
          label: "Full-Stack Enthusiast:",
          text: "I'm not limited to just frontend or backend. I love being involved in every stage of development. From designing UIs to optimizing large-scale data systems.",
        },
        practicalInnovation: {
          label: "Practical Innovation:",
          text: "I enjoy translating technical requirements to real-world applications that people actually enjoy to use. For me, it's all about adding real value through thoughtful design and reliable engineering.",
        },
      },
      education: {
        title: "Education",
      },
    },
    projects: {
      title: "Projects",
      description: "A selection of projects focusing on distributed systems, data platforms, and infrastructure.",
    },
    experience: {
      title: "Experience",
      description: "Building scalable, reliable systems and data platforms at scale.",
    },
  },
  data: {
    projects: {
      "holon-streaming": {
        title: "Stream Processing with Windowed CRDTs",
        subtitle: "Create decentralized stream processing system that scales globally with Windowed CRDTs",
        tags: ["Distributed Systems", "Streaming", "CRDTs"],
        challenge: "Traditional stream processing systems require statically defined coordination, which becomes a bottleneck as data scales. This limits scalability and limits the ability to process data in real-time.",
        approach: "Creating a decentralized system using Windowed CRDTs as the underlying data structure, utilizing strong eventual consistency to achieve a high throughput and low latency, with fully decentralized recovery.",
        impact: "Reduced latency by 3.8x and increased throughput by 11x and 5x failure recovery compared to state of the art systems.",
        metrics: {
          label: "Latency (ms)",
        },
      },
      "air-quality-predictor": {
        title: "ML Pipeline for weather forecasting",
        subtitle: "Automated weather forecasting pipeline for PM2.5 levels in Rotterdam",
        tags: ["Machine Learning", "Feature Engineering", "Pipeline"],
        challenge: "Automating the creation and updating of a ML predictor model based on sensor data for predicting PM2.5 levels in Rotterdam.",
        approach: "Creating a pipeline that creates features from sensor data and trains a regression model using PyTorch, which is updated every day to predict the next week's PM2.5 levels.",
        impact: "Create a webpage that displays the predicted PM2.5 levels in Rotterdam, with a live update every day.",
      },
      "fpl-player-performance": {
        title: "FPL Player Performance Model",
        subtitle: "Predict the performance of FPL players based on their historical data",
        tags: ["Machine Learning", "Feature Engineering", "Pipeline"],
        challenge: "Automating the creation and updating of a ML predictor model based on historical data for predicting the performance of FPL players.",
        approach: "Creating a pipeline that creates features from historical data and trains a regression model using PyTorch, which is updated every week to predict the next week's performance of FPL players.",
        impact: "Create a webpage that displays the predicted performance of FPL players, with a live update every week. Based on real game data, the model can be updated to predict the performance of FPL players more accurately.",
      },
      "live-boat-tracking": {
        title: "Real-time Boat Tracking",
        subtitle: "Display real-time public transport on boats driving in Rotterdam",
        tags: ["Real-time", "Public Transport", "Embedded Systems"],
        challenge: "Processing and displaying real-time public transport data on boats based on live location data.",
        approach: "Creating a server tracking multiple vehicles using public timetable data and live location data from open data sources, and creating a embedded page for display on boats.",
        impact: "Giving passengers up to date information about their journey, on multiple screens, with arrival time estimates and live updates.",
      },
    },
    education: {
      "0": {
        institution: "KTH Royal Institute of Technology",
        degree: "M.S. Software Engineering",
        details: "Studied distributed computing, AI, and security at KTH, later developing automated ML pipelines and co-designing a decentralized stream-processing platform using CRDTs with KTH DSL and RISE.",
      },
      "1": {
        institution: "University of applied sciences Rotterdam",
        degree: "B.S. Information Technology",
        details: "Collaborated with TNO, SIMCEN, and Sogeti on innovative tech projects—including a VR app for claustrophobia—gaining experience across multiple languages and completing nine industry projects with an average grade of 8.",
      },
    },
    experience: {
      "0": {
        company: "Spaux",
        role: "Full Stack Developer",
        location: "Rotterdam, The Netherlands",
        highlights: [
          "Contributing as a Full Stack Developer to an in-house multitenant SaaS web application built with Laravel, TypeScript, and Vue.js",
          "Implemented new submission types and features, improving functionality and user workflows",
          "Collaborating with the team on design, implementation, and testing to ensure high-quality development",
          "Working with a cloud-based microservice architecture using Docker, N8N, RabbitMQ, and Hookdeck webhooks",
          "Supporting integration with major telecom providers like KPN and Odido for automated data synchronization",
          "Assisting in project management and team coordination to track progress and align development goals",
        ],
      },
      "1": {
        company: "RISE Research Institutes of Sweden",
        role: "Intern Software Engineer for Distributed Systems and Data Processing",
        location: "Stockholm, Sweden",
        highlights: [
          "Researched and addressed bottlenecks in global aggregations for large-scale stream processing systems",
          "Designed and implemented a decentralized shared state using Conflict-Free Replicated Data Types (CRDTs) to eliminate coordination overhead",
          "Developed a windowed CRDT model supporting exactly-once processing semantics and flexible custom queries",
          "Evaluated system performance against Apache Flink using the Nexmark benchmark, demonstrating low latency and high scalability",
          "Showcased how CRDT-based state management can improve throughput and consistency in decentralized stream processing",
        ],
      },
      "2": {
        company: "Spaux formerly known as Helmink",
        role: "Junior Software Developer",
        location: "Ridderkerk, The Netherlands",
        highlights: [
          "Worked as a Junior Software Developer and Scrum Master on in-house CRM/ERP and integration platform projects",
          "Developed microservices for real-time public transport tracking",
          "Collaborated with project managers to define and manage realistic development milestones",
          "Led version control and agile process improvements across the organization",
          "Researched and introduced new technologies to enhance project efficiency and scalability",
          "Designed intuitive UIs to improve user experience",
          "Contributed to the architecture design of a new SaaS application in IT communications",
        ],
      },
      "3": {
        company: "Sultan CRM",
        role: "Junior Software Developer",
        location: "Dordrecht, The Netherlands",
        highlights: [
          "ICT Intern at Sultan CRM. I have worked with Devexpress, Blazor and XPO",
          "Upgraded and modernized legacy .NET codebases to current development standards",
          "Enhanced application functionality and optimized existing system components",
          "Contributed to database design and development for improved data handling",
          "Collaborated with the team to refine workflows and implement best engineering practices",
        ],
      },
    },
  },
  components: {
    projectCard: {
      challenge: "Challenge",
      impact: "Impact",
    },
    projectDetail: {
      challenge: "Challenge",
      approach: "Approach",
      impact: "Impact",
      techStack: "Tech Stack",
      metrics: "Metrics",
      visualization: "Visualization",
      before: "Before",
      after: "After",
      improvement: "Improvement",
    },
  },
} as const;

