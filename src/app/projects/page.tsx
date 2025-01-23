export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Placeholder project cards */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition"
          >
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md mb-4" />
            <h2 className="text-xl font-semibold mb-2">Project {i}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              A brief description of the project and its key features.
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded">
                React
              </span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-sm rounded">
                Node.js
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 