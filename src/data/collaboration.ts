import type { Localized } from "./site";

export type PracticeFigure = {
  image: string;
  caption: Localized;
  width: number;
  height: number;
};
type Practice = {
  id: string;
  title: Localized;
  description: Localized;
  examples: { title: Localized; body: Localized }[];
  technologies: Localized;
  figures: PracticeFigure[];
  sourceSlides: number[];
};

export const practices: Practice[] = [
  {
    id: "knowledge-platforms",
    title: {
      zh: "知识图谱与大模型平台",
      en: "Knowledge graphs & large model platforms",
    },
    description: {
      zh: "围绕领域数据的知识组织与智能问答，将知识图谱的结构化表示与大模型的理解、生成能力相结合，探索面向工程应用的集成方法。",
      en: "We combine structured knowledge representation with the understanding and generation capabilities of large models, developing integrated approaches to domain knowledge organization and question answering.",
    },
    examples: [
      {
        title: {
          zh: "“石头”知识图谱构建平台",
          en: "Shitou knowledge graph platform",
        },
        body: {
          zh: "提供从信息抽取、关系挖掘到图谱查询与推理的一站式构建流程，支持人物关系、事件网络与时空关联等数据分析。",
          en: "An integrated workflow for information extraction, relation mining, graph queries, and reasoning, supporting the analysis of entity relations, event networks, and spatial and temporal associations.",
        },
      },
      {
        title: {
          zh: "“沈思”多模态大模型",
          en: "Shensi multimodal large model",
        },
        body: {
          zh: "探索跨语言适应、动态场景理解、长视频分析与多模态协同交互，为领域问答和复杂认知任务提供模型支持。",
          en: "Research into cross-lingual adaptation, dynamic scene understanding, long-video analysis, and multimodal interaction for domain question answering and complex cognitive tasks.",
        },
      },
    ],
    technologies: {
      zh: "信息抽取 · 实体链接 · 知识推理 · 检索增强生成 · 提示学习 · 模型适配微调",
      en: "Information extraction · Entity linking · Knowledge reasoning · RAG · Prompt learning · Model adaptation",
    },
    figures: [
      {
        image: "images/collaboration/shitou-platform.webp",
        width: 1800,
        height: 909,
        caption: {
          zh: "“石头”知识图谱构建平台界面",
          en: "Interface of the Shitou knowledge graph platform",
        },
      },
      {
        image: "images/collaboration/shensi-model.webp",
        width: 1236,
        height: 784,
        caption: {
          zh: "“沈思”多模态大模型交互示例",
          en: "An interaction example from the Shensi multimodal model",
        },
      },
    ],
    sourceSlides: [8, 9, 10],
  },
  {
    id: "ai-for-science",
    title: {
      zh: "科学智能与科技文献",
      en: "AI for science & scientific literature",
    },
    description: {
      zh: "面向生命科学、类脑科学与材料学开展学术合作，以机器学习、智能优化和专业大模型支持科学数据分析与知识发现。",
      en: "Our collaborations in life sciences, brain-inspired research, and materials science use machine learning, optimization, and domain models for scientific data analysis and knowledge discovery.",
    },
    examples: [
      {
        title: {
          zh: "抗体设计与脑机接口",
          en: "Antibody design & brain–computer interfaces",
        },
        body: {
          zh: "与西湖大学开展基于等变图的抗体设计合作；与黑龙江省科学院探索面向言语认知型脑机接口的跨模态文本生成。",
          en: "Collaboration with Westlake University on equivariant graph-based antibody design, and with the Heilongjiang Academy of Sciences on cross-modal text generation for speech-cognition brain–computer interfaces.",
        },
      },
      {
        title: { zh: "材料设计与加工", en: "Materials design & processing" },
        body: {
          zh: "与中国科学院金属研究所探索科学基础大模型在金属材料设计、加工等环节中的应用。",
          en: "Exploring scientific foundation models for metal materials design and processing with the Institute of Metal Research, CAS.",
        },
      },
      {
        title: {
          zh: "科技文献知识发现",
          en: "Knowledge discovery from scientific literature",
        },
        body: {
          zh: "与中国科学院文献情报中心、计算机网络信息中心、自动化研究所等单位开展科技文献知识库、检索系统及相关大模型研究。",
          en: "Work with the CAS National Science Library, Computer Network Information Center, and Institute of Automation on scientific literature knowledge bases, retrieval systems, and related large models.",
        },
      },
    ],
    technologies: {
      zh: "等变图学习 · 跨模态生成 · 数据驱动分析 · 智能优化 · 文献知识组织",
      en: "Equivariant graph learning · Cross-modal generation · Data-driven analysis · Intelligent optimization · Literature knowledge organization",
    },
    figures: [
      {
        image: "images/collaboration/scientific-literature.webp",
        width: 936,
        height: 692,
        caption: {
          zh: "科技文献画像、动态感知与关系网络构建技术示意",
          en: "Scientific literature profiling, dynamic monitoring, and relation network construction",
        },
      },
    ],
    sourceSlides: [11],
  },
  {
    id: "scientific-instruments",
    title: { zh: "科研装备与系统研发", en: "Scientific instruments & systems" },
    description: {
      zh: "与科研单位开展装备研制和系统研发合作，把数据处理、动态监控与领域软件开发用于科研仪器和实验流程。",
      en: "We collaborate with research institutes on instruments and software systems, applying data processing, dynamic monitoring, and domain software development to scientific equipment and experimental workflows.",
    },
    examples: [
      {
        title: {
          zh: "高频超声雾化微粒制备系统",
          en: "High-frequency ultrasonic atomization system",
        },
        body: {
          zh: "多点动态监控的高频超声雾化微粒制备系统的设计和研制，中国科学院科研装备研制项目。",
          en: "Design and development of a high-frequency ultrasonic atomization particle preparation system with multi-point dynamic monitoring, supported by a CAS scientific instrument development project.",
        },
      },
      {
        title: {
          zh: "X 射线单晶衍射仪",
          en: "X-ray single-crystal diffractometer",
        },
        body: {
          zh: "参与 X 射线单晶衍射仪开发和应用，国家重大科学仪器设备开发专项。",
          en: "Participation in X-ray single-crystal diffractometer development and applications under the national major scientific instrument development program.",
        },
      },
      {
        title: {
          zh: "科技文献智能处理软件",
          en: "Intelligent scientific literature software",
        },
        body: {
          zh: "面向科技文献的智能处理软件系统研发和应用，国家重点研发计划相关专项。",
          en: "Development and application of intelligent scientific literature processing software under a National Key R&D Program project.",
        },
      },
    ],
    technologies: {
      zh: "多点动态监控 · 科研数据处理 · 领域软件开发 · 文献智能处理",
      en: "Multi-point dynamic monitoring · Scientific data processing · Domain software · Intelligent literature processing",
    },
    figures: [
      {
        image: "images/collaboration/scientific-instrument.webp",
        width: 1600,
        height: 1200,
        caption: {
          zh: "科研协作项目中的实验装备",
          en: "Experimental equipment from a collaborative research project",
        },
      },
    ],
    sourceSlides: [5],
  },
  {
    id: "multimodal-applications",
    title: {
      zh: "多模态感知与行业应用",
      en: "Multimodal perception & applications",
    },
    description: {
      zh: "依托辽宁省多模态智能识别工程研究中心，结合视觉、文本和语音信息，研究复杂场景中的识别、理解与生成方法。",
      en: "Supported by the Liaoning Engineering Research Center for Multimodal Intelligent Recognition, we combine vision, text, and speech to study recognition, understanding, and generation in complex environments.",
    },
    examples: [
      {
        title: {
          zh: "动作识别与视频理解",
          en: "Action recognition & video understanding",
        },
        body: {
          zh: "在国家重点研发计划相关课题中研究语音与声纹识别、人物动作识别，结合人体骨架、视频与文本特征进行内容理解和时间定位。",
          en: "Research under National Key R&D Program projects covers speech and speaker recognition, human action recognition, and video understanding and temporal localization using body skeletons, video, and text features.",
        },
      },
      {
        title: {
          zh: "交通感知与辅助作业",
          en: "Traffic perception & assisted operations",
        },
        body: {
          zh: "开展车辆目标持续跟踪、复杂堆叠场景的零样本实例分割研究，并探索竞技运动辅助训练、特货部件加固作业和刺绣设计等应用。",
          en: "Studies include continuous vehicle tracking and zero-shot instance segmentation in complex stacked scenes, alongside applications in sports training, special-cargo component securing, and embroidery design.",
        },
      },
    ],
    technologies: {
      zh: "骨架动作识别 · 多模态融合 · 目标跟踪 · 零样本分割 · 图文引导生成",
      en: "Skeleton-based action recognition · Multimodal fusion · Object tracking · Zero-shot segmentation · Text-and-image-guided generation",
    },
    figures: [
      {
        image: "images/collaboration/action-recognition.webp",
        width: 640,
        height: 368,
        caption: {
          zh: "实时人体骨架与动作识别示例",
          en: "Real-time body skeleton and action recognition example",
        },
      },
    ],
    sourceSlides: [5, 12, 13, 14],
  },
  {
    id: "agents-and-interaction",
    title: {
      zh: "智能体与人机交互",
      en: "Agents & human–computer interaction",
    },
    description: {
      zh: "围绕软件自主运作和多媒体人机交流，探索人工智能体、多轮对话与虚拟数字人技术，连接任务执行、交互反馈与内容生成。",
      en: "We explore AI agents, multi-turn dialogue, and digital humans for autonomous software operation and multimedia interaction, connecting task execution, interactive feedback, and content generation.",
    },
    examples: [
      {
        title: { zh: "多模态智能体", en: "Multimodal agents" },
        body: {
          zh: "研究多模态智能体构建、规划与调度、反思及强化学习方法，使模型能够结合多种工具完成任务。",
          en: "Research into agent construction, planning and scheduling, reflection, and reinforcement learning supports the use of multiple tools to complete tasks.",
        },
      },
      {
        title: {
          zh: "智能对话与虚拟数字人",
          en: "Intelligent dialogue & digital humans",
        },
        body: {
          zh: "结合可控情感对话、音频驱动数字人生成与多媒体控制的视频生成，探索更自然的多模态交互方式。",
          en: "Combining controllable emotional dialogue, audio-driven digital human generation, and multimedia-controlled video generation to explore natural multimodal interaction.",
        },
      },
    ],
    technologies: {
      zh: "智能体规划 · 工具调用 · 强化学习 · 多轮对话 · 语音驱动生成",
      en: "Agent planning · Tool use · Reinforcement learning · Multi-turn dialogue · Audio-driven generation",
    },
    figures: [
      {
        image: "images/collaboration/digital-human.webp",
        width: 1121,
        height: 559,
        caption: {
          zh: "虚拟数字人的语音、口型与风格转换技术流程",
          en: "Voice, lip synchronization, and style conversion workflow for digital humans",
        },
      },
    ],
    sourceSlides: [15],
  },
];

export const partnerGroups: {
  id: string;
  title: Localized;
  names: Localized[];
}[] = [
  {
    id: "cas",
    title: { zh: "中国科学院相关单位", en: "Chinese Academy of Sciences" },
    names: [
      { zh: "中国科学院自动化研究所", en: "Institute of Automation, CAS" },
      { zh: "中国科学院金属研究所", en: "Institute of Metal Research, CAS" },
      {
        zh: "中国科学院工程热物理研究所",
        en: "Institute of Engineering Thermophysics, CAS",
      },
      {
        zh: "中国科学院计算机网络信息中心",
        en: "Computer Network Information Center, CAS",
      },
      { zh: "中国科学院文献情报中心", en: "National Science Library, CAS" },
    ],
  },
  {
    id: "universities",
    title: { zh: "高校与科研机构", en: "Universities & research institutes" },
    names: [
      { zh: "哈尔滨工业大学", en: "Harbin Institute of Technology" },
      { zh: "西湖大学", en: "Westlake University" },
      { zh: "北京大学", en: "Peking University" },
      { zh: "东北大学", en: "Northeastern University" },
      { zh: "中国医科大学", en: "China Medical University" },
      { zh: "黑龙江省科学院", en: "Heilongjiang Academy of Sciences" },
    ],
  },
  {
    id: "industry",
    title: { zh: "产业合作与交流", en: "Industry collaboration & exchange" },
    names: [
      { zh: "字节跳动 SEED", en: "ByteDance SEED" },
      { zh: "中国移动", en: "China Mobile" },
      { zh: "中科闻歌", en: "Wenge" },
      { zh: "中体数科", en: "China Sports Digital Technology" },
    ],
  },
];
