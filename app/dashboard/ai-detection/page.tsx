import { AIDetector } from "@/components/ai-detection/ai-detector"
import { Radar } from "lucide-react"

export default function AIDetectionPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Radar className="h-8 w-8 text-indigo-500" />
          AI Content Detection
        </h1>
        <p className="text-muted-foreground text-lg">
          Use our powerful Hugging Face transformer model to detect AI-generated content
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-8">
          <AIDetector />
        </div>
        
        <div className="md:col-span-4 space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium mb-2">About AI Detection</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Our AI detection tool uses a fine-tuned transformer model from Hugging Face to analyze patterns in text and identify whether it was likely generated by AI.
            </p>
            <h4 className="font-medium text-sm mb-1">How it works:</h4>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Analyzes linguistic patterns</li>
              <li>Evaluates text perplexity and entropy</li>
              <li>Identifies statistical anomalies</li>
              <li>Compares to known AI writing patterns</li>
            </ul>
          </div>
          
          <div className="rounded-lg border p-4 bg-indigo-50 border-indigo-100">
            <h3 className="text-lg font-medium mb-2">Accuracy Note</h3>
            <p className="text-sm mb-2">
              No AI detection tool is 100% accurate. Results should be considered probabilistic rather than definitive.
            </p>
            <p className="text-sm">
              For best results, provide at least 200+ characters of text and adjust the threshold based on your needs.
            </p>
          </div>
          
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium mb-2">About the Model</h3>
            <p className="text-sm text-muted-foreground">
              We use the <span className="font-mono bg-gray-100 px-1 py-0.5 rounded text-xs">desklib/ai-text-detector-v1.01</span> model from Hugging Face, which is fine-tuned on a diverse dataset of human and AI-generated content.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 