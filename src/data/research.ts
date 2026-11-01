export const research = [
  {
    id: "reasoning",
    number: "01",
    icon: "network",
    title: {
      zh: "多模态理解与推理",
      en: "Multimodal understanding & reasoning",
    },
    subtitle: "MULTIMODAL REASONING",
    description: {
      zh: "连接视觉与语言，研究复杂情境中的推理、验证与决策，让模型的思考过程更加可靠。",
      en: "Connecting vision and language through reasoning, verification, and decision making in complex contexts.",
    },
    detail: {
      zh: "围绕思维链验证、几何推理与过程监督，探索可验证的多模态推理机制，并通过基准评测分析模型的能力边界。",
      en: "We study verifiable multimodal reasoning through chain-of-thought verification, geometric reasoning, and process supervision, with benchmarks that probe model capabilities.",
    },
    tags: {
      zh: ["多模态大模型", "思维链验证", "几何推理"],
      en: ["Multimodal models", "Verification", "Geometric reasoning"],
    },
    papers: [
      "paper-02",
      "paper-03",
      "paper-05",
      "paper-06",
      "paper-07",
      "paper-13",
      "paper-19",
    ],
  },
  {
    id: "generation",
    number: "02",
    icon: "layers",
    title: { zh: "结构化生成与智能体", en: "Structured generation & agents" },
    subtitle: "GENERATION & AGENTS",
    description: {
      zh: "从自然语言与手绘草图到结构化图示，探索生成、编辑和工具交互的统一建模。",
      en: "From language and sketches to structured diagrams, unifying generation, editing, and interaction with tools.",
    },
    detail: {
      zh: "研究文本到图示生成、草图理解与图形界面操作，将结构化表达与可追溯的工具调用融入智能体系统。",
      en: "Our work covers text-to-diagram generation, sketch understanding, and graphical interface control, connecting structured representations with traceable tool use.",
    },
    tags: {
      zh: ["图示生成", "工具使用", "生成溯源"],
      en: ["Diagram generation", "Tool use", "Generative provenance"],
    },
    papers: ["paper-09", "paper-10", "paper-15", "paper-18"],
  },
  {
    id: "science",
    number: "03",
    icon: "atom",
    title: { zh: "科学智能与知识发现", en: "AI for science & discovery" },
    subtitle: "AI FOR SCIENCE",
    description: {
      zh: "面向科学文献、图表与实验信息，探索多文档推理和知识组织，辅助科学研究。",
      en: "Reasoning across scientific papers, charts, and experiments to support knowledge discovery and scientific research.",
    },
    detail: {
      zh: "通过科学文献中的方法—实验关系建模、复杂图表问答和研究演化图谱，探索人工智能辅助科学发现的路径。",
      en: "We investigate method–experiment relationships in scientific literature, complex chart question answering, and research evolution graphs for AI-assisted discovery.",
    },
    tags: {
      zh: ["科学文献推理", "图表问答", "知识发现"],
      en: ["Scientific inference", "Chart QA", "Knowledge discovery"],
    },
    papers: ["paper-08", "paper-12", "paper-14", "paper-17"],
  },
  {
    id: "language",
    number: "04",
    icon: "message",
    title: {
      zh: "语言模型与高效学习",
      en: "Language models & efficient learning",
    },
    subtitle: "LANGUAGE & LEARNING",
    description: {
      zh: "围绕语言理解、知识蒸馏与检索推理，研究更高效、可追溯的语言模型。",
      en: "Building efficient and traceable language models through language understanding, knowledge distillation, and reasoning with search.",
    },
    detail: {
      zh: "结合团队在机器翻译与语言建模方面的研究，探索细粒度生成溯源、知识蒸馏、强化学习及推理误差控制。",
      en: "Building on machine translation and language modeling, we explore fine-grained provenance, knowledge distillation, reinforcement learning, and reasoning error control.",
    },
    tags: {
      zh: ["语言理解", "知识蒸馏", "强化学习"],
      en: ["Language understanding", "Distillation", "Reinforcement learning"],
    },
    papers: ["paper-01", "paper-11", "paper-16", "paper-21"],
  },
];
