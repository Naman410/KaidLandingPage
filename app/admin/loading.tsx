import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800">Loading Dashboard...</h2>
        <p className="text-gray-600">Fetching the latest waitlist data</p>
      </div>
    </div>
  )
}
