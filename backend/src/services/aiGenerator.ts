import { ProjectIdeaRequest, ProjectIdeaResponse } from '../types/index.js';

interface BlueprintTemplate {
  titleTemplate: string;
  problemStatement: string;
  aiApproach: string;
  techStack: string[];
  resumeImpact: string;
  sixtyMinuteRoadmap: { minuteRange: string; task: string }[];
  workshopFitExplanation: string;
}

const DOMAIN_BLUEPRINTS: Record<string, BlueprintTemplate[]> = {
  Healthcare: [
    {
      titleTemplate: 'MediScan AI: Clinical Triage & Lab Report Explainer Assistant',
      problemStatement: 'Patients and non-technical staff struggle to decipher dense diagnostic reports, leading to delayed medical interventions and triage bottlenecks.',
      aiApproach: 'RAG (Retrieval-Augmented Generation) pipeline over medical reference lexicons using OCR text extraction with LLM reasoning and structured guardrails.',
      techStack: ['Python', 'FastAPI', 'LangChain', 'OpenAI/Gemini API', 'ChromaDB'],
      resumeImpact: 'Architected an end-to-end medical triage RAG assistant processing unstructured blood panel PDFs with 94% clinical entity extraction accuracy and sub-800ms latency.',
      sixtyMinuteRoadmap: [
        { minuteRange: '00:00 - 10:00', task: 'Frame problem, obtain sample CBC blood test data, and configure API environment.' },
        { minuteRange: '10:00 - 25:00', task: 'Build text chunking and vector embedding pipeline with ChromaDB.' },
        { minuteRange: '25:00 - 45:00', task: 'Implement LangChain retrieval chain with strict clinical safety prompt guardrails.' },
        { minuteRange: '45:00 - 60:00', task: 'Wrap in a lightweight Streamlit UI and deploy live on Streamlit Community Cloud.' }
      ],
      workshopFitExplanation: 'In our 60-minute workshop, you will build the foundational LangChain + LLM query loop and deploy the working triage prototype.'
    },
    {
      titleTemplate: 'DermaAssist: Vision-Augmented Preliminary Skin Lesion Classifier',
      problemStatement: 'Rural clinics lack immediate dermatologist access for initial assessment of suspicious epidermal patterns.',
      aiApproach: 'Multi-modal Vision LLM with few-shot diagnostic prompting and confidence-calibrated triage recommendation.',
      techStack: ['Python', 'Gemini 1.5 Flash Vision', 'Streamlit', 'OpenCV'],
      resumeImpact: 'Engineered a vision-based diagnostic assistant analyzing lesion imagery with calibrated severity scoring and automated patient referral summaries.',
      sixtyMinuteRoadmap: [
        { minuteRange: '00:00 - 12:00', task: 'Set up multi-modal image ingestion and preprocessing pipeline.' },
        { minuteRange: '12:00 - 35:00', task: 'Integrate Vision LLM with structured JSON output schema.' },
        { minuteRange: '35:00 - 50:00', task: 'Add risk-assessment heuristic rules and clinical disclaimer banner.' },
        { minuteRange: '50:00 - 60:00', task: 'Generate production demo video & push repository to GitHub.' }
      ],
      workshopFitExplanation: 'Demonstrates modern multi-modal AI pipelines that stand out immediately on Tier-1 engineering placement resumes.'
    }
  ],
  FinTech: [
    {
      titleTemplate: 'FinGuard: Real-Time Fraud Explainer & Merchant Anomaly Detection Agent',
      problemStatement: 'Financial risk teams waste thousands of hours manually investigating flagged card transactions with opaque ML fraud scores.',
      aiApproach: 'Autonomous Agentic workflow that cross-references transaction velocity against behavioral graphs and writes human-readable compliance memos.',
      techStack: ['Python', 'LangGraph', 'FastAPI', 'SQLite', 'Pydantic'],
      resumeImpact: 'Developed an automated compliance agent converting raw transaction logs into audit-ready fraud investigative dossiers, cutting review time by 70%.',
      sixtyMinuteRoadmap: [
        { minuteRange: '00:00 - 10:00', task: 'Synthesize bank transaction log schemas and anomaly scoring triggers.' },
        { minuteRange: '10:00 - 30:00', task: 'Create autonomous LangGraph decision agent with transaction lookup tools.' },
        { minuteRange: '30:00 - 48:00', task: 'Implement Pydantic-enforced audit output format (Risk Score, Evidence, Action).' },
        { minuteRange: '48:00 - 60:00', task: 'Deploy webhook endpoint on Render with automated test payloads.' }
      ],
      workshopFitExplanation: 'Covers tool-calling agents—the #1 skill top fintech startups look for during campus placements.'
    }
  ],
  EdTech: [
    {
      titleTemplate: 'SocraticCode: Interactive AI Pair Programmer & Code Review Coach',
      problemStatement: 'Junior engineering students rely blindly on ChatGPT for copy-paste answers, failing fundamental technical interviews.',
      aiApproach: 'Pedagogical Socratic dialogue agent with AST (Abstract Syntax Tree) code analysis that guides students through guided questioning rather than spoon-fed code.',
      techStack: ['Python', 'FastAPI', 'AST parser', 'OpenAI/Gemini API', 'Next.js'],
      resumeImpact: 'Built an interactive Socratic code tutor providing algorithmic guidance and AST syntax checks for 50+ DSA problems without revealing direct solutions.',
      sixtyMinuteRoadmap: [
        { minuteRange: '00:00 - 10:00', task: 'Define pedagogical system prompt and DSA problem test suites.' },
        { minuteRange: '10:00 - 30:00', task: 'Implement code AST validation to detect user language and syntax errors.' },
        { minuteRange: '30:00 - 45:00', task: 'Hook up multi-turn conversational memory with stateful hint progression.' },
        { minuteRange: '45:00 - 60:00', task: 'Build web playground UI and record an interactive interview demo.' }
      ],
      workshopFitExplanation: 'This directly showcases how to build stateful conversational memory and system prompt engineering in 60 minutes.'
    }
  ],
  'Developer Tools': [
    {
      titleTemplate: 'GitCommit AI: Semantic PR Analyzer & Architectural Impact Explainer',
      problemStatement: 'Engineers skim large Pull Requests without understanding architectural regression risks or undocumented breaking changes.',
      aiApproach: 'Git diff parsing engine combined with structured semantic code summarization and automated markdown release note generator.',
      techStack: ['TypeScript/Node.js', 'GitHub REST API', 'LLM API', 'Tailwind'],
      resumeImpact: 'Created an automated GitHub Action and CLI analyzing git diffs to generate semantic changelogs and identify API breaking changes across 100+ commits.',
      sixtyMinuteRoadmap: [
        { minuteRange: '00:00 - 12:00', task: 'Parse unified git diffs and extract file modification hunks.' },
        { minuteRange: '12:00 - 32:00', task: 'Send structured diff context to LLM with breaking-change detection prompt.' },
        { minuteRange: '32:00 - 48:00', task: 'Format output as automated GitHub PR comments and markdown reports.' },
        { minuteRange: '48:00 - 60:00', task: 'Package as a standalone CLI tool published to npm / GitHub.' }
      ],
      workshopFitExplanation: 'Gives you a working GitHub Action or CLI tool you can link directly in the top header of your resume.'
    }
  ],
  Placements: [
    {
      titleTemplate: 'MockInterview Pro: Real-Time Tech Recruiter & DSA Evaluator',
      problemStatement: 'College students lack realistic technical interview practice with live, customized feedback on both code complexity and verbal explanations.',
      aiApproach: 'Speech/Text conversational AI agent that generates dynamic follow-up questions tailored to candidate code submissions and system design answers.',
      techStack: ['Python', 'FastAPI', 'WebSockets', 'LangChain', 'React'],
      resumeImpact: 'Engineered an interactive mock technical interview simulator that evaluates algorithmic complexity, code cleanliness, and verbal communication with rubric scoring.',
      sixtyMinuteRoadmap: [
        { minuteRange: '00:00 - 10:00', task: 'Set up candidate interview rubrics (DSA, System Design, Behavioral).' },
        { minuteRange: '10:00 - 30:00', task: 'Develop dynamic interviewer prompt persona with adaptive difficulty.' },
        { minuteRange: '30:00 - 48:00', task: 'Build live scorecard generation engine with actionable candidate feedback.' },
        { minuteRange: '48:00 - 60:00', task: 'Deploy interactive web app and test end-to-end interview simulation.' }
      ],
      workshopFitExplanation: 'You build the tool that helps you crack your own campus placements—an unforgettable story for any hiring manager.'
    }
  ]
};

export async function generateProjectBlueprint(req: ProjectIdeaRequest): Promise<ProjectIdeaResponse> {
  const branch = req.branch || 'Computer Science';
  const interest = req.interest || 'Placements';
  const skill = req.skillLevel || 'Beginner';
  const tech = req.techStack || 'Python';
  const problem = req.problemArea || '';

  // Match domain or fallback to Placements
  const domainKey = Object.keys(DOMAIN_BLUEPRINTS).find(
    k => k.toLowerCase() === interest.toLowerCase() || interest.toLowerCase().includes(k.toLowerCase())
  ) || 'Placements';

  const blueprintList = DOMAIN_BLUEPRINTS[domainKey] || DOMAIN_BLUEPRINTS['Placements'];
  const template = blueprintList[Math.floor(Math.random() * blueprintList.length)];

  // Personalize title and description based on branch and tech
  const branchPrefix = branch.includes('ECE') || branch.includes('Electronics')
    ? 'Embedded & '
    : branch.includes('Mech')
    ? 'Smart Systems & '
    : '';

  const personalizedTitle = `${branchPrefix}${template.titleTemplate}`;
  const personalizedDesc = `A rapid-deployment AI application engineered for ${branch} students targeting ${interest}. Solves: ${problem ? problem : template.problemStatement}`;

  // Ensure preferred tech is included in tech stack
  const dynamicTechStack = Array.from(new Set([tech, ...template.techStack]));

  return {
    projectTitle: personalizedTitle,
    problemStatement: problem ? `${problem}. ${template.problemStatement}` : template.problemStatement,
    shortDescription: personalizedDesc,
    aiApproach: template.aiApproach,
    techStack: dynamicTechStack,
    difficulty: skill,
    resumeImpact: template.resumeImpact,
    sixtyMinuteRoadmap: template.sixtyMinuteRoadmap,
    workshopFitExplanation: template.workshopFitExplanation
  };
}
