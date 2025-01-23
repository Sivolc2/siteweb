export default function Projects() {
  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">Projects</h1>
        
        <div className="space-y-12">
          {/* Arboren Project */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Arboren: AI-Powered Geospatial Analysis Platform</h2>
            <p className="text-gray-600 mb-6">Nov 2024 - Present</p>
            <div className="prose max-w-none">
              <p className="mb-4">
                Led development of Arboren, winning 1st at the Chan Zuckerberg Initiative hack for social impact.
                Presented at UN COP16 with an innovative AI platform combining LLMs with geospatial visualization.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Key Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Intelligent dataset discovery and integration using LLMs</li>
                <li>Interactive visualization layer combining multiple data sources</li>
                <li>Context-aware AI assistant for data analysis</li>
                <li>Natural language interface for exploring relationships</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Impact</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Demonstrated correlation analysis between desertification and conflict zones</li>
                <li>Enabled rapid integration of diverse data sources for policy makers</li>
                <li>Streamlined environmental research workflows</li>
                <li>Selected for presentation at UNCCD COP16</li>
              </ul>
            </div>
          </div>

          {/* Vaulter Project */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Vaulter - Obsidian Notes AI Integration</h2>
            <p className="text-gray-600 mb-6">Dec 2023 - Jun 2024</p>
            <div className="prose max-w-none">
              <p className="mb-4">
                An Obsidian plugin spun out of the AI for Thought hackathon @AGI house, using LlamaIndex 
                and large language models to index personal notes and generate contextual profiles.
              </p>
              <p className="mb-4">
                Bridges the gap between personal note-taking and AI assistance, allowing users' thoughts 
                to be queried as part of the autonomous agents toolchain.
              </p>
            </div>
          </div>

          {/* Antarctic Research Project */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Meltwater Detection in Antarctic Ice Sheets</h2>
            <p className="text-gray-600 mb-6">McGill University Research Project</p>
            <div className="prose max-w-none">
              <p className="mb-4">
                Development of a Convolutional Neural Network architecture for automated feature 
                cataloguing in the Antarctic ice sheets using optical satellite albedo data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 