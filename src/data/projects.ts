import { HackathonProject, PersonalProject, Presentation } from '@/types/projects';

export const projectData: {
  hackathonProjects: HackathonProject[];
  personalProjects: PersonalProject[];
  presentations: Presentation[];
} = {
  hackathonProjects: [
    {
      title: "Ad Infinitum",
      description: "Autonomous product-discovery engine that generates ideas, tests them with real Meta ads, learns from human response, and promotes validated concepts into a public Kickstarter-style marketplace",
      award: "1st Place @Self-Evolving Agents Hack",
      event: "Self-Evolving Agents Hack",
      links: {
        github: "https://github.com/Sivolc2/ads-infinitum",
        demo: "https://meta-genesis-lab.lovable.app",
        event: "https://luma.com/agentshack?tk=rCRY6s"
      },
      tags: ["AI", "Autonomous Agents", "Meta Ads", "Product Discovery", "React"]
    },
    {
      title: "AIMibot Companion",
      description: "Wearable AI companion with 6 personality tribes that learns and grows with you - sold $1.6k in preorders in 24 hours",
      award: "1st Place @Build-a-Company-a-Thon",
      event: "AGI House",
      links: {
        event: "https://partiful.com/e/8xzzr8g76SQ3bAWUifgX",
        website: "https://aimibot.me/",
        video: "https://youtu.be/XoppaX2IZzY?t=2955"
      },
      tags: ["AI", "Wearable", "Hardware"]
    },
    {
      title: "Exocortex",
      description: "AI knowledge aggregation system that connects Obsidian, Notion, and Discord to spawn autonomous agents for task execution",
      award: "1st Place @AI for Thought",
      event: "AI for Thought",
      links: {
        event: "https://partiful.com/e/7Uc3o5n8uyXOcKPAy012",
        github: "https://github.com/Sivolc2/exocortex"
      },
      tags: ["AI", "Knowledge Management", "Autonomous Agents", "NLP"]
    },
    {
      title: "Humanoid Robotics Control",
      description: "VR-controlled robotic hand for humanoid robot platforms",
      award: "1st Place @Khacks",
      event: "K-Scale Labs",
      links: {
        github: "https://github.com/Sivolc2/kscale_hacks_no2",
        event: "https://luma.com/khacks.0.3?tk=Urgj0A"
      },
      tags: ["Robotics", "VR", "Control Systems"]
    },
    {
      title: "Arboren",
      description: "AI-powered geospatial analysis platform for UN policy",
      award: "1st Place @AI For Good",
      event: "Chan Zuckerberg Initiative+ UN CCD",
      tags: ["AI", "GIS", "Policy"],
      links: {
        github: "https://github.com/yourusername/arboren",
        demo: "https://arboren-ai.com/home",
        devpost: "https://devpost.com/software/green-policy-agent",
        press: "https://www.sfchronicle.com/bayarea/article/hack-for-social-impact-ai-19887830.php",
        video: "https://www.loom.com/share/f5d03f84e26543c19500425aeb965a99?sid=cd3e7488-9831-424c-bf1a-ad4f3c0f907f",
        event: "https://luma.com/454w7i8p?tk=E7hKBg"
      }
    },
    {
        title: "Voice-to-Action Robotics",
        description: "LLM embodied robotic control on humanoid platform.",
        award: "2nd Place @Khacks",
        event: "K-Scale Labs",
        links: {
          github: "https://github.com/Sivolc2/kscale_hacks_dec_2024",
          event: "https://luma.com/khacks.0.2?tk=rMaB4W",
          demo: "https://x.com/kscalelabs/status/1870209855107248478"
        },
        tags: ["NLP", "Robotics", "Voice"]
      },
    {
      title: "UniversR",
      description: "Autonomously creating hypergraphs from physics research papers scraped from arxiv",
      award: "Wolfram Research Prize @AIxPhysics",
      links: {
        event: "https://partiful.com/e/timOBcWEfCj34i8zP8Fe",
        github: "https://github.com/Sivolc2/universal_universer",
        demo: "https://www.loom.com/share/302c99bc232f4044be3621dead6da96c?sid=9c62570c-cc78-4560-9ea0-07d9f556fb9f"
      },
      tags: ["AI", "Physics"]
    },
    {
      title: "Urban Forest AI",
      description: "AI-driven platform for optimizing urban greening and climate resilience through strategic tree planting and land reclamation",
      event: "Climate Hack",
      links: {
        event: "https://lu.ma/1ixp727l?tk=HFMF74",
        demo: "https://www.loom.com/share/7043456acbe84043b228ab57c36fc67f?sid=5f5ae657-7bfd-4cd7-8735-d73450209c00",
        github:"https://github.com/ai-geo-forest-vision/forest-vision-dashboard"
      },
      tags: ["AI", "Climate", "Urban Planning", "Geoengineering"]
    },
    {
      title: "Brain²",
      description: "Toolchain from human 2nd brain (Obsidian) to guide autonomous agents",
      event: "AI for Thought",
      links: {
        event: "https://partiful.com/e/CVnyIG9KtDXVyBmmGvcI",
        github: "https://github.com/Sivolc2/digital_twin"
      },
      tags: ["AI", "Knowledge Graphs", "Agents"]
    },
    {
      title: "XR - AI Wearable with Vision",
      description: "Interactive LLM for conversational support",
      event: "AI in Motion - Studio 45",
      links: {
        event: "https://lu.ma/0930-ai-in-motion-hack?tk=Y4VNHS",
        github: "https://github.com/wolfhound115/the-face-and-audio-book"
      },
      tags: ["XR", "AI", "Healthcare"]
    },
    {
      title: "Lumi",
      description: "Autonomous supply chain logistics optimization",
      award: "2nd Place @AGI House",
      links: {
        event: "https://partiful.com/e/uYzDzXUstD8D8kvuA8Zl",
        github: "https://github.com/Sivolc2/auto_wing_hacks"
      },
      tags: ["AI", "Logistics"]
    },
    {
      title: "Biocompatible Materials",
      description: "Autonomous biocompatible material discovery pitch",
      event: "Studio 45 Pitch Minihacks",
      tags: ["Robotics", "Materials Science"]
    },
    {
      title: "Poliscope",
      description: "Tools for government transparency in San Fransisco",
      event: "Accelerate SF",
      links: {
        github: "https://github.com/Sivolc2/accelerate_sf_hackathon",
        devpost: "https://devpost.com/software/poliscope?_gl=1*1r7rn22*_gcl_au*MTg4MTg5Mzc0OS4xNzU4NzU2MjQ1*_ga*MTUwNTkxMDUzMy4xNzU4NzU2MjQ1*_ga_0YHJK3Y10M*czE3NTg3NTYyNDQkbzEkZzEkdDE3NTg3NTY0MDMkajUzJGwwJGgw",
        event: "https://accelerate-sf.devpost.com/"
      },
      tags: ["Governance", "Transparency"]
    },
    {
      title: "Agent AI Hack Night",
      description: "Building AI agent solutions using cutting-edge models like DeepSeek R1 and V3, with tools from Weaviate, VESSL AI, FireworksAI, and CrewAI",
      event: "SF Bay Area Builders",
      links: {
        event: "https://github.com/Sivolc2/agent_ai_hack_night_github"
      },
      tags: ["AI", "Agents", "LLMs"]
    },
    {
      title: "OTT - Organizational Transparency Tools",
      description: "Transparency tools for DAO+Autonomous company toolchain",
      event: "Nvidia x Vercel Hack",
      tags: ["DAO", "Organizations", "Transparency"]
    },
    {
      title: "SoulSpace",
      description: "Turn text into memory palaces using diffusion models",
      event: "Redpoint Imagine @AGI House",
      links: {
        github: "https://github.com/Sivolc2/redpoint_hacks",
        event: "https://partiful.com/e/6EysR58EnhyDGXX57uao"
      },
      tags: ["AI", "Memory"]
    },
    {
      title: "StellarGlass",
      description: "Smart glasses that change external color based on user pointing relative to star maps",
      event: "PartyTech Hackathon",
      links: {
        event: "https://partiful.com/e/t7IqfNUStrPYFRJrN2dr"
      },
      tags: ["Hardware", "Wearables", "AR"]
    },
    {
      title: "Anthacks",
      description: "LLM agent for quickstarting a business",
      event: "Anthropic Hackathon",
      links: {
        github: "https://github.com/Sivolc2/anthacks_streamlit"
      },
      tags: ["AI", "Business"]
    },
    {
      title: "Celery",
      description: "Data science tools for restaurant owners",
      award: "2nd Place @UCLA Hacks",
      links: {
        github: "https://devpost.com/software/celery-q37jxw"
      },
      tags: ["Data Science", "Restaurants"]
    },
    {
      title: "ShirtService",
      description: "Image recognition for clothing detection, classification, and outfit recommendation",
      award: "1st Place @CodeDay",
      links: {
        github: "https://github.com/Sivolc2/noshirtorservice"
      },
      tags: ["Computer Vision", "Image Recognition"]
    }
  ],
  personalProjects: [
    {
      title: "Post-Labor Economics",
      description: "Research organization exploring economic frameworks in the age of automation",
      tags: ["Economics", "AI", "Research"]
    },
    {
      title: "Vaulter",
      description: "Obsidian plugin for AI-powered knowledge management and digital twin context feeding",
      tags: ["AI", "Knowledge Management"]
    },
    {
      title: "Lunar Manufacturing",
      description: "Autonomous solar panel manufacturing from lunar regolith using gene-tailored mycelium",
      tags: ["Space", "Manufacturing", "Biotech"]
    },
    {
      title: "Xenarch",
      description: "Finding interesting planetary science features using image recognition.",
      links: {
        github: "https://github.com/Sivolc2/xenarch"
      },
      tags: ["Space", "AI", "Pattern Recognition"]
    },
    {
      title: "Framework Zero",
      description: "Trust through cooperation frameworks with liquid democracy",
      links: {
        event: "https://buildspace.so/s5/welcome"
      },
      tags: ["Governance", "Democracy"]
    },
    {
      title: "Foodbringer",
      description: "Autonomous food ordering app",
      links: {
        github: "https://github.com/Sivolc2/foodbringer"
      },
      tags: ["Food", "Automation"]
    },
    {
      title: "Omi Device",
      description: "AI wearable workshop for integrating life context into AI systems",
      links: {
        website: "https://www.omi.me/"
      },
      tags: ["Hardware", "AI", "Wearables"]
    },
    {
      title: "Gene Modification Projects",
      description: "HTGAA group: GFP modification in algae and dinoflagellate growth",
      tags: ["Biotech", "Genetics"]
    },
    {
      title: "StarCraft 2 Bot",
      description: "StarCraft 2 game playing bot",
      links: {
        github: "https://github.com/Sivolc2/botro_the_mighty"
      },
      tags: ["AI", "Gaming"]
    },
    {
      title: "TFT Bot",
      description: "Teamfight Tactics game playing bot",
      links: {
        github: "https://github.com/Sivolc2/the_bot"
      },
      tags: ["AI", "Gaming"]
    },
    {
      title: "AntarcticaNet",
      description: "Image segmentation for meltwater estimation",
      links: {
        github: "https://github.com/Sivolc2/antarctica_net"
      },
      tags: ["Climate", "ML"]
    },
    {
      title: "eRA",
      description: "Pose detection system for physical therapy patient exercises",
      links: {
        github: "https://github.com/zerfuth/eRA"
      },
      tags: ["Computer Vision", "Healthcare", "AI"]
    },
    {
      title: "McGill Space Group Payload Lead",
      description: "Led team developing low cost star tracker and lobster eye X-ray telescope design",
      links: {
        website: "https://www.mcgillspace.com/#!/"
      },
      tags: ["Space", "Hardware"]
    }
  ],
  presentations: [
    {
      title: "Arboren at UN COP16",
      description: "Presenting LLM powered geospatial tool for UN policy analysts",
      links: {
        video: "https://www.loom.com/share/f5d03f84e26543c19500425aeb965a99"
      }
    },
    {
      title: "Post-Labor Economics",
      description: "Talk at AIxBerkeley hackathon presenting Framework (Focused Research Organization)",
      tags: ["Economics", "AI"]
    },
    {
      title: "Post-Labor Economics Discussion Group",
      description: "Ran discussion group on future of the economy",
      links: {
        slides: "https://docs.google.com/presentation/d/1Rl5NluLvHNHveWR_A_-LGhA8pN-VKd5lo2E3wk8MSo8/edit"
      }
    },
    {
      title: "JWST JADES Survey and the Fermi Paradox",
      description:"Talk on latest results and implications",
      links: {
        slides: "https://docs.google.com/presentation/d/1xAfNDsOJ6PvfciUVn-WIEBwYpRaOxOdo0JA1SZ2ElHU/edit"
      }
    },
    {
      title: "Robnotix Paper Discussions",
      description: "2024 series on robotics and AI systems",
      presentations: [
        {
          title: "Eureka and Embodied robotics",
          links: {
            slides: "https://docs.google.com/presentation/d/1D9zfv0536QRSKgkJi9UkZHAVrC5oWvMukTcZCLGfzkA/edit"
          }
        },
        {
          title: "Autonomous AI systems Primer",
          links: {
            slides: "https://docs.google.com/presentation/d/1PzJC2FftVJuQKgc0jmDxUNCphJ6xunEw_PC8CIa_eXY/edit"
          }
        },
        {
          title: "AutoGPT Release Analysis",
          links: {
            slides: "https://docs.google.com/presentation/d/1nAapmbDBmVrk_INRmF7P8iablptNMGOVL4nCqbSvve8/edit"
          }
        }
      ]
    }
  ]
}; 