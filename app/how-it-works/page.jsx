import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <main className="min-h-screen flex flex-col">
      <PublicHeader currentPath="/how-it-works" />
      
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How Homily.Build Works</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Our platform streamlines homily preparation with a proven 6-step process designed specifically for Catholic priests.
            </p>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our 6-Step Homily Creation Process</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">1</div>
                  <h3 className="text-xl font-semibold">Select Weekend & Readings</h3>
                </div>
                <p className="text-gray-600 mb-4">Choose from our integrated liturgical calendar to access the proper readings for any date in the liturgical year.</p>
                <div className="flex items-center text-indigo-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Liturgical Calendar Integration</span>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">2</div>
                  <h3 className="text-xl font-semibold">AI Theme Generation</h3>
                </div>
                <p className="text-gray-600 mb-4">Our AI assistant analyzes the readings and suggests meaningful themes that connect the scripture passages.</p>
                <div className="flex items-center text-indigo-600">
                  <BookOpen className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Scripture-Based Themes</span>
                </div>
              </div>

              {/* Additional steps would continue here */}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                <Link href="/" className="flex items-center">
                  Try It Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits for Catholic Preachers</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4 text-indigo-600">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  <h3 className="text-lg font-semibold">Save Preparation Time</h3>
                </div>
                <p className="text-gray-600">Reduce homily preparation time by 3-5 hours each week with our streamlined process.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4 text-indigo-600">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  <h3 className="text-lg font-semibold">Contextual Preaching</h3>
                </div>
                <p className="text-gray-600">Create homilies tailored to different audiences while maintaining theological depth.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4 text-indigo-600">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  <h3 className="text-lg font-semibold">Catholic Resources</h3>
                </div>
                <p className="text-gray-600">Access integrated Magisterium teachings and faith stories from Catholic tradition.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <PublicFooter />
      </div>
    </main>
  );
}